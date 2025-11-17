import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Building2,
  Briefcase,
  Package,
  Quote,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CRMCaseStudies = () => {
  const caseStudies = [
    {
      company: 'Agência Digital',
      industry: 'Marketing & Tecnologia',
      icon: Building2,
      challenge: 'Baixa geração de leads qualificados e processo manual de prospecção',
      solution: 'Implementação do scraping automático do Google Maps + Score IA',
      results: [
        {
          metric: '+500',
          description: 'leads qualificados por dia',
          icon: Users
        },
        {
          metric: '3x',
          description: 'aumento em conversões',
          icon: TrendingUp
        },
        {
          metric: '70%',
          description: 'redução no tempo de prospecção',
          icon: Clock
        }
      ],
      testimonial: 'O CRM Vendas IA transformou completamente nosso processo de vendas. Antes gastávamos horas buscando leads manualmente, agora temos centenas de leads qualificados chegando automaticamente todos os dias.',
      author: 'Carlos Silva',
      role: 'CEO',
      color: 'from-blue-500 to-blue-600'
    },
    {
      company: 'Consultoria Empresarial',
      industry: 'Serviços B2B',
      icon: Briefcase,
      challenge: 'Ciclo de vendas longo e falta de previsibilidade no pipeline',
      solution: 'Dashboard executivo + IA preditiva + Alertas automáticos',
      results: [
        {
          metric: '50%',
          description: 'redução no ciclo de vendas',
          icon: Clock
        },
        {
          metric: '95%',
          description: 'precisão nas previsões',
          icon: TrendingUp
        },
        {
          metric: 'R$ 1.2M',
          description: 'em pipeline identificado',
          icon: DollarSign
        }
      ],
      testimonial: 'A IA preditiva nos ajudou a identificar oportunidades que estavam passando despercebidas. Agora conseguimos prever com precisão quais negócios vão fechar e quando.',
      author: 'Ana Paula Rodrigues',
      role: 'Diretora Comercial',
      color: 'from-green-500 to-green-600'
    },
    {
      company: 'Distribuidor de Produtos',
      industry: 'Varejo & Distribuição',
      icon: Package,
      challenge: 'Base de 10 mil contatos inativos e baixa taxa de reativação',
      solution: 'Automação multi-canal + Segmentação inteligente + Follow-ups automáticos',
      results: [
        {
          metric: '10k',
          description: 'contatos reativados',
          icon: Users
        },
        {
          metric: 'R$ 500k',
          description: 'em vendas recuperadas',
          icon: DollarSign
        },
        {
          metric: '23%',
          description: 'taxa de conversão',
          icon: TrendingUp
        }
      ],
      testimonial: 'Tínhamos uma base enorme de contatos que não conseguíamos trabalhar. Com as automações do CRM Vendas IA, reativamos milhares de clientes e recuperamos centenas de milhares em vendas.',
      author: 'Roberto Mendes',
      role: 'Gerente de Vendas',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="casos-sucesso" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            Casos de Sucesso
          </Badge>
          <h2 className="gradient-text">
            Resultados Reais de Empresas Brasileiras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Veja como empresas de diferentes segmentos estão transformando suas vendas 
            com o CRM Vendas IA
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Company Info & Challenge */}
                <div className={`bg-gradient-to-br ${study.color} text-white p-8 lg:p-12`}>
                  <div className="space-y-6">
                    {/* Company Header */}
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <study.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{study.company}</h3>
                        <p className="text-white/80">{study.industry}</p>
                      </div>
                    </div>

                    {/* Challenge */}
                    <div>
                      <h4 className="font-semibold mb-2 text-white/90">Desafio:</h4>
                      <p className="text-white/90">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="font-semibold mb-2 text-white/90">Solução:</h4>
                      <p className="text-white/90">{study.solution}</p>
                    </div>

                    {/* Results Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="text-center">
                          <result.icon className="w-6 h-6 mx-auto mb-2 text-white/80" />
                          <div className="text-2xl font-bold mb-1">{result.metric}</div>
                          <div className="text-xs text-white/80">{result.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Testimonial */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <Quote className="w-12 h-12 text-primary/20" />
                    <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                      "{study.testimonial}"
                    </blockquote>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{study.author}</p>
                        <p className="text-sm text-muted-foreground">{study.role}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Empresas Atendidas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">R$ 50M+</div>
            <div className="text-muted-foreground">Em Vendas Geradas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10M+</div>
            <div className="text-muted-foreground">Leads Processados</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfação</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold mb-4">
                Pronto para Ser o Próximo Caso de Sucesso?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Junte-se a centenas de empresas que já transformaram suas vendas com o CRM Vendas IA
              </p>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 h-auto text-lg"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20transformar%20minhas%20vendas%20com%20o%20CRM%20Vendas%20IA!', '_blank')}
              >
                Começar Minha Transformação
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CRMCaseStudies;