import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu } from 'lucide-react';

export const PrivacySection: React.FC = () => {
  return (
    <section id="privacy" className="py-16 border-t border-slate-200/80 scroll-mt-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Statement Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-6 border border-emerald-100">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Privacy First. Always Local.
            </h2>

            <blockquote className="mt-5 text-base sm:text-lg text-slate-700 font-medium bg-slate-50 rounded-2xl p-5 border border-slate-200/80 max-w-2xl mx-auto">
              "{BRAND_CONFIG.privacyStatement}"
            </blockquote>

            <p className="mt-5 text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Unlike traditional image converter websites that upload your personal or confidential photos to remote cloud servers, FileBatch converts every file inside your own browser window using HTML5 Canvas and Web APIs.
            </p>

            {/* Architecture Pillars */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ServerOff className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Server Uploads</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your files never travel over the network. Open your browser Developer Tools Network tab at any time to verify that zero image payloads are sent.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Client-Side Processing</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Conversions are powered by your computer or mobile device's GPU/CPU via native Canvas and OffscreenCanvas APIs.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <EyeOff className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Zero Tracking & Logs</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  No tracking pixels, third-party analytics scripts, or cookie trackers. Temporary object URLs are revoked immediately after use to safeguard device RAM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
