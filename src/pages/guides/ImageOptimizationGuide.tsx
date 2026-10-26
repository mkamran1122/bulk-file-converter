import React from 'react';
import { ArrowLeft, CheckCircle2, Zap, ArrowRight, BookOpen, Layers, Sliders, ShieldCheck, HelpCircle } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { AdSenseNotice } from '../../components/AdSenseNotice';

interface GuideProps {
  onStartConverting: (format?: 'png' | 'jpg' | 'webp') => void;
  onNavigateHome: () => void;
}

export const ImageOptimizationGuide: React.FC<GuideProps> = ({ onStartConverting, onNavigateHome }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-slate-700 animate-in fade-in duration-200">
      <SEOHead
        title="Image Optimization Handbook: Web Speed & Formats | FileBatch"
        description="Master web image optimization. Compare lossy vs lossless formats, tune compression quality, adapt responsive dimensions, and improve Core Web Vitals."
        canonicalPath="#guide-image-optimization"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Image File Conversion & Optimization: The Complete Web Handbook',
          'description': 'A comprehensive handbook for balancing visual fidelity against file size, selecting image formats, and optimizing web speed.',
          'author': {
            '@type': 'Organization',
            'name': 'MK Labs',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'MK Labs',
          },
        }}
      />

      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          onClick={onNavigateHome}
          className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Guides</span>
        <span>/</span>
        <span className="text-indigo-600">The Ultimate Image File Optimization Guide</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Master Optimization Manual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Image File Conversion & Optimization: The Complete Web Handbook
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Everything you need to master digital image formats: balancing visual acuity against byte payload, selecting the ideal encoding for any graphic asset, and improving web performance.
        </p>
      </header>

      {/* Key Decision Matrix */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Format Selection Quick Matrix</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">Real Photography</span>
            <span className="text-xs text-indigo-600 font-bold block">Best: WebP (80–85%) or JPEG</span>
            <p className="text-slate-600 leading-relaxed">Continuous color gradients and real-world textures compress gracefully under DCT lossy encoding without noticeable artifacts.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">Graphics, Logos & UI</span>
            <span className="text-xs text-blue-600 font-bold block">Best: PNG or WebP with Alpha</span>
            <p className="text-slate-600 leading-relaxed">High-contrast solid borders, typography, and semi-transparent alpha dropshadows require lossless compression to avoid smudges.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">Multi-Page Documents</span>
            <span className="text-xs text-rose-600 font-bold block">Best: Images to PDF</span>
            <p className="text-slate-600 leading-relaxed">Receipts, scanned forms, portfolios, and photo collections combined into a single organized multi-page document.</p>
          </div>
        </div>
      </div>

      {/* Section 1: Core Web Vitals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. Why Image Optimization Directly Impacts SEO & Core Web Vitals
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Images represent more than 50% of the total byte weight of average web pages worldwide. Google’s PageSpeed algorithm assesses three Core Web Vitals metrics when ranking search results:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
          <li><strong>Largest Contentful Paint (LCP):</strong> Measures the render time of the largest visual element (often a hero image). Excessive image weight directly delays this metric.</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> Unoptimized image dimensions without aspect ratio definitions cause layout shifts when loaded.</li>
          <li><strong>Interaction to Next Paint (INP):</strong> Huge image payloads clog the browser main thread during decompression, causing touch and scroll stutter on mobile devices.</li>
        </ul>
      </section>

      {/* Section 2: Tuning Lossy Quality Factor */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. The Science of the Quality Slider: Diminishing Returns
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Many beginners set image quality to 100%, assuming higher is always better. In reality, JPEG and WebP compression curves show steep diminishing returns past 85%:
        </p>
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-xs text-slate-600 space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-slate-200 font-mono">
            <span>Quality Setting: 100%</span>
            <span className="font-bold text-slate-800">4.8 MB file (Subtle psychoacoustic quantization)</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200 font-mono">
            <span>Quality Setting: 85% (Recommended)</span>
            <span className="font-bold text-emerald-700">720 KB file (6.6x smaller, visually identical)</span>
          </div>
          <div className="flex justify-between items-center py-1 font-mono">
            <span>Quality Setting: 60%</span>
            <span className="font-bold text-amber-700">380 KB file (Mild color banding in dark gradients)</span>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Image Optimization Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">What is the most effective format for modern web speed?</h3>
            <p className="text-slate-600 leading-relaxed">
              WebP offers the best overall combination of high compression efficiency, universal modern browser support (97%+), and full alpha transparency support.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">When should I convert multiple images to PDF instead of a ZIP archive?</h3>
            <p className="text-slate-600 leading-relaxed">
              Use "Images to PDF" when you need a cohesive document that displays images sequentially across individual pages, such as receipts, portfolios, scanned contracts, or school assignments. Use a ZIP archive when you need each converted image as a separate graphic asset.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">How does FileBatch prevent browser crashes with large batches?</h3>
            <p className="text-slate-600 leading-relaxed">
              FileBatch processes conversions in controlled concurrency queues (3 to 6 parallel workers) and revokes temporary in-memory object URLs immediately after download, protecting your device from memory exhaustion.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links: Related Guides */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Explore Specific Format Handbooks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              window.location.hash = 'guide-jpg-to-png';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">JPG to PNG Guide</span>
            <span className="text-slate-500 mt-1 block">Learn when to halt lossy compression and enable transparent layers.</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.hash = 'guide-png-to-webp';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">PNG to WebP Guide</span>
            <span className="text-slate-500 mt-1 block">Slash file weight by up to 45% while preserving crisp alpha transparency.</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.hash = 'guide-webp-to-jpg';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">WebP to JPG Guide</span>
            <span className="text-slate-500 mt-1 block">Restore universal compatibility for legacy software and print shops.</span>
          </button>
        </div>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Start Optimizing Your Images with FileBatch</h2>
        <p className="text-sm text-indigo-100 max-w-md mx-auto">
          Process up to 100 images per batch locally in your browser with zero server uploads.
        </p>
        <div>
          <button
            onClick={() => onStartConverting('webp')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-md transition-all"
          >
            <span>Open Bulk File Converter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
