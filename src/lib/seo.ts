/**
 * SEO Metadata Management for Vendas.IA
 * Optimized for Brazilian search engines and Portuguese language
 * Includes structured data, meta tags, and Open Graph optimization
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'service';
  twitterCard?: 'summary' | 'summary_large_image';
  alternateLanguages?: { lang: string; url: string }[];
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface StructuredData {
  type: 'Organization' | 'LocalBusiness' | 'Product' | 'Service' | 'Article' | 'BreadcrumbList' | 'FAQ';
  data: Record<string, unknown>;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductSEO {
  name: string;
  description: string;
  image: string;
  price?: {
    value: number;
    currency: 'BRL';
  };
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand: string;
  category: string;
  sku?: string;
  reviews?: {
    rating: number;
    reviewCount: number;
  };
}

class SEOManager {
  private defaultMetadata: SEOMetadata = {
    title: 'Vendas.IA - Automação Inteligente para Vendas no Brasil',
    description: 'Transforme suas vendas com IA. Disparo Rápido WhatsApp, automação de marketing e soluções personalizadas para empresas brasileiras. Teste grátis!',
    keywords: [
      'vendas com ia',
      'automação whatsapp',
      'disparo rápido',
      'marketing digital brasil',
      'whatsapp business',
      'vendas automatizadas',
      'crm brasileiro',
      'inteligência artificial vendas',
      'automação marketing',
      'leads qualificados'
    ],
    ogType: 'website',
    twitterCard: 'summary_large_image',
    author: 'Johnny Vaz - Vendas.IA',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };

  private organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vendas.IA',
    description: 'Especialista em automação inteligente para vendas com foco no mercado brasileiro',
    url: 'https://vendas.ia.br',
    logo: 'https://vendas.ia.br/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-16-99778-7674',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'Brasil'
    },
    sameAs: [
      'https://wa.me/5516997787674'
    ],
    founder: {
      '@type': 'Person',
      name: 'Johnny Vaz',
      email: 'contato@johnnyvaz.com.br'
    }
  };

  /**
   * Generate complete SEO metadata for a page
   */
  public generateMetadata(pageMetadata: Partial<SEOMetadata> = {}): SEOMetadata {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return {
      ...this.defaultMetadata,
      ...pageMetadata,
      canonicalUrl: pageMetadata.canonicalUrl || `${baseUrl}${currentPath}`,
      ogImage: pageMetadata.ogImage || `${baseUrl}/images/og-vendas-ia.jpg`
    };
  }

  /**
   * Set document metadata
   */
  public setPageMetadata(metadata: SEOMetadata): void {
    if (typeof document === 'undefined') return;

    // Basic meta tags
    this.setMetaTag('description', metadata.description);
    this.setMetaTag('keywords', metadata.keywords.join(', '));
    this.setMetaTag('author', metadata.author || this.defaultMetadata.author);
    this.setMetaTag('robots', metadata.robots || this.defaultMetadata.robots);

    // Open Graph tags
    this.setMetaTag('og:title', metadata.title, 'property');
    this.setMetaTag('og:description', metadata.description, 'property');
    this.setMetaTag('og:type', metadata.ogType || 'website', 'property');
    this.setMetaTag('og:url', metadata.canonicalUrl || '', 'property');
    this.setMetaTag('og:locale', 'pt_BR', 'property');
    this.setMetaTag('og:site_name', 'Vendas.IA', 'property');

    if (metadata.ogImage) {
      this.setMetaTag('og:image', metadata.ogImage, 'property');
      this.setMetaTag('og:image:alt', metadata.title, 'property');
      this.setMetaTag('og:image:width', '1200', 'property');
      this.setMetaTag('og:image:height', '630', 'property');
    }

    // Twitter Card tags
    this.setMetaTag('twitter:card', metadata.twitterCard || 'summary_large_image');
    this.setMetaTag('twitter:title', metadata.title);
    this.setMetaTag('twitter:description', metadata.description);
    if (metadata.ogImage) {
      this.setMetaTag('twitter:image', metadata.ogImage);
    }

    // Canonical URL
    if (metadata.canonicalUrl) {
      this.setCanonicalUrl(metadata.canonicalUrl);
    }

    // Page title
    document.title = metadata.title;

    // Language alternates
    if (metadata.alternateLanguages) {
      metadata.alternateLanguages.forEach(alt => {
        this.setAlternateLanguage(alt.lang, alt.url);
      });
    }

    // Article specific tags
    if (metadata.publishedTime) {
      this.setMetaTag('article:published_time', metadata.publishedTime, 'property');
    }
    if (metadata.modifiedTime) {
      this.setMetaTag('article:modified_time', metadata.modifiedTime, 'property');
    }
  }

  /**
   * Generate structured data for products
   */
  public generateProductStructuredData(product: ProductSEO): StructuredData {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      category: product.category,
      inLanguage: 'pt-BR'
    };

    // Add price information if available
    if (product.price) {
      Object.assign(structuredData, {
        offers: {
          '@type': 'Offer',
          price: product.price.value,
          priceCurrency: product.price.currency,
          availability: `https://schema.org/${product.availability || 'InStock'}`,
          url: typeof window !== 'undefined' ? window.location.href : '',
          validFrom: new Date().toISOString()
        }
      });
    }

    // Add SKU if available
    if (product.sku) {
      Object.assign(structuredData, { sku: product.sku });
    }

    // Add reviews if available
    if (product.reviews) {
      Object.assign(structuredData, {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.reviews.rating,
          reviewCount: product.reviews.reviewCount,
          bestRating: 5,
          worstRating: 1
        }
      });
    }

    return {
      type: 'Product',
      data: structuredData
    };
  }

  /**
   * Generate breadcrumb structured data
   */
  public generateBreadcrumbStructuredData(items: BreadcrumbItem[]): StructuredData {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    return {
      type: 'BreadcrumbList',
      data: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map(item => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
        }))
      }
    };
  }

  /**
   * Generate FAQ structured data
   */
  public generateFAQStructuredData(faqs: FAQItem[]): StructuredData {
    return {
      type: 'FAQ',
      data: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    };
  }

  /**
   * Generate local business structured data
   */
  public generateLocalBusinessStructuredData(): StructuredData {
    return {
      type: 'LocalBusiness',
      data: {
        ...this.organizationData,
        '@type': 'LocalBusiness',
        priceRange: 'R$ 39,90 - R$ 249,00',
        paymentAccepted: 'PIX, Credit Card, Bank Transfer',
        currenciesAccepted: 'BRL',
        openingHours: 'Mo-Fr 09:00-18:00',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -22.9068,
          longitude: -43.1729
        }
      }
    };
  }

  /**
   * Insert structured data into page head
   */
  public insertStructuredData(structuredData: StructuredData | StructuredData[]): void {
    if (typeof document === 'undefined') return;

    const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];

    dataArray.forEach((data, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${data.type.toLowerCase()}-${index}`;
      script.textContent = JSON.stringify(data.data, null, 2);

      // Remove existing script with same ID
      const existing = document.getElementById(script.id);
      if (existing) {
        existing.remove();
      }

      document.head.appendChild(script);
    });
  }

  /**
   * Generate meta tags for specific pages
   */
  public getPageMetadata(page: string): Partial<SEOMetadata> {
    const pageMetadata: Record<string, Partial<SEOMetadata>> = {
      home: {
        title: 'Vendas.IA - Automação Inteligente para Vendas no Brasil',
        description: 'Transforme suas vendas com IA. Disparo Rápido WhatsApp, automação de marketing e soluções personalizadas para empresas brasileiras.',
        keywords: ['vendas com ia', 'automação whatsapp', 'disparo rápido', 'marketing digital brasil']
      },
      'disparo-rapido': {
        title: 'Disparo Rápido WhatsApp - Automação de Mensagens em Massa | Vendas.IA',
        description: 'Extensão Chrome para disparos automáticos no WhatsApp. Envios ilimitados, importação de contatos e intervalos seguros. Teste 10 disparos grátis!',
        keywords: ['disparo rápido whatsapp', 'automação whatsapp', 'mensagens em massa', 'whatsapp business', 'extensão chrome']
      },
      contact: {
        title: 'Contato - Vendas.IA | Automação Inteligente para Vendas',
        description: 'Entre em contato com a Vendas.IA. WhatsApp, e-mail ou telefone. Consultoria gratuita em automação de vendas para seu negócio.',
        keywords: ['contato vendas.ia', 'consultoria vendas', 'suporte whatsapp', 'johnny vaz']
      },
      about: {
        title: 'Sobre a Vendas.IA - Especialista em Automação de Vendas',
        description: 'Conheça a história da Vendas.IA e como ajudamos empresas brasileiras a automatizar vendas com inteligência artificial.',
        keywords: ['sobre vendas.ia', 'automação vendas brasil', 'história empresa', 'johnny vaz vendas']
      }
    };

    return pageMetadata[page] || {};
  }

  /**
   * Generate sitemap data
   */
  public generateSitemapData(): Array<{
    url: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  }> {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vendas.ia.br';
    const now = new Date().toISOString();

    return [
      {
        url: baseUrl,
        lastmod: now,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        url: `${baseUrl}/disparo-rapido`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        url: `${baseUrl}/contato`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/sobre`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.6
      }
    ];
  }

  /**
   * Private helper methods
   */
  private setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    if (typeof document === 'undefined') return;

    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }

    meta.content = content;
  }

  private setCanonicalUrl(url: string): void {
    if (typeof document === 'undefined') return;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }

    link.href = url;
  }

  private setAlternateLanguage(lang: string, url: string): void {
    if (typeof document === 'undefined') return;

    let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      document.head.appendChild(link);
    }

    link.href = url;
  }
}

// SEO data for common FAQ
export const vendaisIAFAQ: FAQItem[] = [
  {
    question: 'O que é a Vendas.IA?',
    answer: 'A Vendas.IA é uma empresa especializada em automação inteligente para vendas, oferecendo soluções como o Disparo Rápido para WhatsApp e outras ferramentas de marketing digital para empresas brasileiras.'
  },
  {
    question: 'O Disparo Rápido é seguro?',
    answer: 'Sim, o Disparo Rápido foi desenvolvido com foco na segurança. Utilizamos intervalos personalizáveis entre disparos e melhores práticas para reduzir riscos de bloqueio no WhatsApp.'
  },
  {
    question: 'Posso testar antes de comprar?',
    answer: 'Sim! Oferecemos até 10 disparos gratuitos para você testar a ferramenta antes de assinar qualquer plano.'
  },
  {
    question: 'Como funciona a garantia?',
    answer: 'Oferecemos 7 dias de garantia total. Se não ficar satisfeito, pode cancelar sem burocracia e receber seu dinheiro de volta.'
  },
  {
    question: 'O suporte está incluído?',
    answer: 'Sim, oferecemos suporte completo via WhatsApp (+55 16 99778-7674) e e-mail (contato@johnnyvaz.com.br) para todos os nossos clientes.'
  }
];

// Global SEO manager instance
export const seoManager = new SEOManager();

export default seoManager;