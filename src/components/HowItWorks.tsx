import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Magnet, Search, MessageCircle, Handshake, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Magnet,
      title: 'Atração',
      description: 'Landing pages e captação inteligente de leads.',
      color: 'text-primary'
    },
    {
      number: 2,
      icon: Search,
      title: 'Qualificação',
      description: 'IA pontua, enriquece dados e direciona prioridades.',
      color: 'text-accent'
    },
    {
      number: 3,
      icon: MessageCircle,
      title: 'Conversas',
      description: 'SDR virtual atende, coleta informações e faz triagem.',
      color: 'text-secondary'
    },
    {
      number: 4,
      icon: Handshake,
      title: 'Handoff',
      description: 'Leads quentes chegam ao seu consultor no CRM para fechar.',
      color: 'text-primary'
    }
  ];

  return (
    <section id="como-funciona" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            Como Funciona
          </Badge>
          <h2 className="gradient-text">Da atração ao fechamento, tudo mais rápido</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa metodologia proprietária transforma visitantes em clientes através de 4 etapas otimizadas
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="feature-card text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm ${step.color}`}>
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center mt-4`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Result Highlight */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-card p-6 rounded-2xl border border-border shadow-md">
            <div className="text-accent text-2xl font-bold">Resultado:</div>
            <div className="text-lg">
              <span className="font-semibold">3x mais leads qualificados</span> chegando ao seu time de vendas
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="btn-hero"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny!%20Quero%20ver%20o%20Ecossistema%20IA%20funcionando%20na%20pr%C3%A1tica!', '_blank')}
          >
            Quero ver na prática
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;