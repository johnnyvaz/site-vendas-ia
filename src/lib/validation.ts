// Enhanced Form Validation Schemas for Vendas.IA
// Zod schemas with Brazilian market specific validations and LGPD compliance

import { z } from 'zod';
import { validateBrazilianPhone } from './whatsapp';

// Brazilian-specific validation patterns
const BRAZILIAN_PATTERNS = {
  phone: /^(\+55\s?)?(\(?\d{2}\)?\s?)9?\d{4}-?\d{4}$/,
  businessEmail: /^[^\s@]+@(?!gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)[^\s@]+\.[^\s@]+$/,
  cep: /^\d{5}-?\d{3}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  websiteUrl: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
} as const;

// Common business domains in Brazil for validation
const BRAZILIAN_BUSINESS_DOMAINS = [
  'com.br', 'org.br', 'net.br', 'gov.br', 'edu.br', 'mil.br',
  'art.br', 'esp.br', 'etc.br', 'eti.br', 'far.br', 'fot.br',
  'fst.br', 'g12.br', 'geo.br', 'imb.br', 'ind.br', 'inf.br',
  'jor.br', 'lel.br', 'mat.br', 'med.br', 'mus.br', 'nom.br',
  'not.br', 'ntr.br', 'odo.br', 'ppg.br', 'pro.br', 'psc.br',
  'psi.br', 'qsl.br', 'rec.br', 'slg.br', 'srv.br', 'tmp.br',
  'trd.br', 'tur.br', 'tv.br', 'vet.br', 'zlg.br'
];

// Custom validation functions
const isBusinessEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;

  // Check against business email pattern
  if (!BRAZILIAN_PATTERNS.businessEmail.test(email)) return false;

  // Check if domain is likely a business domain
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // Allow Brazilian business domains
  if (BRAZILIAN_BUSINESS_DOMAINS.some(tld => domain.endsWith(tld))) return true;

  // Allow international business domains (not common personal email providers)
  const personalDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com', 'uol.com.br', 'terra.com.br', 'ig.com.br'];
  return !personalDomains.includes(domain);
};

const isBrazilianPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  return validateBrazilianPhone(phone);
};

const isValidWebsite = (website: string): boolean => {
  if (!website || typeof website !== 'string') return false;
  return BRAZILIAN_PATTERNS.websiteUrl.test(website);
};

const isStrongName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;

  // Must have at least first and last name
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length < 2) return false;

  // Each part must be at least 2 characters
  return nameParts.every(part => part.length >= 2);
};

// Personal information schema
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres')
    .refine(isStrongName, 'Por favor, informe nome e sobrenome completos'),

  email: z
    .string()
    .email('E-mail inválido')
    .max(255, 'E-mail não pode exceder 255 caracteres')
    .refine(isBusinessEmail, 'Por favor, use um e-mail empresarial'),

  phone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(20, 'Telefone não pode exceder 20 caracteres')
    .refine(isBrazilianPhone, 'Número de telefone brasileiro inválido'),

  position: z
    .string()
    .min(2, 'Cargo deve ter pelo menos 2 caracteres')
    .max(100, 'Cargo não pode exceder 100 caracteres')
    .optional(),

  whatsappOptIn: z
    .boolean()
    .optional(),
});

// Business information schema
export const businessInfoSchema = z.object({
  company: z
    .string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(200, 'Nome da empresa não pode exceder 200 caracteres')
    .optional(),

  website: z
    .string()
    .refine(isValidWebsite, 'URL do site inválida')
    .optional()
    .or(z.literal('')),

  industry: z
    .enum([
      'tecnologia',
      'servicos-financeiros',
      'saude',
      'educacao',
      'varejo',
      'manufatura',
      'consultoria',
      'imobiliario',
      'marketing',
      'outros'
    ])
    .optional(),

  size: z
    .enum(['1-10', '11-50', '51-200', '201-1000', '1000+'])
    .optional(),

  revenue: z
    .enum(['under-500k', '500k-2m', '2m-10m', '10m-50m', '50m+'])
    .optional(),

  currentTools: z
    .array(z.string())
    .max(10, 'Máximo de 10 ferramentas')
    .optional(),

  location: z
    .string()
    .max(100, 'Localização não pode exceder 100 caracteres')
    .optional(),
});

// Interest information schema
export const interestInfoSchema = z.object({
  products: z
    .array(z.enum(['leads-rapido', 'disparo-rapido', 'sdr-virtual', 'custom-solution']))
    .min(1, 'Selecione pelo menos um produto de interesse')
    .max(4, 'Máximo de 4 produtos'),

  primaryGoal: z
    .enum([
      'increase-leads',
      'improve-conversion',
      'automate-processes',
      'reduce-costs',
      'scale-sales-team'
    ])
    .optional(),

  timeline: z
    .enum(['immediate', '1-month', '3-months', '6-months', 'planning-phase'])
    .optional(),

  budget: z
    .enum(['under-5k', '5k-15k', '15k-50k', '50k-100k', '100k+'])
    .optional(),

  decisionMakers: z
    .number()
    .int()
    .min(1, 'Deve haver pelo menos 1 tomador de decisão')
    .max(10, 'Máximo de 10 tomadores de decisão')
    .optional(),

  currentChallenges: z
    .array(z.enum([
      'few-qualified-leads',
      'long-sales-cycle',
      'manual-processes',
      'poor-conversion-rates',
      'limited-follow-up',
      'lack-of-data',
      'scaling-difficulties'
    ]))
    .max(5, 'Máximo de 5 desafios')
    .optional(),
});

// LGPD consent schema
export const consentInfoSchema = z.object({
  lgpdConsent: z
    .literal(true, {
      errorMap: () => ({ message: 'É obrigatório aceitar o processamento de dados conforme a LGPD' })
    }),

  marketingConsent: z
    .boolean()
    .optional(),

  whatsappConsent: z
    .boolean()
    .optional(),

  dataRetention: z
    .boolean()
    .optional(),

  consentTimestamp: z
    .string()
    .datetime('Timestamp de consentimento inválido'),

  consentVersion: z
    .string()
    .min(1, 'Versão do consentimento é obrigatória')
    .optional(),

  ipAddress: z
    .string()
    .ip('Endereço IP inválido')
    .optional(),
});

// Form metadata schema
export const formMetadataSchema = z.object({
  utmSource: z
    .string()
    .max(100, 'UTM Source muito longo')
    .optional(),

  utmMedium: z
    .string()
    .max(100, 'UTM Medium muito longo')
    .optional(),

  utmCampaign: z
    .string()
    .max(100, 'UTM Campaign muito longo')
    .optional(),

  utmContent: z
    .string()
    .max(100, 'UTM Content muito longo')
    .optional(),

  utmTerm: z
    .string()
    .max(100, 'UTM Term muito longo')
    .optional(),

  referrer: z
    .string()
    .url('URL de referência inválida')
    .optional(),

  userAgent: z
    .string()
    .max(500, 'User Agent muito longo')
    .optional(),

  sessionDuration: z
    .number()
    .int()
    .min(0, 'Duração da sessão não pode ser negativa')
    .optional(),

  pagesVisited: z
    .array(z.string())
    .max(20, 'Máximo de 20 páginas visitadas')
    .optional(),

  formStartTime: z
    .string()
    .datetime('Timestamp de início inválido')
    .optional(),

  deviceInfo: z
    .object({
      isMobile: z.boolean().optional(),
      screenResolution: z.string().optional(),
      browserInfo: z.string().optional(),
    })
    .optional(),
});

// Complete contact form schema
export const contactFormSchema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema.optional(),
  interests: interestInfoSchema.optional(),
  consent: consentInfoSchema,
  metadata: formMetadataSchema,
  message: z
    .string()
    .max(1000, 'Mensagem não pode exceder 1000 caracteres')
    .optional(),
});

// Progressive validation schemas for each step
export const stepValidationSchemas = {
  personal: z.object({
    personalInfo: personalInfoSchema,
  }),

  business: z.object({
    personalInfo: personalInfoSchema,
    businessInfo: businessInfoSchema,
  }),

  interests: z.object({
    personalInfo: personalInfoSchema,
    businessInfo: businessInfoSchema,
    interests: interestInfoSchema,
  }),

  consent: z.object({
    personalInfo: personalInfoSchema,
    businessInfo: businessInfoSchema,
    interests: interestInfoSchema,
    consent: consentInfoSchema,
  }),

  review: contactFormSchema,
} as const;

// N8n webhook request schema
export const n8nContactFormRequestSchema = z.object({
  webhookSource: z.literal('vendas-ia-website'),
  submissionId: z.string().uuid('ID de submissão inválido'),
  timestamp: z.string().datetime('Timestamp inválido'),
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema.optional(),
  interests: interestInfoSchema.optional(),
  consent: consentInfoSchema,
  metadata: formMetadataSchema,
  urgencyLevel: z.enum(['low', 'medium', 'high', 'urgent']),
  leadScore: z.number().int().min(0).max(100),
  preferredContact: z.enum(['email', 'whatsapp', 'phone']),
  message: z.string().max(1000).optional(),
});

// Validation utilities
export type PersonalInfoInput = z.input<typeof personalInfoSchema>;
export type PersonalInfoOutput = z.output<typeof personalInfoSchema>;
export type BusinessInfoInput = z.input<typeof businessInfoSchema>;
export type BusinessInfoOutput = z.output<typeof businessInfoSchema>;
export type InterestInfoInput = z.input<typeof interestInfoSchema>;
export type InterestInfoOutput = z.output<typeof interestInfoSchema>;
export type ConsentInfoInput = z.input<typeof consentInfoSchema>;
export type ConsentInfoOutput = z.output<typeof consentInfoSchema>;
export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;

// Validation helper functions
export function validateStep(stepName: keyof typeof stepValidationSchemas, data: unknown) {
  const schema = stepValidationSchemas[stepName];
  return schema.safeParse(data);
}

export function validatePersonalInfo(data: unknown) {
  return personalInfoSchema.safeParse(data);
}

export function validateBusinessInfo(data: unknown) {
  return businessInfoSchema.safeParse(data);
}

export function validateInterestInfo(data: unknown) {
  return interestInfoSchema.safeParse(data);
}

export function validateConsentInfo(data: unknown) {
  return consentInfoSchema.safeParse(data);
}

export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}

export function validateN8nRequest(data: unknown) {
  return n8nContactFormRequestSchema.safeParse(data);
}

// Field-specific validation functions for real-time validation
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const result = z.string().email().safeParse(email);
  if (!result.success) {
    return { valid: false, error: 'E-mail inválido' };
  }

  if (!isBusinessEmail(email)) {
    return { valid: false, error: 'Por favor, use um e-mail empresarial' };
  }

  return { valid: true };
}

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone) {
    return { valid: false, error: 'Telefone é obrigatório' };
  }

  if (!isBrazilianPhone(phone)) {
    return { valid: false, error: 'Formato de telefone brasileiro inválido' };
  }

  return { valid: true };
}

export function validateCompanyName(company: string): { valid: boolean; error?: string } {
  if (!company) {
    return { valid: false, error: 'Nome da empresa é obrigatório' };
  }

  if (company.length < 2) {
    return { valid: false, error: 'Nome da empresa deve ter pelo menos 2 caracteres' };
  }

  if (company.length > 200) {
    return { valid: false, error: 'Nome da empresa não pode exceder 200 caracteres' };
  }

  return { valid: true };
}

export function validateWebsite(website: string): { valid: boolean; error?: string } {
  if (!website) {
    return { valid: true }; // Optional field
  }

  if (!isValidWebsite(website)) {
    return { valid: false, error: 'URL do site inválida' };
  }

  return { valid: true };
}

// Business rules validation
export function validateBusinessRules(data: ContactFormOutput): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Check for high-quality lead indicators
  if (data.personalInfo.email && !isBusinessEmail(data.personalInfo.email)) {
    warnings.push('E-mail pessoal pode indicar lead de menor qualidade');
  }

  if (data.businessInfo?.size === '1-10' && data.interests?.budget === '100k+') {
    warnings.push('Orçamento parece alto para o tamanho da empresa');
  }

  if (data.interests?.timeline === 'immediate' && !data.interests?.budget) {
    warnings.push('Lead urgente sem informação de orçamento');
  }

  if (data.businessInfo?.industry === 'outros' && !data.message) {
    warnings.push('Setor "outros" sem descrição adicional');
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}

// Data quality scoring
export function calculateDataQuality(data: ContactFormOutput): {
  score: number;
  completeness: number;
  quality: number;
  issues: string[];
} {
  const issues: string[] = [];
  let completenessScore = 0;
  let qualityScore = 0;

  // Completeness scoring (50% of total)
  const requiredFields = ['name', 'email', 'phone'];
  const optionalFields = ['position', 'company', 'website', 'industry', 'size', 'revenue'];

  requiredFields.forEach(field => {
    if (data.personalInfo[field as keyof typeof data.personalInfo]) {
      completenessScore += 33.33; // 100/3 for required fields
    }
  });

  let optionalFilledCount = 0;
  optionalFields.forEach(field => {
    const value = field === 'position' ? data.personalInfo.position :
                  data.businessInfo?.[field as keyof typeof data.businessInfo];
    if (value) optionalFilledCount++;
  });

  completenessScore += (optionalFilledCount / optionalFields.length) * 50;

  // Quality scoring (50% of total)
  if (isBusinessEmail(data.personalInfo.email)) {
    qualityScore += 20;
  } else {
    issues.push('E-mail não parece ser empresarial');
  }

  if (isStrongName(data.personalInfo.name)) {
    qualityScore += 15;
  } else {
    issues.push('Nome parece incompleto');
  }

  if (data.businessInfo?.company && data.businessInfo.company.length > 10) {
    qualityScore += 15;
  } else {
    issues.push('Nome da empresa muito curto ou ausente');
  }

  if (data.interests?.products && data.interests.products.length > 0) {
    qualityScore += 25;
  }

  if (data.interests?.timeline && data.interests.timeline !== 'planning-phase') {
    qualityScore += 25;
  }

  const totalScore = (completenessScore + qualityScore) / 2;

  return {
    score: Math.round(totalScore),
    completeness: Math.round(completenessScore),
    quality: Math.round(qualityScore),
    issues,
  };
}

// Export validation constants
export const VALIDATION_CONSTANTS = {
  BRAZILIAN_PATTERNS,
  BRAZILIAN_BUSINESS_DOMAINS,
  MAX_RETRY_ATTEMPTS: 3,
  VALIDATION_DEBOUNCE_MS: 500,
} as const;