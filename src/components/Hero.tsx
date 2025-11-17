import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, Play, Users, Star, MessageSquare, Brain, Zap, TrendingUp, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-vendas-ia.jpg';
import WhatsAppCTA from '@/components/ui/WhatsAppCTA';
import { useAnalytics } from '@/hooks/useAnalytics';
import OptimizedImage from '@/components/ui/OptimizedImage';

const Hero = () => {
  const { trackEvent } = useAnalytics();

  const handleCTAClick = (action: string) => {
    trackEvent('cta_click', {
      action,
      location: 'hero',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <section id="inicio" className="hero-bg text-white section-padding min-h-screen flex items-center relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Star className="w-4 h-4 mr-2" />
              Confiado por 1000+ empresas no Brasil
            </Badge>

            {/* Urgency Indicator */}
            <div className="flex items-center space-x-2 text-green-300">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                🚀 Johnny Vaz online agora - Resposta garantida em 2h
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Ecossistema <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">IA Completo</span>
                <br />
                para Vendas
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Do primeiro contato à venda fechada: automações inteligentes, 
                vendedor IA e ferramentas que aumentam suas vendas em até <strong>300%</strong>
              </p>
            </div>

            {/* Enhanced Benefits */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: MessageSquare,
                  title: 'Disparo Rápido WhatsApp',
                  description: 'Automation de mensagens em massa'
                },
                {
                  icon: Brain,
                  title: 'Vendedor IA 24/7',
                  description: 'Qualifica e converte automaticamente'
                },
                {
                  icon: Zap,
                  title: 'Landing Pages IA',
                  description: 'Captura leads com alta conversão'
                },
                {
                  icon: TrendingUp,
                  title: 'Analytics Inteligente',
                  description: 'Insights automáticos e previsões'
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
                <div className="metric-highlight">3.2x</div>
                <div className="text-sm text-white/80">ROI médio</div>
              </div>
              <div className="text-center">
                <div className="metric-highlight">+127%</div>
                <div className="text-sm text-white/80">em conversões</div>
              </div>
              <div className="text-center">
                <div className="metric-highlight">&lt;24h</div>
                <div className="text-sm text-white/80">primeiros resultados</div>
              </div>
            </div>

            {/* Enhanced CTAs */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold px-10 py-5 h-auto text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20conhecer%20o%20Ecossistema%20IA%20para%20Vendas!', '_blank')}
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Falar com Johnny Agora
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-5 h-auto text-lg"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Ver Portfolio Completo
                </Button>
              </div>

              {/* Social Proof Strip */}
              <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  <span>Garantia 30 dias</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  <span>Suporte incluído</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-green-400" />
                  <span>ROI garantido</span>
                </div>
              </div>

              {/* Demo Link */}
              <button className="flex items-center justify-center space-x-2 text-white/80 hover:text-white transition-colors group w-full">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="underline">Assistir demo de 3 minutos - Vendas reais</span>
              </button>
            </div>
          </div>

          {/* Right Column - Animated Visualization */}
          <div className="relative flex items-center justify-center">
            {/* Animated Hero Visualization */}
            <div className="relative z-10 w-full max-w-md h-80 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 overflow-hidden">
              {/* Animated Background Circles */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Central AI Brain Animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Core Brain */}
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white animate-pulse" />
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute inset-0 animate-spin" style={{animationDuration: '8s'}}>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-400 rounded-full shadow-lg flex items-center justify-center">
                      <MessageSquare className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-purple-400 rounded-full shadow-lg flex items-center justify-center">
                      <TrendingUp className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-5 h-5 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
                      <Users className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Flow Lines */}
              <div className="absolute inset-0">
                {/* Animated flowing lines */}
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                      <stop offset="50%" stopColor="rgba(34, 197, 94, 0.8)" />
                      <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Flowing data lines */}
                  <path d="M50 200 Q200 100 350 200" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
                  <path d="M50 150 Q200 250 350 150" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                  <path d="M100 100 Q200 200 300 300" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                </svg>
              </div>

              {/* Floating Data Points */}
              <div className="absolute top-12 left-12 bg-white/20 backdrop-blur-sm rounded-lg p-1.5 animate-bounce" style={{animationDelay: '0.5s'}}>
                <div className="text-xs text-white font-semibold">Leads</div>
                <div className="text-sm text-green-400 font-bold">+340%</div>
              </div>

              <div className="absolute top-16 right-12 bg-white/20 backdrop-blur-sm rounded-lg p-1.5 animate-bounce" style={{animationDelay: '1.5s'}}>
                <div className="text-xs text-white font-semibold">Conversão</div>
                <div className="text-sm text-blue-400 font-bold">87%</div>
              </div>

              <div className="absolute bottom-16 left-12 bg-white/20 backdrop-blur-sm rounded-lg p-1.5 animate-bounce" style={{animationDelay: '2.5s'}}>
                <div className="text-xs text-white font-semibold">ROI</div>
                <div className="text-sm text-purple-400 font-bold">3.2x</div>
              </div>

              <div className="absolute bottom-12 right-12 bg-white/20 backdrop-blur-sm rounded-lg p-1.5 animate-bounce" style={{animationDelay: '3s'}}>
                <div className="text-xs text-white font-semibold">Vendas</div>
                <div className="text-sm text-yellow-400 font-bold">24/7</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg animate-pulse z-20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">+47% vendas</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg z-20">
              <div className="text-sm font-semibold">IA Score: 95/100</div>
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

export default Hero;