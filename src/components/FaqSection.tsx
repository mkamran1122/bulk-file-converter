import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';

export interface FaqItem {
  question: string;
  answer: string;
  guideLink?: {
    page: PageId;
    label: string;
  };
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'How does FileBatch convert files without uploading them to a remote server?',
    answer:
      'FileBatch runs entirely inside your web browser using HTML5 Canvas, OffscreenCanvas, and modern Web APIs. When you select JPG, PNG, or WebP files, your device’s local CPU and GPU decompress, re-encode, and process each image in temporary browser memory. Files are never transmitted over the internet to any external server or cloud storage.',
  },
  {
    question: 'Which image and document formats are supported?',
    answer:
      'FileBatch supports raster image conversion between JPG/JPEG, PNG, and WebP. In addition, our PDF Tools Suite allows you to compile multiple JPG, PNG, or WebP images into a single multi-page PDF document (Images to PDF), or extract individual PDF pages into high-resolution JPG, PNG, or WebP images (PDF to Images). Formats like animated GIF, SVG, and camera RAW are not supported to guarantee 100% native client-side stability.',
    guideLink: {
      page: 'guide-image-optimization',
      label: 'Read the Image Optimization Handbook',
    },
  },
  {
    question: 'How does the "Images to PDF" feature work?',
    answer:
      'The Images to PDF tool combines multiple image files into one structured PDF document. You can reorder pages by dragging or using the up/down controls, choose between natural image aspect ratio fit or standard A4 paper dimensions, and set a custom document filename before downloading.',
  },
  {
    question: 'Can I extract images from multi-page PDF documents?',
    answer:
      'Yes. The "PDF to Images" tool loads your PDF file locally with PDF.js and lets you choose between converting all pages, a single page, or a custom range (such as "1-5, 8"). You can choose JPG, PNG, or WebP output, adjust the DPI resolution scale (1x, 1.5x, 2x, 3x), and download individual rendered pages or a single ZIP archive.',
  },
  {
    question: 'Why does my transparent PNG receive a white background when converted to JPG?',
    answer:
      'The standard JPEG format does not have an alpha transparency channel. To prevent black outlines or corrupted backgrounds, FileBatch fills transparent areas with a clean white matte before encoding. If you need to keep transparent backgrounds while reducing file size, we recommend converting to WebP instead of JPG.',
    guideLink: {
      page: 'guide-png-to-webp',
      label: 'Learn more in the PNG to WebP Guide',
    },
  },
  {
    question: 'Is there a limit on file size or the number of images per batch?',
    answer:
      'To prevent your web browser from exhausting system memory (RAM), FileBatch supports up to 100 images per batch and up to 25 MB per individual image file. PDF documents up to 100 MB are supported. All batch packaging into ZIP files occurs entirely within local browser memory.',
  },
  {
    question: 'Are my images watermarked or is there any subscription fee?',
    answer:
      'No. FileBatch is 100% free and open to everyone without user accounts, subscriptions, or watermarks. FileBatch is developed and maintained by MK Labs to provide accessible, privacy-respecting digital tools.',
    guideLink: {
      page: 'about',
      label: 'Learn about MK Labs and FileBatch',
    },
  },
];

interface FaqSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigate }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="py-16 border-t border-slate-200/80 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our browser-based image conversions, PDF tools, and privacy architecture.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-white text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 border-t border-slate-100 bg-white">
                    <p>{item.answer}</p>
                    {item.guideLink && onNavigate && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate(item.guideLink!.page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          <span>{item.guideLink.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Security & Verification Callout */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-emerald-950">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Transparent Verification:</span> You can verify that no network traffic occurs during conversion by opening your browser’s Developer Tools (<kbd className="px-1 py-0.5 bg-white border border-emerald-200 rounded text-[10px] font-mono">F12</kbd> &rarr; <span className="font-semibold">Network</span> tab). FileBatch operates 100% offline once the web application assets are loaded.
          </div>
        </div>
      </div>
    </section>
  );
};
