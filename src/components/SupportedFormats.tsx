import React from 'react';
import { Check, X, FileImage, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export const SupportedFormats: React.FC = () => {
  return (
    <section id="formats" className="py-16 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format Compatibility</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Supported Image Formats & Capabilities
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Convert between modern and traditional web formats directly on your device. Every conversion uses the native Canvas API with verified MIME output.
          </p>
        </div>

        {/* Format Feature Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WebP */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                WEBP
              </div>
              <h3 className="text-lg font-bold text-slate-900">WebP Format</h3>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5">Modern Web Standard</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Developed for the modern web. Delivers 25–35% smaller file sizes than comparable JPEGs while retaining full alpha transparency and crisp detail.
              </p>

              <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lossy compression with quality slider</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full alpha channel transparency</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supported by all modern browsers</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              MIME: image/webp • Ext: .webp
            </div>
          </div>

          {/* JPEG */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm mb-4">
                JPG
              </div>
              <h3 className="text-lg font-bold text-slate-900">JPEG / JPG Format</h3>
              <p className="text-xs text-amber-600 font-semibold mt-0.5">Universal Photography Standard</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                The global benchmark for photographic imagery. Provides balanced lossy compression with adjustable quality factors from 10% to 100%.
              </p>

              <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Adjustable 10%–100% lossy slider (default: 85%)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% universal legacy compatibility</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <X className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>No alpha transparency (fills with solid white)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              MIME: image/jpeg • Ext: .jpg, .jpeg
            </div>
          </div>

          {/* PNG */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                PNG
              </div>
              <h3 className="text-lg font-bold text-slate-900">PNG Format</h3>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">Lossless Precision</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Ideal for graphics, user interface assets, logos, and screenshots requiring razor-sharp edges and exact color replication without compression artifacts.
              </p>

              <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Lossless compression (no pixel loss)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full 8-bit alpha transparency</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-4 h-4 inline-flex items-center justify-center font-bold text-[10px] text-slate-400">
                    ℹ
                  </span>
                  <span>Quality slider does not apply (inherently lossless)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              MIME: image/png • Ext: .png
            </div>
          </div>

          {/* PDF (Images to PDF) */}
          <div className="bg-white rounded-2xl border border-rose-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm mb-4">
                PDF
              </div>
              <h3 className="text-lg font-bold text-slate-900">Images to PDF</h3>
              <p className="text-xs text-rose-600 font-semibold mt-0.5">All Images in One Document</p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Compile multiple photos, receipts, or scans into a single multi-page PDF document. Each image is placed on a separate page with preserved aspect ratio.
              </p>

              <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive page reordering</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fit page to image or A4 standard</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Single combined download</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-3 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              MIME: application/pdf • Ext: .pdf
            </div>
          </div>
        </div>

        {/* Supported Conversions Matrix */}
        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Supported Conversion Matrix</span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Input Format</th>
                  <th className="py-2.5 px-3">Output: JPG</th>
                  <th className="py-2.5 px-3">Output: PNG</th>
                  <th className="py-2.5 px-3">Output: WebP</th>
                  <th className="py-2.5 px-3">Transparency Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-900">JPEG / JPG</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Recompress (Quality)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Convert (Lossless)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Convert (Optimized)</td>
                  <td className="py-3 px-3 text-slate-500">Input has no alpha</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-900">PNG</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Convert (Matte White)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Re-encode (Lossless)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Convert (Preserves Alpha)</td>
                  <td className="py-3 px-3 text-slate-700">Preserved in PNG & WebP; White on JPG</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-900">WebP</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Convert (Matte White)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Convert (Lossless)</td>
                  <td className="py-3 px-3 text-emerald-700 font-medium">Re-encode (Quality)</td>
                  <td className="py-3 px-3 text-slate-700">Preserved in PNG & WebP; White on JPG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clear Version 1 Boundaries Notice */}
        <div className="mt-6 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Clear Version 1 Scope & Unsupported Formats:</span>{' '}
            To guarantee 100% in-browser reliability and client privacy without unverified native plugins, this version supports static <span className="font-semibold text-slate-700">JPEG, PNG, and WebP</span> only. Format decoding is verified via magic signature bytes. Animated GIF, animated WebP, HEIC/HEIF, AVIF, SVG, TIFF, and RAW formats are rejected safely with clear explanations.
          </div>
        </div>
      </div>
    </section>
  );
};
