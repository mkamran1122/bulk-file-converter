/**
 * Central configuration for the application branding and operational limits.
 * Change the brand name or limits here to update the entire application.
 */

export const BRAND_CONFIG = {
  name: 'FileBatch',
  tagline: 'Convert More. Wait Less.',
  heroHeadline: 'Convert Hundreds of Images in One Go',
  heroDescription:
    'Convert JPG, PNG and WebP images in bulk or compile them into a single PDF document. Fast, simple and private — your files stay on your device.',
  privacyStatement:
    'Your images are processed locally in your browser. This application does not upload your selected images or converted files to our servers.',
  
  // Operational boundaries
  limits: {
    maxFilesPerBatch: 100,
    maxFileSizeBytes: 25 * 1024 * 1024, // 25 MB
    maxFileSizeMB: 25,
    defaultConcurrency: 3,
    minConcurrency: 1,
    maxConcurrency: 6,
  },

  // Conversion settings defaults
  defaults: {
    format: 'webp' as const,
    quality: 0.85, // 85%
    jpegMatteColor: '#FFFFFF', // Clean background for transparent inputs converting to JPEG
  },

  supportedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  supportedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],

  // Company and contact information for AdSense compliance
  company: {
    legalName: 'FileBatch Technologies',
    contactEmail: 'contact@filebatch.app',
    supportEmail: 'support@filebatch.app',
    privacyEmail: 'privacy@filebatch.app',
    location: 'United States',
    establishedYear: 2026,
  },
};
