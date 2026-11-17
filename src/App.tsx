import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DominioVenda from "./pages/DominioVenda";
import GuiaIAVendas from "./pages/GuiaIAVendas";
import AgenteIAVendas from "./pages/AgenteIAVendas";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Guia "IA para vendas" (desde 2026-11-17) — conteúdo que aponta para a mentoria da Geniaria */}
          <Route path="/" element={<GuiaIAVendas />} />
          <Route path="/agente-de-ia-para-vendas" element={<AgenteIAVendas />} />
          {/* Domínio continua à venda — página de detalhes, linkada no rodapé */}
          <Route path="/dominio-a-venda" element={<DominioVenda />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
