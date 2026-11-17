import { useEffect } from 'react';
import { ROTAS, urlCanonica } from '@/conteudo/rotas';

const OG_IMAGEM = 'https://vendas.ia.br/images/og-vendas-ia.jpg';

function meta(attr: 'name' | 'property', chave: string, valor: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${chave}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, chave);
    document.head.appendChild(el);
  }
  el.content = valor;
}

/**
 * Aplica o cabeçalho da rota na navegação do lado do cliente. O HTML
 * pré-renderizado já sai com o mesmo cabeçalho (`scripts/prerender.mjs`);
 * aqui só se mantém coerente quando a pessoa troca de página sem recarregar.
 */
export function useHead(caminho: keyof typeof ROTAS) {
  useEffect(() => {
    const r = ROTAS[caminho];
    if (!r) return;
    const url = urlCanonica(r.caminho);
    document.title = r.titulo;
    meta('name', 'description', r.descricao);
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    meta('property', 'og:title', r.titulo);
    meta('property', 'og:description', r.descricao);
    meta('property', 'og:type', r.ogTipo);
    meta('property', 'og:url', url);
    meta('property', 'og:image', OG_IMAGEM);
    meta('name', 'twitter:title', r.titulo);
    meta('name', 'twitter:description', r.descricao);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.head.querySelectorAll('script[data-rota-jsonld], script[id^="structured-data-"]').forEach((s) => s.remove());
    r.jsonLd.forEach((dado) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.rotaJsonld = '';
      s.textContent = JSON.stringify(dado);
      document.head.appendChild(s);
    });
  }, [caminho]);
}
