import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/**
 * Revelação ao rolar, sem esconder nada do pré-render.
 *
 * O HTML pré-renderizado sai com tudo visível (robôs e quem está sem JS leem
 * o texto inteiro). Já no navegador, antes da primeira pintura, a raiz ganha
 * `data-js` e os blocos fora da tela ficam à espera. Quando um bloco entra na
 * tela, recebe `data-visivel` e o CSS faz a transição. O que já está na tela
 * ao carregar é marcado na hora, sem piscar.
 *
 * Usa atributos `data-*`, que o React não reconcilia: a hidratação fica
 * intacta e nenhum re-render apaga a marcação.
 */

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function useRevelar(raiz: RefObject<HTMLElement>) {
  useIsoLayoutEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alvos = Array.from(el.querySelectorAll<HTMLElement>('[data-revela]'));
    if (reduzido || !('IntersectionObserver' in window)) {
      alvos.forEach((a) => a.setAttribute('data-visivel', ''));
      return;
    }

    const altura = window.innerHeight;
    alvos.forEach((a) => {
      const r = a.getBoundingClientRect();
      if (r.top < altura * 0.92 && r.bottom > 0) a.setAttribute('data-visivel', '');
    });
    el.setAttribute('data-js', '');

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-visivel', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    alvos.filter((a) => !a.hasAttribute('data-visivel')).forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [raiz]);
}

/**
 * Número que conta até o valor quando entra na tela.
 * Pré-render e primeira pintura mostram o valor final; a contagem só acontece
 * no navegador, fora da tela e sem reduced-motion.
 */
export function Contador({
  valor,
  casas = 0,
  sufixo = '',
  duracao = 1400,
}: {
  valor: number;
  casas?: number;
  sufixo?: string;
  duracao?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // já à vista: não reanima

    setAtual(0);
    let quadro = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const passo = (t: number) => {
          const p = Math.min(1, (t - t0) / duracao);
          const suave = 1 - Math.pow(1 - p, 3);
          setAtual(valor * suave);
          if (p < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor, duracao]);

  const texto = atual.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  return (
    <span ref={ref} className="vi-contador">
      {texto}
      {sufixo}
    </span>
  );
}
