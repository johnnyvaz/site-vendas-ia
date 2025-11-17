import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ArrowRight, TrendingUp, Clock, Target } from 'lucide-react';

const SocialProof = () => {
  const cases = [
    {
      company: 'Qualicorp',
      industry: 'Seguros de Saúde',
      solution: 'Chat iterativo de pré-vendas',
      result: '+60%',
      metric: 'eficiência em qualificação',
      icon: Target,
      color: 'text-primary'
    },
    {
      company: 'ValeCar',
      industry: 'Proteção Veicular',
      solution: 'SDR para proteção veicular',
      result: '24/7',
      metric: 'atendimento e prioridade leads quentes',
      icon: Clock,
      color: 'text-secondary'
    },
    {
      company: 'Disparo Rápido',
      industry: 'Marketing Digital',
      solution: 'Integração WhatsApp e automações',
      result: '+35%',
      metric: 'conversões de campanhas',
      icon: TrendingUp,
      color: 'text-accent'
    }
  ];

  const testimonials = [
    {
      quote: "O Vendas.IA transformou nossa operação. Em 3 meses, triplicamos nossa geração de leads qualificados.",
      author: "Carlos Silva",
      position: "Diretor Comercial",
      company: "TechSolutions Brasil",
      rating: 5
    },
    {
      quote: "Impressionante como a IA consegue identificar os leads com maior propensão de compra. ROI incrível!",
      author: "Marina Santos",
      position: "Head de Marketing",
      company: "StartupHub",
      rating: 5
    }
  ];

  return (
    <section id="cases" className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            Prova Social
          </Badge>
          <h2 className="gradient-text">Resultados que falam por si</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empresas de diversos segmentos já estão acelerando suas vendas com nossa plataforma
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cases.map((case_, index) => (
            <div key={index} className="feature-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-opacity-10 flex items-center justify-center ${case_.color.replace('text-', 'bg-')}/10`}>
                  <case_.icon className={`w-5 h-5 ${case_.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{case_.company}</h3>
                  <p className="text-sm text-muted-foreground">{case_.industry}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{case_.solution}</p>
              
              <div className="border-t border-border pt-4">
                <div className={`text-3xl font-bold ${case_.color} mb-1`}>
                  {case_.result}
                </div>
                <p className="text-sm font-medium">{case_.metric}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-8">Confiado por empresas líderes no Brasil</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {/* Placeholder for client logos */}
            <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium">Logo 1</span>
            </div>
            <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium">Logo 2</span>
            </div>
            <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium">Logo 3</span>
            </div>
            <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium">Logo 4</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-muted-foreground mb-4" />
              
              <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="btn-secondary">
            Quero um diagnóstico gratuito
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;