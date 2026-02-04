/**
 * LGPD Consent Banner Component for Vendas.IA
 * Handles cookie consent with REAL blocking of scripts/cookies
 * Integrates with useConsentManager for actual enforcement
 */

import { useState, useEffect } from 'react';
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
  Download,
  Trash2,
} from 'lucide-react';
import { useConsentManager, ConsentPreferences } from '@/hooks/useConsentManager';

interface ConsentBannerProps {
  position?: 'bottom' | 'top';
  compactMode?: boolean;
  showAdvancedOptions?: boolean;
  onConsentChange?: (preferences: ConsentPreferences) => void;
  privacyPolicyUrl?: string;
  className?: string;
}

// Cookie categories with descriptions
const COOKIE_CATEGORIES = {
  necessary: {
    title: 'Cookies Necessários',
    description: 'Essenciais para o funcionamento do site. Não podem ser desabilitados.',
    icon: Lock,
    examples: ['Autenticação', 'Preferências de sessão', 'Segurança'],
    required: true,
  },
  analytics: {
    title: 'Cookies Analíticos',
    description: 'Nos ajudam a entender como você usa o site para melhorar a experiência.',
    icon: BarChart3,
    examples: ['Google Analytics', 'Métricas de performance', 'Heatmaps'],
    required: false,
  },
  marketing: {
    title: 'Cookies de Marketing',
    description: 'Usados para personalizar anúncios e medir campanhas publicitárias.',
    icon: MessageSquare,
    examples: ['Facebook Pixel', 'Google Ads', 'Retargeting'],
    required: false,
  },
  personalization: {
    title: 'Cookies de Personalização',
    description: 'Lembram suas preferências para uma experiência personalizada.',
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
  const {
    preferences,
    showBanner,
    isInitialized,
    acceptAll,
    acceptNecessaryOnly,
    savePreferences,
    exportConsentData,
    revokeAll,
  } = useConsentManager({
    onConsentChange,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
    timestamp: Date.now(),
    version: '1.0.0',
  });

  // Sincronizar preferências temporárias com as salvas
  useEffect(() => {
    if (preferences) {
      setTempPreferences(preferences);
    }
  }, [preferences]);

  const handleAcceptAll = () => {
    acceptAll();
    console.log('[LGPD] Usuário aceitou todos os cookies');
  };

  const handleAcceptNecessaryOnly = () => {
    acceptNecessaryOnly();
    console.log('[LGPD] Usuário aceitou apenas cookies necessários');
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    setTempPreferences(preferences || {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: Date.now(),
      version: '1.0.0',
    });
  };

  const handleSaveCustomPreferences = () => {
    savePreferences(tempPreferences);
    setShowSettings(false);
    console.log('[LGPD] Usuário salvou preferências customizadas:', tempPreferences);
  };

  const updateTempPreference = (
    category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>,
    value: boolean
  ) => {
    if (category === 'necessary') return; // Não pode ser desabilitado

    setTempPreferences(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  // Não renderizar até inicializar ou se não precisa mostrar
  if (!isInitialized || !showBanner) {
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
                Bloqueio Real
              </Badge>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {compactMode ? (
                <>
                  Usamos cookies para melhorar sua experiência. Scripts de terceiros são{' '}
                  <strong>realmente bloqueados</strong> até você consentir.{' '}
                  <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                    Política de Privacidade
                  </a>.
                </>
              ) : (
                <>
                  Respeitamos sua privacidade conforme a Lei Geral de Proteção de Dados (LGPD).
                  Scripts de analytics e marketing são <strong>realmente bloqueados</strong> até você dar consentimento explícito.
                  Você pode escolher quais tipos de cookies aceitar.{' '}
                  <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">
                    Saiba mais
                  </a>
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptAll}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                size={compactMode ? 'sm' : 'default'}
              >
                <Check className="h-4 w-4 mr-2" />
                Aceitar Todos
              </Button>

              <Button
                variant="outline"
                onClick={handleAcceptNecessaryOnly}
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
                      onClick={handleOpenSettings}
                      size={compactMode ? 'sm' : 'default'}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </DialogTrigger>
                  <ConsentSettingsDialog
                    preferences={tempPreferences}
                    onPreferenceChange={updateTempPreference}
                    onSave={handleSaveCustomPreferences}
                    onExport={exportConsentData}
                    onRevoke={revokeAll}
                    privacyPolicyUrl={privacyPolicyUrl}
                    hasExistingConsent={preferences !== null}
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
  onPreferenceChange: (
    category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>,
    value: boolean
  ) => void;
  onSave: () => void;
  onExport: () => void;
  onRevoke: () => void;
  privacyPolicyUrl: string;
  hasExistingConsent: boolean;
}

function ConsentSettingsDialog({
  preferences,
  onPreferenceChange,
  onSave,
  onExport,
  onRevoke,
  privacyPolicyUrl,
  hasExistingConsent,
}: ConsentSettingsDialogProps) {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-orange-600" />
          <span>Configurações de Privacidade</span>
        </DialogTitle>
        <DialogDescription>
          Escolha quais tipos de cookies aceitar. Scripts são <strong>realmente bloqueados</strong> até você consentir.
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
                      onPreferenceChange(
                        key as keyof Omit<ConsentPreferences, 'timestamp' | 'version'>,
                        !!checked
                      )
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

        {/* Status do bloqueio */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-green-900 mb-1">
                Bloqueio Real Ativo
              </h4>
              <p className="text-green-800">
                Scripts de terceiros (Google Analytics, Facebook Pixel, etc.) são <strong>realmente bloqueados</strong> até
                você dar consentimento. Cookies existentes são removidos quando você revoga permissões.
              </p>
            </div>
          </div>
        </div>

        {/* Direitos LGPD */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 mb-1">
                Seus Direitos Sob a LGPD
              </h4>
              <p className="text-blue-800 mb-2">
                Você tem o direito de acessar, corrigir, excluir ou transferir seus dados pessoais.
              </p>
              <p className="text-blue-700 text-xs">
                <strong>Contato:</strong> contato@johnnyvaz.com.br | +55 16 99778-7674
              </p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        {hasExistingConsent && (
          <>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Dados
            </Button>
            <Button variant="outline" size="sm" onClick={onRevoke} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Revogar Tudo
            </Button>
          </>
        )}
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
  const { preferences, revokeAll, exportConsentData } = useConsentManager();
  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
    timestamp: Date.now(),
    version: '1.0.0',
  });

  useEffect(() => {
    if (preferences) {
      setTempPreferences(preferences);
    }
  }, [preferences]);

  if (!preferences) return null;

  const handleOpenSettings = () => {
    setTempPreferences(preferences);
    setShowSettings(true);
    onOpenSettings?.();
  };

  const updatePreference = (
    category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>,
    value: boolean
  ) => {
    if (category === 'necessary') return;
    setTempPreferences(prev => ({ ...prev, [category]: value }));
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
          onSave={() => setShowSettings(false)}
          onExport={exportConsentData}
          onRevoke={revokeAll}
          privacyPolicyUrl="/politica-privacidade"
          hasExistingConsent={true}
        />
      </Dialog>
    </div>
  );
}

export default ConsentBanner;
