// Contact Form Component for Vendas.IA
// Multi-step progressive form with LGPD compliance and n8n integration

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User,
  Building,
  Heart,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Mail,
  Phone,
  AlertCircle,
  Save,
  Clock
} from 'lucide-react';
import { useProgressiveForm } from '@/hooks/useProgressiveForm';
import { useAnalytics } from '@/hooks/useAnalytics';
import { handleContactFormSubmission } from '@/lib/form-handlers';
import type { FormStep, ContactFormData, FormSubmissionResult } from '@/types/contact';
import type { Industry, CompanySize } from '@/types/n8n';
import { BRAZILIAN_INDUSTRIES, COMPANY_SIZES } from '@/types/products';

interface ContactFormProps {
  initialStep?: FormStep;
  onSubmissionSuccess?: (submissionId: string) => void;
  onSubmissionError?: (error: Error) => void;
  className?: string;
  showProgress?: boolean;
  compactMode?: boolean;
}

// Step configurations
const STEP_CONFIG = {
  personal: {
    title: 'Informações Pessoais',
    description: 'Como podemos entrar em contato com você?',
    icon: User,
    color: 'text-blue-600',
  },
  business: {
    title: 'Sobre sua Empresa',
    description: 'Conte-nos sobre seu negócio',
    icon: Building,
    color: 'text-green-600',
  },
  consent: {
    title: 'Consentimento LGPD',
    description: 'Autorização para uso dos dados',
    icon: Shield,
    color: 'text-orange-600',
  },
  review: {
    title: 'Revisão',
    description: 'Confirme suas informações',
    icon: CheckCircle,
    color: 'text-green-600',
  },
} as const;

export function ContactForm({
  initialStep = 'personal',
  onSubmissionSuccess,
  onSubmissionError,
  className = '',
  showProgress = true,
  compactMode = false,
}: ContactFormProps) {
  const { trackEvent, trackConversion } = useAnalytics();

  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submissionResult,
    isDirty,
    lastSaved,
    navigation,
    updateFormData,
    validateCurrentStep,
    nextStep,
    previousStep,
    submitForm,
    resetForm,
    getFormProgress,
  } = useProgressiveForm({
    initialData: { personalInfo: { name: '', email: '', phone: '' } },
    onStepChange: (step, data) => {
      // Calculate progress without circular dependency
      const steps = ['personal', 'business', 'consent', 'review'];
      const currentIndex = steps.indexOf(step);
      const progress = ((currentIndex + 1) / steps.length) * 100;
      
      trackEvent('form_interaction', {
        stepName: step,
        action: 'step_change',
        formProgress: progress,
      });
    },
    onSubmissionSuccess: (result) => {
      trackConversion({
        type: 'contact_form',
        value: result.leadScore || 50,
        currency: 'BRL',
        source: 'contact_form',
        medium: 'website',
        campaign: 'lead_capture'
      });
      onSubmissionSuccess?.(result.submissionId || '');
    },
    onSubmissionError: (error) => {
      trackEvent('error', {
        errorType: 'form_submission',
        errorMessage: error.message,
        stepName: currentStep,
      });
      onSubmissionError?.(error);
    },
  });

  const currentStepConfig = STEP_CONFIG[currentStep];
  const StepIcon = currentStepConfig.icon;

  // Auto-save indicator
  const [showAutoSave, setShowAutoSave] = useState(false);

  useEffect(() => {
    if (lastSaved && isDirty) {
      setShowAutoSave(true);
      const timer = setTimeout(() => setShowAutoSave(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved, isDirty]);

  const handleNext = () => {
    trackEvent('form_interaction', {
      stepName: currentStep,
      action: 'next_step',
      formProgress: getFormProgress(),
    });
    nextStep();
  };

  const handlePrevious = () => {
    trackEvent('form_interaction', {
      stepName: currentStep,
      action: 'previous_step',
      formProgress: getFormProgress(),
    });
    previousStep();
  };

  const handleSubmit = async () => {
    try {
      // Use the new form handler
      const result = await handleContactFormSubmission(formData);
      
      if (result.success) {
        onSubmissionSuccess?.(result.submissionId);
        
        // Track successful form submission
        trackConversion({
          type: 'contact_form',
          value: 100,
          currency: 'BRL',
          source: 'website',
          medium: 'contact-form',
          leadId: result.submissionId,
        });
      } else {
        // Handle submission errors
        console.error('Form submission failed:', result.message);
        // The hook should handle the error display
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 'business':
        return <BusinessInfoStep formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 'consent':
        return <ConsentStep formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 'review':
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  if (isSubmitted && submissionResult?.success) {
    return <SuccessMessage submissionResult={submissionResult} />;
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso do Formulário</span>
            <span>{Math.round(getFormProgress())}%</span>
          </div>
          <Progress value={getFormProgress()} className="h-2" />
        </div>
      )}

      {/* Auto-save indicator */}
      {showAutoSave && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <Save className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Dados salvos automaticamente
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-100`}>
              <StepIcon className={`h-6 w-6 ${currentStepConfig.color}`} />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">
                {currentStepConfig.title}
              </CardTitle>
              <CardDescription>
                {currentStepConfig.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error display */}
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Por favor, corrija os erros abaixo antes de continuar.
              </AlertDescription>
            </Alert>
          )}

          {/* Step content */}
          {renderStepContent()}

          {/* Submission error */}
          {submissionResult && !submissionResult.success && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {submissionResult.message || 'Erro ao enviar formulário. Tente novamente.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!navigation.canNavigateBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex space-x-2">
            {currentStep === 'review' ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Formulário
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!navigation.canNavigateForward || !validateCurrentStep()}
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// Step Components
interface StepProps {
  formData: Partial<ContactFormData>;
  updateFormData: <K extends keyof ContactFormData>(section: K, data: Partial<ContactFormData[K]>) => void;
  errors: Record<string, string[]>;
}

interface SimpleStepProps {
  formData: Partial<ContactFormData>;
  updateFormData: (field: string, value: string | boolean | string[]) => void;
  errors: Record<string, string[]>;
}

function PersonalInfoStep({ formData, updateFormData, errors }: StepProps) {
  const handleWhatsappOptIn = (checked: boolean | string) => {
    updateFormData('personalInfo', { whatsappOptIn: !!checked });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            value={formData.personalInfo?.name || ''}
            onChange={(e) => updateFormData('personalInfo', { name: e.target.value })}
            placeholder="Seu nome completo"
            className={errors['personalInfo.name'] ? 'border-red-500' : ''}
          />
          {errors['personalInfo.name'] && (
            <p className="text-sm text-red-600">{errors['personalInfo.name'][0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Cargo/Posição</Label>
          <Input
            id="position"
            value={formData.personalInfo?.position || ''}
            onChange={(e) => updateFormData('personalInfo', { position: e.target.value })}
            placeholder="Ex: CEO, Diretor de Vendas"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail Empresarial *</Label>
        <Input
          id="email"
          type="email"
          value={formData.personalInfo?.email || ''}
          onChange={(e) => updateFormData('personalInfo', { email: e.target.value })}
          placeholder="contato@suaempresa.com.br"
          className={errors['personalInfo.email'] ? 'border-red-500' : ''}
        />
        {errors['personalInfo.email'] && (
          <p className="text-sm text-red-600">{errors['personalInfo.email'][0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">WhatsApp/Telefone *</Label>
        <Input
          id="phone"
          value={formData.personalInfo?.phone || ''}
          onChange={(e) => updateFormData('personalInfo', { phone: e.target.value })}
          placeholder="(16) 99999-9999"
          className={errors['personalInfo.phone'] ? 'border-red-500' : ''}
        />
        {errors['personalInfo.phone'] && (
          <p className="text-sm text-red-600">{errors['personalInfo.phone'][0]}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="whatsappOptIn"
          checked={formData.personalInfo?.whatsappOptIn || false}
          onCheckedChange={handleWhatsappOptIn}
        />
        <Label htmlFor="whatsappOptIn" className="text-sm">
          Prefiro ser contatado pelo WhatsApp
        </Label>
      </div>
    </div>
  );
}

function BusinessInfoStep({ formData, updateFormData, errors }: StepProps) {
  const handleIndustryChange = (value: string) => {
    updateFormData('businessInfo', { industry: value as Industry });
  };

  const handleSizeChange = (value: string) => {
    updateFormData('businessInfo', { size: value as CompanySize });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">Nome da Empresa *</Label>
        <Input
          id="company"
          value={formData.businessInfo?.company || ''}
          onChange={(e) => updateFormData('businessInfo', { company: e.target.value })}
          placeholder="Nome da sua empresa"
          className={errors['businessInfo.company'] ? 'border-red-500' : ''}
        />
        {errors['businessInfo.company'] && (
          <p className="text-sm text-red-600">{errors['businessInfo.company'][0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industry">Setor/Indústria</Label>
          <Select
            value={formData.businessInfo?.industry || ''}
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              {BRAZILIAN_INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Tamanho da Empresa</Label>
          <Select
            value={formData.businessInfo?.size || ''}
            onValueChange={handleSizeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Nº de funcionários" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size} funcionários
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website da Empresa</Label>
        <Input
          id="website"
          value={formData.businessInfo?.website || ''}
          onChange={(e) => updateFormData('businessInfo', { website: e.target.value })}
          placeholder="https://www.suaempresa.com.br"
        />
      </div>
    </div>
  );
}



function ConsentStep({ formData, updateFormData, errors }: StepProps) {
  const handleLgpdConsent = (checked: boolean | string) => {
    updateFormData('consent', { lgpdConsent: !!checked as true });
  };

  const handleMarketingConsent = (checked: boolean | string) => {
    updateFormData('consent', { marketingConsent: !!checked });
  };

  const handleWhatsappConsent = (checked: boolean | string) => {
    updateFormData('consent', { whatsappConsent: !!checked });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          Proteção de Dados Pessoais (LGPD)
        </h3>
        <p className="text-blue-800 text-sm">
          Em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD),
          precisamos do seu consentimento para processar suas informações.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="lgpdConsent"
            checked={formData.consent?.lgpdConsent || false}
            onCheckedChange={handleLgpdConsent}
            className={errors['consent.lgpdConsent'] ? 'border-red-500' : ''}
          />
          <div className="space-y-1">
            <Label htmlFor="lgpdConsent" className="text-sm font-medium leading-none">
              Autorizo o tratamento dos meus dados pessoais *
            </Label>
            <p className="text-xs text-gray-600">
              Concordo que a Vendas.IA use meus dados para entrar em contato comigo
              sobre produtos e serviços relacionados à minha solicitação.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="marketingConsent"
            checked={formData.consent?.marketingConsent || false}
            onCheckedChange={handleMarketingConsent}
          />
          <div className="space-y-1">
            <Label htmlFor="marketingConsent" className="text-sm font-medium leading-none">
              Aceito receber comunicações de marketing
            </Label>
            <p className="text-xs text-gray-600">
              Posso receber e-mails e mensagens sobre novos produtos, dicas e conteúdos relevantes.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="whatsappConsent"
            checked={formData.consent?.whatsappConsent || false}
            onCheckedChange={handleWhatsappConsent}
          />
          <div className="space-y-1">
            <Label htmlFor="whatsappConsent" className="text-sm font-medium leading-none">
              Autorizo contato via WhatsApp
            </Label>
            <p className="text-xs text-gray-600">
              Posso receber mensagens no WhatsApp sobre minha solicitação e produtos da Vendas.IA.
            </p>
          </div>
        </div>
      </div>

      {errors['consent.lgpdConsent'] && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            O consentimento LGPD é obrigatório para prosseguir.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
        <p>
          <strong>Seus direitos:</strong> Você pode a qualquer momento solicitar acesso,
          correção ou exclusão dos seus dados pessoais entrando em contato conosco através
          do e-mail contato@johnnyvaz.com.br
        </p>
      </div>
    </div>
  );
}

function ReviewStep({ formData }: { formData: Partial<ContactFormData> }) {
  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Revise suas informações antes de enviar. Após o envio, entraremos em contato em até 24 horas.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Informações Pessoais</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Nome:</strong> {formData.personalInfo?.name}</p>
            <p><strong>E-mail:</strong> {formData.personalInfo?.email}</p>
            <p><strong>Telefone:</strong> {formData.personalInfo?.phone}</p>
            {formData.personalInfo?.position && (
              <p><strong>Cargo:</strong> {formData.personalInfo.position}</p>
            )}
          </div>
        </div>

        {formData.businessInfo?.company && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Informações da Empresa</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Empresa:</strong> {formData.businessInfo.company}</p>
              {formData.businessInfo.industry && (
                <p><strong>Setor:</strong> {formData.businessInfo.industry}</p>
              )}
              {formData.businessInfo.size && (
                <p><strong>Tamanho:</strong> {formData.businessInfo.size} funcionários</p>
              )}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

function SuccessMessage({ submissionResult }: { submissionResult: FormSubmissionResult }) {
  return (
    <Card className="text-center shadow-lg">
      <CardContent className="pt-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Formulário Enviado com Sucesso!
        </h2>
        <p className="text-gray-600 mb-6">
          Recebemos sua solicitação e entraremos em contato em breve.
        </p>

        {submissionResult.estimatedResponseTime && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-green-800">
              <strong>Tempo estimado de resposta:</strong> {submissionResult.estimatedResponseTime}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Falar no WhatsApp Agora
          </Button>
          <Button variant="outline" className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            Enviar por E-mail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactForm;