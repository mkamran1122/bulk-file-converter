import React, { useEffect } from 'react';
import { BRAND_CONFIG } from '../config/brand';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

export const CANONICAL_BASE = 'https://filebatch.netlify.app';

/**
 * SEOHead dynamically manages the HTML document title, meta description,
 * canonical link tag, OpenGraph tags, Twitter cards, and Schema.org JSON-LD
 * for client-side rendered routes.
 *
 * It enforces the canonical hostname: https://filebatch.netlify.app/
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

    // 3. Canonical Link Tag (Strictly https://filebatch.netlify.app/ base)
    let fullCanonicalUrl: string;
    if (!canonicalPath || canonicalPath === '' || canonicalPath === 'home' || canonicalPath === '/') {
      fullCanonicalUrl = `${CANONICAL_BASE}/`;
    } else if (canonicalPath.startsWith('#')) {
      fullCanonicalUrl = `${CANONICAL_BASE}/${canonicalPath}`;
    } else if (canonicalPath.startsWith('/')) {
      fullCanonicalUrl = `${CANONICAL_BASE}${canonicalPath}`;
    } else {
      fullCanonicalUrl = `${CANONICAL_BASE}/#${canonicalPath}`;
    }

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
    setMetaTag('property', 'og:image', `${CANONICAL_BASE}/assets/aistudio/MK_Labs_703312e1.jpg`);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:image', `${CANONICAL_BASE}/assets/aistudio/MK_Labs_703312e1.jpg`);

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
  }, [title, description, canonicalPath, type, jsonLd]);

  return null;
};
