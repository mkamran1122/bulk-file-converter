import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Settings2,
  Image as ImageIcon,
  Sliders,
  Maximize2,
  Download,
  Archive,
  RotateCcw,
  Square,
  Eye,
  Check,
  X,
  Layers,
  ArrowDown,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  loadPdfDocument,
  renderPageThumbnail,
  convertPdfPagesToImages,
  parsePageRangeString,
  RESOLUTION_SCALES,
  PdfImageFormat,
  PdfResolution,
  ConvertedPdfPage,
  PdfDocumentInfo,
} from '../utils/pdfToImageConverter';
import { createZipFromBlobs, triggerBlobDownload } from '../utils/zipArchive';
import { formatBytes } from '../utils/imageConverter';
import * as pdfjsLib from 'pdfjs-dist';

interface PageThumbnailData {
  pageNumber: number;
  dataUrl?: string;
  width?: number;
  height?: number;
  loading: boolean;
  error?: string;
}

type PageSelectionMode = 'all' | 'single' | 'range' | 'custom';

export const PdfToImagesConverter: React.FC = () => {
  // Upload and loaded PDF state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [docInfo, setDocInfo] = useState<PdfDocumentInfo | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Conversion Settings
  const [targetFormat, setTargetFormat] = useState<PdfImageFormat>('jpg');
  const [quality, setQuality] = useState<number>(0.85);
  const [resolution, setResolution] = useState<PdfResolution>('medium');
  const [selectionMode, setSelectionMode] = useState<PageSelectionMode>('all');
  const [singlePageNumber, setSinglePageNumber] = useState<number>(1);
  const [customRangeText, setCustomRangeText] = useState<string>('1-5');
  const [selectedPagesSet, setSelectedPagesSet] = useState<Set<number>>(new Set());

  // Thumbnails
  const [thumbnails, setThumbnails] = useState<PageThumbnailData[]>([]);
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(false);

  // Conversion Execution State
  const [isConverting, setIsConverting] = useState(false);
  const [convertProgress, setConvertProgress] = useState<{ current: number; total: number; page: number } | null>(null);
  const [convertError, setConvertError] = useState<string | null>(null);
  const [conversionResults, setConversionResults] = useState<ConvertedPdfPage[]>([]);
  const [conversionSuccessTimeMs, setConversionSuccessTimeMs] = useState<number | null>(null);

  // ZIP Download State
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  // Preview Modal for Converted or Thumbnail Image
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; width?: number; height?: number } | null>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const settingsSectionRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Scroll to settings section smoothly
  const scrollToSettings = useCallback(() => {
    if (settingsSectionRef.current) {
      const headerOffset = 84;
      const elementPosition = settingsSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  }, []);

  // Scroll to results section smoothly
  const scrollToResults = useCallback(() => {
    if (resultsRef.current) {
      const headerOffset = 84;
      const elementPosition = resultsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  }, []);

  // Cleanup Object URLs on unmount or reset
  const cleanupResults = useCallback(() => {
    conversionResults.forEach((res) => {
      URL.revokeObjectURL(res.url);
    });
  }, [conversionResults]);

  useEffect(() => {
    return () => {
      cleanupResults();
    };
  }, [cleanupResults]);

  // Handle PDF file selection
  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Check basic type or extension
    const isPdfExt = file.name.toLowerCase().endsWith('.pdf');
    const isPdfMime = file.type === 'application/pdf';

    if (!isPdfExt && !isPdfMime) {
      setUploadError('Invalid file type. Please upload a valid PDF document (.pdf).');
      setUploadSuccess(null);
      return;
    }

    // Size limit check (e.g. 100 MB max for in-browser PDF memory safety)
    if (file.size > 100 * 1024 * 1024) {
      setUploadError(`This PDF file is ${formatBytes(file.size)}, which exceeds the recommended 100 MB in-browser limit.`);
      setUploadSuccess(null);
      return;
    }

    setIsLoadingPdf(true);
    setUploadError(null);
    setUploadSuccess(null);
    setConvertError(null);
    cleanupResults();
    setConversionResults([]);
    setConversionSuccessTimeMs(null);

    try {
      const { doc, info } = await loadPdfDocument(file);
      setPdfFile(file);
      setPdfDoc(doc);
      setDocInfo(info);

      // Default selected pages to all pages
      const allPages = new Set<number>();
      for (let i = 1; i <= info.pageCount; i++) {
        allPages.add(i);
      }
      setSelectedPagesSet(allPages);
      setSinglePageNumber(1);
      setCustomRangeText(`1-${Math.min(info.pageCount, 5)}`);

      setUploadSuccess(`PDF loaded successfully: "${info.name}" (${info.pageCount} page${info.pageCount > 1 ? 's' : ''}, ${formatBytes(info.size)})`);

      // Initialize thumbnail placeholders
      const placeholderThumbs: PageThumbnailData[] = [];
      for (let p = 1; p <= info.pageCount; p++) {
        placeholderThumbs.push({
          pageNumber: p,
          loading: true,
        });
      }
      setThumbnails(placeholderThumbs);

      // Smooth scroll to conversion settings
      setTimeout(() => {
        scrollToSettings();
      }, 100);

      // Load initial batch of thumbnails progressively (first 12 pages, or up to 24)
      loadInitialThumbnails(doc, info.pageCount);
    } catch (err: any) {
      setUploadError(err?.message || 'Failed to open PDF document. It may be corrupted or password-protected.');
      setPdfFile(null);
      setPdfDoc(null);
      setDocInfo(null);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  // Progressively render thumbnails so page doesn't freeze
  const loadInitialThumbnails = async (doc: pdfjsLib.PDFDocumentProxy, pageCount: number) => {
    setIsLoadingThumbnails(true);
    const maxToLoad = Math.min(pageCount, 16); // render first 16 thumbnails initially

    for (let p = 1; p <= maxToLoad; p++) {
      try {
        const thumb = await renderPageThumbnail(doc, p);
        setThumbnails((prev) =>
          prev.map((t) =>
            t.pageNumber === p
              ? { ...t, dataUrl: thumb.dataUrl, width: thumb.width, height: thumb.height, loading: false }
              : t
          )
        );
      } catch (e: any) {
        setThumbnails((prev) =>
          prev.map((t) => (t.pageNumber === p ? { ...t, loading: false, error: 'Preview unavailable' } : t))
        );
      }
    }
    setIsLoadingThumbnails(false);
  };

  // Load remaining thumbnails on request
  const loadRemainingThumbnails = async () => {
    if (!pdfDoc || !docInfo) return;
    setIsLoadingThumbnails(true);

    for (let p = 1; p <= docInfo.pageCount; p++) {
      const existing = thumbnails.find((t) => t.pageNumber === p);
      if (existing?.dataUrl) continue;

      try {
        const thumb = await renderPageThumbnail(pdfDoc, p);
        setThumbnails((prev) =>
          prev.map((t) =>
            t.pageNumber === p
              ? { ...t, dataUrl: thumb.dataUrl, width: thumb.width, height: thumb.height, loading: false }
              : t
          )
        );
      } catch (e: any) {
        setThumbnails((prev) =>
          prev.map((t) => (t.pageNumber === p ? { ...t, loading: false, error: 'Preview unavailable' } : t))
        );
      }
    }
    setIsLoadingThumbnails(false);
  };

  // Determine which pages are effectively targeted for conversion
  const effectivePagesToConvert = useMemo<number[]>(() => {
    if (!docInfo) return [];

    if (selectionMode === 'all') {
      const pages: number[] = [];
      for (let p = 1; p <= docInfo.pageCount; p++) pages.push(p);
      return pages;
    }

    if (selectionMode === 'single') {
      const p = Math.max(1, Math.min(singlePageNumber, docInfo.pageCount));
      return [p];
    }

    if (selectionMode === 'range') {
      const parsed = parsePageRangeString(customRangeText, docInfo.pageCount);
      return parsed.validPages;
    }

    if (selectionMode === 'custom') {
      return Array.from(selectedPagesSet).sort((a, b) => a - b);
    }

    return [];
  }, [docInfo, selectionMode, singlePageNumber, customRangeText, selectedPagesSet]);

  // Toggle individual page checkbox
  const handleTogglePageCheckbox = (pageNumber: number) => {
    setSelectedPagesSet((prev) => {
      const next = new Set(prev);
      if (next.has(pageNumber)) {
        next.delete(pageNumber);
      } else {
        next.add(pageNumber);
      }
      return next;
    });
    // Switch to custom mode when interacting with checkboxes directly
    setSelectionMode('custom');
  };

  // Selection helpers
  const handleSelectAllPages = () => {
    if (!docInfo) return;
    const all = new Set<number>();
    for (let p = 1; p <= docInfo.pageCount; p++) {
      all.add(p);
    }
    setSelectedPagesSet(all);
    setSelectionMode('all');
  };

  const handleDeselectAllPages = () => {
    setSelectedPagesSet(new Set());
    setSelectionMode('custom');
  };

  const handleSelectOddPages = () => {
    if (!docInfo) return;
    const odd = new Set<number>();
    for (let p = 1; p <= docInfo.pageCount; p += 2) odd.add(p);
    setSelectedPagesSet(odd);
    setSelectionMode('custom');
  };

  const handleSelectEvenPages = () => {
    if (!docInfo) return;
    const even = new Set<number>();
    for (let p = 2; p <= docInfo.pageCount; p += 2) even.add(p);
    setSelectedPagesSet(even);
    setSelectionMode('custom');
  };

  // Execute PDF to Image conversion
  const handleStartConversion = async () => {
    if (!pdfDoc || !docInfo || effectivePagesToConvert.length === 0 || isConverting) {
      return;
    }

    setIsConverting(true);
    setConvertError(null);
    setConvertProgress({ current: 0, total: effectivePagesToConvert.length, page: effectivePagesToConvert[0] });
    cleanupResults();
    setConversionResults([]);
    setConversionSuccessTimeMs(null);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const startTime = performance.now();

    try {
      const pages = await convertPdfPagesToImages(pdfDoc, docInfo.name, {
        format: targetFormat,
        quality,
        resolution,
        pages: effectivePagesToConvert,
        signal: abortController.signal,
        onProgress: (completed, total, pageNum) => {
          setConvertProgress({ current: completed, total, page: pageNum });
        },
      });

      setConversionResults(pages);
      setConversionSuccessTimeMs(Math.round(performance.now() - startTime));

      // Smooth scroll to results
      setTimeout(() => {
        scrollToResults();
      }, 100);
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setConvertError('Conversion cancelled by user.');
      } else {
        setConvertError(err?.message || 'An error occurred while converting PDF pages to images.');
      }
    } finally {
      setIsConverting(false);
      setConvertProgress(null);
      abortControllerRef.current = null;
    }
  };

  // Cancel ongoing conversion
  const handleCancelConversion = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Reset tool to upload another PDF
  const handleReset = () => {
    cleanupResults();
    setPdfFile(null);
    setPdfDoc(null);
    setDocInfo(null);
    setThumbnails([]);
    setConversionResults([]);
    setUploadError(null);
    setUploadSuccess(null);
    setConvertError(null);
    setConversionSuccessTimeMs(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download all converted images as a ZIP archive
  const handleDownloadAllZip = async () => {
    if (conversionResults.length === 0 || isZipping) return;

    setIsZipping(true);
    setZipProgress(0);

    try {
      const zipBlob = await createZipFromBlobs(
        conversionResults.map((res) => ({
          fileName: res.fileName,
          blob: res.blob,
        })),
        (percent) => {
          setZipProgress(percent);
        }
      );

      const baseName = docInfo ? docInfo.name.replace(/\.pdf$/i, '') : 'document';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const zipFileName = `${baseName}-images-${targetFormat}-${timestamp}.zip`;
      triggerBlobDownload(zipBlob, zipFileName);
    } catch (err: any) {
      alert(`Failed to create ZIP: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsZipping(false);
      setZipProgress(0);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. PDF Upload Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Option B: PDF to Images
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Extract PDF pages into high-resolution JPG, PNG, or WebP images locally with zero server uploads.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% In-Browser & Private</span>
          </div>
        </div>

        {/* Upload Drop Area */}
        <div className="mt-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />

          {!docInfo ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer group ${
                uploadError
                  ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50/70'
                  : 'border-slate-300 hover:border-rose-400 bg-slate-50/60 hover:bg-rose-50/30'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 group-hover:border-rose-300 transition-all text-rose-600">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900 tracking-tight mb-1">
                Drop your PDF file here, or <span className="text-rose-600 underline underline-offset-2">browse</span>
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Supports single PDF documents up to 100 MB. Renders page-by-page directly in your browser memory.
              </p>

              {isLoadingPdf && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-rose-600">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                  <span>Loading & analyzing PDF pages...</span>
                </div>
              )}
            </div>
          ) : (
            /* Active PDF Summary Card */
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 truncate text-sm sm:text-base">
                      {docInfo.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold font-mono">
                      {docInfo.pageCount} page{docInfo.pageCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    {formatBytes(docInfo.size)} • PDF Document
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
                >
                  Change PDF
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors shadow-2xs"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Upload Status / Error Notices */}
          {uploadError && (
            <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Cannot load PDF: </span>
                <span>{uploadError}</span>
              </div>
              <button
                type="button"
                onClick={() => setUploadError(null)}
                className="text-rose-400 hover:text-rose-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {uploadSuccess && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-950 animate-in fade-in">
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold truncate">{uploadSuccess}</span>
              </div>
              <button
                type="button"
                onClick={scrollToSettings}
                className="text-emerald-700 hover:text-emerald-800 font-bold underline underline-offset-2 shrink-0 text-xs flex items-center gap-1"
              >
                <span>Adjust settings</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. PDF Conversion Settings & Page Selection Section */}
      {docInfo && (
        <div
          ref={settingsSectionRef}
          id="pdf-to-images-settings"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-7 scroll-mt-24 animate-in fade-in"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Conversion Settings
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose format, image quality, page range, and resolution scale
              </p>
            </div>

            <div className="text-xs text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              Selected:{' '}
              <span className="font-bold text-rose-600">
                {effectivePagesToConvert.length} of {docInfo.pageCount}
              </span>{' '}
              pages
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Format Selection */}
            <div className="md:col-span-6 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Target Output Format
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['jpg', 'png', 'webp'] as PdfImageFormat[]).map((fmt) => {
                  const isSelected = targetFormat === fmt;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      disabled={isConverting}
                      onClick={() => setTargetFormat(fmt)}
                      className={`relative p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/50 text-slate-900 ring-2 ring-rose-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold uppercase">{fmt}</span>
                        {isSelected && <Check className="w-4 h-4 text-rose-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {fmt === 'jpg' ? 'Standard photo' : fmt === 'png' ? 'Lossless raster' : 'Modern web'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quality Slider for JPG / WebP */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    <span>Compression Quality</span>
                  </span>
                  <span className="font-mono font-bold text-rose-600">
                    {targetFormat === 'png' ? 'Lossless (100%)' : `${Math.round(quality * 100)}%`}
                  </span>
                </div>

                <div className="pt-2">
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={1}
                    value={Math.round(quality * 100)}
                    disabled={targetFormat === 'png' || isConverting}
                    onChange={(e) => setQuality(Number(e.target.value) / 100)}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-rose-600 ${
                      targetFormat === 'png' || isConverting
                        ? 'bg-slate-200 cursor-not-allowed opacity-60'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>10% (Small)</span>
                    <span>85% (Optimal)</span>
                    <span>100% (Max)</span>
                  </div>
                </div>

                {targetFormat === 'png' && (
                  <p className="text-[11px] text-slate-500 mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    PNG preserves every pixel losslessly. The quality setting does not apply.
                  </p>
                )}
              </div>
            </div>

            {/* Resolution Scale Options */}
            <div className="md:col-span-6 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Image Resolution / Rendering Scale
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {(['low', 'medium', 'high'] as PdfResolution[]).map((res) => {
                  const isSelected = resolution === res;
                  const item = RESOLUTION_SCALES[res];
                  return (
                    <button
                      key={res}
                      type="button"
                      disabled={isConverting}
                      onClick={() => setResolution(res)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/50 text-slate-900 ring-2 ring-rose-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold capitalize">{res}</span>
                        <span className="text-[10px] font-mono text-slate-400">{item.dpiLabel}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {res === 'low' ? '1.0x (Fast)' : res === 'medium' ? '1.5x (Balanced)' : '2.0x (Crisp)'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Informative resolution notice */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold">Note on resolution: </span>
                  {RESOLUTION_SCALES[resolution].description}. Higher resolution increases memory usage, processing time, and output image file size.
                </div>
              </div>
            </div>
          </div>

          {/* Page Selection Controls */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Pages to Convert
              </label>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleSelectAllPages}
                  disabled={isConverting}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  All ({docInfo.pageCount})
                </button>
                <button
                  type="button"
                  onClick={handleSelectOddPages}
                  disabled={isConverting}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Odd Pages
                </button>
                <button
                  type="button"
                  onClick={handleSelectEvenPages}
                  disabled={isConverting}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Even Pages
                </button>
                <button
                  type="button"
                  onClick={handleDeselectAllPages}
                  disabled={isConverting}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            {/* Selection Mode Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                disabled={isConverting}
                onClick={() => {
                  setSelectionMode('all');
                  handleSelectAllPages();
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  selectionMode === 'all'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Pages ({docInfo.pageCount})
              </button>

              <button
                type="button"
                disabled={isConverting}
                onClick={() => setSelectionMode('single')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  selectionMode === 'single'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Single Page
              </button>

              <button
                type="button"
                disabled={isConverting}
                onClick={() => setSelectionMode('range')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  selectionMode === 'range'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Custom Range (e.g. 1-5)
              </button>

              <button
                type="button"
                disabled={isConverting}
                onClick={() => setSelectionMode('custom')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  selectionMode === 'custom'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Custom Checkboxes ({selectedPagesSet.size})
              </button>
            </div>

            {/* Single Page Input */}
            {selectionMode === 'single' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <span className="text-xs font-medium text-slate-700">Choose page number:</span>
                <input
                  type="number"
                  min={1}
                  max={docInfo.pageCount}
                  value={singlePageNumber}
                  onChange={(e) => setSinglePageNumber(parseInt(e.target.value, 10) || 1)}
                  className="w-20 px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono text-center font-bold"
                />
                <span className="text-xs text-slate-500">out of {docInfo.pageCount} pages</span>
              </div>
            )}

            {/* Custom Range Input */}
            {selectionMode === 'range' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-700">Page Range:</span>
                  <input
                    type="text"
                    value={customRangeText}
                    onChange={(e) => setCustomRangeText(e.target.value)}
                    placeholder="e.g. 1-4, 7, 9-11"
                    className="flex-1 max-w-sm px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                  />
                  <span className="text-xs font-medium text-slate-500">
                    ({effectivePagesToConvert.length} pages matched)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Separate individual pages with commas or specify ranges with hyphens (e.g. 1-3, 5, 8).
                </div>
              </div>
            )}

            {/* Page Thumbnails Preview Grid */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Page Previews & Selection ({docInfo.pageCount} total)</span>
                </div>

                {!isLoadingThumbnails && thumbnails.some((t) => !t.dataUrl) && (
                  <button
                    type="button"
                    onClick={loadRemainingThumbnails}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Load all page previews
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-72 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200/80">
                {thumbnails.map((item) => {
                  const isChecked =
                    selectionMode === 'all'
                      ? true
                      : selectionMode === 'single'
                      ? item.pageNumber === singlePageNumber
                      : selectionMode === 'range'
                      ? effectivePagesToConvert.includes(item.pageNumber)
                      : selectedPagesSet.has(item.pageNumber);

                  return (
                    <div
                      key={item.pageNumber}
                      onClick={() => handleTogglePageCheckbox(item.pageNumber)}
                      className={`relative group rounded-xl border p-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-400/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Checkbox indicator */}
                      <div className="w-full flex items-center justify-between text-[11px] font-bold mb-1.5 px-0.5">
                        <span className={isChecked ? 'text-rose-700' : 'text-slate-500'}>
                          P. {item.pageNumber}
                        </span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Thumbnail Image */}
                      <div className="w-full aspect-[3/4] bg-white rounded border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs">
                        {item.dataUrl ? (
                          <img
                            src={item.dataUrl}
                            alt={`Page ${item.pageNumber}`}
                            className="w-full h-full object-contain"
                          />
                        ) : item.loading ? (
                          <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span className="text-[10px] text-slate-400">PDF</span>
                        )}
                      </div>

                      {/* Quick preview hover button */}
                      {item.dataUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage({
                              url: item.dataUrl!,
                              title: `${docInfo.name} — Page ${item.pageNumber}`,
                              width: item.width,
                              height: item.height,
                            });
                          }}
                          className="mt-1.5 text-[10px] text-slate-500 hover:text-slate-800 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              {isConverting ? (
                <span className="text-rose-600 font-semibold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                  <span>
                    Converting page {convertProgress?.current || 0} of {convertProgress?.total || 0}...
                  </span>
                </span>
              ) : effectivePagesToConvert.length === 0 ? (
                <span className="text-amber-600 font-medium">Please select at least one page to convert.</span>
              ) : (
                <span>
                  Ready to render{' '}
                  <span className="font-bold text-slate-900">{effectivePagesToConvert.length}</span> page
                  {effectivePagesToConvert.length > 1 ? 's' : ''} to{' '}
                  <span className="font-bold text-rose-600 uppercase">{targetFormat}</span> at{' '}
                  <span className="font-semibold text-slate-800">{RESOLUTION_SCALES[resolution].dpiLabel}</span>.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isConverting ? (
                <button
                  type="button"
                  onClick={handleCancelConversion}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center justify-center gap-2"
                >
                  <Square className="w-4 h-4 fill-rose-700" />
                  <span>Cancel Conversion</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartConversion}
                  disabled={effectivePagesToConvert.length === 0}
                  className={`w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-sm flex items-center justify-center gap-2 ${
                    effectivePagesToConvert.length === 0
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-rose-200'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>
                    Convert to {targetFormat.toUpperCase()} ({effectivePagesToConvert.length} Page
                    {effectivePagesToConvert.length > 1 ? 's' : ''})
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Conversion Error */}
          {convertError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">{convertError}</div>
              <button
                type="button"
                onClick={() => setConvertError(null)}
                className="text-rose-400 hover:text-rose-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Conversion Results Area */}
      {conversionResults.length > 0 && (
        <div
          ref={resultsRef}
          id="pdf-to-images-results"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 scroll-mt-24 animate-in fade-in"
        >
          {/* Success Banner Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Converted Images ({conversionResults.length} file{conversionResults.length > 1 ? 's' : ''})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Processed locally in {conversionSuccessTimeMs ? `${(conversionSuccessTimeMs / 1000).toFixed(2)}s` : 'a few moments'}. Download individually or package all into a ZIP archive.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
              >
                <Archive className="w-4 h-4" />
                <span>
                  {isZipping ? `Compressing ZIP (${zipProgress}%)...` : `Download All as ZIP (${conversionResults.length})`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Convert Another</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {conversionResults.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between group hover:border-slate-300 transition-all hover:shadow-xs"
              >
                <div>
                  {/* Thumbnail / Preview container */}
                  <div
                    onClick={() =>
                      setPreviewImage({
                        url: item.url,
                        title: item.fileName,
                        width: item.width,
                        height: item.height,
                      })
                    }
                    className="relative w-full aspect-[3/4] bg-white rounded-xl border border-slate-200/80 overflow-hidden cursor-pointer group-hover:border-slate-300 transition-colors flex items-center justify-center shadow-2xs"
                  >
                    <img
                      src={item.url}
                      alt={item.fileName}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-lg bg-white/90 text-slate-900 text-[11px] font-bold shadow-sm flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>Preview</span>
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold font-mono">
                      P. {item.pageNumber}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-2.5 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate" title={item.fileName}>
                      {item.fileName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-0.5">
                      <span>{formatBytes(item.size)}</span>
                      <span>
                        {item.width} × {item.height} px
                      </span>
                    </div>
                  </div>
                </div>

                {/* Individual Download Button */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerBlobDownload(item.blob, item.fileName)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{previewImage.title}</h4>
                {previewImage.width && previewImage.height && (
                  <p className="text-xs text-slate-400 font-mono">
                    {previewImage.width} × {previewImage.height} px
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[70vh] object-contain rounded-lg shadow-sm"
              />
            </div>
            <div className="px-6 py-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
