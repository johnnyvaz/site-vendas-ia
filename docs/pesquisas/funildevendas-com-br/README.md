# Funil de Vendas™ (funildevendas.com.br): pesquisa de concorrente

Coleta pública feita em 25/11/2026 em https://www.funildevendas.com.br/. Respeitei o `robots.txt` (sem bloqueios, `Crawl-delay: 5`): 5 s entre as páginas HTML e volume baixo na REST API do WordPress.

| O que foi coletado | Qtde | Origem |
|---|---|---|
| Páginas institucionais, LPs e "obrigado" | 98 (97 do sitemap + `/blog-do-funil-de-vendas/`) | HTML (`raw/`) convertido para `paginas/` |
| Posts do blog | 193 | REST API `/wp-json/wp/v2/posts`, em `blog/` |
| Artigos da Central de Ajuda (`/ajuda/`, BetterDocs) | 108 | REST API `/wp-json/wp/v2/docs`, em `ajuda/` |
| Metadados | robots, 5 sitemaps, `indice.json`, log | `meta/` |

O site não tem `llms.txt` (404). A REST API `users` exige autenticação (401), por isso o autor aparece como "admin". Algumas páginas têm pouco ou nenhum texto porque são páginas de "obrigado", páginas de teste ou embeds de Typebot/vídeo, e o HTML confirma isso: `glossario-funil-de-vendas`, `minha-conta` e `indicado` só têm cabeçalho e rodapé, e `franquia-typebot` só tem o iframe do Typebot. Oito artigos da ajuda (aulas 1–6, extensão) são apenas vídeos do YouTube; o link do vídeo ficou registrado.

---

## 1. O que é a empresa

- **Funil de Vendas™** é marca registrada no INPI (pedido de 10/01/2012, nome escolhido em 06/01/2012 em São Bernardo do Campo/SP). A empresa diz ter começado em **2005** como consultoria e treinamentos comerciais, e o CNPJ informado é 52.799.388/0001-36. O título do site resume o posicionamento: **"CRM > Educação > Franquia"**.
- A narrativa de marca é ser **"os criadores da metodologia e marca Funil de Vendas™ no Brasil"** e o "pai" do método. O site também admite: "não somos inventores deste termo... mas somos os grandes responsáveis pela propagação".
- Na home ela se apresenta como **"A maior rede de franquias de Educação Comercial do Brasil"**.
- Insiste na distinção "Funil de Vendas ≠ funil de marketing": o conceito é processo comercial (pipeline), não captura de leads nem tráfego.
- Contato: contato@funildevendas.com.br, WhatsApp Suporte (11) 95903-3518 e Financeiro (11) 98182-6119.

## 2. Oferta: três linhas de negócio

### 2.1 Software CRM (SaaS): `/crm`, `/funcionalidades`, `/automacao`, `/game`, `/whatsapp`, `/extensao`
- CRM de pipeline com estas peças: **múltiplos funis**, filtros, multiníveis de usuário, exportação; **automações** (atividades automáticas, cadência de e-mail outbound, temporizador); **gamificação** (temporadas, rankings, atualização a cada 2 h, alertas de prêmio), vendida como "o primeiro e único CRM com gamificação"; **indicadores** (financeiro, produtividade, volumetria, canais); **captura de leads 24h** (botão de WhatsApp e formulário no site com distribuição em carrossel); **relatórios diários por e-mail**; **extensão Chrome para WhatsApp Web** (`WhatsAppPluginV5.26.zip`); **API aberta e webhooks** (documentados em `/integracoes` e em ~20 artigos `api-*` da ajuda); integrações com Zapier, Make, RD Station, Leadlovers, ActiveCampaign, Hotmart, Reev, Wix, Letalk (WhatsApp) e Mobizon (SMS).
- Infra: **Microsoft Azure**, com backups diários. A aplicação roda em `app.funildevendas.com.br` e há um demo antigo em ASP clássico (`demo.funildevendas.com.br/Default.asp`).
- **"Software CRM com IA"** aparece só como rótulo na home. Nas páginas de produto não há nenhuma funcionalidade de IA descrita. O único conteúdo sobre IA é um post de jan/2025.

### 2.2 Educação comercial: `/unidades`, `/imersao`, `/infalivel`, `/treinamento`, `/eadfdvi`, `/codigo`, `/livro`, oficinas
- **Imersão "Funil de Vendas Infalível"** (presencial, aberta ou InCompany), oficinas temáticas (**Prospecção, Negociação, Plano de Meta**), **MEV** (Modelo Estratégico de Vendas), **Jornada do Cliente**, **Playbook** e **Mentoria Playbook 90 (P90)**.
- Infoprodutos de entrada: e-book **"Código da Conversão"**, curso **EAD Funil de Vendas Infalível**, **livro** "Funil de Vendas: o jeito simples de vender" (vendido na Amazon) e e-book/canvas gratuitos (**Canvas Funil de Vendas**, MEV). Também há eventos/aulas (Summit.on, Workshop, CRM10X, Convenção).
- O método se apoia em **canvas** (BMG, MEV, Canvas Funil de Vendas) e na "Tríade do Sucesso em Vendas" (Meta, Método e Execução Consistente).

### 2.3 Franquia educacional: `/franquia` e `lp.franquiafunildevendas.com.br`
- O franqueado vira "treinador de vendas" e aplica imersões e InCompany na sua cidade, ficando também com **receita recorrente do CRM**. A promessa é "faturar até 6 dígitos/mês", "até 800K/ano", com **payback de 3 meses**. Há casos citados por nome (Fortaleza, Recife, João Pessoa, Porto Alegre, Florianópolis, BH, Goiânia).
- O seletor de `/unidades` lista **cerca de 41 unidades**, quase todas em SP, SC, GO, PR e MG, além de capitais do NE. A rede tem gamificação interna de vendas entre unidades ("Arena", "Copa", "Grand Prix", com regulamentos públicos e pontos por produto: Mentoria P90 = 1.000 pts, Imersão Aberta = 500 pts/pessoa...).

## 3. Planos e preços publicados

**CRM** (`/crm`, versão "Junho 2024"). Todos os planos incluem gamificação, 1 número de WhatsApp, capturador, APIs e automações ilimitadas, e cobram uma taxa única de **Programa de Aceleração** (onboarding/imersão):

| Plano | Usuários | Mensal | Semestral | Anual | Aceleração (único) |
|---|---|---|---|---|---|
| Básico | até 2 | n/d | R$ 1.250/semestre | n/d | R$ 300 (incluso) |
| Essencial | até 4 | R$ 350 | R$ 1.890 | R$ 3.570 | R$ 500 |
| Crescimento | até 10 | R$ 750 | R$ 4.050 | R$ 7.650 | R$ 600 |
| Expansão | até 20 | R$ 1.350 | R$ 7.290 | R$ 13.770 | R$ 700 |

Há **7 dias grátis** ("após seu cadastro entraremos em contato"). LPs mais antigas mostram outras tabelas (por exemplo `/automacao` e `/crm10xaula` com R$ 297–1.297/mês, `/baratella` com R$ 222–972/mês), sinal de testes de preço por LP ou de LPs desatualizadas.

**Educação/infoprodutos:**

| Produto | Preço |
|---|---|
| Código da Conversão (e-book + aula) | R$ 67 à vista (de R$ 297); oferta relâmpago `/codigopromo` a R$ 19,90 |
| Curso EAD Funil de Vendas Infalível | R$ 97 à vista ou 10x R$ 9,70 (de R$ 297), com "R$ 1.197 em bônus" |
| Método Alavancar Vendas | R$ 597 à vista |
| Imersão Funil de Vendas Infalível (presencial) | R$ 3.497 a R$ 3.997 (lotes), com "R$ 1.597 em bônus" |
| Livro | link Amazon (R$ 57 citado na LP) |

## 4. Público-alvo
- **PMEs B2B brasileiras** com time comercial pequeno a médio (planos de 2 a 20 usuários). As dores citadas são falta de follow-up, metas não batidas, planilhas de Excel e falta de indicadores.
- **Gestores comerciais e donos de empresa** ("Glossário de Vendas para Empresários", "Alavancar Oferta Empresário"), além de **vendedores** (livro, oficinas).
- **Futuros franqueados**: pessoas que querem empreender em educação e ser "treinador de vendas reconhecido".
- Segmentos nos cases: contabilidades (4 Mãos), higienização (Quero Limpo), corretora de seguros (Correa Lima), energia solar (SolarPrime), escola de idiomas (Centro Britânico), educação (`/caseseducacao`).

## 5. Proposta de valor
- "O jeito simples de **vender mais / estruturar o processo de vendas / faturar 6 dígitos**" é o mesmo slogan com três finais, um para cada linha de negócio.
- "**Bater meta todo dia**" é o mantra, usado também como tag em 40 posts.
- O diferencial é unir **método proprietário + software + educação presencial**. O CRM é vendido como a ferramenta que aplica o método, e a implantação vem acompanhada de onboarding ("Programa de Aceleração"), não só de configuração.
- A marca registrada é usada como argumento de autoridade e de exclusividade ("verdadeira metodologia Funil de Vendas™", "imersões ministradas apenas pelos sócios ou franqueados").

## 6. Provas sociais
- Números (home/CRM): "**+5.000 clientes**" na home (as LPs de CRM dizem 2.000 ou 2.750, o que mostra inconsistência), "**cresceram mais de 22%**" as vendas, "**R$ 8,8 bi** em oportunidades ganhas desde 2015", "**7 mi** de oportunidades inseridas", "**13–15 mil usuários**", "**+40.000 alunos**", "**+6.000 CNPJs**", "+22% de vendas nos 3 primeiros meses", "de 8 a 26% de aumento em vendas".
- Depoimento destaque: **Jorge Torrez (4 Mãos)**, "saímos de 0 a 90 clientes em 3 meses", em vídeo. Há ainda dezenas de vídeos de depoimento no YouTube (`/franquia`, `/clientes-do-funil-de-vendas`), mosaicos de logos de clientes, cases de franqueados com nome e cidade, e a citação de dados da ABF sobre franchising.

## 7. CTAs e funil de conversão do site
- **CTA principal do CRM:** "Experimentar o CRM" / "Testar o CRM agora" leva a um **chatbot Typebot** (`typebot.io/funildevendas?utm_codechannel=...&utm_campanha=...`) que qualifica o lead. Depois vem o contato do time ("após seu cadastro entraremos em contato"), ou seja, o trial é assistido por vendas e não é self-service. Algumas LPs usam **VideoAsk** em vez do Typebot.
- **Quiz de dor** na LP do CRM ("Sua empresa perde oportunidades por falta de follow-up? Sim/Não"), terminando em "se respondeu sim, está na hora".
- **Educação:** LP da imersão com seletor de unidade, agenda, lotes de preço e bônus. Os CTAs "QUERO UMA PROPOSTA" e "FALAR COM ESPECIALISTA" levam a formulário ou WhatsApp.
- **Escada de valor:** materiais grátis (Canvas, e-book, glossário, gerador de assinatura de e-mail, simulador de meta), depois tripwire (Código da Conversão R$ 19,90–67, EAD R$ 97), depois imersão (R$ 3,5–4 mil), mentoria P90 e CRM recorrente. O **upsell para franquia** vem por último.
- Muitas **LPs por campanha/canal** ficam indexadas: `lead-crm`, `lead-crm-fb`, `lead-crm-webstories`, `lead-crm-formfunil`, `leadsimuladormeta`, `teste-youtube`, `baratella`, `parceirocrm`, `biup` (parceria), `codigo-afiliado`, `redirect-adsfb-treinamento`. Junto com elas aparecem ~15 páginas de "obrigado-*", aulas "secretas" e páginas de teste (`teste-plugin`, `sample-page`). Tudo está com `index, follow` e dentro do sitemap.
- Menu: Experimentar o CRM | Entrar | Funções (Ajuda, Automações, Game, Extensão WhatsApp, Funcionalidades, Capturador, Assinatura de e-mail) | Educação (Educação Comercial, Livro, Código da Conversão, Curso EAD) | Blog | Seja um Franqueado.

## 8. Stack técnica percebida
- **WordPress** (PHP 8.2) com tema **Salient** (WPBakery/`js_composer_salient`, Nectar). Partes usam Elementor.
- SEO: **Rank Math** (sitemaps e JSON-LD `Organization/WebSite/WebPage/Article/Person`). Na home o autor do schema é "Thiago Pirinelli".
- Performance e cache: **WP Rocket**. Formulários: **Contact Form 7** (+ redirect e máscara de telefone). **BetterDocs** na Central de Ajuda, **Web Stories** (Google) e Sassy Social Share.
- Tracking: **PixelYourSite Pro** (GTM `GTM-NXZX4SF`, GA4 `G-14ZGLELVZN`, Google Ads `AW-817615782`, Meta Pixel) e **Microsoft Clarity**.
- Conversação: **Typebot**, **VideoAsk** e links `api.whatsapp`. Não identifiquei widget de chat ao vivo.
- Checkout de infoprodutos: **Hotmart** (há menções a Kiwify). Vídeos em **Vimeo** (demos do produto) e **YouTube** (depoimentos e aulas).
- Hospedagem: "Núcleo Brasil Servidores" (Ascenty SP), segundo os headers. O `robots.txt` tem comentários em turco, provavelmente copiados de um template.

## 9. Estratégia de conteúdo e SEO
- **193 posts** entre fev/2015 e jan/2025, com cerca de **212 mil palavras** (média de 1.100 por post). Por ano: 2015: 10 · 2016: 18 · **2017: 52** · 2018: 22 · 2019: 12 · 2020: 18 · 2021: 21 · 2022: 18 · 2023: 20 · 2024: 1 · 2025: 1. Ou seja, **o blog parou** (último post novo em 31/01/2025, sobre IA em vendas B2B).
- **Reotimização em massa para AEO/IA em maio/2026:** 173 dos 193 posts foram modificados em 2026-05, e **161 ganharam um bloco "Resposta direta:"** no topo (resposta curta para buscadores e LLMs). Alguns ganharam FAQ. É uma estratégia de *answer engine optimization* sobre conteúdo antigo, sem conteúdo novo. Os textos novos aparecem sem acentos ("prospeccao", "conteudo"), o que sugere geração automatizada.
- Categorias pouco usadas (Blog 191, Vendas 32, Negócios 9, Cases 5, Marketing Digital 2). Tags concentradas na marca: "Funil de Vendas" (127), "Alimente o Funil de Vendas" (71), "taxa de conversão" (59), "Estratégia em Vendas" (54), "Gestão de Vendas" (53), "bata meta todo dia" (40), "crm de vendas" (36), "meta de vendas" (36).
- Temas: processo e etapas do funil, prospecção, metas, conversão, gestão de equipe comercial, CRM, negociação, pós-venda e tendências (transformação digital, inovação, e-commerce, logística).
- Autoria: tudo publicado como **"admin"** (192 posts por um único usuário). Não há autores nomeados no blog, o que é fraco em E-E-A-T, mas o schema da home cita Thiago Pirinelli.
- Outros ativos de SEO: **Central de Ajuda com 108 artigos** (bom long tail de "como fazer no CRM", APIs e configuração de e-mail por provedor), `/glossario`, `/metodologia-funil-de-vendas`, `/faq` (27 perguntas), Web Stories. Há muita página fina ou duplicada indexada (LPs clonadas: `canvas` e `ebookcanvasfunildevendas`, `codigo` e `codigopromo`, as três `metodo-alavancar*`), o que dilui o crawl budget.

## 10. Leitura para o nosso posicionamento (vendas com IA)
- O concorrente **fala de IA, mas não entrega IA** no produto descrito. Há espaço para ocupar "CRM/processo comercial com IA de verdade" com demonstração concreta.
- O trial é **assistido** (Typebot, depois um vendedor). Um caminho self-service ou uma demo interativa diferenciaria.
- Os preços são públicos e ancorados em "menos que um cafezinho por dia", com taxa de onboarding obrigatória. Isso serve de referência de faixa de preço para PMEs (R$ 350–1.350/mês para 4–20 usuários).
- O forte deles é **autoridade de marca + rede física de franquias + método em canvas**. O fraco é site datado, blog parado, LPs inconsistentes (números e preços divergentes) e muitas páginas de teste indexadas.

---

## Índice de arquivos

- [meta/robots.txt](meta/robots.txt) · [meta/sitemap_index.xml](meta/sitemap_index.xml) · [meta/post-sitemap.xml](meta/post-sitemap.xml) · [meta/page-sitemap.xml](meta/page-sitemap.xml) · [meta/docs-sitemap.xml](meta/docs-sitemap.xml) · [meta/category-sitemap.xml](meta/category-sitemap.xml) · [meta/indice.json](meta/indice.json) · [meta/urls-paginas.txt](meta/urls-paginas.txt) · [meta/log-download-paginas.txt](meta/log-download-paginas.txt)
- `raw/`: o HTML original de cada página institucional (mesmo slug de `paginas/`).

### Páginas (98)

- [5passos](paginas/5passos.md): 5 passos para estruturar seu processo de vendas [aula completa] (542 palavras)
- [academia](paginas/academia.md): Academia Funil de Vendas (751 palavras)
- [alavancar](paginas/alavancar.md): Alavancar Vendas: Estruture o processo de vendas de sua empresa (122 palavras)
- [alavancar-oferta-empresario](paginas/alavancar-oferta-empresario.md): Método Alavancar Vendas: Estruture definitivamente seu processo de vendas (1945 palavras)
- [assinatura-de-email](paginas/assinatura-de-email.md): Gerador de Assinatura de Email Profissional (138 palavras)
- [aulacanvasfunil-manychat](paginas/aulacanvasfunil-manychat.md): [AULA COMPLETA] Canvas Funil de Vendas - Orgânico eBook (32 palavras)
- [aulacanvasfunildevendas](paginas/aulacanvasfunildevendas.md): [AULA COMPLETA] Canvas Funil de Vendas (32 palavras)
- [aulaeci](paginas/aulaeci.md): Estruturação Comercial | Aula exclusiva clientes Código da Conversão (206 palavras)
- [aulafranchising](paginas/aulafranchising.md): [AULA COMPLETA] Funil de Vendas™ Franchising (31 palavras)
- [aulafunildevendas](paginas/aulafunildevendas.md): Dominando o Funil de Vendas | Seu processo de vendas infalível [Oficial] (529 palavras)
- [aulafunildevendas-video](paginas/aulafunildevendas-video.md): Aula Dominando o Funil de Vendas™ | Plano de ação para os próximos 30 dias (309 palavras)
- [aulasecreta-negociacao](paginas/aulasecreta-negociacao.md): Aula Secreta | Alunos Oficina da Negociação (305 palavras)
- [aulasecreta-prospeccao](paginas/aulasecreta-prospeccao.md): Aula Secreta | Alunos Oficina da Prospecção (305 palavras)
- [automacao](paginas/automacao.md): Automações Funil de Vendas™ CRM (456 palavras)
- [baratella](paginas/baratella.md): Funil de Vendas | O jeito simples de bater as metas! - Baratella (881 palavras)
- [biup](paginas/biup.md): Programa de Parceria :: BIUP (236 palavras)
- [blog-do-funil-de-vendas](paginas/blog-do-funil-de-vendas.md): Blog do Funil de Vendas :: O melhor conteúdo de vendas do Brasil (384 palavras)
- [canvas](paginas/canvas.md): eBook Canvas Funil de Vendas | Seu processo de vendas infalível [Oficial] (395 palavras)
- [caseseducacao](paginas/caseseducacao.md): Funil de Vendas Infalível | Cases inCompany e Imersão (576 palavras)
- [clientes-do-funil-de-vendas](paginas/clientes-do-funil-de-vendas.md): Clientes do funil de vendas (466 palavras)
- [codigo](paginas/codigo.md): Código da Conversão | Vendas B2B - [TopSecret e-Book] (1626 palavras)
- [codigo-afiliado](paginas/codigo-afiliado.md): Código da Conversão | Vendas B2B - [TopSecret e-Book] AFILIADO (1592 palavras)
- [codigopromo](paginas/codigopromo.md): Código da Conversão | Vendas B2B - [TopSecret e-Book] (1626 palavras)
- [contato](paginas/contato.md): Contato Funil de Vendas CRM (50 palavras)
- [convencao](paginas/convencao.md): 2ª Convenção Funil de Vendas™ | O ANO DA RUPTURA (445 palavras)
- [cookies](paginas/cookies.md): Cookies :: Limpar dados de navegação (149 palavras)
- [covid](paginas/covid.md): Pesquisa COVID-19: O mercado não pode parar! (163 palavras)
- [crm](paginas/crm.md): Funil de Vendas CRM | Feche mais clientes todos os dias! [Junho 2024] (1604 palavras)
- [crm10x](paginas/crm10x.md): CRM10X SUPER AULA CRM: DO ZERO AO AVANÇADO (921 palavras)
- [crm10xaula](paginas/crm10xaula.md): WORKSHOP CRM10X | AULA POR TEMPO LIMITADO (470 palavras)
- [domineseuprocesso](paginas/domineseuprocesso.md): Domine seu Processo de Vendas B2B | Aula completa (241 palavras)
- [ead](paginas/ead.md): Curso Funil de Vendas Infalível - EAD (1380 palavras)
- [eadfdvi](paginas/eadfdvi.md): Funil de Vendas Infalível - Curso | Crie sua máquina de vendas (1673 palavras)
- [ebookcanvasfunildevendas](paginas/ebookcanvasfunildevendas.md): eBook Canvas Funil de Vendas | Seu processo de vendas infalível [Oficial] - Unidades (395 palavras)
- [email](paginas/email.md): Saiba como configurar seu e-mail no Funil de Vendas (381 palavras)
- [extensao](paginas/extensao.md): Extensão WhatsApp Web | Funil de Vendas™ CRM (68 palavras)
- [faq](paginas/faq.md): Perguntas Frequentes (1853 palavras)
- [franquia](paginas/franquia.md): Franquia Educacional - Funil de Vendas™ (1036 palavras)
- [franquia-typebot](paginas/franquia-typebot.md): Franquia - Typebot (2 palavras)
- [funcionalidades](paginas/funcionalidades.md): Funil de Vendas CRM - Funcionalidades simples e poderosas. (690 palavras)
- [game](paginas/game.md): O primeiro e único Software CRM com Gamificação (328 palavras)
- [glossario](paginas/glossario.md): Glossário de Vendas para Empresários (752 palavras)
- [glossario-funil-de-vendas](paginas/glossario-funil-de-vendas.md): Glossário Funil de Vendas (0 palavras)
- [home](paginas/home.md): A maior rede de franquias de Educação Comercial do Brasil (1252 palavras)
- [imersao](paginas/imersao.md): Imersão Funil de Vendas Infalível [ Presencial ] (1538 palavras)
- [indicado](paginas/indicado.md): O jeito simples de bater as metas! - Indicado (0 palavras)
- [infalivel](paginas/infalivel.md): Imersão Funil de Vendas Infalível [ Presencial ] AGENDA 2024 (2182 palavras)
- [integracoes](paginas/integracoes.md): Integrações (1329 palavras)
- [lead-crm](paginas/lead-crm.md): Funil de Vendas CRM | Feche mais clientes todos os dias! [Leads Agosto 2023] (1356 palavras)
- [lead-crm-fb](paginas/lead-crm-fb.md): Funil de Vendas CRM - Experimente grátis (352 palavras)
- [lead-crm-formfunil](paginas/lead-crm-formfunil.md): Funil de Vendas CRM - Experimente grátis | Formulário CRM (1114 palavras)
- [lead-crm-webstories](paginas/lead-crm-webstories.md): Funil de Vendas CRM - Experimente grátis | WebStories (1111 palavras)
- [leads-form](paginas/leads-form.md): Funil de Vendas CRM | Leads - Form (1137 palavras)
- [leadsimuladormeta](paginas/leadsimuladormeta.md): Funil de Vendas :: Software CRM que mais cresce no Brasil - LeadSimulador (529 palavras)
- [livro](paginas/livro.md): Livro Funil de Vendas: O jeito simples de vender! (318 palavras)
- [manual-funil-de-vendas](paginas/manual-funil-de-vendas.md): Manual em videos (102 palavras)
- [materiais-de-vendas-2](paginas/materiais-de-vendas-2.md): Materiais Funil de Vendas - Conteúdos incríveis para bater meta todo dia! (555 palavras)
- [materiais-sobre-funil-de-vendas](paginas/materiais-sobre-funil-de-vendas.md): Materiais sobre Funil de Vendas (23 palavras)
- [metodo-alavancar](paginas/metodo-alavancar.md): Método Alavancar Vendas: Estruture definitivamente seu processo de vendas (1991 palavras)
- [metodo-alavancar-vendas](paginas/metodo-alavancar-vendas.md): Método Alavancar Vendas: Estruture definitivamente seu processo de vendas [Aberto] (1927 palavras)
- [metodologia-funil-de-vendas](paginas/metodologia-funil-de-vendas.md): Metodologia Funil de Vendas - O que é e para que serve? (1109 palavras)
- [mev](paginas/mev.md): MEV | Modelo Estratégico de Vendas [Oficial] (394 palavras)
- [minha-conta](paginas/minha-conta.md): Minha conta (0 palavras)
- [obrigado-canvas](paginas/obrigado-canvas.md): Obrigado por baixar o Canvas Funil de Vendas e MEV (55 palavras)
- [obrigado-canvasfunil](paginas/obrigado-canvasfunil.md): Obrigado por baixar o Canvas Funil de Vendas (20 palavras)
- [obrigado-codigo](paginas/obrigado-codigo.md): Parabéns por ter adquirido o Código da Conversão (308 palavras)
- [obrigado-compra-oficinaprospeccao](paginas/obrigado-compra-oficinaprospeccao.md): Obrigado | Imersão Funil de Vendas Infalível | Compra (62 palavras)
- [obrigado-crm10x](paginas/obrigado-crm10x.md): Obrigado CRM10X - Passo a Passo (38 palavras)
- [obrigado-ebook-funil-de-vendas](paginas/obrigado-ebook-funil-de-vendas.md): Obrigado | eBook Funil de Vendas - Dominando os indicadores para bater meta todos os dias (169 palavras)
- [obrigado-franquia](paginas/obrigado-franquia.md): Obrigado | Franquia (25 palavras)
- [obrigado-imersao](paginas/obrigado-imersao.md): Obrigado Lead Imersão Funil de Vendas Infalível (32 palavras)
- [obrigado-imersao-grupovip](paginas/obrigado-imersao-grupovip.md): Obrigado Lead Imersão Funil de Vendas Infalível - Grupo VIP (24 palavras)
- [obrigado-imersao-typebot](paginas/obrigado-imersao-typebot.md): Obrigado Lead Imersão Funil de Vendas Infalível | Typebot (36 palavras)
- [obrigado-inscricao](paginas/obrigado-inscricao.md): Obrigado por se inscrever (227 palavras)
- [obrigado-lead-crm](paginas/obrigado-lead-crm.md): Obrigado Lead CRM (37 palavras)
- [obrigado-lead-crm-agendamento](paginas/obrigado-lead-crm-agendamento.md): Obrigado Lead CRM (47 palavras)
- [obrigado-summiton](paginas/obrigado-summiton.md): Obrigado | Summit.on (30 palavras)
- [oficinameta](paginas/oficinameta.md): Oficina Plano de Meta | Funil de Vendas™ (951 palavras)
- [oficinanegociacao](paginas/oficinanegociacao.md): Oficina Negociação | Funil de Vendas™ (942 palavras)
- [oficinaprospeccao](paginas/oficinaprospeccao.md): Oficina Prospecção | Funil de Vendas™ (949 palavras)
- [omapa](paginas/omapa.md): O Mapa do Treinador de Vendas (915 palavras)
- [parceirocrm](paginas/parceirocrm.md): Funil de Vendas | O jeito simples de bater as metas! - Set2023Nova Parceiro (1365 palavras)
- [politica](paginas/politica.md): Política de Privacidade Funil de Vendas™ (1619 palavras)
- [redirect-adsfb-treinamento](paginas/redirect-adsfb-treinamento.md): Redirect WhatsApp - Treinamento (19 palavras)
- [regulamento-oficial-arena](paginas/regulamento-oficial-arena.md): Regulamento oficial Arena FDV (1798 palavras)
- [regulamentograndprixfdv](paginas/regulamentograndprixfdv.md): Regulamento oficial (3018 palavras)
- [regulamentooficialcopa](paginas/regulamentooficialcopa.md): Regulamento oficial Copa (2019 palavras)
- [sample-page](paginas/sample-page.md): Sample Page (156 palavras)
- [sobre-o-funil-de-vendas](paginas/sobre-o-funil-de-vendas.md): Sobre a Funil de Vendas™ (460 palavras)
- [summiton](paginas/summiton.md): Funil de Vendas™ | Summit.on - Plano de Meta • 15 de Outubro (957 palavras)
- [termo](paginas/termo.md): Termo de Uso Funil de Vendas (2254 palavras)
- [teste-plugin](paginas/teste-plugin.md): Teste Plugin (24 palavras)
- [teste-youtube](paginas/teste-youtube.md): Funil de Vendas | O jeito simples de bater as metas! - Orgânico Youtube (529 palavras)
- [treinamento](paginas/treinamento.md): Funil de Vendas Infalível | Treinamento de Vendas (1141 palavras)
- [unidades](paginas/unidades.md): Unidades Funil de Vendas™ • Educação Comercial (2020 palavras)
- [whatsapp](paginas/whatsapp.md): WhatsApp no Funil de Vendas CRM (233 palavras)
- [workshopfunildevendas](paginas/workshopfunildevendas.md): Workshop Funil de Vendas | 23 de Janeiro 2025 Online (981 palavras)
- [zapier](paginas/zapier.md): Integração com o Zapier e Funil de Vendas (510 palavras)

### Blog (193 posts, do mais recente ao mais antigo)

- 2025-01-31: [Como a Inteligência Artificial Está Transformando o Processo de Venda B2B](blog/2025-01-31_como-a-inteligencia-artificial-esta-transformando-o-processo-de-venda-b2b.md)
- 2024-03-19: [Conheça 8 ferramentas para melhorar a produtividade em vendas](blog/2024-03-19_conheca-9-ferramentas-para-melhorar-a-produtividade-em-vendas.md)
- 2023-12-21: [10 Estratégias simples no B2B para garantir o sucesso na era digital](blog/2023-12-21_10-estrategias-simples-no-b2b-para-garantir-o-sucesso-na-era-digital.md)
- 2023-10-28: [Como erros logísticos podem impactar as vendas?](blog/2023-10-28_como-erros-logisticos-podem-impactar-as-vendas.md)
- 2023-09-28: [Dicas para aumentar as vendas no e-commerce](blog/2023-09-28_dicas-para-aumentar-as-vendas-no-e-commerce.md)
- 2023-09-26: [Inovações Tecnológicas para o Setor de Vendas: Veja as 5 Principais!](blog/2023-09-26_inovacoes-tecnologicas-para-o-setor-de-vendas-veja-as-5-principais.md)
- 2023-09-01: [6 estratégias para lançamentos de novos produtos](blog/2023-09-01_6-estrategias-para-lancamentos-de-novos-produtos.md)
- 2023-07-25: [Tecnologia e Vendas: Quais são e como usar?](blog/2023-07-25_tecnologia-e-vendas-quais-sao-e-como-usar.md)
- 2023-07-05: [Será que a IA vai fazer os funcionários perderem o emprego?](blog/2023-07-05_sera-que-a-ia-vai-fazer-os-funcionarios-perderem-o-emprego.md)
- 2023-07-03: [Quais são os principais tipos de treinamento para vendedores?](blog/2023-07-03_quais-sao-os-principais-tipos-de-treinamento-para-vendedores.md)
- 2023-04-13: [Veja 8 gatilhos mentais para vendas online](blog/2023-04-13_veja-8-gatilhos-mentais-para-vendas-online.md)
- 2023-03-24: [As Técnicas Certas Para Gerenciar Leads Com Sucesso](blog/2023-03-24_tecnicas-certas-para-gerenciar-leads-com-sucesso.md)
- 2023-03-22: [Endomarketing: Uma Ferramenta Essencial Para Empresas De Sucesso](blog/2023-03-22_endomarketing-ferramenta-essencial-para-empresas-de-sucesso.md)
- 2023-03-15: [Aprenda A Usar Aida Para Melhorar Seus Processos De Negócios](blog/2023-03-15_aprenda-a-usar-a-aida-para-melhorar-seus-processos.md)
- 2023-03-14: [Balanced Scorecard – o que é, como funciona?](blog/2023-03-14_balanced-scorecard-o-que-e-como-funciona.md)
- 2023-02-16: [Como aumentar as vendas online? Veja 6 dicas](blog/2023-02-16_como-aumentar-as-vendas-online-veja-6-dicas.md)
- 2023-01-20: [Organização pessoal – como o método GTD pode  te ajudar!](blog/2023-01-20_organizacao-pessoal-metodo-gtd.md)
- 2023-01-18: [Payback – o que é, para que serve e como calcular!](blog/2023-01-18_payback-o-que-e-como-calcular.md)
- 2023-01-13: [Estratégias omnichannel: o que é, vantagens, exemplos!](blog/2023-01-13_estrategias-omnichannel-o-que-e.md)
- 2023-01-10: [Processo de Vendas – O que é e como montar o da sua!](blog/2023-01-10_processo-de-vendas-o-que-e.md)
- 2023-01-05: [Como treinar uma equipe de vendas? Dicas + tipos!](blog/2023-01-05_como-treinar-equipe-de-vendas.md)
- 2023-01-03: [Treinamento comercial: o que é, os benefícios](blog/2023-01-03_treinamento-comercial-o-que-e.md)
- 2022-12-29: [TUDO sobre Treinamento Corporativo: o que é e como fazer?](blog/2022-12-29_tudo-sobre-treinamento-corporativo-o-que-e-e-como-fazer.md)
- 2022-12-27: [Treine sua equipe comercial – Prepare seu time para vender mais](blog/2022-12-27_treine-sua-equipe-comercial.md)
- 2022-12-20: [Como promover um treinamento de vendas para a equipe?](blog/2022-12-20_como-promover-um-treinamento-de-vendas-para-a-equipe.md)
- 2022-10-28: [O que é Omnichannel e quais as vantagens?](blog/2022-10-28_omnichannel-o-que-e.md)
- 2022-10-14: [Pitch de vendas: o que é? Como fazer?](blog/2022-10-14_pitch-de-vendas-o-que-e-como-fazer.md)
- 2022-10-07: [O que é Ramp Up de Vendas ?](blog/2022-10-07_o-que-e-ramp-up-de-vendas.md)
- 2022-10-01: [Plano de marketing: Como fazer para aumentar as vendas?](blog/2022-10-01_plano-de-marketing-como-fazer-para-aumentar-as-vendas.md)
- 2022-09-02: [Gestão de compras: o que é e como fazer?](blog/2022-09-02_gestao-de-compras-o-que-e-como-fazer.md)
- 2022-08-16: [KPI: O Que É, Para Que Serve e Como Escolher os Melhores?](blog/2022-08-16_kpi-o-que-e-para-que-serve-e-como-escolher-os-melhores.md)
- 2022-08-12: [Por que implementar um Software CRM? Veja 7 benefícios](blog/2022-08-12_por-que-implementar-um-software-crm-veja-7-beneficios.md)
- 2022-08-02: [Como ter sucesso em vendas? 10 hábitos que vão ajudar você!](blog/2022-08-02_como-ter-sucesso-em-vendas-10-habitos-que-vao-ajudar-voce.md)
- 2022-07-27: [Pipeline de vendas: o que é, como criar um?](blog/2022-07-27_pipeline-de-vendas-o-que-e-como-criar-um.md)
- 2022-07-20: [Funil de inovação: o que é e como aplicar?](blog/2022-07-20_funil-de-inovacao-o-que-e-e-como-aplicar.md)
- 2022-06-27: [Indicadores de Desempenho: Quais métricas acompanhar?](blog/2022-06-27_indicadores-de-desempenho-quais-metricas-acompanhar.md)
- 2022-05-23: [6 tecnologias que auxiliam nas vendas de sua empresa](blog/2022-05-23_6-tecnologias-que-auxiliam-nas-vendas.md)
- 2022-04-27: [Como vender no B2B? Conheça 5 estratégias para alavancar suas vendas](blog/2022-04-27_como-vender-no-b2b-conheca-5-estrategias.md)
- 2022-04-11: [Como engajar o time de vendas com gamificação?](blog/2022-04-11_como-engajar-o-time-de-vendas-com-gamificacao.md)
- 2022-02-10: [Como bater as metas de vendas todos os meses sem dar descontos?](blog/2022-02-10_como-bater-as-metas-de-vendas-todos-os-meses-sem-dar-descontos.md)
- 2021-12-21: [5 exemplos de líderes para você se inspirar](blog/2021-12-21_5-exemplos-de-lideres-para-voce-se-inspirar.md)
- 2021-12-15: [7 formas de atrair clientes e vender todos os dias](blog/2021-12-15_7-formas-de-atrair-clientes-e-vender-todos-os-dias.md)
- 2021-12-07: [As melhores práticas para quebrar objeções em vendas](blog/2021-12-07_as-melhores-praticas-para-quebrar-objecoes-em-vendas.md)
- 2021-12-01: [As 3 melhores estratégias de vendas para você ter mais clientes](blog/2021-12-01_as-3-melhores-estrategias-de-vendas-para-voce-ter-mais-clientes.md)
- 2021-11-22: [5 Passos do planejamento estratégico de vendas](blog/2021-11-22_5-passos-do-planejamento-estrategico-de-vendas.md)
- 2021-11-16: [O que a Netflix tem para nos ensinar em vendas?](blog/2021-11-16_o-que-a-netflix-tem-para-nos-ensinar-em-vendas.md)
- 2021-11-11: [5 Formas de garantir o sucesso de seu Funil de Vendas](blog/2021-11-11_5-formas-de-garantir-o-sucesso-de-seu-funil-de-vendas.md)
- 2021-10-09: [Como iniciar na carreira de vendas consultiva?](blog/2021-10-09_como-iniciar-na-carreira-de-vendas-consultiva.md)
- 2021-09-24: [Como fazer gestão comercial de sua empresa da forma certa](blog/2021-09-24_como-fazer-gestao-comercial-de-sua-empresa-da-forma-certa.md)
- 2021-09-23: [Como criar um script de abordagem de vendas matador?](blog/2021-09-23_como-criar-um-script-de-abordagem-de-vendas-matador.md)
- 2021-08-19: [O que é Venda b2b? Tudo o que você precisa saber!](blog/2021-08-19_o-que-e-venda-b2b-tudo-o-que-voce-precisa-saber.md)
- 2021-08-11: [Software de Gestão de Vendas: o que é e porque ter um?](blog/2021-08-11_software-de-gestao-de-vendas-o-que-e-e-porque-ter-um.md)
- 2021-08-04: [Máquina de vendas: o que é, qual a sua importância e como fazer?](blog/2021-08-04_maquina-de-vendas-o-que-e-qual-a-sua-importancia-e-como-fazer.md)
- 2021-07-29: [Funil de vendas: o que é, tipos, técnicas e como vender mais](blog/2021-07-29_funil-de-vendas-o-que-e-tipos-tecnicas-e-como-vender-mais.md)
- 2021-07-27: [As técnicas mais incríveis de prospecção de vendas](blog/2021-07-27_prospeccao-de-clientes.md)
- 2021-07-10: [Carteira de clientes: Como fazer gestão e vender mais](blog/2021-07-10_carteira-de-clientes-como-fazer-gestao-e-vender-mais.md)
- 2021-07-02: [Como transformar seguidores em clientes?](blog/2021-07-02_como-transformar-seguidores-em-clientes.md)
- 2021-05-20: [Funil de Vendas em Y: Como aplicar para atrair mais leads](blog/2021-05-20_funil-de-vendas-em-y-como-aplicar-para-atrair-mais-leads-e-gerar-mais-vendas.md)
- 2021-05-04: [5 ações de marketing para alavancar as vendas](blog/2021-05-04_5-acoes-de-marketing-para-alavancar-as-vendas.md)
- 2021-03-16: [6 livros de vendas que todo profissional deve ler](blog/2021-03-16_6-livros-de-vendas-livros-para-vendedores.md)
- 2021-02-24: [5 passos para ter SUCESSO em VENDAS B2B | A Nº5 É MATADORA!](blog/2021-02-24_5-passos-para-ter-sucesso-em-vendas-b2b.md)
- 2020-06-16: [O que é Execução Consistente?](blog/2020-06-16_o-que-e-execucao-consistente.md)
- 2020-06-08: [Gamificação em vendas: O que e como engajar os vendedores](blog/2020-06-08_gamificacao-para-vendas.md)
- 2020-06-03: [Como fazer um pós-venda espetacular e aumentar a receita da empresa](blog/2020-06-03_como-fazer-um-pos-venda-espetacular.md)
- 2020-05-05: [3 hábitos de pessoas altamente produtivas](blog/2020-05-05_3-habitos-de-pessoas-altamente-produtivas.md)
- 2020-05-05: [8 filmes imperdíveis para vendedores – Atualizado ✔](blog/2020-05-05_8-filmes-imperdiveis-para-vendedores.md)
- 2020-04-28: [5 dicas de como formar um Líder de Vendas altamente eficaz](blog/2020-04-28_5-dicas-formar-lider-vendas-altamente-eficaz.md)
- 2020-04-07: [Abertura de empresa: entenda tudo sobre de forma simples](blog/2020-04-07_abertura-de-empresa-entenda-mais-sobre-este-processo.md)
- 2020-04-02: [Storytelling em vendas, como criar incríveis histórias que vendem?](blog/2020-04-02_storytelling-como-criar-historias-que-vendem.md)
- 2020-03-27: [5 lições de empreendedorismo Filme McDonald’s: Fome de Poder](blog/2020-03-27_5-licoes-de-empreendedorismo-filme-mcdonalds-fome-de-poder.md)
- 2020-03-24: [Produtividade no trabalho: O que é e como manter o foco](blog/2020-03-24_produtividade-no-trabalho-o-que-e-e-como-manter-o-foco.md)
- 2020-03-03: [O que Will Smith pode nos ensinar sobre vendas?](blog/2020-03-03_o-que-will-smith-pode-nos-ensinar-sobre-vendas.md)
- 2020-02-23: [Como ser um bom Vendedor B2B e bater as metas todos os meses?](blog/2020-02-23_como-ser-um-otimo-vendedor-e-bater-as-metas.md)
- 2020-02-15: [5 formas para motivar a equipe de vendas e ter um time campeão](blog/2020-02-15_5-formas-de-motivar-a-equipe-de-vendas.md)
- 2020-02-10: [Matriz SWOT: O que é e como aplicar nas estratégias de seu negócio?](blog/2020-02-10_matriz-swot-como-fazer-analise.md)
- 2020-01-29: [Marketing Digital para consultório odontológico: Tudo que seu negócio precisa](blog/2020-01-29_marketing-digital-e-consultorio-odontologico.md)
- 2020-01-28: [5 Estratégias para diminuir o Ciclo de Vendas e vender mais rápido](blog/2020-01-28_5-estrategias-para-diminuir-o-ciclo-de-vendas.md)
- 2020-01-22: [Etapas do Funil de vendas: Como ter sucesso na construção? [SUPER POST]](blog/2020-01-22_etapas-do-funil-de-vendas.md)
- 2020-01-08: [Como gerar leads grátis e vender muito mais?](blog/2020-01-08_como-gerar-leads-criando-oportunidades.md)
- 2019-12-22: [Como usar o Linkedin para prospectar clientes e fechar mais negócios?](blog/2019-12-22_como-usar-o-linkedin-para-vender-mais.md)
- 2019-12-16: [Chet Holmes e Funil de Vendas: Como ter o lead certo e vender mais](blog/2019-12-16_como-ter-o-lead-certo-em-seu-funil-de-vendas-chet-holmes.md)
- 2019-11-14: [3 Passos para gerar Leads Qualificados para o seu Funil de Vendas](blog/2019-11-14_leads-qualificados-para-o-seu-funil-de-vendas.md)
- 2019-09-18: [5 principais indicadores de vendas para Bater a Meta](blog/2019-09-18_5-principais-indicadores-de-vendas-para-bater-a-meta.md)
- 2019-07-24: [4 Passos para Melhorar sua Gestão Empresarial](blog/2019-07-24_4-passos-para-a-gestao-empresarial.md)
- 2019-06-27: [Os 4 Erros que não deixam sua empresa crescer](blog/2019-06-27_4-erros-que-nao-deixam-sua-empresa-crescer.md)
- 2019-06-04: [O que é Venda Consultiva e Venda Transacional? Entenda as Diferenças](blog/2019-06-04_venda-consultiva-x-venda-transacional.md)
- 2019-05-20: [Não cobre a meta de vendas. Saiba porquê!](blog/2019-05-20_nunca-mais-cobre-a-meta-de-vendas.md)
- 2019-02-26: [Por que as agências de marketing precisam de um CRM?](blog/2019-02-26_agencia-de-marketing-e-crm.md)
- 2019-01-25: [Execução Consistente: 2019 é o Ano da Produtividade](blog/2019-01-25_execucao-consistente2019.md)
- 2019-01-17: [7 Tendências de marketing e vendas para aplicar em sua empresa](blog/2019-01-17_tendencias-de-marketing-e-vendas.md)
- 2019-01-11: [Sonho, Objetivo e Meta: Qual a diferença e porque preciso saber?](blog/2019-01-11_sonho-objetivo-meta.md)
- 2018-12-18: [Inovação Digital: Será que o Mercado está Preparado?](blog/2018-12-18_inovacao-digital-sera-que-o-mercado-esta-preparado.md)
- 2018-11-16: [Treinamento de Vendas: Como Capacitar o Time Com Custo ZERO?](blog/2018-11-16_treinamento-de-vendas-como-treinar-os-vendedores.md)
- 2018-10-26: [Quem não prospecta, não vende! Saiba como prospectar](blog/2018-10-26_como-prospectar-quem-nao-prospecta-nao-vende.md)
- 2018-10-15: [A era da transformação digital nas vendas](blog/2018-10-15_transformacao-digital-nas-vendas.md)
- 2018-10-04: [Inovação aplicada às Vendas: Como usar para acelerar as Vendas](blog/2018-10-04_inovacao-para-acelerar-as-vendas.md)
- 2018-09-19: [O que é CRM? Mais que um sistema, uma estratégia de negócio!](blog/2018-09-19_o-que-e-crm-entenda-tudo-sobre.md)
- 2018-09-03: [Entenda mais sobre Customer Success](blog/2018-09-03_entenda-mais-sobre-customer-success.md)
- 2018-08-30: [Webinar: As Verdades Sobre o Funil de Vendas](blog/2018-08-30_webinar-verdades-funil-de-vendas.md)
- 2018-08-24: [Previsibilidade: Conheça o Canvas Funil de Vendas](blog/2018-08-24_post-canvas-funil-de-vendas-blog.md)
- 2018-08-15: [Funil de Vendas x Funil de Marketing: Qual a Diferença?](blog/2018-08-15_funil-de-vendas-funil-de-marketing.md)
- 2018-07-25: [Como Construir um Processo de Vendas Infalível](blog/2018-07-25_treinamento-de-vendas-processo-infalivel.md)
- 2018-06-20: [Prospects, leads, clientes e oportunidades. Qual a diferença?](blog/2018-06-20_prospects-leads-clientes-e-oportunidades-qual-a-diferenca.md)
- 2018-05-29: [Como impulsionar as Vendas com Inbound e Outbound Marketing](blog/2018-05-29_inbound-outbound-para-gerar-mais-leads.md)
- 2018-05-18: [Customer Success na Prática: É possível prever um Churn?](blog/2018-05-18_customer-success-pratica-churn.md)
- 2018-04-11: [A arte da conversão em vendas](blog/2018-04-11_a-arte-da-conversao-em-vendas.md)
- 2018-02-14: [Atualizações no CRM Funil de Vendas](blog/2018-02-14_atualizacoes-funil-de-vendas.md)
- 2018-02-07: [3 Competências de um Gestor: Saiba como Colocá-las em Prática](blog/2018-02-07_tres-competencias-de-um-gestor.md)
- 2018-01-31: [3 Passos Infalíveis Para Conhecer seu Cliente](blog/2018-01-31_3-passos-conhecer-seu-cliente.md)
- 2018-01-26: [CRM e ERP: como eles ajudam seu negócio](blog/2018-01-26_crm-e-erp-como-eles-ajudam-seu-negocio.md)
- 2018-01-22: [Diferenças entre Inbound e Outbound Marketing](blog/2018-01-22_diferencas-entre-inbound-e-outbound-marketing.md)
- 2018-01-14: [Time de Sucesso: Contratando os Melhores Vendedores para sua Empresa](blog/2018-01-14_time-de-sucesso.md)
- 2018-01-09: [O papel do gestor no uso do CRM](blog/2018-01-09_o-papel-do-gestor-no-uso-do-crm.md)
- 2017-12-20: [6 Segredos do Relacionamento com o Cliente](blog/2017-12-20_6-segredos-do-relacionamento-com-o-cliente.md)
- 2017-12-18: [Vídeo: O maior aprendizado de 2017](blog/2017-12-18_o-maior-aprendizado-de-2017.md)
- 2017-12-14: [Como usar EAD nas vendas](blog/2017-12-14_como-usar-ead-nas-vendas.md)
- 2017-12-12: [Tecnologia de Posicionamento Inteligente: Conheça as Vantagens](blog/2017-12-12_tecnologia-de-posicionamento-inteligente.md)
- 2017-12-08: [Vídeo: Quanto Custa Não Medir Suas Vendas?](blog/2017-12-08_quanto-custa-nao-medir-suas-vendas.md)
- 2017-12-06: [Após 600 implantações do Funil de Vendas, como chegamos no estado da arte da construção metodológica!](blog/2017-12-06_600-implantacoes-do-funil-de-vendas.md)
- 2017-12-06: [6 principais indicadores de um CRM que sua empresa deve acompanhar](blog/2017-12-06_indicadores-de-um-crm.md)
- 2017-12-04: [Vídeo: Diferenças entre Funil de Vendas e Funil de Marketing](blog/2017-12-04_diferencas-entre-funil-de-vendas-e-funil-de-marketing.md)
- 2017-11-30: [O que é CRM? Entenda definitivamente!](blog/2017-11-30_o-que-e-crm.md)
- 2017-11-28: [Gerei leads e agora? Saiba como trabalhar os leads gerados](blog/2017-11-28_gerei-leads-e-agora-trabalhar-os-leads.md)
- 2017-11-24: [Vídeo: Qual a melhor taxa de conversão para suas vendas](blog/2017-11-24_video-qual-a-melhor-taxa-de-conversao.md)
- 2017-11-20: [Business Intelligence: Tudo que você precisa saber](blog/2017-11-20_business-intelligence.md)
- 2017-11-17: [[Vídeo] CRM e Funil de Vendas: Entenda a Diferença](blog/2017-11-17_diferenca-entre-funil-de-vendas-e-crm.md)
- 2017-11-14: [O que uma Ferramenta CRM pode fazer por seu Time de Vendas](blog/2017-11-14_crm-e-equipe-de-vendas.md)
- 2017-11-10: [Vídeo: Principais indicadores que você deve acompanhar!](blog/2017-11-10_principais-indicadores.md)
- 2017-11-06: [Vídeo: A arte da prospecção](blog/2017-11-06_a-arte-da-prospeccao.md)
- 2017-10-31: [O que é ICP? Saiba como definir seu cliente ideal](blog/2017-10-31_definindo-cliente-ideal.md)
- 2017-10-26: [Um Cliente Novo é Bom… Mas Custa Caro](blog/2017-10-26_cliente-novo-custa-caro.md)
- 2017-10-24: [Quer saber porque sua startup não vai pra frente?](blog/2017-10-24_startup-vai-pra-frente.md)
- 2017-10-17: [Porque e como usar um Funil de Vendas?](blog/2017-10-17_porque-usar-um-funil-de-vendas-2.md)
- 2017-10-17: [Aprenda a construir a meta de vendas](blog/2017-10-17_aprenda-a-construir-a-meta-de-vendas.md)
- 2017-10-16: [O que é Funil de Vendas™? A Definição Oficial](blog/2017-10-16_o-que-e-funil-de-vendas.md)
- 2017-10-09: [Previsibilidade em Vendas: Como o Simulador de Meta irá te ajudar](blog/2017-10-09_simulador-meta-previsibilidade-nas-vendas.md)
- 2017-10-02: [Como um negócio SAAS pode escalar as vendas com marketing digital](blog/2017-10-02_marketing-digital-para-saas.md)
- 2017-09-26: [Como o agendamento de atividades pode salvar sua meta do mês](blog/2017-09-26_agendamento-de-atividades.md)
- 2017-09-20: [Use a comunicação visual para vender cada vez mais](blog/2017-09-20_comunicacao-visual.md)
- 2017-09-19: [Inside Sales: O que é e como construir um bom time de vendas](blog/2017-09-19_inside-sales.md)
- 2017-09-15: [CAC, LTV e ROI: por que são tão importantes para sua empresa?](blog/2017-09-15_cac-ltv-roi.md)
- 2017-09-08: [A importância do Marketing Digital para atrair novos clientes](blog/2017-09-08_a-importancia-do-marketing-digital.md)
- 2017-09-01: [Você conhece a Jornada de compra do seu cliente?](blog/2017-09-01_jornada-de-compra-do-seu-cliente.md)
- 2017-08-28: [Eliminando Barreiras Entre o Comercial e Financeiro](blog/2017-08-28_eliminando-barreiras-entre-comercial-e-financeiro.md)
- 2017-08-21: [O que você entrega para o seu cliente: preço ou valor?](blog/2017-08-21_preco-ou-valor.md)
- 2017-08-16: [Vídeo: O sol e as oportunidades em vendas](blog/2017-08-16_o-sol-e-as-oportunidades.md)
- 2017-08-14: [Como está a comunicação da sua equipe?](blog/2017-08-14_como-esta-a-comunicacao-da-sua-equipe.md)
- 2017-08-08: [Por que as planilhas podem trazer prejuízos ao seus negócios?](blog/2017-08-08_planilhas-para-controle-de-vendas.md)
- 2017-07-31: [Como prospectar clientes: 5 formas de encontrar novos clientes](blog/2017-07-31_prospectando-mais-clientes.md)
- 2017-07-28: [Como acelerar as vendas e ter bons resultados?](blog/2017-07-28_acelerar-nas-vendas.md)
- 2017-07-26: [Vídeo: Case de sucesso Grupo Pestana](blog/2017-07-26_video-case-de-sucesso-grupo-pestana.md)
- 2017-07-25: [Vídeo: O que é poder da crença e qual a relação com as vendas?](blog/2017-07-25_poder-da-crenca.md)
- 2017-07-21: [O que é Sucesso do Cliente e por que você deve aplicá-lo?](blog/2017-07-21_sucesso-do-cliente.md)
- 2017-07-14: [Marketing de Conteúdo: Como ele Ajuda o Comercial a Vender mais?](blog/2017-07-14_marketing-de-conteudo-e-vendas.md)
- 2017-07-10: [O que é CAC e por que é importante acompanhar o seu?](blog/2017-07-10_o-que-e-cac.md)
- 2017-07-04: [Qual a importância de criar relacionamento com clientes?](blog/2017-07-04_relacionamento-com-clientes.md)
- 2017-06-28: [Como convencer a equipe de vendas a usar um CRM?](blog/2017-06-28_convencer-a-equipe-de-vendes-usar-um-crm.md)
- 2017-06-22: [Você sabe o que é venda consultiva?](blog/2017-06-22_o-que-e-venda-consultiva.md)
- 2017-06-19: [4 Dicas de Livros de Vendas para você Vender mais e melhor](blog/2017-06-19_dicas-de-livros-de-vendas.md)
- 2017-06-08: [SolarPrime – Case de sucesso com o Funil de Vendas](blog/2017-06-08_solarprime-case-de-sucesso.md)
- 2017-06-06: [Como gerenciar a equipe de vendas e não deixar a motivação cair?](blog/2017-06-06_como-gerenciar-a-equipe-de-vendas.md)
- 2017-06-01: [Confira 4 erros fatais nas vendas](blog/2017-06-01_erros-fatais-nas-vendas.md)
- 2017-05-29: [Qual a missão do gestor de vendas? Confira nossas 3 dicas](blog/2017-05-29_missao-verdadeiro-gestor-comercial.md)
- 2017-05-25: [5 mitos e verdades sobre Funil de Vendas](blog/2017-05-25_mitos-e-verdades-sobre-funil-de-vendas.md)
- 2017-05-20: [O medo da crise política nas vendas – como você pode vencê-lo?](blog/2017-05-20_o-medo-da-crise-politica-nas-vendas-como-voce-pode-vence-lo.md)
- 2016-12-04: [Case boutique de revestimentos](blog/2016-12-04_case-de-sucesso-como-uma-boutique-de-revestimentos-esta-batendo-suas-metas-em-um-ano-de-cr.md)
- 2016-12-01: [Case Escola de Idiomas que aumentou em 185% suas Vendas](blog/2016-12-01_case-escola-de-idiomas-aumentou-suas-vendas-crm-funil-de-vendas.md)
- 2016-09-09: [Não tenho dom para vendas. E agora?](blog/2016-09-09_nao-tenho-dom-para-vendas-e-agora.md)
- 2016-08-21: [Como bater a meta todos os dias?](blog/2016-08-21_como-bater-a-meta-todos-os-dias.md)
- 2016-08-02: [Se preciso vender mais, porque não faço?](blog/2016-08-02_se-preciso-vender-mais-porque-nao-faco.md)
- 2016-07-13: [Taxa de Conversão no Funil de Vendas](blog/2016-07-13_taxa-de-conversao-no-funil-de-vendas.md)
- 2016-06-02: [O que nos trouxe até aqui?](blog/2016-06-02_o-que-nos-trouxe-ate-aqui.md)
- 2016-05-24: [A importância de se entender o MÉTODO em vendas](blog/2016-05-24_metodo-em-vendas.md)
- 2016-04-22: [4 dicas para analisar o desempenho da equipe de vendas](blog/2016-04-22_4-dicas-para-analisar-o-desempenho-da-equipe-de-vendas.md)
- 2016-04-15: [CRM ou Pipeline?](blog/2016-04-15_crm-ou-pipeline.md)
- 2016-03-28: [Porque e como usar um Funil de Vendas de forma eficiente?](blog/2016-03-28_funil-de-vendas-eficiencia.md)
- 2016-03-11: [Case de Sucesso: Método Supera](blog/2016-03-11_supera-case-de-sucesso.md)
- 2016-03-02: [Taxa de Conversão: O principal indicador em vendas](blog/2016-03-02_taxa-de-conversao-o-principal-indicador-em-vendas.md)
- 2016-02-23: [Será que você é vendedor de verdade?](blog/2016-02-23_sera-que-voce-e-vendedor-de-verdade.md)
- 2016-02-15: [3 dicas incríveis para prospectar e fechar mais negócios!](blog/2016-02-15_3-dicas-para-prospectar-e-fechar-mais-negocios.md)
- 2016-01-23: [Funil de vendas não é o que estão dizendo por aí!](blog/2016-01-23_funil-de-vendas-nao-e-o-que-estao-dizendo-por-ai.md)
- 2016-01-09: [Como o Modelo de Negócio te ajuda vender?](blog/2016-01-09_como-o-modelo-de-negocio-te-ajuda-vender.md)
- 2016-01-07: [Como saber o número certo de vendedores?](blog/2016-01-07_o-numero-certo-de-vendedores.md)
- 2015-11-24: [Como escolher entre Inbound Sales e Outbound Sales?](blog/2015-11-24_como-escolher-entre-inbound-sales-e-outbound-sales.md)
- 2015-10-08: [Como motivar os vendedores para bater a meta de vendas?](blog/2015-10-08_como-manter-a-equipe-comercial-motivada-para-bater-metas-2.md)
- 2015-10-05: [Como iniciar em vendas? Acompanhe estas dicas](blog/2015-10-05_quer-iniciar-em-vendas-acompanhe-estas-dicas-2.md)
- 2015-10-01: [Dicas de Vendas: Como manter o foco e turbinar os resultados?](blog/2015-10-01_dicas-de-vendas-foco.md)
- 2015-08-12: [A cultura nas vendas](blog/2015-08-12_a-cultura-nas-vendas.md)
- 2015-07-13: [Afinal, por que Design de Vendas?](blog/2015-07-13_afinal-porque-design-de-vendas.md)
- 2015-06-02: [Por quê ter uma meta de vendas é importante?](blog/2015-06-02_porque-criar-uma-meta.md)
- 2015-05-22: [3 Benefícios que você tem ao usar o Funil de Vendas](blog/2015-05-22_3-beneficios-que-voce-tem-ao-usar-o-funil-de-vendas.md)
- 2015-03-29: [5 atitudes que toda empresa espera de seu vendedor](blog/2015-03-29_5-atitudes-que-toda-empresa-espera-de-seu-vendedor.md)
- 2015-02-26: [5 Estratégias para alimentar o Funil de Vendas com Oportunidades](blog/2015-02-26_estrategias-para-alimentar-o-funil-de-vendas.md)

### Central de Ajuda (108 artigos)

- [Activecampaign – Receba leads](ajuda/activecampaign-receba-leads.md)
- [Adicionar atividades na oportunidade](ajuda/adicionar-atividades-na-oportunidade.md)
- [Adicionar Oportunidades](ajuda/adicionar-oportunidades.md)
- [Alerta de Atividades (Cores)](ajuda/alerta-de-atividades-cores.md)
- [Analisando os indicadores do Game](ajuda/analisando-os-indicadores-do-game.md)
- [AOL](ajuda/aol.md)
- [Api Busca de Oportunidades](ajuda/api-busca-de-oportunidades.md)
- [Api Criação de produtos](ajuda/api-criacao-de-produtos.md)
- [Api de Atividades (Criação, Edição, Exclusão, Exibição)](ajuda/api-de-atividades.md)
- [Api Entrada de Dados](ajuda/api-entrada-de-dados.md)
- [Api Importação de Arquivos](ajuda/api-importacao-de-arquivos.md)
- [Api Listagem de Atividades – Tipo](ajuda/api-listagem-de-atividades-tipo.md)
- [Api Listagem de atividades – Usuários](ajuda/api-listagem-de-atividades-usuarios.md)
- [Api Listagem de campos personalizados](ajuda/api-listagem-de-campos-personalizados.md)
- [Api Listagem de Canais de Venda](ajuda/api-listagem-de-canais-de-venda.md)
- [Api Listagem de Etapas](ajuda/api-listagem-de-etapas.md)
- [Api Listagem de Oportunidades](ajuda/api-consulta.md)
- [Api Listagem de Respostas de Ganho](ajuda/api-listagem-de-respostas-de-ganho.md)
- [Api Listagem de Respostas de Perda](ajuda/api-listagem-de-respostas-de-perda.md)
- [Api Listagem de Segmentos](ajuda/api-listagem-de-segmentos.md)
- [Api Listagem de usuários](ajuda/api-listagem-de-usuarios.md)
- [Api Listagem Funil](ajuda/api-listagem-funil.md)
- [API para Edição de Oportunidades](ajuda/api-para-edicao-de-oportunidades.md)
- [Api Transferência de oportunidade](ajuda/api-transferencia-de-oportunidade.md)
- [Apontar Perda e Ganho do Funil de Vendas para o RD Station](ajuda/apontar-perda-e-ganho-do-funil-de-vendas-para-o-rd-station.md)
- [Arquivos – Espaço em Disco](ajuda/arquivos-espaco-em-disco.md)
- [Assinatura de E-mail](ajuda/assinatura-de-e-mail.md)
- [Atualização dos pontos](ajuda/atualizacao-dos-pontos.md)
- [Atualizações Funil de Vendas™ CRM](ajuda/atualizacoes-funil-de-vendas-crm.md)
- [Aula 1 – Introdução](ajuda/aula-1-introducao-2.md)
- [Aula 2 – Desafios em vendas](ajuda/aula-2-desafios-em-vendas.md)
- [Aula 3 – Visão geral do Software CRM](ajuda/aula-3-visao-geral-do-software-crm.md)
- [Aula 4 – Otimizando o processo com o software CRM](ajuda/aula-4-otimizando-o-processo-com-o-software-crm.md)
- [Aula 5 – Analisando as Estatísticas do CRM](ajuda/aula-5-analisando-as-estatisticas-do-crm.md)
- [Aula 6 – Gestão das oportunidades](ajuda/aula-6-gestao-das-oportunidades.md)
- [Aula 7 – Configurações](ajuda/aula-1-introducao.md)
- [Builderall](ajuda/builderall.md)
- [Cadastrar categoria de Atividades](ajuda/cadastrar-categoria-de-atividades.md)
- [Canais de Vendas](ajuda/canais-de-vendas.md)
- [Como adicionar uma anotação na oportunidade?](ajuda/como-adicionar-uma-anotacao-na-oportunidade.md)
- [Como alterar Senha](ajuda/como-alterar-senha.md)
- [Como atrelar uma atividade ao Google Agenda?](ajuda/como-atrelar-uma-atividade-ao-google-agenda.md)
- [Como excluir atividades?](ajuda/como-excluir-atividades.md)
- [Como limpar meus cookies de navegação?](ajuda/como-limpar-meus-cookies-de-navegacao.md)
- [Configurando a temporada do Game](ajuda/configurando-a-temporada-do-game.md)
- [Conversão Pixel Facebook (Meta)](ajuda/conversao-pixel-facebook-meta.md)
- [Definir Metas](ajuda/definir-metas.md)
- [Envio de WhatsApp no CRM](ajuda/envio-de-whatsapp-no-crm.md)
- [Esqueceu a senha?](ajuda/esqueceu-a-senha.md)
- [Exportar Oportunidades](ajuda/exportar-oportunidades.md)
- [Extensão WhatsApp Chrome](ajuda/extensao-whatsapp-chrome.md)
- [Facebook Lead > Make.com | com API Carrossel](ajuda/facebook-lead-make-com-com-api-carrossel.md)
- [Filtro novos cadastros e todos cadastros](ajuda/filtro-novos-cadastros-e-todos-cadastros.md)
- [Filtro personalizado para exportar em Excel](ajuda/filtro-personalizado-para-exportar-em-excel.md)
- [Filtro tela oportunidade](ajuda/filtro-tela-oportunidade.md)
- [Filtros](ajuda/filtros.md)
- [Filtros de Atividades](ajuda/filtros-de-atividades.md)
- [Forçando um título e canal de vendas no Formulário de Captura de lead](ajuda/forcando-um-titulo-e-canal-de-vendas-no-formulario-de-captura-de-lead.md)
- [Gamificação Funil de Vendas CRM](ajuda/gamificacao-funil-de-vendas-crm.md)
- [Gmail / GSuite – Senha de app | Nova regra do Google](ajuda/gmail-gsuite-senha-de-app-nova-regra-do-google.md)
- [Hierarquia no Funil de Vendas](ajuda/hierarquia-no-funil-de-vendas.md)
- [Hostgator](ajuda/hostgator.md)
- [Hotmart](ajuda/hotmart.md)
- [iCloud](ajuda/icloud.md)
- [Imagem URL – Para assinatura de e-Mail](ajuda/imagem-url-para-assinatura-de-e-mail.md)
- [Importar Oportunidades](ajuda/importar-oportunidades.md)
- [Inserir Botão WhatsApp no Wix](ajuda/inserir-botao-whatsapp-no-wix.md)
- [Integrando com Facebook Leads (via Zapier)](ajuda/integrando-com-facebook-leads-via-zapier.md)
- [Integrando Wix (Formulários) ao Funil de Vendas | Zapier](ajuda/integrando-wix-formularios-ao-funil-de-vendas-zapier.md)
- [Integração com SMS Mobizon](ajuda/integracao-com-sms-mobizon.md)
- [Integração com WhatsApp (Letalk)](ajuda/integracao-com-whatsapp-letalk.md)
- [KingHost](ajuda/kinghost.md)
- [LeadLovers](ajuda/leadlovers.md)
- [Locaweb](ajuda/locaweb.md)
- [Logs de importações](ajuda/logs-de-importacoes.md)
- [Minha pontuação não atualiza, e agora?](ajuda/minha-pontuacao-nao-atualiza-e-agora.md)
- [Modelos / Template WhatsApp](ajuda/modelos-template-whatsapp.md)
- [Modelos / Templates de E-mails](ajuda/modelos-templates-de-e-mails.md)
- [MSN](ajuda/msn.md)
- [Notificações por e-Mail](ajuda/notificacoes-por-e-mail.md)
- [Oportunidades sumiram e agora?](ajuda/oportunidades-sumiram-e-agora.md)
- [Perfil da Conta](ajuda/perfil-da-conta.md)
- [Permissões de acesso](ajuda/permissoes-de-acesso.md)
- [Personalizar campos](ajuda/personalizar-campos.md)
- [Personalizar Funil](ajuda/personalizar-funil.md)
- [Posso ganhar a oportunidade para um mês que já passou?](ajuda/posso-ganhar-a-oportunidade-para-um-mes-que-ja-passou.md)
- [Produtos](ajuda/produtos.md)
- [Reabrir Oportunidades Ganhas ou Perdidas](ajuda/reabrir-oportunidades-ganhas-ou-perdidas.md)
- [Reev](ajuda/reev.md)
- [Resposta de Ganho](ajuda/resposta-de-ganho.md)
- [Resposta de Perda](ajuda/resposta-de-perda.md)
- [Restaurar filtros (Oportunidades)](ajuda/restaurar-filtros-oportunidades.md)
- [Retornar no futuro (Oportunidades Ganhar / Perder)](ajuda/retornar-no-futuro-oportunidades-ganhar-perder.md)
- [SMTP Personalizado](ajuda/smtp-personalizado.md)
- [Tela de Atividades](ajuda/tela-de-atividades.md)
- [Tela de Contatos](ajuda/tela-de-contatos.md)
- [Tela de Estatísticas](ajuda/tela-de-estatisticas.md)
- [Tela de Meta](ajuda/tela-de-meta.md)
- [Tela de Oportunidades](ajuda/mapa-de-oportunidades.md)
- [Terra](ajuda/terra.md)
- [Transferir oportunidades de um vendedor para outro](ajuda/transferir-oportunidades-de-um-vendedor-para-outro.md)
- [Transferir TODAS as oportunidades](ajuda/transferir-todas-as-oportunidades.md)
- [Umbler](ajuda/umbler.md)
- [Uol](ajuda/uol.md)
- [Usuários](ajuda/usuarios.md)
- [UTM em botão WhatsApp e Formulário](ajuda/utm-em-botao-whatsapp-e-formulario.md)
- [Yahoo!](ajuda/yahoo.md)
- [Zoho Mail](ajuda/zoho-mail.md)
