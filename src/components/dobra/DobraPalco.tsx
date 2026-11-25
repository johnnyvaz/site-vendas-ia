import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import './dobra.css';
import { AUTOR, linkMentoria } from '@/conteudo/site';

/**
 * Primeira dobra da home: título + palco 3D com as peças do guia.
 *
 * Cada peça é um <button> com o nome em HTML; clicar troca a peça ativa
 * (ela sobe), a pergunta da placa e o ponto da paginação. As 5 perguntas
 * ficam no HTML (só a ativa visível), então o pré-render já leva todas —
 * e cada uma aponta para a seção do guia com o mesmo título.
 *
 * Protótipo e medidas: PLATAFORMA-CURSOS/marketing/referencias-design/vendas-ia-dobra.
 */

type Peca = {
  id: 'prospeccao' | 'abordagem' | 'followup' | 'crm' | 'lgpd';
  nome: string;
  pergunta: string;
  ancora: string;
};

const PECAS: Peca[] = [
  { id: 'prospeccao', nome: 'Prospecção', pergunta: 'Como usar IA na prospecção?', ancora: '#prospeccao' },
  { id: 'abordagem', nome: 'Abordagem', pergunta: 'Como montar um roteiro de abordagem com IA?', ancora: '#abordagem' },
  { id: 'followup', nome: 'Follow-up', pergunta: 'Como escrever follow-up com IA sem soar robô?', ancora: '#follow-up' },
  { id: 'crm', nome: 'CRM', pergunta: 'Como usar IA junto com o CRM?', ancora: '#crm' },
  { id: 'lgpd', nome: 'O que nunca colar na IA?', pergunta: 'O que nunca colar na IA?', ancora: '#lgpd' },
];

const IMG = '/palco';

function ImagemPeca({ id }: { id: Peca['id'] }) {
  const tamanhos: Record<Exclude<Peca['id'], 'followup'>, [number, number]> = {
    prospeccao: [900, 863],
    abordagem: [900, 705],
    crm: [900, 760],
    lgpd: [900, 378],
  };
  if (id === 'followup') {
    return (
      <>
        <img className="followup-tampa" src={`${IMG}/peca-followup-tampa.webp`} alt="" width={900} height={268} />
        <img className="followup-corpo" src={`${IMG}/peca-followup-corpo.webp`} alt="" width={900} height={534} />
      </>
    );
  }
  const [w, h] = tamanhos[id];
  return <img src={`${IMG}/peca-${id}.webp`} alt="" width={w} height={h} />;
}

export function DobraPalco({ ancoraGuia }: { ancoraGuia: string }) {
  const [ativa, setAtiva] = useState<Peca['id']>('followup');
  const [menuAberto, setMenuAberto] = useState(false);
  const refsPeca = useRef<Record<string, HTMLButtonElement | null>>({});
  const refsPonto = useRef<Record<string, HTMLButtonElement | null>>({});
  const refMenu = useRef<HTMLDivElement>(null);

  // fecha o menu com Esc ou clique fora
  useEffect(() => {
    if (!menuAberto) return;
    const fora = (e: MouseEvent) => {
      if (refMenu.current && !refMenu.current.contains(e.target as Node)) setMenuAberto(false);
    };
    const esc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setMenuAberto(false);
    document.addEventListener('mousedown', fora);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', fora);
      document.removeEventListener('keydown', esc);
    };
  }, [menuAberto]);

  // setas ← → percorrem as peças (no palco ou nos pontos)
  const navegar = (e: KeyboardEvent, onde: 'peca' | 'ponto') => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = PECAS.findIndex((p) => p.id === ativa);
    const prox = PECAS[(i + (e.key === 'ArrowRight' ? 1 : PECAS.length - 1)) % PECAS.length].id;
    setAtiva(prox);
    (onde === 'peca' ? refsPeca : refsPonto).current[prox]?.focus();
  };

  return (
    <section className="dobra" aria-labelledby="titulo-guia">
      <header className="nav">
        <Link className="logo" to="/" aria-label="Vendas IA — início">
          <svg className="logo-marca" viewBox="0 0 32 24" aria-hidden="true">
            <path d="M2 22 L30 2 L30 22 Z" />
          </svg>
          <span>Vendas IA</span>
        </Link>
        <div className="nav-acoes" ref={refMenu}>
          <a className="btn btn-ciano" href={linkMentoria('menu')}>
            Mentoria de IA
            <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
          <button
            className="btn-menu"
            type="button"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            aria-controls="menu-dobra"
            onClick={() => setMenuAberto((v) => !v)}
          >
            <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
              {menuAberto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
          <ul className="menu-lista" id="menu-dobra" hidden={!menuAberto}>
            <li><a href={ancoraGuia} onClick={() => setMenuAberto(false)}>IA para vendas: o guia</a></li>
            <li><Link to="/agente-de-ia-para-vendas">Agente de IA para vendas</Link></li>
            <li><a href={linkMentoria('menu')}>Mentoria de IA da Geniaria</a></li>
          </ul>
        </div>
      </header>

      <div className="hero">
        <p className="eyebrow">Guia prático</p>
        <h1 className="h1" id="titulo-guia">
          <span className="h1-ciano">IA para vendas:</span> como usar no dia a dia do time comercial
        </h1>
        <p className="t2">
          Usar IA em vendas é entregar a um assistente — ChatGPT, Claude, Gemini ou Copilot — as
          tarefas de texto e organização do time comercial: pesquisar a empresa antes do contato,
          rascunhar a abordagem, escrever o follow-up, resumir a reunião e preencher o CRM. A decisão
          e a conversa continuam com o vendedor, e uma pessoa confere tudo antes de chegar ao cliente.
        </p>
        <p className="t3">
          Por <a href={AUTOR.url}>{AUTOR.nome}</a>
        </p>
      </div>

      <div className="palco" data-ativa={ativa}>
        <img className="palco-fundo" src={`${IMG}/palco.webp`} alt="" width={2560} height={1440} />

        {PECAS.map((p) => (
          <button
            key={p.id}
            ref={(el) => (refsPeca.current[p.id] = el)}
            className={`peca peca-${p.id}`}
            type="button"
            aria-pressed={ativa === p.id}
            onClick={() => setAtiva(p.id)}
            onKeyDown={(e) => navegar(e, 'peca')}
          >
            <ImagemPeca id={p.id} />
            <span className="rotulo">{p.nome}</span>
          </button>
        ))}

        <div className="placa" aria-live="polite">
          <img src={`${IMG}/placa-legenda.webp`} alt="" width={900} height={234} />
          {PECAS.map((p) => (
            <a key={p.id} className="legenda" href={p.ancora} hidden={ativa !== p.id}>
              <span className="t1">{p.pergunta}</span>
              <span className="mais" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="rodape-dobra">
        <a className="btn btn-contorno" href={ancoraGuia}>
          <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 5c3-1.3 6.5-1.3 10 1 3.5-2.3 7-2.3 10-1v14c-3-1.3-6.5-1.3-10 1-3.5-2.3-7-2.3-10-1zM12 6v14" />
          </svg>
          Ler o guia
        </a>
        <div className="pontos" role="group" aria-label="Escolher peça">
          {PECAS.map((p) => (
            <button
              key={p.id}
              ref={(el) => (refsPonto.current[p.id] = el)}
              type="button"
              className="ponto"
              aria-label={p.nome}
              aria-current={ativa === p.id ? 'true' : undefined}
              onClick={() => setAtiva(p.id)}
              onKeyDown={(e) => navegar(e, 'ponto')}
            />
          ))}
        </div>
        <p className="dica t3">
          <svg className="ico ico-mao" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V10m0-.5V8a1.5 1.5 0 0 1 3 0v2m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.8-2.4L4.3 15.6a1.6 1.6 0 0 1 2.4-2.1L9 15.5M9 1.5V0M4.5 3 3.5 2M13.5 3l1-1" />
          </svg>
          Clique em uma peça
        </p>
      </div>
    </section>
  );
}
