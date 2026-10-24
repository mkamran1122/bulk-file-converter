import React, { useState } from 'react';
import { BatchFileItem } from '../types';
import { FileQueueItem } from './FileQueueItem';
import { Layers, ArrowUpDown, FileText } from 'lucide-react';

interface FileQueueProps {
  items: BatchFileItem[];
  isPdfMode?: boolean;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onDownloadSingle: (item: BatchFileItem) => void;
  onPreview: (item: BatchFileItem) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isConvertingBatch: boolean;
}

type FilterType = 'all' | 'ready' | 'completed' | 'failed';

export const FileQueue: React.FC<FileQueueProps> = ({
  items,
  isPdfMode = false,
  onRemove,
  onRetry,
  onDownloadSingle,
  onPreview,
  onMoveUp,
  onMoveDown,
  isConvertingBatch,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = items.filter((i) => i.status === 'completed').length;
  const failedCount = items.filter((i) => i.status === 'failed').length;
  const readyCount = items.filter((i) => i.status === 'ready' || i.status === 'converting').length;

  const filteredItems = items.filter((item) => {
    // In PDF mode, we show all files in page order so users can reorder accurately
    if (!isPdfMode) {
      if (filter === 'completed' && item.status !== 'completed') return false;
      if (filter === 'failed' && item.status !== 'failed') return false;
      if (filter === 'ready' && item.status !== 'ready' && item.status !== 'converting') return false;
    }

    // Filter by search term
    if (searchQuery.trim() !== '') {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header with Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {isPdfMode ? (
            <FileText className="w-4 h-4 text-rose-600" />
          ) : (
            <Layers className="w-4 h-4 text-slate-600" />
          )}
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">
            {isPdfMode ? `PDF Page Order (${items.length} Pages)` : `Batch Queue (${items.length})`}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Filter Pills (hidden in PDF mode so ordering isn't obscured) */}
          {!isPdfMode && (
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                All ({items.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('ready')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  filter === 'ready' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Queue ({readyCount})
              </button>
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('completed')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    filter === 'completed'
                      ? 'bg-white text-emerald-700 shadow-2xs font-semibold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Done ({completedCount})
                </button>
              )}
              {failedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('failed')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    filter === 'failed'
                      ? 'bg-white text-rose-700 shadow-2xs font-semibold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Failed ({failedCount})
                </button>
              )}
            </div>
          )}

          {/* Search box if list has many items */}
          {items.length > 5 && (
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500 w-32 sm:w-40"
            />
          )}
        </div>
      </div>

      {/* PDF Page Reorder Helper Banner */}
      {isPdfMode && items.length > 1 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/70 text-xs text-indigo-900">
          <ArrowUpDown className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Reorder Pages:</strong> Use the <span className="font-mono font-bold">↑</span> and <span className="font-mono font-bold">↓</span> buttons to adjust the page sequence. Page 1 will be the first page of your PDF.
          </span>
        </div>
      )}

      {/* Item List */}
      <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 bg-white border border-slate-200 rounded-xl">
            No images match your current filter.
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <FileQueueItem
              key={item.id}
              item={item}
              index={index}
              totalItems={items.length}
              isPdfMode={isPdfMode}
              onRemove={onRemove}
              onRetry={onRetry}
              onDownloadSingle={onDownloadSingle}
              onPreview={onPreview}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              isConvertingBatch={isConvertingBatch}
            />
          ))
        )}
      </div>
    </div>
  );
};
