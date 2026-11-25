import { useEffect, useRef } from 'react';

/**
 * Fundo vivo da home: a Escada de Vendas virada paisagem.
 *
 * Um terreno em degraus (terraços gerados por ruído) desenhado em perspectiva
 * num <canvas> fixo atrás da página. A câmera avança devagar sobre ele (o
 * "zoom lento"), a rolagem empurra a câmera para frente, o mouse inclina a
 * vista e pacotes de dados cobre correm pelo corredor central em direção a
 * quem lê. Linhas cobre a cada seis fileiras marcam o compasso.
 *
 * Sem bibliotecas: Canvas 2D, ~2–4 mil segmentos por quadro, DPR limitado a
 * 1,5, pausa com a aba oculta e quadro único com prefers-reduced-motion.
 */

const TINTA = '18, 22, 29';
const COBRE = '156, 79, 38';
const COBRE_VIVO = '192, 106, 56';

function hash(x: number, z: number) {
  let h = (x * 374761393 + z * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
const suave = (t: number) => t * t * (3 - 2 * t);
function ruido(x: number, z: number) {
  const xi = Math.floor(x), zi = Math.floor(z);
  const u = suave(x - xi), v = suave(z - zi);
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** altura em terraços; o corredor central fica plano (é por onde os dados passam) */
function altura(gx: number, gz: number) {
  const n = ruido(gx * 0.11 + 40, gz * 0.11) * 0.72 + ruido(gx * 0.29, gz * 0.29 + 9) * 0.28;
  const lado = suave(Math.min(1, Math.max(0, (Math.abs(gx) - 2.5) / 6)));
  const degraus = Math.max(0, Math.floor(n * 8 * (0.35 + lado * 0.9)) - 2);
  return Math.round(degraus * lado) * 0.5;
}

export function FundoVivo() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, COLS = 44, ROWS = 46;
    const cache = new Map<number, number>();
    const alt = (gx: number, gz: number) => {
      const k = gx * 100003 + gz;
      let v = cache.get(k);
      if (v === undefined) {
        v = altura(gx, gz);
        if (cache.size > 60000) cache.clear();
        cache.set(k, v);
      }
      return v;
    };

    const redimensiona = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const estreito = W < 720;
      COLS = estreito ? 26 : 46;
      ROWS = estreito ? 30 : 46;
    };
    redimensiona();

    // estado da câmera (suavizado)
    let rolagem = window.scrollY, rolagemAlvo = rolagem;
    let mx = 0, my = 0, mxAlvo = 0, myAlvo = 0;
    const aoRolar = () => { rolagemAlvo = window.scrollY; };
    const aoMover = (e: PointerEvent) => {
      mxAlvo = e.clientX / W - 0.5;
      myAlvo = e.clientY / H - 0.5;
    };

    const pacotes = Array.from({ length: 16 }, (_, i) => ({
      gx: [-2, -1, 0, 1, 2][i % 5],
      fase: hash(i, 7) * ROWS,
      vel: 2.2 + hash(i, 3) * 2.6,
    }));

    let quadro = 0;
    let t0 = performance.now();
    let pausaEm = 0;

    const desenha = (agora: number) => {
      const t = (agora - t0) / 1000;
      rolagem += (rolagemAlvo - rolagem) * 0.06;
      mx += (mxAlvo - mx) * 0.04;
      my += (myAlvo - my) * 0.04;

      const camZ = t * 0.32 + rolagem * 0.006;
      const camX = mx * 2.2;
      const camY = 1.75 + my * 0.45 - Math.min(rolagem * 0.0003, 0.35);
      const f = Math.max(W, H) * 0.62;
      const horizonte = H * 0.36 - my * 18;
      const cx = W / 2;

      ctx.clearRect(0, 0, W, H);

      const z0 = Math.floor(camZ) + 1;
      const zN = z0 + ROWS;
      const meio = Math.floor(COLS / 2);
      const proj = (x: number, y: number, z: number): [number, number] | null => {
        const dz = z - camZ;
        if (dz < 0.35) return null;
        return [cx + ((x - camX) * f) / dz, horizonte + ((camY - y) * f) / dz];
      };
      const nevoa = (z: number) => {
        const dz = z - camZ;
        const longe = 1 - dz / ROWS;
        return Math.max(0, longe) ** 1.7 * Math.min(1, (dz - 0.35) / 1.4);
      };

      // névoa de cor: mistura cada face com o papel conforme a distância
      const PAPEL = [245, 242, 236];
      const mistura = (c: number[], a: number) =>
        `rgb(${Math.round(PAPEL[0] + (c[0] - PAPEL[0]) * a)}, ${Math.round(PAPEL[1] + (c[1] - PAPEL[1]) * a)}, ${Math.round(PAPEL[2] + (c[2] - PAPEL[2]) * a)})`;
      const C_TOPO = [251, 250, 247], C_FRENTE = [231, 225, 213], C_LADO = [212, 203, 187];
      const A_TOPO = [244, 223, 207], A_FRENTE = [156, 79, 38], A_LADO = [125, 62, 29];

      // 1) chão: só as linhas (o relevo vem por cima e esconde o que fica atrás)
      for (let gz = zN; gz >= z0; gz--) {
        const a = nevoa(gz);
        if (a <= 0.01) continue;
        const compasso = gz % 6 === 0;
        ctx.strokeStyle = compasso ? `rgba(${COBRE}, ${0.4 * a})` : `rgba(${TINTA}, ${0.16 * a})`;
        ctx.lineWidth = compasso ? 1.2 : 1;
        const p1 = proj(-meio, 0, gz), p2 = proj(meio, 0, gz);
        if (!p1 || !p2) continue;
        ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
      }
      ctx.lineWidth = 1;
      for (let gx = -meio; gx <= meio; gx++) {
        const corredor = Math.abs(gx) <= 2;
        for (let zs = z0; zs < zN; zs += 4) {
          const a = nevoa(zs + 2);
          if (a <= 0.01) continue;
          ctx.strokeStyle = corredor ? `rgba(${COBRE}, ${0.26 * a})` : `rgba(${TINTA}, ${0.12 * a})`;
          const p1 = proj(gx, 0, zs), p2 = proj(gx, 0, Math.min(zs + 4, zN));
          if (!p1 || !p2) continue;
          ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
        }
      }

      // 2) relevo sólido em degraus, do fundo para a frente e de fora para dentro
      const quad = (pts: ([number, number] | null)[], cor: string, linha: number) => {
        if (pts.some((q) => !q)) return;
        const q = pts as [number, number][];
        ctx.beginPath();
        ctx.moveTo(q[0][0], q[0][1]);
        for (let k = 1; k < q.length; k++) ctx.lineTo(q[k][0], q[k][1]);
        ctx.closePath();
        ctx.fillStyle = cor;
        ctx.fill();
        if (linha > 0.02) {
          ctx.strokeStyle = `rgba(${TINTA}, ${linha})`;
          ctx.stroke();
        }
      };
      const ordemX: number[] = [];
      for (let k = 0; k <= meio; k++) {
        ordemX.push(-meio + k);
        if (meio - 1 - k !== -meio + k) ordemX.push(meio - 1 - k);
      }
      ordemX.sort((a, b) => Math.abs(b + 0.5 - camX) - Math.abs(a + 0.5 - camX));
      for (let gz = zN; gz >= z0; gz--) {
        const a = nevoa(gz);
        if (a <= 0.01) continue;
        const linha = 0.55 * a;
        for (const gx of ordemX) {
          const h = alt(gx, gz);
          if (h <= 0) continue;
          const aceso = hash(gx + 500, gz) > 0.955;
          const ct = aceso ? A_TOPO : C_TOPO, cf = aceso ? A_FRENTE : C_FRENTE, cl = aceso ? A_LADO : C_LADO;
          // lateral voltada para o corredor
          if (gx + 1 <= camX) {
            const hv = alt(gx + 1, gz);
            if (h > hv) quad([proj(gx + 1, hv, gz), proj(gx + 1, hv, gz + 1), proj(gx + 1, h, gz + 1), proj(gx + 1, h, gz)], mistura(cl, a), linha);
          } else if (gx >= camX) {
            const hv = alt(gx - 1, gz);
            if (h > hv) quad([proj(gx, hv, gz), proj(gx, hv, gz + 1), proj(gx, h, gz + 1), proj(gx, h, gz)], mistura(cl, a), linha);
          }
          // espelho (frente) voltado para quem lê
          const hf = alt(gx, gz - 1);
          if (h > hf) quad([proj(gx, hf, gz), proj(gx + 1, hf, gz), proj(gx + 1, h, gz), proj(gx, h, gz)], mistura(cf, a), linha);
          // piso do degrau
          quad([proj(gx, h, gz), proj(gx + 1, h, gz), proj(gx + 1, h, gz + 1), proj(gx, h, gz + 1)], mistura(ct, a), linha);
        }
      }

      // 4) pacotes de dados correndo pelo corredor em direção a quem lê
      for (const pk of pacotes) {
        const vida = (pk.fase + t * pk.vel) % ROWS;
        const z = camZ + ROWS - vida;
        const a = nevoa(z);
        if (a <= 0.02) continue;
        const cabeca = proj(pk.gx, 0.02, z);
        const cauda = proj(pk.gx, 0.02, z + 1.6);
        if (!cabeca || !cauda) continue;
        const grd = ctx.createLinearGradient(cauda[0], cauda[1], cabeca[0], cabeca[1]);
        grd.addColorStop(0, `rgba(${COBRE_VIVO}, 0)`);
        grd.addColorStop(1, `rgba(${COBRE_VIVO}, ${0.85 * a})`);
        ctx.strokeStyle = grd;
        ctx.lineWidth = Math.max(1, 2.4 * a);
        ctx.beginPath();
        ctx.moveTo(cauda[0], cauda[1]);
        ctx.lineTo(cabeca[0], cabeca[1]);
        ctx.stroke();
        const r = Math.max(1.2, 3.2 * a);
        ctx.fillStyle = `rgba(${COBRE_VIVO}, ${0.95 * a})`;
        ctx.fillRect(cabeca[0] - r / 2, cabeca[1] - r / 2, r, r);
      }

      if (!reduzido) quadro = requestAnimationFrame(desenha);
    };

    const aoRedimensionar = () => {
      redimensiona();
      if (reduzido) desenha(performance.now());
    };
    const aoVisibilidade = () => {
      if (reduzido) return;
      if (document.hidden) {
        cancelAnimationFrame(quadro);
        pausaEm = performance.now();
      } else {
        if (pausaEm) t0 += performance.now() - pausaEm;
        quadro = requestAnimationFrame(desenha);
      }
    };

    window.addEventListener('resize', aoRedimensionar);
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('pointermove', aoMover, { passive: true });
    document.addEventListener('visibilitychange', aoVisibilidade);
    quadro = requestAnimationFrame(desenha);

    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener('resize', aoRedimensionar);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('pointermove', aoMover);
      document.removeEventListener('visibilitychange', aoVisibilidade);
    };
  }, []);

  return <canvas ref={ref} className="vi-fundo-vivo" aria-hidden="true" />;
}
