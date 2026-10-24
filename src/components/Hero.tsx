import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { Shield, Sparkles, Zap, HardDrive, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onSelectImagesClick: () => void;
  onSelectPdfTools?: (tab?: 'images-to-pdf' | 'pdf-to-images') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectImagesClick, onSelectPdfTools }) => {
  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Privacy guarantee pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium mb-6">
        <Shield className="w-4 h-4 text-indigo-600" />
        <span>Processed locally in your browser</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-slate-500 font-normal">No uploads to servers or cloud</span>
      </div>

      {/* Main heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
        {BRAND_CONFIG.heroHeadline}
      </h1>

      {/* Subdescription */}
      <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {BRAND_CONFIG.heroDescription}
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
        <button
          onClick={onSelectImagesClick}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Convert Images</span>
        </button>

        {onSelectPdfTools && (
          <>
            <button
              onClick={() => onSelectPdfTools('images-to-pdf')}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <span>Option A: Images to PDF</span>
            </button>

            <button
              onClick={() => onSelectPdfTools('pdf-to-images')}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <span>Option B: PDF to Images</span>
            </button>
          </>
        )}
      </div>

      {/* Feature trust markers */}
      <div className="mt-10 pt-8 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="flex items-start gap-2.5 p-2 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Zero Uploads</div>
            <div className="text-xs text-slate-500 mt-0.5">Files never leave your machine</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 rounded-lg">
          <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Batch Power</div>
            <div className="text-xs text-slate-500 mt-0.5">Up to 100 images per conversion</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quality Tuning</div>
            <div className="text-xs text-slate-500 mt-0.5">Granular 10–100% lossy slider</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 rounded-lg">
          <HardDrive className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">ZIP & PDF Export</div>
            <div className="text-xs text-slate-500 mt-0.5">ZIP archive or single combined PDF</div>
          </div>
        </div>
      </div>
    </section>
  );
};
