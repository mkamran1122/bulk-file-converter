import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { ShieldCheck, Lock, Cookie, ExternalLink, EyeOff, ServerOff, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'October 23, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-slate-700 animate-in fade-in duration-200">
      <SEOHead
        title={`Privacy Policy & Advertising Disclosures – ${BRAND_CONFIG.name}`}
        description={`Read the official Privacy Policy for ${BRAND_CONFIG.name}. Learn about our 100% client-side file privacy, Google AdSense cookies disclosure, and GDPR/CCPA data protection.`}
        canonicalPath="#privacy"
      />
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Privacy Statement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Last Updated: {lastUpdated} • Effective Immediately
        </p>
      </div>

      {/* Core Local Processing Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Core Privacy Guarantee: Zero File Uploads</span>
        </div>
        <p className="text-sm text-emerald-950 leading-relaxed">
          {BRAND_CONFIG.name} ("we", "our", or "us") operates on a fundamental zero-knowledge principle:
          <span className="font-bold"> your images are converted 100% locally on your computer, tablet, or smartphone.</span> No file data, metadata, or rendered output is ever transmitted to our web servers, third-party cloud storage, external APIs, or database providers.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2 text-xs">
        <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Table of Contents</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-indigo-600">
          <li><a href="#section-1" className="hover:underline">1. Information We Do Not Collect (Image Files)</a></li>
          <li><a href="#section-2" className="hover:underline">2. Browser-Side Memory & Object URLs</a></li>
          <li><a href="#section-3" className="hover:underline">3. Third-Party Advertising & Google AdSense</a></li>
          <li><a href="#section-4" className="hover:underline">4. Cookies and Web Beacons</a></li>
          <li><a href="#section-5" className="hover:underline">5. Standard Web Server Logs</a></li>
          <li><a href="#section-6" className="hover:underline">6. GDPR and CCPA Data Protection Rights</a></li>
          <li><a href="#section-7" className="hover:underline">7. Children's Privacy (COPPA)</a></li>
          <li><a href="#section-8" className="hover:underline">8. Contact Information</a></li>
        </ul>
      </div>

      {/* Policy Sections */}
      <div className="space-y-10 text-sm leading-relaxed text-slate-700">
        {/* Section 1 */}
        <section id="section-1" className="space-y-3 scroll-mt-24">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ServerOff className="w-5 h-5 text-indigo-600" />
            <span>1. Information We Do Not Collect (Your Images)</span>
          </h2>
          <p>
            When you use {BRAND_CONFIG.name} to convert JPEG, PNG, or WebP images, the entire conversion pipeline operates client-side inside your browser sandbox using HTML5 Canvas, OffscreenCanvas, and Web Workers.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>We do not upload your images to any remote server or cloud infrastructure.</li>
            <li>We do not store, scan, catalog, or create derivative copies of your imagery.</li>
            <li>We do not harvest EXIF metadata (e.g., GPS coordinates, camera models, timestamps).</li>
            <li>We do not train artificial intelligence or machine learning models on your files.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="space-y-3 scroll-mt-24">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <span>2. Browser-Side Memory & Object URLs</span>
          </h2>
          <p>
            When an image is selected, your browser generates a temporary local memory reference called an Object URL (<code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs">blob:http://...</code>). This pointer exists exclusively in your device’s volatile RAM.
          </p>
          <p>
            When you remove a file, clear the batch, start a new conversion, or close the browser tab, {BRAND_CONFIG.name} explicitly executes <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs">URL.revokeObjectURL()</code> to promptly release system memory.
          </p>
        </section>

        {/* Section 3 - Google AdSense & Advertising */}
        <section id="section-3" className="space-y-3 scroll-mt-24 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-indigo-600" />
            <span>3. Third-Party Advertising & Google AdSense Disclosure</span>
          </h2>
          <p>
            To keep this bulk converter freely accessible to users worldwide without paid subscriptions, {BRAND_CONFIG.name} is configured to display third-party advertisements via advertising partners, including <strong>Google AdSense</strong>, once ad serving is enabled.
          </p>
          
          <div className="space-y-2 text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">Required Advertising Disclosures:</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Third-party vendors</strong>, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites across the Internet.
              </li>
              <li>
                <strong>Google's use of advertising cookies</strong> enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold inline-flex items-center gap-0.5 hover:underline"
                >
                  Google Ads Settings <ExternalLink className="w-3 h-3" />
                </a>. Alternatively, you may opt out of third-party vendor use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold inline-flex items-center gap-0.5 hover:underline"
                >
                  aboutads.info <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                <strong>Zero Image Access Guarantee:</strong> Third-party advertising networks, analytics providers, and advertising cookies have zero access to your uploaded images, filenames, or converted image data.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="space-y-3 scroll-mt-24">
          <h2 className="text-xl font-bold text-slate-900">4. Cookies and Web Beacons</h2>
          <p>
            Cookies are small text files stored on your device by your browser. While {BRAND_CONFIG.name} does not require authentication or user accounts to perform image conversions, third-party services (such as Google AdSense or Content Delivery Networks) may place cookies to serve non-intrusive ads, prevent ad fraud, and analyze non-personally identifiable site traffic.
          </p>
          <p>
            You can configure your browser to reject all cookies or notify you when a cookie is placed. Note that turning off all cookies will not disrupt your ability to convert images on {BRAND_CONFIG.name}.
          </p>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="space-y-3 scroll-mt-24">
          <h2 className="text-xl font-bold text-slate-900">5. Standard Web Server Logs</h2>
          <p>
            Like standard websites distributed via Content Delivery Networks (CDNs), our hosting infrastructure may record routine HTTP request logs when delivering static HTML, JavaScript, and CSS files. These logs may include IP addresses, browser types, Internet Service Providers (ISPs), referring/exit pages, and timestamps. These logs are used strictly for technical maintenance, DDoS mitigation, and server reliability.
          </p>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="space-y-3 scroll-mt-24">
          <h2 className="text-xl font-bold text-slate-900">6. GDPR and CCPA Data Protection Rights</h2>
          <p>
            Under privacy regulations such as the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), users possess rights regarding personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Right to Know / Access:</strong> You may request disclosure of any personal data we hold. (Because we do not store your files, we hold no user files).</li>
            <li><strong>Right to Deletion:</strong> You may request erasure of any collected personal data.</li>
            <li><strong>Right to Opt-Out:</strong> We do not sell user personal data or image files to any broker or data market.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="section-7" className="space-y-3 scroll-mt-24">
          <h2 className="text-xl font-bold text-slate-900">7. Children's Privacy (COPPA Compliance)</h2>
          <p>
            {BRAND_CONFIG.name} does not knowingly collect personally identifiable information from children under the age of 13. If you believe that a child has provided us with personal information, please contact us immediately, and we will take appropriate measures to delete such data.
          </p>
        </section>

        {/* Section 8 */}
        <section id="section-8" className="space-y-3 scroll-mt-24 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900">8. Privacy Contact Information</h2>
          <p>
            If you have questions, feedback, or concerns regarding our privacy practices or advertising disclosures, please reach out to our privacy compliance officer:
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 space-y-1">
            <div>Legal Entity: {BRAND_CONFIG.company.legalName}</div>
            <div>Privacy Email: <a href={`mailto:${BRAND_CONFIG.company.privacyEmail}`} className="text-indigo-600 underline">{BRAND_CONFIG.company.privacyEmail}</a></div>
            <div>General Support: <a href={`mailto:${BRAND_CONFIG.company.supportEmail}`} className="text-indigo-600 underline">{BRAND_CONFIG.company.supportEmail}</a></div>
            <div>Jurisdiction: {BRAND_CONFIG.company.location}</div>
          </div>
        </section>
      </div>
    </div>
  );
};
