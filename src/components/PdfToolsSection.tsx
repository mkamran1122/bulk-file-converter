import React from 'react';
import { PdfToolTab } from '../types';
import { FileText, Image as ImageIcon, Sparkles, HelpCircle, Shield, CheckCircle2 } from 'lucide-react';
import { PdfToImagesConverter } from './PdfToImagesConverter';

interface PdfToolsSectionProps {
  activeTab: PdfToolTab;
  onTabChange: (tab: PdfToolTab) => void;
  // Option A Children: UploadDropzone, UploadConfirmation, ConversionControls, PdfResultCard, FileQueue
  optionAContent: React.ReactNode;
}

export const PdfToolsSection: React.FC<PdfToolsSectionProps> = ({
  activeTab,
  onTabChange,
  optionAContent,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Tab Bar for PDF Tools */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-2 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Option A Tab Button */}
          <button
            type="button"
            onClick={() => onTabChange('images-to-pdf')}
            className={`flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl font-bold text-sm transition-all text-left ${
              activeTab === 'images-to-pdf'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'images-to-pdf' ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'
              }`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="leading-tight">Option A: Images to PDF</div>
              <div
                className={`text-[11px] font-normal truncate mt-0.5 ${
                  activeTab === 'images-to-pdf' ? 'text-rose-100' : 'text-slate-400'
                }`}
              >
                Combine multiple images into one PDF
              </div>
            </div>
          </button>

          {/* Option B Tab Button */}
          <button
            type="button"
            onClick={() => onTabChange('pdf-to-images')}
            className={`flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl font-bold text-sm transition-all text-left ${
              activeTab === 'pdf-to-images'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'pdf-to-images' ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="leading-tight">Option B: PDF to Images</div>
              <div
                className={`text-[11px] font-normal truncate mt-0.5 ${
                  activeTab === 'pdf-to-images' ? 'text-rose-100' : 'text-slate-400'
                }`}
              >
                Extract PDF pages into JPG, PNG, or WebP
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Helpful Instructions Banner for First-Time Users */}
      <div className="bg-gradient-to-r from-rose-50/70 via-white to-indigo-50/60 rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-rose-200/80 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                {activeTab === 'images-to-pdf'
                  ? 'How to Combine Images into a Single PDF'
                  : 'How to Extract Images from a PDF Document'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                {activeTab === 'images-to-pdf'
                  ? 'Select or drag multiple JPG, PNG, or WebP images. Reorder pages using the up/down arrows in the list to match your desired reading order, choose page fit options, and click Convert to PDF.'
                  : 'Upload any standard PDF file. Choose your preferred output image format (JPG, PNG, or WebP), select the resolution, choose which pages to extract (all, single, range, or interactive thumbnails), and download the images individually or as a single ZIP archive.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-white/90 px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero server uploads • 100% private</span>
          </div>
        </div>

        {/* Step Guide Badges */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-600">
          {activeTab === 'images-to-pdf' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <span>Select multiple images</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <span>Reorder page sequence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <span>Choose fit & quality</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">4</span>
                <span>Download single PDF</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <span>Upload PDF document</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <span>Pick JPG, PNG, or WebP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <span>Select pages or range</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0">4</span>
                <span>Download files or ZIP</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active Tab Workspace Content */}
      {activeTab === 'images-to-pdf' ? (
        <div className="space-y-6">
          {optionAContent}
        </div>
      ) : (
        <PdfToImagesConverter />
      )}
    </div>
  );
};
