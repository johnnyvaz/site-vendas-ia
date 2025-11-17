import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  TrendingUp, 
  MessageSquare, 
  BarChart3,
  CheckCircle,
  Target
} from 'lucide-react';

const CRMTargetAudience = () => {
  const audiences = [
    {
      icon: Briefcase,
      title: 'Empresários e Gestores',
      description: 'Que precisam de previsibilidade de receita',
      painPoints: [
        'Falta de visibilidade do pipeline',
        'Dificuldade em prever receita',
        'Processos manuais e demorados',
        'Perda de oportunidades'
      ],
      benefits: [
        'Dashboard executivo em tempo real',
        'Previsões precisas com IA',
        'Automação completa do funil',
        'Alertas de oportunidades'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Gerentes Comerciais',
      description: 'Que desejam controle total do funil',
      painPoints: [
        'Falta de controle sobre o time',
        'Leads mal qualificados',
        'Baixa taxa de conversão',
        'Relatórios manuais'
      ],
      benefits: [
        'Gestão completa do pipeline',
        'Score automático de leads',
        'Análise de performance do time',
        'Relatórios automáticos'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageSquare,
      title: 'Vendedores',
      description: 'Que querem leads quentes e follow-ups automáticos',
      painPoints: [
        'Leads frios e desqualificados',
        'Esquecimento de follow-ups',
        'Tarefas administrativas',
        'Falta de informações do lead'
      ],
      benefits: [
        'Leads qualificados automaticamente',
        'Follow-ups automáticos',
        'Histórico completo do lead',
        'Mais tempo para vender'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Times de Marketing',
      description: 'Que buscam ROI comprovado nas campanhas',
      painPoints: [
        'Dificuldade em medir ROI',
        'Leads não convertidos',
        'Falta de integração com vendas',
        'Campanhas sem dados'
      ],
      benefits: [
        'Tracking completo de campanhas',
        'ROI em tempo real',
        'Integração total com vendas',
        'Otimização com IA'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="para-quem" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            <Target className="w-4 h-4 mr-2" />
            Para Quem é o CRM Vendas IA
          </Badge>
          <h2 className="gradient-text">
            Feito para Quem Quer Vender Mais
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seja você empresário, gerente, vendedor ou profissional de marketing, 
            o CRM Vendas IA foi desenvolvido para resolver seus desafios específicos.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.color} flex items-center justify-center mb-4`}>
                  <audience.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">{audience.title}</CardTitle>
                <CardDescription className="text-base">{audience.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pain Points */}
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Seus Desafios:
                    </h4>
                    <div className="space-y-2">
                      {audience.painPoints.map((pain, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2">•</span>
                          <span>{pain}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Suas Soluções:
                    </h4>
                    <div className="space-y-2">
                      {audience.benefits.map((benefit, idx) => (
                        <div key={idx} className="text-sm flex items-start">
                          <CheckCircle className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30 border-2">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">
                Independente do seu cargo, o CRM Vendas IA tem a solução ideal
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Fale com nossos especialistas e descubra como podemos ajudar você e sua equipe 
                a vender mais e melhor.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('planos');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold text-lg cursor-pointer"
              >
                <span>Ver planos e começar agora</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CRMTargetAudience;