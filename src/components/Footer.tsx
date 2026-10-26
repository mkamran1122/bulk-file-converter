import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { PageId, SupportedFormat } from '../types';
import { Layers, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onSelectFormat?: (format: SupportedFormat) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectFormat }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolNav = (format: SupportedFormat) => {
    onNavigate('home');
    if (onSelectFormat) {
      onSelectFormat(format);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 5-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-base">{BRAND_CONFIG.name}</div>
                <div className="text-xs text-slate-500">{BRAND_CONFIG.tagline}</div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The high-performance, private bulk image converter and PDF tool suite. Convert hundreds of JPG, PNG, and WebP files locally inside your browser window without uploading files to remote servers.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Client-Side Processing Architecture</span>
            </div>

            {/* MK Labs Ownership & Official Logo */}
            <div className="pt-2 flex items-center gap-3">
              <img
                src="/assets/aistudio/MK_Labs_703312e1.jpg"
                alt="MK Labs logo"
                className="w-8 h-8 rounded-lg object-contain shadow-xs border border-slate-200 bg-black shrink-0"
                width={32}
                height={32}
                loading="lazy"
              />
              <span className="text-xs font-medium text-slate-700">
                FileBatch is a product by MK Labs.
              </span>
            </div>
          </div>

          {/* Tools & Formats */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              File Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Bulk Image Converter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolNav('png')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  JPG to PNG Converter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolNav('webp')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  PNG to WebP Converter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolNav('jpg')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  WebP to JPG Converter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolNav('pdf')}
                  className="hover:text-rose-600 transition-colors text-left font-semibold text-rose-600 flex items-center gap-1"
                >
                  <span>Images to PDF Converter</span>
                  <span className="text-[9px] px-1 rounded bg-rose-50 text-rose-700 uppercase font-mono">PDF</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Guides */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Optimization Guides
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('guide-jpg-to-png')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  JPG to PNG Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('guide-png-to-webp')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  PNG to WebP Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('guide-webp-to-jpg')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  WebP to JPG Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('guide-image-optimization')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Image Optimization Handbook
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Company & Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  About Us (MK Labs)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('privacy')}
                  className="hover:text-indigo-600 transition-colors text-left font-medium text-slate-700"
                >
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('terms')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense & Legal Disclaimer Footnote */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} FileBatch. Developed by MK Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500 flex-wrap">
            <span>Inquiries: <a href={`mailto:${BRAND_CONFIG.company.contactEmail}`} className="underline hover:text-indigo-600">{BRAND_CONFIG.company.contactEmail}</a></span>
            <span>•</span>
            <span>Zero Server Uploads</span>
            <span>•</span>
            <span>100% In-Browser</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
