import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { AdSenseNotice } from '../../components/AdSenseNotice';

interface GuideProps {
  onStartConverting: (format?: 'png' | 'jpg' | 'webp') => void;
  onNavigateHome: () => void;
}

export const JpgToPngGuide: React.FC<GuideProps> = ({ onStartConverting, onNavigateHome }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-slate-700 animate-in fade-in duration-200">
      <SEOHead
        title="JPG to PNG Guide: Lossless Quality & Transparency | FileBatch"
        description="Convert lossy JPG photos to lossless PNG files. Stop generational quality loss, enable transparent backgrounds, and prepare images for editing."
        canonicalPath="#guide-jpg-to-png"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Converting JPG to PNG: When, Why, and How to Do It Right',
          'description': 'A complete technical guide on converting lossy JPEG files to lossless PNGs with alpha channel transparency.',
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
        <span className="text-indigo-600">JPG to PNG Conversion Guide</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete Technical Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Converting JPG to PNG: When, Why, and How to Do It Right
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Learn why converting JPEG photographs to PNG files halts generational compression degradation, enables alpha channel editing, and prepares your graphics for professional design software.
        </p>
      </header>

      {/* Quick Summary Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>At a Glance: Key Takeaways</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Lossless vs Lossy</span>
            <span className="text-slate-600">JPEG discards high-frequency pixel data permanently. PNG preserves every decoded pixel without further loss.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Alpha Transparency</span>
            <span className="text-slate-600">JPEG has zero alpha channel support. PNG gives you full 8-bit transparency for layered compositing.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">File Size Reality</span>
            <span className="text-slate-600">PNG files are almost always larger than original JPGs because PNG retains complete raw pixel maps.</span>
          </div>
        </div>
      </div>

      {/* Section 1: The Technical Differences */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. The Technical Difference: Lossy JPEG vs Lossless PNG
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          The Joint Photographic Experts Group created the <strong>JPEG (JPG)</strong> format in 1992 specifically for real-world continuous-tone photography. JPEG employs a mathematical process called Discrete Cosine Transform (DCT) combined with color subsampling. This intentionally discards fine color variations that human eyes struggle to perceive, achieving remarkably compact file sizes.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          Conversely, <strong>Portable Network Graphics (PNG)</strong> was created in 1996 as an open, patent-free replacement for GIF. PNG uses the DEFLATE compression algorithm (a combination of LZ77 and Huffman coding). Because DEFLATE is strictly lossless, decoding a PNG file reconstructs the original pixel grid byte-for-byte with zero deviation.
        </p>
      </section>

      {/* Section 2: When Should You Convert? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. When Should You Convert JPG to PNG?
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>A. Halting Generational Degradation</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every time you open, edit, and re-save a JPEG file, it gets re-compressed through the DCT lossy pipeline. Over multiple revisions, "compression ringing" and digital noise multiply around high-contrast edges. Converting your initial master file to PNG freezes the image in its current state, ensuring subsequent saves produce zero additional artifacts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>B. Preparing for Transparency Layering</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you plan to cut out a product, portrait, or logo in software like Photoshop, Figma, or GIMP, JPEG cannot store transparent pixels. Converting to PNG allows the graphic editor to write transparent pixels directly into the file's alpha layer.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>C. Software & Print Specifications</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Many corporate documentation suites, LaTeX compilers, printing presses, and graphic design templates explicitly mandate PNG for non-photographic charts, diagrams, and corporate iconography.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Important Reality Check */}
      <section className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-6 sm:p-7 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>A Quick Technical Reality Check</span>
        </div>
        <p className="text-xs text-amber-950 leading-relaxed">
          Converting an existing JPG to PNG will <strong>not</strong> magically restore data that was previously discarded by the JPEG encoder. However, it guarantees that no further compression artifacts will occur during future saves. Because PNG is lossless, the resulting file will typically be larger in byte size than the source JPG.
        </p>
      </section>

      {/* Step by Step Conversion with FileBatch */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          3. How to Convert JPG to PNG in Bulk with FileBatch
        </h2>
        <ol className="space-y-3 list-decimal list-inside text-xs sm:text-sm text-slate-700">
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Select your images:</strong> Drag and drop up to 100 JPG/JPEG files into the FileBatch upload area.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Choose PNG format:</strong> In the conversion control panel, click the <strong>PNG</strong> format button. Notice how FileBatch automatically disables the lossy slider because PNG is natively lossless.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Click Convert All:</strong> Watch your device's browser convert all files locally in parallel.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Download:</strong> Save individual images or click <strong>Download All as ZIP</strong> for a neat, collision-free archive.
          </li>
        </ol>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            JPG to PNG Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Will converting JPG to PNG improve existing image quality?</h3>
            <p className="text-slate-600 leading-relaxed">
              No. Once JPEG compression has discarded color information, converting to PNG cannot restore it. However, it freezes the image so that future edits and saves never degrade it further.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Does converting JPG to PNG make the background transparent?</h3>
            <p className="text-slate-600 leading-relaxed">
              Converting alone does not remove the background because original JPG images have solid backgrounds (often white). However, saving as PNG gives the file an alpha channel, allowing you to easily remove the background in an editor.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Why is the converted PNG larger in file size?</h3>
            <p className="text-slate-600 leading-relaxed">
              PNG uses lossless compression, preserving every single pixel without approximations. JPEGs achieve smaller sizes by throwing away subtle color details.
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
              window.location.hash = 'guide-png-to-webp';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">PNG to WebP Guide</span>
            <span className="text-slate-500 mt-1 block">Reduce transparent image file size by 30% to 45%.</span>
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
            <span className="text-slate-500 mt-1 block">Restore universal compatibility for legacy software and print.</span>
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
            <span className="text-slate-500 mt-1 block">Compare formats, compression trade-offs, and web speed tips.</span>
          </button>
        </div>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Convert Your JPG Images to PNG Now</h2>
        <p className="text-sm text-indigo-100 max-w-md mx-auto">
          Fast, local browser conversion. Up to 100 images per batch without server uploads.
        </p>
        <div>
          <button
            onClick={() => onStartConverting('png')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-md transition-all"
          >
            <span>Launch Converter (PNG Preset)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
