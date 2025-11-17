// Product Portfolio Types for Vendas.IA
// Defines the structure for AI business solutions ecosystem

// Main product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  ecosystemPosition: EcosystemPosition;
  features: ProductFeature[];
  benefits: ProductBenefit[];
  pricing: PricingInfo;
  metrics: ProductMetrics;
  integrations: Integration[];
  targetAudience: TargetAudience[];
  complianceFeatures: ComplianceFeature[];
  media: ProductMedia;
  seo: ProductSEO;
}

// Product categories for ecosystem organization
export type ProductCategory = 'lead-generation' | 'automation' | 'ai-agent' | 'custom-solution';

// Product development and availability status
export type ProductStatus = 'available' | 'coming-soon' | 'beta' | 'deprecated';

// Position in the sales ecosystem workflow
export type EcosystemPosition = 'capture' | 'engage' | 'convert' | 'analyze' | 'integrate';

// Individual product features
export interface ProductFeature {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  highlight: boolean;
  metrics?: string;
  category: FeatureCategory;
  technicalSpecs?: TechnicalSpec[];
  usageExample?: string;
  relatedFeatures?: string[];
}

export type FeatureCategory =
  | 'automation'
  | 'analytics'
  | 'integration'
  | 'compliance'
  | 'performance'
  | 'usability';

// Technical specifications for features
export interface TechnicalSpec {
  name: string;
  value: string;
  unit?: string;
  description?: string;
}

// Business benefits with measurable outcomes
export interface ProductBenefit {
  metric: string; // e.g., "300%", "< 2 hours", "95%"
  description: string;
  timeframe: string;
  proofType: ProofType;
  caseStudy?: CaseStudyReference;
  industry?: string;
  companySize?: string;
}

export type ProofType = 'case-study' | 'benchmark' | 'guarantee' | 'estimate';

// Case study reference for social proof
export interface CaseStudyReference {
  id: string;
  customerName?: string;
  company?: string;
  industry: string;
  results: string;
  quote?: string;
  timeframe: string;
  verified: boolean;
}

// Pricing structure optimized for Brazilian market
export interface PricingInfo {
  startingPrice: number;
  currency: 'BRL';
  billingCycle: BillingCycle;
  paymentMethods: PaymentMethod[];
  pricingModel: PricingModel;
  discountInfo?: DiscountInfo;
  freeTier?: FreeTierInfo;
  enterprise?: EnterpriseInfo;
  roi: ROIInfo;
}

export type BillingCycle = 'monthly' | 'quarterly' | 'annually' | 'one-time';

export type PaymentMethod = 'pix' | 'boleto' | 'cartao' | 'transferencia';

export type PricingModel = 'fixed' | 'usage-based' | 'tiered' | 'custom';

export interface DiscountInfo {
  type: 'percentage' | 'fixed-amount';
  value: number;
  condition: string;
  validUntil?: string;
  minPurchase?: number;
}

export interface FreeTierInfo {
  available: boolean;
  limitations: string[];
  duration?: number; // days
  upgradeIncentives: string[];
}

export interface EnterpriseInfo {
  available: boolean;
  customPricing: boolean;
  minimumCommitment?: number;
  features: string[];
  support: string[];
}

export interface ROIInfo {
  averageROI: string;
  paybackPeriod: string;
  calculator?: boolean;
  guarantees?: string[];
}

// Product performance metrics
export interface ProductMetrics {
  performanceMetrics: PerformanceMetric[];
  usageStats: UsageStatistic[];
  customerSatisfaction: SatisfactionMetric[];
  marketPosition: MarketPosition;
}

export interface PerformanceMetric {
  name: string;
  value: string;
  comparison?: string; // vs industry average
  trend: 'increasing' | 'stable' | 'decreasing';
  lastUpdated: string;
}

export interface UsageStatistic {
  metric: string;
  value: string;
  period: string;
  context?: string;
}

export interface SatisfactionMetric {
  type: 'nps' | 'csat' | 'retention' | 'churn';
  score: number;
  benchmark?: number;
  sampleSize?: number;
}

export interface MarketPosition {
  marketShare?: string;
  competitorComparison: CompetitorComparison[];
  uniqueAdvantages: string[];
  awards?: Award[];
}

export interface CompetitorComparison {
  competitor: string;
  advantage: string;
  metric?: string;
  verified: boolean;
}

export interface Award {
  name: string;
  organization: string;
  year: number;
  category?: string;
}

// Integration capabilities
export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  category: IntegrationCategory;
  status: IntegrationStatus;
  setupComplexity: SetupComplexity;
  documentation: string;
  supportLevel: SupportLevel;
  pricing?: IntegrationPricing;
}

export type IntegrationType = 'api' | 'webhook' | 'native' | 'zapier' | 'custom';

export type IntegrationCategory = 'crm' | 'email' | 'analytics' | 'communication' | 'automation';

export type IntegrationStatus = 'available' | 'beta' | 'planned' | 'deprecated';

export type SetupComplexity = 'simple' | 'moderate' | 'complex';

export type SupportLevel = 'basic' | 'standard' | 'premium' | 'enterprise';

export interface IntegrationPricing {
  included: boolean;
  additionalCost?: number;
  volumeLimits?: string;
}

// Target audience segmentation
export interface TargetAudience {
  segment: AudienceSegment;
  companySize: CompanySize[];
  industries: Industry[];
  roles: JobRole[];
  painPoints: string[];
  useCases: UseCase[];
  priorityLevel: 'primary' | 'secondary' | 'tertiary';
}

export type AudienceSegment = 'startup' | 'smb' | 'mid-market' | 'enterprise';

export type CompanySize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';

export type Industry =
  | 'tecnologia'
  | 'servicos-financeiros'
  | 'saude'
  | 'educacao'
  | 'varejo'
  | 'manufatura'
  | 'consultoria'
  | 'imobiliario'
  | 'marketing'
  | 'agronegocio'
  | 'logistica'
  | 'outros';

export type JobRole =
  | 'ceo'
  | 'cto'
  | 'head-vendas'
  | 'head-marketing'
  | 'diretor-comercial'
  | 'gerente-vendas'
  | 'coordenador-marketing'
  | 'analista-vendas'
  | 'sdr'
  | 'outros';

export interface UseCase {
  title: string;
  description: string;
  industry?: Industry;
  companySize?: CompanySize;
  roi?: string;
  implementation?: string;
}

// LGPD and Brazilian compliance features
export interface ComplianceFeature {
  regulation: ComplianceRegulation;
  feature: string;
  description: string;
  certification?: string;
  auditTrail: boolean;
  dataLocation: DataLocation;
}

export type ComplianceRegulation = 'lgpd' | 'pci-dss' | 'iso-27001' | 'soc-2';

export type DataLocation = 'brazil' | 'latin-america' | 'global';

// Product media and assets
export interface ProductMedia {
  logo: string;
  icon: string;
  screenshots: Screenshot[];
  videos: Video[];
  documents: Document[];
  badges: Badge[];
}

export interface Screenshot {
  id: string;
  url: string;
  alt: string;
  category: 'desktop' | 'mobile' | 'feature' | 'integration';
  priority: number;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: number;
  type: 'demo' | 'tutorial' | 'testimonial' | 'overview';
  captions?: string; // Portuguese captions
}

export interface Document {
  id: string;
  title: string;
  url: string;
  type: 'whitepaper' | 'case-study' | 'datasheet' | 'guide';
  language: 'pt-BR' | 'en';
  downloadGated: boolean;
}

export interface Badge {
  type: 'certification' | 'award' | 'compliance' | 'integration';
  name: string;
  image: string;
  description?: string;
}

// SEO optimization for Brazilian market
export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  structuredData: StructuredData;
  localSEO: LocalSEO;
  content: SEOContent;
}

export interface StructuredData {
  type: 'Product' | 'SoftwareApplication';
  properties: Record<string, string | number>;
}

export interface LocalSEO {
  targetCities: string[];
  businessCategory: string;
  serviceArea: string[];
}

export interface SEOContent {
  faqItems: FAQItem[];
  howItWorks: HowItWorksStep[];
  comparisons: ProductComparison[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ProductComparison {
  competitorName: string;
  comparisonPoints: ComparisonPoint[];
}

export interface ComparisonPoint {
  feature: string;
  vendas: boolean | string;
  competitor: boolean | string;
  advantage?: string;
}

// Product ecosystem and workflow
export interface ProductEcosystem {
  products: Product[];
  workflows: EcosystemWorkflow[];
  integrationMatrix: IntegrationMatrix;
  crossSelling: CrossSellingRule[];
}

export interface EcosystemWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  targetAudience: AudienceSegment[];
  estimatedROI: string;
  timeToValue: string;
}

export interface WorkflowStep {
  step: number;
  productId: string;
  action: string;
  description: string;
  inputData?: string[];
  outputData?: string[];
  automationLevel: 'manual' | 'semi-automated' | 'fully-automated';
}

export interface IntegrationMatrix {
  products: string[];
  compatibility: Record<string, Record<string, IntegrationLevel>>;
}

export type IntegrationLevel = 'native' | 'api' | 'webhook' | 'manual' | 'not-supported';

export interface CrossSellingRule {
  triggerProduct: string;
  recommendedProducts: string[];
  condition: string;
  discount?: DiscountInfo;
  bundlePrice?: number;
}

// Pre-defined product constants
export const VENDAS_IA_PRODUCTS = {
  LEADS_RAPIDO: 'leads-rapido',
  DISPARO_RAPIDO: 'disparo-rapido',
  SDR_VIRTUAL: 'sdr-virtual',
  CUSTOM_SOLUTION: 'custom-solution',
} as const;

export const ECOSYSTEM_FLOW: EcosystemPosition[] = ['capture', 'engage', 'convert', 'analyze'];

export const BRAZILIAN_INDUSTRIES: Industry[] = [
  'tecnologia',
  'servicos-financeiros',
  'saude',
  'educacao',
  'varejo',
  'manufatura',
  'consultoria',
  'imobiliario',
  'marketing',
  'agronegocio',
  'logistica',
  'outros',
];

export const COMPANY_SIZES: CompanySize[] = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

export const PAYMENT_METHODS_BRAZIL: PaymentMethod[] = ['pix', 'boleto', 'cartao', 'transferencia'];

// Utility functions
export const getProductsByCategory = (products: Product[], category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByEcosystemPosition = (products: Product[], position: EcosystemPosition): Product[] => {
  return products.filter(product => product.ecosystemPosition === position);
};

export const getAvailableProducts = (products: Product[]): Product[] => {
  return products.filter(product => product.status === 'available');
};

export const calculateBundlePrice = (products: Product[], discount?: number): number => {
  const totalPrice = products.reduce((sum, product) => sum + product.pricing.startingPrice, 0);
  return discount ? totalPrice * (1 - discount / 100) : totalPrice;
};

export const getProductsByAudience = (products: Product[], segment: AudienceSegment): Product[] => {
  return products.filter(product =>
    product.targetAudience.some(audience => audience.segment === segment)
  );
};

export const formatBrazilianPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const getRecommendedProducts = (currentProduct: string, rules: CrossSellingRule[]): string[] => {
  const rule = rules.find(r => r.triggerProduct === currentProduct);
  return rule ? rule.recommendedProducts : [];
};