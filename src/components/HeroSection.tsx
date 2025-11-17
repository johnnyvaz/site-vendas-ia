// Hero Section Component for Vendas.IA
// Main landing section with value proposition and Brazilian market focus

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Play,
  Users,
  TrendingUp,
  MessageSquare,
  Rocket,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Clock,
  Building,
  Award,
  Globe,
} from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { useAnalytics } from '@/hooks/useAnalytics';

interface HeroSectionProps {
  showVideo?: boolean;
  showStats?: boolean;
  showTestimonial?: boolean;
  compactMode?: boolean;
  backgroundVariant?: 'gradient' | 'pattern' | 'minimal' | 'video';
  ctaVariant?: 'dual' | 'single-whatsapp' | 'single-form' | 'triple';
  className?: string;
}

// Key statistics for social proof
const COMPANY_STATS = {
  clientsCount: '500+',
  leadGenerated: '1.2M+',
  averageROI: '380%',
  satisfactionRate: '98%',
  responseTime: '< 2h',
  brazilCoverage: '100%',
} as const;

// Featured benefits for Brazilian market
const KEY_BENEFITS = [
  {
    icon: TrendingUp,
    title: 'ROI Comprovado',
    description: 'Média de 380% de retorno em 90 dias',
    metric: '380% ROI',
    color: 'text-green-600',
  },
  {
    icon: Clock,
    title: 'Implementação Rápida',
    description: 'Resultados visíveis em 48 horas',
    metric: '48h',
    color: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Conformidade LGPD',
    description: '100% adequado à legislação brasileira',
    metric: '100% Seguro',
    color: 'text-purple-600',
  },
  {
    icon: MessageSquare,
    title: 'Suporte Nacional',
    description: 'Atendimento em português 24/7',
    metric: '24/7',
    color: 'text-orange-600',
  },
] as const;

// Trust indicators
const TRUST_INDICATORS = [
  { icon: Building, text: 'Empresas B2B' },
  { icon: Globe, text: 'Todo o Brasil' },
  { icon: Award, text: 'Certificado ISO' },
  { icon: Shield, text: 'LGPD Compliant' },
] as const;

export function HeroSection({
  showVideo = true,
  showStats = true,
  showTestimonial = true,
  compactMode = false,
  backgroundVariant = 'gradient',
  ctaVariant = 'dual',
  className = '',
}: HeroSectionProps) {
  const { trackEvent } = useAnalytics();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Sample testimonials
  const testimonials = [
    {
      quote: "Em 3 meses aumentamos nossos leads qualificados em 400%. A Vendas.IA revolucionou nosso processo comercial.",
      author: "Carlos Silva",
      position: "Diretor Comercial",
      company: "TechBrasil Ltda",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote: "Automatizamos 80% do nosso processo de qualificação. Agora nossa equipe foca apenas nos leads mais promissores.",
      author: "Mariana Costa",
      position: "Head de Marketing",
      company: "Inovação Digital",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b152d265?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!showTestimonial || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showTestimonial, testimonials.length]);

  useEffect(() => {
    trackEvent('page_view', {
      sectionName: 'hero_section',
      backgroundVariant,
      ctaVariant,
      showVideo: showVideo.toString(),
    });
  }, [trackEvent, backgroundVariant, ctaVariant, showVideo]);

  const handleVideoClick = () => {
    setVideoPlaying(true);
    trackEvent('video_play', {
      videoType: 'hero_demo',
      source: 'hero_section',
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      source: 'hero_cta',
      position: 'primary',
    });
  };

  const handleDemoClick = () => {
    trackEvent('cta_click', {
      action: 'demo_request',
      source: 'hero_cta',
      position: 'secondary',
    });
  };

  const handleFormClick = () => {
    trackEvent('cta_click', {
      action: 'contact_form',
      source: 'hero_cta',
      position: 'primary',
    });
  };

  const getBackgroundClasses = () => {
    switch (backgroundVariant) {
      case 'gradient':
        return 'bg-gradient-to-br from-orange-50 via-white to-blue-50';
      case 'pattern':
        return 'bg-white relative overflow-hidden';
      case 'video':
        return 'bg-gray-900 text-white relative';
      default:
        return 'bg-white';
    }
  };

  const renderCTAButtons = () => {
    const baseClasses = compactMode ? 'w-full' : 'w-full sm:w-auto';

    switch (ctaVariant) {
      case 'single-whatsapp':
        return (
          <WhatsAppButton
            template="GENERAL_INQUIRY"
            size="lg"
            onClick={handleWhatsAppClick}
            trackingParams={{
              source: 'hero_section',
              medium: 'website',
              campaign: 'hero_cta',
              content: 'primary_whatsapp',
            }}
            className={baseClasses}
          />
        );

      case 'single-form':
        return (
          <Button
            size="lg"
            onClick={handleFormClick}
            className={`bg-orange-600 hover:bg-orange-700 text-white ${baseClasses}`}
          >
            <Target className="h-5 w-5 mr-2" />
            Quero Aumentar Minhas Vendas
          </Button>
        );

      case 'triple':
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <WhatsAppButton
              template="GENERAL_INQUIRY"
              size="lg"
              onClick={handleWhatsAppClick}
              trackingParams={{
                source: 'hero_section',
                medium: 'website',
                campaign: 'hero_cta',
                content: 'primary_whatsapp',
              }}
              className={baseClasses}
            />
            <Button
              variant="outline"
              size="lg"
              onClick={handleDemoClick}
              className={baseClasses}
            >
              <Play className="h-5 w-5 mr-2" />
              Ver Demonstração
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={handleFormClick}
              className={`text-gray-700 hover:text-gray-900 ${baseClasses}`}
            >
              Falar com Especialista
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      default: // dual
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <WhatsAppButton
              template="GENERAL_INQUIRY"
              size="lg"
              onClick={handleWhatsAppClick}
              trackingParams={{
                source: 'hero_section',
                medium: 'website',
                campaign: 'hero_cta',
                content: 'primary_whatsapp',
              }}
              className={baseClasses}
            />
            <Button
              variant="outline"
              size="lg"
              onClick={handleDemoClick}
              className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${baseClasses}`}
            >
              <Play className="h-5 w-5 mr-2" />
              Ver Demonstração
            </Button>
          </div>
        );
    }
  };

  return (
    <section className={`relative py-16 md:py-24 ${getBackgroundClasses()} ${className}`}>
      {/* Background Pattern */}
      {backgroundVariant === 'pattern' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Announcement Badge */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                <Rocket className="h-3 w-3 mr-1" />
                Novo: SDR Virtual com IA
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                100% LGPD Compliant
              </Badge>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className={`
                font-bold leading-tight mb-6
                ${compactMode ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'}
                ${backgroundVariant === 'video' ? 'text-white' : 'text-gray-900'}
              `}>
                Multiplique suas
                <span className="text-orange-600"> Vendas </span>
                com Inteligência Artificial
              </h1>

              <p className={`
                text-lg md:text-xl leading-relaxed
                ${compactMode ? 'mb-6' : 'mb-8'}
                ${backgroundVariant === 'video' ? 'text-gray-200' : 'text-gray-600'}
                max-w-2xl
              `}>
                Automatize a geração de leads, qualificação de prospects e follow-up de vendas.
                Desenvolvido especialmente para empresas brasileiras que querem crescer mais rápido.
              </p>
            </div>

            {/* Key Benefits */}
            {!compactMode && (
              <div className="grid grid-cols-2 gap-4">
                {KEY_BENEFITS.slice(0, 4).map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Icon className={`h-5 w-5 ${benefit.color}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">
                          {benefit.metric}
                        </div>
                        <div className="text-xs text-gray-600">
                          {benefit.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTAs */}
            <div>
              {renderCTAButtons()}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200">
              {TRUST_INDICATORS.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <Icon className="h-4 w-4" />
                    <span>{indicator.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Content */}
          <div className="space-y-8">
            {/* Demo Video/Image */}
            {showVideo && (
              <Card className="relative overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  {!videoPlaying ? (
                    <div
                      className="relative cursor-pointer group"
                      onClick={handleVideoClick}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop"
                        alt="Demonstração da Vendas.IA"
                        className="w-full h-64 md:h-80 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-orange-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white bg-opacity-90 rounded-lg p-3">
                          <p className="text-sm font-semibold text-gray-900">
                            Veja como funciona na prática
                          </p>
                          <p className="text-xs text-gray-600">
                            3 min de demonstração
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                        title="Demonstração Vendas.IA"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            {showStats && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                  icon={Users}
                  metric={COMPANY_STATS.clientsCount}
                  label="Empresas Atendidas"
                  color="text-blue-600"
                />
                <StatCard
                  icon={TrendingUp}
                  metric={COMPANY_STATS.averageROI}
                  label="ROI Médio"
                  color="text-green-600"
                />
                <StatCard
                  icon={Star}
                  metric={COMPANY_STATS.satisfactionRate}
                  label="Satisfação"
                  color="text-yellow-600"
                />
                <StatCard
                  icon={Zap}
                  metric={COMPANY_STATS.leadGenerated}
                  label="Leads Gerados"
                  color="text-purple-600"
                />
                <StatCard
                  icon={Clock}
                  metric={COMPANY_STATS.responseTime}
                  label="Tempo Resposta"
                  color="text-orange-600"
                />
                <StatCard
                  icon={Globe}
                  metric={COMPANY_STATS.brazilCoverage}
                  label="Cobertura Brasil"
                  color="text-green-600"
                />
              </div>
            )}

            {/* Testimonial */}
            {showTestimonial && testimonials.length > 0 && (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-2">
                        {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 mb-3">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>
                      <div>
                        <cite className="font-semibold text-gray-900">
                          {testimonials[currentTestimonial].author}
                        </cite>
                        <p className="text-sm text-gray-600">
                          {testimonials[currentTestimonial].position} • {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
  label: string;
  color: string;
}

function StatCard({ icon: Icon, metric, label, color }: StatCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Icon className={`h-6 w-6 mx-auto mb-2 ${color}`} />
        <div className="font-bold text-lg text-gray-900">{metric}</div>
        <div className="text-xs text-gray-600">{label}</div>
      </CardContent>
    </Card>
  );
}

export default HeroSection;