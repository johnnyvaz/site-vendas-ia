import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  User, 
  Building, 
  Target, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ProductInterest, UrgencyLevel } from '@/types/contact';

interface ProgressiveContactFormProps {
  className?: string;
  onSubmissionSuccess?: () => void;
  showTitle?: boolean;
  compactMode?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  industry: string;
  teamSize: string;
  productInterest: string;
  urgencyLevel: string;
  challenges: string;
  budget: string;
  preferredContact: string;
  bestTimeToCall: string;
  lgpdConsent: boolean;
  marketingConsent: boolean;
}

const ProgressiveContactForm: React.FC<ProgressiveContactFormProps> = ({
  className = '',
  onSubmissionSuccess,
  showTitle = true,
  compactMode = false
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    industry: '',
    teamSize: '',
    productInterest: '',
    urgencyLevel: '',
    challenges: '',
    budget: '',
    preferredContact: '',
    bestTimeToCall: '',
    lgpdConsent: false,
    marketingConsent: false
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { trackEvent } = useAnalytics();

  const steps = [
    {
      id: 'basic',
      title: 'Informações Básicas',
      description: 'Como podemos te chamar?',
      icon: User,
      fields: ['name', 'email', 'phone']
    },
    {
      id: 'business',
      title: 'Seu Negócio',
      description: 'Conte sobre sua empresa',
      icon: Building,
      fields: ['company', 'role', 'industry', 'teamSize']
    },
    {
      id: 'needs',
      title: 'Suas Necessidades',
      description: 'Como podemos ajudar?',
      icon: Target,
      fields: ['productInterest', 'urgencyLevel', 'challenges', 'budget']
    },
    {
      id: 'preferences',
      title: 'Preferências',
      description: 'Como prefere ser contatado?',
      icon: MessageSquare,
      fields: ['preferredContact', 'bestTimeToCall', 'lgpdConsent', 'marketingConsent']
    }
  ];

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentStepConfig = steps[currentStep];
    const errors: Record<string, string> = {};
    let isValid = true;

    currentStepConfig.fields.forEach(field => {
      if (field === 'name' && !formData.name.trim()) {
        errors.name = 'Nome é obrigatório';
        isValid = false;
      }
      if (field === 'email' && (!formData.email.trim() || !formData.email.includes('@'))) {
        errors.email = 'E-mail válido é obrigatório';
        isValid = false;
      }
      if (field === 'phone' && !formData.phone.trim()) {
        errors.phone = 'Telefone é obrigatório';
        isValid = false;
      }
      if (field === 'company' && !formData.company.trim()) {
        errors.company = 'Nome da empresa é obrigatório';
        isValid = false;
      }
      if (field === 'role' && !formData.role.trim()) {
        errors.role = 'Cargo é obrigatório';
        isValid = false;
      }
      if (field === 'industry' && !formData.industry) {
        errors.industry = 'Segmento é obrigatório';
        isValid = false;
      }
      if (field === 'productInterest' && !formData.productInterest) {
        errors.productInterest = 'Produto de interesse é obrigatório';
        isValid = false;
      }
      if (field === 'urgencyLevel' && !formData.urgencyLevel) {
        errors.urgencyLevel = 'Nível de urgência é obrigatório';
        isValid = false;
      }
      if (field === 'preferredContact' && !formData.preferredContact) {
        errors.preferredContact = 'Forma de contato preferida é obrigatória';
        isValid = false;
      }
      if (field === 'lgpdConsent' && !formData.lgpdConsent) {
        errors.lgpdConsent = 'Aceitar o tratamento de dados é obrigatório';
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      trackEvent('form_interaction', {
        action: 'step_completed',
        step: currentStep + 1,
        stepName: steps[currentStep].id
      });
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    trackEvent('form_interaction', {
      action: 'step_back',
      step: currentStep + 1,
      stepName: steps[currentStep].id
    });
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate form submission - replace with actual n8n integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      trackEvent('conversion', {
        type: 'form_submission',
        product: formData.productInterest || 'unknown',
        urgency: formData.urgencyLevel || 'unknown'
      });

      onSubmissionSuccess?.();
      
      // Redirect to WhatsApp for immediate contact
      if (formData.urgencyLevel === 'urgent' || formData.urgencyLevel === 'high') {
        const message = `Olá! Acabei de preencher o formulário de contato. Meu nome é ${formData.name} e tenho interesse em ${formData.productInterest}. Urgência: ${formData.urgencyLevel}. Podemos conversar?`;
        
        const whatsappUrl = generateWhatsAppLink({
          message,
          leadData: {
            name: formData.name,
            company: formData.company,
            interest: formData.productInterest as ProductInterest,
            urgencyLevel: formData.urgencyLevel as UrgencyLevel,
            source: 'progressive-form'
          },
          autoTrack: true
        });
        
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      setSubmitError('Erro ao enviar formulário. Tente novamente ou entre em contato via WhatsApp.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Seu nome completo"
                className={fieldErrors.name ? 'border-red-500' : ''}
              />
              {fieldErrors.name && <p className="text-sm text-red-500 mt-1">{fieldErrors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">E-mail profissional *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="seu@email.com"
                className={fieldErrors.email ? 'border-red-500' : ''}
              />
              {fieldErrors.email && <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">WhatsApp *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(16) 99999-9999"
                className={fieldErrors.phone ? 'border-red-500' : ''}
              />
              {fieldErrors.phone && <p className="text-sm text-red-500 mt-1">{fieldErrors.phone}</p>}
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Nome da empresa *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Nome da sua empresa"
                className={fieldErrors.company ? 'border-red-500' : ''}
              />
              {fieldErrors.company && <p className="text-sm text-red-500 mt-1">{fieldErrors.company}</p>}
            </div>

            <div>
              <Label htmlFor="role">Seu cargo *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => updateField('role', e.target.value)}
                placeholder="CEO, Gerente de Vendas, etc."
                className={fieldErrors.role ? 'border-red-500' : ''}
              />
              {fieldErrors.role && <p className="text-sm text-red-500 mt-1">{fieldErrors.role}</p>}
            </div>

            <div>
              <Label htmlFor="industry">Segmento da empresa *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => updateField('industry', value)}
              >
                <SelectTrigger className={fieldErrors.industry ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="servicos-financeiros">Serviços Financeiros</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="varejo">Varejo</SelectItem>
                  <SelectItem value="consultoria">Consultoria</SelectItem>
                  <SelectItem value="imobiliario">Imobiliário</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {fieldErrors.industry && <p className="text-sm text-red-500 mt-1">{fieldErrors.industry}</p>}
            </div>

            <div>
              <Label htmlFor="teamSize">Tamanho do time de vendas</Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) => updateField('teamSize', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho do time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Apenas eu</SelectItem>
                  <SelectItem value="2-5">2-5 pessoas</SelectItem>
                  <SelectItem value="6-10">6-10 pessoas</SelectItem>
                  <SelectItem value="11-25">11-25 pessoas</SelectItem>
                  <SelectItem value="26+">26+ pessoas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'needs':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="productInterest">Principal interesse *</Label>
              <Select
                value={formData.productInterest}
                onValueChange={(value) => updateField('productInterest', value)}
              >
                <SelectTrigger className={fieldErrors.productInterest ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione o produto de interesse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disparo-rapido">Disparo Rápido - WhatsApp Automation</SelectItem>
                  <SelectItem value="leads-rapido">Leads Rápido - Geração de Leads</SelectItem>
                  <SelectItem value="sdr-virtual">SDR Virtual - Vendedor IA</SelectItem>
                  <SelectItem value="custom-solution">Solução Personalizada</SelectItem>
                </SelectContent>
              </Select>
              {fieldErrors.productInterest && <p className="text-sm text-red-500 mt-1">{fieldErrors.productInterest}</p>}
            </div>

            <div>
              <Label htmlFor="urgencyLevel">Urgência da necessidade *</Label>
              <div className="space-y-2 mt-2">
                {[
                  { value: 'low', label: 'Baixa - Explorando opções', color: 'bg-gray-100 text-gray-800' },
                  { value: 'medium', label: 'Média - Preciso em algumas semanas', color: 'bg-blue-100 text-blue-800' },
                  { value: 'high', label: 'Alta - Preciso em poucos dias', color: 'bg-orange-100 text-orange-800' },
                  { value: 'urgent', label: 'Urgente - Preciso imediatamente', color: 'bg-red-100 text-red-800' }
                ].map((option) => (
                  <div key={option.value} 
                       className={`p-3 rounded-lg border cursor-pointer transition-all ${
                         formData.urgencyLevel === option.value 
                           ? 'border-blue-500 bg-blue-50' 
                           : 'border-gray-200 hover:border-gray-300'
                       }`}
                       onClick={() => updateField('urgencyLevel', option.value)}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        formData.urgencyLevel === option.value ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <Badge variant="secondary" className={option.color}>
                        {option.label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {fieldErrors.urgencyLevel && <p className="text-sm text-red-500 mt-1">{fieldErrors.urgencyLevel}</p>}
            </div>

            <div>
              <Label htmlFor="challenges">Principais desafios atuais</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => updateField('challenges', e.target.value)}
                placeholder="Descreva os principais desafios que sua empresa enfrenta..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="budget">Orçamento disponível</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => updateField('budget', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a faixa de orçamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate-500">Até R$ 500/mês</SelectItem>
                  <SelectItem value="500-1000">R$ 500 - R$ 1.000/mês</SelectItem>
                  <SelectItem value="1000-2000">R$ 1.000 - R$ 2.000/mês</SelectItem>
                  <SelectItem value="2000-5000">R$ 2.000 - R$ 5.000/mês</SelectItem>
                  <SelectItem value="5000+">Acima de R$ 5.000/mês</SelectItem>
                  <SelectItem value="conversar">Prefiro conversar sobre isso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="preferredContact">Como prefere ser contatado? *</Label>
              <Select
                value={formData.preferredContact}
                onValueChange={(value) => updateField('preferredContact', value)}
              >
                <SelectTrigger className={fieldErrors.preferredContact ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione a forma preferida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                </SelectContent>
              </Select>
              {fieldErrors.preferredContact && <p className="text-sm text-red-500 mt-1">{fieldErrors.preferredContact}</p>}
            </div>

            <div>
              <Label htmlFor="bestTimeToCall">Melhor horário para contato</Label>
              <Select
                value={formData.bestTimeToCall}
                onValueChange={(value) => updateField('bestTimeToCall', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o melhor horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manha">Manhã (8h às 12h)</SelectItem>
                  <SelectItem value="tarde">Tarde (12h às 18h)</SelectItem>
                  <SelectItem value="noite">Noite (18h às 22h)</SelectItem>
                  <SelectItem value="qualquer">Qualquer horário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="lgpdConsent"
                  checked={formData.lgpdConsent}
                  onCheckedChange={(checked) => updateField('lgpdConsent', checked)}
                  className={fieldErrors.lgpdConsent ? 'border-red-500' : ''}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="lgpdConsent" className="text-sm font-normal">
                    Aceito o tratamento dos meus dados pessoais conforme a LGPD *
                  </Label>
                  <p className="text-xs text-gray-600">
                    Seus dados serão usados apenas para contato comercial e não serão compartilhados.
                  </p>
                </div>
              </div>
              {fieldErrors.lgpdConsent && <p className="text-sm text-red-500">{fieldErrors.lgpdConsent}</p>}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => updateField('marketingConsent', checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="marketingConsent" className="text-sm font-normal">
                    Aceito receber comunicações de marketing
                  </Label>
                  <p className="text-xs text-gray-600">
                    Dicas, novidades e ofertas especiais (opcional).
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const StepIcon = steps[currentStep].icon;

  if (compactMode) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Fale Conosco</CardTitle>
          <CardDescription>
            Preencha para receber uma consulta gratuita
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
          <Input
            placeholder="Seu e-mail"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <Input
            placeholder="Seu WhatsApp"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
            ) : (
              <>Solicitar Contato</>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Vamos Conversar?</h2>
          <p className="text-gray-600">
            Preencha o formulário e receba uma consultoria gratuita personalizada
          </p>
        </div>
      )}

      <Card>
        <CardHeader className="pb-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <StepIcon className="w-6 h-6 text-green-600" />
            <div>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {submitError && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enviar Solicitação
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressiveContactForm;