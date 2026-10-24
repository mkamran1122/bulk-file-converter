import React from 'react';
import { ArrowLeft, CheckCircle2, Zap, ArrowRight, Gauge, Globe, BookOpen, Layers } from 'lucide-react';
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
        title="PNG to WebP Conversion Guide: Speed Up Core Web Vitals & Keep Transparency"
        description="Convert bulky transparent PNG files to modern WebP images. Slash file weight by 30-45%, accelerate Google LCP scores, and preserve alpha transparency."
        canonicalPath="#guide-png-to-webp"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Converting PNG to WebP: Accelerate Page Speed Without Losing Transparency',
          'description': 'A technical guide on optimizing transparent PNG images into high-efficiency WebP assets for modern web speed.',
          'author': {
            '@type': 'Organization',
            'name': 'FileBatch',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'FileBatch',
          },
        }}
      />
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
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
      </div>

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

      {/* Performance Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-center space-y-1">
          <div className="text-3xl font-extrabold font-mono text-emerald-600">-30% to -45%</div>
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Average Byte Savings</div>
          <p className="text-[11px] text-slate-500">Compared to identical transparent PNG originals</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-center space-y-1">
          <div className="text-3xl font-extrabold font-mono text-indigo-600">100%</div>
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Transparency Support</div>
          <p className="text-[11px] text-slate-500">Full alpha channel support across all modern browsers</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-center space-y-1">
          <div className="text-3xl font-extrabold font-mono text-blue-600">&gt; 97%</div>
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Global Browser Adoption</div>
          <p className="text-[11px] text-slate-500">Chrome, Safari, Firefox, Edge, iOS & Android</p>
        </div>
      </div>

      {/* Section 1: The Modern Web Standard */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. Why Modern Web Developers Are Replacing PNG with WebP
        </h2>
        <p>
          PNG has served as the default transparent image format for over two decades. However, its DEFLATE compression algorithm was engineered in an era of slower desktop hardware. In today's mobile-first ecosystem, heavy 1.5MB PNG screenshots and icons throttle mobile connections and drag down Google Lighthouse page speed scores.
        </p>
        <p>
          WebP was developed specifically by Google to solve this tradeoff. By utilizing predictive block encoding adapted from the VP8 video codec, WebP encodes visual details far more compactly than PNG, without discarding transparent backgrounds.
        </p>
      </section>

      {/* Section 2: Core Web Vitals Impact */}
      <section className="bg-slate-900 text-white rounded-3xl p-7 sm:p-9 shadow-lg space-y-5">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>SEO & Search Ranking Benefits</span>
        </div>
        <h2 className="text-2xl font-bold text-white">How WebP Directly Elevates Google Core Web Vitals</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Google factors page speed into its search rankings. The Largest Contentful Paint (LCP) metric measures the render time of the largest visual element in the viewport—frequently hero graphics, product showcases, or logos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
            <span className="font-bold text-emerald-400 block">Faster LCP Benchmark</span>
            <span className="text-slate-300">Shaving 500KB off an above-the-fold image ensures your site hits Google’s recommended sub-2.5 second LCP target.</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
            <span className="font-bold text-emerald-400 block">Lower Bandwidth Costs</span>
            <span className="text-slate-300">E-commerce websites serving tens of thousands of transparent product photos save substantial CDN transfer costs.</span>
          </div>
        </div>
      </section>

      {/* Section 3: Transparency Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. Transparent Backgrounds: PNG vs. WebP
        </h2>
        <p>
          A frequent hesitation among designers is whether converting PNG to WebP will damage subtle drop-shadows, feathered silhouettes, or glowing highlights.
        </p>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Full 8-Bit Alpha Transparency Preserved:</span>
              <p className="text-slate-600 mt-0.5">
                WebP supports identical 8-bit alpha channels, offering 256 gradations of translucency. When converted with FileBatch, your transparent overlays and cutouts retain pristine edge definition without jagged pixel fringes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by step guide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          3. How to Bulk Convert PNG to WebP in Seconds
        </h2>
        <ol className="space-y-3 list-decimal list-inside text-xs sm:text-sm text-slate-700">
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Drop your PNG files:</strong> Drag up to 100 PNG files directly into the FileBatch converter.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Select WebP:</strong> Choose the <strong>WebP</strong> format option.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Tune Quality:</strong> Keep the default 85% for an optimal balance of invisible compression and reduced byte size, or set 95% for near-lossless precision.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Convert & Save:</strong> Click <strong>Convert All Images</strong> and download your lightweight files in an instant ZIP archive.
          </li>
        </ol>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Box */}
      <div className="bg-emerald-700 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Boost Your Site Speed with WebP</h2>
        <p className="text-sm text-emerald-100 max-w-md mx-auto">
          Convert PNG graphics to WebP in bulk without sending files across the internet.
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
