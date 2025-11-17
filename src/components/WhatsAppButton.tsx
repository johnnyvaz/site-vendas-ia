// WhatsApp Button Component for Vendas.IA
// Floating and inline WhatsApp buttons with Brazilian market optimization

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  MessageSquare,
  Phone,
  Clock,
  Zap,
  User,
  Building2,
  ExternalLink,
} from 'lucide-react';
import {
  createWhatsAppLink,
  createProductWhatsAppLink,
  createUrgentWhatsAppLink,
  createDemoWhatsAppLink,
  handleWhatsAppClick,
  formatPhoneDisplay,
  generateMessageFromTemplate,
  JOHNNY_WHATSAPP_NUMBER,
  type MessageTemplate,
  type WhatsAppLeadData,
} from '@/lib/whatsapp';
import type { UTMParameters, ProductInterest } from '@/types/contact';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackWhatsAppClick } from '@/lib/analytics';

interface WhatsAppButtonProps {
  variant?: 'default' | 'floating' | 'inline' | 'compact' | 'urgent' | 'demo';
  template?: MessageTemplate;
  leadData?: WhatsAppLeadData;
  productInterest?: ProductInterest;
  customMessage?: string;
  trackingParams?: UTMParameters;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showPhoneNumber?: boolean;
  showOnlineStatus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

// Business hours for online status (Brazil timezone)
const BUSINESS_HOURS = {
  start: 8, // 8:00 AM
  end: 18,  // 6:00 PM
  timezone: 'America/Sao_Paulo',
};

export function WhatsAppButton({
  variant = 'default',
  template = 'GENERAL_INQUIRY',
  leadData,
  productInterest,
  customMessage,
  trackingParams,
  position = 'bottom-right',
  showPhoneNumber = false,
  showOnlineStatus = false,
  size = 'md',
  className = '',
  disabled = false,
  children,
  onClick,
}: WhatsAppButtonProps) {
  const { trackEvent } = useAnalytics();
  const [isOnline, setIsOnline] = useState(false);

  // Check business hours for online status
  useEffect(() => {
    if (!showOnlineStatus) return;

    const checkBusinessHours = () => {
      const now = new Date();
      const brazilTime = new Date(now.toLocaleString('en-US', { timeZone: BUSINESS_HOURS.timezone }));
      const hour = brazilTime.getHours();
      const day = brazilTime.getDay(); // 0 = Sunday, 6 = Saturday

      // Monday to Friday, business hours
      const isBusinessDay = day >= 1 && day <= 5;
      const isBusinessHour = hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;

      setIsOnline(isBusinessDay && isBusinessHour);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [showOnlineStatus]);

  const generateWhatsAppUrl = () => {
    // Use custom message if provided
    if (customMessage) {
      return createWhatsAppLink({
        template: 'GENERAL_INQUIRY',
        variables: {},
        trackingParams: {
          source: 'whatsapp-button',
          medium: 'website',
          campaign: variant,
          ...trackingParams,
        },
      }).replace(encodeURIComponent('Olá! Vim do site da Vendas.IA e gostaria de entender como vocês podem ajudar minha empresa a aumentar as vendas com IA.'), encodeURIComponent(customMessage));
    }

    // Product-specific WhatsApp link
    if (productInterest) {
      return createProductWhatsAppLink(
        productInterest,
        leadData,
        {
          source: 'whatsapp-button',
          medium: 'website',
          campaign: `product-${productInterest}`,
          ...trackingParams,
        }
      );
    }

    // Urgent lead link
    if (variant === 'urgent' && leadData) {
      return createUrgentWhatsAppLink(
        leadData,
        {
          source: 'whatsapp-button',
          medium: 'website',
          campaign: 'urgent-contact',
          ...trackingParams,
        }
      );
    }

    // Demo request link
    if (variant === 'demo') {
      return createDemoWhatsAppLink(
        leadData,
        {
          source: 'whatsapp-button',
          medium: 'website',
          campaign: 'demo-request',
          ...trackingParams,
        }
      );
    }

    // Default template-based link
    return createWhatsAppLink({
      template,
      variables: {
        name: leadData?.name || '',
        company: leadData?.company || '',
      },
      trackingParams: {
        source: 'whatsapp-button',
        medium: 'website',
        campaign: variant,
        ...trackingParams,
      },
    });
  };

  const handleClick = async () => {
    if (disabled) return;

    const whatsappUrl = generateWhatsAppUrl();

    // Track click event with both old and new analytics
    trackEvent('whatsapp_click', {
      variant,
      template,
      productInterest: productInterest || '',
      leadCompany: leadData?.company || '',
      source: 'whatsapp-button',
      customMessage: customMessage ? 'true' : 'false',
    });

    // Use new analytics tracking
    await trackWhatsAppClick({
      phoneNumber: JOHNNY_WHATSAPP_NUMBER,
      message: customMessage || generateMessageFromTemplate(template || 'GENERAL_INQUIRY', leadData as unknown as Record<string, string>),
      source: `whatsapp-button-${variant}`,
      campaign: trackingParams?.campaign,
      product: productInterest,
      urgency: variant === 'urgent' ? 'urgent' : variant === 'demo' ? 'high' : 'medium',
      buttonText: children?.toString() || 'WhatsApp',
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    });

    // Handle WhatsApp click with analytics
    await handleWhatsAppClick(whatsappUrl, {
      linkType: 'whatsapp-cta',
      source: 'whatsapp-button',
    });

    onClick?.();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-10 w-10 text-sm';
      case 'lg':
        return 'h-16 w-16 text-lg';
      default:
        return 'h-12 w-12 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'urgent':
        return 'bg-red-600 hover:bg-red-700 text-white animate-pulse';
      case 'demo':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'floating':
        return 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl';
      case 'compact':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-green-600 hover:bg-green-700 text-white';
    }
  };

  const getPositionClasses = () => {
    if (variant !== 'floating') return '';

    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-6 left-6 z-50';
      case 'top-right':
        return 'fixed top-6 right-6 z-50';
      case 'top-left':
        return 'fixed top-6 left-6 z-50';
      default:
        return 'fixed bottom-6 right-6 z-50';
    }
  };

  const getButtonContent = () => {
    if (children) return children;

    switch (variant) {
      case 'floating':
        return (
          <div className="flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
          </div>
        );
      case 'compact':
        return (
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </div>
        );
      case 'urgent':
        return (
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Contato Urgente</span>
          </div>
        );
      case 'demo':
        return (
          <div className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>Agendar Demo</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Falar no WhatsApp</span>
          </div>
        );
    }
  };

  const buttonElement = (
    <Button
      onClick={handleClick}
      disabled={disabled}
      size={variant === 'floating' ? undefined : (size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default')}
      className={`
        ${getVariantClasses()}
        ${variant === 'floating' ? getSizeClasses() : ''}
        ${getPositionClasses()}
        ${variant === 'floating' ? 'rounded-full' : 'rounded-lg'}
        transition-all duration-300 hover:scale-105
        ${className}
      `}
    >
      {getButtonContent()}
    </Button>
  );

  // Floating variant with tooltip and status indicators
  if (variant === 'floating') {
    return (
      <TooltipProvider>
        <div className="relative">
          {/* Online status indicator */}
          {showOnlineStatus && (
            <div className={`absolute -top-1 -right-1 z-10`}>
              <Badge
                variant={isOnline ? 'default' : 'secondary'}
                className={`
                  text-xs px-1 py-0.5
                  ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}
                `}
              >
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              {buttonElement}
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-semibold">Fale conosco no WhatsApp</p>
                {showPhoneNumber && (
                  <p className="text-sm flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {formatPhoneDisplay(JOHNNY_WHATSAPP_NUMBER)}
                  </p>
                )}
                {showOnlineStatus && (
                  <p className="text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {isOnline ? 'Respondemos agora' : 'Responderemos em breve'}
                  </p>
                )}
                <p className="text-xs text-gray-300">
                  Horário comercial: 8h às 18h (seg-sex)
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  }

  // Inline variants
  return (
    <div className="relative inline-block">
      {/* Urgent indicator */}
      {variant === 'urgent' && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="h-4 w-4 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-0 h-4 w-4 bg-red-600 rounded-full"></div>
        </div>
      )}

      {buttonElement}

      {/* Phone number display */}
      {showPhoneNumber && !['floating'].includes(variant) && (
        <p className="text-xs text-gray-600 mt-1 text-center">
          {formatPhoneDisplay(JOHNNY_WHATSAPP_NUMBER)}
        </p>
      )}

      {/* Online status for inline buttons */}
      {showOnlineStatus && !['floating'].includes(variant) && (
        <div className="flex items-center justify-center mt-1">
          <div className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-xs text-gray-600">
            {isOnline ? 'Online agora' : 'Responderemos em breve'}
          </span>
        </div>
      )}
    </div>
  );
}

// Specialized button variants
export function WhatsAppFloatingButton(props: Omit<WhatsAppButtonProps, 'variant'>) {
  return <WhatsAppButton {...props} variant="floating" />;
}

export function WhatsAppUrgentButton(props: Omit<WhatsAppButtonProps, 'variant'>) {
  return <WhatsAppButton {...props} variant="urgent" />;
}

export function WhatsAppDemoButton(props: Omit<WhatsAppButtonProps, 'variant'>) {
  return <WhatsAppButton {...props} variant="demo" />;
}

export function WhatsAppCompactButton(props: Omit<WhatsAppButtonProps, 'variant'>) {
  return <WhatsAppButton {...props} variant="compact" />;
}

// Product-specific WhatsApp button
interface ProductWhatsAppButtonProps extends Omit<WhatsAppButtonProps, 'productInterest' | 'template'> {
  product: ProductInterest;
  companyName?: string;
  contactName?: string;
}

export function ProductWhatsAppButton({
  product,
  companyName,
  contactName,
  ...props
}: ProductWhatsAppButtonProps) {
  const leadData: WhatsAppLeadData = {
    name: contactName || 'Cliente interessado',
    company: companyName || 'Empresa interessada',
    interest: product,
  };

  return (
    <WhatsAppButton
      {...props}
      productInterest={product}
      leadData={leadData}
      trackingParams={{
        source: 'product-button',
        medium: 'website',
        campaign: `product-${product}`,
        content: 'whatsapp-cta',
        ...props.trackingParams,
      }}
    >
      {props.children || (
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Quero este produto</span>
        </div>
      )}
    </WhatsAppButton>
  );
}

// Contact form WhatsApp button
interface ContactFormWhatsAppButtonProps extends Omit<WhatsAppButtonProps, 'leadData' | 'template'> {
  formData: {
    name?: string;
    company?: string;
    interest?: ProductInterest;
    urgency?: 'urgent' | 'high' | 'medium' | 'low';
  };
}

export function ContactFormWhatsAppButton({
  formData,
  ...props
}: ContactFormWhatsAppButtonProps) {
  const leadData: WhatsAppLeadData = {
    name: formData.name || 'Lead do formulário',
    company: formData.company || 'Empresa interessada',
    interest: formData.interest,
    urgencyLevel: formData.urgency || 'medium',
  };

  const template = formData.urgency === 'urgent' ? 'URGENT_LEAD' : 'CALLBACK_REQUEST';

  return (
    <WhatsAppButton
      {...props}
      template={template}
      leadData={leadData}
      trackingParams={{
        source: 'contact-form',
        medium: 'website',
        campaign: 'form-whatsapp',
        content: 'form-cta',
        ...props.trackingParams,
      }}
    />
  );
}

export default WhatsAppButton;