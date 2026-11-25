/**
 * Cabeçalho (title, description, canonical, JSON-LD) de cada rota indexável.
 *
 * Fonte única para dois consumidores:
 *  - o `useHead` (navegação no navegador);
 *  - o `scripts/prerender.mjs`, que escreve o HTML estático de cada rota no
 *    build — robô de busca e de IA leem o conteúdo sem executar JavaScript.
 */
import {
  ATUALIZADO_EM,
  AUTOR,
  PRIVACIDADE_ATUALIZADA_EM,
  PRIVACIDADE_PUBLICADA_EM,
  PUBLICADO_EM,
  SITE_NOME,
  SITE_URL,
  WHATSAPP_NUMERO,
} from './site';
import { FAQ_HOME } from './home';
import { FAQ_AGENTE, FAQ_GUIA } from './faq';

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
  description: 'Método comercial e inteligência artificial para empresas que vendem com processo.',
  inLanguage: 'pt-BR',
  author: { '@id': PESSOA['@id'] },
};

function faqPage(url: string, perguntas: { q: string; a: string }[]) {
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

const HOME_TITULO = 'Vendas IA · Método comercial e inteligência artificial';
const HOME_DESC =
  'A Vendas IA estrutura o processo comercial da sua empresa em seis degraus — do diagnóstico à retenção — e coloca a inteligência artificial para fazer o trabalho repetitivo, com cada número rastreável e pessoas no comando.';

const ORGANIZACAO = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organizacao`,
  name: SITE_NOME,
  url: `${SITE_URL}/`,
  description: HOME_DESC,
  areaServed: 'BR',
  knowsAbout: ['Processo comercial', 'Inteligência artificial em vendas', 'CRM', 'Gestão comercial'],
  founder: [{ '@type': 'Person', name: 'Melissa' }, { '@id': PESSOA['@id'] }],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: `+${WHATSAPP_NUMERO}`,
    availableLanguage: 'Portuguese',
  },
};

export const ROTAS: Record<string, Cabecalho> = {
  '/': {
    caminho: '/',
    titulo: HOME_TITULO,
    descricao: HOME_DESC,
    ogTipo: 'website',
    preloadImagem: '/videos/gemeo-loop-poster.jpg',
    jsonLd: grafo(SITE, ORGANIZACAO, PESSOA, faqPage(`${SITE_URL}/`, FAQ_HOME)),
  },
  '/ia-para-vendas': {
    caminho: '/ia-para-vendas',
    // Sem o sufixo da marca: o título passaria de 60 caracteres e o Google cortaria
    // (checagem titulo-tamanho do Sextante). O Google já mostra o nome do site.
    titulo: GUIA_TITULO,
    descricao: GUIA_DESC,
    ogTipo: 'article',
    preloadImagem: '/palco/palco.webp',
    jsonLd: grafo(
      SITE,
      PESSOA,
      artigo(`${SITE_URL}/ia-para-vendas`, GUIA_TITULO, GUIA_DESC),
      faqPage(`${SITE_URL}/ia-para-vendas`, FAQ_GUIA)
    ),
  },
  '/agente-de-ia-para-vendas': {
    caminho: '/agente-de-ia-para-vendas',
    titulo: AGENTE_TITULO,
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
          { '@type': 'ListItem', position: 1, name: 'IA para vendas', item: `${SITE_URL}/ia-para-vendas` },
          { '@type': 'ListItem', position: 2, name: 'Agente de IA para vendas', item: `${SITE_URL}/agente-de-ia-para-vendas` },
        ],
      }
    ),
  },
};

const PRIVACIDADE_URL = `${SITE_URL}/politica-privacidade`;
const PRIVACIDADE_DESC =
  'Como a Vendas IA coleta, usa e protege dados pessoais conforme a LGPD: quais dados, para quê, por quanto tempo e como pedir acesso, correção ou exclusão.';

ROTAS['/politica-privacidade'] = {
  caminho: '/politica-privacidade',
  titulo: 'Política de privacidade (LGPD) · Vendas IA',
  descricao: PRIVACIDADE_DESC,
  ogTipo: 'website',
  jsonLd: grafo(
    SITE,
    ORGANIZACAO,
    {
      '@type': 'WebPage',
      '@id': `${PRIVACIDADE_URL}#pagina`,
      url: PRIVACIDADE_URL,
      name: 'Política de privacidade',
      description: PRIVACIDADE_DESC,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': SITE['@id'] },
      publisher: { '@id': ORGANIZACAO['@id'] },
      datePublished: PRIVACIDADE_PUBLICADA_EM,
      dateModified: PRIVACIDADE_ATUALIZADA_EM,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Vendas IA', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Política de privacidade', item: PRIVACIDADE_URL },
      ],
    }
  ),
};

export function urlCanonica(caminho: string): string {
  return caminho === '/' ? `${SITE_URL}/` : `${SITE_URL}${caminho}`;
}
