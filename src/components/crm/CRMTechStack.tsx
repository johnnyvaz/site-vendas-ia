import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Database, 
  Zap, 
  Shield, 
  Gauge,
  Globe,
  CheckCircle,
  Cpu
} from 'lucide-react';

const CRMTechStack = () => {
  const technologies = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      techs: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      category: 'Backend',
      icon: Database,
      color: 'from-green-500 to-green-600',
      techs: ['Fastify', 'Node.js', 'PostgreSQL', 'Redis']
    },
    {
      category: 'IA & Automação',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      techs: ['OpenAI GPT-4', 'N8N', 'ChatWoot', 'Machine Learning']
    },
    {
      category: 'Infraestrutura',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      techs: ['Supabase', 'Docker', 'CDN Global']
    }
  ];

  const features = [
    {
      icon: Gauge,
      title: 'Performance',
      description: 'Arquitetura otimizada para alta performance e baixa latência',
      metrics: '< 100ms resposta'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Criptografia end-to-end, JWT, Row Level Security e backups automáticos',
      metrics: '99.9% uptime'
    },
    {
      icon: Zap,
      title: 'Escalabilidade',
      description: 'Infraestrutura cloud que escala automaticamente conforme demanda',
      metrics: 'Auto-scaling'
    }
  ];

  const integrations = [
    'N8N - Automação sem código',
    'ChatWoot - Atendimento multicanal',
    'OpenAI GPT-4 - IA generativa',
    'Google Maps API - Scraping de leads',
    'WhatsApp Business API',
    'Email Marketing (em breve)',
    'LinkedIn API - (em breve)',
    'Webhooks personalizados',
    'API REST completa',
    'Zapier & Make.com - (em breve)'
  ];

  return (
    <section id="tecnologia" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            <Code className="w-4 h-4 mr-2" />
            Tecnologia de Ponta
          </Badge>
          <h2 className="gradient-text">
            Construído com as Melhores Tecnologias
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desenvolvido com React, Fastify, PostgreSQL, Redis e Supabase. 
            O CRM Vendas IA combina performance, segurança e escalabilidade.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3`}>
                  <tech.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg">{tech.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tech.techs.map((t, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-2">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Badge variant="secondary" className="font-semibold">
                  {feature.metrics}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrations */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Zap className="w-8 h-8 text-primary" />
              <span>Integrações Nativas</span>
            </CardTitle>
            <CardDescription className="text-base">
              Conecte o CRM Vendas IA com suas ferramentas favoritas sem escrever uma linha de código
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center space-x-2 bg-background/50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium">{integration}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30 border-2">
            <CardContent className="py-8">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">
                Segurança e Conformidade Garantidas
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Todos os dados são criptografados, armazenados em servidores seguros e em conformidade 
                com a LGPD. Backups automáticos diários garantem que seus dados nunca sejam perdidos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CRMTechStack;