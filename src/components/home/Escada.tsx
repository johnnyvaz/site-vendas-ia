import { useEffect, useRef, useState } from 'react';
import { DEGRAUS } from '@/conteudo/home';

/**
 * A Escada de Vendas em isometria: 6 degraus sobre o chão (pessoas, processos,
 * ferramentas) com o corrimão (gestão e IA) acompanhando a subida.
 *
 * Geometria gerada aqui, sem imagem: nítida em qualquer tela e leve no
 * pré-render. O degrau ativo avança sozinho (pausa no hover, no foco e com
 * prefers-reduced-motion); clicar fixa um degrau.
 */

const U = 58; // px por unidade
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const W = 3.5; // largura da escada (eixo x)
const H = 0.6; // altura de cada degrau
const N = 6;

type P = [number, number];
const iso = (x: number, y: number, z: number): P => [(x - y) * C * U, (x + y) * S * U - z * U];
const pts = (lista: P[]) => lista.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');

function bloco(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) {
  return {
    topo: [iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)],
    frente: [iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)],
    lado: [iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)],
  };
}

// A escada sobe para o fundo (−y): o degrau 01 fica na frente, o 06 atrás e mais alto.
// Assim todos os espelhos (faces da frente) ficam visíveis e levam o nome do degrau.
const y0 = (i: number) => N - 1 - i;
const CHAO = bloco(-0.45, W + 0.45, -0.45, N + 0.45, -0.32, 0);
const BLOCOS = DEGRAUS.map((_, i) => bloco(0, W, y0(i), y0(i) + 1, 0, (i + 1) * H));
const ORDEM = DEGRAUS.map((_, i) => N - 1 - i); // desenha do fundo para a frente

// corrimão: junto à lateral do fundo, desenhado antes dos degraus (fica atrás deles);, trilho reto (as alturas são lineares)
const X_RAIL = -0.14;
const ALT_RAIL = 1.05;
const POSTES = DEGRAUS.map((_, i) => {
  const zt = (i + 1) * H;
  const y = y0(i) + 0.5;
  return { base: iso(X_RAIL, y, zt), topo: iso(X_RAIL, y, zt + ALT_RAIL) };
});
const RAIL_INI = iso(X_RAIL, N - 0.5 + 0.35, 1 * H + ALT_RAIL - 0.35 * H);
const RAIL_FIM = iso(X_RAIL, 0.5 - 0.35, N * H + ALT_RAIL + 0.35 * H);
// rótulo do corrimão: chamada horizontal à esquerda, ligada ao trilho por um fio
const RAIL_MEIO: P = [
  RAIL_INI[0] + (RAIL_FIM[0] - RAIL_INI[0]) * 0.62,
  RAIL_INI[1] + (RAIL_FIM[1] - RAIL_INI[1]) * 0.62,
];
const CHAMADA: P = [RAIL_MEIO[0] - 40, RAIL_MEIO[1]];
const CHAMADA_LARG = 190; // largura estimada do texto, para o viewBox

// limites do desenho → viewBox
const todos: P[] = [
  ...CHAO.topo, ...CHAO.frente, ...CHAO.lado,
  ...BLOCOS.flatMap((b) => [...b.topo, ...b.frente, ...b.lado]),
  ...POSTES.map((p) => p.topo), RAIL_INI, RAIL_FIM,
  [CHAMADA[0] - CHAMADA_LARG, CHAMADA[1] - 22], [CHAMADA[0], CHAMADA[1] + 26],
];
const PAD = 22;
const minX = Math.min(...todos.map((p) => p[0])) - PAD;
const maxX = Math.max(...todos.map((p) => p[0])) + PAD;
const minY = Math.min(...todos.map((p) => p[1])) - PAD - 18;
const maxY = Math.max(...todos.map((p) => p[1])) + PAD;
const VIEWBOX = `${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`;

// texto sobre a face da frente (plano y) e sobre a lateral (plano x)
const mFrente = (x: number, y: number, z: number) => {
  const [ox, oy] = iso(x, y, z);
  return `matrix(${C.toFixed(4)},${S},0,1,${ox.toFixed(1)},${oy.toFixed(1)})`;
};
const mLado = (x: number, y: number, z: number) => {
  const [ox, oy] = iso(x, y, z);
  return `matrix(${C.toFixed(4)},${-S},0,1,${ox.toFixed(1)},${oy.toFixed(1)})`;
};

export function Escada() {
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const fixado = useRef(false);

  useEffect(() => {
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzido || pausado || fixado.current) return;
    const t = window.setInterval(() => setAtivo((a) => (a + 1) % DEGRAUS.length), 2600);
    return () => window.clearInterval(t);
  }, [pausado]);

  const d = DEGRAUS[ativo];

  return (
    <figure
      className="vi-escada"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <svg viewBox={VIEWBOX} role="img" aria-labelledby="escada-titulo escada-desc">
        <title id="escada-titulo">A Escada de Vendas</title>
        <desc id="escada-desc">
          Seis degraus — {DEGRAUS.map((g) => g.nome).join(', ')} — apoiados no chão de pessoas,
          processos e ferramentas, com o corrimão de gestão e IA acompanhando a subida.
        </desc>

        <g className="vi-escada-chao">
          <polygon points={pts(CHAO.topo)} className="f-topo" />
          <polygon points={pts(CHAO.frente)} className="f-frente" />
          <polygon points={pts(CHAO.lado)} className="f-lado" />
          <text transform={mLado(W + 0.45, N + 0.2, -0.235)} className="vi-escada-rot">
            CHÃO · PESSOAS, PROCESSOS E FERRAMENTAS
          </text>
        </g>

        <g className="vi-escada-corrimao" aria-hidden="true">
          {POSTES.map((p, i) => (
            <line key={i} x1={p.base[0]} y1={p.base[1]} x2={p.topo[0]} y2={p.topo[1]} />
          ))}
          <line className="trilho" x1={RAIL_INI[0]} y1={RAIL_INI[1]} x2={RAIL_FIM[0]} y2={RAIL_FIM[1]} />
          <line className="fio" x1={CHAMADA[0] + 6} y1={CHAMADA[1]} x2={RAIL_MEIO[0]} y2={RAIL_MEIO[1]} />
          <circle className="no" cx={RAIL_MEIO[0]} cy={RAIL_MEIO[1]} r={3} />
          <text className="vi-escada-chamada" x={CHAMADA[0]} y={CHAMADA[1]} textAnchor="end">
            <tspan className="vi-escada-chamada-rot" x={CHAMADA[0]} dy="-9">CORRIMÃO</tspan>
            <tspan className="vi-escada-chamada-txt" x={CHAMADA[0]} dy="28">gestão e IA</tspan>
          </text>
        </g>

        {ORDEM.map((i) => {
          const b = BLOCOS[i];
          const zb = i * H; // abaixo disso o espelho fica atrás do degrau da frente
          const on = i === ativo;
          return (
            <g
              key={DEGRAUS[i].n}
              className={`vi-degrau${on ? ' is-ativo' : ''}`}
              style={{ ['--i' as string]: i }}
              onClick={() => {
                fixado.current = true;
                setAtivo(i);
              }}
            >
              <polygon points={pts(b.lado)} className="f-lado" />
              <polygon points={pts(b.frente)} className="f-frente" />
              <polygon points={pts(b.topo)} className="f-topo" />
              <text transform={mFrente(0.22, y0(i) + 1, zb + H * 0.34)} className="vi-escada-txt">
                <tspan className="vi-escada-num">{DEGRAUS[i].n}</tspan>
                <tspan dx="9" className="vi-escada-nome">{DEGRAUS[i].nome}</tspan>
              </text>
            </g>
          );
        })}

      </svg>

      <figcaption className="vi-escada-legenda" aria-live="off">
        <span className="vi-mono">Degrau {d.n}</span>
        <strong>{d.nome}</strong>
        <span className="vi-escada-pergunta">{d.pergunta}</span>
      </figcaption>
    </figure>
  );
}
