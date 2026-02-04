/**
 * Componente para carregamento condicional de scripts baseado em consentimento LGPD
 * Só carrega scripts de terceiros se o usuário deu consentimento explícito
 */

import { useEffect } from 'react';
import { useConsentManager } from '@/hooks/useConsentManager';

interface ScriptConfig {
  id: string;
  src?: string;
  inline?: string;
  async?: boolean;
  defer?: boolean;
}

interface ConditionalScriptsProps {
  // Google Analytics
  googleAnalyticsId?: string;

  // Facebook Pixel
  facebookPixelId?: string;

  // Google Tag Manager
  googleTagManagerId?: string;

  // Hotjar
  hotjarId?: string;

  // Scripts customizados por categoria
  analyticsScripts?: ScriptConfig[];
  marketingScripts?: ScriptConfig[];
  personalizationScripts?: ScriptConfig[];

  // Callbacks
  onAnalyticsLoaded?: () => void;
  onMarketingLoaded?: () => void;
}

export function ConditionalScripts({
  googleAnalyticsId,
  facebookPixelId,
  googleTagManagerId,
  hotjarId,
  analyticsScripts = [],
  marketingScripts = [],
  personalizationScripts = [],
  onAnalyticsLoaded,
  onMarketingLoaded,
}: ConditionalScriptsProps) {
  const { hasConsent, loadScript, isInitialized } = useConsentManager();

  // Carregar Google Analytics
  useEffect(() => {
    if (!isInitialized || !googleAnalyticsId) return;

    if (hasConsent('analytics')) {
      // Carregar gtag.js
      loadScript(
        'google-analytics',
        `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
        'analytics',
        {
          async: true,
          onLoad: () => {
            // Inicializar gtag
            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) {
              (window as any).dataLayer.push(args);
            }
            (window as any).gtag = gtag;
            gtag('js', new Date());
            gtag('config', googleAnalyticsId, {
              anonymize_ip: true, // LGPD compliance
              cookie_flags: 'SameSite=None;Secure',
            });

            console.log('[LGPD] Google Analytics inicializado:', googleAnalyticsId);
            onAnalyticsLoaded?.();
          },
        }
      );
    } else {
      // Desabilitar GA se não houver consentimento
      (window as any)[`ga-disable-${googleAnalyticsId}`] = true;
    }
  }, [isInitialized, googleAnalyticsId, hasConsent, loadScript, onAnalyticsLoaded]);

  // Carregar Google Tag Manager
  useEffect(() => {
    if (!isInitialized || !googleTagManagerId) return;

    if (hasConsent('analytics')) {
      // GTM script
      const gtmScript = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManagerId}');
      `;

      if (!document.getElementById('google-tag-manager')) {
        const script = document.createElement('script');
        script.id = 'google-tag-manager';
        script.innerHTML = gtmScript;
        document.head.appendChild(script);

        console.log('[LGPD] Google Tag Manager inicializado:', googleTagManagerId);
      }
    }
  }, [isInitialized, googleTagManagerId, hasConsent]);

  // Carregar Facebook Pixel
  useEffect(() => {
    if (!isInitialized || !facebookPixelId) return;

    if (hasConsent('marketing')) {
      // Facebook Pixel script
      const fbPixelScript = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent', 'grant');
        fbq('init', '${facebookPixelId}');
        fbq('track', 'PageView');
      `;

      if (!document.getElementById('facebook-pixel')) {
        const script = document.createElement('script');
        script.id = 'facebook-pixel';
        script.innerHTML = fbPixelScript;
        document.head.appendChild(script);

        // Adicionar noscript fallback
        const noscript = document.createElement('noscript');
        noscript.id = 'facebook-pixel-noscript';
        noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"/>`;
        document.body.appendChild(noscript);

        console.log('[LGPD] Facebook Pixel inicializado:', facebookPixelId);
        onMarketingLoaded?.();
      }
    } else {
      // Revogar consentimento do FB Pixel se já carregado
      if ((window as any).fbq) {
        (window as any).fbq('consent', 'revoke');
      }
    }
  }, [isInitialized, facebookPixelId, hasConsent, onMarketingLoaded]);

  // Carregar Hotjar
  useEffect(() => {
    if (!isInitialized || !hotjarId) return;

    if (hasConsent('analytics')) {
      const hotjarScript = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hotjarId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;

      if (!document.getElementById('hotjar')) {
        const script = document.createElement('script');
        script.id = 'hotjar';
        script.innerHTML = hotjarScript;
        document.head.appendChild(script);

        console.log('[LGPD] Hotjar inicializado:', hotjarId);
      }
    }
  }, [isInitialized, hotjarId, hasConsent]);

  // Carregar scripts customizados de analytics
  useEffect(() => {
    if (!isInitialized) return;

    if (hasConsent('analytics')) {
      analyticsScripts.forEach(script => {
        if (script.src) {
          loadScript(script.id, script.src, 'analytics', {
            async: script.async,
            defer: script.defer,
          });
        } else if (script.inline && !document.getElementById(script.id)) {
          const scriptEl = document.createElement('script');
          scriptEl.id = script.id;
          scriptEl.innerHTML = script.inline;
          document.head.appendChild(scriptEl);
        }
      });
    }
  }, [isInitialized, analyticsScripts, hasConsent, loadScript]);

  // Carregar scripts customizados de marketing
  useEffect(() => {
    if (!isInitialized) return;

    if (hasConsent('marketing')) {
      marketingScripts.forEach(script => {
        if (script.src) {
          loadScript(script.id, script.src, 'marketing', {
            async: script.async,
            defer: script.defer,
          });
        } else if (script.inline && !document.getElementById(script.id)) {
          const scriptEl = document.createElement('script');
          scriptEl.id = script.id;
          scriptEl.innerHTML = script.inline;
          document.head.appendChild(scriptEl);
        }
      });
    }
  }, [isInitialized, marketingScripts, hasConsent, loadScript]);

  // Carregar scripts customizados de personalização
  useEffect(() => {
    if (!isInitialized) return;

    if (hasConsent('personalization')) {
      personalizationScripts.forEach(script => {
        if (script.src) {
          loadScript(script.id, script.src, 'personalization', {
            async: script.async,
            defer: script.defer,
          });
        } else if (script.inline && !document.getElementById(script.id)) {
          const scriptEl = document.createElement('script');
          scriptEl.id = script.id;
          scriptEl.innerHTML = script.inline;
          document.head.appendChild(scriptEl);
        }
      });
    }
  }, [isInitialized, personalizationScripts, hasConsent, loadScript]);

  // Este componente não renderiza nada visualmente
  return null;
}

export default ConditionalScripts;
