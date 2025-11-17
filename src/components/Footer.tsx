// Footer Component for Vendas.IA
// Complete footer with Brazilian business information and LGPD compliance

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  FileText,
  Users,
  Linkedin,
  Instagram,
  Youtube,
  MessageSquare,
  Send,
  Star,
  Award,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { ConsentStatus } from './ConsentBanner';
import { useAnalytics } from '@/hooks/useAnalytics';

interface FooterProps {
  showNewsletter?: boolean;
  showSocialProof?: boolean;
  showCertifications?: boolean;
  compactMode?: boolean;
  className?: string;
}

const COMPANY_INFO = {
  name: 'Vendas.IA',
  legalName: 'Johnny Vaz - IA para Vendas B2B',
  founder: 'Johnny Vaz',
  address: {
    street: 'Atendimento Nacional',
    city: 'Base em São Paulo',
    state: 'SP',
    country: 'Brasil',
  },
  contact: {
    whatsapp: '+55 16 9 9778-7674',
    phone: '+55 16 9 9778-7674',
    email: 'johnny@vendas.ia.br',
    linkedin: 'https://linkedin.com/in/johnnyvaz',
  },
} as const;

const FOOTER_LINKS = {
  solutions: [
    { name: '🚀 Disparo Rápido WhatsApp', href: 'https://disparorapido.com.br/' },
    // { name: '🤖 Vendedor IA 24/7', href: '#solucoes' },
    // { name: '🎨 Landing Pages IA', href: '#solucoes' },
    // { name: '📊 Analytics Inteligente', href: '#solucoes' },
  ],
  company: [
    { name: 'Sobre Johnny Vaz', href: 'https://johnnyvaz.com.br/' },
    { name: 'Portfolio', href: 'https://johnnyvaz.com.br/projects' },
    // { name: 'Cases de Sucesso', href: '#depoimentos' },
    // { name: 'Contato Direto', href: '#contato' },
  ],
  resources: [
    { name: 'Blog IA para Vendas', href: '/blog' },
    { name: 'Guias Gratuitos', href: '/recursos' },
    { name: 'Webinars', href: '/eventos' },
    { name: 'FAQ', href: '#faq' },
  ],
  legal: [
    { name: 'Política de Privacidade', href: '/politica-privacidade' },
    { name: 'Termos de Uso', href: '/termos-uso' },
    { name: 'Compliance LGPD', href: '/lgpd' },
    { name: 'Cookies', href: '/cookies' },
  ],
} as const;

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/johnnyvaz', icon: Linkedin },
  { name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=5516997787674', icon: MessageSquare },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCvR9c_6MQrGQE5Ny50k0Vww', icon: Youtube },
] as const;

export function Footer({
  showNewsletter = true,
  showSocialProof = true,
  showCertifications = true,
  compactMode = false,
  className = '',
}: FooterProps) {
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      trackEvent('conversion', {
        conversionType: 'email_signup',
        value: 25,
        source: 'footer',
        medium: 'newsletter',
        campaign: 'footer_signup',
      });

      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleLinkClick = (category: string, linkName: string, href: string) => {
    trackEvent('cta_click', {
      action: 'footer_link',
      category,
      linkName,
      destination: href,
    });
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Newsletter Section */}
      {/* {showNewsletter && !compactMode && (
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Receba Dicas de IA para Vendas
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Estratégias semanais, cases de sucesso e novidades sobre inteligência artificial
                para impulsionar suas vendas. Só conteúdo relevante, sem spam.
              </p>

              {!subscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                  >
                    {isSubscribing ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Inscrever
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span>Obrigado! Você receberá nosso próximo conteúdo.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-orange-400 mb-2">
                {COMPANY_INFO.name}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Especialistas em inteligência artificial para vendas no Brasil.
                Transformamos processos comerciais com tecnologia de ponta.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-sm">
                    {COMPANY_INFO.address.street}
                  </p>
                  <p className="text-sm text-gray-400">
                    {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-sm">{COMPANY_INFO.contact.phone}</p>
                  <p className="text-xs text-gray-400">WhatsApp e ligações</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <p className="text-sm">{COMPANY_INFO.contact.email}</p>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-sm">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-xs text-gray-400">Horário de Brasília (GMT-3)</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6">
              <WhatsAppButton
                template="GENERAL_INQUIRY"
                variant="compact"
                trackingParams={{
                  source: 'footer',
                  medium: 'website',
                  campaign: 'footer_whatsapp',
                }}
                onClick={() => trackEvent('whatsapp_click', { source: 'footer_cta' })}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">🚀 Soluções IA</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick('products', link.name, link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick('company', link.name, link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick('support', link.name, link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick('legal', link.name, link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Proof Section */}
        {/* {showSocialProof && !compactMode && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-sm text-gray-400">Avaliação média dos clientes</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-gray-400">Empresas confiam em nós</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-orange-400" />
                </div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-gray-400">Cobertura nacional</p>
              </div>
            </div>
          </div>
        )} */}

        {/* Certifications */}
        {/* {showCertifications && !compactMode && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h4 className="text-lg font-semibold mb-6 text-center">Certificações</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">ISO 27001</p>
                <p className="text-xs text-gray-400 mt-1">Segurança da Informação</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <FileText className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">LGPD Compliant</p>
                <p className="text-xs text-gray-400 mt-1">Proteção de Dados</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <MessageSquare className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">WhatsApp Partner</p>
                <p className="text-xs text-gray-400 mt-1">Parceiro Oficial</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <Award className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">Great Place</p>
                <p className="text-xs text-gray-400 mt-1">Ambiente de Trabalho</p>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 mb-1">
                © {new Date().getFullYear()} {COMPANY_INFO.legalName}. Todos os direitos reservados.
              </p>
              <p className="text-xs text-gray-500">
                {COMPANY_INFO.legalName} | Feito com ❤️ no Brasil 🇧🇷
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-4 text-xs">
              {FOOTER_LINKS.legal.slice(0, 2).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick('legal', link.name, link.href)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Consent Status */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <ConsentStatus
              onOpenSettings={() => trackEvent('consent_settings_opened', { source: 'footer' })}
              className="justify-center md:justify-start"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;