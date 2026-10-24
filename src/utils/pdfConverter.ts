import { jsPDF } from 'jspdf';
import { BatchFileItem } from '../types';
import { detectImageSignature } from './imageConverter';

export type PdfPageFit = 'fit-image' | 'a4-contain';

export interface CreatePdfOptions {
  pageFit?: PdfPageFit;
  quality?: number; // 0.1 to 1.0 (default 0.90 for high quality PDF)
  jpegMatteColor?: string; // default '#FFFFFF'
  signal?: AbortSignal;
  onProgress?: (current: number, total: number, message: string) => void;
}

export interface PdfConversionResult {
  blob: Blob;
  size: number;
  pageCount: number;
  durationMs: number;
}

/**
 * Creates a single multi-page PDF document from an ordered list of image files.
 * Each image is placed on a separate page, preserving its aspect ratio and high resolution.
 */
export async function createPdfFromImages(
  items: BatchFileItem[],
  options: CreatePdfOptions = {}
): Promise<PdfConversionResult> {
  const startTime = performance.now();
  const {
    pageFit = 'fit-image',
    quality = 0.9,
    jpegMatteColor = '#FFFFFF',
    signal,
    onProgress,
  } = options;

  if (items.length === 0) {
    throw new Error('No images selected for PDF conversion.');
  }

  if (signal?.aborted) {
    throw new DOMException('PDF creation cancelled by user', 'AbortError');
  }

  let doc: jsPDF | null = null;
  const total = items.length;

  for (let i = 0; i < total; i++) {
    if (signal?.aborted) {
      throw new DOMException('PDF creation cancelled by user', 'AbortError');
    }

    const item = items[i];
    if (onProgress) {
      onProgress(i + 1, total, `Processing page ${i + 1} of ${total}: ${item.name}`);
    }

    // 1. Verify file signature
    const signature = await detectImageSignature(item.file);
    if (signature === 'unsupported') {
      throw new Error(`File "${item.name}" could not be recognized as a valid JPEG, PNG, or WebP image.`);
    }

    // 2. Decode the image safely
    let sourceWidth = 0;
    let sourceHeight = 0;
    let drawable: ImageBitmap | HTMLImageElement;

    try {
      if (typeof createImageBitmap === 'function') {
        drawable = await createImageBitmap(item.file);
        sourceWidth = drawable.width;
        sourceHeight = drawable.height;
      } else {
        drawable = await loadHtmlImage(item.file);
        sourceWidth = drawable.naturalWidth || drawable.width;
        sourceHeight = drawable.naturalHeight || drawable.height;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Could not decode image "${item.name}". (${msg})`);
    }

    if (sourceWidth === 0 || sourceHeight === 0) {
      if ('close' in drawable && typeof drawable.close === 'function') {
        drawable.close();
      }
      throw new Error(`Image "${item.name}" has zero dimensions and cannot be added to PDF.`);
    }

    // 3. Render onto an offscreen canvas to standardize format into crisp high-quality JPEG
    // Canvas ensures any format (JPEG, PNG with transparency, WebP) produces universally readable image data for jsPDF
    const canvas = document.createElement('canvas');
    canvas.width = sourceWidth;
    canvas.height = sourceHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      if ('close' in drawable && typeof drawable.close === 'function') {
        drawable.close();
      }
      throw new Error('Failed to initialize 2D canvas context for PDF generation.');
    }

    // Fill matte color beneath transparent pixels
    ctx.fillStyle = jpegMatteColor;
    ctx.fillRect(0, 0, sourceWidth, sourceHeight);
    ctx.drawImage(drawable, 0, 0, sourceWidth, sourceHeight);

    if ('close' in drawable && typeof drawable.close === 'function') {
      drawable.close();
    }

    // Export image as high quality JPEG data URL
    const clampedQuality = Math.min(Math.max(quality, 0.1), 1.0);
    const imgDataUrl = canvas.toDataURL('image/jpeg', clampedQuality);

    // Free canvas memory
    canvas.width = 0;
    canvas.height = 0;

    // 4. Calculate page geometry
    let pageWidth: number;
    let pageHeight: number;
    let imgX = 0;
    let imgY = 0;
    let imgDrawWidth: number;
    let imgDrawHeight: number;
    let orientation: 'portrait' | 'landscape';

    if (pageFit === 'fit-image') {
      // Scale points proportionally to standard screen DPI (~72/96 ratio)
      // Cap max dimension to 2400 points to keep PDF coordinate system efficient
      const maxAllowedPoints = 2400;
      let targetW = sourceWidth * 0.75;
      let targetH = sourceHeight * 0.75;

      if (targetW > maxAllowedPoints || targetH > maxAllowedPoints) {
        const factor = Math.min(maxAllowedPoints / targetW, maxAllowedPoints / targetH);
        targetW = Math.round(targetW * factor);
        targetH = Math.round(targetH * factor);
      }

      pageWidth = targetW;
      pageHeight = targetH;
      imgDrawWidth = targetW;
      imgDrawHeight = targetH;
      imgX = 0;
      imgY = 0;
      orientation = pageWidth >= pageHeight ? 'landscape' : 'portrait';
    } else {
      // Standard A4: 595.28 x 841.89 points
      const isLandscape = sourceWidth > sourceHeight;
      orientation = isLandscape ? 'landscape' : 'portrait';
      pageWidth = isLandscape ? 841.89 : 595.28;
      pageHeight = isLandscape ? 595.28 : 841.89;

      const margin = 20; // 20pt padding
      const availWidth = pageWidth - margin * 2;
      const availHeight = pageHeight - margin * 2;

      // Maintain aspect ratio strictly - no stretching or distortion
      const scale = Math.min(availWidth / sourceWidth, availHeight / sourceHeight);
      imgDrawWidth = Math.round(sourceWidth * scale);
      imgDrawHeight = Math.round(sourceHeight * scale);

      // Center image on the page
      imgX = Math.round((pageWidth - imgDrawWidth) / 2);
      imgY = Math.round((pageHeight - imgDrawHeight) / 2);
    }

    // 5. Add to jsPDF document
    if (i === 0) {
      doc = new jsPDF({
        orientation,
        unit: 'pt',
        format: [pageWidth, pageHeight],
        compress: true,
      });
    } else if (doc) {
      doc.addPage([pageWidth, pageHeight], orientation);
    }

    if (doc) {
      doc.addImage(imgDataUrl, 'JPEG', imgX, imgY, imgDrawWidth, imgDrawHeight, undefined, 'FAST');
    }
  }

  if (!doc) {
    throw new Error('Failed to initialize PDF document.');
  }

  if (onProgress) {
    onProgress(total, total, 'Compiling PDF document...');
  }

  const pdfBlob = doc.output('blob');
  const durationMs = Math.round(performance.now() - startTime);

  return {
    blob: pdfBlob,
    size: pdfBlob.size,
    pageCount: total,
    durationMs,
  };
}

/**
 * Fallback image loader using HTMLImageElement
 */
function loadHtmlImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image into DOM element.'));
    };
    img.src = url;
  });
}
