import { useEffect, useRef, useState } from 'react';

/**
 * Loop mudo do gêmeo digital (fonte: /srv/midia/20-edicao/vendas-ia-gemeo-loop).
 * Só carrega e toca quando entra na tela; pausa fora dela. Com
 * prefers-reduced-motion fica no pôster, com botão para tocar.
 */
export function VideoGemeo({ destaque = false }: { destaque?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [parado, setParado] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setParado(true);
      return;
    }
    if (destaque) v.play().catch(() => setParado(true));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload === 'none') v.preload = 'auto';
          v.play().catch(() => setParado(true));
        } else v.pause();
      },
      { threshold: destaque ? 0.05 : 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [destaque]);

  return (
    <figure className={`vi-video${destaque ? ' is-destaque' : ''}`} {...(destaque ? {} : { 'data-revela': '' })}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload={destaque ? 'auto' : 'none'}
        autoPlay={destaque}
        poster="/videos/gemeo-loop-poster.jpg"
        width={1600}
        height={900}
        aria-describedby="vi-video-legenda"
      >
        <source src="/videos/gemeo-loop.webm" type="video/webm" />
        <source src="/videos/gemeo-loop.mp4" type="video/mp4" />
      </video>
      {parado && (
        <button
          type="button"
          className="vi-video-play"
          onClick={() => {
            ref.current?.play();
            setParado(false);
          }}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5l8 5-8 5z" /></svg>
          Ver a animação
        </button>
      )}
      <figcaption id="vi-video-legenda">
        <span className="vi-mono">Ilustração · dados fictícios</span>
        <span>
          O gêmeo aponta o gargalo, o agente de IA encontra a causa nas conversas, o gestor aprova a
          ação e o número é medido de novo.
        </span>
      </figcaption>
    </figure>
  );
}
