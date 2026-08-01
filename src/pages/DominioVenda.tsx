import { useEffect, useRef, useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

const DOMAIN = 'vendas.ia.br';
const EMAIL = 'contato@johnnyvaz.com.br';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Proposta para o domínio vendas.ia.br'
)}&body=${encodeURIComponent(
  'Olá Johnny,\n\nTenho interesse no domínio vendas.ia.br.\n\nValor da proposta: R$ \nQuem sou / projeto: \nPrazo desejado: \n\nObrigado.'
)}`;

const ESPECIFICACOES = [
  { rotulo: 'Domínio', valor: 'vendas.ia.br' },
  { rotulo: 'Extensão', valor: '.ia.br — Inteligência Artificial' },
  { rotulo: 'Registrador', valor: 'Registro.br (NIC.br)' },
  { rotulo: 'Titular', valor: 'Johnny Vaz' },
  { rotulo: 'Status', valor: 'Ativo · livre de disputa' },
  { rotulo: 'Transferência', valor: 'Troca de titularidade no Registro.br' },
];

const ARGUMENTOS = [
  {
    numero: '01',
    titulo: 'Exact match do mercado',
    texto:
      'Duas palavras que definem a categoria inteira: vendas e IA. Nome genérico, sem marca de terceiros, sem risco de conflito.',
  },
  {
    numero: '02',
    titulo: 'A extensão certa',
    texto:
      '.ia.br é o domínio brasileiro dedicado a inteligência artificial. Posiciona o negócio na categoria antes mesmo do primeiro clique.',
  },
  {
    numero: '03',
    titulo: 'Curto e falável',
    texto:
      'Onze caracteres. Dita ao telefone sem soletrar, cabe em qualquer logo, sobrevive a rádio, podcast e boca a boca.',
  },
  {
    numero: '04',
    titulo: 'Autoridade de partida',
    texto:
      'Domínio de correspondência exata carrega intenção de busca e credibilidade imediata — algo que campanha nenhuma compra rápido.',
  },
];

const PARA_QUEM = [
  { nome: 'SaaS de vendas e CRM', detalhe: 'plataforma, pipeline, forecast' },
  { nome: 'Agências de automação', detalhe: 'WhatsApp, outbound, growth' },
  { nome: 'Martech e adtech', detalhe: 'lead scoring, atribuição' },
  { nome: 'Consultorias de IA', detalhe: 'implantação, treinamento' },
  { nome: 'Investidor de domínios', detalhe: 'ativo de categoria no Brasil' },
];

const FAQ = [
  {
    pergunta: 'Qual o valor pedido?',
    resposta:
      'Não há preço fixo publicado. Envie sua proposta por e-mail e respondo com aceite, contraproposta ou recusa.',
  },
  {
    pergunta: 'Como funciona a transferência?',
    resposta:
      'Pela troca de titularidade no Registro.br. Após pagamento confirmado, inicio o processo e acompanho até a conclusão junto ao novo titular.',
  },
  {
    pergunta: 'Aceita parcelamento ou intermediário?',
    resposta:
      'Sim, negociável. Para valores maiores, é possível usar serviço de custódia (escrow) ou contrato de compra e venda com pagamento em etapas.',
  },
  {
    pergunta: 'O site atual vai junto?',
    resposta:
      'A venda é do domínio. Marca, código e conteúdo do projeto anterior podem entrar na negociação, se houver interesse.',
  },
];

/** Revela um bloco quando ele entra na viewport. */
function useRevelar<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo) return;

    // Sem suporte a IntersectionObserver, mostra tudo de imediato.
    if (typeof IntersectionObserver === 'undefined') {
      alvo.classList.add('dv-visivel');
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          // Também revela o que já ficou acima da viewport (scroll rápido ou âncora).
          if (entrada.isIntersecting || entrada.boundingClientRect.top < 0) {
            entrada.target.classList.add('dv-visivel');
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return ref;
}

const DominioVenda = () => {
  const [copiado, setCopiado] = useState(false);

  const refAtivo = useRevelar<HTMLElement>();
  const refPorQue = useRevelar<HTMLElement>();
  const refParaQuem = useRevelar<HTMLElement>();
  const refProposta = useRevelar<HTMLElement>();
  const refFaq = useRevelar<HTMLElement>();

  useSEO({
    title: 'vendas.ia.br — domínio premium à venda',
    description:
      'O domínio vendas.ia.br está à venda. Exact match de vendas + inteligência artificial na extensão brasileira .ia.br. Propostas por e-mail: contato@johnnyvaz.com.br.',
    keywords: [
      'vendas.ia.br',
      'domínio à venda',
      'comprar domínio ia.br',
      'domínio inteligência artificial',
      'domínio premium brasil',
      'venda de domínio registro.br',
    ],
    canonicalUrl: 'https://vendas.ia.br/',
    ogType: 'website',
    structuredData: [
      {
        type: 'Product',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'vendas.ia.br',
          description:
            'Domínio premium brasileiro à venda: correspondência exata de "vendas" com a extensão .ia.br, dedicada a inteligência artificial.',
          category: 'Domain Name',
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'BRL',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'BRL',
              valueAddedTaxIncluded: false,
            },
            seller: {
              '@type': 'Person',
              name: 'Johnny Vaz',
              email: EMAIL,
            },
            url: 'https://vendas.ia.br/',
          },
        },
      },
    ],
  });

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2200);
    } catch {
      window.location.href = MAILTO;
    }
  };

  return (
    <div className="dv-raiz">
      <style>{estilos}</style>

      <div className="dv-grao" aria-hidden="true" />

      <header className="dv-barra">
        <span className="dv-mono">{DOMAIN}</span>
        <span className="dv-mono dv-status">
          <i className="dv-ponto" aria-hidden="true" />
          domínio à venda
        </span>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="dv-hero">
          <span className="dv-vertical dv-mono" aria-hidden="true">
            premium · .ia.br · registro.br
          </span>

          <div className="dv-hero-conteudo">
            <p className="dv-mono dv-eyebrow dv-anima" style={{ animationDelay: '.05s' }}>
              oportunidade única
            </p>

            <h1 className="dv-titulo">
              <span className="dv-linha dv-anima" style={{ animationDelay: '.15s' }}>
                vendas
              </span>
              <span className="dv-linha dv-linha-2 dv-anima" style={{ animationDelay: '.28s' }}>
                <em>.ia.br</em>
              </span>
            </h1>

            <p className="dv-lead dv-anima" style={{ animationDelay: '.42s' }}>
              O nome mais direto do cruzamento entre <strong>vendas</strong> e{' '}
              <strong>inteligência artificial</strong> no Brasil está disponível para um novo dono.
            </p>
            <p className="dv-lead-en dv-anima" style={{ animationDelay: '.5s' }}>
              Premium Brazilian AI domain for sale. Offers welcome.
            </p>

            <div className="dv-acoes dv-anima" style={{ animationDelay: '.6s' }}>
              <a className="dv-botao" href={MAILTO}>
                Fazer uma proposta
                <span aria-hidden="true">→</span>
              </a>
              <button className="dv-botao-fantasma dv-mono" type="button" onClick={copiarEmail}>
                {copiado ? 'e-mail copiado' : EMAIL}
              </button>
            </div>
          </div>
        </section>

        {/* ── Marquee ──────────────────────────────────────────── */}
        <div className="dv-marquee" aria-hidden="true">
          <div className="dv-marquee-trilha">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="dv-marquee-grupo dv-mono">
                vendas · inteligência artificial · exact match · .ia.br · categoria · brasil ·
                automação · crm · agente de vendas ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── O ativo ──────────────────────────────────────────── */}
        <section className="dv-secao dv-revela" ref={refAtivo}>
          <h2 className="dv-secao-titulo">O ativo</h2>
          <dl className="dv-specs">
            {ESPECIFICACOES.map((item) => (
              <div key={item.rotulo} className="dv-spec">
                <dt className="dv-mono">{item.rotulo}</dt>
                <dd>{item.valor}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Por que vale ─────────────────────────────────────── */}
        <section className="dv-secao dv-revela" ref={refPorQue}>
          <h2 className="dv-secao-titulo">Por que vale</h2>
          <div className="dv-grade">
            {ARGUMENTOS.map((arg) => (
              <article key={arg.numero} className="dv-card">
                <span className="dv-mono dv-numero">{arg.numero}</span>
                <h3>{arg.titulo}</h3>
                <p>{arg.texto}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Para quem ────────────────────────────────────────── */}
        <section className="dv-secao dv-revela" ref={refParaQuem}>
          <h2 className="dv-secao-titulo">Faz sentido para</h2>
          <ul className="dv-lista">
            {PARA_QUEM.map((item) => (
              <li key={item.nome}>
                <span className="dv-lista-nome">{item.nome}</span>
                <span className="dv-mono dv-lista-detalhe">{item.detalhe}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Proposta ─────────────────────────────────────────── */}
        <section className="dv-secao dv-proposta dv-revela" id="proposta" ref={refProposta}>
          <p className="dv-mono dv-eyebrow">sem leilão, sem intermediário</p>
          <h2 className="dv-proposta-titulo">
            Faça sua <em>proposta</em>
          </h2>
          <p className="dv-proposta-texto">
            Negocio direto com o interessado. Diga quanto oferece e o que pretende construir — respondo
            todas as mensagens sérias.
          </p>

          <a className="dv-email-grande" href={MAILTO}>
            {EMAIL}
          </a>

          <div className="dv-acoes">
            <a className="dv-botao" href={MAILTO}>
              Enviar proposta por e-mail
              <span aria-hidden="true">→</span>
            </a>
            <button className="dv-botao-fantasma dv-mono" type="button" onClick={copiarEmail}>
              {copiado ? 'copiado ✓' : 'copiar endereço'}
            </button>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="dv-secao dv-revela" ref={refFaq}>
          <h2 className="dv-secao-titulo">Perguntas diretas</h2>
          <div className="dv-faq">
            {FAQ.map((item) => (
              <details key={item.pergunta}>
                <summary>
                  <span>{item.pergunta}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{item.resposta}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="dv-rodape">
        <span className="dv-mono">© {new Date().getFullYear()} Johnny Vaz</span>
        <a className="dv-mono" href={MAILTO}>
          {EMAIL}
        </a>
      </footer>
    </div>
  );
};

const estilos = `
.dv-raiz {
  --ink: #0b0b0c;
  --ink-2: #141416;
  --linha: rgba(244, 241, 234, 0.12);
  --papel: #f4f1ea;
  --papel-suave: rgba(244, 241, 234, 0.62);
  --ambar: #e8b24a;
  --serifa: 'Instrument Serif', Georgia, serif;
  --sans: 'Instrument Sans', 'Helvetica Neue', sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, monospace;

  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(900px 520px at 78% -10%, rgba(232, 178, 74, 0.16), transparent 65%),
    radial-gradient(700px 480px at 4% 12%, rgba(232, 178, 74, 0.06), transparent 70%),
    var(--ink);
  color: var(--papel);
  font-family: var(--sans);
  overflow-x: hidden;
}

.dv-grao {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
}

.dv-raiz > *:not(.dv-grao) { position: relative; z-index: 2; }

.dv-mono {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 400;
}

/* Barra superior */
.dv-barra {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem clamp(1.25rem, 5vw, 4.5rem);
  border-bottom: 1px solid var(--linha);
  background: rgba(11, 11, 12, 0.72);
  backdrop-filter: blur(14px);
  color: var(--papel-suave);
}

.dv-status { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--ambar); }

.dv-ponto {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--ambar);
  box-shadow: 0 0 0 0 rgba(232, 178, 74, 0.6);
  animation: dv-pulso 2.4s ease-out infinite;
}

@keyframes dv-pulso {
  0%   { box-shadow: 0 0 0 0 rgba(232, 178, 74, 0.55); }
  70%  { box-shadow: 0 0 0 10px rgba(232, 178, 74, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 178, 74, 0); }
}

/* Hero */
.dv-hero {
  position: relative;
  padding: clamp(4rem, 13vh, 9rem) clamp(1.25rem, 5vw, 4.5rem) clamp(3.5rem, 9vh, 6rem);
  min-height: 82vh;
  display: flex;
  align-items: center;
}

.dv-vertical {
  position: absolute;
  left: clamp(0.4rem, 1.6vw, 1.6rem);
  top: 52%;
  transform: rotate(180deg) translateY(50%);
  writing-mode: vertical-rl;
  color: rgba(244, 241, 234, 0.34);
  letter-spacing: 0.32em;
}

@media (max-width: 900px) { .dv-vertical { display: none; } }

.dv-hero-conteudo { max-width: 62rem; }

.dv-eyebrow { color: var(--ambar); margin-bottom: 1.6rem; }

.dv-titulo {
  font-family: var(--serifa);
  font-weight: 400;
  line-height: 0.86;
  letter-spacing: -0.02em;
  margin: 0 0 2rem;
  text-transform: none;
}

.dv-linha {
  display: block;
  font-size: clamp(3.6rem, 16vw, 12rem);
}

.dv-linha-2 { margin-left: clamp(0.5rem, 6vw, 5.5rem); color: var(--ambar); }
.dv-linha-2 em { font-style: italic; }

.dv-lead {
  font-size: clamp(1.05rem, 2.1vw, 1.5rem);
  line-height: 1.55;
  max-width: 34ch;
  color: rgba(244, 241, 234, 0.86);
  margin: 0 0 0.65rem;
}

.dv-lead strong { color: var(--papel); font-weight: 600; }

.dv-lead-en {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 241, 234, 0.4);
  margin: 0 0 2.6rem;
}

/* Botões */
.dv-acoes { display: flex; flex-wrap: wrap; gap: 0.9rem; align-items: center; }

.dv-botao {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.6rem;
  background: var(--ambar);
  color: #17130a;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  border-radius: 2px;
  text-decoration: none;
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease;
}

.dv-botao:hover { transform: translateY(-2px); box-shadow: 0 14px 34px -14px rgba(232, 178, 74, 0.8); }
.dv-botao span { transition: transform 0.28s ease; }
.dv-botao:hover span { transform: translateX(4px); }

.dv-botao-fantasma {
  padding: 1rem 1.4rem;
  border: 1px solid var(--linha);
  border-radius: 2px;
  background: transparent;
  color: var(--papel-suave);
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.dv-botao-fantasma:hover { border-color: var(--ambar); color: var(--ambar); }

/* Marquee */
.dv-marquee {
  overflow: hidden;
  border-top: 1px solid var(--linha);
  border-bottom: 1px solid var(--linha);
  padding: 0.85rem 0;
  background: rgba(244, 241, 234, 0.02);
}

.dv-marquee-trilha { display: flex; width: max-content; animation: dv-desliza 42s linear infinite; }
.dv-marquee-grupo { color: rgba(244, 241, 234, 0.34); white-space: nowrap; }

@keyframes dv-desliza {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Seções */
.dv-secao {
  padding: clamp(3.5rem, 9vh, 7rem) clamp(1.25rem, 5vw, 4.5rem);
  max-width: 78rem;
  margin: 0 auto;
  border-bottom: 1px solid var(--linha);
}

.dv-secao-titulo {
  font-family: var(--serifa);
  font-weight: 400;
  font-size: clamp(1.9rem, 4.5vw, 3.2rem);
  line-height: 1.05;
  margin: 0 0 2.6rem;
  text-transform: none;
}

/* Specs */
.dv-specs { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 0; margin: 0; }

.dv-spec {
  padding: 1.4rem 0;
  border-top: 1px solid var(--linha);
}

.dv-spec dt { color: rgba(244, 241, 234, 0.42); margin-bottom: 0.5rem; }
.dv-spec dd { margin: 0; font-size: 1.05rem; }

@media (min-width: 700px) {
  .dv-specs { column-gap: 3rem; }
}

/* Cards */
.dv-grade { display: grid; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); gap: 1px; background: var(--linha); border: 1px solid var(--linha); }

.dv-card {
  background: var(--ink);
  padding: clamp(1.6rem, 3vw, 2.4rem);
  transition: background 0.35s ease;
}

.dv-card:hover { background: var(--ink-2); }
.dv-numero { color: var(--ambar); }

.dv-card h3 {
  font-family: var(--serifa);
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.15;
  margin: 1rem 0 0.75rem;
  text-transform: none;
}

.dv-card p { margin: 0; color: rgba(244, 241, 234, 0.62); line-height: 1.6; font-size: 0.95rem; }

/* Lista */
.dv-lista { list-style: none; margin: 0; padding: 0; }

.dv-lista li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 1.35rem 0.5rem 1.35rem 0;
  border-top: 1px solid var(--linha);
  transition: padding-left 0.3s ease, color 0.3s ease;
}

.dv-lista li:last-child { border-bottom: 1px solid var(--linha); }
.dv-lista li:hover { padding-left: 1rem; }
.dv-lista-nome { font-family: var(--serifa); font-size: clamp(1.3rem, 3vw, 2rem); }
.dv-lista li:hover .dv-lista-nome { color: var(--ambar); }
.dv-lista-detalhe { color: rgba(244, 241, 234, 0.38); }

/* Proposta */
.dv-proposta { text-align: center; }
.dv-proposta .dv-eyebrow { margin-bottom: 1.2rem; }

.dv-proposta-titulo {
  font-family: var(--serifa);
  font-weight: 400;
  font-size: clamp(2.4rem, 8vw, 5.5rem);
  line-height: 1;
  margin: 0 0 1.4rem;
  text-transform: none;
}

.dv-proposta-titulo em { font-style: italic; color: var(--ambar); }

.dv-proposta-texto {
  max-width: 44ch;
  margin: 0 auto 2.4rem;
  color: rgba(244, 241, 234, 0.66);
  line-height: 1.6;
}

.dv-email-grande {
  display: inline-block;
  font-family: var(--mono);
  font-size: clamp(0.85rem, 2.6vw, 1.5rem);
  letter-spacing: 0.02em;
  color: var(--papel);
  text-decoration: none;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--ambar);
  margin-bottom: 2.6rem;
  word-break: break-all;
  transition: color 0.25s ease;
}

.dv-email-grande:hover { color: var(--ambar); }
.dv-proposta .dv-acoes { justify-content: center; }

/* FAQ */
.dv-faq details { border-top: 1px solid var(--linha); }
.dv-faq details:last-child { border-bottom: 1px solid var(--linha); }

.dv-faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.3rem 0;
  cursor: pointer;
  list-style: none;
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.dv-faq summary::-webkit-details-marker { display: none; }
.dv-faq summary i { font-style: normal; color: var(--ambar); transition: transform 0.3s ease; }
.dv-faq details[open] summary i { transform: rotate(45deg); }

.dv-faq p {
  margin: 0 0 1.4rem;
  max-width: 62ch;
  color: rgba(244, 241, 234, 0.62);
  line-height: 1.65;
}

/* Rodapé */
.dv-rodape {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 2rem clamp(1.25rem, 5vw, 4.5rem) 2.5rem;
  color: rgba(244, 241, 234, 0.38);
}

.dv-rodape a { color: inherit; text-decoration: none; }
.dv-rodape a:hover { color: var(--ambar); }

/* Animações de entrada */
.dv-anima { opacity: 0; animation: dv-sobe 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

@keyframes dv-sobe {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
}

.dv-revela { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.dv-revela.dv-visivel { opacity: 1; transform: translateY(0); }

:focus-visible { outline: 2px solid var(--ambar); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .dv-anima, .dv-revela { opacity: 1; transform: none; animation: none; transition: none; }
  .dv-marquee-trilha, .dv-ponto { animation: none; }
}
`;

export default DominioVenda;
