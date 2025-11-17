import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  Shield, 
  FileSpreadsheet,
  PlayCircle,
  Gift,
  CheckCircle,
  Chrome,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { generateWhatsAppLink } from '@/lib/whatsapp';

const DisparoRapido: React.FC = () => {
  const { trackEvent } = useAnalytics();

  const handleCTAClick = (action: string) => {
    trackEvent('cta_click', {
      action,
      product: 'disparo-rapido',
      component: 'DisparoRapido',
      timestamp: new Date().toISOString()
    });
  };

  const handleWhatsAppContact = () => {
    const whatsappUrl = generateWhatsAppLink({
      message: "Olá! Gostaria de saber mais sobre o Disparo Rápido para WhatsApp. Pode me ajudar?",
      leadData: {
        interest: 'disparo-rapido',
        urgencyLevel: 'high',
        source: 'disparo-rapido-component'
      },
      autoTrack: true
    });
    handleCTAClick('whatsapp_contact');
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Disparos Ilimitados",
      description: "Envie quantas mensagens precisar com valor fixo mensal",
      highlight: true
    },
    {
      icon: FileSpreadsheet,
      title: "Importação de Contatos",
      description: "Via Excel (.csv) ou grupos do WhatsApp",
      highlight: false
    },
    {
      icon: Clock,
      title: "Intervalos Personalizáveis",
      description: "Configure tempo entre disparos para evitar bloqueios",
      highlight: false
    },
    {
      icon: PlayCircle,
      title: "Acompanhamento em Tempo Real",
      description: "Veja o status dos envios enquanto acontecem",
      highlight: false
    },
    {
      icon: Shield,
      title: "Suporte Completo à Mídia",
      description: "Áudio, vídeo, imagens e arquivos",
      highlight: true
    },
    {
      icon: Chrome,
      title: "Instalação Simples",
      description: "Extensão leve para Google Chrome",
      highlight: false
    }
  ];

  const plans = [
    {
      name: "Mensal",
      originalPrice: "R$ 59,90",
      currentPrice: "R$ 39,90",
      period: "/mês",
      popular: false,
      savings: null
    },
    {
      name: "Anual",
      originalPrice: "R$ 718,80",
      currentPrice: "R$ 249,00",
      period: "/ano",
      popular: true,
      savings: "65% de economia"
    }
  ];

  const bonuses = [
    "🎁 Guia Prático de Vendas no WhatsApp",
    "🎁 Manual Antibanimento",
    "🎁 Agentes de IA para Copywriting",
    "🎁 Estratégias de Marketing Personalizadas"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            <Zap className="w-4 h-4 mr-2" />
            Automação WhatsApp
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Disparo Rápido
          </h2>
          
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Extensão para Chrome que automatiza envios em massa pelo WhatsApp Web. 
            Ideal para autônomos, lojistas e profissionais liberais.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Disparos Ilimitados</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Até 10 Disparos Grátis</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">7 Dias de Garantia</span>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Como Funciona</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Instalar", desc: "Baixe a extensão no Google Chrome", icon: Chrome },
              { step: "2", title: "Carregar", desc: "Importe contatos via Excel ou grupos", icon: FileSpreadsheet },
              { step: "3", title: "Configurar", desc: "Defina intervalos entre disparos", icon: Clock },
              { step: "4", title: "Enviar", desc: "Automatize seus disparos no WhatsApp Web", icon: MessageSquare }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Funcionalidades Completas</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className={`hover:shadow-lg transition-all ${feature.highlight ? 'ring-2 ring-green-200 bg-green-50' : ''}`}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                    feature.highlight ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${feature.highlight ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Planos e Preços</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all ${
                plan.popular ? 'ring-2 ring-green-500 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-1">
                      MAIS VENDIDO
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                    <span className="text-3xl font-bold text-green-600">{plan.currentPrice}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {bonuses.map((bonus, bonusIndex) => (
                      <div key={bonusIndex} className="flex items-start gap-3">
                        <Gift className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{bonus}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => handleWhatsAppContact()}
                  >
                    {plan.popular ? 'Escolher Plano Anual' : 'Escolher Plano Mensal'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Free Version CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Teste Grátis Agora!</h3>
          <p className="text-lg mb-6 opacity-90">
            Faça até 10 disparos gratuitos para testar a ferramenta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => {
                handleCTAClick('chrome_store');
                window.open('https://chrome.google.com/webstore', '_blank');
              }}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Baixar na Chrome Store
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWhatsAppContact}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">Garantia de 7 Dias</span>
          </div>
          <p className="text-gray-600">
            Satisfação garantida ou cancelamento sem burocracia
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisparoRapido;