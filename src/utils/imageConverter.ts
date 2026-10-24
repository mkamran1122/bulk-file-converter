import { SupportedFormat } from '../types';

/**
 * Validates the file's magic bytes to ensure it is genuinely a JPEG, PNG, or WebP.
 * Prevents disguised or corrupt files from crashing the decoder.
 */
export async function detectImageSignature(file: File): Promise<'jpeg' | 'png' | 'webp' | 'unsupported'> {
  try {
    const slice = file.slice(0, 16);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    if (bytes.length < 4) {
      return 'unsupported';
    }

    // JPEG: FF D8 FF
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return 'jpeg';
    }

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    ) {
      return 'png';
    }

    // WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
    if (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return 'webp';
    }

    return 'unsupported';
  } catch {
    return 'unsupported';
  }
}

/**
 * Returns the MIME type corresponding to the SupportedFormat string.
 */
export function getMimeType(format: SupportedFormat): string {
  switch (format) {
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'pdf':
      return 'application/pdf';
  }
}

/**
 * Returns standard file extension for the SupportedFormat.
 */
export function getExtension(format: SupportedFormat): string {
  switch (format) {
    case 'jpg':
      return '.jpg';
    case 'png':
      return '.png';
    case 'webp':
      return '.webp';
    case 'pdf':
      return '.pdf';
  }
}

/**
 * Converts a base filename (without old extension) to target extension.
 */
export function deriveConvertedFileName(originalName: string, targetFormat: SupportedFormat): string {
  const lastDot = originalName.lastIndexOf('.');
  const baseName = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;
  return `${baseName}${getExtension(targetFormat)}`;
}

export interface ConvertImageOptions {
  targetFormat: SupportedFormat;
  quality: number; // 0.1 to 1.0
  jpegMatteColor?: string; // background fill for JPG when converting transparent source
  signal?: AbortSignal;
}

export interface ConversionOutput {
  blob: Blob;
  dimensions: { width: number; height: number };
  durationMs: number;
}

/**
 * Performs 100% in-browser conversion of an image File using Canvas API.
 * Preserves dimensions, handles transparency when converting to JPEG, validates MIME output.
 */
export async function convertImage(
  file: File,
  options: ConvertImageOptions
): Promise<ConversionOutput> {
  const startTime = performance.now();

  if (options.signal?.aborted) {
    throw new DOMException('Conversion cancelled by user', 'AbortError');
  }

  // 1. Verify file signature
  const detected = await detectImageSignature(file);
  if (detected === 'unsupported') {
    throw new Error('This file format is not supported or the file is corrupted.');
  }

  // 2. Decode the image safely
  let sourceWidth = 0;
  let sourceHeight = 0;
  let drawable: ImageBitmap | HTMLImageElement;

  try {
    if (typeof createImageBitmap === 'function') {
      drawable = await createImageBitmap(file);
      sourceWidth = drawable.width;
      sourceHeight = drawable.height;
    } else {
      drawable = await loadHtmlImage(file);
      sourceWidth = drawable.naturalWidth || drawable.width;
      sourceHeight = drawable.naturalHeight || drawable.height;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`The image could not be opened. It may be corrupted or too large. (${msg})`);
  }

  if (options.signal?.aborted) {
    if ('close' in drawable && typeof drawable.close === 'function') {
      drawable.close();
    }
    throw new DOMException('Conversion cancelled by user', 'AbortError');
  }

  if (sourceWidth === 0 || sourceHeight === 0) {
    if ('close' in drawable && typeof drawable.close === 'function') {
      drawable.close();
    }
    throw new Error('The image could not be decoded (zero dimensions).');
  }

  const targetMime = getMimeType(options.targetFormat);

  // 3. Render onto Canvas
  // OffscreenCanvas is preferred when available in workers or main thread, fallback to HTMLCanvasElement
  try {
    let resultBlob: Blob;

    if (typeof OffscreenCanvas !== 'undefined') {
      const offscreen = new OffscreenCanvas(sourceWidth, sourceHeight);
      const ctx = offscreen.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context could not be initialized.');
      }

      // If converting to JPEG, fill canvas background since JPEG does not support transparency
      if (options.targetFormat === 'jpg') {
        ctx.fillStyle = options.jpegMatteColor || '#FFFFFF';
        ctx.fillRect(0, 0, sourceWidth, sourceHeight);
      }

      ctx.drawImage(drawable, 0, 0, sourceWidth, sourceHeight);

      // Clean up drawable if bitmap
      if ('close' in drawable && typeof drawable.close === 'function') {
        drawable.close();
      }

      // Quality setting only applies to lossy types (JPEG, WebP)
      const quality = options.targetFormat === 'png' ? undefined : Math.min(Math.max(options.quality, 0.1), 1.0);

      resultBlob = await offscreen.convertToBlob({
        type: targetMime,
        quality: quality,
      });
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context could not be initialized.');
      }

      if (options.targetFormat === 'jpg') {
        ctx.fillStyle = options.jpegMatteColor || '#FFFFFF';
        ctx.fillRect(0, 0, sourceWidth, sourceHeight);
      }

      ctx.drawImage(drawable, 0, 0, sourceWidth, sourceHeight);

      if ('close' in drawable && typeof drawable.close === 'function') {
        drawable.close();
      }

      const quality = options.targetFormat === 'png' ? undefined : Math.min(Math.max(options.quality, 0.1), 1.0);

      resultBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas export produced an empty output.'));
            }
          },
          targetMime,
          quality
        );
      });
    }

    if (options.signal?.aborted) {
      throw new DOMException('Conversion cancelled by user', 'AbortError');
    }

    // 4. Verify output MIME type
    // If the browser does not support encoding to WebP, it might silently fall back to image/png
    if (resultBlob.type && resultBlob.type.toLowerCase() !== targetMime.toLowerCase()) {
      throw new Error(`Your browser could not export this image in the selected format (${options.targetFormat.toUpperCase()}).`);
    }

    if (resultBlob.size === 0) {
      throw new Error('Generated file is empty.');
    }

    const durationMs = Math.round(performance.now() - startTime);

    return {
      blob: resultBlob,
      dimensions: { width: sourceWidth, height: sourceHeight },
      durationMs,
    };
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(msg || 'Conversion failed. You can try again.');
  }
}

/**
 * Fallback image loader using HTMLImageElement and ObjectURL.
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

/**
 * Human-readable byte formatting.
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const num = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${num} ${sizes[i]}`;
}
