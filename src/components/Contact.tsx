import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Linkedin, Phone, CheckCircle, Clock, Zap, Star } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id="contato" className="section-padding bg-gradient-to-b from-muted/30 to-muted/60">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-green-600 border-green-600">
            �� Johnny Online Agora
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Fale Diretamente com Johnny Vaz
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <strong className="text-foreground">Resposta garantida em até 2 horas.</strong> 
            Agende uma conversa estratégica e descubra como aumentar suas vendas em até 300%.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
              <span>Online agora</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Resposta em 2h</span>
            </div>
            <div className="flex items-center text-orange-600">
              <Star className="w-4 h-4 mr-2" />
              <span>Consulta gratuita</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">💬 Contato Direto com Johnny</h3>
              
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MessageSquare className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-bold">WhatsApp Direto</div>
                        <div className="text-sm opacity-90">+55 16 9 9778-7674</div>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white">🔥 MAIS RÁPIDO</Badge>
                  </div>
                  <Button 
                    className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold"
                    onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20uma%20consultoria%20estrat%C3%A9gica!', '_blank')}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Conversar Agora
                  </Button>
                </div>

                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-sm text-muted-foreground">johnny@vendas.ia.br</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('mailto:johnny@vendas.ia.br?subject=Consultoria%20Estratégica', '_blank')}
                    >
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-4">🏆 Garantias Johnny Vaz</h4>
              <div className="space-y-3 text-sm text-blue-700">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Resposta garantida em até 2 horas</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consultoria inicial gratuita de 30min</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Setup completo em até 48h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Formulário Temporariamente Desabilitado</h3>
                <p className="text-gray-600 mb-6">Entre em contato diretamente pelo WhatsApp ou email.</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
