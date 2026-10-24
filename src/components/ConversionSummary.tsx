import React from 'react';
import { BatchSummary } from '../types';
import { formatBytes } from '../utils/imageConverter';
import { Archive, CheckCircle2, AlertTriangle, ArrowDownRight, ArrowUpRight, PlusCircle, Loader2 } from 'lucide-react';

interface ConversionSummaryProps {
  summary: BatchSummary;
  onDownloadZip: () => void;
  onStartNewBatch: () => void;
  isZipping: boolean;
  zipProgress: number;
}

export const ConversionSummary: React.FC<ConversionSummaryProps> = ({
  summary,
  onDownloadZip,
  onStartNewBatch,
  isZipping,
  zipProgress,
}) => {
  if (summary.completed === 0 && summary.failed === 0) {
    return null;
  }

  const isReduction = summary.sizeDiffBytes < 0;
  const isIncrease = summary.sizeDiffBytes > 0;
  const absDiff = Math.abs(summary.sizeDiffBytes);
  const percentText = Math.abs(summary.sizeDiffPercent).toFixed(1);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Summary Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Batch Conversion Results
            </span>
            {summary.completed > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                {summary.completed} ready for download
              </span>
            )}
            {summary.failed > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
                {summary.failed} failed
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Original Total Size */}
            <div>
              <div className="text-xs text-slate-400 font-medium">Original Size</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-200 mt-0.5">
                {formatBytes(summary.originalTotalSize)}
              </div>
            </div>

            {/* Converted Total Size */}
            <div>
              <div className="text-xs text-slate-400 font-medium">Converted Size</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5">
                {formatBytes(summary.convertedTotalSize)}
              </div>
            </div>

            {/* Delta / Honest Size Difference */}
            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-400 font-medium">Net Size Change</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {isReduction ? (
                  <>
                    <ArrowDownRight className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      -{percentText}%
                    </span>
                  </>
                ) : isIncrease ? (
                  <>
                    <ArrowUpRight className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                      +{percentText}%
                    </span>
                  </>
                ) : (
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-300">
                    0.0%
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isReduction
                  ? `Saved ${formatBytes(absDiff)}`
                  : isIncrease
                  ? `Increased by ${formatBytes(absDiff)}`
                  : 'Identical size'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Primary Batch Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[260px]">
          <button
            onClick={onDownloadZip}
            disabled={summary.completed === 0 || isZipping}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-md shadow-indigo-950/50 transition-all disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Creating ZIP ({zipProgress}%)...</span>
              </>
            ) : (
              <>
                <Archive className="w-4 h-4" />
                <span>Download All as ZIP ({summary.completed})</span>
              </>
            )}
          </button>

          <button
            onClick={onStartNewBatch}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-200 border border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <PlusCircle className="w-4 h-4 text-slate-400" />
            <span>Start a New Batch</span>
          </button>
        </div>
      </div>

      {isZipping && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-200"
              style={{ width: `${zipProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
