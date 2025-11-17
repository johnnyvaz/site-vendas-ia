// Product Showcase Component for Vendas.IA
// Displays AI product portfolio with Brazilian market focus

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Zap,
  Bot,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Star,
  Building,
  Rocket,
  BarChart3,
  MessageSquare,
} from 'lucide-react';
import { ProductCard, ProductCardFeatured } from './ProductCard';
import { WhatsAppButton } from './WhatsAppButton';
import type { Product, ProductCategory, EcosystemPosition } from '@/types/products';
import { formatBrazilianPrice } from '@/types/products';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ProductShowcaseProps {
  products: Product[];
  featuredProductId?: string;
  showEcosystemFlow?: boolean;
  showComparison?: boolean;
  compactMode?: boolean;
  maxProducts?: number;
  className?: string;
}

// Mock product data for demonstration
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'leads-rapido',
    name: 'Leads Rápido',
    slug: 'leads-rapido',
    tagline: 'Geração de leads qualificados com IA',
    description: 'Automatize a captação de leads qualificados usando inteligência artificial avançada e direcionamento preciso para o mercado brasileiro.',
    category: 'lead-generation',
    status: 'available',
    ecosystemPosition: 'capture',
    features: [
      {
        id: 'auto-qualify',
        icon: 'target',
        title: 'Qualificação Automática',
        description: 'IA avalia leads automaticamente usando critérios brasileiros',
        highlight: true,
        metrics: '95% precisão',
        category: 'automation',
        technicalSpecs: [],
      },
      {
        id: 'brazil-data',
        icon: 'database',
        title: 'Base de Dados Nacional',
        description: 'Acesso a milhões de empresas brasileiras verificadas',
        highlight: true,
        metrics: '50M+ empresas',
        category: 'integration',
        technicalSpecs: [],
      },
    ],
    benefits: [
      {
        metric: '300%',
        description: 'Aumento na geração de leads qualificados',
        timeframe: 'primeiros 30 dias',
        proofType: 'case-study',
        industry: 'tecnologia',
      },
    ],
    pricing: {
      startingPrice: 497,
      currency: 'BRL',
      billingCycle: 'monthly',
      paymentMethods: ['pix', 'boleto', 'cartao'],
      pricingModel: 'tiered',
      roi: {
        averageROI: '450%',
        paybackPeriod: '2 meses',
      },
    },
    metrics: {
      performanceMetrics: [
        { name: 'Taxa Conversão', value: '23%', trend: 'increasing', lastUpdated: '2024-01-15' },
        { name: 'Leads/Mês', value: '1.2k', trend: 'increasing', lastUpdated: '2024-01-15' },
      ],
      usageStats: [],
      customerSatisfaction: [],
      marketPosition: {
        competitorComparison: [],
        uniqueAdvantages: [],
      },
    },
    integrations: [],
    targetAudience: [
      {
        segment: 'smb',
        companySize: ['11-50'],
        industries: ['tecnologia', 'servicos-financeiros'],
        roles: ['head-vendas', 'diretor-comercial'],
        painPoints: ['baixa geração de leads', 'leads não qualificados'],
        useCases: [],
        priorityLevel: 'primary',
      },
    ],
    complianceFeatures: [],
    media: {
      logo: '',
      icon: '',
      screenshots: [],
      videos: [],
      documents: [],
      badges: [],
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      structuredData: { type: 'Product', properties: {} },
      localSEO: { targetCities: [], businessCategory: '', serviceArea: [] },
      content: { faqItems: [], howItWorks: [], comparisons: [] },
    },
  },
  {
    id: 'disparo-rapido',
    name: 'Disparo Rápido',
    slug: 'disparo-rapido',
    tagline: 'Automação de WhatsApp para empresas',
    description: 'Automatize suas campanhas de WhatsApp Business com IA, respeitando as regras brasileiras e maximizando o engajamento.',
    category: 'automation',
    status: 'available',
    ecosystemPosition: 'engage',
    features: [
      {
        id: 'whatsapp-automation',
        icon: 'message-square',
        title: 'Automação WhatsApp',
        description: 'Envios automáticos respeitando limites do WhatsApp Business',
        highlight: true,
        metrics: '10k msgs/dia',
        category: 'automation',
        technicalSpecs: [],
      },
    ],
    benefits: [
      {
        metric: '85%',
        description: 'Taxa de abertura de mensagens',
        timeframe: 'média mensal',
        proofType: 'benchmark',
      },
    ],
    pricing: {
      startingPrice: 297,
      currency: 'BRL',
      billingCycle: 'monthly',
      paymentMethods: ['pix', 'boleto', 'cartao'],
      pricingModel: 'usage-based',
      roi: {
        averageROI: '320%',
        paybackPeriod: '45 dias',
      },
    },
    metrics: {
      performanceMetrics: [
        { name: 'Taxa Entrega', value: '98%', trend: 'stable', lastUpdated: '2024-01-15' },
      ],
      usageStats: [],
      customerSatisfaction: [],
      marketPosition: {
        competitorComparison: [],
        uniqueAdvantages: [],
      },
    },
    integrations: [],
    targetAudience: [
      {
        segment: 'smb',
        companySize: ['1-10', '11-50'],
        industries: ['varejo', 'marketing'],
        roles: ['head-marketing', 'coordenador-marketing'],
        painPoints: ['baixo engajamento', 'processo manual'],
        useCases: [],
        priorityLevel: 'primary',
      },
    ],
    complianceFeatures: [],
    media: {
      logo: '',
      icon: '',
      screenshots: [],
      videos: [],
      documents: [],
      badges: [],
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      structuredData: { type: 'Product', properties: {} },
      localSEO: { targetCities: [], businessCategory: '', serviceArea: [] },
      content: { faqItems: [], howItWorks: [], comparisons: [] },
    },
  },
  {
    id: 'sdr-virtual',
    name: 'SDR Virtual',
    slug: 'sdr-virtual',
    tagline: 'Agente de vendas com inteligência artificial',
    description: 'SDR virtual que qualifica leads, agenda reuniões e nutre prospects 24/7 com inteligência artificial avançada.',
    category: 'ai-agent',
    status: 'coming-soon',
    ecosystemPosition: 'convert',
    features: [
      {
        id: 'ai-conversations',
        icon: 'bot',
        title: 'Conversas Naturais',
        description: 'IA conversa naturalmente em português brasileiro',
        highlight: true,
        metrics: '24/7 disponível',
        category: 'automation',
        technicalSpecs: [],
      },
    ],
    benefits: [
      {
        metric: '60%',
        description: 'Redução no tempo de qualificação',
        timeframe: 'processo completo',
        proofType: 'estimate',
      },
    ],
    pricing: {
      startingPrice: 897,
      currency: 'BRL',
      billingCycle: 'monthly',
      paymentMethods: ['pix', 'boleto', 'cartao'],
      pricingModel: 'tiered',
      roi: {
        averageROI: '280%',
        paybackPeriod: '3 meses',
      },
    },
    metrics: {
      performanceMetrics: [],
      usageStats: [],
      customerSatisfaction: [],
      marketPosition: {
        competitorComparison: [],
        uniqueAdvantages: [],
      },
    },
    integrations: [],
    targetAudience: [
      {
        segment: 'mid-market',
        companySize: ['51-200'],
        industries: ['tecnologia', 'servicos-financeiros'],
        roles: ['head-vendas', 'diretor-comercial'],
        painPoints: ['time de vendas sobrecarregado', 'leads mal qualificados'],
        useCases: [],
        priorityLevel: 'primary',
      },
    ],
    complianceFeatures: [],
    media: {
      logo: '',
      icon: '',
      screenshots: [],
      videos: [],
      documents: [],
      badges: [],
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      structuredData: { type: 'Product', properties: {} },
      localSEO: { targetCities: [], businessCategory: '', serviceArea: [] },
      content: { faqItems: [], howItWorks: [], comparisons: [] },
    },
  },
];

const CATEGORY_CONFIG = {
  'lead-generation': {
    title: 'Geração de Leads',
    description: 'Capture leads qualificados automaticamente',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  'automation': {
    title: 'Automação',
    description: 'Automatize processos de vendas e marketing',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  'ai-agent': {
    title: 'Agentes de IA',
    description: 'Assistentes virtuais inteligentes',
    icon: Bot,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  'custom-solution': {
    title: 'Soluções Personalizadas',
    description: 'Desenvolvimento sob medida',
    icon: Sparkles,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
} as const;

export function ProductShowcase({
  products = SAMPLE_PRODUCTS,
  featuredProductId = 'leads-rapido',
  showEcosystemFlow = true,
  showComparison = true,
  compactMode = false,
  maxProducts,
  className = '',
}: ProductShowcaseProps) {
  const { trackEvent } = useAnalytics();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'ecosystem'>('grid');

  const displayProducts = maxProducts ? products.slice(0, maxProducts) : products;
  const featuredProduct = products.find(p => p.id === featuredProductId);

  const filteredProducts = activeCategory === 'all'
    ? displayProducts
    : displayProducts.filter(p => p.category === activeCategory);

  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    trackEvent('section_view', {
      sectionName: 'product_showcase',
      productCount: displayProducts.length,
      viewMode,
      activeCategory,
    });
  }, [trackEvent, displayProducts.length, viewMode, activeCategory]);

  const handleCategoryChange = (category: ProductCategory | 'all') => {
    setActiveCategory(category);
    trackEvent('product_interest', {
      action: 'category_filter',
      category: category,
      resultCount: category === 'all' ? products.length : products.filter(p => p.category === category).length,
    });
  };

  const handleProductClick = (productId: string, action: 'whatsapp' | 'demo' | 'info') => {
    trackEvent('cta_click', {
      productId,
      action,
      source: 'product_showcase',
      category: activeCategory,
    });
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Rocket className="h-8 w-8 text-orange-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Soluções de IA para Vendas
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Potencialize seu negócio com nossa suíte completa de ferramentas de inteligência artificial
            desenvolvidas especialmente para o mercado brasileiro.
          </p>
        </div>

        {/* Featured Product */}
        {featuredProduct && !compactMode && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge className="bg-orange-100 text-orange-800 mb-4">
                <Star className="h-4 w-4 mr-1" />
                Produto em Destaque
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900">
                Mais Escolhido pelas Empresas Brasileiras
              </h3>
            </div>
            <div className="max-w-4xl mx-auto">
              <ProductCardFeatured
                product={featuredProduct}
                onCTAClick={handleProductClick}
                className="shadow-xl"
              />
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={(value) => handleCategoryChange(value as ProductCategory | 'all')}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                <Building className="h-4 w-4 mr-2" />
                Todos
              </TabsTrigger>
              {categories.map((category) => {
                const config = CATEGORY_CONFIG[category];
                const CategoryIcon = config.icon;
                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                  >
                    <CategoryIcon className="h-4 w-4 mr-2" />
                    {config.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Category Content */}
            <TabsContent value={activeCategory} className="mt-8">
              {activeCategory !== 'all' && (
                <div className="mb-8">
                  <Card className={`${CATEGORY_CONFIG[activeCategory as ProductCategory]?.bgColor} ${CATEGORY_CONFIG[activeCategory as ProductCategory]?.borderColor}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {(() => {
                          const config = CATEGORY_CONFIG[activeCategory as ProductCategory];
                          const Icon = config?.icon;
                          return Icon ? <Icon className={`h-6 w-6 ${config.color}`} /> : null;
                        })()}
                        <span>{CATEGORY_CONFIG[activeCategory as ProductCategory]?.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {CATEGORY_CONFIG[activeCategory as ProductCategory]?.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              )}

              {/* Products Grid */}
              <div className={`
                grid gap-6
                ${compactMode ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
              `}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    compact={compactMode}
                    onCTAClick={handleProductClick}
                    className="h-full"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Ecosystem Flow */}
        {showEcosystemFlow && !compactMode && (
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-900">
                  <BarChart3 className="h-6 w-6" />
                  <span>Ecossistema Completo de Vendas</span>
                </CardTitle>
                <CardDescription className="text-orange-700">
                  Veja como nossos produtos se integram para criar um funil de vendas completo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EcosystemFlow products={products} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* ROI Calculator */}
        {showComparison && !compactMode && (
          <div className="mt-16">
            <ROIComparison products={filteredProducts} />
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gray-900 text-white">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para Transformar suas Vendas?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Fale com nossos especialistas e descubra qual solução é ideal para sua empresa.
                Atendemos empresas de todos os tamanhos no Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppButton
                  template="GENERAL_INQUIRY"
                  trackingParams={{
                    source: 'product_showcase',
                    medium: 'website',
                    campaign: 'cta_section',
                    content: 'main_cta',
                  }}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                />
                <Button variant="outline" size="lg" className="text-gray-900 border-gray-300">
                  <Target className="h-4 w-4 mr-2" />
                  Agendar Demonstração
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Ecosystem Flow Component
function EcosystemFlow({ products }: { products: Product[] }) {
  const flowSteps = ['capture', 'engage', 'convert', 'analyze'] as const;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {flowSteps.map((step, index) => {
          const stepProducts = products.filter(p => p.ecosystemPosition === step);
          const stepIcons = {
            capture: Users,
            engage: MessageSquare,
            convert: Target,
            analyze: BarChart3,
          };
          const StepIcon = stepIcons[step];

          return (
            <div key={step} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <StepIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                  {step === 'capture' ? 'Capturar' :
                   step === 'engage' ? 'Engajar' :
                   step === 'convert' ? 'Converter' : 'Analisar'}
                </h4>
                <div className="space-y-1">
                  {stepProducts.map(product => (
                    <Badge key={product.id} variant="outline" className="text-xs">
                      {product.name}
                    </Badge>
                  ))}
                </div>
              </div>
              {index < flowSteps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-2 h-6 w-6 text-orange-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ROI Comparison Component
function ROIComparison({ products }: { products: Product[] }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id));
  const totalInvestment = selectedProductsData.reduce((sum, p) => sum + p.pricing.startingPrice, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <span>Calculadora de ROI</span>
        </CardTitle>
        <CardDescription>
          Selecione os produtos e veja o retorno estimado do seu investimento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Selecione os Produtos:</h4>
            <div className="space-y-2">
              {products.filter(p => p.status === 'available').map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatBrazilianPrice(product.pricing.startingPrice)}/mês
                      </p>
                    </div>
                  </div>
                  {product.pricing.roi && (
                    <Badge variant="secondary">
                      {product.pricing.roi.averageROI} ROI
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Projeção de Retorno:</h4>
            {selectedProducts.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Investimento Mensal:</span>
                    <span className="font-bold">{formatBrazilianPrice(totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>ROI Médio Estimado:</span>
                    <span className="font-bold text-green-600">350%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retorno em 12 meses:</span>
                    <span className="font-bold text-green-600">
                      {formatBrazilianPrice(totalInvestment * 12 * 3.5)}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>* Valores baseados na média dos nossos clientes brasileiros</p>
                  <p>* ROI pode variar conforme implementação e mercado</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecione produtos para ver a projeção de ROI</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductShowcase;