import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, Gift, CheckCircle } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="section-padding hero-bg text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Pronto para transformar suas vendas com{' '}
            <span className="text-accent">IA</span>?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Vamos diagnosticar suas oportunidades e priorizar os primeiros ganhos em dias.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Setup em 24h</h3>
              <p className="text-white/80 text-sm">Implementação express com resultados imediatos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">ROI Garantido</h3>
              <p className="text-white/80 text-sm">Resultados mensuráveis desde o primeiro mês</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Suporte Total</h3>
              <p className="text-white/80 text-sm">Equipe dedicada para seu sucesso</p>
            </div>
          </div>

          {/* CRM Free Banner */}
          <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50 rounded-2xl p-6 mb-8 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">LeadCRM 100% Gratuito</h3>
                <p className="text-green-200 text-sm">Comece agora sem cartão de crédito</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Até 100 leads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Pipeline visual</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Multi-empresa</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-10 py-6 h-auto shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => window.open('https://crm.vendas.ia.br', '_blank')}
            >
              <Gift className="mr-2 w-6 h-6" />
              Começar CRM Grátis
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20conhecer%20o%20Ecossistema%20IA%20para%20Vendas!', '_blank')}
            >
              Falar com Johnny
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80 text-sm mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Cadastro em 30 segundos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Grátis para sempre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/20 rounded-full animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default FinalCTA;