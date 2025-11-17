// WhatsApp Link Generation Utility for Vendas.IA
// Handles WhatsApp Business integration with Brazilian formatting and tracking

import type {
  N8nLinkTrackingRequest,
  UTMParameters,
  ProductInterest,
  UrgencyLevel
} from '@/types/n8n';
import { trackAnalyticsEvent } from './n8n-client';

// Johnny's WhatsApp business number
export const JOHNNY_WHATSAPP_NUMBER = '5516997787674';

// WhatsApp link configuration
export interface WhatsAppLinkConfig {
  phoneNumber?: string;
  message: string;
  trackingParams?: UTMParameters;
  leadData?: WhatsAppLeadData;
  autoTrack?: boolean;
}

export interface WhatsAppLeadData {
  name?: string;
  company?: string;
  interest?: ProductInterest;
  urgencyLevel?: UrgencyLevel;
  source?: string;
}

// Message templates for different scenarios
export const WHATSAPP_MESSAGE_TEMPLATES = {
  GENERAL_INQUIRY: {
    template: 'Olá! Vim do site da Vendas.IA e gostaria de entender como vocês podem ajudar minha empresa a aumentar as vendas com IA.',
    category: 'general' as const,
  },
  LEADS_RAPIDO: {
    template: 'Olá! Tenho interesse no Leads Rápido. Gostaria de entender como pode ajudar minha empresa {{company}} a gerar mais leads qualificados.',
    category: 'product' as const,
  },
  DISPARO_RAPIDO: {
    template: 'Olá! Vi sobre o Disparo Rápido no site e gostaria de saber mais sobre automação de WhatsApp para minha empresa {{company}}.',
    category: 'product' as const,
  },
  SDR_VIRTUAL: {
    template: 'Olá! Tenho interesse no SDR Virtual. Como funciona a qualificação automática de leads? Nossa empresa {{company}} está precisando automatizar o processo de vendas.',
    category: 'product' as const,
  },
  CUSTOM_SOLUTION: {
    template: 'Olá! Preciso de uma solução de IA personalizada para {{company}}. Vocês desenvolvem soluções específicas para {{industry}}?',
    category: 'custom' as const,
  },
  URGENT_LEAD: {
    template: 'Olá! {{name}} da {{company}} aqui. Tenho urgência em implementar soluções de IA para vendas. Quando podemos conversar?',
    category: 'urgent' as const,
  },
  DEMO_REQUEST: {
    template: 'Olá! Gostaria de agendar uma demonstração dos produtos da Vendas.IA para {{company}}. Qual a melhor data esta semana?',
    category: 'demo' as const,
  },
  CALLBACK_REQUEST: {
    template: 'Olá! Preenchi o formulário no site mas gostaria de conversar por WhatsApp. Sou {{name}} da {{company}}.',
    category: 'callback' as const,
  },
} as const;

export type MessageTemplate = keyof typeof WHATSAPP_MESSAGE_TEMPLATES;

// Generate WhatsApp link with proper formatting
export function generateWhatsAppLink(config: WhatsAppLinkConfig): string {
  const phoneNumber = config.phoneNumber || JOHNNY_WHATSAPP_NUMBER;
  const encodedMessage = encodeURIComponent(config.message);

  let url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  // Add UTM parameters if provided
  if (config.trackingParams) {
    const utmParams = new URLSearchParams();

    if (config.trackingParams.source) utmParams.set('utm_source', config.trackingParams.source);
    if (config.trackingParams.medium) utmParams.set('utm_medium', config.trackingParams.medium);
    if (config.trackingParams.campaign) utmParams.set('utm_campaign', config.trackingParams.campaign);
    if (config.trackingParams.content) utmParams.set('utm_content', config.trackingParams.content);
    if (config.trackingParams.term) utmParams.set('utm_term', config.trackingParams.term);

    if (utmParams.toString()) {
      url += `&${utmParams.toString()}`;
    }
  }

  return url;
}

// Generate message from template with variable substitution
export function generateMessageFromTemplate(
  template: MessageTemplate,
  variables: Record<string, string> = {}
): string {
  let message = WHATSAPP_MESSAGE_TEMPLATES[template].template;

  // Replace template variables
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    message = message.replace(new RegExp(placeholder, 'g'), value);
  });

  // Remove unreplaced placeholders
  message = message.replace(/\{\{[^}]+\}\}/g, '');

  // Clean up extra spaces
  message = message.replace(/\s+/g, ' ').trim();

  return message;
}

// Create a complete WhatsApp link with tracking
export function createWhatsAppLink({
  template,
  variables = {},
  trackingParams,
  leadData,
  autoTrack = true,
}: {
  template: MessageTemplate;
  variables?: Record<string, string>;
  trackingParams?: UTMParameters;
  leadData?: WhatsAppLeadData;
  autoTrack?: boolean;
}): string {
  const message = generateMessageFromTemplate(template, variables);

  const config: WhatsAppLinkConfig = {
    message,
    trackingParams,
    leadData,
    autoTrack,
  };

  return generateWhatsAppLink(config);
}

// Create WhatsApp link for specific product interest
export function createProductWhatsAppLink(
  product: ProductInterest,
  leadData?: WhatsAppLeadData,
  trackingParams?: UTMParameters
): string {
  const templateMap: Record<ProductInterest, MessageTemplate> = {
    'leads-rapido': 'LEADS_RAPIDO',
    'disparo-rapido': 'DISPARO_RAPIDO',
    'sdr-virtual': 'SDR_VIRTUAL',
    'custom-solution': 'CUSTOM_SOLUTION',
  };

  const template = templateMap[product];
  const variables: Record<string, string> = {};

  if (leadData?.company) {
    variables.company = leadData.company;
  }

  if (leadData?.name) {
    variables.name = leadData.name;
  }

  return createWhatsAppLink({
    template,
    variables,
    trackingParams: {
      source: 'website',
      medium: 'whatsapp',
      campaign: `product-${product}`,
      content: 'cta-button',
      ...trackingParams,
    },
    leadData,
  });
}

// Create urgent WhatsApp link for high-priority leads
export function createUrgentWhatsAppLink(
  leadData: WhatsAppLeadData,
  trackingParams?: UTMParameters
): string {
  const variables: Record<string, string> = {};

  if (leadData.name) variables.name = leadData.name;
  if (leadData.company) variables.company = leadData.company;

  return createWhatsAppLink({
    template: 'URGENT_LEAD',
    variables,
    trackingParams: {
      source: 'contact-form',
      medium: 'whatsapp',
      campaign: 'urgent-lead',
      content: 'auto-redirect',
      ...trackingParams,
    },
    leadData: {
      ...leadData,
      urgencyLevel: 'urgent',
    },
  });
}

// Create demo request WhatsApp link
export function createDemoWhatsAppLink(
  leadData?: WhatsAppLeadData,
  trackingParams?: UTMParameters
): string {
  const variables: Record<string, string> = {};

  if (leadData?.company) {
    variables.company = leadData.company;
  }

  return createWhatsAppLink({
    template: 'DEMO_REQUEST',
    variables,
    trackingParams: {
      source: 'website',
      medium: 'whatsapp',
      campaign: 'demo-request',
      content: 'demo-cta',
      ...trackingParams,
    },
    leadData,
  });
}

// Handle WhatsApp link click with analytics tracking
export async function handleWhatsAppClick(
  linkUrl: string,
  metadata: {
    linkType: 'whatsapp-cta' | 'whatsapp-direct';
    source?: string;
    leadId?: string;
    sessionId?: string;
  }
): Promise<void> {
  // Track the click event
  const trackingData: N8nLinkTrackingRequest = {
    linkType: metadata.linkType,
    clickData: {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: metadata.sessionId || generateSessionId(),
      leadId: metadata.leadId,
    },
    deviceInfo: {
      isMobile: isMobileDevice(),
      screenResolution: `${screen.width}x${screen.height}`,
      platform: navigator.platform,
    },
  };

  try {
    await trackAnalyticsEvent(trackingData);
  } catch (error) {
    console.warn('Failed to track WhatsApp click:', error);
  }

  // Open WhatsApp link
  window.open(linkUrl, '_blank', 'noopener,noreferrer');
}

// Validate Brazilian phone number format
export function validateBrazilianPhone(phone: string): boolean {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');

  // Brazilian phone patterns:
  // Mobile: 11 digits (with country code 55) - 5511999887766
  // Mobile: 10 digits (with area code) - 11999887766
  // Mobile: 9 digits (without area code) - 999887766

  if (cleanPhone.startsWith('55')) {
    // With country code
    return /^55[1-9]{2}9[0-9]{8}$/.test(cleanPhone);
  } else if (cleanPhone.length === 11) {
    // With area code
    return /^[1-9]{2}9[0-9]{8}$/.test(cleanPhone);
  } else if (cleanPhone.length === 9) {
    // Without area code (mobile only)
    return /^9[0-9]{8}$/.test(cleanPhone);
  }

  return false;
}

// Format Brazilian phone number for WhatsApp
export function formatPhoneForWhatsApp(phone: string, defaultAreaCode: string = '16'): string {
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.startsWith('55')) {
    return cleanPhone;
  } else if (cleanPhone.length === 11) {
    return `55${cleanPhone}`;
  } else if (cleanPhone.length === 9) {
    return `55${defaultAreaCode}${cleanPhone}`;
  } else if (cleanPhone.length === 10) {
    // Landline, add 9 for mobile
    return `55${cleanPhone.slice(0, 2)}9${cleanPhone.slice(2)}`;
  }

  throw new Error('Invalid Brazilian phone number format');
}

// Display format for Brazilian phone numbers
export function formatPhoneDisplay(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.startsWith('55')) {
    const areaCode = cleanPhone.slice(2, 4);
    const number = cleanPhone.slice(4);
    return `+55 (${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`;
  }

  if (cleanPhone.length === 11) {
    const areaCode = cleanPhone.slice(0, 2);
    const number = cleanPhone.slice(2);
    return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`;
  }

  return phone;
}

// Utility functions
function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Create floating WhatsApp button with tracking
export function createFloatingWhatsAppButton(
  containerId: string,
  config: {
    template?: MessageTemplate;
    variables?: Record<string, string>;
    trackingParams?: UTMParameters;
    position?: 'bottom-right' | 'bottom-left';
    showOnMobile?: boolean;
  } = {}
): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const {
    template = 'GENERAL_INQUIRY',
    variables = {},
    trackingParams,
    position = 'bottom-right',
    showOnMobile = true,
  } = config;

  // Don't show on mobile if disabled
  if (!showOnMobile && isMobileDevice()) return;

  const whatsappUrl = createWhatsAppLink({
    template,
    variables,
    trackingParams: {
      source: 'floating-button',
      medium: 'whatsapp',
      campaign: 'floating-cta',
      ...trackingParams,
    },
  });

  const button = document.createElement('a');
  button.href = whatsappUrl;
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.className = `fixed z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
    position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'
  }`;

  button.innerHTML = `
    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z"/>
    </svg>
  `;

  // Add click tracking
  button.addEventListener('click', (e) => {
    e.preventDefault();
    handleWhatsAppClick(whatsappUrl, {
      linkType: 'whatsapp-cta',
      source: 'floating-button',
    });
  });

  container.appendChild(button);
}

// Export constants for easy access
export const WHATSAPP_CONSTANTS = {
  JOHNNY_NUMBER: JOHNNY_WHATSAPP_NUMBER,
  DISPLAY_NUMBER: formatPhoneDisplay(JOHNNY_WHATSAPP_NUMBER),
  CLICK_TO_CHAT_BASE: 'https://api.whatsapp.com/send',
} as const;