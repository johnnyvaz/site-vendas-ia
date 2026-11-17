import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './guia.css';
import { AUTOR, EMAIL_DOMINIO, MAILTO_DOMINIO, linkMentoria } from '@/conteudo/site';

type Pagina = 'guia' | 'agente' | 'outra';

const NAV: { pagina: Pagina; href: string; rotulo: string }[] = [
  { pagina: 'guia', href: '/', rotulo: 'IA para vendas' },
  { pagina: 'agente', href: '/agente-de-ia-para-vendas', rotulo: 'Agente de IA para vendas' },
];

export function LayoutGuia({
  pagina,
  semTopo = false,
  children,
}: {
  pagina: Pagina;
  /** A home tem a dobra com nav própria (DobraPalco); o topo comum sai. */
  semTopo?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="gv">
      <a className="gv-pular" href="#conteudo">Pular para o conteúdo</a>
      {!semTopo && (
      <header className="gv-topo">
        <div className="gv-topo-interno">
          <Link to="/" className="gv-marca" aria-label="vendas.ia.br — início">
            <svg viewBox="0 0 32 24" aria-hidden="true"><path d="M2 22 L30 2 L30 22 Z" /></svg>
            <span>vendas.ia.br</span>
          </Link>
          <nav className="gv-nav" aria-label="Principal">
            {NAV.map((item) => (
              <Link key={item.href} to={item.href} aria-current={item.pagina === pagina ? 'page' : undefined}>
                {item.rotulo}
              </Link>
            ))}
            <a className="gv-nav-cta" href={linkMentoria('menu')}>Mentoria de IA <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      )}

      <main id="conteudo">{children}</main>

      <footer className="gv-rodape">
        <div className="gv-rodape-interno">
          <div>
            <p>
              Guia escrito por <a href={AUTOR.url}>{AUTOR.nome}</a>. {AUTOR.descricao}
            </p>
            <p>
              Quer treinar o time comercial com acompanhamento? Conheça a{' '}
              <a href={linkMentoria('rodape')}>mentoria de IA da Geniaria</a>.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <p><Link to="/">IA para vendas: o guia</Link></p>
            <p><Link to="/agente-de-ia-para-vendas">Agente de IA para vendas</Link></p>
            <p><Link to="/politica-privacidade">Política de privacidade</Link></p>
          </nav>
          <p className="gv-dominio">
            Este domínio está à venda. Propostas: <a href={MAILTO_DOMINIO}>{EMAIL_DOMINIO}</a> ·{' '}
            <Link to="/dominio-a-venda">detalhes</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export function ChamadaMentoria({
  posicao,
  titulo,
  texto,
}: {
  posicao: Parameters<typeof linkMentoria>[0];
  titulo: string;
  texto: string;
}) {
  return (
    <section className="gv-chamada" aria-label="Mentoria de IA da Geniaria">
      <p className="gv-chamada-titulo">{titulo}</p>
      <p>{texto}</p>
      <a className="gv-botao" href={linkMentoria(posicao)}>
        Conhecer a mentoria de IA
      </a>
      <p className="gv-chamada-nota">
        A mentoria de IA da Geniaria é conduzida por Johnny Vaz: turma com data marcada, mentoria
        em grupo ou consultoria individual, sem programar.
      </p>
    </section>
  );
}
