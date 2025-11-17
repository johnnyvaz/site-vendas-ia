// LGPD Consent Banner Component for Vendas.IA
// Handles cookie consent and data protection compliance for Brazilian market

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  Cookie,
  Settings,
  Check,
  X,
  Info,
  Lock,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ConsentPreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: number;
  version: string;
}

interface ConsentBannerProps {
  position?: 'bottom' | 'top';
  compactMode?: boolean;
  showAdvancedOptions?: boolean;
  onConsentChange?: (preferences: ConsentPreferences) => void;
  privacyPolicyUrl?: string;
  className?: string;
}

const CONSENT_VERSION = '1.0.0';
const CONSENT_KEY = 'vendas-ia-lgpd-consent';

// Default consent preferences
const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
  timestamp: Date.now(),
  version: CONSENT_VERSION,
};

// Cookie categories with descriptions
const COOKIE_CATEGORIES = {
  necessary: {
    title: 'Cookies Necessários',
    description: 'Essenciais para o funcionamento do site',
    icon: Lock,
    examples: ['Autenticação', 'Preferências de idioma', 'Carrinho de compras'],
    required: true,
  },
  analytics: {
    title: 'Cookies Analíticos',
    description: 'Nos ajudam a entender como você usa o site',
    icon: BarChart3,
    examples: ['Google Analytics', 'Métricas de performance', 'Heatmaps'],
    required: false,
  },
  marketing: {
    title: 'Cookies de Marketing',
    description: 'Usados para personalizar anúncios e conteúdo',
    icon: MessageSquare,
    examples: ['Pixels de conversão', 'Retargeting', 'Campanhas publicitárias'],
    required: false,
  },
  personalization: {
    title: 'Cookies de Personalização',
    description: 'Lembram suas preferências para melhorar sua experiência',
    icon: Users,
    examples: ['Conteúdo personalizado', 'Recomendações', 'Interface adaptada'],
    required: false,
  },
} as const;

export function ConsentBanner({
  position = 'bottom',
  compactMode = false,
  showAdvancedOptions = true,
  onConsentChange,
  privacyPolicyUrl = '/politica-privacidade',
  className = '',
}: ConsentBannerProps) {
  const [preferences, setPreferences] = useLocalStorage<ConsentPreferences | null>(CONSENT_KEY, null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);

  // const { trackEvent, config: analyticsConfig } = useAnalytics();

  // Check if consent is needed
  useEffect(() => {
    const needsConsent = !preferences ||
                        preferences.version !== CONSENT_VERSION ||
                        Date.now() - preferences.timestamp > (365 * 24 * 60 * 60 * 1000); // 1 year

    setShowBanner(needsConsent);

    if (preferences) {
      setTempPreferences(preferences);
    }
  }, [preferences]);

  // Update analytics config based on consent
  useEffect(() => {
    if (preferences) {
      // Update analytics configuration
      if (analyticsConfig) {
        analyticsConfig.trackingConsent = preferences.analytics;
        analyticsConfig.enableTracking = preferences.analytics;
      }

      onConsentChange?.(preferences);
    }
  }, [preferences, analyticsConfig, onConsentChange]);

  const savePreferences = (newPreferences: ConsentPreferences) => {
    const updatedPreferences = {
      ...newPreferences,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
      necessary: true, // Always required
    };

    setPreferences(updatedPreferences);
    setShowBanner(false);
    setShowSettings(false);

    // Track consent decision
    trackEvent('consent_updated', {
      analytics: updatedPreferences.analytics,
      marketing: updatedPreferences.marketing,
      personalization: updatedPreferences.personalization,
      consentVersion: CONSENT_VERSION,
    });
  };

  const acceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };

    savePreferences(allAccepted);

    trackEvent('consent_all_accepted', {
      source: 'banner',
      consentVersion: CONSENT_VERSION,
    });
  };

  const acceptNecessaryOnly = () => {
    savePreferences(DEFAULT_PREFERENCES);

    trackEvent('consent_necessary_only', {
      source: 'banner',
      consentVersion: CONSENT_VERSION,
    });
  };

  const openSettings = () => {
    setShowSettings(true);
    setTempPreferences(preferences || DEFAULT_PREFERENCES);

    trackEvent('consent_settings_opened', {
      source: 'banner',
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(tempPreferences);

    trackEvent('consent_custom_saved', {
      analytics: tempPreferences.analytics,
      marketing: tempPreferences.marketing,
      personalization: tempPreferences.personalization,
      source: 'settings',
    });
  };

  const updatePreference = (category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>, value: boolean) => {
    if (category === 'necessary') return; // Cannot be disabled

    setTempPreferences(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  if (!showBanner) {
    return null;
  }

  const bannerContent = (
    <Card className={`
      shadow-lg border-orange-200
      ${position === 'bottom' ? 'rounded-t-lg rounded-b-none' : 'rounded-b-lg rounded-t-none'}
      ${className}
    `}>
      <CardContent className={`${compactMode ? 'p-4' : 'p-6'}`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Cookie className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Proteção de Dados (LGPD)
              </h3>
              <Badge variant="secondary" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Conformidade
              </Badge>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {compactMode ? (
                <>
                  Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
                  <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                    Política de Privacidade
                  </a>.
                </>
              ) : (
                <>
                  Respeitamos sua privacidade e estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  Usamos cookies e tecnologias similares para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego.
                  Você pode escolher quais tipos de cookies aceitar.{' '}
                  <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">
                    Saiba mais
                  </a>
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={acceptAll}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                size={compactMode ? 'sm' : 'default'}
              >
                <Check className="h-4 w-4 mr-2" />
                Aceitar Todos
              </Button>

              <Button
                variant="outline"
                onClick={acceptNecessaryOnly}
                size={compactMode ? 'sm' : 'default'}
              >
                <X className="h-4 w-4 mr-2" />
                Apenas Necessários
              </Button>

              {showAdvancedOptions && (
                <Dialog open={showSettings} onOpenChange={setShowSettings}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={openSettings}
                      size={compactMode ? 'sm' : 'default'}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </DialogTrigger>
                  <ConsentSettingsDialog
                    preferences={tempPreferences}
                    onPreferenceChange={updatePreference}
                    onSave={saveCustomPreferences}
                    privacyPolicyUrl={privacyPolicyUrl}
                  />
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`
      fixed z-50 left-0 right-0
      ${position === 'bottom' ? 'bottom-0' : 'top-0'}
    `}>
      {bannerContent}
    </div>
  );
}

// Settings dialog component
interface ConsentSettingsDialogProps {
  preferences: ConsentPreferences;
  onPreferenceChange: (category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>, value: boolean) => void;
  onSave: () => void;
  privacyPolicyUrl: string;
}

function ConsentSettingsDialog({
  preferences,
  onPreferenceChange,
  onSave,
  privacyPolicyUrl,
}: ConsentSettingsDialogProps) {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-orange-600" />
          <span>Configurações de Privacidade</span>
        </DialogTitle>
        <DialogDescription>
          Escolha quais tipos de cookies e dados você permite que coletemos.
          Isso nos ajuda a fornecer uma melhor experiência personalizada.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => {
          const CategoryIcon = category.icon;
          const isChecked = preferences[key as keyof ConsentPreferences] as boolean;

          return (
            <div key={key} className="space-y-3">
              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-3 flex-1">
                  <Checkbox
                    id={key}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      onPreferenceChange(key as keyof Omit<ConsentPreferences, 'timestamp' | 'version'>, !!checked)
                    }
                    disabled={category.required}
                  />
                  <div className="flex items-center space-x-2">
                    <CategoryIcon className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {category.title}
                        {category.required && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Obrigatório
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-10 space-y-2">
                <p className="text-xs text-gray-500">
                  <strong>Exemplos:</strong> {category.examples.join(', ')}
                </p>
              </div>

              {key !== 'personalization' && <Separator />}
            </div>
          );
        })}

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 mb-1">
                Seus Direitos Sob a LGPD
              </h4>
              <p className="text-blue-800 mb-2">
                Você tem o direito de acessar, corrigir, excluir ou transferir seus dados pessoais.
                Entre em contato conosco para exercer esses direitos.
              </p>
              <p className="text-blue-700 text-xs">
                <strong>Contato:</strong> contato@johnnyvaz.com.br | +55 16 99778-7674
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p>
            <strong>Versão da política:</strong> {CONSENT_VERSION}
          </p>
        </div>
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button variant="outline" asChild>
          <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4 mr-2" />
            Política Completa
          </a>
        </Button>
        <Button onClick={onSave} className="bg-orange-600 hover:bg-orange-700">
          <Check className="h-4 w-4 mr-2" />
          Salvar Preferências
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Consent status indicator for footer or settings
export function ConsentStatus({
  onOpenSettings,
  className = '',
}: {
  onOpenSettings?: () => void;
  className?: string;
}) {
  const [preferences] = useLocalStorage<ConsentPreferences | null>(CONSENT_KEY, null);
  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);

  if (!preferences) return null;

  const handleOpenSettings = () => {
    setTempPreferences(preferences);
    setShowSettings(true);
    onOpenSettings?.();
  };

  const updatePreference = (category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>, value: boolean) => {
    if (category === 'necessary') return;
    setTempPreferences(prev => ({ ...prev, [category]: value }));
  };

  const savePreferences = () => {
    // This would update the global preferences
    setShowSettings(false);
  };

  const activePreferences = Object.entries(preferences)
    .filter(([key, value]) => key !== 'timestamp' && key !== 'version' && value)
    .length;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Shield className="h-4 w-4 text-green-600" />
      <span className="text-sm text-gray-600">
        Privacidade: {activePreferences}/4 categorias ativas
      </span>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" onClick={handleOpenSettings}>
            <Settings className="h-3 w-3 mr-1" />
            Configurar
          </Button>
        </DialogTrigger>
        <ConsentSettingsDialog
          preferences={tempPreferences}
          onPreferenceChange={updatePreference}
          onSave={savePreferences}
          privacyPolicyUrl="/politica-privacidade"
        />
      </Dialog>
    </div>
  );
}

export default ConsentBanner;