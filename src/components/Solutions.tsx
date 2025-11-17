import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Target, 
  BarChart3, 
  Repeat, 
  TrendingUp, 
  MessageSquare, 
  Shield, 
  Settings, 
  Webhook, 
  Clock,
  ArrowRight
} from 'lucide-react';

const Solutions = () => {
  return (
    <section id="solucoes" className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            🚀 Ecossistema Completo
          </Badge>
          <h2 className="gradient-text">4 Soluções Poderosas que Trabalham Juntas</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Do primeiro contato à venda fechada: <strong className="text-foreground">Disparo Rápido</strong>, 
            <strong className="text-foreground"> Vendedor IA</strong>, <strong className="text-foreground">Landing Pages IA</strong> 
            e <strong className="text-foreground">Analytics Inteligente</strong> integrados para maximizar ROI
          </p>
          
          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">300%</div>
              <div className="text-sm text-muted-foreground">Aumento médio em vendas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">48h</div>
              <div className="text-sm text-muted-foreground">Setup completo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-muted-foreground">Atendimento automatizado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1000+</div>
              <div className="text-sm text-muted-foreground">Empresas atendidas</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Disparo Rápido WhatsApp */}
          <div className="feature-card space-y-6 border-l-4 border-l-green-500">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Disparo Rápido WhatsApp</h3>
                  <Badge className="bg-green-100 text-green-700 mt-1">🔥 Mais Popular</Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Automação completa de WhatsApp para vendas.</strong> 
                {' '}Envios em massa, templates personalizados, follow-up automático e métricas detalhadas.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: 'Disparos em massa personalizados',
                  description: 'Até 10.000 mensagens/dia com rotação de contas'
                },
                {
                  icon: BarChart3,
                  title: 'Templates inteligentes com IA',
                  description: 'Personalização automática por segmento'
                },
                {
                  icon: TrendingUp,
                  title: 'Métricas completas de conversão',
                  description: 'Entregues, visualizadas, respostas e vendas'
                },
                {
                  icon: Repeat,
                  title: 'Follow-up automático inteligente',
                  description: 'Sequências baseadas no comportamento do lead'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-green-800 mb-2">💡 Resultado Real:</div>
              <div className="text-sm text-green-700">"Aumentamos 400% nossa geração de leads B2B em 30 dias" - Cliente Ativo</div>
            </div>

            <Button 
              className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 w-full text-white font-bold"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Quero%20conhecer%20o%20Disparo%20R%C3%A1pido%20WhatsApp!', '_blank')}
            >
              Ver Disparo Rápido em Ação
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Vendedor IA 24/7 */}
          <div className="feature-card space-y-6 border-l-4 border-l-blue-500">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Vendedor IA 24/7</h3>
                  <Badge className="bg-blue-100 text-blue-700 mt-1">🤖 Inteligência Avançada</Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Seu SDR virtual que nunca dorme.</strong> 
                {' '}Atende, qualifica, apresenta soluções e agenda reuniões automaticamente.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Database,
                  title: 'Qualificação inteligente de leads',
                  description: 'BANT + score de propensão de compra'
                },
                {
                  icon: Target,
                  title: 'Apresentação personalizada',
                  description: 'Soluções customizadas por segmento'
                },
                {
                  icon: TrendingUp,
                  title: 'Agendamento automático',
                  description: 'Integração com calendário e CRM'
                },
                {
                  icon: Webhook,
                  title: 'Handoff inteligente para humanos',
                  description: 'Transfer contextual para o time de vendas'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-blue-800 mb-2">🎯 Performance Real:</div>
              <div className="text-sm text-blue-700">"Nossa taxa de conversão subiu 250% com atendimento 24h" - Empresa de Software</div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">✅ 100% Compliance LGPD</span>
            </div>

            <Button 
              className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 w-full text-white font-bold"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Quero%20ver%20o%20Vendedor%20IA%20em%20a%C3%A7%C3%A3o!', '_blank')}
            >
              Testar Vendedor IA Grátis
              <Clock className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Adicionais do Ecossistema */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Landing Pages IA */}
          <div className="feature-card space-y-6 border-l-4 border-l-purple-500">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Landing Pages IA</h3>
                  <Badge className="bg-purple-100 text-purple-700 mt-1">🎨 Alta Conversão</Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Páginas de captura otimizadas com IA.</strong> 
                {' '}Copy persuasivo, design responsivo e formulários inteligentes que convertem mais.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: 'Copy gerado por IA',
                  description: 'Headlines e textos otimizados para conversão'
                },
                {
                  icon: BarChart3,
                  title: 'A/B Testing automático',
                  description: 'Otimização contínua de performance'
                },
                {
                  icon: Settings,
                  title: 'Integração total com ferramentas',
                  description: 'CRM, e-mail marketing e analytics'
                },
                {
                  icon: TrendingUp,
                  title: 'Formulários progressivos',
                  description: 'Captura inteligente reduzindo friction'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-purple-800 mb-2">📈 Resultado Comprovado:</div>
              <div className="text-sm text-purple-700">"Conversão de 32% vs 8% das páginas tradicionais" - E-commerce B2B</div>
            </div>

            <Button 
              className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 w-full text-white font-bold"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Quero%20landing%20pages%20de%20alta%20convers%C3%A3o!', '_blank')}
            >
              Ver Exemplos de Landing Pages
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Analytics Inteligente */}
          <div className="feature-card space-y-6 border-l-4 border-l-orange-500">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Analytics Inteligente</h3>
                  <Badge className="bg-orange-100 text-orange-700 mt-1">📊 Insights Automáticos</Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Business Intelligence para vendas.</strong> 
                {' '}Dashboards automáticos, previsões de vendas e insights acionáveis.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: BarChart3,
                  title: 'Dashboards automatizados',
                  description: 'KPIs de vendas atualizados em tempo real'
                },
                {
                  icon: TrendingUp,
                  title: 'Previsão de vendas com IA',
                  description: 'Forecast baseado em dados históricos'
                },
                {
                  icon: Target,
                  title: 'Análise de funil completa',
                  description: 'Identificação de gargalos e oportunidades'
                },
                {
                  icon: Database,
                  title: 'ROI por canal e campanha',
                  description: 'Otimização de investimento em marketing'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-orange-800 mb-2">🎯 Impacto Real:</div>
              <div className="text-sm text-orange-700">"Reduzimos CAC em 45% com insights automáticos" - SaaS Brasileiro</div>
            </div>

            <Button 
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 w-full text-white font-bold"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Quero%20ver%20os%20dashboards%20de%20vendas!', '_blank')}
            >
              Ver Dashboards em Ação
              <TrendingUp className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CTA Final do Ecossistema */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">🚀 Ecossistema Completo em Ação</h3>
            <p className="text-lg mb-6 opacity-90">
              Veja como todas as 4 soluções trabalham juntas para multiplicar seus resultados
            </p>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Quero%20conhecer%20o%20Ecossistema%20IA%20completo!', '_blank')}
            >
              Falar com Johnny Agora - Resposta Garantida em 2h
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;