import React from 'react';
import { UploadCloud, Sliders, DownloadCloud } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Select your images',
      description:
        'Drag and drop or browse up to 100 images per batch. Our system validates file signatures (magic bytes) to ensure safe decoding.',
      icon: UploadCloud,
    },
    {
      number: '02',
      title: 'Choose output format or PDF',
      description:
        'Select JPG, PNG, WebP, or "Images to PDF". Fine-tune compression quality, fit pages to natural image dimensions, and reorder pages.',
      icon: Sliders,
    },
    {
      number: '03',
      title: 'Convert and download your files',
      description:
        'Watch local conversion execute in real-time. Download individual converted images, a single combined PDF document, or an organized ZIP archive.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 border-t border-slate-200/80 scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Streamlined Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            How FileBatch Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Three simple steps to transform your image collections without sacrificing privacy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50/70 rounded-2xl p-7 border border-slate-200/70 flex flex-col justify-between group hover:border-indigo-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-indigo-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                  <span>Step {step.number}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
