import React from 'react';
import { BatchFileItem } from '../types';
import { formatBytes } from '../utils/imageConverter';
import {
  Download,
  Trash2,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Clock,
  Ban,
  ArrowRight,
  Maximize2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface FileQueueItemProps {
  item: BatchFileItem;
  index: number;
  totalItems: number;
  isPdfMode?: boolean;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onDownloadSingle: (item: BatchFileItem) => void;
  onPreview: (item: BatchFileItem) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isConvertingBatch: boolean;
}

export const FileQueueItem: React.FC<FileQueueItemProps> = ({
  item,
  index,
  totalItems,
  isPdfMode = false,
  onRemove,
  onRetry,
  onDownloadSingle,
  onPreview,
  onMoveUp,
  onMoveDown,
  isConvertingBatch,
}) => {
  const isConverting = item.status === 'converting';
  const isCompleted = item.status === 'completed';
  const isFailed = item.status === 'failed';
  const isCancelled = item.status === 'cancelled';
  const isReady = item.status === 'ready';

  // Size difference calculation
  let diffBadge = null;
  if (!isPdfMode && isCompleted && item.convertedSize !== null) {
    const diffBytes = item.convertedSize - item.size;
    const diffPercent = Math.round((diffBytes / item.size) * 100);
    const isSmaller = diffBytes < 0;
    const isLarger = diffBytes > 0;

    diffBadge = (
      <span
        className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded ${
          isSmaller
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
            : isLarger
            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
            : 'bg-slate-100 text-slate-600'
        }`}
      >
        {isSmaller ? `${diffPercent}%` : isLarger ? `+${diffPercent}%` : '0%'}
      </span>
    );
  }

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all ${
        isConverting
          ? 'bg-indigo-50/40 border-indigo-200 shadow-xs'
          : isCompleted
          ? 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          : isFailed
          ? 'bg-rose-50/30 border-rose-200/80 shadow-2xs'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
      }`}
    >
      {/* Left side: Reorder Controls (if PDF mode) + Thumbnail & Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Reorder Buttons (Move Up / Down) */}
        {isPdfMode && onMoveUp && onMoveDown && (
          <div className="flex flex-col gap-0.5 shrink-0 pr-1 border-r border-slate-100">
            <button
              type="button"
              onClick={() => onMoveUp(index)}
              disabled={index === 0 || isConvertingBatch}
              className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors"
              title="Move page earlier in PDF"
              aria-label={`Move ${item.name} up`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMoveDown(index)}
              disabled={index === totalItems - 1 || isConvertingBatch}
              className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors"
              title="Move page later in PDF"
              aria-label={`Move ${item.name} down`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Thumbnail with quick preview trigger */}
        <div
          onClick={() => onPreview(item)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer group/thumb"
          title="Click to view image"
        >
          <img
            src={item.convertedUrl || item.previewUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
            <Maximize2 className="w-4 h-4" />
          </div>

          {/* Formats badge overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 backdrop-blur-xs text-[9px] font-mono text-center text-white uppercase py-0.5 tracking-tight truncate">
            {item.detectedFormat !== 'unknown' ? item.detectedFormat : item.file.type.split('/')[1] || 'img'}
          </div>
        </div>

        {/* File metadata */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            {isPdfMode && (
              <span className="shrink-0 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold font-mono text-[10px]">
                Page {index + 1}
              </span>
            )}
            <p className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm md:max-w-md">
              {item.name}
            </p>
            {diffBadge}
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
            {/* Dimensions if decoded */}
            {item.dimensions && (
              <span className="font-mono text-[11px] text-slate-500">
                {item.dimensions.width}×{item.dimensions.height}
              </span>
            )}

            {/* Original -> Converted size */}
            <span className="font-mono">{formatBytes(item.size)}</span>

            {!isPdfMode && isCompleted && item.convertedSize !== null && (
              <>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="font-mono font-semibold text-slate-800">
                  {formatBytes(item.convertedSize)}
                </span>
                <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1 rounded">
                  {item.convertedFileName?.split('.').pop()}
                </span>
              </>
            )}

            {!isPdfMode && item.durationMs !== null && (
              <span className="text-[10px] text-slate-400">({item.durationMs}ms)</span>
            )}
          </div>

          {/* Error Message if failed */}
          {isFailed && item.errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-rose-700 font-medium pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{item.errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Status and actions */}
      <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Status Indicator */}
        <div className="flex items-center">
          {isReady && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{isPdfMode ? `Ready (Page ${index + 1})` : 'Ready'}</span>
            </span>
          )}

          {isConverting && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100/70 text-indigo-800 text-xs font-semibold">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>Converting...</span>
            </span>
          )}

          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Completed</span>
            </span>
          )}

          {isFailed && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100/70 text-rose-800 text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Failed</span>
            </span>
          )}

          {isCancelled && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-medium">
              <Ban className="w-3.5 h-3.5 text-amber-600" />
              <span>Cancelled</span>
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {!isPdfMode && isFailed && (
            <button
              onClick={() => onRetry(item.id)}
              disabled={isConvertingBatch}
              type="button"
              className="p-1.5 rounded-lg text-amber-700 hover:text-amber-900 hover:bg-amber-100/70 transition-colors disabled:opacity-50"
              title="Retry conversion"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {!isPdfMode && isCompleted && (
            <button
              onClick={() => onDownloadSingle(item)}
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              title="Download this converted file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
          )}

          <button
            onClick={() => onRemove(item.id)}
            disabled={isConvertingBatch}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
            title="Remove from batch"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
