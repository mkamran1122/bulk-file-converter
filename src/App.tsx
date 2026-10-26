import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { BRAND_CONFIG } from './config/brand';
import {
  BatchFileItem,
  ConversionSettings,
  FileRejection,
  BatchSummary,
  SupportedFormat,
  PageId,
  PdfResult,
  PdfToolTab,
  MainToolMode,
} from './types';
import { Layers, FileText } from 'lucide-react';
import {
  detectImageSignature,
  convertImage,
  deriveConvertedFileName,
  formatBytes,
} from './utils/imageConverter';
import { createZipArchive, triggerBlobDownload } from './utils/zipArchive';
import { createPdfFromImages } from './utils/pdfConverter';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UploadDropzone } from './components/UploadDropzone';
import { UploadConfirmation, UploadNotificationData } from './components/UploadConfirmation';
import { ConversionControls } from './components/ConversionControls';
import { ConversionSummary } from './components/ConversionSummary';
import { PdfResultCard } from './components/PdfResultCard';
import { FileQueue } from './components/FileQueue';
import { PdfToolsSection } from './components/PdfToolsSection';
import { SupportedFormats } from './components/SupportedFormats';
import { HowItWorks } from './components/HowItWorks';
import { PrivacySection } from './components/PrivacySection';
import { Footer } from './components/Footer';
import { PreviewModal } from './components/PreviewModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { AdSenseNotice } from './components/AdSenseNotice';
import { SEOHead } from './components/SEOHead';
import { FaqSection, FAQ_DATA } from './components/FaqSection';

// Pages
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { JpgToPngGuide } from './pages/guides/JpgToPngGuide';
import { PngToWebpGuide } from './pages/guides/PngToWebpGuide';
import { WebpToJpgGuide } from './pages/guides/WebpToJpgGuide';
import { ImageOptimizationGuide } from './pages/guides/ImageOptimizationGuide';

export default function App() {
  const [items, setItems] = useState<BatchFileItem[]>([]);
  const [rejections, setRejections] = useState<FileRejection[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>({
    format: BRAND_CONFIG.defaults.format,
    quality: BRAND_CONFIG.defaults.quality,
    concurrency: BRAND_CONFIG.limits.defaultConcurrency,
    jpegMatteColor: BRAND_CONFIG.defaults.jpegMatteColor,
    pdfPageFit: 'fit-image',
    pdfFileName: 'converted-images.pdf',
  });

  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  // PDF Conversion State
  const [isConvertingPdf, setIsConvertingPdf] = useState(false);
  const [pdfProgressText, setPdfProgressText] = useState('');
  const [pdfResult, setPdfResult] = useState<PdfResult | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Active page routing & Tool Modes
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [mainTool, setMainTool] = useState<MainToolMode>('image-converter');
  const [pdfSubTab, setPdfSubTab] = useState<PdfToolTab>('images-to-pdf');

  // Modals state
  const [previewItem, setPreviewItem] = useState<BatchFileItem | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Upload Notification Feedback
  const [uploadNotification, setUploadNotification] = useState<UploadNotificationData | null>(null);

  // References
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const conversionSectionRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const itemsRef = useRef<BatchFileItem[]>(items);
  itemsRef.current = items;
  const pdfResultRef = useRef<PdfResult | null>(pdfResult);
  pdfResultRef.current = pdfResult;

  // Scroll to conversion section accounting for sticky header offset
  const scrollToConversionSection = useCallback(() => {
    if (conversionSectionRef.current) {
      const headerOffset = 84; // 64px sticky header + 20px comfortable breathing space
      const elementPosition = conversionSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  }, []);

  // Sync hash routing on mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'pdf-tools' || hash === 'images-to-pdf') {
        setCurrentPage('home');
        setMainTool('pdf-tools');
        setPdfSubTab('images-to-pdf');
        setSettings((prev) => ({ ...prev, format: 'pdf' }));
      } else if (hash === 'pdf-to-images') {
        setCurrentPage('home');
        setMainTool('pdf-tools');
        setPdfSubTab('pdf-to-images');
      } else if (
        hash === 'about' ||
        hash === 'contact' ||
        hash === 'privacy' ||
        hash === 'terms' ||
        hash === 'guide-jpg-to-png' ||
        hash === 'guide-png-to-webp' ||
        hash === 'guide-webp-to-jpg' ||
        hash === 'guide-image-optimization'
      ) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPdfTools = (subTab: PdfToolTab = 'images-to-pdf') => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', window.location.pathname);
    }
    setMainTool('pdf-tools');
    setPdfSubTab(subTab);
    if (subTab === 'images-to-pdf') {
      setSettings((prev) => ({ ...prev, format: 'pdf' }));
    }
    setTimeout(() => {
      const el = document.getElementById('converter');
      if (el) {
        const headerOffset = 84;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSelectImageConverter = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', window.location.pathname);
    }
    setMainTool('image-converter');
    if (settings.format === 'pdf') {
      setSettings((prev) => ({ ...prev, format: 'webp' }));
    }
  };

  const handleStartWithFormat = (format?: SupportedFormat) => {
    if (format) {
      setSettings((prev) => ({ ...prev, format }));
      if (format === 'pdf') {
        setMainTool('pdf-tools');
        setPdfSubTab('images-to-pdf');
      } else {
        setMainTool('image-converter');
      }
    }
    handleNavigate('home');
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  // Cleanup object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      });
      if (pdfResultRef.current?.url) {
        URL.revokeObjectURL(pdfResultRef.current.url);
      }
    };
  }, []);

  // Compute Batch Summary Metrics
  const summary = useMemo<BatchSummary>(() => {
    let ready = 0;
    let converting = 0;
    let completed = 0;
    let failed = 0;
    let cancelled = 0;
    let originalTotalSize = 0;
    let convertedTotalSize = 0;

    for (const item of items) {
      if (item.status === 'ready') ready++;
      else if (item.status === 'converting') converting++;
      else if (item.status === 'completed') {
        completed++;
        originalTotalSize += item.size;
        convertedTotalSize += item.convertedSize || item.size;
      } else if (item.status === 'failed') failed++;
      else if (item.status === 'cancelled') cancelled++;
    }

    const sizeDiffBytes = convertedTotalSize - originalTotalSize;
    const sizeDiffPercent =
      originalTotalSize > 0 ? (sizeDiffBytes / originalTotalSize) * 100 : 0;

    return {
      total: items.length,
      ready,
      converting,
      completed,
      failed,
      cancelled,
      originalTotalSize,
      convertedTotalSize,
      sizeDiffBytes,
      sizeDiffPercent,
    };
  }, [items]);

  // Handle File Additions
  const handleFilesSelected = useCallback(
    async (incomingFiles: File[]) => {
      // 0. If user cancelled file selection dialog, do nothing
      if (!incomingFiles || incomingFiles.length === 0) {
        return;
      }

      const newItems: BatchFileItem[] = [];
      const newRejections: FileRejection[] = [];
      const currentCount = items.length;
      const maxAllowed = BRAND_CONFIG.limits.maxFilesPerBatch;

      for (let i = 0; i < incomingFiles.length; i++) {
        const file = incomingFiles[i];

        // 1. Check max batch capacity
        if (currentCount + newItems.length >= maxAllowed) {
          newRejections.push({
            file,
            reason: `Batch limit reached (${maxAllowed} files maximum per batch).`,
          });
          continue;
        }

        // 2. Check individual file size limit
        if (file.size > BRAND_CONFIG.limits.maxFileSizeBytes) {
          newRejections.push({
            file,
            reason: `This file exceeds the ${BRAND_CONFIG.limits.maxFileSizeMB} MB limit (${formatBytes(file.size)}).`,
          });
          continue;
        }

        // 3. Quick check on MIME / extension to weed out obvious non-images
        const lowerName = file.name.toLowerCase();
        const hasSupportedExt = BRAND_CONFIG.supportedExtensions.some((ext) =>
          lowerName.endsWith(ext)
        );
        const hasSupportedMime = BRAND_CONFIG.supportedMimeTypes.includes(file.type);

        if (!hasSupportedExt && !hasSupportedMime && file.type !== '') {
          newRejections.push({
            file,
            reason: 'This file format is not supported. Please select JPG, PNG, or WebP.',
          });
          continue;
        }

        // 4. Validate magic byte signature safely
        const signature = await detectImageSignature(file);
        if (signature === 'unsupported') {
          newRejections.push({
            file,
            reason: 'This file format is not supported or the file is corrupted.',
          });
          continue;
        }

        // Generate unique entry
        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const previewUrl = URL.createObjectURL(file);

        newItems.push({
          id,
          file,
          name: file.name,
          size: file.size,
          type: file.type || `image/${signature}`,
          detectedFormat: signature,
          previewUrl,
          status: 'ready',
          convertedBlob: null,
          convertedUrl: null,
          convertedSize: null,
          convertedType: null,
          convertedFileName: null,
          dimensions: null,
          errorMessage: null,
          durationMs: null,
        });
      }

      if (newItems.length > 0) {
        const newTotal = currentCount + newItems.length;
        setItems((prev) => [...prev, ...newItems]);

        // Show prominent upload confirmation with count and thumbnails
        setUploadNotification({
          type: 'success',
          title: `${newItems.length} image${newItems.length > 1 ? 's' : ''} added successfully`,
          message:
            currentCount === 0
              ? 'Ready to convert. Choose your target format and compression options below.'
              : `Added to current batch (${newTotal} images total).`,
          addedCount: newItems.length,
          totalCount: newTotal,
          addedThumbnails: newItems.map((item) => ({
            id: item.id,
            name: item.name,
            url: item.previewUrl,
            size: item.size,
          })),
        });

        // Automatically and smoothly scroll to the conversion section after DOM updates
        setTimeout(() => {
          scrollToConversionSection();
        }, 80);
      } else if (incomingFiles.length > 0 && newItems.length === 0) {
        // Clear error notification if no valid images could be selected
        setUploadNotification({
          type: 'error',
          title: 'No valid images could be added',
          message:
            newRejections.length > 0
              ? newRejections[0].reason
              : 'Please ensure you selected valid JPG, PNG, or WebP images under 25 MB.',
          totalCount: currentCount,
        });
        // Do NOT scroll on failure/cancellation
      }

      if (newRejections.length > 0) {
        setRejections((prev) => [...prev, ...newRejections]);
      }
    },
    [items.length, scrollToConversionSection]
  );

  // Settings update handler
  const handleUpdateSettings = (newSettings: Partial<ConversionSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.format === 'pdf') {
        setMainTool('pdf-tools');
        setPdfSubTab('images-to-pdf');
      }
      return updated;
    });
  };

  // Reordering handlers for PDF page order
  const handleMoveItemUp = (index: number) => {
    setItems((prev) => {
      if (index <= 0) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[index - 1];
      next[index - 1] = temp;
      return next;
    });
  };

  const handleMoveItemDown = (index: number) => {
    setItems((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[index + 1];
      next[index + 1] = temp;
      return next;
    });
  };

  // Remove single file
  const handleRemoveItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        if (target.previewUrl) URL.revokeObjectURL(target.previewUrl);
        if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      }
      const updated = prev.filter((i) => i.id !== id);

      // Keep upload notification count in sync, or clear if queue is empty
      setUploadNotification((prevNotif) => {
        if (!prevNotif) return null;
        if (updated.length === 0) return null;
        return {
          ...prevNotif,
          totalCount: updated.length,
          addedThumbnails: prevNotif.addedThumbnails?.filter((t) => t.id !== id),
        };
      });

      return updated;
    });
  }, []);

  // Clear all items with prompt if converted files exist
  const handleClearQueueRequest = () => {
    if (summary.completed > 0 || pdfResult) {
      setConfirmClearOpen(true);
    } else {
      executeClearQueue();
    }
  };

  const executeClearQueue = () => {
    items.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    if (pdfResult?.url) {
      URL.revokeObjectURL(pdfResult.url);
    }
    setItems([]);
    setRejections([]);
    setUploadNotification(null);
    setPdfResult(null);
    setPdfError(null);
    setConfirmClearOpen(false);
  };

  // Convert Images to Single PDF Execution
  const runPdfConversion = async () => {
    if (items.length === 0 || isConvertingPdf) return;

    setIsConvertingPdf(true);
    setPdfError(null);
    setPdfProgressText(`Preparing ${items.length} image pages...`);
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const result = await createPdfFromImages(items, {
        pageFit: settings.pdfPageFit,
        quality: settings.quality,
        jpegMatteColor: settings.jpegMatteColor,
        signal: abortController.signal,
        onProgress: (current, total, msg) => {
          setPdfProgressText(msg);
        },
      });

      if (pdfResult?.url) {
        URL.revokeObjectURL(pdfResult.url);
      }

      const url = URL.createObjectURL(result.blob);
      let fileName = settings.pdfFileName.trim() || 'converted-images.pdf';
      if (!fileName.toLowerCase().endsWith('.pdf')) {
        fileName = `${fileName}.pdf`;
      }

      setPdfResult({
        blob: result.blob,
        url,
        size: result.size,
        fileName,
        pageCount: result.pageCount,
        durationMs: result.durationMs,
      });
    } catch (err: unknown) {
      if (abortController.signal.aborted) {
        setPdfProgressText('');
        return;
      }
      const msg = err instanceof Error ? err.message : 'PDF conversion failed.';
      setPdfError(msg);
    } finally {
      setIsConvertingPdf(false);
      setPdfProgressText('');
      abortControllerRef.current = null;
    }
  };

  // Convert Batch of separate image files
  const runConversionQueue = async (itemsToProcess: BatchFileItem[]) => {
    if (itemsToProcess.length === 0 || isConverting) return;

    setIsConverting(true);
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Mark eligible items as 'ready' with cleared errors
    setItems((prev) =>
      prev.map((i) =>
        itemsToProcess.some((p) => p.id === i.id) ? { ...i, status: 'ready', errorMessage: null } : i
      )
    );

    const queue = [...itemsToProcess];
    const concurrency = settings.concurrency;

    const worker = async () => {
      while (queue.length > 0) {
        if (abortController.signal.aborted) break;

        const current = queue.shift();
        if (!current) break;

        // Set status to converting
        setItems((prev) =>
          prev.map((i) => (i.id === current.id ? { ...i, status: 'converting' } : i))
        );

        try {
          const result = await convertImage(current.file, {
            targetFormat: settings.format as 'jpg' | 'png' | 'webp',
            quality: settings.quality,
            jpegMatteColor: settings.jpegMatteColor,
            signal: abortController.signal,
          });

          // Revoke prior converted URL if any
          if (current.convertedUrl) {
            URL.revokeObjectURL(current.convertedUrl);
          }

          const convertedUrl = URL.createObjectURL(result.blob);
          const convertedFileName = deriveConvertedFileName(current.name, settings.format as 'jpg' | 'png' | 'webp');

          setItems((prev) =>
            prev.map((i) =>
              i.id === current.id
                ? {
                    ...i,
                    status: 'completed',
                    convertedBlob: result.blob,
                    convertedUrl,
                    convertedSize: result.blob.size,
                    convertedType: result.blob.type,
                    convertedFileName,
                    dimensions: result.dimensions,
                    durationMs: result.durationMs,
                    errorMessage: null,
                  }
                : i
            )
          );
        } catch (err: unknown) {
          if (abortController.signal.aborted) {
            setItems((prev) =>
              prev.map((i) =>
                i.id === current.id && i.status === 'converting'
                  ? { ...i, status: 'cancelled' }
                  : i
              )
            );
            break;
          }

          const msg =
            err instanceof Error
              ? err.message
              : 'Conversion failed. You can try again.';

          setItems((prev) =>
            prev.map((i) =>
              i.id === current.id
                ? {
                    ...i,
                    status: 'failed',
                    errorMessage: msg,
                  }
                : i
            )
          );
        }
      }
    };

    // Run parallel workers up to concurrency limit
    const workerPromises = Array.from({ length: Math.min(concurrency, itemsToProcess.length) }, () =>
      worker()
    );

    await Promise.all(workerPromises);

    setIsConverting(false);
    abortControllerRef.current = null;
  };

  const handleStartConversion = () => {
    if (settings.format === 'pdf') {
      runPdfConversion();
    } else {
      const eligible = items.filter(
        (i) => i.status === 'ready' || i.status === 'failed' || i.status === 'cancelled'
      );
      runConversionQueue(eligible);
    }
  };

  const handleCancelConversion = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsConverting(false);
    setIsConvertingPdf(false);
    setPdfProgressText('');
    setItems((prev) =>
      prev.map((i) =>
        i.status === 'converting' || i.status === 'ready' ? { ...i, status: 'cancelled' } : i
      )
    );
  };

  const handleRetryFailed = () => {
    const failedItems = items.filter((i) => i.status === 'failed');
    runConversionQueue(failedItems);
  };

  const handleRetrySingle = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (target) {
      runConversionQueue([target]);
    }
  };

  // Single file download
  const handleDownloadSingle = (item: BatchFileItem) => {
    if (item.convertedBlob && item.convertedFileName) {
      triggerBlobDownload(item.convertedBlob, item.convertedFileName);
    }
  };

  // ZIP download
  const handleDownloadZip = async () => {
    const completedItems = items.filter(
      (item) => item.status === 'completed' && item.convertedBlob !== null
    );

    if (completedItems.length === 0 || isZipping) return;

    try {
      setIsZipping(true);
      setZipProgress(0);

      const zipBlob = await createZipArchive(completedItems, (percent) => {
        setZipProgress(percent);
      });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const zipName = `filebatch-converted-images-${timestamp}.zip`;
      triggerBlobDownload(zipBlob, zipName);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create ZIP archive.';
      alert(msg);
    } finally {
      setIsZipping(false);
      setZipProgress(0);
    }
  };

  // PDF download
  const handleDownloadPdf = () => {
    if (pdfResult) {
      triggerBlobDownload(pdfResult.blob, pdfResult.fileName);
    }
  };

  // Start new batch
  const handleStartNewBatch = () => {
    executeClearQueue();
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  const isPdfMode = settings.format === 'pdf';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-800">
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectImagesClick={() => {
          handleSelectImageConverter();
          setTimeout(() => fileInputRef.current?.click(), 50);
        }}
        onSelectPdfTools={handleSelectPdfTools}
        isPdfToolsActive={mainTool === 'pdf-tools' && currentPage === 'home'}
        fileCount={items.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Dynamic Page Routing */}
        {currentPage === 'about' ? (
          <AboutUs onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'contact' ? (
          <ContactUs />
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicy />
        ) : currentPage === 'terms' ? (
          <TermsOfService />
        ) : currentPage === 'guide-jpg-to-png' ? (
          <JpgToPngGuide
            onStartConverting={handleStartWithFormat}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentPage === 'guide-png-to-webp' ? (
          <PngToWebpGuide
            onStartConverting={handleStartWithFormat}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentPage === 'guide-webp-to-jpg' ? (
          <WebpToJpgGuide
            onStartConverting={handleStartWithFormat}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentPage === 'guide-image-optimization' ? (
          <ImageOptimizationGuide
            onStartConverting={handleStartWithFormat}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : (
          /* Main Image Converter Application View */
          <>
            <SEOHead
              title="FileBatch — Free Bulk Image Converter & PDF Tools | MK Labs"
              description="Convert JPG, PNG, and WebP images in bulk, combine photos to PDF, or extract PDF pages into high-res images in your browser with zero server uploads."
              canonicalPath=""
              type="website"
              jsonLd={{
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'WebApplication',
                    'name': 'FileBatch',
                    'url': 'https://filebatch.netlify.app/',
                    'applicationCategory': 'MultimediaApplication',
                    'operatingSystem': 'All',
                    'description':
                      'Convert JPG, PNG, and WebP images in bulk, combine photos to PDF, or extract PDF pages to high-res images with zero server uploads.',
                    'offers': {
                      '@type': 'Offer',
                      'price': '0',
                      'priceCurrency': 'USD',
                    },
                    'publisher': {
                      '@type': 'Organization',
                      'name': 'MK Labs',
                      'logo': 'https://filebatch.netlify.app/assets/aistudio/MK_Labs_703312e1.jpg',
                    },
                  },
                  {
                    '@type': 'FAQPage',
                    'mainEntity': FAQ_DATA.map((faq) => ({
                      '@type': 'Question',
                      'name': faq.question,
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': faq.answer,
                      },
                    })),
                  },
                ],
              }}
            />
            {/* Hero Section */}
            <Hero
              onSelectImagesClick={() => {
                handleSelectImageConverter();
                setTimeout(() => fileInputRef.current?.click(), 50);
              }}
              onSelectPdfTools={handleSelectPdfTools}
            />

            {/* Converter Workspace Section */}
            <section id="converter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
              {/* Primary Tool Mode Switcher */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl border border-slate-200/90 p-2.5 sm:p-3 shadow-xs">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSelectImageConverter}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      mainTool === 'image-converter'
                        ? 'bg-white text-indigo-600 shadow-xs ring-1 ring-slate-900/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Image Converter</span>
                    <span className="hidden md:inline text-[10px] font-mono text-slate-400">JPG • PNG • WebP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPdfTools(pdfSubTab)}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      mainTool === 'pdf-tools'
                        ? 'bg-white text-rose-600 shadow-xs ring-1 ring-slate-900/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-rose-600" />
                    <span>PDF Tools Suite</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">
                      2 in 1
                    </span>
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium px-2 hidden sm:block">
                  {mainTool === 'image-converter' ? (
                    <span>Batch processing up to 100 images • 100% In-Browser</span>
                  ) : (
                    <span>Combine Images to PDF or Extract PDF to Images</span>
                  )}
                </div>
              </div>

              {/* Workspace Content according to active tool */}
              {mainTool === 'image-converter' ? (
                /* Mode 1: Bulk Image Converter (JPG, PNG, WebP) */
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Upload Dropzone */}
                  <UploadDropzone
                    onFilesSelected={handleFilesSelected}
                    rejections={rejections}
                    onDismissRejection={(idx) =>
                      setRejections((prev) => prev.filter((_, i) => i !== idx))
                    }
                    onClearRejections={() => setRejections([])}
                    currentCount={items.length}
                    maxFiles={BRAND_CONFIG.limits.maxFilesPerBatch}
                    inputRef={fileInputRef}
                  />

                  {/* Upload Confirmation Feedback Banner */}
                  <UploadConfirmation
                    notification={uploadNotification}
                    onDismiss={() => setUploadNotification(null)}
                    onScrollToConversion={scrollToConversionSection}
                  />

                  {/* Controls & Queue Area */}
                  {items.length > 0 && (
                    <div
                      ref={conversionSectionRef}
                      id="conversion-section"
                      className="scroll-mt-24 space-y-6 animate-in fade-in duration-200"
                    >
                      {/* Conversion Controls */}
                      <ConversionControls
                        settings={settings}
                        onUpdateSettings={handleUpdateSettings}
                        onStartConversion={handleStartConversion}
                        onCancelConversion={handleCancelConversion}
                        onRetryFailed={handleRetryFailed}
                        onClearQueue={handleClearQueueRequest}
                        isConverting={isConverting}
                        isConvertingPdf={isConvertingPdf}
                        pdfProgressText={pdfProgressText}
                        summary={summary}
                        totalFiles={items.length}
                      />

                      {/* Result Displays: PDF Result Card or Standard Batch Summary */}
                      {isPdfMode ? (
                        <PdfResultCard
                          result={pdfResult}
                          onDownload={handleDownloadPdf}
                          onStartNewBatch={handleStartNewBatch}
                          error={pdfError}
                        />
                      ) : (
                        <ConversionSummary
                          summary={summary}
                          onDownloadZip={handleDownloadZip}
                          onStartNewBatch={handleStartNewBatch}
                          isZipping={isZipping}
                          zipProgress={zipProgress}
                        />
                      )}

                      {/* Queue List with PDF Page Reordering */}
                      <FileQueue
                        items={items}
                        isPdfMode={isPdfMode}
                        onRemove={handleRemoveItem}
                        onRetry={handleRetrySingle}
                        onDownloadSingle={handleDownloadSingle}
                        onPreview={(item) => setPreviewItem(item)}
                        onMoveUp={handleMoveItemUp}
                        onMoveDown={handleMoveItemDown}
                        isConvertingBatch={isConverting || isConvertingPdf}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Mode 2: PDF Tools Suite (Option A: Images to PDF & Option B: PDF to Images) */
                <PdfToolsSection
                  activeTab={pdfSubTab}
                  onTabChange={(tab) => {
                    setPdfSubTab(tab);
                    if (tab === 'images-to-pdf') {
                      setSettings((prev) => ({ ...prev, format: 'pdf' }));
                    }
                  }}
                  optionAContent={
                    <div className="space-y-8 animate-in fade-in duration-200">
                      {/* Upload Dropzone for Images */}
                      <UploadDropzone
                        onFilesSelected={handleFilesSelected}
                        rejections={rejections}
                        onDismissRejection={(idx) =>
                          setRejections((prev) => prev.filter((_, i) => i !== idx))
                        }
                        onClearRejections={() => setRejections([])}
                        currentCount={items.length}
                        maxFiles={BRAND_CONFIG.limits.maxFilesPerBatch}
                        inputRef={fileInputRef}
                      />

                      {/* Upload Confirmation Feedback Banner */}
                      <UploadConfirmation
                        notification={uploadNotification}
                        onDismiss={() => setUploadNotification(null)}
                        onScrollToConversion={scrollToConversionSection}
                      />

                      {/* Controls & Queue Area */}
                      {items.length > 0 && (
                        <div
                          ref={conversionSectionRef}
                          id="conversion-section"
                          className="scroll-mt-24 space-y-6 animate-in fade-in duration-200"
                        >
                          <ConversionControls
                            settings={{ ...settings, format: 'pdf' }}
                            onUpdateSettings={handleUpdateSettings}
                            onStartConversion={handleStartConversion}
                            onCancelConversion={handleCancelConversion}
                            onRetryFailed={handleRetryFailed}
                            onClearQueue={handleClearQueueRequest}
                            isConverting={isConverting}
                            isConvertingPdf={isConvertingPdf}
                            pdfProgressText={pdfProgressText}
                            summary={summary}
                            totalFiles={items.length}
                          />

                          <PdfResultCard
                            result={pdfResult}
                            onDownload={handleDownloadPdf}
                            onStartNewBatch={handleStartNewBatch}
                            error={pdfError}
                          />

                          <FileQueue
                            items={items}
                            isPdfMode={true}
                            onRemove={handleRemoveItem}
                            onRetry={handleRetrySingle}
                            onDownloadSingle={handleDownloadSingle}
                            onPreview={(item) => setPreviewItem(item)}
                            onMoveUp={handleMoveItemUp}
                            onMoveDown={handleMoveItemDown}
                            isConvertingBatch={isConverting || isConvertingPdf}
                          />
                        </div>
                      )}
                    </div>
                  }
                />
              )}
            </section>

            {/* AdSense Unit Slot (Clean separator before educational content) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AdSenseNotice slotName="Converter Mid-Banner" />
            </div>

            {/* Educational & Explanatory Sections */}
            <SupportedFormats onNavigate={handleNavigate} />
            <HowItWorks />
            <PrivacySection />
            <FaqSection onNavigate={handleNavigate} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectFormat={(fmt) => handleStartWithFormat(fmt)}
      />

      {/* Preview Modal */}
      <PreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onDownload={handleDownloadSingle}
      />

      {/* Clear Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmClearOpen}
        title="Clear Current Batch?"
        message="You have converted files in memory. Clearing the queue will remove all images and you will need to re-convert them if needed."
        confirmLabel="Clear All Images"
        cancelLabel="Keep Images"
        onConfirm={executeClearQueue}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </div>
  );
}
