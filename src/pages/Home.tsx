import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '@/components/home/home.css';
import { Escada } from '@/components/home/Escada';
import { ContatoWhatsApp } from '@/components/home/ContatoWhatsApp';
import { VideoGemeo } from '@/components/home/VideoGemeo';
import { FundoVivo } from '@/components/home/FundoVivo';
import { Contador, useRevelar } from '@/components/home/revelar';
import { CAPACIDADES, DEGRAUS, ETAPAS, FAQ_HOME, FORMATOS, PRINCIPIOS } from '@/conteudo/home';
import { AUTOR, MENSAGEM_PADRAO, linkWhatsApp } from '@/conteudo/site';
import { useHead } from '@/hooks/useHead';

const NAV = [
  { href: '#metodo', rotulo: 'Método' },
  { href: '#tecnologia', rotulo: 'Tecnologia' },
  { href: '#como-trabalhamos', rotulo: 'Como trabalhamos' },
  { href: '#quem-somos', rotulo: 'Quem somos' },
];

export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`vi-marca${claro ? ' is-claro' : ''}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 20h5v-5h5v-5h5V5h3" />
      </svg>
      Vendas <b>IA</b>
    </span>
  );
}

function Topo() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const f = () => setRolou(window.scrollY > 12);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [aberto]);

  return (
    <header className={`vi-topo${rolou ? ' is-rolou' : ''}${aberto ? ' is-aberto' : ''}`}>
      <div className="vi-wrap vi-topo-interno">
        <a href="#inicio" className="vi-topo-marca" aria-label="Vendas IA — início">
          <Marca />
        </a>
        <nav className="vi-nav" aria-label="Principal" id="vi-nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setAberto(false)}>
              {n.rotulo}
            </a>
          ))}
          <a href="#contato" className="vi-botao vi-botao-pequeno" onClick={() => setAberto(false)}>
            Fale conosco
          </a>
        </nav>
        <button
          type="button"
          className="vi-menu"
          aria-expanded={aberto}
          aria-controls="vi-nav"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((a) => !a)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Titulo({ rotulo, children, id }: { rotulo: string; children: React.ReactNode; id: string }) {
  return (
    <div className="vi-titulo" data-revela>
      <p className="vi-rotulo">{rotulo}</p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}

function Foto({ nome, alt, classe = '', sizes = '(max-width: 880px) 100vw, 480px' }: { nome: string; alt: string; classe?: string; sizes?: string }) {
  return (
    <figure className={`vi-foto ${classe}`} data-revela>
      <img
        src={`/images/fotos/${nome}-720.webp`}
        srcSet={`/images/fotos/${nome}-720.webp 720w, /images/fotos/${nome}-1280.webp 1280w`}
        sizes={sizes}
        alt={alt}
        width={720}
        height={480}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

export default function Home() {
  useHead('/');
  const raiz = useRef<HTMLDivElement>(null);
  useRevelar(raiz);

  return (
    <div className="vi" ref={raiz}>
      <a className="vi-pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <FundoVivo />
      <Topo />

      <main id="conteudo">
        {/* ── Primeira dobra ─────────────────────────────── */}
        <section className="vi-hero" id="inicio" aria-labelledby="hero-titulo">
          <div className="vi-wrap vi-hero-grade2">
            <div className="vi-hero-titulo">
              <p className="vi-rotulo vi-anima" style={{ ['--d' as string]: 0 }}>
                Método comercial · Inteligência artificial
              </p>
              <h1 id="hero-titulo" className="vi-anima" style={{ ['--d' as string]: 1 }}>
                Vendas com método.
                <br />
                Tecnologia que <em>executa e&nbsp;mede.</em>
              </h1>
            </div>
            <div className="vi-hero-palco vi-anima" style={{ ['--d' as string]: 2 }}>
              <VideoGemeo destaque />
            </div>
            <div className="vi-hero-lado">
              <p className="vi-hero-lead vi-anima" style={{ ['--d' as string]: 3 }}>
                A Vendas IA estrutura o processo comercial da sua empresa em seis degraus — do
                diagnóstico à retenção de clientes — e coloca a inteligência artificial para fazer o
                trabalho repetitivo. Cada número com origem. Cada decisão com uma pessoa.
              </p>
              <div className="vi-hero-acoes vi-anima" style={{ ['--d' as string]: 4 }}>
                <a href="#contato" className="vi-botao">
                  Agendar uma conversa
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10M11 6l4 4-4 4" /></svg>
                </a>
                <a href="#metodo" className="vi-link-seta">
                  Conhecer o método
                </a>
              </div>
            </div>
          </div>

          <div className="vi-wrap">
            <ul className="vi-selos" aria-label="Compromissos" data-revela="grupo">
              <li><span className="vi-mono">I</span>Pessoas no comando da IA</li>
              <li><span className="vi-mono">II</span>LGPD desde o primeiro dia</li>
              <li><span className="vi-mono">III</span>Piloto controlado antes da escala</li>
            </ul>
          </div>
        </section>

        {/* ── Problema ─────────────────────────────────── */}
        <section className="vi-secao" aria-labelledby="problema-titulo">
          <div className="vi-wrap">
            <Titulo rotulo="O ponto de partida" id="problema-titulo">
              Por que tantas iniciativas de IA em vendas não mudam o resultado
            </Titulo>
            <ol className="vi-problemas" data-revela="grupo">
              <li>
                <h3>Ferramenta antes de processo</h3>
                <p>
                  Contrata-se CRM, automação e IA antes de existir um funil desenhado. Sem processo,
                  a ferramenta vira custo e o time volta à planilha.
                </p>
              </li>
              <li>
                <h3>Volume não é venda</h3>
                <p>
                  Mais leads e mais mensagens não resolvem um gargalo que está na conversão, no
                  follow-up ou na proposta.
                </p>
              </li>
              <li>
                <h3>Diagnóstico que vira documento</h3>
                <p>
                  O relatório é entregue, a rotina não muda e a execução se perde nas semanas
                  seguintes.
                </p>
              </li>
            </ol>
            <p className="vi-destaque" data-revela>
              A Vendas IA une as duas metades que costumam andar separadas:{' '}
              <em>o método que diz o que fazer</em> e <em>a tecnologia que faz e mede</em>.
            </p>
          </div>
        </section>

        {/* ── Faixa fotográfica ────────────────────────── */}
        <figure className="vi-faixa" data-revela aria-label="Equipe trabalhando sobre o processo comercial">
          <img
            src="/images/fotos/oficina-1280.webp"
            srcSet="/images/fotos/oficina-720.webp 720w, /images/fotos/oficina-1280.webp 1280w"
            sizes="100vw"
            alt="Vista de cima de uma equipe ao redor de uma mesa com notas adesivas, cadernos e notebooks"
            width={1280}
            height={714}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="vi-wrap">
            <span className="vi-rotulo">Princípio</span>
            <p>Primeiro o processo na mesa. Depois a tecnologia na operação.</p>
          </figcaption>
        </figure>

        {/* ── Método ───────────────────────────────────── */}
        <section className="vi-secao vi-secao-papel" id="metodo" aria-labelledby="metodo-titulo">
          <div className="vi-wrap">
            <div className="vi-metodo-topo">
              <div>
                <Titulo rotulo="O método" id="metodo-titulo">
                  A Escada de Vendas
                </Titulo>
                <p className="vi-cabeca-texto vi-metodo-texto" data-revela>
                  Seis degraus, nesta ordem. A empresa só sobe para o próximo quando o atual está firme.
                  Cada degrau responde a uma pergunta do negócio e termina com uma entrega concreta.
                </p>
              </div>
              <div className="vi-metodo-arte" data-revela>
                <Escada />
              </div>
            </div>

            <div className="vi-degraus" role="table" aria-label="Os seis degraus da Escada de Vendas">
              <div className="vi-degraus-cab" role="row">
                <span role="columnheader">Degrau</span>
                <span role="columnheader">O que fazemos</span>
                <span role="columnheader">Onde a IA entra</span>
                <span role="columnheader">Entrega</span>
              </div>
              {DEGRAUS.map((d) => (
                <div className="vi-degraus-linha" role="row" key={d.n} data-revela>
                  <div role="cell" className="vi-degraus-nome">
                    <span className="vi-mono">{d.n}</span>
                    <div>
                      <h3>{d.nome}</h3>
                      <p>{d.pergunta}</p>
                    </div>
                  </div>
                  <p role="cell" data-rotulo="O que fazemos">{d.fazemos}</p>
                  <p role="cell" data-rotulo="Onde a IA entra">{d.ia}</p>
                  <p role="cell" data-rotulo="Entrega" className="vi-degraus-entrega">{d.entrega}</p>
                </div>
              ))}
            </div>

            <div className="vi-base" data-revela="grupo">
              <div>
                <p className="vi-rotulo">O chão</p>
                <h3>Pessoas, processos e ferramentas</h3>
                <p>
                  Nenhum degrau se sustenta sem os três. Antes de qualquer ferramenta, o processo
                  precisa existir — e as pessoas precisam saber operá-lo.
                </p>
              </div>
              <div>
                <p className="vi-rotulo">O corrimão</p>
                <h3>Gestão e inteligência artificial</h3>
                <p>
                  Acompanham a subida inteira: metas, indicadores semanais e IA apoiando cada etapa,
                  sempre com uma pessoa responsável pela decisão.
                </p>
              </div>
              <div>
                <p className="vi-rotulo">A regra do foco</p>
                <h3>Um de cada, até funcionar</h3>
                <p>
                  Um cliente ideal, uma região, um produto, um canal e um jeito de vender. Só depois
                  de o ciclo se repetir com previsibilidade abre-se a próxima frente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tecnologia ───────────────────────────────── */}
        <section className="vi-secao vi-secao-escura" id="tecnologia" aria-labelledby="tec-titulo">
          <div className="vi-wrap">
            <div className="vi-cabeca-dupla">
              <Titulo rotulo="A tecnologia" id="tec-titulo">
                Do método à operação, com cada passo registrado
              </Titulo>
              <p className="vi-cabeca-texto" data-revela>
                Método sem execução fica no papel. Nossa plataforma leva cada degrau para o dia a dia
                do time comercial — supervisionada pela sua equipe e auditável pela liderança.
              </p>
            </div>

            <div className="vi-tec-grade">
              <figure className="vi-painel" data-revela aria-label="Exemplo ilustrativo do gêmeo digital comercial">
                <div className="vi-painel-topo">
                  <span>Gêmeo digital comercial</span>
                  <span className="vi-painel-tag">Dados ilustrativos</span>
                </div>
                <dl className="vi-painel-metricas">
                  <div>
                    <dt>LTV / CAC</dt>
                    <dd><Contador valor={3.4} casas={1} sufixo=" : 1" /></dd>
                    <span>meta ≥ 3 : 1 · origem: CRM + financeiro</span>
                  </div>
                  <div>
                    <dt>Payback</dt>
                    <dd><Contador valor={9} sufixo=" meses" /></dd>
                    <span>meta &lt; 12 meses · origem: cálculo</span>
                  </div>
                </dl>
                <div className="vi-painel-funil" aria-label="Funil com conversão por etapa">
                  {[
                    ['Prospecção', 100, '25%'],
                    ['Diagnóstico', 62, '38%'],
                    ['Proposta', 34, '30%'],
                    ['Fechamento', 18, ''],
                  ].map(([nome, largura, taxa], i) => (
                    <div className={`vi-funil-linha${i === 1 ? ' is-gargalo' : ''}`} key={nome as string} style={{ ['--r' as string]: i }}>
                      <span className="vi-funil-nome">{nome}</span>
                      <span className="vi-funil-barra">
                        <i style={{ width: `${largura}%` }} />
                      </span>
                      <span className="vi-funil-taxa">{taxa && `→ ${taxa}`}</span>
                    </div>
                  ))}
                </div>
                <figcaption className="vi-painel-alerta">
                  <b>Gargalo atual:</b> diagnóstico → proposta converte 38%; referência do plano: 50%.
                  Próxima ação proposta ao gestor: revisar o roteiro de reunião.
                </figcaption>
              </figure>

              <ul className="vi-capacidades" data-revela="grupo">
                {CAPACIDADES.map((c) => (
                  <li key={c.titulo}>
                    <h3>{c.titulo}</h3>
                    <p>{c.texto}</p>
                    <span className="vi-mono">{c.degraus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Princípios ───────────────────────────────── */}
        <section className="vi-secao" id="principios" aria-labelledby="princ-titulo">
          <div className="vi-wrap">
            <div className="vi-princ-topo">
              <Titulo rotulo="Governança" id="princ-titulo">
                Princípios que não negociamos
              </Titulo>
              <Foto
                nome="revisao"
                classe="vi-foto-larga"
                alt="Duas pessoas revisando juntas um documento impresso numa mesa de escritório"
              />
            </div>
            <ol className="vi-principios" data-revela="grupo">
              {PRINCIPIOS.map((p, i) => (
                <li key={p.titulo}>
                  <span className="vi-mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Como trabalhamos ─────────────────────────── */}
        <section className="vi-secao vi-secao-papel" id="como-trabalhamos" aria-labelledby="como-titulo">
          <div className="vi-wrap">
            <Titulo rotulo="Como trabalhamos" id="como-titulo">
              Da primeira conversa à operação em ritmo
            </Titulo>
            <ol className="vi-etapas" data-revela="grupo">
              {ETAPAS.map((e) => (
                <li key={e.n}>
                  <span className="vi-etapas-n vi-mono">{e.n}</span>
                  <h3>{e.titulo}</h3>
                  <p>{e.texto}</p>
                </li>
              ))}
            </ol>

            <div className="vi-formatos" data-revela>
              <div className="vi-formatos-cab">
                <h3>Formatos de trabalho</h3>
                <p>Escopo, prazo e investimento são definidos depois do diagnóstico.</p>
                <Foto nome="diagnostico" alt="Mãos sobre uma mesa de reunião com cadernos, notebook e anotações" sizes="(max-width: 880px) 100vw, 320px" />
              </div>
              <ul>
                {FORMATOS.map((f) => (
                  <li key={f.nome}>
                    <h4>{f.nome}</h4>
                    <p>{f.texto}</p>
                    <span>{f.paraQuem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Quem somos ───────────────────────────────── */}
        <section className="vi-secao" id="quem-somos" aria-labelledby="quem-titulo">
          <div className="vi-wrap">
            <div className="vi-cabeca-dupla">
              <Titulo rotulo="Quem somos" id="quem-titulo">
                Método e tecnologia na mesma mesa
              </Titulo>
              <p className="vi-cabeca-texto" data-revela>
                A Vendas IA nasce da sociedade entre quem estrutura processos comerciais e quem
                constrói a tecnologia que os executa.
              </p>
            </div>
            <div className="vi-pessoas" data-revela="grupo">
              <article>
                <span className="vi-monograma" aria-hidden="true">M</span>
                <div>
                  <h3>Melissa</h3>
                  <p className="vi-pessoa-papel">Método e estratégia comercial</p>
                  <p>
                    Autora da metodologia Escada de Vendas. Conduz o diagnóstico, a mentoria por
                    degraus e o relacionamento com a liderança comercial.
                  </p>
                </div>
              </article>
              <article>
                <span className="vi-monograma" aria-hidden="true">JV</span>
                <div>
                  <h3>
                    <a href={AUTOR.url}>Johnny Vaz</a>
                  </h3>
                  <p className="vi-pessoa-papel">Tecnologia e inteligência artificial</p>
                  <p>
                    Engenheiro de software e especialista em IA, fundador da Geniaria. Responde pela
                    plataforma, pelos agentes de IA e pela segurança dos dados.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Perguntas ────────────────────────────────── */}
        <section className="vi-secao vi-secao-papel" id="perguntas" aria-labelledby="faq-titulo">
          <div className="vi-wrap vi-faq-grade">
            <div>
              <Titulo rotulo="Perguntas frequentes" id="faq-titulo">
                Antes de conversar
              </Titulo>
              <Foto nome="conversa" classe="vi-foto-faq" alt="Dois executivos conversando à mesa de um café" />
            </div>
            <div className="vi-faq" data-revela>
              {FAQ_HOME.map((p) => (
                <details key={p.q}>
                  <summary>
                    {p.q}
                    <span aria-hidden="true" className="vi-faq-mais" />
                  </summary>
                  <p>{p.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contato ──────────────────────────────────── */}
        <section className="vi-secao vi-secao-escura vi-contato" id="contato" aria-labelledby="contato-titulo">
          <div className="vi-wrap vi-contato-grade">
            <div>
              <Titulo rotulo="Contato" id="contato-titulo">
                Vamos conversar sobre o seu processo comercial
              </Titulo>
              <p className="vi-cabeca-texto" data-revela>
                Uma conversa inicial, sem compromisso, para entender o momento da empresa e dizer com
                franqueza se — e como — podemos ajudar.
              </p>
              <Foto nome="whatsapp" classe="vi-foto-contato" alt="Mão segurando um celular com uma conversa aberta" />
            </div>
            <ContatoWhatsApp />
          </div>
        </section>
      </main>

      <footer className="vi-rodape">
        <div className="vi-wrap vi-rodape-grade">
          <div>
            <Marca />
            <p>Método comercial e inteligência artificial para empresas que vendem com processo.</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="vi-rotulo">Vendas IA</p>
            <a href="#metodo">Método</a>
            <a href="#tecnologia">Tecnologia</a>
            <a href="#como-trabalhamos">Como trabalhamos</a>
            <a href={linkWhatsApp(MENSAGEM_PADRAO)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </nav>
          <nav aria-label="Conteúdo">
            <p className="vi-rotulo">Conteúdo</p>
            <Link to="/ia-para-vendas">IA para vendas: o guia</Link>
            <Link to="/agente-de-ia-para-vendas">Agente de IA para vendas</Link>
            <Link to="/politica-privacidade">Política de privacidade</Link>
          </nav>
        </div>
        <div className="vi-wrap vi-rodape-base">
          <span>© {new Date().getFullYear()} Vendas IA</span>
          <span>vendas.ia.br</span>
        </div>
      </footer>
    </div>
  );
}
