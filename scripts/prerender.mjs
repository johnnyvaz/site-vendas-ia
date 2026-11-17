/**
 * Pré-renderiza as rotas indexáveis depois do `vite build`.
 *
 * Para cada rota de `ROTAS` (src/conteudo/rotas.ts), escreve um HTML com o
 * conteúdo já no <div id="root"> e o cabeçalho certo (title, description,
 * canonical, Open Graph, JSON-LD). O shell vazio vira `dist/spa.html`, que o
 * `_redirects` serve para as rotas não pré-renderizadas.
 *
 * Saída: `/` → dist/index.html; `/x` → dist/x.html (o Netlify serve `/x`
 * a partir de `x.html`, sem barra no fim).
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(raiz, 'dist');
const servidor = resolve(raiz, 'dist-server/entry-server.js');

const { render, ROTAS, urlCanonica } = await import(pathToFileURL(servidor).href);

const shell = readFileSync(resolve(dist, 'index.html'), 'utf8');
if (!shell.includes('<!--head:inicio-->') || !shell.includes('<!--app-->')) {
  throw new Error('index.html sem os marcadores <!--head:inicio--> / <!--app-->');
}
writeFileSync(resolve(dist, 'spa.html'), shell);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const OG_IMAGEM = 'https://vendas.ia.br/images/og-vendas-ia.jpg';

function cabecalho(r) {
  const url = urlCanonica(r.caminho);
  const ld = r.jsonLd
    .map((d) => `<script type="application/ld+json" data-rota-jsonld>${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  return `<!--head:inicio-->
    <title>${esc(r.titulo)}</title>
    <meta name="description" content="${esc(r.descricao)}" />
    <meta name="author" content="Johnny Vaz" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${r.ogTipo}" />
    <meta property="og:title" content="${esc(r.titulo)}" />
    <meta property="og:description" content="${esc(r.descricao)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGEM}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="vendas.ia.br" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(r.titulo)}" />
    <meta name="twitter:description" content="${esc(r.descricao)}" />
    <meta name="twitter:image" content="${OG_IMAGEM}" />
    ${r.preloadImagem ? `<link rel="preload" as="image" href="${r.preloadImagem}" fetchpriority="high" />` : ''}
    ${ld}
    <!--head:fim-->`;
}

for (const r of Object.values(ROTAS)) {
  const html = shell
    .replace(/<!--head:inicio-->[\s\S]*?<!--head:fim-->/, cabecalho(r))
    .replace('<!--app-->', render(r.caminho));
  const arquivo = r.caminho === '/' ? 'index.html' : `${r.caminho.slice(1)}.html`;
  writeFileSync(resolve(dist, arquivo), html);
  console.log(`prerender: ${r.caminho} → dist/${arquivo} (${Math.round(html.length / 1024)} KB)`);
}

rmSync(resolve(raiz, 'dist-server'), { recursive: true, force: true });
