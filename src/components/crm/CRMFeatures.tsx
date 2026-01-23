import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MapPin,
  Brain,
  MessageSquare,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const CRMFeatures = () => {
  const mainFeatures = [
    {
      icon: MapPin,
      title: 'Prospecção Google Maps',
      description: 'Digite "dentistas em Ribeirão Preto" e receba lista com telefone e email.',
      features: [
        'Busca por cidade, bairro ou região',
        'Dados atualizados: telefone, site, avaliações',
        'Exporta direto pro seu funil',
        'Sem planilhas, 100% automatizado'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'IA que Separa o Joio do Trigo',
      description: 'O sistema analisa cada lead e te diz qual vale ligar.',
      features: [
        'Score automático de qualificação',
        'Analisa site e redes sociais',
        'Identifica decisores',
        'Prioriza os leads quentes'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp + Email Automático',
      description: 'Configure uma vez, a máquina faz o follow-up.',
      features: [
        'Sequências de mensagens personalizadas',
        'Disparo em horário comercial',
        'Respostas automáticas com IA',
        'Histórico completo de conversas'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="recursos" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="text-primary border-primary">
            Como Funciona
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            3 Passos para Leads no Piloto Automatico
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre empresas, qualifique com IA e entre em contato pelo WhatsApp.
            Tudo automatizado.
          </p>
        </div>

        {/* Features Grid - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/30">
                    {index + 1}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const element = document.getElementById('planos');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold text-lg group cursor-pointer"
          >
            <span>Ver planos e precos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CRMFeatures;
