import React from 'react';
import { SupportedFormat, ConversionSettings, BatchSummary, PdfPageFit } from '../types';
import {
  Play,
  Square,
  RotateCcw,
  Trash2,
  Settings2,
  Check,
  Info,
  FileText,
  FileImage,
  ArrowUpDown,
} from 'lucide-react';

interface ConversionControlsProps {
  settings: ConversionSettings;
  onUpdateSettings: (newSettings: Partial<ConversionSettings>) => void;
  onStartConversion: () => void;
  onCancelConversion: () => void;
  onRetryFailed: () => void;
  onClearQueue: () => void;
  isConverting: boolean;
  isConvertingPdf?: boolean;
  pdfProgressText?: string;
  summary: BatchSummary;
  totalFiles: number;
}

export const ConversionControls: React.FC<ConversionControlsProps> = ({
  settings,
  onUpdateSettings,
  onStartConversion,
  onCancelConversion,
  onRetryFailed,
  onClearQueue,
  isConverting,
  isConvertingPdf = false,
  pdfProgressText = '',
  summary,
  totalFiles,
}) => {
  const isPdf = settings.format === 'pdf';
  const isPng = settings.format === 'png';
  const isBusy = isConverting || isConvertingPdf;
  const hasEligibleFiles = isPdf ? totalFiles > 0 : summary.ready > 0 || summary.failed > 0;
  const hasCompletedFiles = summary.completed > 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-indigo-600" />
              <span>Conversion Settings</span>
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              <FileImage className="w-3.5 h-3.5" />
              <span>{totalFiles} image{totalFiles === 1 ? '' : 's'} selected</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure output format, compression ratio, page fitting, and processing options
          </p>
        </div>

        {/* Global Batch Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isPdf && summary.failed > 0 && !isBusy && (
            <button
              onClick={onRetryFailed}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Failed ({summary.failed})</span>
            </button>
          )}

          {totalFiles > 0 && (
            <button
              onClick={onClearQueue}
              type="button"
              disabled={isBusy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Output Format Picker */}
        <div className="md:col-span-6 space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Target Output Format
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup" aria-label="Output Format">
            {(['webp', 'jpg', 'png', 'pdf'] as SupportedFormat[]).map((fmt) => {
              const isSelected = settings.format === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onUpdateSettings({ format: fmt })}
                  disabled={isBusy}
                  className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                  } ${isBusy ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                  {fmt === 'pdf' ? (
                    <FileText className="w-4 h-4 mb-1 text-rose-600" />
                  ) : (
                    <FileImage className="w-4 h-4 mb-1 text-slate-400" />
                  )}
                  <span className="text-xs uppercase tracking-wide">
                    {fmt === 'pdf' ? 'Images to PDF' : fmt === 'jpg' ? 'JPEG / JPG' : fmt.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                    {fmt === 'pdf'
                      ? 'All in one PDF'
                      : fmt === 'webp'
                      ? 'Best compression'
                      : fmt === 'jpg'
                      ? 'Standard photo'
                      : 'Lossless'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Controls based on format */}
        {isPdf ? (
          /* PDF Specific Controls */
          <div className="md:col-span-6 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                PDF Page Fitting Mode
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ pdfPageFit: 'fit-image' })}
                  disabled={isBusy}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    settings.pdfPageFit === 'fit-image'
                      ? 'bg-white border-indigo-600 text-indigo-950 font-bold shadow-2xs'
                      : 'bg-slate-100/70 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div className="font-semibold text-xs">Fit Page to Image</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    No blank borders; exact photo aspect ratio
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateSettings({ pdfPageFit: 'a4-contain' })}
                  disabled={isBusy}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    settings.pdfPageFit === 'a4-contain'
                      ? 'bg-white border-indigo-600 text-indigo-950 font-bold shadow-2xs'
                      : 'bg-slate-100/70 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div className="font-semibold text-xs">Standard A4 Document</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Proportional contain with margins, no distortion
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="pdf-filename" className="block text-xs font-bold text-slate-700 mb-1">
                  PDF Filename
                </label>
                <input
                  id="pdf-filename"
                  type="text"
                  value={settings.pdfFileName}
                  onChange={(e) => onUpdateSettings({ pdfFileName: e.target.value })}
                  placeholder="converted-images.pdf"
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="pdf-quality" className="text-xs font-bold text-slate-700">
                    Image Quality in PDF
                  </label>
                  <span className="text-[11px] font-mono font-bold text-indigo-700">
                    {Math.round(settings.quality * 100)}%
                  </span>
                </div>
                <input
                  id="pdf-quality"
                  type="range"
                  min={50}
                  max={100}
                  step={5}
                  value={Math.round(settings.quality * 100)}
                  onChange={(e) => onUpdateSettings({ quality: Number(e.target.value) / 100 })}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-600 bg-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>
                Each image becomes a separate PDF page in the exact sequence shown in the queue below.
              </span>
            </div>
          </div>
        ) : (
          /* Standard Quality Slider for JPEG & WebP */
          <div className="md:col-span-6 space-y-2.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="quality-slider"
                className={`text-xs font-bold uppercase tracking-wider ${
                  isPng ? 'text-slate-400' : 'text-slate-700'
                }`}
              >
                Compression Quality
              </label>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isPng
                    ? 'bg-slate-100 text-slate-400'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                }`}
              >
                {isPng ? 'Lossless (100%)' : `${Math.round(settings.quality * 100)}%`}
              </span>
            </div>

            <div className="pt-2">
              <input
                id="quality-slider"
                type="range"
                min={10}
                max={100}
                step={1}
                value={Math.round(settings.quality * 100)}
                disabled={isPng || isBusy}
                onChange={(e) => onUpdateSettings({ quality: Number(e.target.value) / 100 })}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-600 ${
                  isPng || isBusy
                    ? 'bg-slate-200 cursor-not-allowed opacity-60'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label="Compression quality slider"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (Smaller file)</span>
                <span>85% (Optimal)</span>
                <span>100% (Maximum quality)</span>
              </div>
            </div>

            {isPng ? (
              <div className="flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  PNG uses lossless compression to preserve full pixel fidelity. The quality slider does not apply to PNG output.
                </span>
              </div>
            ) : settings.format === 'jpg' ? (
              <div className="flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Converting transparent images to JPEG will fill transparent pixels with clean white, as JPEG does not support transparency.
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  WebP supports lossy compression while maintaining transparency support in all modern browsers.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
        <div className="text-xs text-slate-500 w-full sm:w-auto text-center sm:text-left">
          {totalFiles === 0 ? (
            'Add images above to begin converting'
          ) : isConvertingPdf ? (
            <span className="text-rose-600 font-semibold flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>{pdfProgressText || 'Generating single PDF document in browser memory...'}</span>
            </span>
          ) : isConverting ? (
            <span className="text-indigo-600 font-semibold flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              Converting images locally ({summary.completed} of {totalFiles} finished)...
            </span>
          ) : isPdf ? (
            <span>
              Ready to compile <span className="font-semibold text-slate-900">{totalFiles}</span> image{totalFiles > 1 ? 's' : ''} into a{' '}
              <span className="font-semibold text-rose-600">Single PDF Document</span>
            </span>
          ) : hasEligibleFiles ? (
            <span>
              Ready to convert <span className="font-semibold text-slate-900">{summary.ready + summary.failed}</span> image{summary.ready + summary.failed > 1 ? 's' : ''} to{' '}
              <span className="font-semibold text-indigo-600 uppercase">{settings.format}</span>
            </span>
          ) : (
            <span className="text-emerald-700 font-medium">
              All {totalFiles} image{totalFiles > 1 ? 's' : ''} converted successfully!
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isBusy ? (
            <button
              onClick={onCancelConversion}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <Square className="w-4 h-4 fill-rose-700" />
              <span>Cancel</span>
            </button>
          ) : (
            <button
              onClick={onStartConversion}
              type="button"
              disabled={!hasEligibleFiles || totalFiles === 0}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                !hasEligibleFiles || totalFiles === 0
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  : isPdf
                  ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-rose-100'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-100'
              }`}
            >
              {isPdf ? <FileText className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>
                {isPdf
                  ? `Convert to PDF (${totalFiles} Image${totalFiles > 1 ? 's' : ''})`
                  : hasCompletedFiles && hasEligibleFiles
                  ? `Convert Remaining (${summary.ready + summary.failed})`
                  : `Convert All Images (${totalFiles})`}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
