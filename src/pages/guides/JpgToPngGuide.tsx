import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, FileImage, Sparkles, HelpCircle, BookOpen } from 'lucide-react';
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
        title="JPG to PNG Conversion Guide: Lossless Archiving & Alpha Transparency"
        description="Learn how converting JPEG to PNG halts generational quality loss, supports full 8-bit alpha transparency, and eliminates compression artifacts."
        canonicalPath="#guide-jpg-to-png"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Converting JPG to PNG: When, Why, and How to Do It Right',
          'description': 'A complete technical guide on converting lossy JPEG files to lossless PNGs with alpha channel transparency.',
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
        <span className="text-indigo-600">JPG to PNG Conversion Guide</span>
      </div>

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
            <span className="font-bold text-slate-900 block">Lossless Archiving</span>
            <span className="text-slate-600">Once converted to PNG, you can save and edit repeatedly without losing any further pixel clarity.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Alpha Transparency</span>
            <span className="text-slate-600">PNG supports full 8-bit alpha channels, allowing you to isolate subjects and remove solid backgrounds.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">File Size Reality</span>
            <span className="text-slate-600">PNG files are usually larger than original JPEGs because PNG uses lossless DEFLATE compression.</span>
          </div>
        </div>
      </div>

      {/* Section 1: The Core Differences */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. Understanding JPG vs. PNG Compression
        </h2>
        <p>
          JPEG (Joint Photographic Experts Group) and PNG (Portable Network Graphics) are designed for fundamentally divergent imaging priorities:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Attribute</th>
                <th className="py-3 px-4">JPEG (.jpg, .jpeg)</th>
                <th className="py-3 px-4">PNG (.png)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Compression Type</td>
                <td className="py-2.5 px-4 text-amber-700">Lossy (DCT Discrete Cosine Transform)</td>
                <td className="py-2.5 px-4 text-emerald-700">Lossless (2D Filtering + DEFLATE)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Transparency</td>
                <td className="py-2.5 px-4 text-slate-500">Not Supported (Requires solid background)</td>
                <td className="py-2.5 px-4 text-emerald-700">Full 8-bit Alpha Channel (256 levels)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Ideal Use Case</td>
                <td className="py-2.5 px-4">Photographs, landscapes, complex gradients</td>
                <td className="py-2.5 px-4">Logos, charts, UI screenshots, vector exports</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-900">Generational Loss</td>
                <td className="py-2.5 px-4 text-rose-600">Yes (Degrades with each re-save)</td>
                <td className="py-2.5 px-4 text-emerald-700">Zero (Exact pixels preserved forever)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Why Convert JPG to PNG? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. Top Reasons to Convert JPG to PNG
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>A. Halting Generational Quality Loss</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every time you open, modify, and re-save a JPEG file, the lossy algorithm discards high-frequency color detail anew. Converting your image to PNG creates an unalterable master file that can be opened, rotated, annotated, and re-saved indefinitely without introducing "mosquito noise" or blocky 8x8 macroblock artifacts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>B. Preparing Files for Background Removal</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you plan to cut out a product, portrait, or logo in software like Photoshop, Figma, or GIMP, JPEG cannot store transparent pixels. Converting to PNG allows the graphic editor to write transparent pixels directly into the file's alpha layer.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>C. Software & Print Compatibility</span>
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
