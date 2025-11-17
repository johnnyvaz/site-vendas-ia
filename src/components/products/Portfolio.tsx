import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Settings,
  BarChart3,
  Globe
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface EcosystemStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  products: string[];
  color: string;
  bgColor: string;
}

const ProductPortfolio: React.FC = () => {
  const { trackEvent } = useAnalytics();

  const handleProductInterest = (productName: string) => {
    trackEvent('product_interest', {
      product: productName,
      source: 'portfolio_component',
      timestamp: new Date().toISOString()
    });
  };

  const handleWhatsAppContact = (productName?: string) => {
    const message = productName 
      ? `Olá! Gostaria de saber mais sobre ${productName}. Pode me explicar como funciona?`
      : "Olá! Gostaria de conhecer melhor o ecossistema completo de soluções IA. Pode me ajudar?";
    
    const whatsappUrl = generateWhatsAppLink({
      message,
      leadData: {
        interest: (productName as 'disparo-rapido') || 'custom-solution',
        urgencyLevel: 'medium',
        source: 'portfolio-component'
      },
      autoTrack: true
    });
    
    handleProductInterest(productName || 'ecosystem-consultation');
    window.open(whatsappUrl, '_blank');
  };

  const ecosystemSteps: EcosystemStep[] = [
    {
      id: 'capture',
      title: 'Capturar Leads',
      description: 'Automação de captura e qualificação de leads com IA',
      icon: Target,
      products: ['Landing Pages IA', 'Chatbots de Qualificação', 'Formulários Inteligentes'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'engage',
      title: 'Engajar Prospects',
      description: 'Comunicação personalizada e automatizada',
      icon: MessageSquare,
      products: ['Disparo Rápido', 'E-mail Marketing IA', 'Sequências Automatizadas'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'convert',
      title: 'Converter Vendas',
      description: 'Agentes IA para vendas e suporte personalizado',
      icon: TrendingUp,
      products: ['Vendedor IA', 'Assistente de Vendas', 'Chatbot de Conversão'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'analyze',
      title: 'Analisar Resultados',
      description: 'Dashboards inteligentes e insights automatizados',
      icon: BarChart3,
      products: ['Analytics IA', 'Relatórios Automatizados', 'Previsão de Vendas'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const mainProducts = [
    {
      name: 'Disparo Rápido',
      description: 'Extensão Chrome para disparos automatizados no WhatsApp',
      status: 'Disponível',
      category: 'Automação',
      icon: MessageSquare,
      features: ['Disparos ilimitados', 'Importação de contatos', 'Anti-banimento'],
      price: 'A partir de R$ 39,90/mês',
      highlight: true
    },
    {
      name: 'Vendedor IA',
      description: 'Agente de IA especializado em vendas e conversão',
      status: 'Em desenvolvimento',
      category: 'IA Conversacional',
      icon: Brain,
      features: ['Conversação natural', 'Qualificação automática', 'Integração WhatsApp'],
      price: 'Em breve',
      highlight: false
    },
    {
      name: 'Landing Page IA',
      description: 'Criação automática de páginas de alta conversão',
      status: 'Em desenvolvimento',
      category: 'Geração de Leads',
      icon: Globe,
      features: ['Criação automática', 'A/B Testing IA', 'Otimização contínua'],
      price: 'Em breve',
      highlight: false
    },
    {
      name: 'Analytics IA',
      description: 'Dashboard inteligente com insights automatizados',
      status: 'Planejamento',
      category: 'Análise',
      icon: BarChart3,
      features: ['Insights automáticos', 'Previsões IA', 'ROI em tempo real'],
      price: 'Em desenvolvimento',
      highlight: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponível':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">✅ {status}</Badge>;
      case 'Em desenvolvimento':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">🚧 {status}</Badge>;
      case 'Planejamento':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">📋 {status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
            <Brain className="w-4 h-4 mr-2" />
            Ecossistema Completo IA
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfólio de Soluções IA
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Do primeiro contato à venda fechada: um ecossistema completo de automações 
            inteligentes para acelerar seus resultados.
          </p>
        </div>

        {/* Ecosystem Flow */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Jornada do Cliente Automatizada</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {ecosystemSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card className={`${step.bgColor} border-2 hover:shadow-lg transition-all cursor-pointer`}>
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg ${step.bgColor} border-2 border-current ${step.color} flex items-center justify-center mb-3`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{step.description}</CardDescription>
                    <ul className="space-y-1">
                      {step.products.map((product, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {index < ecosystemSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => handleWhatsAppContact()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Consultar Ecossistema Completo
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Produtos Principais</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {mainProducts.map((product, index) => (
              <Card key={index} className={`hover:shadow-xl transition-all ${
                product.highlight ? 'ring-2 ring-green-200 bg-green-50' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        product.highlight ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <product.icon className={`w-6 h-6 ${
                          product.highlight ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    {getStatusBadge(product.status)}
                  </div>
                  
                  <CardDescription className="text-base mb-4">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Principais recursos:</h4>
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold text-green-600">
                      {product.price}
                    </div>
                    
                    {product.status === 'Disponível' ? (
                      <Button 
                        onClick={() => handleWhatsAppContact(product.name)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Quero este produto
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => handleWhatsAppContact(product.name)}
                      >
                        Ser notificado
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Solutions CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Settings className="w-12 h-12 text-blue-300" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Precisa de uma Solução Personalizada?
            </h3>
            <p className="text-lg mb-6 text-gray-300">
              Desenvolvemos soluções de IA sob medida para o seu negócio. 
              Chatbots especializados, automações customizadas e integrações exclusivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => handleWhatsAppContact('Solução Personalizada')}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Solicitar Orçamento
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleWhatsAppContact()}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPortfolio;