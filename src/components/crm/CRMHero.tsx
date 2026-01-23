import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const CRMHero = () => {
  const handleCTAClick = (action: string) => {
    console.log('CTA Click:', action);
  };

  return (
    <section className="hero-bg text-white section-padding min-h-screen flex items-center relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2">
            Para PMEs que prospectam via WhatsApp
          </Badge>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Pare de Caçar Leads no Google.
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Deixe a Máquina Trabalhar.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              O único CRM brasileiro que encontra empresas no Google Maps,
              qualifica com IA e dispara pelo WhatsApp.
            </p>
          </div>

          {/* Key Benefits - Only 2 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Scraping Google Maps</div>
                <div className="text-sm text-white/70">Leads com telefone e email</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">WhatsApp Nativo</div>
                <div className="text-sm text-white/70">Feito pro mercado brasileiro</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold px-12 py-6 h-auto text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => {
                handleCTAClick('whatsapp_trial');
                window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20testar%20o%20CRM%20Vendas%20IA%20por%207%20dias%20gr%C3%A1tis!', '_blank');
              }}
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Testar 7 Dias Gratis
            </Button>

            {/* Simple Trust Signal */}
            <p className="text-sm text-white/70">
              Comece em 24h, cancele quando quiser
            </p>
          </div>
        </div>
      </div>

      {/* Simplified Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/10 rounded-full"></div>
      </div>
    </section>
  );
};

export default CRMHero;
