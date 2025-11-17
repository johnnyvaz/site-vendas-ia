/**
 * SEO Hook for Dynamic Meta Tag and Canonical URL Management
 * Manages page-specific SEO optimization for Vendas.IA
 * Brazilian search optimization focused
 */

import { useEffect } from 'react';
import { seoManager, type SEOMetadata } from '@/lib/seo';

export interface UseSEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'service';
  structuredData?: any[];
  noIndex?: boolean;
  noFollow?: boolean;
}

/**
 * Hook for managing SEO metadata dynamically
 */
export function useSEO(options: UseSEOOptions = {}) {
  useEffect(() => {
    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;

    // Get page-specific metadata based on pathname
    const pathMetadata = seoManager.getPageMetadata(getPageIdentifier(window.location.pathname));

    // Merge default, page-specific, and custom metadata
    const finalMetadata: SEOMetadata = {
      ...pathMetadata,
      ...options,
      canonicalUrl: options.canonicalUrl || currentUrl,
      ogImage: options.ogImage || `${baseUrl}/images/og-vendas-ia.jpg`
    };

    // Apply metadata to page
    seoManager.setPageMetadata(finalMetadata);

    // Add structured data if provided
    if (options.structuredData && options.structuredData.length > 0) {
      seoManager.insertStructuredData(options.structuredData);
    }

    // Add default organization structured data if none provided
    if (!options.structuredData) {
      const orgData = seoManager.generateLocalBusinessStructuredData();
      seoManager.insertStructuredData(orgData);
    }

    // Handle robots meta
    if (options.noIndex || options.noFollow) {
      const robotsContent = [
        options.noIndex ? 'noindex' : 'index',
        options.noFollow ? 'nofollow' : 'follow'
      ].join(', ');

      setMetaTag('robots', robotsContent);
    }

    return () => {
      // Cleanup function - restore default metadata when component unmounts
      const defaultMetadata = seoManager.generateMetadata();
      seoManager.setPageMetadata(defaultMetadata);
    };
  }, [
    options.title,
    options.description,
    options.canonicalUrl,
    options.ogImage,
    options.noIndex,
    options.noFollow
  ]);
}

/**
 * Hook for product pages with structured data
 */
export function useProductSEO(productData: {
  name: string;
  description: string;
  image: string;
  price?: { value: number; currency: 'BRL' };
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  reviews?: { rating: number; reviewCount: number };
}) {
  useEffect(() => {
    // Generate product structured data
    const productStructuredData = seoManager.generateProductStructuredData({
      ...productData,
      brand: 'Vendas.IA',
      category: 'Software de Automação',
      sku: `vendas-ia-${productData.name.toLowerCase().replace(/\s+/g, '-')}`
    });

    // Set product-specific SEO
    useSEO({
      title: `${productData.name} - Vendas.IA | Automação Inteligente`,
      description: productData.description,
      keywords: ['vendas ia', productData.name.toLowerCase(), 'automação', 'whatsapp'],
      ogType: 'product',
      ogImage: productData.image,
      structuredData: [productStructuredData]
    });
  }, [productData]);
}

/**
 * Hook for article/blog pages
 */
export function useArticleSEO(articleData: {
  title: string;
  description: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
  keywords?: string[];
}) {
  useSEO({
    title: `${articleData.title} | Blog Vendas.IA`,
    description: articleData.description,
    keywords: articleData.keywords || [],
    ogType: 'article',
    ogImage: articleData.image,
    publishedTime: articleData.publishedTime,
    modifiedTime: articleData.modifiedTime,
    author: articleData.author || 'Johnny Vaz - Vendas.IA'
  });
}

/**
 * Hook for FAQ pages with structured data
 */
export function useFAQSEO(faqs: Array<{ question: string; answer: string }>) {
  useEffect(() => {
    const faqStructuredData = seoManager.generateFAQStructuredData(faqs);

    useSEO({
      title: 'Perguntas Frequentes - Vendas.IA | Dúvidas sobre Automação',
      description: 'Encontre respostas para as principais dúvidas sobre automação de vendas, Disparo Rápido WhatsApp e soluções da Vendas.IA.',
      keywords: ['faq vendas ia', 'dúvidas automação', 'suporte whatsapp', 'perguntas disparo rápido'],
      structuredData: [faqStructuredData]
    });
  }, [faqs]);
}

/**
 * Hook for breadcrumb navigation
 */
export function useBreadcrumbSEO(breadcrumbs: Array<{ name: string; url: string }>) {
  useEffect(() => {
    const breadcrumbStructuredData = seoManager.generateBreadcrumbStructuredData(
      breadcrumbs.map((item, index) => ({
        name: item.name,
        url: item.url,
        position: index + 1
      }))
    );

    seoManager.insertStructuredData(breadcrumbStructuredData);
  }, [breadcrumbs]);
}

/**
 * Hook for local business SEO (contact/about pages)
 */
export function useLocalBusinessSEO() {
  useEffect(() => {
    const localBusinessData = seoManager.generateLocalBusinessStructuredData();
    seoManager.insertStructuredData(localBusinessData);
  }, []);
}

/**
 * Utility functions
 */
function getPageIdentifier(pathname: string): string {
  // Map URL paths to page identifiers
  const pathMap: Record<string, string> = {
    '/': 'home',
    '/disparo-rapido': 'disparo-rapido',
    '/contato': 'contact',
    '/sobre': 'about',
    '/blog': 'blog',
    '/faq': 'faq'
  };

  return pathMap[pathname] || 'home';
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

/**
 * Hook for dynamic canonical URLs based on query parameters
 */
export function useCanonicalURL(baseUrl?: string, cleanParams: string[] = []) {
  useEffect(() => {
    const currentUrl = new URL(window.location.href);

    // Remove specified query parameters for canonical URL
    cleanParams.forEach(param => {
      currentUrl.searchParams.delete(param);
    });

    // Remove common tracking parameters
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
    trackingParams.forEach(param => {
      currentUrl.searchParams.delete(param);
    });

    const canonicalUrl = baseUrl || currentUrl.toString();

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }

    link.href = canonicalUrl;
  }, [baseUrl, cleanParams]);
}

/**
 * Hook for hreflang tags (multiple language versions)
 */
export function useHrefLang(alternateLanguages: Array<{ lang: string; url: string }>) {
  useEffect(() => {
    // Remove existing hreflang tags
    const existingLinks = document.querySelectorAll('link[hreflang]');
    existingLinks.forEach(link => link.remove());

    // Add new hreflang tags
    alternateLanguages.forEach(alt => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alt.lang;
      link.href = alt.url;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup on unmount
      const links = document.querySelectorAll('link[hreflang]');
      links.forEach(link => link.remove());
    };
  }, [alternateLanguages]);
}

/**
 * Hook for schema markup injection
 */
export function useSchemaMarkup(schemaData: any) {
  useEffect(() => {
    const scriptId = 'dynamic-schema';

    // Remove existing script
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [schemaData]);
}

/**
 * Hook for Open Graph image optimization
 */
export function useOGImage(imagePath: string, dimensions: { width: number; height: number } = { width: 1200, height: 630 }) {
  useEffect(() => {
    const baseUrl = window.location.origin;
    const fullImageUrl = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;

    setMetaTag('og:image', fullImageUrl, 'property');
    setMetaTag('og:image:width', dimensions.width.toString(), 'property');
    setMetaTag('og:image:height', dimensions.height.toString(), 'property');
    setMetaTag('og:image:alt', document.title, 'property');

    // Twitter Card
    setMetaTag('twitter:image', fullImageUrl);
    setMetaTag('twitter:card', 'summary_large_image');
  }, [imagePath, dimensions]);
}

/**
 * Hook for viewport and mobile optimization
 */
export function useMobileOptimization() {
  useEffect(() => {
    // Ensure proper viewport meta tag
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';

    // Add mobile-specific meta tags
    setMetaTag('format-detection', 'telephone=no');
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    setMetaTag('theme-color', '#27305d');
  }, []);
}

export default {
  useSEO,
  useProductSEO,
  useArticleSEO,
  useFAQSEO,
  useBreadcrumbSEO,
  useLocalBusinessSEO,
  useCanonicalURL,
  useHrefLang,
  useSchemaMarkup,
  useOGImage,
  useMobileOptimization
};