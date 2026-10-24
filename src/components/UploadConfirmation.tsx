import React from 'react';
import { CheckCircle2, AlertCircle, X, Images, ArrowDown } from 'lucide-react';
import { formatBytes } from '../utils/imageConverter';

export interface UploadNotificationData {
  type: 'success' | 'error';
  title: string;
  message?: string;
  addedCount?: number;
  totalCount: number;
  addedThumbnails?: Array<{ id: string; name: string; url: string; size: number }>;
}

interface UploadConfirmationProps {
  notification: UploadNotificationData | null;
  onDismiss: () => void;
  onScrollToConversion?: () => void;
}

export const UploadConfirmation: React.FC<UploadConfirmationProps> = ({
  notification,
  onDismiss,
  onScrollToConversion,
}) => {
  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-xs animate-in fade-in slide-in-from-top-2 duration-200 ${
        isSuccess
          ? 'bg-emerald-50/80 border-emerald-200/90 text-emerald-950'
          : 'bg-rose-50/80 border-rose-200/90 text-rose-950'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left Icon & Message */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isSuccess ? 'bg-emerald-600 text-white shadow-xs' : 'bg-rose-600 text-white shadow-xs'
            }`}
          >
            {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold tracking-tight text-slate-900">
                {notification.title}
              </h4>
              {isSuccess && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold font-mono border border-emerald-200/60">
                  <Images className="w-3 h-3" />
                  <span>{notification.totalCount} total selected</span>
                </span>
              )}
            </div>

            {notification.message && (
              <p className="text-xs text-slate-600 leading-relaxed">
                {notification.message}
              </p>
            )}

            {/* Display newly added thumbnails and filenames */}
            {isSuccess && notification.addedThumbnails && notification.addedThumbnails.length > 0 && (
              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Recently added in this upload ({notification.addedThumbnails.length}):
                </div>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 max-w-full scrollbar-thin">
                  {notification.addedThumbnails.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 bg-white/90 border border-emerald-200/70 rounded-lg p-1.5 pr-2.5 shadow-2xs shrink-0 max-w-[200px]"
                      title={item.name}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover shrink-0 bg-slate-100 border border-slate-200"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-slate-800 truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {formatBytes(item.size)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {isSuccess && onScrollToConversion && (
            <button
              onClick={onScrollToConversion}
              type="button"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <span>Go to Settings</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onDismiss}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 transition-colors"
            aria-label="Dismiss upload notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
