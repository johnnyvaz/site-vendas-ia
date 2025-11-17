import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Trophy,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const CRMMASPPartnership = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Aprenda Fazendo',
      description: 'Siga as 8 etapas do MASP com orientações interativas, exemplos e ferramentas digitais integradas.',
      features: ['5W2H', 'Ishikawa', '5 Porquês', 'Pareto']
    },
    {
      icon: Users,
      title: 'Colabore e Evolua',
      description: 'Compartilhe registros, evidências e relatórios com seu mentor e equipe.',
      features: ['Acompanhamento em tempo real', 'Feedback integrado', 'Trabalho em equipe']
    },
    {
      icon: Award,
      title: 'Certificação Lean Quality',
      description: 'Receba automaticamente o certificado Lean Quality ao concluir seu projeto.',
      features: ['Certificado reconhecido', 'Validação de competências', 'Destaque profissional']
    },
    {
      icon: Sparkles,
      title: 'Agente Digital MASP',
      description: 'IA que te apoia em cada etapa, sugerindo perguntas, dicas e planos de ação.',
      features: ['Assistência inteligente', 'Sugestões personalizadas', 'Disponível 24/7']
    },
    {
      icon: TrendingUp,
      title: 'Resultados Mensuráveis',
      description: 'Dashboards e relatórios automáticos mostram seu progresso e impacto.',
      features: ['Métricas em tempo real', 'Análise de impacto', 'Visualização de progresso']
    },
    {
      icon: Target,
      title: 'Método Comprovado',
      description: 'O MASP é o método mais reconhecido de melhoria contínua e resolução de problemas.',
      features: ['8 etapas estruturadas', 'Aplicação prática', 'Resultados garantidos']
    }
  ];

  return (
    <section id="masp" className="section-padding bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="container-custom relative">
        {/* Partnership Badge */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-2 border-green-500/20 rounded-full px-6 py-3">
            <Trophy className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Em parceria com Lean Quality
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient">
            MASP Lean Quality
          </h2>

          <p className="text-2xl md:text-3xl font-semibold text-foreground max-w-4xl mx-auto">
            Seu Guia Digital para Resultados Reais
          </p>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme teoria em prática com uma plataforma que guia você passo a passo na resolução de problemas reais.
            O método mais reconhecido de melhoria contínua, agora na palma da sua mão.
          </p>
        </div>

        {/* Main Value Proposition */}
        <div className="mb-16">
          <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-blue-500/5 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Por que o MASP Lean Quality é ideal para você?
              </CardTitle>
              <CardDescription className="text-lg">
                Uma plataforma completa para dominar o MASP e se destacar profissionalmente
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500/50 bg-card/50 backdrop-blur"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mb-16">
          <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-blue-500/5">
            <CardContent className="pt-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-foreground italic max-w-4xl mx-auto">
                  "Com o MASP Lean Quality, consegui aplicar o método no meu projeto de estágio,
                  resolver um problema real e ainda garantir minha certificação.
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Recomendo para todos que querem se destacar!</span>"
                </blockquote>
                <p className="text-muted-foreground font-semibold">— Mentorado Lean Quality</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Highlight */}
        <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 rounded-2xl p-8 md:p-12 border-2 border-green-500/20 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">O que você ganha com o MASP Lean Quality</h3>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">8 Etapas Estruturadas do MASP</h4>
                  <p className="text-muted-foreground">Metodologia completa com orientação passo a passo</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Ferramentas Digitais Integradas</h4>
                  <p className="text-muted-foreground">5W2H, Ishikawa, 5 Porquês, Pareto e muito mais</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Acompanhamento com Mentor</h4>
                  <p className="text-muted-foreground">Compartilhe progresso e receba feedback especializado</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Certificação Reconhecida</h4>
                  <p className="text-muted-foreground">Certificado Lean Quality ao concluir seu projeto</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Dashboards Inteligentes</h4>
                  <p className="text-muted-foreground">Visualize progresso, impacto e resultados em tempo real</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Agente IA Especializado</h4>
                  <p className="text-muted-foreground">Assistente inteligente disponível 24/7 para te guiar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold">
            Pronto para ser um diferencial?
          </h3>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experimente o MASP Lean Quality e transforme desafios em conquistas.
            Seja protagonista da sua evolução.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 text-lg group"
            >
              Quero Ser Lean Quality!
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-6 text-lg group"
            >
              Saber Mais
              <ExternalLink className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Seja Lean Quality. Seja protagonista da sua evolução.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default CRMMASPPartnership;
