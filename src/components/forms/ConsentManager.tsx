import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Settings, 
  X, 
  CheckCircle, 
  Info, 
  Lock,
  Eye,
  Trash2,
  Download,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

interface ConsentData {
  options: ConsentOptions;
  timestamp: string;
  version: string;
  ip?: string;
  userAgent?: string;
}

interface LGPDConsentManagerProps {
  className?: string;
  variant?: 'banner' | 'modal' | 'inline';
  showOnFirstVisit?: boolean;
  companyName?: string;
  contactEmail?: string;
  privacyPolicyUrl?: string;
  onConsentChange?: (consent: ConsentData) => void;
  position?: 'top' | 'bottom' | 'center';
}

const CONSENT_VERSION = '1.0';
const CONSENT_STORAGE_KEY = 'vendas-ia-lgpd-consent';

const LGPDConsentManager: React.FC<LGPDConsentManagerProps> = ({
  className = '',
  variant = 'banner',
  showOnFirstVisit = true,
  companyName = 'Vendas.IA',
  contactEmail = 'contato@johnnyvaz.com.br',
  privacyPolicyUrl = '/privacidade',
  onConsentChange,
  position = 'bottom'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [storedConsent, setStoredConsent] = useLocalStorage<ConsentData | null>(CONSENT_STORAGE_KEY, null);
  
  const [consentOptions, setConsentOptions] = useState<ConsentOptions>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    personalization: false
  });

  const { trackEvent } = useAnalytics();

  // Check if consent is needed
  useEffect(() => {
    const shouldShow = showOnFirstVisit && (!storedConsent || shouldUpdateConsent(storedConsent));
    setIsVisible(shouldShow);
  }, [showOnFirstVisit, storedConsent]);

  // Load existing consent if available
  useEffect(() => {
    if (storedConsent?.options) {
      setConsentOptions(storedConsent.options);
    }
  }, [storedConsent]);

  const shouldUpdateConsent = (consent: ConsentData): boolean => {
    return consent.version !== CONSENT_VERSION;
  };

  const saveConsent = async (options: ConsentOptions, action: 'accept_all' | 'accept_necessary' | 'custom') => {
    const consentData: ConsentData = {
      options,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
      userAgent: navigator.userAgent
    };

    // Get user IP (optional)
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      consentData.ip = data.ip;
    } catch (error) {
      console.warn('Could not get user IP:', error);
    }

    setStoredConsent(consentData);
    setIsVisible(false);
    setShowSettings(false);

    // Track consent event
    trackEvent('consent_updated', {
      action,
      analytics: options.analytics,
      marketing: options.marketing,
      personalization: options.personalization,
      version: CONSENT_VERSION
    });

    onConsentChange?.(consentData);
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentOptions = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setConsentOptions(allAccepted);
    saveConsent(allAccepted, 'accept_all');
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: ConsentOptions = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    setConsentOptions(necessaryOnly);
    saveConsent(necessaryOnly, 'accept_necessary');
  };

  const handleCustomSave = () => {
    saveConsent(consentOptions, 'custom');
  };

  const updateConsentOption = (option: keyof ConsentOptions, value: boolean) => {
    if (option === 'necessary') return; // Cannot disable necessary cookies

    setConsentOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const getConsentDescription = (type: keyof ConsentOptions): { title: string; description: string; required: boolean } => {
    const descriptions = {
      necessary: {
        title: 'Cookies Necessários',
        description: 'Essenciais para o funcionamento básico do site. Não podem ser desabilitados.',
        required: true
      },
      analytics: {
        title: 'Cookies de Análise',
        description: 'Nos ajudam a entender como você usa nosso site para melhorar a experiência.',
        required: false
      },
      marketing: {
        title: 'Cookies de Marketing',
        description: 'Usados para mostrar anúncios relevantes e medir a eficácia das campanhas.',
        required: false
      },
      personalization: {
        title: 'Cookies de Personalização',
        description: 'Permitem uma experiência personalizada baseada nas suas preferências.',
        required: false
      }
    };

    return descriptions[type];
  };

  const exportConsentData = () => {
    if (!storedConsent) return;

    const dataStr = JSON.stringify(storedConsent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `lgpd-consent-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const deleteConsentData = () => {
    setStoredConsent(null);
    setIsVisible(true);
    trackEvent('consent_updated', {
      action: 'deleted',
      version: CONSENT_VERSION
    });
  };

  if (!isVisible && variant !== 'inline') return null;

  // Inline variant for settings/privacy pages
  if (variant === 'inline') {
    return (
      <Card className={cn('w-full max-w-2xl mx-auto', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Gerenciamento de Consentimento LGPD
          </CardTitle>
          <CardDescription>
            Gerencie suas preferências de privacidade e dados pessoais conforme a Lei Geral de Proteção de Dados.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Status */}
          {storedConsent && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Consentimento Ativo</span>
              </div>
              <p className="text-sm text-green-700">
                Dados coletados em: {new Date(storedConsent.timestamp).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}

          {/* Consent Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Suas Preferências</h3>
            {(Object.keys(consentOptions) as Array<keyof ConsentOptions>).map((option) => {
              const config = getConsentDescription(option);
              
              return (
                <div key={option} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={option}
                    checked={consentOptions[option]}
                    onCheckedChange={(checked) => updateConsentOption(option, checked as boolean)}
                    disabled={config.required}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <label htmlFor={option} className="font-medium text-sm">
                        {config.title}
                      </label>
                      {config.required && (
                        <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {config.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Button onClick={handleCustomSave} className="flex-1">
                Salvar Preferências
              </Button>
              <Button variant="outline" onClick={handleAcceptAll}>
                Aceitar Todos
              </Button>
            </div>

            {storedConsent && (
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={exportConsentData}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
                <Button variant="outline" size="sm" onClick={deleteConsentData}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Revogar Consentimento
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Settings Modal
  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações de Privacidade
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {(Object.keys(consentOptions) as Array<keyof ConsentOptions>).map((option) => {
              const config = getConsentDescription(option);
              
              return (
                <div key={option} className="flex items-start space-x-3">
                  <Checkbox
                    id={`modal-${option}`}
                    checked={consentOptions[option]}
                    onCheckedChange={(checked) => updateConsentOption(option, checked as boolean)}
                    disabled={config.required}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor={`modal-${option}`} className="font-medium text-sm flex items-center gap-2">
                      {config.title}
                      {config.required && (
                        <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
                      )}
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      {config.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCustomSave} className="flex-1">
                Salvar Preferências
              </Button>
              <Button variant="outline" onClick={handleAcceptAll}>
                Aceitar Todos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Banner variant
  const bannerClasses = cn(
    'fixed left-0 right-0 z-40 bg-white border shadow-lg',
    {
      'top-0 border-b': position === 'top',
      'bottom-0 border-t': position === 'bottom',
      'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg rounded-lg border': position === 'center'
    },
    className
  );

  return (
    <div className={bannerClasses}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Proteção de Dados Pessoais
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. 
              Você pode escolher quais tipos de cookies aceitar.
            </p>

            {/* Quick options for mobile */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleAcceptAll} size="sm" className="bg-blue-600 hover:bg-blue-700">
                Aceitar Todos
              </Button>
              <Button onClick={handleAcceptNecessary} variant="outline" size="sm">
                Apenas Necessários
              </Button>
              <Button onClick={() => setShowSettings(true)} variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Configurar
              </Button>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
              <a href={privacyPolicyUrl} className="hover:underline flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Política de Privacidade
              </a>
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Dados protegidos pela LGPD
              </span>
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3" />
                {contactEmail}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LGPDConsentManager;