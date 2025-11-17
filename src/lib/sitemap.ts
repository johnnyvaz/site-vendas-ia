/**
 * Sitemap Generation for Vendas.IA
 * Creates XML sitemaps optimized for Brazilian search engines
 * Includes dynamic content and proper priority/frequency settings
 */

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export interface SitemapIndex {
  sitemap: string;
  lastmod: string;
}

class SitemapGenerator {
  private baseUrl: string;
  private defaultChangefreq: SitemapURL['changefreq'] = 'monthly';
  private defaultPriority: number = 0.5;

  constructor(baseUrl: string = 'https://vendas.ia.br') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Generate main sitemap with all static pages
   */
  public generateMainSitemap(): SitemapURL[] {
    const now = new Date().toISOString();

    return [
      {
        loc: this.baseUrl,
        lastmod: now,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: `${this.baseUrl}/disparo-rapido`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        loc: `${this.baseUrl}/contato`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${this.baseUrl}/sobre`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.6
      },
      {
        loc: `${this.baseUrl}/politica-privacidade`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${this.baseUrl}/termos-uso`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      },
      {
        loc: `${this.baseUrl}/faq`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      }
    ];
  }

  /**
   * Generate product sitemap
   */
  public generateProductSitemap(): SitemapURL[] {
    const now = new Date().toISOString();

    const products = [
      {
        slug: 'disparo-rapido',
        name: 'Disparo Rápido WhatsApp',
        priority: 0.9,
        changefreq: 'monthly' as const
      },
      {
        slug: 'leads-rapido',
        name: 'Leads Rápido',
        priority: 0.8,
        changefreq: 'monthly' as const
      },
      {
        slug: 'sdr-virtual',
        name: 'SDR Virtual',
        priority: 0.8,
        changefreq: 'monthly' as const
      },
      {
        slug: 'consultoria-personalizada',
        name: 'Consultoria Personalizada',
        priority: 0.7,
        changefreq: 'monthly' as const
      }
    ];

    return products.map(product => ({
      loc: `${this.baseUrl}/produtos/${product.slug}`,
      lastmod: now,
      changefreq: product.changefreq,
      priority: product.priority
    }));
  }

  /**
   * Generate blog sitemap (if blog exists)
   */
  public generateBlogSitemap(posts: Array<{
    slug: string;
    publishedAt: string;
    updatedAt?: string;
    priority?: number;
  }> = []): SitemapURL[] {
    return [
      // Blog index
      {
        loc: `${this.baseUrl}/blog`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      },
      // Blog posts
      ...posts.map(post => ({
        loc: `${this.baseUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt || post.publishedAt,
        changefreq: 'monthly' as const,
        priority: post.priority || 0.6
      }))
    ];
  }

  /**
   * Generate resources sitemap
   */
  public generateResourcesSitemap(): SitemapURL[] {
    const now = new Date().toISOString();

    const resources = [
      {
        path: '/recursos/calculadora-roi',
        priority: 0.7,
        changefreq: 'monthly' as const
      },
      {
        path: '/recursos/templates-whatsapp',
        priority: 0.6,
        changefreq: 'monthly' as const
      },
      {
        path: '/recursos/guia-whatsapp-business',
        priority: 0.6,
        changefreq: 'quarterly' as const
      },
      {
        path: '/recursos/case-studies',
        priority: 0.6,
        changefreq: 'monthly' as const
      },
      {
        path: '/recursos/webinars',
        priority: 0.5,
        changefreq: 'monthly' as const
      }
    ];

    return resources.map(resource => ({
      loc: `${this.baseUrl}${resource.path}`,
      lastmod: now,
      changefreq: resource.changefreq,
      priority: resource.priority
    }));
  }

  /**
   * Convert sitemap URLs to XML format
   */
  public generateSitemapXML(urls: SitemapURL[]): string {
    const urlsetXML = urls.map(url => {
      let urlXML = `  <url>
    <loc>${this.escapeXML(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>`;

      // Add alternate language versions if available
      if (url.alternates && url.alternates.length > 0) {
        url.alternates.forEach(alt => {
          urlXML += `
    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${this.escapeXML(alt.href)}" />`;
        });
      }

      urlXML += `
  </url>`;

      return urlXML;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsetXML}
</urlset>`;
  }

  /**
   * Generate sitemap index XML
   */
  public generateSitemapIndexXML(sitemaps: SitemapIndex[]): string {
    const sitemapXML = sitemaps.map(sitemap => `  <sitemap>
    <loc>${this.escapeXML(sitemap.sitemap)}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapXML}
</sitemapindex>`;
  }

  /**
   * Generate complete sitemap structure
   */
  public generateCompleteSitemap(): {
    main: string;
    products: string;
    blog: string;
    resources: string;
    index: string;
  } {
    const now = new Date().toISOString();

    // Generate individual sitemaps
    const mainUrls = this.generateMainSitemap();
    const productUrls = this.generateProductSitemap();
    const blogUrls = this.generateBlogSitemap();
    const resourceUrls = this.generateResourcesSitemap();

    // Create sitemap index
    const sitemapIndex: SitemapIndex[] = [
      {
        sitemap: `${this.baseUrl}/sitemap-main.xml`,
        lastmod: now
      },
      {
        sitemap: `${this.baseUrl}/sitemap-products.xml`,
        lastmod: now
      },
      {
        sitemap: `${this.baseUrl}/sitemap-blog.xml`,
        lastmod: now
      },
      {
        sitemap: `${this.baseUrl}/sitemap-resources.xml`,
        lastmod: now
      }
    ];

    return {
      main: this.generateSitemapXML(mainUrls),
      products: this.generateSitemapXML(productUrls),
      blog: this.generateSitemapXML(blogUrls),
      resources: this.generateSitemapXML(resourceUrls),
      index: this.generateSitemapIndexXML(sitemapIndex)
    };
  }

  /**
   * Generate robots.txt content
   */
  public generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-main.xml
Sitemap: ${this.baseUrl}/sitemap-products.xml
Sitemap: ${this.baseUrl}/sitemap-blog.xml
Sitemap: ${this.baseUrl}/sitemap-resources.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*fbclid*
Disallow: /*?*gclid*

# Allow important resources
Allow: /api/og-image/*
Allow: /images/
Allow: /assets/

# Crawl delay for respectful crawling
Crawl-delay: 1

# Special rules for different bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: facebookexternalhit/*
Allow: /
Crawl-delay: 0`;
  }

  /**
   * Generate structured sitemap data for n8n integration
   */
  public generateSitemapData(): Array<{
    url: string;
    title: string;
    description: string;
    keywords: string[];
    priority: number;
    changefreq: string;
    lastmod: string;
    category: string;
  }> {
    const now = new Date().toISOString();

    return [
      {
        url: this.baseUrl,
        title: 'Vendas.IA - Automação Inteligente para Vendas no Brasil',
        description: 'Transforme suas vendas com IA. Disparo Rápido WhatsApp, automação de marketing e soluções personalizadas para empresas brasileiras.',
        keywords: ['vendas ia', 'automação whatsapp', 'disparo rápido', 'marketing digital brasil'],
        priority: 1.0,
        changefreq: 'weekly',
        lastmod: now,
        category: 'homepage'
      },
      {
        url: `${this.baseUrl}/disparo-rapido`,
        title: 'Disparo Rápido WhatsApp - Automação de Mensagens em Massa',
        description: 'Extensão Chrome para disparos automáticos no WhatsApp. Envios ilimitados, importação de contatos e intervalos seguros.',
        keywords: ['disparo rápido', 'whatsapp automação', 'mensagens massa', 'extensão chrome'],
        priority: 0.9,
        changefreq: 'monthly',
        lastmod: now,
        category: 'product'
      },
      {
        url: `${this.baseUrl}/contato`,
        title: 'Contato - Vendas.IA | Consultoria Gratuita',
        description: 'Entre em contato com a Vendas.IA. Consultoria gratuita em automação de vendas para seu negócio.',
        keywords: ['contato vendas.ia', 'consultoria vendas', 'suporte whatsapp'],
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: now,
        category: 'contact'
      },
      {
        url: `${this.baseUrl}/sobre`,
        title: 'Sobre a Vendas.IA - Especialista em Automação de Vendas',
        description: 'Conheça a história da Vendas.IA e como ajudamos empresas brasileiras a automatizar vendas com IA.',
        keywords: ['sobre vendas.ia', 'automação vendas brasil', 'johnny vaz'],
        priority: 0.6,
        changefreq: 'yearly',
        lastmod: now,
        category: 'about'
      }
    ];
  }

  /**
   * Generate JSON-LD sitemap for rich snippets
   */
  public generateJSONLDSitemap(): any {
    const sitemapData = this.generateSitemapData();

    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Vendas.IA',
      'url': this.baseUrl,
      'description': 'Automação inteligente para vendas no Brasil',
      'inLanguage': 'pt-BR',
      'mainEntity': sitemapData.map(page => ({
        '@type': 'WebPage',
        'name': page.title,
        'description': page.description,
        'url': page.url,
        'keywords': page.keywords.join(', '),
        'dateModified': page.lastmod,
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'Vendas.IA',
          'url': this.baseUrl
        }
      }))
    };
  }

  /**
   * Save sitemaps to public directory (for build process)
   */
  public async saveSitemaps(outputDir: string = './public'): Promise<void> {
    const sitemaps = this.generateCompleteSitemap();
    const robotsTxt = this.generateRobotsTxt();

    try {
      // In a real implementation, you would write these files to disk
      // For now, we'll just log them for verification
      console.log('Generated sitemaps:');
      console.log('- sitemap.xml (index)');
      console.log('- sitemap-main.xml');
      console.log('- sitemap-products.xml');
      console.log('- sitemap-blog.xml');
      console.log('- sitemap-resources.xml');
      console.log('- robots.txt');

      // Store for potential API endpoints
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('generated-sitemaps', JSON.stringify({
          index: sitemaps.index,
          main: sitemaps.main,
          products: sitemaps.products,
          blog: sitemaps.blog,
          resources: sitemaps.resources,
          robots: robotsTxt
        }));
      }
    } catch (error) {
      console.error('Failed to save sitemaps:', error);
    }
  }

  /**
   * Validate URL for sitemap inclusion
   */
  public isValidSitemapURL(url: string): boolean {
    try {
      const urlObj = new URL(url);

      // Must be same origin
      if (urlObj.origin !== this.baseUrl) return false;

      // Must be HTTP/HTTPS
      if (!['http:', 'https:'].includes(urlObj.protocol)) return false;

      // Exclude certain paths
      const excludedPaths = ['/admin', '/api', '/private', '/.well-known'];
      if (excludedPaths.some(path => urlObj.pathname.startsWith(path))) return false;

      // Exclude query parameters we don't want indexed
      const excludedParams = ['utm_', 'fbclid', 'gclid', 'debug', 'preview'];
      const hasExcludedParams = excludedParams.some(param =>
        Array.from(urlObj.searchParams.keys()).some(key => key.startsWith(param))
      );

      return !hasExcludedParams;
    } catch {
      return false;
    }
  }

  /**
   * Escape XML special characters
   */
  private escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Set base URL for the sitemap
   */
  public setBaseURL(url: string): void {
    this.baseUrl = url.replace(/\/$/, '');
  }

  /**
   * Get current base URL
   */
  public getBaseURL(): string {
    return this.baseUrl;
  }
}

// Export sitemap generator instance
export const sitemapGenerator = new SitemapGenerator();

// Export for API routes or build scripts
export function generateSitemapForBuild(): {
  xml: string;
  urls: SitemapURL[];
  robotsTxt: string;
} {
  const urls = [
    ...sitemapGenerator.generateMainSitemap(),
    ...sitemapGenerator.generateProductSitemap(),
    ...sitemapGenerator.generateResourcesSitemap()
  ];

  return {
    xml: sitemapGenerator.generateSitemapXML(urls),
    urls,
    robotsTxt: sitemapGenerator.generateRobotsTxt()
  };
}

export default sitemapGenerator;