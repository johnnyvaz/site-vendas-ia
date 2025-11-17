import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Database, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const CRMFeatures = () => {
  const mainFeatures = [
    {
      icon: Users,
      title: 'Gestão de Leads Inteligente',
      description: 'Importação em massa, enriquecimento automático e validação de contatos',
      features: [
        'Score automático de qualificação (Hot, Warm, Cold)',
        'Histórico completo de interações e anotações',
        'Segmentação avançada por múltiplos critérios',
        'Enriquecimento de dados com IA'
      ],
      metrics: '95% precisão',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Funil de Vendas Personalizável',
      description: 'Arraste e solte leads entre estágios com visualização completa do pipeline',
      features: [
        'Visualização completa do pipeline',
        'Taxas de conversão e gargalos em tempo real',
        'Previsão de fechamento com IA',
        'Alertas automáticos de oportunidades'
      ],
      metrics: '3x conversão',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Database,
      title: 'Scraping Avançado do Google Maps',
      description: 'Gere milhares de leads qualificados por segmento automaticamente',
      features: [
        'Dados atualizados: telefone, site, avaliações',
        'Filtros por localização e categoria',
        '100% automatizado, sem planilhas',
        'Validação automática de dados'
      ],
      metrics: '1000+ leads/dia',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Executivo em Tempo Real',
      description: 'KPIs de conversão, performance e receita com gráficos interativos',
      features: [
        'Gráficos interativos e comparativos mensais',
        'Alertas automáticos de oportunidades',
        'Análise preditiva com IA',
        'Relatórios personalizáveis'
      ],
      metrics: 'Real-time',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: MessageSquare,
      title: 'Automação Multi-canal',
      description: 'Campanhas automatizadas em email, WhatsApp e LinkedIn',
      features: [
        'Sequências de follow-up automáticas',
        'Personalização com IA generativa',
        'A/B testing integrado',
        'Respostas automáticas inteligentes'
      ],
      metrics: '85% abertura',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Segurança Empresarial',
      description: 'Multi-tenancy completo com dados isolados e criptografados',
      features: [
        'Autenticação JWT e Row Level Security',
        'Controle de acessos e permissões',
        'Logs e auditoria completa',
        'Backup automático diário'
      ],
      metrics: '100% seguro',
      color: 'from-red-500 to-red-600'
    }
  ];

  const additionalFeatures = [
    {
      icon: Brain,
      title: 'IA Generativa GPT-4',
      description: 'Qualificação e classificação automática de leads'
    },
    {
      icon: Zap,
      title: 'Integrações N8N',
      description: 'Conecte com 1000+ ferramentas sem código'
    },
    {
      icon: Target,
      title: 'Score Preditivo',
      description: 'Preveja quais leads têm maior chance de conversão'
    },
    {
      icon: Globe,
      title: 'API Completa',
      description: 'Integre com seus sistemas existentes'
    }
  ];

  return (
    <section id="recursos" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            Recursos Principais
          </Badge>
          <h2 className="gradient-text">
            Mais que um CRM. Uma Máquina de Crescimento.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chega de planilhas e processos manuais. O CRM Vendas IA conecta N8N, ChatWoot e OpenAI GPT-4 
            para automatizar todo o ciclo de vendas.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <Badge variant="secondary" className="font-semibold">
                    {feature.metrics}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border-2 border-primary/10">
          <h3 className="text-2xl font-bold text-center mb-8">E muito mais...</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-foreground italic max-w-4xl mx-auto">
            "Enquanto outros CRMs apenas organizam contatos, 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> o CRM Vendas IA cria oportunidades.</span>"
          </blockquote>
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
            <span>Ver planos e começar agora</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CRMFeatures;