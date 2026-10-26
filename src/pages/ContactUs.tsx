import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin, HelpCircle, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-in fade-in duration-200">
      <SEOHead
        title="Contact FileBatch — Support & Feedback | MK Labs"
        description="Contact the FileBatch team at MK Labs for technical support, feature feedback, or partnership inquiries. We respond within 24 to 48 business hours."
        canonicalPath="#contact"
        type="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': 'Contact FileBatch',
          'description': 'Contact page for FileBatch support and inquiries at MK Labs.',
          'publisher': {
            '@type': 'Organization',
            'name': 'MK Labs',
          },
        }}
      />
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Have questions, technical feedback, or partnership inquiries? Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. We have logged your inquiry and our support team will respond to{' '}
                <span className="font-semibold text-slate-800">{formData.email}</span> within 24 to 48 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-bold text-slate-900">Send us a Message</h2>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Subject Category
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support / Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Privacy Question">Privacy & Data Compliance</option>
                  <option value="Advertising & Partnerships">Advertising & Business Partnerships</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="How can we assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm shadow-indigo-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>

              <div className="text-center">
                <span className="text-xs text-slate-500">
                  Or email directly:{' '}
                  <a
                    href={`mailto:${BRAND_CONFIG.company.contactEmail}`}
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    {BRAND_CONFIG.company.contactEmail}
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Contact Channels & Operational Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">Communication Channels</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Direct Inquiries</div>
                  <a
                    href={`mailto:${BRAND_CONFIG.company.contactEmail}`}
                    className="text-indigo-600 hover:underline mt-0.5 block"
                  >
                    {BRAND_CONFIG.company.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Response Time</div>
                  <p className="text-slate-500 mt-0.5">
                    Monday to Friday, 9:00 AM – 6:00 PM EST. Inquiries are generally answered within 24 to 48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Headquarters</div>
                  <p className="text-slate-500 mt-0.5">
                    {BRAND_CONFIG.company.legalName} • {BRAND_CONFIG.company.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-800">Do you store any of my images?</span>
                <p className="text-slate-500 mt-0.5">
                  No. All processing occurs exclusively in your browser via HTML5 Canvas. We never see or store your files.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="font-semibold text-slate-800">Is {BRAND_CONFIG.name} completely free?</span>
                <p className="text-slate-500 mt-0.5">
                  Yes, it is 100% free with no hidden subscriptions, trial caps, or mandatory registrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
