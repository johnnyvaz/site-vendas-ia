/**
 * Cabeçalho (title, description, canonical, JSON-LD) de cada rota indexável.
 *
 * Fonte única para dois consumidores:
 *  - o `useHead` (navegação no navegador);
 *  - o `scripts/prerender.mjs`, que escreve o HTML estático de cada rota no
 *    build — robô de busca e de IA leem o conteúdo sem executar JavaScript.
 */
import { ATUALIZADO_EM, AUTOR, PUBLICADO_EM, SITE_NOME, SITE_URL, EMAIL_DOMINIO } from './site';
import { FAQ_AGENTE, FAQ_GUIA, type Pergunta } from './faq';

export type Cabecalho = {
  caminho: string;
  titulo: string;
  descricao: string;
  ogTipo: 'website' | 'article';
  jsonLd: Record<string, unknown>[];
  /** Imagem da primeira dobra: vira <link rel=preload> no HTML pré-renderizado. */
  preloadImagem?: string;
};

const PESSOA = {
  '@type': 'Person',
  '@id': `${AUTOR.url}#pessoa`,
  name: AUTOR.nome,
  url: AUTOR.url,
  description: AUTOR.descricao,
};

const SITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NOME,
  description: 'Guia prático de inteligência artificial para times de vendas.',
  inLanguage: 'pt-BR',
  author: { '@id': PESSOA['@id'] },
};

function faqPage(url: string, perguntas: Pergunta[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };
}

function artigo(url: string, titulo: string, descricao: string) {
  return {
    '@type': 'Article',
    '@id': `${url}#artigo`,
    headline: titulo,
    description: descricao,
    url,
    mainEntityOfPage: url,
    inLanguage: 'pt-BR',
    datePublished: PUBLICADO_EM,
    dateModified: ATUALIZADO_EM,
    author: PESSOA,
    isPartOf: { '@id': SITE['@id'] },
    mentions: {
      '@type': 'Service',
      name: 'Mentoria de IA da Geniaria',
      url: 'https://geniaria.com.br/mentoria',
      provider: { '@type': 'Organization', name: 'Geniaria', url: 'https://geniaria.com.br' },
    },
  };
}

function grafo(...nos: Record<string, unknown>[]) {
  return [{ '@context': 'https://schema.org', '@graph': nos }];
}

const GUIA_TITULO = 'IA para vendas: como usar no dia a dia do time comercial';
const GUIA_DESC =
  'Guia prático de IA para vendas: prospecção, roteiro de abordagem, follow-up e CRM com ChatGPT, Claude ou Gemini — e o que nunca colar na IA (LGPD). Sem promessa mágica.';

const AGENTE_TITULO = 'Agente de IA para vendas: o que é e quando vale a pena';
const AGENTE_DESC =
  'O que é um agente de IA para vendas, a diferença para chatbot e assistente, o que ele faz na prática, quando vale, quando não vale e como começar sem expor o cliente.';

export const ROTAS: Record<string, Cabecalho> = {
  '/': {
    caminho: '/',
    titulo: `${GUIA_TITULO} · vendas.ia.br`,
    descricao: GUIA_DESC,
    ogTipo: 'article',
    preloadImagem: '/palco/palco.webp',
    jsonLd: grafo(SITE, PESSOA, artigo(`${SITE_URL}/`, GUIA_TITULO, GUIA_DESC), faqPage(`${SITE_URL}/`, FAQ_GUIA)),
  },
  '/agente-de-ia-para-vendas': {
    caminho: '/agente-de-ia-para-vendas',
    titulo: `${AGENTE_TITULO} · vendas.ia.br`,
    descricao: AGENTE_DESC,
    ogTipo: 'article',
    jsonLd: grafo(
      SITE,
      PESSOA,
      artigo(`${SITE_URL}/agente-de-ia-para-vendas`, AGENTE_TITULO, AGENTE_DESC),
      faqPage(`${SITE_URL}/agente-de-ia-para-vendas`, FAQ_AGENTE),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'IA para vendas', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Agente de IA para vendas', item: `${SITE_URL}/agente-de-ia-para-vendas` },
        ],
      }
    ),
  },
  '/dominio-a-venda': {
    caminho: '/dominio-a-venda',
    titulo: 'vendas.ia.br — domínio premium à venda',
    descricao:
      'O domínio vendas.ia.br está à venda. Correspondência exata de vendas + inteligência artificial na extensão brasileira .ia.br. Propostas por e-mail.',
    ogTipo: 'website',
    jsonLd: grafo(SITE, {
      '@type': 'Product',
      '@id': `${SITE_URL}/dominio-a-venda#dominio`,
      name: 'vendas.ia.br',
      description:
        'Domínio brasileiro à venda: correspondência exata de "vendas" na extensão .ia.br, dedicada a inteligência artificial. Transferência via Registro.br.',
      category: 'Domain Name',
      url: `${SITE_URL}/dominio-a-venda`,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'BRL',
        url: `${SITE_URL}/dominio-a-venda`,
        seller: { '@type': 'Person', name: AUTOR.nome, email: EMAIL_DOMINIO },
      },
    }),
  },
};

export function urlCanonica(caminho: string): string {
  return caminho === '/' ? `${SITE_URL}/` : `${SITE_URL}${caminho}`;
}
