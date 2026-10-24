import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, Monitor, Printer, BookOpen, Sparkles } from 'lucide-react';
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
        title="WebP to JPG Conversion Guide: Restore Universal Compatibility"
        description="Learn how to convert WebP to standard JPEG files for legacy desktop software, print shops, older office suites, and photo kiosks with clean transparency matte."
        canonicalPath="#guide-webp-to-jpg"
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': 'Converting WebP to JPG: Restore Universal File Compatibility',
          'description': 'A practical guide to converting modern WebP files back to universal JPEG images without dark transparency artifacts.',
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
        <span className="text-indigo-600">WebP to JPG Conversion Guide</span>
      </div>

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

      {/* Common Problems Solved */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Legacy Software</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Older Photoshop versions, Office software, and default desktop photo viewers often throw "Unknown file format" errors with WebP.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Printer className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Commercial Printing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Print labs, photo kiosks, and vinyl print shops require standard CMYK/sRGB JPEG files and frequently reject WebP containers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Universal Sharing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            JPEG remains the one format guaranteed to open on every television, vehicle dashboard, smart display, and digital picture frame.
          </p>
        </div>
      </div>

      {/* Section 1: The WebP Challenge */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          1. Why You Downloaded a WebP Instead of a JPG
        </h2>
        <p>
          If you have ever saved a photo from Google Images, Wikipedia, or an online storefront only to discover it saved as a <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs font-mono">.webp</code> file, you experienced automated web optimization. CDNs automatically serve WebP to modern browsers to save transfer bandwidth.
        </p>
        <p>
          However, when you attempt to attach that file to a resume portal, upload it to an older CMS like older WordPress installations, or send it to an email recipient with an older desktop client, the file is rejected. Converting back to JPEG restores immediate universal access.
        </p>
      </section>

      {/* Section 2: Transparency Handling */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          2. How FileBatch Safely Handles Transparency During WebP to JPG Conversion
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Because the JPEG format does not support alpha transparency channels, naive converters frequently render transparent areas as harsh, solid pitch-black boxes or corrupted pixel blocks.
        </p>
        <div className="p-4 bg-indigo-50/70 border border-indigo-200/70 rounded-2xl text-xs text-indigo-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-indigo-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Automatic Clean Matte Background</span>
          </div>
          <p>
            FileBatch automatically applies a clean matte fill (pure white <code className="font-mono text-indigo-900">#FFFFFF</code> by default) beneath any transparent WebP pixels before encoding the JPEG. Your cutouts look natural and ready for immediate presentation.
          </p>
        </div>
      </section>

      {/* Section 3: Recommended Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          3. Recommended Quality Presets for JPEG Output
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          FileBatch provides an adjustable quality slider from 10% to 100%. Here is how to configure it for your specific workflow:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 block">75% – Web & Email</span>
            <span className="text-slate-600">Great for quick email attachments or web previews where minimal byte weight is desired.</span>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
            <span className="font-bold text-indigo-950 block">85% – Recommended Default</span>
            <span className="text-indigo-900">The human visual sweet spot. Visually imperceptible compression with generous file size economy.</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 block">95%–100% – Print & Archival</span>
            <span className="text-slate-600">Preserves maximum color accuracy and edge contrast for printing or editing.</span>
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          4. How to Convert WebP to JPG with FileBatch
        </h2>
        <ol className="space-y-3 list-decimal list-inside text-xs sm:text-sm text-slate-700">
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Upload WebP images:</strong> Drag your WebP files into the upload box.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Choose JPG:</strong> Click the <strong>JPEG / JPG</strong> format pill.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Adjust Quality:</strong> Keep the default 85% or adjust the quality slider to your desired ratio.
          </li>
          <li className="p-3 bg-white border border-slate-200 rounded-xl">
            <strong>Download:</strong> Click <strong>Convert All Images</strong> and download individually or in a single ZIP.
          </li>
        </ol>
      </section>

      {/* AdSense In-Article Notice Slot */}
      <AdSenseNotice slotName="In-Article Guide Banner" />

      {/* CTA Box */}
      <div className="bg-amber-600 text-white rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold">Make Your WebP Images Universally Compatible</h2>
        <p className="text-sm text-amber-100 max-w-md mx-auto">
          Convert WebP files to JPG in seconds right inside your browser without uploading your photos anywhere.
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
