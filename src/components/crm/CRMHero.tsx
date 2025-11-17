import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Users, 
  Target, 
  MessageSquare,
  Database,
  BarChart3,
  Shield,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';

const CRMHero = () => {
  const handleCTAClick = (action: string) => {
    console.log('CTA Click:', action);
  };

  return (
    <section className="hero-bg text-white section-padding min-h-screen flex items-center relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Star className="w-4 h-4 mr-2" />
              O CRM que trabalha por você
            </Badge>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  CRM Vendas IA
                </span>
                <br />
                IA + Automação + Leads Infinitos
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Transforme dados em oportunidades reais de negócio com o poder da automação inteligente 
                e da Inteligência Artificial. Tudo em um só lugar.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Database,
                  title: 'Leads Automáticos',
                  description: 'Scraping do Google Maps'
                },
                {
                  icon: Brain,
                  title: 'IA Generativa',
                  description: 'Qualificação inteligente'
                },
                {
                  icon: MessageSquare,
                  title: 'Multi-canal',
                  description: 'Email, WhatsApp, LinkedIn'
                },
                {
                  icon: BarChart3,
                  title: 'Dashboard Real-time',
                  description: 'KPIs e previsões com IA'
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{benefit.title}</div>
                    <div className="text-xs text-white/70">{benefit.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="metric-highlight">500+</div>
                <div className="text-sm text-white/80">leads/dia</div>
              </div>
              <div className="text-center">
                <div className="metric-highlight">3x</div>
                <div className="text-sm text-white/80">mais conversões</div>
              </div>
              <div className="text-center">
                <div className="metric-highlight">50%</div>
                <div className="text-sm text-white/80">menos tempo</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold px-10 py-5 h-auto text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  onClick={() => {
                    handleCTAClick('whatsapp_trial');
                    window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20testar%20o%20CRM%20Vendas%20IA%20por%207%20dias%20gr%C3%A1tis!', '_blank');
                  }}
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Testar 7 Dias Grátis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-5 h-auto text-lg"
                  onClick={() => handleCTAClick('demo_video')}
                >
                  <BarChart3 className="w-6 h-6 mr-3" />
                  Ver Demonstração
                </Button>
              </div>

              {/* Social Proof Strip */}
              <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  <span>7 dias grátis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  <span>Sem cartão</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-green-400" />
                  <span>Setup em 24h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Animated Visualization */}
          <div className="relative flex items-center justify-center">
            {/* CRM Dashboard Mockup */}
            <div className="relative z-10 w-full max-w-md h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Central CRM Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <Database className="w-10 h-10 text-white" />
                  </div>

                  {/* Orbiting Features */}
                  <div className="absolute inset-0 animate-spin" style={{animationDuration: '10s'}}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full shadow-lg flex items-center justify-center">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full shadow-lg flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-400 rounded-full shadow-lg flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Metrics */}
              <div className="absolute top-12 left-8 bg-white/20 backdrop-blur-sm rounded-lg p-2 animate-bounce" style={{animationDelay: '0.5s'}}>
                <div className="text-xs text-white font-semibold">Leads Hoje</div>
                <div className="text-lg text-green-400 font-bold">+547</div>
              </div>

              <div className="absolute top-16 right-8 bg-white/20 backdrop-blur-sm rounded-lg p-2 animate-bounce" style={{animationDelay: '1.5s'}}>
                <div className="text-xs text-white font-semibold">Taxa Conv.</div>
                <div className="text-lg text-blue-400 font-bold">23%</div>
              </div>

              <div className="absolute bottom-16 left-8 bg-white/20 backdrop-blur-sm rounded-lg p-2 animate-bounce" style={{animationDelay: '2.5s'}}>
                <div className="text-xs text-white font-semibold">Pipeline</div>
                <div className="text-lg text-purple-400 font-bold">R$ 2.3M</div>
              </div>

              <div className="absolute bottom-12 right-8 bg-white/20 backdrop-blur-sm rounded-lg p-2 animate-bounce" style={{animationDelay: '3s'}}>
                <div className="text-xs text-white font-semibold">Score IA</div>
                <div className="text-lg text-yellow-400 font-bold">98/100</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg animate-pulse z-20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">+300% ROI</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg z-20">
              <div className="text-sm font-semibold">100% Automatizado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/10 rounded-full"></div>
      </div>
    </section>
  );
};

export default CRMHero;