/**
 * Constantes do guia "IA para vendas" (vendas.ia.br).
 *
 * Desde 2026-11-17 o domínio é página de conteúdo: o guia ensina o time
 * comercial a usar IA no dia a dia e aponta para a mentoria de IA da
 * Geniaria. A venda do domínio continua aberta, num bloco discreto do rodapé
 * e na página /dominio-a-venda.
 */

export const SITE_URL = 'https://vendas.ia.br';
export const SITE_NOME = 'vendas.ia.br';
export const EMAIL_DOMINIO = 'contato@johnnyvaz.com.br';

export const AUTOR = {
  nome: 'Johnny Vaz',
  url: 'https://johnnyvaz.com.br/',
  descricao:
    'Engenheiro de software e especialista em inteligência artificial, fundador da Geniaria.',
} as const;

export const PUBLICADO_EM = '2026-11-17';
export const ATUALIZADO_EM = '2026-11-17';

/**
 * Link para a mentoria com UTM.
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

export const MAILTO_DOMINIO = `mailto:${EMAIL_DOMINIO}?subject=${encodeURIComponent(
  'Proposta para o domínio vendas.ia.br'
)}`;
