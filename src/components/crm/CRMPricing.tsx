import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight, Zap, Users, Rocket, MessageSquare } from 'lucide-react';

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
      description: 'Para comecar a prospectar',
      icon: Users,
      features: [
        '1 usuario',
        '1.000 creditos/mes',
        'Funil de vendas basico',
        'Score automatico de leads',
        'Suporte por email'
      ],
      buttonText: 'Testar 7 Dias Gratis',
      popular: false,
      highlight: false,
      isContact: false
    },
    {
      name: 'Pro',
      price: 99.90,
      description: 'O mais escolhido',
      icon: Zap,
      features: [
        '2 usuarios incluidos',
        '5.000 creditos/mes',
        'Scraping Google Maps',
        'WhatsApp automatizado',
        'Suporte prioritario',
        '+ R$49,90/usuario extra'
      ],
      buttonText: 'Testar 7 Dias Gratis',
      popular: true,
      highlight: true,
      isContact: false
    },
    {
      name: 'Business',
      price: null,
      description: 'Para equipes maiores',
      icon: Rocket,
      features: [
        'Usuarios ilimitados',
        'Creditos sob medida',
        'API completa',
        'Suporte dedicado',
        'Treinamento incluso'
      ],
      buttonText: 'Falar com Johnny',
      popular: false,
      highlight: false,
      isContact: true
    }
  ];

  return (
    <section id="planos" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="text-primary border-primary">
            Planos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Comece com 7 Dias Gratis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sem cartao de credito. Cancele quando quiser.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.highlight ? 'border-primary border-2 shadow-xl scale-105' : 'border'} transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${plan.highlight ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-primary/10'} flex items-center justify-center`}>
                  <plan.icon className={`w-6 h-6 ${plan.highlight ? 'text-white' : 'text-primary'}`} />
                </div>

                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>

                <div className="mt-4">
                  {plan.price ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-muted-foreground">R$</span>
                      <span className="text-4xl font-bold">{plan.price.toFixed(2).replace('.', ',')}</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-primary">Sob Consulta</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : ''}`}
                  variant={plan.highlight ? 'default' : 'outline'}
                  onClick={() => handlePlanClick(plan.name, plan.isContact)}
                >
                  {plan.isContact && <MessageSquare className="mr-2 w-4 h-4" />}
                  {plan.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple payment info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Pagamento via PIX, boleto ou cartao
        </div>
      </div>
    </section>
  );
};

export default CRMPricing;
