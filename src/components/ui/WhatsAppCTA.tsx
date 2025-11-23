import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Phone, 
  Clock, 
  CheckCircle, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/useAnalytics';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import type { ProductInterest, UrgencyLevel } from '@/types/contact';

interface WhatsAppCTAProps {
  className?: string;
  variant?: 'default' | 'floating' | 'inline' | 'banner' | 'compact';
  message?: string;
  phoneNumber?: string;
  leadData?: {
    name?: string;
    company?: string;
    interest?: ProductInterest;
    urgencyLevel?: UrgencyLevel;
    source?: string;
  };
  customText?: string;
  showJohnnyInfo?: boolean;
  showOnlineStatus?: boolean;
  showResponseTime?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'urgent';
  trackingSource?: string;
}

// Johnny's contact information
const JOHNNY_INFO = {
  name: 'Johnny Vaz',
  title: 'Especialista em IA para Vendas',
  email: 'contato@johnnyvaz.com.br',
  whatsapp: '+55 (16) 99778-7674',
  responseTime: 'Resposta em até 2 horas',
  availability: 'Online agora'
};

const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  className = '',
  variant = 'default',
  message,
  phoneNumber = JOHNNY_INFO.whatsapp,
  leadData,
  customText,
  showJohnnyInfo = true,
  showOnlineStatus = true,
  showResponseTime = true,
  size = 'md',
  animated = true,
  urgencyLevel = 'medium',
  trackingSource = 'whatsapp-cta'
}) => {
  const { trackEvent } = useAnalytics();

  const getDefaultMessage = () => {
    const baseMessage = "Olá! Vim do site Vendas.IA e gostaria de saber mais sobre as soluções de automação.";
    
    if (leadData?.interest) {
      return `${baseMessage} Tenho interesse especial em ${leadData.interest}.`;
    }
    
    return baseMessage;
  };

  const handleWhatsAppClick = () => {
    const finalMessage = message || getDefaultMessage();
    
    const whatsappUrl = generateWhatsAppLink({
      phoneNumber,
      message: finalMessage,
      leadData: {
        ...leadData,
        source: trackingSource
      },
      autoTrack: true
    });

    trackEvent('whatsapp_click', {
      source: trackingSource,
      urgency: urgencyLevel,
      hasCustomMessage: !!message,
      variant
    });

    window.open(whatsappUrl, '_blank');
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const getUrgencyBadge = () => {
    const urgencyConfig = {
      low: { text: 'Consulta Gratuita', color: 'bg-green-100 text-green-800' },
      medium: { text: 'Resposta Rápida', color: 'bg-blue-100 text-blue-800' },
      high: { text: 'Atendimento Prioritário', color: 'bg-orange-100 text-orange-800' },
      urgent: { text: 'Contato Imediato', color: 'bg-red-100 text-red-800' }
    };

    return urgencyConfig[urgencyLevel];
  };

  // Floating WhatsApp Button
  if (variant === 'floating') {
    return (
      <div className={cn(
        'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50',
        animated && 'animate-bounce',
        className
      )}>
        <div className="group">
          {/* Info bubble */}
          <div className={cn(
            'absolute bottom-full right-0 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            'transform translate-y-2 group-hover:translate-y-0'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900">
                {JOHNNY_INFO.name}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              {JOHNNY_INFO.title}
            </p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Clock className="w-3 h-3" />
              {JOHNNY_INFO.responseTime}
            </div>
          </div>

          {/* WhatsApp button */}
          <Button
            onClick={handleWhatsAppClick}
            className={cn(
              'w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg',
              'flex items-center justify-center',
              animated && 'hover:scale-110 transition-transform duration-200'
            )}
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </Button>

          {/* Pulse ring */}
          {animated && (
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-25 animate-ping"></div>
          )}
        </div>
      </div>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <div className={cn(
        'bg-gradient-to-r from-green-500 to-green-600 text-white p-4 md:p-6 rounded-lg',
        className
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-1">
                Fale Direto com {JOHNNY_INFO.name}
              </h3>
              <p className="text-green-100 text-sm">
                {JOHNNY_INFO.title} • {JOHNNY_INFO.responseTime}
              </p>
              
              {showOnlineStatus && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-100">
                    {JOHNNY_INFO.availability}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleWhatsAppClick}
            variant="secondary"
            className="bg-white text-green-600 hover:bg-gray-100 flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Iniciar Conversa
          </Button>
        </div>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <Button
        onClick={handleWhatsAppClick}
        className={cn(
          'bg-green-500 hover:bg-green-600 text-white',
          getSizeClasses(),
          className
        )}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        {customText || 'WhatsApp'}
      </Button>
    );
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200', className)}>
        <MessageSquare className="w-5 h-5 text-green-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            Conversar no WhatsApp
          </p>
          <p className="text-xs text-gray-600">
            Resposta garantida em até 2 horas
          </p>
        </div>
        <Button
          onClick={handleWhatsAppClick}
          variant="outline"
          size="sm"
          className="border-green-300 text-green-700 hover:bg-green-100"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Default variant - Full featured card
  return (
    <div className={cn(
      'bg-white rounded-lg border shadow-sm p-4 md:p-6',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">
              Falar com Especialista
            </h3>
            {showJohnnyInfo && (
              <p className="text-sm text-gray-600">
                {JOHNNY_INFO.name} • {JOHNNY_INFO.title}
              </p>
            )}
          </div>
        </div>

        <Badge className={getUrgencyBadge().color}>
          {getUrgencyBadge().text}
        </Badge>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Consultoria gratuita personalizada
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-green-500" />
          {JOHNNY_INFO.responseTime}
        </div>
        {showOnlineStatus && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {JOHNNY_INFO.availability}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button
        onClick={handleWhatsAppClick}
        className={cn(
          'w-full bg-green-500 hover:bg-green-600 text-white',
          getSizeClasses(),
          animated && 'hover:scale-105 transition-transform duration-200'
        )}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        {customText || 'Iniciar Conversa no WhatsApp'}
        {urgencyLevel === 'urgent' && <Zap className="w-4 h-4 ml-2" />}
      </Button>

      {/* Contact info */}
      {showJohnnyInfo && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Phone className="w-3 h-3" />
            {JOHNNY_INFO.whatsapp}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {JOHNNY_INFO.email}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppCTA;