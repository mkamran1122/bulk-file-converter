import React from 'react';
import { ArrowLeft, CheckCircle2, Zap, ArrowRight, BookOpen, Layers, Sliders, ShieldCheck } from 'lucide-react';
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
        title="Image File Conversion & Web Optimization: The Complete Guide"
        description="Master digital image optimization: lossy vs lossless compression, responsive pixel dimensions, WebP adoption, and performance checklists for web designers."
        canonicalPath="#guide-image-optimization"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Image File Conversion & Optimization: The Complete Web Handbook',
          'description': 'A comprehensive handbook for balancing visual fidelity against file size, selecting image formats, and optimizing web speed.',
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
        <span className="text-indigo-600">The Ultimate Image File Optimization Guide</span>
      </div>

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

      {/* Chapter 1: Lossy vs Lossless */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. The Fundamentals: Lossy vs. Lossless Compression
        </h2>
        <p>
          At its core, digital image compression seeks to reduce storage requirements while preserving perceptual fidelity. All modern graphic formats fall into one of two mathematical paradigms:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              LOSSY
            </div>
            <h3 className="text-lg font-bold text-slate-900">Lossy Compression (JPEG, WebP)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lossy algorithms exploit human visual perception limitations. Human eyes are significantly more sensitive to variations in luminance (brightness) than chrominance (color). By selectively discarding imperceptible color subtleties and high-frequency noise, lossy formats reduce file weight by up to 80% with minimal perceived quality loss.
            </p>
            <div className="pt-2 text-[11px] text-amber-800 font-medium">
              Best for: Natural photography, camera captures, complex gradients, continuous tones.
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              LOSSLESS
            </div>
            <h3 className="text-lg font-bold text-slate-900">Lossless Compression (PNG, Lossless WebP)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lossless algorithms preserve every individual pixel value without alteration. Through horizontal filtering and dictionary substitution (such as the DEFLATE algorithm), recurring patterns of identical pixel color sequences are encoded into compact binary tokens.
            </p>
            <div className="pt-2 text-[11px] text-blue-800 font-medium">
              Best for: Brand logos, user interface assets, screenshots, technical diagrams, line art.
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Decision Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. The Format Decision Matrix: Which Format When?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Your Content Type</th>
                <th className="py-3 px-4">Recommended Format</th>
                <th className="py-3 px-4">Target Quality</th>
                <th className="py-3 px-4">Why This Choice Wins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Hero banner photos</td>
                <td className="py-3 px-4 font-bold text-indigo-600">WebP</td>
                <td className="py-3 px-4">80% – 85%</td>
                <td className="py-3 px-4">Fastest LCP load speed on mobile networks.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Transparent product cutouts</td>
                <td className="py-3 px-4 font-bold text-indigo-600">WebP or PNG</td>
                <td className="py-3 px-4">85% (WebP) or Lossless (PNG)</td>
                <td className="py-3 px-4">WebP cuts PNG file size by 35% while retaining transparent alpha.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Software UI screenshots</td>
                <td className="py-3 px-4 font-bold text-blue-600">PNG</td>
                <td className="py-3 px-4">Lossless</td>
                <td className="py-3 px-4">Text and 1px UI borders stay razor-sharp without blur.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Print brochure submissions</td>
                <td className="py-3 px-4 font-bold text-amber-600">JPEG</td>
                <td className="py-3 px-4">95% – 100%</td>
                <td className="py-3 px-4">Universally accepted by commercial CMYK prepress pipelines.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 3: Dimensions & Resolution */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          3. Sizing and Dimensions: The #1 Factor in File Size
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          While compression ratios yield substantial savings, <strong>pixel dimensions</strong> dictate the raw uncompressed memory footprint. An image at 4000×3000 contains 12 million pixels, whereas a full-HD 1920×1080 version contains roughly 2 million pixels—an immediate 83% raw data reduction.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block">Desktop Fullscreen</span>
            <span className="text-slate-500 font-mono">1920×1080 px</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block">Blog Content Width</span>
            <span className="text-slate-500 font-mono">1200×800 px</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block">Square E-commerce</span>
            <span className="text-slate-500 font-mono">1000×1000 px</span>
          </div>
        </div>
      </section>

      {/* Chapter 4: Practical Checklist */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          4. The Pre-Publishing Image Checklist
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Match the format to image content:</span>
              <span className="text-slate-600 ml-1">Use WebP/JPG for photographic gradients; use PNG for sharp UI and typography.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Target 85% compression:</span>
              <span className="text-slate-600 ml-1">The 85% quality factor delivers virtually indistinguishable visual fidelity while avoiding the excessive bloat of 100% encoding.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Keep confidential files local:</span>
              <span className="text-slate-600 ml-1">Always use client-side tools like FileBatch so company financial charts, NDA materials, or personal photos never leave your device.</span>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Box */}
      <div className="bg-indigo-600 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Optimize Your Images in Bulk Today</h2>
        <p className="text-sm text-indigo-100 max-w-md mx-auto">
          Convert up to 100 images in parallel with customizable quality and zero cloud uploads.
        </p>
        <div>
          <button
            onClick={() => onStartConverting('webp')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-md transition-all"
          >
            <span>Launch FileBatch Converter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
