import * as pdfjsLib from 'pdfjs-dist';

// Configure the PDF.js worker
// Use CDN matching the installed version to ensure zero worker-bundling issues across any environment
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('Could not set pdfjs workerSrc:', e);
  }
}

export interface PdfDocumentInfo {
  pageCount: number;
  name: string;
  size: number;
  fingerprint: string;
}

export type PdfImageFormat = 'jpg' | 'png' | 'webp';
export type PdfResolution = 'low' | 'medium' | 'high';

export const RESOLUTION_SCALES: Record<PdfResolution, { scale: number; dpiLabel: string; description: string }> = {
  low: { scale: 1.0, dpiLabel: '~72 DPI', description: 'Fastest processing, smallest file size' },
  medium: { scale: 1.5, dpiLabel: '~150 DPI', description: 'Recommended balance of crispness and performance' },
  high: { scale: 2.0, dpiLabel: '~300 DPI', description: 'Maximum detail, higher memory usage & file size' },
};

export interface ConvertedPdfPage {
  id: string;
  pageNumber: number;
  blob: Blob;
  url: string;
  fileName: string;
  size: number;
  width: number;
  height: number;
  format: PdfImageFormat;
}

export interface PdfToImageOptions {
  format: PdfImageFormat;
  quality: number; // 0.1 to 1.0 for JPG / WebP
  resolution: PdfResolution;
  pages: number[]; // 1-indexed page numbers
  signal?: AbortSignal;
  onProgress?: (completed: number, total: number, currentPage: number) => void;
}

/**
 * Parses user range string (e.g. "1-5, 8, 11-13") into sorted unique array of 1-indexed numbers
 */
export function parsePageRangeString(rangeStr: string, maxPages: number): { validPages: number[]; error?: string } {
  if (!rangeStr.trim()) {
    return { validPages: [], error: 'Please enter a page range (e.g. 1-5 or 2, 4).' };
  }

  const pagesSet = new Set<number>();
  const tokens = rangeStr.split(',').map((s) => s.trim()).filter(Boolean);

  for (const token of tokens) {
    if (token.includes('-')) {
      const parts = token.split('-').map((s) => s.trim());
      if (parts.length !== 2) {
        return { validPages: [], error: `Invalid range format: "${token}"` };
      }
      const start = parseInt(parts[0], 10);
      const end = parseInt(parts[1], 10);
      if (isNaN(start) || isNaN(end) || start < 1 || end < 1) {
        return { validPages: [], error: `Page numbers must be positive integers: "${token}"` };
      }
      if (start > end) {
        return { validPages: [], error: `Invalid range start > end: "${token}"` };
      }
      for (let p = start; p <= end; p++) {
        if (p <= maxPages) {
          pagesSet.add(p);
        }
      }
    } else {
      const p = parseInt(token, 10);
      if (isNaN(p) || p < 1) {
        return { validPages: [], error: `Invalid page number: "${token}"` };
      }
      if (p <= maxPages) {
        pagesSet.add(p);
      }
    }
  }

  const validPages = Array.from(pagesSet).sort((a, b) => a - b);
  if (validPages.length === 0) {
    return { validPages: [], error: `No pages within document range (document has ${maxPages} pages).` };
  }

  return { validPages };
}

/**
 * Loads a PDF Document from a File
 */
export async function loadPdfDocument(file: File): Promise<{
  doc: pdfjsLib.PDFDocumentProxy;
  info: PdfDocumentInfo;
}> {
  // Validate magic bytes for %PDF (0x25 0x50 0x44 0x46)
  const headerBuffer = await file.slice(0, 5).arrayBuffer();
  const headerBytes = new Uint8Array(headerBuffer);
  const headerStr = String.fromCharCode(...headerBytes);
  if (!headerStr.startsWith('%PDF')) {
    throw new Error('The selected file does not appear to be a valid PDF document (missing %PDF signature).');
  }

  const arrayBuffer = await file.arrayBuffer();

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      isEvalSupported: false,
    });

    const doc = await loadingTask.promise;
    return {
      doc,
      info: {
        pageCount: doc.numPages,
        name: file.name,
        size: file.size,
        fingerprint: (doc as any).fingerprint || `${file.name}-${file.size}`,
      },
    };
  } catch (err: any) {
    if (err?.name === 'PasswordException') {
      throw new Error('This PDF is password-protected. Password-protected PDFs cannot be converted locally without unlocking.');
    }
    if (err?.name === 'InvalidPDFException') {
      throw new Error('The PDF document is corrupted, damaged, or cannot be read.');
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to load PDF: ${msg}`);
  }
}

/**
 * Renders a single page thumbnail at a small scale (e.g. 0.3x or fit to ~160px width)
 */
export async function renderPageThumbnail(
  doc: pdfjsLib.PDFDocumentProxy,
  pageNumber: number
): Promise<{ dataUrl: string; width: number; height: number }> {
  const page = await doc.getPage(pageNumber);
  const unscaledViewport = page.getViewport({ scale: 1.0 });

  // Target thumbnail width around 160-200px
  const targetWidth = 180;
  const scale = targetWidth / unscaledViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext('2d', { alpha: false });

  if (!ctx) {
    throw new Error('Failed to create canvas 2D context for thumbnail');
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const renderTask = page.render({
    canvasContext: ctx,
    viewport,
    intent: 'display',
  });

  await renderTask.promise;
  const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

  canvas.width = 0;
  canvas.height = 0;

  return {
    dataUrl,
    width: Math.floor(unscaledViewport.width),
    height: Math.floor(unscaledViewport.height),
  };
}

/**
 * Converts selected pages of a PDF to image Blobs
 */
export async function convertPdfPagesToImages(
  doc: pdfjsLib.PDFDocumentProxy,
  pdfFileName: string,
  options: PdfToImageOptions
): Promise<ConvertedPdfPage[]> {
  const { format, quality, resolution, pages, signal, onProgress } = options;
  const scale = RESOLUTION_SCALES[resolution].scale;
  const results: ConvertedPdfPage[] = [];
  const baseName = pdfFileName.replace(/\.pdf$/i, '');

  const mimeType = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
  const ext = format === 'jpg' ? 'jpg' : format;

  for (let i = 0; i < pages.length; i++) {
    if (signal?.aborted) {
      throw new DOMException('PDF conversion cancelled by user', 'AbortError');
    }

    const pageNum = pages[i];
    if (onProgress) {
      onProgress(i, pages.length, pageNum);
    }

    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext('2d', { alpha: format === 'png' || format === 'webp' });

    if (!ctx) {
      throw new Error(`Failed to create 2D canvas context for page ${pageNum}`);
    }

    // Always fill white background for JPG, and optional for WebP/PNG to prevent dark PDF text rendering against black
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const renderTask = page.render({
      canvasContext: ctx,
      viewport,
      intent: 'print',
    });

    await renderTask.promise;

    if (signal?.aborted) {
      canvas.width = 0;
      canvas.height = 0;
      throw new DOMException('PDF conversion cancelled by user', 'AbortError');
    }

    // Convert canvas to blob
    const clampedQuality = Math.min(Math.max(quality, 0.1), 1.0);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error(`Failed to encode canvas for page ${pageNum}`));
        },
        mimeType,
        format === 'png' ? undefined : clampedQuality
      );
    });

    const pageFileName = `${baseName}-page-${pageNum}.${ext}`;
    const url = URL.createObjectURL(blob);

    results.push({
      id: `pdf-page-${pageNum}-${Date.now()}`,
      pageNumber: pageNum,
      blob,
      url,
      fileName: pageFileName,
      size: blob.size,
      width: canvas.width,
      height: canvas.height,
      format,
    });

    // Clean up canvas memory immediately
    canvas.width = 0;
    canvas.height = 0;

    if (onProgress) {
      onProgress(i + 1, pages.length, pageNum);
    }
  }

  return results;
}
