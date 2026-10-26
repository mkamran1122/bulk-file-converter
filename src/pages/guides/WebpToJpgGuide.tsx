import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, Monitor, Printer, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { AdSenseNotice } from '../../components/AdSenseNotice';

interface GuideProps {
  onStartConverting: (format?: 'png' | 'jpg' | 'webp') => void;
  onNavigateHome: () => void;
}

export const WebpToJpgGuide: React.FC<GuideProps> = ({ onStartConverting, onNavigateHome }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-slate-700 animate-in fade-in duration-200">
      <SEOHead
        title="WebP to JPG Guide: Restore Universal Compatibility | FileBatch"
        description="Convert modern WebP images to universal JPG format in bulk. Fix compatibility with legacy software, printing kiosks, and older desktop applications."
        canonicalPath="#guide-webp-to-jpg"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Converting WebP to JPG: Restore Universal File Compatibility',
          'description': 'A practical guide to converting modern WebP files back to universal JPEG images without dark transparency artifacts.',
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
        <span className="text-indigo-600">WebP to JPG Conversion Guide</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <Monitor className="w-3.5 h-3.5 text-amber-600" />
          <span>Universal Compatibility Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Converting WebP to JPG: Restore Universal File Compatibility
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          While WebP rules the modern browser, legacy desktop applications, print services, and operating system utilities often refuse to open it. Learn how to turn WebP files into universally accepted JPEGs in bulk.
        </p>
      </header>

      {/* The Problem / Compatibility Matrix */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>The WebP Compatibility Gap</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Desktop Operating Systems</span>
            <span className="text-slate-600">Windows 7, 8, and older macOS versions lack native WebP preview thumbnails in File Explorer and Finder.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Print Shops & Kiosks</span>
            <span className="text-slate-600">Commercial printing presses and automated photo printing kiosks reject WebP files, requiring standard sRGB JPEG.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block">Office Suites & CMS</span>
            <span className="text-slate-600">Older Microsoft PowerPoint, Word, and specialized CRM tools often error out when importing WebP formats.</span>
          </div>
        </div>
      </div>

      {/* Section 1: The Matte Color Challenge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. The Transparency Matte Solution
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          A common pitfall when converting transparent WebP graphics to JPEG is that JPEG does not support transparency. Simple converters often replace the transparent alpha channel with pitch black, rendering text and icons unreadable.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          FileBatch uses an intelligent canvas compositor: prior to encoding to JPEG, transparent pixels are drawn over a clean white matte (<code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-mono">#FFFFFF</code>), ensuring your converted JPEGs look clean and professional without dark artifacts.
        </p>
      </section>

      {/* Step by Step Conversion with FileBatch */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          2. How to Convert WebP to JPG in Bulk with FileBatch
        </h2>
        <ol className="space-y-3 list-decimal list-inside text-xs sm:text-sm text-slate-700">
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Upload WebP files:</strong> Drag and drop up to 100 WebP images directly into FileBatch.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Choose JPG format:</strong> Click the <strong>JPG</strong> format button.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Adjust Quality:</strong> Select your preferred quality slider value (85% is default; choose 95% for high-resolution photography).
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Convert & Save:</strong> The conversion completes locally. Download images individually or download all as a ZIP archive.
          </li>
        </ol>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            WebP to JPG Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Why do some photo printing services reject WebP?</h3>
            <p className="text-slate-600 leading-relaxed">
              Most digital photo kiosks and commercial printing firmware are built specifically around standard JPEG and TIFF color profiles. Converting your WebP files to JPG restores immediate compatibility.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">Will converting WebP to JPG reduce visual quality?</h3>
            <p className="text-slate-600 leading-relaxed">
              At our recommended 85% to 90% quality setting, visual loss is negligible to the human eye while ensuring universal compatibility across all operating systems and software suites.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <h3 className="font-bold text-slate-900">What happens to transparent backgrounds?</h3>
            <p className="text-slate-600 leading-relaxed">
              Because JPEG does not support an alpha transparency channel, FileBatch automatically composites transparent areas onto a clean white background. If you need to keep transparency, convert to PNG instead.
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
              window.location.hash = 'guide-jpg-to-png';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 text-left transition-colors group"
          >
            <span className="font-bold text-slate-900 block group-hover:text-indigo-600">JPG to PNG Guide</span>
            <span className="text-slate-500 mt-1 block">Stop generational compression degradation and prepare images for editing.</span>
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
            <span className="text-slate-500 mt-1 block">Reduce transparent graphics size by up to 45% for faster page loads.</span>
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
            <span className="text-slate-500 mt-1 block">Complete handbook on digital formats, compression math, and Core Web Vitals.</span>
          </button>
        </div>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Section */}
      <div className="bg-amber-600 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Convert WebP to Universally Compatible JPG</h2>
        <p className="text-sm text-amber-100 max-w-md mx-auto">
          Fast, local browser conversion. Up to 100 images per batch without server uploads.
        </p>
        <div>
          <button
            onClick={() => onStartConverting('jpg')}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-amber-800 hover:bg-amber-50 shadow-md transition-all"
          >
            <span>Launch Converter (JPG Preset)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
