// Progressive Form Hook for Vendas.IA
// Manages multi-step form state, validation, and submission with LGPD compliance

import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type {
  ContactFormData,
  FormStep,
  FormUIState,
  FormNavigationState,
  FormSubmissionResult,
  FormAnalyticsEvent,
  AutoSaveData,
  FormConfig,
  LeadScoringResult,
} from '@/types/contact';
import type { N8nContactFormRequest } from '@/types/n8n';
import {
  validateStep,
  calculateDataQuality,
  validateBusinessRules,
  VALIDATION_CONSTANTS,
} from '@/lib/validation';
import {
  submitContactFormToN8n,
  generateSubmissionId,
  calculateLeadScore,
  calculateUrgencyLevel,
} from '@/lib/n8n-client';
import { useAnalytics } from './useAnalytics';

// Form configuration with Brazilian market defaults
const DEFAULT_CONFIG: FormConfig = {
  enableProgressiveCollection: true,
  enableAutoSave: true,
  autoSaveInterval: 30000, // 30 seconds
  enableAnalytics: true,
  requireLGPDConsent: true,
  enableWhatsAppOptIn: true,
  defaultLanguage: 'pt-BR',
  enableUTMTracking: true,
};

// Form steps sequence
const FORM_STEPS: FormStep[] = ['personal', 'business', 'interests', 'consent', 'review'];

export interface UseProgressiveFormOptions {
  config?: Partial<FormConfig>;
  initialData?: Partial<ContactFormData>;
  onStepChange?: (step: FormStep, data: Partial<ContactFormData>) => void;
  onSubmissionSuccess?: (result: FormSubmissionResult) => void;
  onSubmissionError?: (error: Error) => void;
  autoSaveKey?: string;
}

export function useProgressiveForm(options: UseProgressiveFormOptions = {}) {
  const {
    config: userConfig = {},
    initialData = {},
    onStepChange,
    onSubmissionSuccess,
    onSubmissionError,
    autoSaveKey = 'vendas-ia-form-autosave',
  } = options;

  const config = { ...DEFAULT_CONFIG, ...userConfig };
  const { trackEvent } = useAnalytics();

  // Core state
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [formData, setFormData] = useState<Partial<ContactFormData>>(initialData);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult | null>(null);

  // Auto-save functionality
  const [autoSaveData, setAutoSaveData] = useLocalStorage<AutoSaveData | null>(autoSaveKey, null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Session tracking
  const sessionIdRef = useRef<string>(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const formStartTimeRef = useRef<number>(Date.now());
  const [analytics, setAnalytics] = useState<FormAnalyticsEvent[]>([]);

  // Load auto-saved data on mount
  useEffect(() => {
    if (config.enableAutoSave && autoSaveData && autoSaveData.expiresAt > Date.now()) {
      setFormData(autoSaveData.formData);
      setLastSaved(autoSaveData.timestamp);

      // Track form restoration
      trackFormEvent('form_restored', undefined, undefined, {
        savedTimestamp: autoSaveData.timestamp,
        sessionId: autoSaveData.sessionId,
      });
    }
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (!config.enableAutoSave || !isDirty) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveFormData();
    }, config.autoSaveInterval);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, isDirty, config.enableAutoSave, config.autoSaveInterval]);

  // Track form events
  const trackFormEvent = useCallback((
    eventType: FormAnalyticsEvent['eventType'],
    fieldName?: string,
    value?: string | number | boolean,
    metadata?: Record<string, string | number | boolean>
  ) => {
    const event: FormAnalyticsEvent = {
      eventType,
      stepName: currentStep,
      fieldName,
      value,
      timestamp: Date.now(),
      sessionId: sessionIdRef.current,
      metadata,
    };

    setAnalytics(prev => [...prev, event]);

    if (config.enableAnalytics) {
      trackEvent(eventType, {
        step: currentStep,
        field: fieldName,
        value: value?.toString(),
        sessionId: sessionIdRef.current,
        ...metadata,
      });
    }
  }, [currentStep, config.enableAnalytics, trackEvent]);

  // Save form data to local storage
  const saveFormData = useCallback(() => {
    if (!config.enableAutoSave) return;

    const saveData: AutoSaveData = {
      formData,
      timestamp: Date.now(),
      stepProgress: FORM_STEPS.slice(0, FORM_STEPS.indexOf(currentStep) + 1),
      sessionId: sessionIdRef.current,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    setAutoSaveData(saveData);
    setLastSaved(Date.now());
    setIsDirty(false);

    trackFormEvent('auto_saved', undefined, undefined, {
      dataSize: JSON.stringify(formData).length,
    });
  }, [formData, currentStep, config.enableAutoSave, setAutoSaveData, trackFormEvent]);

  // Update form data
  const updateFormData = useCallback(<K extends keyof ContactFormData>(
    section: K,
    data: Partial<ContactFormData[K]> | ContactFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
    setIsDirty(true);

    // Clear errors for updated fields
    const updatedFields = Object.keys(data as object);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[`${section}.${field}`];
      });
      return newErrors;
    });

    trackFormEvent('field_changed', `${section}`, undefined, {
      fieldsUpdated: updatedFields.length,
    });
  }, [trackFormEvent]);

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    const stepData = {
      personalInfo: formData.personalInfo,
      businessInfo: formData.businessInfo,
      interests: formData.interests,
      consent: formData.consent,
      metadata: formData.metadata,
    };

    const result = validateStep(currentStep, stepData);

    if (!result.success) {
      const newErrors: Record<string, string[]> = {};
      result.error.errors.forEach(error => {
        const path = error.path.join('.');
        if (!newErrors[path]) {
          newErrors[path] = [];
        }
        newErrors[path].push(error.message);
      });

      setErrors(newErrors);
      trackFormEvent('validation_error', currentStep, undefined, {
        errorCount: result.error.errors.length,
      });

      return false;
    }

    setErrors({});
    return true;
  }, [currentStep, formData, trackFormEvent]);

  // Navigation functions
  const canNavigateToStep = useCallback((targetStep: FormStep): boolean => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    const targetIndex = FORM_STEPS.indexOf(targetStep);

    // Can always go back
    if (targetIndex < currentIndex) return true;

    // Can only go forward if current step is valid
    if (targetIndex === currentIndex + 1) {
      return validateCurrentStep();
    }

    // Can't skip steps
    return false;
  }, [currentStep, validateCurrentStep]);

  const navigateToStep = useCallback((targetStep: FormStep) => {
    if (!canNavigateToStep(targetStep)) return false;

    const previousStep = currentStep;
    setCurrentStep(targetStep);

    trackFormEvent('step_entered', targetStep);

    if (onStepChange) {
      onStepChange(targetStep, formData);
    }

    return true;
  }, [currentStep, canNavigateToStep, formData, onStepChange, trackFormEvent]);

  const nextStep = useCallback(() => {
    if (!validateCurrentStep()) return false;

    const currentIndex = FORM_STEPS.indexOf(currentStep);
    if (currentIndex < FORM_STEPS.length - 1) {
      const nextStepName = FORM_STEPS[currentIndex + 1];
      return navigateToStep(nextStepName);
    }

    return false;
  }, [currentStep, navigateToStep, validateCurrentStep]);

  const previousStep = useCallback(() => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStepName = FORM_STEPS[currentIndex - 1];
      return navigateToStep(prevStepName);
    }
    return false;
  }, [currentStep, navigateToStep]);

  // Form submission
  const submitForm = useCallback(async (): Promise<FormSubmissionResult> => {
    if (isSubmitting) {
      throw new Error('Form is already being submitted');
    }

    setIsSubmitting(true);
    trackFormEvent('form_submit');

    try {
      // Final validation
      if (!validateCurrentStep()) {
        throw new Error('Form validation failed');
      }

      // Business rules validation
      const businessRulesResult = validateBusinessRules(formData as any);
      if (!businessRulesResult.valid) {
        console.warn('Business rules warnings:', businessRulesResult.warnings);
      }

      // Prepare submission data
      const submissionId = generateSubmissionId();
      const leadScore = calculateLeadScore(formData as any);
      const urgencyLevel = calculateUrgencyLevel(formData as any);

      const submissionData: N8nContactFormRequest = {
        webhookSource: 'vendas-ia-website',
        submissionId,
        timestamp: new Date().toISOString(),
        personalInfo: formData.personalInfo!,
        businessInfo: formData.businessInfo,
        interests: formData.interests,
        consent: {
          ...formData.consent!,
          consentTimestamp: new Date().toISOString(),
          ipAddress: await getUserIP(),
        },
        metadata: {
          ...formData.metadata!,
          sessionDuration: Date.now() - formStartTimeRef.current,
          formStartTime: new Date(formStartTimeRef.current).toISOString(),
          userAgent: navigator.userAgent,
        },
        urgencyLevel: urgencyLevel as any,
        leadScore,
        preferredContact: determinePreferredContact(formData),
        message: formData.message,
      };

      // Submit to n8n
      const response = await submitContactFormToN8n(submissionData);

      const result: FormSubmissionResult = {
        success: true,
        submissionId,
        leadScore,
        urgencyLevel: urgencyLevel as any,
        estimatedResponseTime: response.estimatedResponseTime,
        nextSteps: response.nextSteps,
        contactMethods: Object.keys(response.contactMethods || {}).filter(
          key => response.contactMethods?.[key as keyof typeof response.contactMethods]
        ) as any,
        message: response.message,
      };

      setSubmissionResult(result);
      setIsSubmitted(true);

      // Clear auto-saved data on successful submission
      if (config.enableAutoSave) {
        setAutoSaveData(null);
      }

      trackFormEvent('form_submitted', undefined, undefined, {
        leadScore,
        urgencyLevel,
        submissionId,
      });

      if (onSubmissionSuccess) {
        onSubmissionSuccess(result);
      }

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      const result: FormSubmissionResult = {
        success: false,
        errors: { general: [errorMessage] },
        message: 'Erro ao enviar formulário. Tente novamente.',
      };

      setSubmissionResult(result);

      trackFormEvent('form_error', undefined, undefined, {
        errorMessage,
      });

      if (onSubmissionError) {
        onSubmissionError(error instanceof Error ? error : new Error(errorMessage));
      }

      throw error;

    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    isSubmitting,
    currentStep,
    config.enableAutoSave,
    setAutoSaveData,
    onSubmissionSuccess,
    onSubmissionError,
    validateCurrentStep,
    trackFormEvent,
  ]);

  // Utility functions
  const getFormProgress = useCallback((): number => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    return ((currentIndex + 1) / FORM_STEPS.length) * 100;
  }, [currentStep]);

  const getCompletedSteps = useCallback((): FormStep[] => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    return FORM_STEPS.slice(0, currentIndex);
  }, [currentStep]);

  const getDataQuality = useCallback(() => {
    if (!formData.personalInfo) return null;
    return calculateDataQuality(formData as any);
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setCurrentStep('personal');
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmissionResult(null);
    setIsDirty(false);

    if (config.enableAutoSave) {
      setAutoSaveData(null);
    }

    trackFormEvent('form_reset');
  }, [initialData, config.enableAutoSave, setAutoSaveData, trackFormEvent]);

  // Navigation state
  const navigationState: FormNavigationState = {
    currentStep,
    availableSteps: FORM_STEPS,
    completedSteps: getCompletedSteps(),
    canNavigateBack: FORM_STEPS.indexOf(currentStep) > 0,
    canNavigateForward: FORM_STEPS.indexOf(currentStep) < FORM_STEPS.length - 1 && validateCurrentStep(),
    canSkipStep: false, // Never allow skipping in this form
    nextStep: FORM_STEPS[FORM_STEPS.indexOf(currentStep) + 1],
    previousStep: FORM_STEPS[FORM_STEPS.indexOf(currentStep) - 1],
  };

  // Return hook interface
  return {
    // State
    currentStep,
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submissionResult,
    isDirty,
    lastSaved,

    // Navigation
    navigation: navigationState,
    canNavigateToStep,
    navigateToStep,
    nextStep,
    previousStep,

    // Data management
    updateFormData,
    resetForm,

    // Validation
    validateCurrentStep,
    getDataQuality,

    // Submission
    submitForm,

    // Utilities
    getFormProgress,
    getCompletedSteps,

    // Analytics
    analytics,
    sessionId: sessionIdRef.current,

    // Configuration
    config,
  };
}

// Helper functions
async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return '0.0.0.0'; // Fallback
  }
}

function determinePreferredContact(formData: Partial<ContactFormData>): 'email' | 'whatsapp' | 'phone' {
  if (formData.personalInfo?.whatsappOptIn) return 'whatsapp';
  if (formData.interests?.timeline === 'immediate') return 'whatsapp';
  return 'email';
}

// Export types for external use
export type ProgressiveFormReturn = ReturnType<typeof useProgressiveForm>;
export type FormNavigationState = {
  currentStep: FormStep;
  availableSteps: FormStep[];
  completedSteps: FormStep[];
  canNavigateBack: boolean;
  canNavigateForward: boolean;
  canSkipStep: boolean;
  nextStep?: FormStep;
  previousStep?: FormStep;
};