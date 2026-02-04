/**
 * Hook de Gerenciamento de Consentimento LGPD
 * Integra o ConsentBanner com bloqueio real de cookies/scripts
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: number;
  version: string;
}

interface ConsentManagerConfig {
  version?: string;
  expiryDays?: number;
  onConsentChange?: (preferences: ConsentPreferences) => void;
}

interface LoadedScript {
  id: string;
  src: string;
  category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>;
}

const CONSENT_VERSION = '1.0.0';
const CONSENT_KEY = 'vendas-ia-lgpd-consent';
const LOADED_SCRIPTS_KEY = 'vendas-ia-loaded-scripts';

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
  timestamp: Date.now(),
  version: CONSENT_VERSION,
};

// Lista de cookies por categoria para limpeza
const COOKIE_PATTERNS: Record<string, RegExp[]> = {
  analytics: [
    /^_ga/,           // Google Analytics
    /^_gid/,          // Google Analytics
    /^_gat/,          // Google Analytics
    /^__utm/,         // Google Analytics (legacy)
    /^_hjid/,         // Hotjar
    /^_hjSession/,    // Hotjar
    /^mp_/,           // Mixpanel
    /^amplitude/,     // Amplitude
  ],
  marketing: [
    /^_fbp/,          // Facebook Pixel
    /^_fbc/,          // Facebook Click ID
    /^fr$/,           // Facebook
    /^_gcl_/,         // Google Ads
    /^_uet/,          // Bing Ads
    /^li_/,           // LinkedIn
    /^_pin_/,         // Pinterest
  ],
  personalization: [
    /^_pref/,         // Preferências
    /^theme/,         // Tema
    /^lang/,          // Idioma
  ],
};

export function useConsentManager(config: ConsentManagerConfig = {}) {
  const {
    version = CONSENT_VERSION,
    expiryDays = 365,
    onConsentChange,
  } = config;

  const [preferences, setPreferences] = useLocalStorage<ConsentPreferences | null>(
    CONSENT_KEY,
    null
  );
  const [loadedScripts, setLoadedScripts] = useLocalStorage<LoadedScript[]>(
    LOADED_SCRIPTS_KEY,
    []
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Verificar se precisa mostrar o banner
  useEffect(() => {
    const needsConsent = !preferences ||
      preferences.version !== version ||
      Date.now() - preferences.timestamp > (expiryDays * 24 * 60 * 60 * 1000);

    setShowBanner(needsConsent);
    setIsInitialized(true);

    // Log para debug
    if (needsConsent) {
      console.log('[LGPD] Consentimento necessário');
    } else {
      console.log('[LGPD] Consentimento válido:', preferences);
    }
  }, [preferences, version, expiryDays]);

  // Callback quando preferências mudam
  useEffect(() => {
    if (preferences && isInitialized) {
      onConsentChange?.(preferences);

      // Aplicar restrições baseadas no consentimento
      applyConsentRestrictions(preferences);
    }
  }, [preferences, isInitialized, onConsentChange]);

  /**
   * Aplica restrições baseadas no consentimento
   */
  const applyConsentRestrictions = useCallback((prefs: ConsentPreferences) => {
    // Desabilitar tracking do Google Analytics se não houver consentimento
    if (typeof window !== 'undefined') {
      // Google Analytics - desabilitar se não consentido
      if (!prefs.analytics) {
        (window as any)['ga-disable-GA_MEASUREMENT_ID'] = true;

        // Remover cookies de analytics
        clearCookiesByCategory('analytics');

        console.log('[LGPD] Analytics desabilitado');
      } else {
        (window as any)['ga-disable-GA_MEASUREMENT_ID'] = false;
        console.log('[LGPD] Analytics habilitado');
      }

      // Marketing - remover cookies se não consentido
      if (!prefs.marketing) {
        clearCookiesByCategory('marketing');

        // Desabilitar Facebook Pixel
        if ((window as any).fbq) {
          (window as any).fbq('consent', 'revoke');
        }

        console.log('[LGPD] Marketing desabilitado');
      } else {
        if ((window as any).fbq) {
          (window as any).fbq('consent', 'grant');
        }
        console.log('[LGPD] Marketing habilitado');
      }

      // Personalização
      if (!prefs.personalization) {
        clearCookiesByCategory('personalization');
        console.log('[LGPD] Personalização desabilitada');
      }
    }
  }, []);

  /**
   * Limpa cookies por categoria
   */
  const clearCookiesByCategory = useCallback((category: string) => {
    if (typeof document === 'undefined') return;

    const patterns = COOKIE_PATTERNS[category] || [];
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();

      const shouldDelete = patterns.some(pattern => pattern.test(cookieName));

      if (shouldDelete) {
        // Deletar o cookie em todos os paths e domínios possíveis
        const domains = [
          window.location.hostname,
          '.' + window.location.hostname,
          window.location.hostname.split('.').slice(-2).join('.'),
          '.' + window.location.hostname.split('.').slice(-2).join('.'),
        ];

        const paths = ['/', ''];

        domains.forEach(domain => {
          paths.forEach(path => {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
          });
        });

        console.log(`[LGPD] Cookie removido: ${cookieName}`);
      }
    });
  }, []);

  /**
   * Verifica se tem consentimento para uma categoria
   */
  const hasConsent = useCallback((category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>): boolean => {
    if (!preferences) return category === 'necessary';
    return preferences[category] === true;
  }, [preferences]);

  /**
   * Carrega um script apenas se houver consentimento
   */
  const loadScript = useCallback((
    id: string,
    src: string,
    category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>,
    options: { async?: boolean; defer?: boolean; onLoad?: () => void } = {}
  ): boolean => {
    // Sempre permite scripts necessários
    if (category !== 'necessary' && !hasConsent(category)) {
      console.log(`[LGPD] Script bloqueado (sem consentimento ${category}):`, src);
      return false;
    }

    // Verifica se já foi carregado
    if (document.getElementById(id)) {
      console.log(`[LGPD] Script já carregado:`, id);
      return true;
    }

    // Cria e carrega o script
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? false;

    if (options.onLoad) {
      script.onload = options.onLoad;
    }

    document.head.appendChild(script);

    // Registra o script carregado
    setLoadedScripts(prev => [...prev, { id, src, category }]);

    console.log(`[LGPD] Script carregado (${category}):`, src);
    return true;
  }, [hasConsent, setLoadedScripts]);

  /**
   * Remove scripts carregados de uma categoria
   */
  const removeScriptsByCategory = useCallback((
    category: keyof Omit<ConsentPreferences, 'timestamp' | 'version'>
  ) => {
    loadedScripts
      .filter(s => s.category === category)
      .forEach(script => {
        const element = document.getElementById(script.id);
        if (element) {
          element.remove();
          console.log(`[LGPD] Script removido:`, script.id);
        }
      });

    setLoadedScripts(prev => prev.filter(s => s.category !== category));
  }, [loadedScripts, setLoadedScripts]);

  /**
   * Salva preferências de consentimento
   */
  const savePreferences = useCallback((newPreferences: Partial<ConsentPreferences>) => {
    const updatedPreferences: ConsentPreferences = {
      ...DEFAULT_PREFERENCES,
      ...preferences,
      ...newPreferences,
      necessary: true, // Sempre obrigatório
      timestamp: Date.now(),
      version,
    };

    setPreferences(updatedPreferences);
    setShowBanner(false);

    // Log do consentimento para compliance
    console.log('[LGPD] Consentimento salvo:', {
      ...updatedPreferences,
      userAgent: navigator.userAgent,
      url: window.location.href,
    });

    // Aplicar restrições imediatamente
    applyConsentRestrictions(updatedPreferences);

    // Remover scripts de categorias não consentidas
    if (!updatedPreferences.analytics) {
      removeScriptsByCategory('analytics');
    }
    if (!updatedPreferences.marketing) {
      removeScriptsByCategory('marketing');
    }
    if (!updatedPreferences.personalization) {
      removeScriptsByCategory('personalization');
    }

    return updatedPreferences;
  }, [preferences, version, setPreferences, applyConsentRestrictions, removeScriptsByCategory]);

  /**
   * Aceita todos os cookies
   */
  const acceptAll = useCallback(() => {
    return savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    });
  }, [savePreferences]);

  /**
   * Aceita apenas cookies necessários
   */
  const acceptNecessaryOnly = useCallback(() => {
    return savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    });
  }, [savePreferences]);

  /**
   * Revoga todo o consentimento
   */
  const revokeAll = useCallback(() => {
    // Limpar todos os cookies não-essenciais
    clearCookiesByCategory('analytics');
    clearCookiesByCategory('marketing');
    clearCookiesByCategory('personalization');

    // Remover todos os scripts carregados
    removeScriptsByCategory('analytics');
    removeScriptsByCategory('marketing');
    removeScriptsByCategory('personalization');

    // Resetar preferências
    setPreferences(null);
    setShowBanner(true);

    console.log('[LGPD] Consentimento revogado');
  }, [clearCookiesByCategory, removeScriptsByCategory, setPreferences]);

  /**
   * Exporta dados de consentimento (LGPD - direito de acesso)
   */
  const exportConsentData = useCallback(() => {
    const data = {
      preferences,
      loadedScripts,
      exportedAt: new Date().toISOString(),
      version,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lgpd-consent-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    return data;
  }, [preferences, loadedScripts, version]);

  // Memoizar o retorno para evitar re-renders desnecessários
  const consentStatus = useMemo(() => ({
    hasAnalytics: hasConsent('analytics'),
    hasMarketing: hasConsent('marketing'),
    hasPersonalization: hasConsent('personalization'),
    isConsentGiven: preferences !== null,
  }), [preferences, hasConsent]);

  return {
    // Estado
    preferences,
    showBanner,
    isInitialized,
    consentStatus,

    // Verificações
    hasConsent,

    // Ações
    savePreferences,
    acceptAll,
    acceptNecessaryOnly,
    revokeAll,

    // Gerenciamento de scripts
    loadScript,
    removeScriptsByCategory,

    // LGPD compliance
    exportConsentData,
    clearCookiesByCategory,
  };
}

export default useConsentManager;
