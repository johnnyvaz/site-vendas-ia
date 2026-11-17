/**
 * Entrada de servidor usada só no build (`scripts/prerender.mjs`).
 *
 * Renderiza as páginas indexáveis para HTML estático: buscador e robô de IA
 * (GPTBot, PerplexityBot, ClaudeBot) leem o guia sem executar JavaScript. O
 * cliente (`main.tsx`) monta o app por cima, com `createRoot`, sem hidratação.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Route, Routes } from 'react-router-dom';
import GuiaIAVendas from './pages/GuiaIAVendas';
import AgenteIAVendas from './pages/AgenteIAVendas';
import DominioVenda from './pages/DominioVenda';
export { ROTAS, urlCanonica } from './conteudo/rotas';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<GuiaIAVendas />} />
        <Route path="/agente-de-ia-para-vendas" element={<AgenteIAVendas />} />
        <Route path="/dominio-a-venda" element={<DominioVenda />} />
      </Routes>
    </StaticRouter>
  );
}
