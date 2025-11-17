import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, Settings } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handlePreferences = () => {
    // Here you would typically open a preferences modal
    localStorage.setItem('cookie-consent', 'preferences');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg p-4">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-start space-x-3 flex-1">
            <Cookie className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Usamos cookies para melhorar sua experiência
              </p>
              <p className="text-xs text-muted-foreground">
                Utilizamos cookies essenciais e de análise para personalizar conteúdo e melhorar nossos serviços. 
                Seus dados são tratados conforme nossa{' '}
                <a href="#" className="text-primary hover:underline">
                  Política de Privacidade
                </a>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreferences}
              className="text-xs"
            >
              <Settings className="w-3 h-3 mr-1" />
              Preferências
            </Button>
            <Button 
              size="sm" 
              onClick={handleAccept}
              className="btn-hero text-xs"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;