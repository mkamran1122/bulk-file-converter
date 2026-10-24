import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { PageId } from '../types';
import { Layers, ShieldCheck, ChevronDown, BookOpen, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onSelectImagesClick: () => void;
  onSelectPdfTools?: (tab?: 'images-to-pdf' | 'pdf-to-images') => void;
  isPdfToolsActive?: boolean;
  fileCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onSelectImagesClick,
  onSelectPdfTools,
  isPdfToolsActive = false,
  fileCount,
}) => {
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const [pdfDropdownOpen, setPdfDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setGuidesDropdownOpen(false);
    setPdfDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePdfClick = (tab?: 'images-to-pdf' | 'pdf-to-images') => {
    if (onSelectPdfTools) {
      onSelectPdfTools(tab);
    }
    setPdfDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isGuidePage = currentPage.startsWith('guide-');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          type="button"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-200 group-hover:bg-indigo-700 transition-colors shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-lg leading-tight">
              {BRAND_CONFIG.name}
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
              {BRAND_CONFIG.tagline}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`transition-colors focus:outline-none focus-visible:text-indigo-600 ${
              currentPage === 'home' && !isPdfToolsActive ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
            }`}
          >
            Image Converter
          </button>

          {/* PDF Tools Dropdown / Link */}
          <div className="relative">
            <button
              type="button"
              onClick={() => handlePdfClick()}
              onMouseEnter={() => setPdfDropdownOpen(true)}
              className={`inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:text-rose-600 ${
                isPdfToolsActive ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
              }`}
            >
              <span>PDF Tools</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700 uppercase">2 in 1</span>
              <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>

            {pdfDropdownOpen && (
              <div
                onMouseLeave={() => setPdfDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  PDF Conversion Suite
                </div>
                <button
                  type="button"
                  onClick={() => handlePdfClick('images-to-pdf')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-medium transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-600">Option A</span>
                    <span>Images to PDF</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Combine</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePdfClick('pdf-to-images')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-medium transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-600">Option B</span>
                    <span>PDF to Images</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-mono font-semibold">Extract</span>
                </button>
              </div>
            )}
          </div>

          {/* Guides Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setGuidesDropdownOpen(!guidesDropdownOpen)}
              onMouseEnter={() => setGuidesDropdownOpen(true)}
              className={`inline-flex items-center gap-1 transition-colors focus:outline-none focus-visible:text-indigo-600 ${
                isGuidePage ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
              }`}
              aria-expanded={guidesDropdownOpen}
            >
              <span>Guides</span>
              <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </button>

            {guidesDropdownOpen && (
              <div
                onMouseLeave={() => setGuidesDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Conversion Handbooks
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('guide-jpg-to-png')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 hover:text-indigo-600 text-slate-700 font-medium transition-colors flex items-center justify-between"
                >
                  <span>JPG to PNG Guide</span>
                  <span className="text-[10px] text-slate-400 font-mono">Lossless</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('guide-png-to-webp')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 hover:text-indigo-600 text-slate-700 font-medium transition-colors flex items-center justify-between"
                >
                  <span>PNG to WebP Guide</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-semibold">-40% size</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('guide-webp-to-jpg')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 hover:text-indigo-600 text-slate-700 font-medium transition-colors flex items-center justify-between"
                >
                  <span>WebP to JPG Guide</span>
                  <span className="text-[10px] text-slate-400 font-mono">Universal</span>
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => handleNavClick('guide-image-optimization')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 hover:text-indigo-600 text-slate-700 font-medium transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Master Optimization Guide</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`transition-colors focus:outline-none focus-visible:text-indigo-600 ${
              currentPage === 'about' ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
            }`}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`transition-colors focus:outline-none focus-visible:text-indigo-600 ${
              currentPage === 'contact' ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
            }`}
          >
            Contact
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('privacy')}
            className={`transition-colors focus:outline-none focus-visible:text-indigo-600 ${
              currentPage === 'privacy' ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
            }`}
          >
            Privacy Policy
          </button>
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% In-Browser</span>
          </div>

          <button
            onClick={() => {
              if (currentPage !== 'home') {
                onNavigate('home');
              }
              setTimeout(() => onSelectImagesClick(), 50);
            }}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            {fileCount > 0 ? `Batch (${fileCount})` : 'Select Images'}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentPage === 'home' && !isPdfToolsActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Image Converter (JPG, PNG, WebP)
            </button>
            <button
              type="button"
              onClick={() => handlePdfClick('images-to-pdf')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
                isPdfToolsActive ? 'bg-rose-50 text-rose-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Option A: Images to PDF</span>
              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">PDF</span>
            </button>
            <button
              type="button"
              onClick={() => handlePdfClick('pdf-to-images')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
                isPdfToolsActive ? 'bg-rose-50 text-rose-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Option B: PDF to Images</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Extract</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentPage === 'about' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentPage === 'contact' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('privacy')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentPage === 'privacy' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('terms')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentPage === 'terms' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Terms of Service
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Optimization Guides
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleNavClick('guide-jpg-to-png')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50"
              >
                • JPG to PNG Guide
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('guide-png-to-webp')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50"
              >
                • PNG to WebP Guide
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('guide-webp-to-jpg')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50"
              >
                • WebP to JPG Guide
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('guide-image-optimization')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50"
              >
                • Image Optimization Handbook
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
