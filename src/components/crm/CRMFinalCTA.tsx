import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const CRMFinalCTA = () => {
  const handleCTAClick = (action: string) => {
    console.log('CTA Click:', action);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Main CTA Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary to-secondary text-white overflow-hidden max-w-3xl mx-auto">
          <CardContent className="py-12 px-8">
            <div className="text-center space-y-6">
              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-bold">
                Comece Hoje. Cancele Quando Quiser.
              </h2>
              <p className="text-lg text-white/90">
                7 dias para testar tudo. Sem cartao.
              </p>

              {/* Main CTA Button */}
              <div className="space-y-3 pt-2">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 h-auto text-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    handleCTAClick('whatsapp_final');
                    window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20testar%20o%20CRM%20Vendas%20IA%20por%207%20dias%20gr%C3%A1tis!', '_blank');
                  }}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Testar Gratis no WhatsApp
                </Button>
                <p className="text-sm text-white/70">
                  Resposta em ate 2 horas
                </p>
              </div>

              {/* Reference note */}
              <p className="text-sm text-white/60 pt-4">
                Quer referencias de clientes? Peca ao Johnny no WhatsApp
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CRMFinalCTA;
