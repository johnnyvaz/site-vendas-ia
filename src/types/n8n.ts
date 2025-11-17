// n8n Webhook Integration Types for Vendas.IA
// Based on contracts/n8n-webhook.json specification

// Base webhook configuration
export interface N8nWebhookConfig {
  baseUrl: string;
  authToken: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

// Contact Form Webhook Types
export interface N8nContactFormRequest {
  webhookSource: 'vendas-ia-website';
  submissionId: string;
  timestamp: string;
  personalInfo: PersonalInfo;
  businessInfo?: BusinessInfo;
  interests?: InterestInfo;
  consent: ConsentInfo;
  metadata: FormMetadata;
  urgencyLevel: UrgencyLevel;
  leadScore: number;
  preferredContact: ContactMethod;
  message?: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  position?: string;
  whatsappOptIn?: boolean;
}

export interface BusinessInfo {
  company?: string;
  website?: string;
  industry?: Industry;
  size?: CompanySize;
  revenue?: RevenueRange;
  currentTools?: string[];
  location?: string;
}

export interface InterestInfo {
  products: ProductInterest[];
  primaryGoal?: BusinessGoal;
  timeline?: Timeline;
  budget?: BudgetRange;
  decisionMakers?: number;
  currentChallenges?: Challenge[];
}

export interface ConsentInfo {
  lgpdConsent: true; // Always required
  marketingConsent?: boolean;
  whatsappConsent?: boolean;
  dataRetention?: boolean;
  consentTimestamp: string;
  consentVersion?: string;
  ipAddress?: string;
}

export interface FormMetadata {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  userAgent?: string;
  sessionDuration?: number;
  pagesVisited?: string[];
  formStartTime?: string;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  isMobile?: boolean;
  screenResolution?: string;
  browserInfo?: string;
}

// WhatsApp Direct Message Types
export interface N8nWhatsAppRequest {
  phoneNumber: string; // Brazilian format without +
  messageType: WhatsAppMessageType;
  leadData: WhatsAppLeadData;
  customMessage?: string;
  metadata?: WhatsAppMetadata;
}

export interface WhatsAppLeadData {
  name: string;
  company: string;
  interest?: ProductInterest;
  urgencyLevel?: UrgencyLevel;
  submissionId?: string;
}

export interface WhatsAppMetadata {
  source: 'contact-form' | 'direct-click' | 'callback-request';
  timestamp: string;
}

// Link Tracking Types
export interface N8nLinkTrackingRequest {
  linkType: LinkType;
  clickData: ClickData;
  deviceInfo?: DeviceInfo;
  analyticsEvents?: Array<{
    id: string;
    type: string;
    timestamp: number;
    sessionId: string;
    data: Record<string, string | number | boolean>;
  }>;
}

export interface ClickData {
  timestamp: string;
  userAgent: string;
  referrer?: string;
  utmParameters?: UTMParameters;
  sessionId?: string;
  leadId?: string;
  
  // Extended fields for analytics events
  eventType?: string;
  eventCategory?: string;
  eventLabel?: string;
  eventValue?: number;
  pageUrl?: string;
  pageTitle?: string;
  deviceType?: string;
  customData?: Record<string, unknown>;
}

export interface UTMParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

// Response Types
export interface N8nWebhookResponse {
  success: boolean;
  workflowId: string;
  executionId: string;
  message?: string;
  estimatedResponseTime?: string;
  nextSteps?: string[];
  contactMethods?: ContactMethodsUsed;
  trackingInfo?: TrackingInfo;
}

export interface ContactMethodsUsed {
  email?: boolean;
  whatsapp?: boolean;
  phone?: boolean;
}

export interface TrackingInfo {
  submissionId?: string;
  leadScore?: number;
  urgencyLevel?: string;
}

export interface N8nErrorResponse {
  success: false;
  error: {
    message: string;
    code: N8nErrorCode;
    details?: Record<string, unknown>;
    retryable?: boolean;
    retryAfter?: number;
  };
  executionId?: string;
  timestamp: string;
}

export interface N8nRateLimitResponse {
  success: false;
  message: string;
  retryAfter: number;
  limitType: RateLimitType;
  currentUsage?: number;
  limit?: number;
  resetTime?: string;
}

// Enums and Union Types
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'urgent';
export type ContactMethod = 'email' | 'whatsapp' | 'phone';
export type ProductInterest = 'leads-rapido' | 'disparo-rapido' | 'sdr-virtual' | 'custom-solution';

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
  | 'outros';

export type CompanySize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';

export type RevenueRange = 'under-500k' | '500k-2m' | '2m-10m' | '10m-50m' | '50m+';

export type BusinessGoal =
  | 'increase-leads'
  | 'improve-conversion'
  | 'automate-processes'
  | 'reduce-costs'
  | 'scale-sales-team';

export type Timeline = 'immediate' | '1-month' | '3-months' | '6-months' | 'planning-phase';

export type BudgetRange = 'under-5k' | '5k-15k' | '15k-50k' | '50k-100k' | '100k+';

export type Challenge =
  | 'few-qualified-leads'
  | 'long-sales-cycle'
  | 'manual-processes'
  | 'poor-conversion-rates'
  | 'limited-follow-up'
  | 'lack-of-data'
  | 'scaling-difficulties';

export type WhatsAppMessageType = 'urgent_lead' | 'follow_up' | 'demo_request' | 'custom';

export type LinkType = 'whatsapp-cta' | 'whatsapp-direct' | 'email-cta' | 'analytics-event';

export type N8nErrorCode =
  | 'VALIDATION_ERROR'
  | 'WORKFLOW_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export type RateLimitType = 'webhook_calls' | 'contact_submissions' | 'whatsapp_messages';

// Webhook endpoints configuration
export const N8N_ENDPOINTS = {
  CONTACT_FORM: '/webhook/contact-form',
  WHATSAPP_DIRECT: '/webhook/whatsapp-direct',
  LINK_TRACKING: '/webhook/link-tracking',
} as const;

// Default configuration values
export const N8N_CONFIG_DEFAULTS: Partial<N8nWebhookConfig> = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

// Utility type guards
export const isN8nError = (response: unknown): response is N8nErrorResponse => {
  return !!(response && typeof response === 'object' && 'success' in response &&
           response.success === false && 'error' in response);
};

export const isN8nRateLimit = (response: unknown): response is N8nRateLimitResponse => {
  return !!(response && typeof response === 'object' && 'success' in response &&
           response.success === false && 'retryAfter' in response &&
           typeof (response as N8nRateLimitResponse).retryAfter === 'number');
};

export const isN8nSuccess = (response: unknown): response is N8nWebhookResponse => {
  return !!(response && typeof response === 'object' && 'success' in response &&
           response.success === true && 'workflowId' in response);
};

// Brazilian phone number validation regex
export const BRAZILIAN_PHONE_REGEX = /^55[0-9]{10,11}$/;

// LGPD compliance helpers
export interface LGPDConsentRecord {
  submissionId: string;
  consentTimestamp: string;
  ipAddress: string;
  consentVersion: string;
  lgpdConsent: boolean;
  marketingConsent: boolean;
  whatsappConsent: boolean;
  userAgent: string;
}

// Form validation helpers
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  completionPercentage: number;
  leadScore: number;
  urgencyLevel: UrgencyLevel;
}

// Analytics event types for n8n tracking
export interface AnalyticsEvent {
  eventType: 'form_start' | 'form_step' | 'form_submit' | 'cta_click' | 'page_view';
  eventData: Record<string, string | number | boolean>;
  timestamp: string;
  sessionId: string;
  userId?: string;
  metadata?: FormMetadata;
}