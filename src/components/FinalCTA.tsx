import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target } from 'lucide-react';

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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Falar com um especialista
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              className="btn-secondary text-lg px-8 py-4"
            >
              Quero começar agora
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Sem compromisso inicial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Diagnóstico gratuito</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Dados 100% seguros</span>
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