import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { FileText, ShieldAlert, CheckCircle2, Scale } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const TermsOfService: React.FC = () => {
  const lastUpdated = 'October 23, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-slate-700 animate-in fade-in duration-200">
      <SEOHead
        title="Terms of Service & Copyright Ownership | FileBatch"
        description="Review the FileBatch Terms of Service. Retain 100% copyright and ownership of all processed images with our client-side conversion architecture."
        canonicalPath="#terms"
        type="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'FileBatch Terms of Service',
          'description': 'Terms of Service governing use of the FileBatch client-side file converter.',
          'publisher': {
            '@type': 'Organization',
            'name': 'MK Labs',
          },
        }}
      />
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Last Updated: {lastUpdated} • Version 1.2
        </p>
      </div>

      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
        <p className="text-sm text-slate-700 leading-relaxed">
          Welcome to {BRAND_CONFIG.name} ("Service", "Application", "we", "us", or "our"), operated by {BRAND_CONFIG.company.legalName}. By accessing or using our website, web application, and image conversion utilities, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the Service immediately.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-10 text-sm leading-relaxed text-slate-700">
        {/* Section 1: Intellectual Property & Ownership */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>1. Your Content and Intellectual Property Rights</span>
          </h2>
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 text-emerald-950 font-medium text-xs sm:text-sm">
            You retain 100% of the ownership, copyright, and intellectual property rights in and to all images, graphics, and files you select, process, or convert with {BRAND_CONFIG.name}.
          </div>
          <p>
            Because our application executes exclusively in your local web browser environment without transmitting files to our servers, we do not claim, demand, or acquire any license, copyright, or ownership rights over your creative assets.
          </p>
        </section>

        {/* Section 2: Permitted & Acceptable Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Permitted and Acceptable Use</h2>
          <p>
            {BRAND_CONFIG.name} is provided for personal, professional, academic, and commercial image conversion purposes. When using our service, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Attempt to reverse-engineer, decompile, or tamper with security or client-side validation logic.</li>
            <li>Use automated scrapers, bots, or malicious scripts to flood or degrade the website infrastructure.</li>
            <li>Use the software to process illicit materials, unauthorized intellectual property, or materials violating applicable local, state, or international laws.</li>
            <li>Misrepresent the source, ownership, or licensing of converted assets.</li>
          </ul>
        </section>

        {/* Section 3: Third-Party Advertising */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Advertisements and External Links</h2>
          <p>
            The Service may display advertisements provided by third-party advertising networks, such as Google AdSense. We do not endorse or assume responsibility for any products, services, claims, or third-party websites advertised through these networks. Your interactions with advertisers found on or through the Service are solely between you and the respective advertiser.
          </p>
        </section>

        {/* Section 4: Disclaimer of Warranties */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>4. Disclaimer of Warranties</span>
          </h2>
          <p className="uppercase text-xs font-semibold text-slate-500 tracking-wider">Provided "As Is" and "As Available"</p>
          <p>
            {BRAND_CONFIG.name} IS PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPATIBLE WITH EVERY COMBINATION OF OPERATING SYSTEM AND BROWSER ENGINE.
          </p>
          <p>
            You acknowledge that image conversion involves mathematical compression and format translation. We strongly recommend retaining backup copies of original high-resolution master images.
          </p>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL {BRAND_CONFIG.company.legalName.toUpperCase()}, ITS DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.
          </p>
        </section>

        {/* Section 6: Modifications to the Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Modifications and Updates</h2>
          <p>
            We reserve the right to revise or replace these Terms of Service at any time. When updates are published, the "Last Updated" timestamp at the top of this document will be amended. Continued usage of {BRAND_CONFIG.name} following the posting of changes constitutes acceptance of the amended terms.
          </p>
        </section>

        {/* Section 7: Governing Law and Contact */}
        <section className="space-y-3 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900">7. Governing Law & Contact</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction of {BRAND_CONFIG.company.location}, without regard to its conflict of law provisions.
          </p>
          <p>
            For legal notices, terms clarification, or copyright inquiries, please contact:
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 space-y-1">
            <div>Legal Department: {BRAND_CONFIG.company.legalName}</div>
            <div>Email: <a href={`mailto:${BRAND_CONFIG.company.contactEmail}`} className="text-indigo-600 underline">{BRAND_CONFIG.company.contactEmail}</a></div>
          </div>
        </section>
      </div>
    </div>
  );
};
