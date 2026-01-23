import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain, Zap } from 'lucide-react';
import WhatsAppCTA from '@/components/ui/WhatsAppCTA';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#recursos', label: 'Recursos' },
    { href: '#planos', label: 'Planos' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contato', label: 'Contato' },
  ];

  const handleNavClick = (item: string) => {
    console.log('Nav click:', item);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center text-sm">
          <span>Duvidas? Johnny responde em 2h: (16) 99778-7674</span>
        </div>
      </div>

      <header className={`nav-sticky bg-white border-b relative ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#inicio" className="flex items-center space-x-3" onClick={() => handleNavClick('logo')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Vendas.IA
                </span>
                <div className="text-xs text-gray-500">by Johnny Vaz</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Contact Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => {
                  handleNavClick('crm-free');
                  window.open('https://crm.vendas.ia.br', '_blank');
                }}
              >
                <Zap className="w-4 h-4 mr-1" />
                CRM Gratis
              </Button>

              <WhatsAppCTA
                variant="compact"
                size="sm"
                customText="WhatsApp"
                trackingSource="header-whatsapp"
                showJohnnyInfo={false}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <nav className="flex flex-col space-y-2 p-4 w-full">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium py-3 px-2 rounded-lg"
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Contact Actions */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md"
                  onClick={() => {
                    handleNavClick('mobile-crm-free');
                    window.open('https://crm.vendas.ia.br', '_blank');
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Comecar CRM Gratis
                </Button>

                <WhatsAppCTA
                  variant="compact"
                  customText="Falar no WhatsApp"
                  trackingSource="header-mobile-whatsapp"
                  className="w-full"
                />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
