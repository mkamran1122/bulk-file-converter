import JSZip from 'jszip';
import { BatchFileItem } from '../types';

export interface ZipProgressCallback {
  (percent: number, currentFile?: string): void;
}

/**
 * Creates a unique safe filename inside the ZIP, preventing duplicate name collisions.
 */
function resolveUniqueFilename(name: string, existingNames: Set<string>): string {
  if (!existingNames.has(name)) {
    existingNames.add(name);
    return name;
  }

  const lastDot = name.lastIndexOf('.');
  const base = lastDot > 0 ? name.slice(0, lastDot) : name;
  const ext = lastDot > 0 ? name.slice(lastDot) : '';

  let counter = 1;
  while (true) {
    const candidate = `${base}-${counter}${ext}`;
    if (!existingNames.has(candidate)) {
      existingNames.add(candidate);
      return candidate;
    }
    counter++;
  }
}

/**
 * Packages an arbitrary list of named blobs into a single ZIP archive client-side.
 */
export async function createZipFromBlobs(
  files: Array<{ fileName: string; blob: Blob }>,
  onProgress?: ZipProgressCallback
): Promise<Blob> {
  if (files.length === 0) {
    throw new Error('No files available to package into ZIP.');
  }

  const zip = new JSZip();
  const existingNames = new Set<string>();

  for (const item of files) {
    const uniqueName = resolveUniqueFilename(item.fileName, existingNames);
    zip.file(uniqueName, item.blob);
  }

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent), metadata.currentFile || undefined);
      }
    }
  );

  return zipBlob;
}

/**
 * Packages all successfully converted files into a single ZIP archive client-side.
 */
export async function createZipArchive(
  items: BatchFileItem[],
  onProgress?: ZipProgressCallback
): Promise<Blob> {
  const completedItems = items.filter(
    (item) => item.status === 'completed' && item.convertedBlob !== null
  );

  if (completedItems.length === 0) {
    throw new Error('No successfully converted files available to package into ZIP.');
  }

  return createZipFromBlobs(
    completedItems.map((item) => ({
      fileName: item.convertedFileName || item.name,
      blob: item.convertedBlob!,
    })),
    onProgress
  );
}

/**
 * Triggers a native browser file download using a temporary Object URL.
 */
export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}
