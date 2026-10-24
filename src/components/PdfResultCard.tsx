import React from 'react';
import { PdfResult } from '../types';
import { formatBytes } from '../utils/imageConverter';
import { FileText, Download, Eye, PlusCircle, CheckCircle2, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface PdfResultCardProps {
  result: PdfResult | null;
  onDownload: () => void;
  onStartNewBatch: () => void;
  error?: string | null;
}

export const PdfResultCard: React.FC<PdfResultCardProps> = ({
  result,
  onDownload,
  onStartNewBatch,
  error,
}) => {
  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-bold text-rose-900 text-sm">PDF Conversion Failed</h3>
          <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
          <div className="pt-2">
            <button
              onClick={onStartNewBatch}
              type="button"
              className="text-xs font-semibold text-rose-800 underline underline-offset-2 hover:text-rose-950"
            >
              Reset queue and try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden animate-in fade-in duration-200">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Summary Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PDF Document Ready</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Compiled Locally</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <div className="text-xs text-slate-400 font-medium">Total Pages</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5">
                {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium">Document Size</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5">
                {formatBytes(result.size)}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-400 font-medium">Compilation Time</div>
              <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold font-mono text-slate-300 mt-0.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{result.durationMs}ms</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[200px]" title={result.fileName}>
                {result.fileName}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Primary Batch Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[260px]">
          <button
            onClick={onDownload}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-md shadow-rose-950/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Preview in Browser</span>
            </a>

            <button
              onClick={onStartNewBatch}
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>New Batch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
