// Product Card Component for Vendas.IA
// Displays individual AI products with Brazilian market features

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Zap,
  TrendingUp,
  MessageSquare,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import type { Product } from '@/types/products';
import { formatBrazilianPrice } from '@/types/products';
import { createProductWhatsAppLink } from '@/lib/whatsapp';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  compact?: boolean;
  showPricing?: boolean;
  showFeatures?: boolean;
  onCTAClick?: (productId: string, action: 'whatsapp' | 'demo' | 'info') => void;
  className?: string;
}

// Icon mapping for different product categories
const CATEGORY_ICONS = {
  'lead-generation': Users,
  'automation': Zap,
  'ai-agent': Bot,
  'custom-solution': Sparkles,
} as const;

// Status badges configuration
const STATUS_CONFIG = {
  'available': { label: 'Disponível', variant: 'default' as const, color: 'bg-green-500' },
  'coming-soon': { label: 'Em Breve', variant: 'secondary' as const, color: 'bg-yellow-500' },
  'beta': { label: 'Beta', variant: 'outline' as const, color: 'bg-blue-500' },
  'deprecated': { label: 'Descontinuado', variant: 'destructive' as const, color: 'bg-red-500' },
};

export function ProductCard({
  product,
  featured = false,
  compact = false,
  showPricing = true,
  showFeatures = true,
  onCTAClick,
  className = '',
}: ProductCardProps) {
  const { trackEvent } = useAnalytics();
  const CategoryIcon = CATEGORY_ICONS[product.category];
  const statusConfig = STATUS_CONFIG[product.status];

  const handleWhatsAppClick = () => {
    const whatsappUrl = createProductWhatsAppLink(
      product.id as any,
      { company: 'Empresa interessada' },
      {
        source: 'product-card',
        medium: 'website',
        campaign: `product-${product.slug}`,
        content: 'cta-whatsapp',
      }
    );

    trackEvent('whatsapp_click', {
      productId: product.id,
      productName: product.name,
      source: 'product-card',
      action: 'whatsapp-cta',
    });

    onCTAClick?.(product.id, 'whatsapp');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDemoClick = () => {
    trackEvent('cta_click', {
      productId: product.id,
      productName: product.name,
      source: 'product-card',
      action: 'demo-request',
    });

    onCTAClick?.(product.id, 'demo');
  };

  const handleInfoClick = () => {
    trackEvent('cta_click', {
      productId: product.id,
      productName: product.name,
      source: 'product-card',
      action: 'more-info',
    });

    onCTAClick?.(product.id, 'info');
  };

  const topFeatures = product.features
    .filter(f => f.highlight)
    .slice(0, compact ? 2 : 3);

  const mainBenefit = product.benefits[0];

  return (
    <Card
      className={`
        relative transition-all duration-300 hover:shadow-lg
        ${featured ? 'border-2 border-orange-500 shadow-lg' : 'border border-gray-200'}
        ${compact ? 'h-auto' : 'h-full'}
        ${className}
      `}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-orange-500 text-white px-3 py-1">
            Mais Popular
          </Badge>
        </div>
      )}

      <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CategoryIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">
                {product.name}
              </CardTitle>
              <p className="text-sm text-orange-600 font-medium">
                {product.tagline}
              </p>
            </div>
          </div>
          <Badge variant={statusConfig.variant} className="text-xs">
            {statusConfig.label}
          </Badge>
        </div>

        {!compact && (
          <CardDescription className="text-gray-600 mt-3 leading-relaxed">
            {product.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className={compact ? 'py-3' : 'py-4'}>
        {/* Main Benefit */}
        {mainBenefit && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-bold text-green-800">
                {mainBenefit.metric}
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              {mainBenefit.description} em {mainBenefit.timeframe}
            </p>
          </div>
        )}

        {/* Features List */}
        {showFeatures && topFeatures.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">
              Principais Recursos:
            </h4>
            <ul className="space-y-1">
              {topFeatures.map((feature) => (
                <li key={feature.id} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pricing */}
        {showPricing && product.pricing && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline space-x-2">
              <span className="text-sm text-gray-600">A partir de</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatBrazilianPrice(product.pricing.startingPrice)}
              </span>
              <span className="text-sm text-gray-600">
                /{product.pricing.billingCycle === 'monthly' ? 'mês' :
                  product.pricing.billingCycle === 'annually' ? 'ano' :
                  product.pricing.billingCycle}
              </span>
            </div>

            {product.pricing.roi && (
              <p className="text-xs text-green-600 mt-1">
                ROI médio: {product.pricing.roi.averageROI}
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 space-y-2">
        {product.status === 'available' ? (
          <div className="w-full space-y-2">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size={compact ? 'sm' : 'default'}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Falar no WhatsApp
            </Button>

            {!compact && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleDemoClick}
                  className="flex-1"
                  size="sm"
                >
                  Ver Demo
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleInfoClick}
                  className="flex-1"
                  size="sm"
                >
                  Saiba Mais
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            disabled
            className="w-full"
            size={compact ? 'sm' : 'default'}
          >
            {product.status === 'coming-soon' ? 'Em Desenvolvimento' : 'Indisponível'}
          </Button>
        )}

        {/* Quick Stats */}
        {!compact && product.metrics.performanceMetrics.length > 0 && (
          <div className="w-full pt-2 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              {product.metrics.performanceMetrics.slice(0, 2).map((metric) => (
                <div key={metric.name} className="text-center">
                  <div className="font-semibold text-gray-700">{metric.value}</div>
                  <div>{metric.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>

      {/* External link indicator for integrations */}
      {product.integrations.length > 0 && (
        <div className="absolute top-2 right-2">
          <ExternalLink className="h-4 w-4 text-gray-400" />
        </div>
      )}
    </Card>
  );
}

// Compact version for grid layouts
export function ProductCardCompact(props: Omit<ProductCardProps, 'compact'>) {
  return <ProductCard {...props} compact={true} />;
}

// Featured version for hero sections
export function ProductCardFeatured(props: Omit<ProductCardProps, 'featured'>) {
  return <ProductCard {...props} featured={true} />;
}

export default ProductCard;