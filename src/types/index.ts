export type SupportedFormat = 'jpg' | 'png' | 'webp' | 'pdf';

export type FileStatus = 'ready' | 'converting' | 'completed' | 'failed' | 'cancelled';

export type PageId =
  | 'home'
  | 'pdf-tools'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'guide-jpg-to-png'
  | 'guide-png-to-webp'
  | 'guide-webp-to-jpg'
  | 'guide-image-optimization';

export type PdfToolTab = 'images-to-pdf' | 'pdf-to-images';
export type MainToolMode = 'image-converter' | 'pdf-tools';

export type PdfPageFit = 'fit-image' | 'a4-contain';

export interface BatchFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  detectedFormat: 'jpeg' | 'png' | 'webp' | 'unknown';
  previewUrl: string;
  status: FileStatus;
  
  // Results populated after conversion
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  convertedSize: number | null;
  convertedType: string | null;
  convertedFileName: string | null;
  dimensions: { width: number; height: number } | null;
  errorMessage: string | null;
  durationMs: number | null;
}

export interface ConversionSettings {
  format: SupportedFormat;
  quality: number; // 0.1 to 1.0 (10% to 100%)
  concurrency: number;
  jpegMatteColor: string; // Background color for transparent images converted to JPG
  pdfPageFit: PdfPageFit; // 'fit-image' | 'a4-contain'
  pdfFileName: string;
}

export interface PdfResult {
  blob: Blob;
  url: string;
  size: number;
  fileName: string;
  pageCount: number;
  durationMs: number;
}

export interface BatchSummary {
  total: number;
  ready: number;
  converting: number;
  completed: number;
  failed: number;
  cancelled: number;
  originalTotalSize: number;
  convertedTotalSize: number;
  sizeDiffBytes: number;
  sizeDiffPercent: number;
}

export interface FileRejection {
  file: File;
  reason: string;
}
