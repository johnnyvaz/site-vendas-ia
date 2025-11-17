import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight, Mail, Users, Zap } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 297,
      description: 'Ideal para pequenas empresas começando com IA',
      icon: Mail,
      features: [
        '100 leads/mês',
        'CRM básico',
        'Score IA',
        '1 usuário',
        'Suporte por e-mail',
        'Relatórios básicos'
      ],
      buttonText: 'Começar no Starter',
      buttonClass: 'btn-outline-primary',
      popular: false
    },
    {
      name: 'Professional',
      price: 897,
      description: 'Recomendado para empresas em crescimento',
      icon: Users,
      features: [
        '500 leads/mês',
        'Campanhas avançadas',
        'Analytics completo',
        '5 usuários',
        'Integrações padrão (RD Station, HubSpot*)',
        'Suporte prioritário',
        'API básica',
        'Treinamento incluído'
      ],
      buttonText: 'Começar no Professional',
      buttonClass: 'btn-hero',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 2497,
      description: 'Para empresas que precisam de máxima performance',
      icon: Zap,
      features: [
        '2000+ leads/mês',
        'API pública completa',
        'Webhooks avançados',
        'Single Sign-On',
        'Multi-tenant',
        'Suporte dedicado (SLA)',
        'Customer Success Manager',
        'Customizações exclusivas'
      ],
      buttonText: 'Falar com Vendas',
      buttonClass: 'btn-secondary',
      popular: false
    }
  ];

  return (
    <section id="planos" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            Planos e Preços
          </Badge>
          <h2 className="gradient-text">Planos simples, crescimento real</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Preços em R$/mês. Cancelamento fácil. Contratos anuais com desconto opcional.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'featured' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="w-4 h-4 mr-1" />
                    Recomendado
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${plan.popular ? 'bg-accent/10' : 'bg-primary/10'} flex items-center justify-center`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-accent' : 'text-primary'}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">R$ {plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className={`w-full ${plan.buttonClass}`}>
                {plan.buttonText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            *Integrações sujeitas à disponibilidade técnica e plano contratado. 
            Todos os planos incluem garantia de 30 dias e migração gratuita de dados.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="font-semibold mb-2">Implementação Rápida</h4>
            <p className="text-sm text-muted-foreground">Setup completo em menos de 24 horas</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h4 className="font-semibold mb-2">Suporte Especializado</h4>
            <p className="text-sm text-muted-foreground">Time com experiência em vendas B2B</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">ROI Garantido</h4>
            <p className="text-sm text-muted-foreground">Resultados mensuráveis desde o primeiro mês</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;