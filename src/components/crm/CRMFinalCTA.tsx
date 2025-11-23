import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  MessageSquare, 
  Video, 
  Mail,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Phone
} from 'lucide-react';

const CRMFinalCTA = () => {
  const handleCTAClick = (action: string) => {
    console.log('CTA Click:', action);
  };

  const contactOptions = [
    {
      icon: Video,
      title: 'Demonstração Online',
      description: 'Tour de 15 minutos com nosso time',
      action: 'demo',
      link: 'scroll-to-planos'
    },
    {
      icon: Sparkles,
      title: 'Trial Gratuito',
      description: '7 dias de acesso total',
      action: 'trial',
      link: 'https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20testar%20o%20CRM%20Vendas%20IA%20por%207%20dias%20gr%C3%A1tis!'
    },
    {
      icon: MessageSquare,
      title: 'Suporte 24/7',
      description: 'Chat, WhatsApp e e-mail',
      action: 'support',
      link: 'https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20preciso%20de%20ajuda%20com%20o%20CRM%20Vendas%20IA!'
    }
  ];

  const guarantees = [
    {
      icon: Clock,
      text: '7 dias grátis'
    },
    {
      icon: Shield,
      text: 'Sem cartão de crédito'
    },
    {
      icon: CheckCircle,
      text: 'Cancele quando quiser'
    },
    {
      icon: Zap,
      text: 'Setup em 24h'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container-custom">
        {/* Main CTA Card */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary to-secondary text-white overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/10 rounded-full"></div>
          </div>

          <CardContent className="relative z-10 py-16 px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Headline */}
              <div className="space-y-4">
                <Sparkles className="w-16 h-16 mx-auto text-white/80" />
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Pronto para Transformar Suas Vendas?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Junte-se a centenas de empresas que já estão vendendo mais com o CRM Vendas IA. 
                  Comece hoje mesmo, sem compromisso.
                </p>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-center gap-6 py-6">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <guarantee.icon className="w-5 h-5" />
                    <span className="font-medium">{guarantee.text}</span>
                  </div>
                ))}
              </div>

              {/* Main CTA Button */}
              <div className="space-y-4">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold px-12 py-7 h-auto text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  onClick={() => {
                    handleCTAClick('whatsapp_main');
                    window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20come%C3%A7ar%20com%20o%20CRM%20Vendas%20IA!', '_blank');
                  }}
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Falar com Johnny Agora
                </Button>
                <p className="text-sm text-white/80">
                  Resposta garantida em até 2 horas • Atendimento humanizado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {contactOptions.map((option, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group"
              onClick={() => {
                handleCTAClick(option.action);
                if (option.link.startsWith('http')) {
                  window.open(option.link, '_blank');
                } else if (option.link === 'scroll-to-planos') {
                  const element = document.getElementById('planos');
                  element?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = option.link;
                }
              }}
            >
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <option.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-8">
          {/* Website Link */}
          <div className="space-y-2">
            <p className="text-lg font-semibold">Acesse nosso site:</p>
            <a 
              href="https://vendas.ia.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center space-x-2"
              onClick={() => handleCTAClick('website_link')}
            >
              <span>vendas.ia.br</span>
              <Zap className="w-6 h-6" />
            </a>
          </div>

          {/* Contact Info */}
          <Card className="max-w-2xl mx-auto border-2">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="font-semibold">+55 (16) 99778-7674</p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-border"></div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-semibold">contato@johnnyvaz.com.br</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Message */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground">
              <strong className="text-foreground">CRM Vendas IA</strong> — Mais que um CRM. Uma Máquina de Crescimento. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMFinalCTA;