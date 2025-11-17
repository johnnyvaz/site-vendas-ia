import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight, Zap, Users, Rocket, CreditCard, Shield, Clock, MessageSquare } from 'lucide-react';

const CRMPricing = () => {
  const handlePlanClick = (planName: string, isContact: boolean) => {
    console.log('Plan selected:', planName);
    if (isContact) {
      window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20saber%20mais%20sobre%20o%20plano%20Business%20do%20CRM%20Vendas%20IA!', '_blank');
    } else {
      window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20come%C3%A7ar%20com%20o%20plano%20' + planName + '%20do%20CRM%20Vendas%20IA!', '_blank');
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: 49.90,
      pricePerUser: 49.90,
      description: 'Ideal para começar com 1 usuário',
      icon: Users,
      features: [
        '1 usuário incluído',
        '1.000 créditos/mês',
        'Funil de vendas básico',
        'Score automático de leads',
        'Suporte por email',
        'Dashboard básico',
        'Integrações essenciais'
      ],
      additionalInfo: '+ R$ 49,90 por usuário adicional',
      buttonText: 'Começar Grátis',
      buttonClass: 'btn-outline-primary',
      popular: false,
      highlight: false,
      isContact: false
    },
    {
      name: 'Pro',
      price: 99.90,
      pricePerUser: 49.90,
      description: 'Mais popular - Mais créditos e recursos',
      icon: Zap,
      features: [
        '2 usuários incluídos',
        '5.000 créditos/mês',
        'Funil de vendas avançado',
        'Score + IA preditiva',
        'Scraping Google Maps',
        'Automação multi-canal',
        'Suporte prioritário',
        'API básica',
        'Integrações avançadas',
        'Relatórios personalizados'
      ],
      additionalInfo: '+ R$ 49,90 por usuário adicional',
      buttonText: 'Começar Grátis',
      buttonClass: 'btn-hero',
      popular: true,
      highlight: true,
      isContact: false
    },
    {
      name: 'Business',
      price: null,
      pricePerUser: 49.90,
      description: 'Plano personalizado para sua empresa',
      icon: Rocket,
      features: [
        'Créditos personalizados',
        'Funil personalizado completo',
        'IA avançada + GPT-4',
        'Usuários conforme necessidade',
        'Multi-tenancy completo',
        'Automação avançada N8N',
        'ChatWoot integrado',
        'API completa + Webhooks',
        'Suporte dedicado 24/7',
        'Customer Success Manager',
        'Treinamento personalizado',
        'White-label disponível'
      ],
      additionalInfo: 'R$ 49,90 por usuário',
      buttonText: 'Falar com Vendas',
      buttonClass: 'btn-secondary',
      popular: false,
      highlight: false,
      isContact: true
    }
  ];

  const paymentFeatures = [
    {
      icon: Shield,
      title: '7 dias grátis',
      description: 'Teste sem compromisso'
    },
    {
      icon: CreditCard,
      title: 'Sem cartão de crédito',
      description: 'Não pedimos dados de pagamento no trial'
    },
    {
      icon: Clock,
      title: 'Cancele quando quiser',
      description: 'Sem multas ou taxas de cancelamento'
    }
  ];

  return (
    <section id="planos" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            Planos e Assinaturas
          </Badge>
          <h2 className="gradient-text">
            Planos Simples, Crescimento Real
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio. Todos incluem 7 dias de teste grátis, 
            sem necessidade de cartão de crédito.
          </p>
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">R$ 49,90 por usuário em todos os planos</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.highlight ? 'border-primary border-2 shadow-2xl scale-105' : 'border-2'} hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${plan.highlight ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-primary/10'} flex items-center justify-center`}>
                  <plan.icon className={`w-8 h-8 ${plan.highlight ? 'text-white' : 'text-primary'}`} />
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="mt-6 space-y-2">
                  {plan.price ? (
                    <>
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-sm text-muted-foreground">R$</span>
                        <span className="text-5xl font-bold">{plan.price.toFixed(2).replace('.', ',')}</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ou R$ {(plan.price * 10).toFixed(2).replace('.', ',')} /ano (2 meses grátis)
                      </p>
                    </>
                  ) : (
                    <div className="py-4">
                      <span className="text-3xl font-bold text-primary">Sob Consulta</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground font-semibold pt-2">
                    {plan.additionalInfo}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${plan.buttonClass} h-12 text-base font-semibold`}
                  onClick={() => handlePlanClick(plan.name, plan.isContact)}
                >
                  {plan.isContact ? <MessageSquare className="mr-2 w-5 h-5" /> : null}
                  {plan.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {paymentFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Info */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/10 mb-8">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Como Funciona a Cobrança</h3>
              <div className="max-w-2xl mx-auto space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Usuários:</strong> Cada usuário adicional custa R$ 49,90/mês em qualquer plano
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Créditos:</strong> Plano Pro oferece 5x mais créditos que o Starter
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Business:</strong> Créditos e usuários personalizados conforme sua necessidade
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/10">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Formas de Pagamento</h3>
              <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-medium">PIX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-medium">Boleto</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-medium">Cartão de Crédito</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Pagamento recorrente via Asaas. Escale conforme o seu negócio cresce. 
                Todos os planos incluem garantia de 30 dias.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Quick */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <strong>Dúvidas sobre os planos?</strong> Entre em contato pelo WhatsApp e nossa equipe 
            vai te ajudar a escolher o melhor plano para o seu negócio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CRMPricing;