import React, { useState } from 'react';
import { BatchFileItem } from '../types';
import { formatBytes } from '../utils/imageConverter';
import { X, Download, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface PreviewModalProps {
  item: BatchFileItem | null;
  onClose: () => void;
  onDownload: (item: BatchFileItem) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ item, onClose, onDownload }) => {
  const [viewMode, setViewMode] = useState<'converted' | 'original'>('converted');

  if (!item) return null;

  const hasConverted = item.status === 'completed' && item.convertedUrl !== null;
  const currentUrl = hasConverted && viewMode === 'converted' ? item.convertedUrl! : item.previewUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="truncate mr-4">
            <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {item.dimensions ? `${item.dimensions.width}×${item.dimensions.height} px • ` : ''}
              Original: {formatBytes(item.size)}
              {hasConverted && item.convertedSize && ` → Converted: ${formatBytes(item.convertedSize)}`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasConverted && (
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('converted')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    viewMode === 'converted'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Converted
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('original')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    viewMode === 'original'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Original
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image viewport with checkerboard background for transparency preview */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100/70 min-h-[300px]">
          <div
            className="max-h-[60vh] max-w-full rounded-lg shadow-sm border border-slate-200/80 overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
            }}
          >
            <img
              src={currentUrl}
              alt={item.name}
              className="max-h-[60vh] max-w-full object-contain"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            {hasConverted ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Showing {viewMode === 'converted' ? 'Converted Image' : 'Original Image'}
              </span>
            ) : (
              <span>Original Image Preview</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasConverted && (
              <button
                type="button"
                onClick={() => onDownload(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Converted File</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
