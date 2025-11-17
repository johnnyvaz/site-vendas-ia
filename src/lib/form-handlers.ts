// Form Submission Handlers for Vendas.IA
// Routes form submissions to appropriate n8n webhook endpoints

import type {
  N8nContactFormRequest,
  N8nWhatsAppRequest,
  UrgencyLevel,
} from '@/types/n8n';
import type {
  FormSubmissionResult,
  ContactFormData,
} from '@/types/contact';
import {
  submitContactFormToN8n,
  sendUrgentWhatsAppNotification,
  generateSubmissionId,
  calculateLeadScore,
  calculateUrgencyLevel,
  N8nError,
} from './n8n-client';

// Contact form submission handler
export async function handleContactFormSubmission(
  formData: Partial<ContactFormData>,
  options?: {
    source?: string;
    campaign?: string;
    utmParams?: Record<string, string>;
  }
): Promise<FormSubmissionResult> {
  const submissionId = generateSubmissionId();
  
  try {
    // Validate required fields
    const validationResult = validateContactForm(formData);
    if (!validationResult.valid) {
      return {
        success: false,
        submissionId,
        errors: validationResult.errors,
        message: 'Por favor, preencha todos os campos obrigatórios.',
      };
    }

    // Calculate lead metrics
    const leadScore = calculateLeadScore(formData as N8nContactFormRequest);
    const urgencyLevel = calculateUrgencyLevel(formData as N8nContactFormRequest) as UrgencyLevel;
    
    // Prepare n8n request
    const n8nRequest: N8nContactFormRequest = {
      webhookSource: 'vendas-ia-website',
      submissionId,
      timestamp: new Date().toISOString(),
      personalInfo: formData.personalInfo!,
      businessInfo: formData.businessInfo,
      interests: formData.interests,
      consent: formData.consent!,
      metadata: {
        utmSource: options?.utmParams?.utm_source || options?.source || 'website',
        utmMedium: options?.utmParams?.utm_medium || 'organic',
        utmCampaign: options?.utmParams?.utm_campaign || options?.campaign || 'contact-form',
        utmContent: options?.utmParams?.utm_content,
        utmTerm: options?.utmParams?.utm_term,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        formStartTime: new Date().toISOString(),
        deviceInfo: {
          isMobile: typeof navigator !== 'undefined' ? /Mobile|Android|iPhone/i.test(navigator.userAgent) : false,
          screenResolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : undefined,
          browserInfo: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        },
      },
      urgencyLevel,
      leadScore,
      preferredContact: formData.personalInfo?.whatsappOptIn ? 'whatsapp' : 'email',
      message: formData.message,
    };

    // Submit to n8n
    const response = await submitContactFormToN8n(n8nRequest);

    // Handle urgent leads
    if (urgencyLevel === 'urgent' || leadScore >= 80) {
      try {
        await sendUrgentLeadNotification(formData, submissionId, leadScore);
      } catch (error) {
        // Don't fail the main submission if urgent notification fails
        console.warn('Failed to send urgent notification:', error);
      }
    }

    return {
      success: true,
      submissionId,
      leadScore,
      urgencyLevel,
      recommendedAction: getRecommendedAction(urgencyLevel, leadScore),
      estimatedResponseTime: getEstimatedResponseTime(urgencyLevel),
      nextSteps: getNextSteps(urgencyLevel, formData),
      contactMethods: getRecommendedContactMethods(formData),
      message: 'Formulário enviado com sucesso! Em breve entraremos em contato.',
    };

  } catch (error) {
    console.error('Contact form submission failed:', error);
    
    return {
      success: false,
      submissionId,
      message: getErrorMessage(error),
      errors: error instanceof N8nError ? { general: [error.message] } : undefined,
    };
  }
}

// WhatsApp direct message handler
export async function handleWhatsAppMessage(
  personalInfo: { name: string; phone: string },
  message: string,
  options?: {
    urgency?: UrgencyLevel;
    source?: string;
  }
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const whatsappRequest: N8nWhatsAppRequest = {
      phoneNumber: personalInfo.phone.replace(/\D/g, ''), // Remove non-digits
      messageType: 'custom',
      leadData: {
        name: personalInfo.name,
        company: '',
        urgencyLevel: options?.urgency || 'medium',
      },
      customMessage: message,
      metadata: {
        source: options?.source === 'urgent-lead-notification' ? 'direct-click' : 'contact-form',
        timestamp: new Date().toISOString(),
      },
    };

    const response = await sendUrgentWhatsAppNotification(whatsappRequest);
    
    return {
      success: true,
      messageId: response.executionId || generateSubmissionId(),
    };
    
  } catch (error) {
    console.error('WhatsApp message failed:', error);
    
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

// Newsletter subscription handler
export async function handleNewsletterSubscription(
  email: string,
  options?: {
    source?: string;
    preferences?: string[];
  }
): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
  try {
    const subscriptionData = {
      webhookSource: 'vendas-ia-website',
      timestamp: new Date().toISOString(),
      email,
      source: options?.source || 'website',
      preferences: options?.preferences || ['general'],
    };

    // For newsletter, we create a minimal contact form request
    const contactRequest: N8nContactFormRequest = {
      webhookSource: 'vendas-ia-website',
      submissionId: generateSubmissionId(),
      timestamp: new Date().toISOString(),
      personalInfo: { 
        name: '',
        email: email,
        phone: '',
        whatsappOptIn: false,
      },
      consent: {
        lgpdConsent: true,
        marketingConsent: true,
        whatsappConsent: false,
        consentTimestamp: new Date().toISOString(),
      },
      metadata: {
        utmSource: 'newsletter',
        utmMedium: 'website',
        utmCampaign: 'subscription',
      },
      urgencyLevel: 'low',
      leadScore: 20,
      preferredContact: 'email',
    };

    const response = await submitContactFormToN8n(contactRequest);

    return {
      success: true,
      subscriptionId: response.executionId || generateSubmissionId(),
    };

  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

// Validation functions
function validateContactForm(formData: Partial<ContactFormData>) {
  const errors: Record<string, string[]> = {};

  // Personal info validation
  if (!formData.personalInfo?.name?.trim()) {
    errors['personalInfo.name'] = ['Nome é obrigatório'];
  }

  if (!formData.personalInfo?.email?.trim()) {
    errors['personalInfo.email'] = ['E-mail é obrigatório'];
  } else if (!isValidEmail(formData.personalInfo.email)) {
    errors['personalInfo.email'] = ['E-mail inválido'];
  }

  if (!formData.personalInfo?.phone?.trim()) {
    errors['personalInfo.phone'] = ['Telefone é obrigatório'];
  } else if (!isValidPhone(formData.personalInfo.phone)) {
    errors['personalInfo.phone'] = ['Telefone inválido'];
  }

  // LGPD consent validation
  if (!formData.consent?.lgpdConsent) {
    errors['consent.lgpdConsent'] = ['Consentimento LGPD é obrigatório'];
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  // Brazilian phone number regex (flexible)
  const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\s?)?[0-9]{4}[-\s]?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Helper functions
function getRecommendedAction(urgencyLevel: UrgencyLevel, leadScore: number): 'immediate_call' | 'whatsapp_urgent' | 'email_follow_up' | 'nurture_sequence' {
  if (urgencyLevel === 'urgent' || leadScore >= 80) {
    return 'whatsapp_urgent';
  }
  
  if (urgencyLevel === 'high' || leadScore >= 60) {
    return 'immediate_call';
  }

  if (leadScore >= 40) {
    return 'email_follow_up';
  }

  return 'nurture_sequence';
}

function getEstimatedResponseTime(urgencyLevel: UrgencyLevel): string {
  switch (urgencyLevel) {
    case 'urgent':
      return 'Até 30 minutos';
    case 'high':
      return 'Até 2 horas';
    case 'medium':
      return 'Até 4 horas';
    default:
      return 'Até 24 horas';
  }
}

function getNextSteps(urgencyLevel: UrgencyLevel, formData: Partial<ContactFormData>): string[] {
  const steps = [
    'Análise detalhada do seu perfil e necessidades',
    'Preparação de proposta personalizada',
  ];

  if (urgencyLevel === 'urgent') {
    steps.unshift('Ligação ou WhatsApp imediato para discussão inicial');
  } else if (formData.personalInfo?.whatsappOptIn) {
    steps.unshift('Primeiro contato via WhatsApp');
  } else {
    steps.unshift('Primeiro contato via e-mail');
  }

  steps.push('Agendamento de reunião para apresentação das soluções');
  
  return steps;
}

function getRecommendedContactMethods(formData: Partial<ContactFormData>) {
  const methods = [];

  if (formData.personalInfo?.whatsappOptIn && formData.personalInfo?.phone) {
    methods.push({
      type: 'whatsapp' as const,
      value: formData.personalInfo.phone,
      preferred: true,
    });
  }

  if (formData.personalInfo?.email) {
    methods.push({
      type: 'email' as const,
      value: formData.personalInfo.email,
      preferred: !formData.personalInfo?.whatsappOptIn,
    });
  }

  if (formData.personalInfo?.phone) {
    methods.push({
      type: 'phone' as const,
      value: formData.personalInfo.phone,
      preferred: false,
    });
  }

  return methods;
}

async function sendUrgentLeadNotification(
  formData: Partial<ContactFormData>,
  submissionId: string,
  leadScore: number
) {
  if (!formData.personalInfo?.phone) return;

  const urgentMessage = `🚨 LEAD URGENTE - Score: ${leadScore}/100

Nome: ${formData.personalInfo.name}
Email: ${formData.personalInfo.email}
Empresa: ${formData.businessInfo?.company || 'N/A'}
Telefone: ${formData.personalInfo.phone}

ID: ${submissionId}

Ação requerida: Contato imediato!`;

  await handleWhatsAppMessage(
    {
      name: 'Johnny Vaz',
      phone: '5516997787674', // Johnny's phone for notifications
    },
    urgentMessage,
    {
      urgency: 'urgent',
      source: 'urgent-lead-notification',
    }
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof N8nError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return 'Dados do formulário inválidos. Verifique as informações e tente novamente.';
      case 'AUTHENTICATION_ERROR':
        return 'Erro de autenticação. Tente novamente em alguns minutos.';
      case 'RATE_LIMIT_ERROR':
        return 'Muitas solicitações. Aguarde alguns minutos e tente novamente.';
      case 'NETWORK_ERROR':
        return 'Problema de conexão. Verifique sua internet e tente novamente.';
      default:
        return 'Erro interno. Nossa equipe foi notificada. Tente novamente ou entre em contato pelo WhatsApp.';
    }
  }

  return 'Erro inesperado. Tente novamente ou entre em contato pelo WhatsApp.';
}

// Export all handlers for easy use
export const formHandlers = {
  submitContactForm: handleContactFormSubmission,
  sendWhatsAppMessage: handleWhatsAppMessage,
  subscribeNewsletter: handleNewsletterSubscription,
};

export default formHandlers;