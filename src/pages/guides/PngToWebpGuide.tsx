import React from 'react';
import { ArrowLeft, CheckCircle2, Zap, ArrowRight, Gauge, Globe, BookOpen, Layers, HelpCircle } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { AdSenseNotice } from '../../components/AdSenseNotice';

interface GuideProps {
  onStartConverting: (format?: 'png' | 'jpg' | 'webp') => void;
  onNavigateHome: () => void;
}

export const PngToWebpGuide: React.FC<GuideProps> = ({ onStartConverting, onNavigateHome }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-slate-700 animate-in fade-in duration-200">
      <SEOHead
        title="PNG to WebP Guide: Cut Size by 40% & Keep Alpha | FileBatch"
        description="Convert heavy transparent PNGs to high-efficiency WebP files. Reduce image size by 30-45%, accelerate page speed, and preserve full alpha transparency."
        canonicalPath="#guide-png-to-webp"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Converting PNG to WebP: Accelerate Page Speed Without Losing Transparency',
          'description': 'A technical guide on optimizing transparent PNG images into high-efficiency WebP assets for modern web speed.',
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
        <span className="text-indigo-600">PNG to WebP Conversion Guide</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Gauge className="w-3.5 h-3.5 text-emerald-600" />
          <span>Web Performance & Core Web Vitals</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Converting PNG to WebP: Accelerate Page Speed Without Losing Transparency
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Discover why converting heavy PNG illustrations, transparent logos, and web assets to Google’s modern WebP format reduces asset weight by 30% to 45% while keeping crisp alpha channels.
        </p>
      </header>

      {/* Benchmark Metric Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold">
            <Zap className="w-4 h-4" />
            <span>Real-World Benchmark Compression</span>
          </div>
          <span className="text-xs text-slate-400">1080p Transparent Graphic</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Original PNG-24</div>
            <div className="text-2xl font-bold font-mono text-slate-200">1,450 KB</div>
            <div className="text-[11px] text-slate-500">Uncompressed alpha payload</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-emerald-400 font-bold">Converted WebP (Q=85)</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">320 KB</div>
            <div className="text-[11px] text-emerald-300 font-medium">78% payload reduction</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-indigo-400">Largest Contentful Paint</div>
            <div className="text-2xl font-bold font-mono text-indigo-300">0.42s faster</div>
            <div className="text-[11px] text-indigo-200">Noticeable mobile improvement</div>
          </div>
        </div>
      </div>

      {/* Section 1: The Bottleneck of Legacy PNGs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. The Hidden Bottleneck of Legacy PNG Files
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          When PNG was engineered in the mid-1990s, high-resolution 4K displays and mobile smartphones did not exist. PNG-24 stores RGBA color channels with 8 bits per channel. Because PNG's DEFLATE compression cannot make lossy approximations, detailed transparent graphics quickly inflate to multiple megabytes.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          Google’s Core Web Vitals heavily penalize oversized images. Serving a 1.5MB PNG file as your hero graphic degrades Largest Contentful Paint (LCP) and First Contentful Paint (FCP), leading to lower mobile search rankings and higher bounce rates.
        </p>
      </section>

      {/* Section 2: Why WebP is the Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. Why WebP is the Modern Web Solution
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Universal Browser Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every major modern browser—Google Chrome, Apple Safari (macOS & iOS), Mozilla Firefox, and Microsoft Edge—fully supports WebP. Over 97% of worldwide web users can render WebP natively without polyfills.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Full Alpha Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike JPEG, which forces transparent backgrounds to turn white or black, WebP includes native 8-bit alpha transparency. Your cutouts, UI badges, and transparent illustrations maintain transparent borders.
            </p>
          </div>
        </div>
      </section>

      {/* Step by Step Conversion with FileBatch */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          3. How to Convert PNG to WebP with FileBatch
        </h2>
        <ol className="space-y-3 list-decimal list-inside text-xs sm:text-sm text-slate-700">
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Select your PNG files:</strong> Drag and drop up to 100 PNGs into FileBatch.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Choose WebP:</strong> Select <strong>WebP</strong>. Set the quality slider to <strong>85%</strong> (the recommended sweet spot for maximum size savings and sharp fidelity).
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Execute Batch:</strong> Your device uses native browser canvas contexts to transform and compress the images in parallel.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Download:</strong> Download individual images or the bundled ZIP archive with one click.
          </li>
        </ol>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            PNG to WebP Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Does WebP preserve transparent PNG backgrounds?</h3>
            <p className="text-slate-600 leading-relaxed">
              Yes, WebP has complete 8-bit alpha channel transparency support. Your transparent logos, icons, and cutouts will keep their transparency intact while saving 30% to 45% in file size.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">What quality level should I select for WebP?</h3>
            <p className="text-slate-600 leading-relaxed">
              We recommend 80% to 85% for photographic assets and web graphics. This gives substantial file size reductions with visual quality virtually indistinguishable from the original PNG.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Will older web visitors be able to see WebP images?</h3>
            <p className="text-slate-600 leading-relaxed">
              Over 97% of global web browsers natively support WebP today, including Chrome, Safari, Firefox, and Edge. For legacy software environments, you can easily use our WebP to JPG converter.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links: Related Guides */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Related Image Optimization Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              window.location.hash = 'guide-webp-to-jpg';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">WebP to JPG Guide</span>
            <span className="text-slate-500 mt-1 block">Restore universal compatibility for legacy software and desktop tools.</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.hash = 'guide-jpg-to-png';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">JPG to PNG Guide</span>
            <span className="text-slate-500 mt-1 block">Stop generational compression degradation and prepare for editing.</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.hash = 'guide-image-optimization';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">Optimization Handbook</span>
            <span className="text-slate-500 mt-1 block">Comprehensive guide on compression ratios, responsive design, and LCP.</span>
          </button>
        </div>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Section */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Accelerate Your Web Pages with WebP</h2>
        <p className="text-sm text-emerald-100 max-w-md mx-auto">
          Convert transparent PNGs to high-efficiency WebP images locally with zero cloud uploads.
        </p>
        <div>
          <button
            onClick={() => onStartConverting('webp')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-emerald-800 hover:bg-emerald-50 shadow-md transition-all"
          >
            <span>Launch Converter (WebP Preset)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
