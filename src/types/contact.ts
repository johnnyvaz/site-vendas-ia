// Enhanced Contact Form Types for Vendas.IA
// Progressive form data collection with LGPD compliance

import type {
  PersonalInfo,
  BusinessInfo,
  InterestInfo,
  ConsentInfo,
  FormMetadata,
  UrgencyLevel,
  ProductInterest,
  ContactMethod,
  UTMParameters
} from './n8n';

// Re-export types for convenience
export type { UrgencyLevel, ProductInterest, UTMParameters } from './n8n';

// Main contact form data structure
export interface ContactFormData {
  personalInfo: PersonalInfo;
  businessInfo?: BusinessInfo;
  interests?: InterestInfo;
  consent: ConsentInfo;
  metadata: FormMetadata;
  message?: string;
}

// Progressive form step data
export interface FormStepData {
  step: FormStep;
  isValid: boolean;
  isRequired: boolean;
  data: Partial<ContactFormData>;
  errors: FormFieldErrors;
}

// Form steps for progressive collection
export type FormStep = 'personal' | 'business' | 'interests' | 'consent' | 'review';

// Form field validation errors
export interface FormFieldErrors {
  [fieldName: string]: string[];
}

// Form submission state
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  submissionId?: string;
  errors: FormFieldErrors;
  success: boolean;
  message?: string;
  estimatedResponseTime?: string;
  nextSteps?: string[];
}

// Form configuration
export interface FormConfig {
  enableProgressiveCollection: boolean;
  enableAutoSave: boolean;
  autoSaveInterval: number; // milliseconds
  enableAnalytics: boolean;
  requireLGPDConsent: boolean;
  enableWhatsAppOptIn: boolean;
  defaultLanguage: 'pt-BR';
  enableUTMTracking: boolean;
}

// Field validation rules
export interface FieldValidationRule {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string | number | boolean | null) => string | null;
}

export interface FormValidationRules {
  personalInfo: {
    name: FieldValidationRule;
    email: FieldValidationRule;
    phone: FieldValidationRule;
    position: FieldValidationRule;
  };
  businessInfo: {
    company: FieldValidationRule;
    website: FieldValidationRule;
    industry: FieldValidationRule;
    size: FieldValidationRule;
    revenue: FieldValidationRule;
    location: FieldValidationRule;
  };
  interests: {
    products: FieldValidationRule;
    primaryGoal: FieldValidationRule;
    timeline: FieldValidationRule;
    budget: FieldValidationRule;
  };
  consent: {
    lgpdConsent: FieldValidationRule;
    marketingConsent: FieldValidationRule;
    whatsappConsent: FieldValidationRule;
  };
}

// Lead scoring configuration
export interface LeadScoringConfig {
  personalInfoWeight: number;
  businessInfoWeight: number;
  interestsWeight: number;
  urgencyWeight: number;
  budgetWeight: number;
  companyWeight: number;
}

export interface LeadScoringResult {
  totalScore: number;
  breakdown: {
    personalInfo: number;
    businessInfo: number;
    interests: number;
    urgency: number;
    budget: number;
    company: number;
  };
  grade: LeadGrade;
  urgencyLevel: UrgencyLevel;
  recommendedAction: RecommendedAction;
}

export type LeadGrade = 'A' | 'B' | 'C' | 'D';
export type RecommendedAction = 'immediate_call' | 'whatsapp_urgent' | 'email_follow_up' | 'nurture_sequence';

// Form analytics events
export interface FormAnalyticsEvent {
  eventType: FormEventType;
  stepName?: FormStep;
  fieldName?: string;
  value?: string | number | boolean;
  timestamp: number;
  sessionId: string;
  metadata?: Record<string, string | number | boolean>;
}

export type FormEventType =
  | 'form_started'
  | 'step_entered'
  | 'step_completed'
  | 'field_focused'
  | 'field_changed'
  | 'field_blurred'
  | 'validation_error'
  | 'form_submitted'
  | 'form_abandoned'
  | 'auto_saved';

// Auto-save functionality
export interface AutoSaveData {
  formData: Partial<ContactFormData>;
  timestamp: number;
  stepProgress: FormStep[];
  sessionId: string;
  expiresAt: number;
}

// LGPD consent tracking
export interface ConsentTrackingData {
  consentGiven: boolean;
  consentTimestamp: number;
  consentVersion: string;
  ipAddress: string;
  userAgent: string;
  consentMethod: 'explicit_checkbox' | 'form_submission';
  withdrawalMethod?: 'email_link' | 'form_request';
  withdrawalTimestamp?: number;
}

// Brazilian market specific validations
export interface BrazilianValidationRules {
  phoneFormat: RegExp; // Brazilian phone format
  cpfFormat?: RegExp; // CPF validation if needed
  cnpjFormat?: RegExp; // CNPJ validation for companies
  cepFormat?: RegExp; // CEP postal code format
  businessEmailDomains: string[]; // Common Brazilian business domains
}

// Form personalization
export interface FormPersonalization {
  industrySpecificFields: Partial<Record<string, string[]>>;
  companySizeSpecificQuestions: Partial<Record<string, string[]>>;
  productInterestSpecificFields: Partial<Record<ProductInterest, string[]>>;
  urgencyBasedVariations: Partial<Record<UrgencyLevel, FormConfig>>;
}

// Multi-step form navigation
export interface FormNavigation {
  currentStep: FormStep;
  availableSteps: FormStep[];
  completedSteps: FormStep[];
  canNavigateBack: boolean;
  canNavigateForward: boolean;
  canSkipStep: boolean;
  nextStep?: FormStep;
  previousStep?: FormStep;
}

// Contact preferences
export interface ContactPreferences {
  preferredMethod: ContactMethod;
  preferredTime: TimePreference;
  timezone: string;
  language: 'pt-BR';
  communicationFrequency: CommunicationFrequency;
  topics: TopicPreference[];
}

export interface TimePreference {
  morningAcceptable: boolean; // 8:00-12:00
  afternoonAcceptable: boolean; // 12:00-18:00
  eveningAcceptable: boolean; // 18:00-20:00
  weekendAcceptable: boolean;
  urgentAcceptable: boolean; // Outside normal hours for urgent matters
}

export type CommunicationFrequency = 'immediate' | 'daily' | 'weekly' | 'monthly' | 'as_needed';

export type TopicPreference =
  | 'product_updates'
  | 'industry_insights'
  | 'case_studies'
  | 'webinars'
  | 'promotional_offers'
  | 'technical_content';

// Form UI state management
export interface FormUIState {
  isLoading: boolean;
  currentStep: FormStep;
  navigation: FormNavigation;
  validation: {
    isValidating: boolean;
    hasErrors: boolean;
    errors: FormFieldErrors;
  };
  submission: FormSubmissionState;
  autoSave: {
    isEnabled: boolean;
    lastSaved?: number;
    isDirty: boolean;
  };
  analytics: {
    sessionId: string;
    startTime: number;
    events: FormAnalyticsEvent[];
  };
}

// Form field components props
export interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  value: string | number | boolean | null;
  error?: string[];
  onChange: (value: string | number | boolean | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
}

// Conditional field display
export interface ConditionalFieldRule {
  fieldName: string;
  showWhen: {
    dependsOn: string;
    value: string | number | boolean;
    operator: 'equals' | 'not_equals' | 'includes' | 'greater_than' | 'less_than';
  };
  hideWhen?: {
    dependsOn: string;
    value: string | number | boolean;
    operator: 'equals' | 'not_equals' | 'includes' | 'greater_than' | 'less_than';
  };
}

// Form submission result
export interface FormSubmissionResult {
  success: boolean;
  submissionId?: string;
  leadScore?: number;
  urgencyLevel?: UrgencyLevel;
  recommendedAction?: RecommendedAction;
  estimatedResponseTime?: string;
  nextSteps?: string[];
  contactMethods?: ContactMethod[];
  errors?: FormFieldErrors;
  message?: string;
  redirectUrl?: string;
}

// Default form configuration
export const DEFAULT_FORM_CONFIG: FormConfig = {
  enableProgressiveCollection: true,
  enableAutoSave: true,
  autoSaveInterval: 30000, // 30 seconds
  enableAnalytics: true,
  requireLGPDConsent: true,
  enableWhatsAppOptIn: true,
  defaultLanguage: 'pt-BR',
  enableUTMTracking: true,
};

// Brazilian validation patterns
export const BRAZILIAN_VALIDATION_PATTERNS = {
  phone: /^(\+55\s?)?(\(?\d{2}\)?\s?)9?\d{4}-?\d{4}$/,
  cep: /^\d{5}-?\d{3}$/,
  businessEmail: /^[^\s@]+@(?!gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)[^\s@]+\.[^\s@]+$/,
} as const;

// Lead scoring weights
export const DEFAULT_LEAD_SCORING: LeadScoringConfig = {
  personalInfoWeight: 10,
  businessInfoWeight: 25,
  interestsWeight: 30,
  urgencyWeight: 20,
  budgetWeight: 10,
  companyWeight: 5,
};

// Form step sequence
export const FORM_STEPS: FormStep[] = ['personal', 'business', 'interests', 'consent', 'review'];

// Required fields by step
export const REQUIRED_FIELDS_BY_STEP: Record<FormStep, string[]> = {
  personal: ['name', 'email', 'phone'],
  business: ['company'],
  interests: ['products', 'primaryGoal', 'timeline'],
  consent: ['lgpdConsent'],
  review: [],
};

// Form field labels in Portuguese
export const FORM_LABELS_PT_BR = {
  name: 'Nome completo',
  email: 'E-mail empresarial',
  phone: 'WhatsApp',
  position: 'Cargo',
  company: 'Empresa',
  website: 'Site da empresa',
  industry: 'Setor',
  size: 'Tamanho da empresa',
  revenue: 'Faturamento anual',
  location: 'Localização',
  products: 'Produtos de interesse',
  primaryGoal: 'Principal objetivo',
  timeline: 'Prazo para implementação',
  budget: 'Orçamento mensal',
  lgpdConsent: 'Aceito o processamento dos meus dados conforme a LGPD',
  marketingConsent: 'Aceito receber comunicações de marketing',
  whatsappConsent: 'Aceito receber mensagens via WhatsApp',
  message: 'Mensagem adicional',
} as const;