import React, { useEffect } from 'react';
import { BRAND_CONFIG } from '../config/brand';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

/**
 * SEOHead dynamically manages the HTML document title, meta description,
 * canonical link tag, OpenGraph tags, Twitter cards, and Schema.org JSON-LD
 * for client-side rendered routes.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes(BRAND_CONFIG.name)
      ? title
      : `${title} | ${BRAND_CONFIG.name}`;
    document.title = formattedTitle;

    // Helper to find or create a meta tag
    const setMetaTag = (attribute: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);

    // 3. Canonical Link Tag
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const hash = canonicalPath || (typeof window !== 'undefined' ? window.location.hash : '');
    const fullCanonicalUrl = `${origin}${pathname}${hash}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonicalUrl;

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', BRAND_CONFIG.name);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // 6. Schema.org Structured Data (JSON-LD)
    let jsonLdScript = document.getElementById('seo-dynamic-jsonld') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'seo-dynamic-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    // Cleanup: Reset to root defaults when unmounting or switching pages
    return () => {
      // Intentionally avoid blanking out title abruptly; next SEOHead will immediately overwrite
    };
  }, [title, description, canonicalPath, type, jsonLd]);

  return null;
};
