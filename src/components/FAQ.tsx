import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Em quanto tempo começo a ver resultado?',
      answer: 'Geralmente em poucos dias: você ativa captação e nosso score prioriza quem tem mais fit. A maioria dos clientes vê os primeiros leads qualificados em 24-48 horas após a configuração inicial.'
    },
    {
      question: 'Como funciona o SDR virtual?',
      answer: 'Ele conversa com o lead através de chat, coleta dados essenciais como necessidades e orçamento, qualifica baseado em suas regras de negócio e envia automaticamente para seu CRM com todas as informações para o vendedor fechar.'
    },
    {
      question: 'Posso integrar com meu CRM?',
      answer: 'Sim. Oferecemos integrações nativas com os principais CRMs do mercado (HubSpot, RD Station, Pipedrive, Salesforce) e webhooks personalizados. Nossa equipe técnica ajuda na configuração sem custo adicional.'
    },
    {
      question: 'Como é o trial/POC?',
      answer: 'Oferecemos um piloto guiado de 14 dias com implementação completa e um pacote inicial de leads para validação. Você terá acesso total à plataforma e suporte dedicado para garantir o sucesso do teste.'
    },
    {
      question: 'Vocês seguem a LGPD?',
      answer: 'Sim, somos 100% compliance com LGPD. Fazemos coleta com consentimento explícito, temos finalidade clara definida, período de retenção mínimo necessário e processo de exclusão sob solicitação do titular dos dados.'
    },
    {
      question: 'Quais setores vocês atendem melhor?',
      answer: 'Atendemos B2B em geral (tecnologia, consultoria, serviços, indústria), especialmente empresas com equipes de 2 a 20 vendedores. Nossos melhores resultados são em SaaS, consultorias, agências e empresas de serviços profissionais.'
    }
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-primary border-primary">
            FAQ
          </Badge>
          <h2 className="gradient-text">Perguntas Frequentes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossa plataforma e metodologia
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                {openItem === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openItem === index && (
                <div className="mt-4 pr-8">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de especialistas está pronta para ajudar você a encontrar a melhor solução para seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contato" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Falar com Especialista
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=5511999999999&text=Olá! Tenho dúvidas sobre o Vendas.IA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;