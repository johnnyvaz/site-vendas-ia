/**
 * Pré-renderiza as rotas indexáveis depois do `vite build`.
 *
 * Para cada rota de `ROTAS` (src/conteudo/rotas.ts), escreve um HTML com o
 * conteúdo já no <div id="root"> e o cabeçalho certo (title, description,
 * canonical, Open Graph, JSON-LD). Endereço que não existe recebe `dist/404.html`
 * (a página NotFound, com noindex), que o Netlify serve com status 404 de verdade —
 * sem o fallback SPA com 200, que o Google trata como soft 404.
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
    <meta name="author" content="Vendas IA" />
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
    <meta property="og:site_name" content="Vendas IA" />
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

// 404.html: renderiza a rota curinga (NotFound). Sem canonical e com noindex.
const html404 = shell
  .replace(
    /<!--head:inicio-->[\s\S]*?<!--head:fim-->/,
    `<!--head:inicio-->
    <title>Página não encontrada · Vendas IA</title>
    <meta name="robots" content="noindex, follow" />
    <!--head:fim-->`
  )
  .replace('<!--app-->', render('/pagina-nao-encontrada'));
writeFileSync(resolve(dist, '404.html'), html404);
console.log('prerender: 404 → dist/404.html');

// llms-full.txt: o llms.txt + cada página com descrição e as perguntas frequentes
// (mesma fonte do JSON-LD FAQPage). Resumo completo para IA, sem rodar JavaScript.
const faqDe = (r) =>
  r.jsonLd
    .flatMap((d) => d['@graph'] ?? [d])
    .filter((n) => n['@type'] === 'FAQPage')
    .flatMap((n) => n.mainEntity.map((q) => `### ${q.name}\n\n${q.acceptedAnswer.text}`));
const blocos = Object.values(ROTAS).map((r) => {
  const faq = faqDe(r);
  return [`## ${r.titulo}`, `URL: ${urlCanonica(r.caminho)}`, r.descricao, ...(faq.length ? ['', ...faq] : [])].join('\n\n');
});
const llms = readFileSync(resolve(dist, 'llms.txt'), 'utf8').trimEnd();
writeFileSync(resolve(dist, 'llms-full.txt'), `${llms}\n\n# Conteúdo das páginas\n\n${blocos.join('\n\n---\n\n')}\n`);
console.log('prerender: llms-full.txt');

rmSync(resolve(raiz, 'dist-server'), { recursive: true, force: true });
