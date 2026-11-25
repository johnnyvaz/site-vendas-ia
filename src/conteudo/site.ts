/**
 * Constantes do site vendas.ia.br.
 *
 * Desde 2026-11-25 o domínio é o site da Vendas IA: o negócio de Melissa
 * (método de vendas, a Escada de Vendas) e Johnny Vaz (tecnologia). O guia
 * "IA para vendas" continua no ar em /ia-para-vendas, como conteúdo.
 */

export const SITE_URL = 'https://vendas.ia.br';
export const SITE_NOME = 'Vendas IA';
export const MARCA = 'Vendas IA';

export const AUTOR = {
  nome: 'Johnny Vaz',
  url: 'https://johnnyvaz.com.br/',
  descricao:
    'Engenheiro de software e especialista em inteligência artificial, fundador da Geniaria.',
} as const;

export const PUBLICADO_EM = '2026-11-17';
export const ATUALIZADO_EM = '2026-11-25';

/** Política de privacidade: data do texto (a mudança de 2026-11-17 foi só de layout). Igual à data visível na página. */
export const PRIVACIDADE_PUBLICADA_EM = '2026-02-04';
export const PRIVACIDADE_ATUALIZADA_EM = '2026-02-04';

/** WhatsApp comercial (Melissa). Só dígitos, com DDI. */
export const WHATSAPP_NUMERO = '5516999666080';
export const WHATSAPP_EXIBICAO = '+55 16 99966-6080';

export function linkWhatsApp(mensagem?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const MENSAGEM_PADRAO =
  'Olá, Melissa. Conheci a Vendas IA pelo site e gostaria de conversar sobre o processo comercial da nossa empresa.';

/**
 * Link para a mentoria com UTM (usado no guia).
 *
 * `utm_source=vendasia` está no vocabulário fechado da plataforma
 * (`SITES_PROPRIOS` em `PLATAFORMA-CURSOS/src/lib/tracking/vocabulary.ts`);
 * qualquer outro valor é descartado na borda e a visita entra sem origem.
 * `utm_content` diz de qual ponto da página o clique saiu.
 */
export type PosicaoCta =
  | 'guia-topo'
  | 'guia-meio'
  | 'guia-fim'
  | 'agente-meio'
  | 'agente-fim'
  | 'menu'
  | 'rodape';

export function linkMentoria(posicao: PosicaoCta): string {
  const p = new URLSearchParams({
    utm_source: 'vendasia',
    utm_medium: 'referral',
    utm_campaign: 'ia-para-vendas',
    utm_content: posicao,
  });
  return `https://geniaria.com.br/mentoria?${p.toString()}`;
}
