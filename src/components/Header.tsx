import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, MessageSquare, Phone, Mail, Brain, Zap } from 'lucide-react';
import WhatsAppCTA from '@/components/ui/WhatsAppCTA';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#inicio', label: 'Início' },
    { href: '#produtos', label: 'Produtos', badge: 'Novo' },
    { href: '#solucoes', label: 'Soluções' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#planos', label: 'Planos' },
    { href: '#cases', label: 'Cases' },
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
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+55 (16) 99778-7674</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contato@johnnyvaz.com.br</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-xs">Johnny Vaz - Especialista IA Online</span>
          </div>
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
                <div className="text-xs text-gray-500">Automação Inteligente</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs ml-1">
                      {item.badge}
                    </Badge>
                  )}
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
                CRM Grátis
              </Button>

              <WhatsAppCTA
                variant="compact"
                size="sm"
                customText="WhatsApp"
                trackingSource="header-whatsapp"
                showJohnnyInfo={false}
              />

              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  handleNavClick('contact-phone');
                  window.open('tel:+5516997787674', '_self');
                }}
              >
                <Phone className="w-4 h-4 mr-1" />
                Ligar
              </Button>
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-2 p-4 w-full">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium py-3 px-2 rounded-lg flex items-center justify-between"
                  onClick={() => handleNavClick(item.label)}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {item.badge}
                    </Badge>
                  )}
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
                  Começar CRM Grátis
                </Button>

                <WhatsAppCTA
                  variant="compact"
                  customText="Falar no WhatsApp"
                  trackingSource="header-mobile-whatsapp"
                  className="w-full"
                />

                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    handleNavClick('mobile-phone');
                    window.open('tel:+5516997787674', '_self');
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar: +55 (16) 99778-7674
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;