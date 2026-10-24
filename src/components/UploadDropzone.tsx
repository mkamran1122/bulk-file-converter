import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { FileRejection } from '../types';
import { UploadCloud, AlertCircle, FileImage, X, Check } from 'lucide-react';
import { formatBytes } from '../utils/imageConverter';

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  rejections: FileRejection[];
  onDismissRejection: (index: number) => void;
  onClearRejections: () => void;
  currentCount: number;
  maxFiles: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFilesSelected,
  rejections,
  onDismissRejection,
  onClearRejections,
  currentCount,
  maxFiles,
  inputRef,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only deactivate if leaving the container itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files);
      onFilesSelected(fileList);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      onFilesSelected(fileList);
      // Reset input value so selecting the exact same file after removal triggers onChange reliably
      e.target.value = '';
    }
  };

  const handleClickDropzone = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isFull = currentCount >= maxFiles;

  return (
    <div className="w-full space-y-4">
      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
        id="filebatch-file-input"
        aria-label="Upload image files"
      />

      {/* Main Drag & Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={isFull ? undefined : handleClickDropzone}
        role="button"
        tabIndex={isFull ? -1 : 0}
        onKeyDown={(e) => {
          if (!isFull && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClickDropzone();
          }
        }}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
          isDragOver
            ? 'border-indigo-600 bg-indigo-50/60 scale-[1.005]'
            : 'border-slate-300 hover:border-indigo-400 bg-white hover:bg-slate-50/70 shadow-xs'
        } ${isFull ? 'opacity-70 cursor-not-allowed pointer-events-none' : ''}`}
      >
        <div className="flex flex-col items-center justify-center max-w-md mx-auto pointer-events-none">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
              isDragOver
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
            }`}
          >
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {isDragOver
              ? 'Drop your images here'
              : 'Choose images or drag & drop here'}
          </h3>

          <p className="mt-2 text-sm text-slate-500 leading-normal">
            Supports <span className="font-semibold text-slate-700">JPEG</span>,{' '}
            <span className="font-semibold text-slate-700">PNG</span>, and{' '}
            <span className="font-semibold text-slate-700">WebP</span>.
            Up to {BRAND_CONFIG.limits.maxFileSizeMB} MB per file.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
              <FileImage className="w-3.5 h-3.5" />
              JPG / JPEG
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
              <FileImage className="w-3.5 h-3.5" />
              PNG (Lossless)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
              <FileImage className="w-3.5 h-3.5" />
              WebP (Modern)
            </span>
            <span className="text-slate-500 font-medium">
              • Max {maxFiles} files/batch ({currentCount}/{maxFiles})
            </span>
          </div>

          {currentCount > 0 && (
            <div className="mt-4 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Click anywhere in this box or drag more files to add to queue
            </div>
          )}
        </div>
      </div>

      {/* Rejected Files Notice */}
      {rejections.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-200/70">
            <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                {rejections.length} file{rejections.length > 1 ? 's were' : ' was'} not accepted
              </span>
            </div>
            <button
              onClick={onClearRejections}
              type="button"
              className="text-xs font-medium text-rose-700 hover:text-rose-900 underline underline-offset-2"
            >
              Dismiss all
            </button>
          </div>

          <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
            {rejections.map((rej, index) => (
              <div
                key={`${rej.file.name}-${index}`}
                className="flex items-center justify-between bg-white/70 px-2.5 py-1.5 rounded border border-rose-100 text-slate-700"
              >
                <div className="truncate mr-2">
                  <span className="font-semibold text-slate-900">{rej.file.name}</span>{' '}
                  <span className="text-slate-500">({formatBytes(rej.file.size)})</span>:
                  <span className="text-rose-700 ml-1.5">{rej.reason}</span>
                </div>
                <button
                  onClick={() => onDismissRejection(index)}
                  className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                  title="Dismiss error"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
