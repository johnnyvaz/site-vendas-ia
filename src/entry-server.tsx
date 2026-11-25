/**
 * Entrada de servidor usada só no build (`scripts/prerender.mjs`).
 *
 * Renderiza as páginas indexáveis para HTML estático: buscador e robô de IA
 * (GPTBot, PerplexityBot, ClaudeBot) leem o conteúdo sem executar JavaScript.
 * O cliente (`main.tsx`) hidrata esse HTML com `hydrateRoot`; as rotas vêm
 * do mesmo `Rotas` para a árvore bater dos dois lados.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Rotas } from './Rotas';
export { ROTAS, urlCanonica } from './conteudo/rotas';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Rotas />
    </StaticRouter>
  );
}
