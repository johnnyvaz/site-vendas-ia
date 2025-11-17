import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Bot, Zap, Link, Award, Users, TrendingUp, MessageSquare, Star, Shield, Clock } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Award,
      title: '15+ anos em IA e Vendas',
      description: 'Expertise comprovada no mercado'
    },
    {
      icon: Users,
      title: '1000+ empresas atendidas',
      description: 'Do startup à multinacional'
    },
    {
      icon: TrendingUp,
      title: '300% aumento médio em vendas',
      description: 'Resultados reais documentados'
    },
    {
      icon: Shield,
      title: '100% Compliance LGPD',
      description: 'Segurança e conformidade total'
    }
  ];

  const testimonials = [
    {
      text: "Johnny transformou nossa operação de vendas B2B. Aumentamos 400% a geração de leads em 60 dias.",
      author: "Carlos Silva",
      company: "CEO, TechCorp Brasil"
    },
    {
      text: "O Ecossistema IA do Johnny é impressionante. Nossa taxa de conversão subiu de 2% para 15%.",
      author: "Marina Santos", 
      company: "Diretora Comercial, SaaS Solutions"
    },
    {
      text: "Investimento que se pagou em 30 dias. Automação completa que realmente funciona.",
      author: "Roberto Lima",
      company: "Fundador, StartupTech"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Johnny's Story */}
          <div className="text-center space-y-6">
            <Badge variant="outline" className="text-primary border-primary">
              🤖 Quem é Johnny Vaz
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              O Especialista em IA para Vendas B2B no Brasil
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
              <div className="space-y-6 text-left">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Johnny Vaz é pioneiro em Inteligência Artificial aplicada a vendas B2B no Brasil.</strong> 
                  {' '}Com mais de 15 anos de experiência, desenvolveu o primeiro ecossistema integrado que combina automação de WhatsApp, 
                  vendedor virtual 24/7, landing pages inteligentes e analytics preditivo.
                </p>
{/*                 
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Já ajudou <strong className="text-primary">mais de 1000 empresas</strong> a aumentarem suas vendas em até <strong className="text-secondary">300%</strong>, 
                  sempre com foco no compliance LGPD e nas especificidades do mercado brasileiro.
                </p> */}

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                    <span>Resposta em até 2h</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Setup em 48h</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-600" />
                    <span>Suporte 24/7</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JV
                  </div>
                  <h3 className="font-bold text-xl">Johnny Vaz</h3>
                  <p className="text-muted-foreground">Especialista em IA para Vendas</p>
                  
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold w-full"
                    onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Ol%C3%A1%20Johnny,%20quero%20conhecer%20seu%20trabalho!', '_blank')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Falar com Johnny Agora
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="feature-card text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <highlight.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          {/* <div className="space-y-8">
            <div className="text-center">
              <Badge variant="outline" className="text-secondary border-secondary">
                ⭐ Depoimentos Reais
              </Badge>
              <h3 className="text-2xl font-bold mt-4 mb-2">Empresários que Confiaram no Johnny</h3>
              <p className="text-muted-foreground">Resultados reais de empresas que implementaram o Ecossistema IA</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Pronto para Multiplicar suas Vendas?</h3>
            <p className="text-lg mb-6 opacity-90">
              Fale diretamente com Johnny e descubra como aumentar suas vendas em até 300%
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 font-bold px-8"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5516997787674&text=Johnny,%20quero%20multiplicar%20minhas%20vendas!', '_blank')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Falar no WhatsApp Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8"
              >
                Ver Portfolio Completo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm opacity-80">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Garantia 30 dias</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Setup em 48h</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>Suporte incluído</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;