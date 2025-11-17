import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Users, 
  Eye, 
  Code, 
  Presentation, 
  Handshake,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CRMMandala = () => {
  const mandalaSteps = [
    {
      number: 1,
      name: 'Autoconhecimento',
      icon: Brain,
      description: 'Descubra suas forças, valores e propósito empreendedor',
      color: 'from-purple-500 to-purple-600',
      benefits: [
        'Clareza sobre seus objetivos',
        'Identificação de competências',
        'Alinhamento de valores'
      ]
    },
    {
      number: 2,
      name: 'Conexões',
      icon: Users,
      description: 'Construa uma rede estratégica de relacionamentos',
      color: 'from-blue-500 to-blue-600',
      benefits: [
        'Network qualificado',
        'Parcerias estratégicas',
        'Mentoria especializada'
      ]
    },
    {
      number: 3,
      name: 'Visão',
      icon: Eye,
      description: 'Transforme ideias em visão de negócio estruturada',
      color: 'from-green-500 to-green-600',
      benefits: [
        'Modelo de negócio claro',
        'Proposta de valor definida',
        'Roadmap estratégico'
      ]
    },
    {
      number: 4,
      name: 'Desenvolvimento',
      icon: Code,
      description: 'Construa seu MVP e valide no mercado',
      color: 'from-yellow-500 to-yellow-600',
      benefits: [
        'Produto mínimo viável',
        'Validação com clientes',
        'Iteração rápida'
      ]
    },
    {
      number: 5,
      name: 'Pitch',
      icon: Presentation,
      description: 'Comunique sua ideia de forma impactante',
      color: 'from-orange-500 to-orange-600',
      benefits: [
        'Apresentação profissional',
        'Storytelling efetivo',
        'Preparação para investidores'
      ]
    },
    {
      number: 6,
      name: 'Encontro',
      icon: Handshake,
      description: 'Conecte-se com investidores e parceiros',
      color: 'from-red-500 to-red-600',
      benefits: [
        'Acesso a investidores',
        'Negociação estruturada',
        'Fechamento de parcerias'
      ]
    }
  ];

  return (
    <section id="mandala" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            Exclusivo do CRM Vendas IA
          </Badge>
          <h2 className="gradient-text">
            Mandala da Inovação
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            O único CRM com metodologia de inovação integrada. Um assistente de IA que ajuda 
            empreendedores a transformar ideias em negócios estruturados.
          </p>
        </div>

        {/* Main Description */}
        <Card className="mb-16 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <Brain className="w-8 h-8 text-primary" />
              <span>O Consultor de IA que Pensa Como Você</span>
            </CardTitle>
            <CardDescription className="text-base">
              A Mandala da Inovação é um assistente de IA que guia você através de seis elos fundamentais 
              para transformar insights em investimentos reais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-lg font-semibold text-primary">
              <Lightbulb className="w-6 h-6" />
              <span>Do insight ao investimento — a IA guia você em cada etapa</span>
            </div>
          </CardContent>
        </Card>

        {/* Mandala Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mandalaSteps.map((step, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden"
            >
              {/* Step Number Badge */}
              <div className="absolute top-4 right-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {step.number}
                </div>
              </div>

              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{step.name}</CardTitle>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {step.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flow Visualization */}
        <div className="mb-16">
          <Card className="bg-muted/50 border-2">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-center mb-8">Jornada Completa de Inovação</h3>
              <div className="flex items-center justify-center flex-wrap gap-4">
                {mandalaSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs font-semibold mt-2 text-center max-w-[80px]">
                        {step.name}
                      </span>
                    </div>
                    {index < mandalaSteps.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-primary mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-2">
            <CardContent className="pt-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">IA Personalizada</h4>
              <p className="text-muted-foreground">
                Assistente que aprende com você e adapta as recomendações ao seu perfil
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2">
            <CardContent className="pt-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Metodologia Validada</h4>
              <p className="text-muted-foreground">
                Baseada em frameworks de inovação reconhecidos mundialmente
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2">
            <CardContent className="pt-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Handshake className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-bold text-lg mb-2">Resultados Concretos</h4>
              <p className="text-muted-foreground">
                Da ideia ao pitch pronto para investidores em semanas, não meses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-white/80" />
              <h3 className="text-3xl font-bold mb-4">
                Transforme Sua Ideia em Negócio
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                A Mandala da Inovação está incluída em todos os planos do CRM Vendas IA. 
                Comece sua jornada empreendedora hoje mesmo.
              </p>
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-bold px-10 py-6 h-auto text-lg"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20conhecer%20a%20Mandala%20da%20Inova%C3%A7%C3%A3o!', '_blank')}
              >
                Conhecer a Mandala da Inovação
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CRMMandala;