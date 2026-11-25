import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuiaIAVendas from './pages/GuiaIAVendas';
import AgenteIAVendas from './pages/AgenteIAVendas';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import NotFound from './pages/NotFound';

/**
 * Rotas do site, iguais no navegador (App.tsx) e no pré-render
 * (entry-server.tsx): a hidratação exige a mesma árvore dos dois lados.
 */
export function Rotas() {
  return (
    <Routes>
      {/* Site da Vendas IA (desde 2026-11-25); o guia segue como conteúdo */}
      <Route path="/" element={<Home />} />
      <Route path="/ia-para-vendas" element={<GuiaIAVendas />} />
      <Route path="/agente-de-ia-para-vendas" element={<AgenteIAVendas />} />
      <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
