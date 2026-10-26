import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { ShieldCheck, Cpu, EyeOff, Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface AboutUsProps {
  onNavigateHome: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-in fade-in duration-200">
      <SEOHead
        title="About FileBatch by MK Labs — 100% In-Browser File Tools"
        description="Learn about FileBatch, developed by MK Labs to make everyday image conversion and PDF tasks fast, accessible, and completely private in your browser."
        canonicalPath="#about"
        type="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          'name': 'About FileBatch',
          'description': 'Information about FileBatch, a private client-side file conversion tool developed by MK Labs.',
          'publisher': {
            '@type': 'Organization',
            'name': 'MK Labs',
            'logo': 'https://filebatch.netlify.app/assets/aistudio/MK_Labs_703312e1.jpg',
          },
          'mainEntity': {
            '@type': 'SoftwareApplication',
            'name': 'FileBatch',
            'applicationCategory': 'UtilitiesApplication',
            'operatingSystem': 'All',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
            },
          },
        }}
      />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About FileBatch
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          FileBatch is a client-side digital product developed and owned by <strong className="text-slate-800">MK Labs</strong>. Our goal is to make everyday file-related tasks simpler, faster, and completely private.
        </p>
      </div>

      {/* MK Labs Introduction Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <img
          src="/assets/aistudio/MK_Labs_703312e1.jpg"
          alt="MK Labs logo"
          className="w-20 h-20 rounded-2xl object-contain bg-black border border-slate-200 shrink-0 shadow-sm"
          width={80}
          height={80}
        />
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Product by MK Labs
          </div>
          <h2 className="text-xl font-bold text-slate-900">Developed and Owned by MK Labs</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            MK Labs develops useful digital products and online tools designed to solve real-world problems with elegance and efficiency. FileBatch is built specifically to address the privacy and speed challenges of converting files online. We believe you should never have to upload personal, business, or sensitive documents to unknown cloud servers just to change an image format or combine images into a PDF.
          </p>
        </div>
      </div>

      {/* The Problem & Our Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <EyeOff className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">The Problem with Traditional Converters</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Most online file conversion websites require you to upload your files to remote cloud servers. This consumes upload bandwidth, introduces artificial queue delays, and poses severe privacy risks. Uploaded images frequently linger in temporary cloud caches, remote logs, and third-party storage.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs text-rose-700 font-medium">
            Common risks: Data retention, third-party inspection, bandwidth caps, and forced watermarks.
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-indigo-100 p-8 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-200">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">The FileBatch In-Browser Architecture</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              FileBatch runs 100% inside your web browser. Utilizing the HTML5 Canvas API, Web Workers, and client-side PDF libraries, your own device’s hardware performs image decoding, re-encoding, and PDF compilation locally in memory.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs text-indigo-700 font-semibold relative z-10 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Result: Zero network uploads, instant processing, absolute privacy.</span>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Guiding Principles
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every feature in FileBatch adheres to these core ethical and technical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Guaranteed Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Files are never sent across the internet. When you close the browser tab, all temporary in-memory blobs are immediately cleared by your operating system.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">High Speed & Convenience</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By eliminating upload and download bottlenecks, batch converting 50 images or combining a multi-page PDF completes in mere seconds.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Accessible to Everyone</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No subscriptions, no accounts, and no deceptive watermarks. MK Labs builds FileBatch as an open, accessible utility for students, creators, and professionals.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-5 shadow-xs">
        <h2 className="text-2xl font-bold text-slate-900">Ready to convert your files?</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Start your first batch in seconds with complete peace of mind.
        </p>
        <div>
          <button
            onClick={onNavigateHome}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <span>Open Bulk File Converter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
