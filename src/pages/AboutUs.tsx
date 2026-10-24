import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { ShieldCheck, Cpu, Zap, Lock, EyeOff, Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface AboutUsProps {
  onNavigateHome: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-in fade-in duration-200">
      <SEOHead
        title={`About ${BRAND_CONFIG.name} – Our Mission & Client-Side Privacy Architecture`}
        description={`Learn why ${BRAND_CONFIG.name} was built: providing fast, 100% in-browser bulk image conversion with zero server uploads, no data retention, and no watermarks.`}
        canonicalPath="#about"
      />
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About {BRAND_CONFIG.name}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          We built {BRAND_CONFIG.name} on a simple conviction: you shouldn’t have to upload personal, medical, legal, or proprietary photos to unknown cloud servers just to change an image format.
        </p>
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
              Most online file conversion tools force you to upload your files to remote servers. This consumes upload bandwidth, introduces latency, and creates significant privacy vulnerabilities. Uploaded files often linger in temporary server caches, remote databases, or cloud buckets with ambiguous data retention policies.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs text-rose-700 font-medium">
            Risk: Potential file leaks, server log tracking, and bandwidth caps.
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-indigo-100 p-8 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-200">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">The {BRAND_CONFIG.name} Client-Side Approach</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {BRAND_CONFIG.name} runs 100% inside your modern web browser. Using the HTML5 Canvas API, OffscreenCanvas, and JSZip, your device’s own CPU and graphics hardware perform the mathematical image decoding, compression, and packaging.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-xs text-indigo-700 font-semibold relative z-10 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Result: Zero network uploads, instant processing, absolute data privacy.</span>
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
            Every feature we design adheres to these core ethical and technical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Guaranteed Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never inspect, log, or harvest your images. When you close the browser tab, in-memory object references are immediately cleared by your operating system.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Uncompromised Speed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By removing the network bottleneck, files convert as quickly as your hardware allows. Converting 50 images locally takes a fraction of the time required to upload them.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Paywalls or Watermarks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every tool is free to use. We do not insert forced watermarks, artificial compression limits, or deceptive trial timers.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Architecture Overview */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Under the Hood</span>
          <h2 className="text-2xl font-bold mt-1 text-white">How the Technology Works</h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Our codebase is constructed with TypeScript, React, and native browser Web APIs. Here is how your browser processes each image:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400">01. Binary Signature Check</div>
            <p className="text-xs text-slate-300">
              The first bytes (magic numbers) of each file are verified to ensure only valid JPEG, PNG, or WebP files are submitted for rendering, preventing decoder crashes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400">02. Hardware-Accelerated Canvas</div>
            <p className="text-xs text-slate-300">
              The browser decompresses pixel data directly into an in-memory canvas context, managing alpha transparency preservation and custom matte fills.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400">03. In-Memory ZIP Bundling</div>
            <p className="text-xs text-slate-300">
              JSZip compiles completed files directly into a memory buffer, triggering a native browser download with automatic name collision avoidance.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-5 shadow-xs">
        <h2 className="text-2xl font-bold text-slate-900">Ready to convert your images?</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Start your first batch in seconds with total peace of mind.
        </p>
        <div>
          <button
            onClick={onNavigateHome}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <span>Open Bulk Image Converter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
