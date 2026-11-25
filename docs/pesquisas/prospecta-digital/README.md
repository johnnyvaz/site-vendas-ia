# Pesquisa: Prospecta Digital (prospecta.digital)

Coleta completa em 2026-11-25. Fonte: site público (páginas pré-renderizadas em React/Vite + blog WordPress em `/conteudo/` via REST API).

## Resumo

**O que é:** agência de São José do Rio Preto (SP), 15 anos, posicionada como *parceira de expansão de franqueadoras* — marketing + CRM + método comercial "do primeiro clique ao contrato assinado". Nega ser "agência de tráfego".

**Público:** franqueadoras com meta de expansão (dono, CEO, diretor de expansão).

**Oferta (5 frentes):**
1. Geração de demanda — Meta e Google Ads, criativos/roteiros, landing pages com teste A/B mensal.
2. Conversão 24h — CRM, chatbot com IA, WhatsApp, e-mail, nutrição e repescagem automáticas.
3. Estratégia e diagnóstico — diagnóstico de funil, estruturação de CRM, cliente oculto.
4. Acompanhamento lado a lado — reunião semanal + revisão quinzenal + grupo de WhatsApp quase diário.
5. Plataforma **Cubo Suite** (cubosuite.com.br) — CRM próprio com WhatsApp API oficial, chatbot e agentes de IA (criado pelo fundador David Borges).

**Método — 6 pilares:** Atração · Conversão · Pós-conversão · Comercial · Nutrição · Ativação. "CRM é a fonte da verdade." Funil enxuto: Novo → Tentativa de contato → Reunião agendada → COF enviada → Contrato → Pix recebido (sem etapa "reunião realizada"; "sem momento" ≠ "sem perfil").

**Comercial:** não cobra por lead; preço só após diagnóstico; plano mensal sem fidelidade; operação no ar em 4 semanas. Não atende o candidato no lugar do time da rede.

**CTA único:** "Quero o diagnóstico do meu funil" — gratuito, 45 min, sem compromisso (+ botão WhatsApp +55 17 99779-1300). Repetido em hero, meio e rodapé de todas as páginas.

**Provas sociais:**
- 1.200 franquias vendidas pelas redes clientes em 2025; 500 no 1º tri 2026; satisfação 9,8.
- Cases: Mercadão dos Óculos (750 franquias, desde a 1ª), Bella Capri (5 anos, "quase dobramos contratos"), Lavateria (rumo a 1.000 unidades), Milky Moo (desde abr/2024).
- ~22 logos: Cultura Inglesa, Chilli Beans, Spoleto, China in Box, Casa do Pão de Queijo, Chiquinho, iGUi, Grupo Trigo etc.
- Depoimentos: Cultura Inglesa, Grupo Trigo, Lavateria, Dr. Vacinas, Bella Capri.

**Pessoas:** David Borges (fundador, Head de Tecnologia, palestrante — palestradavid.prospecta.digital), Fernanda Danilaits (Head de Estratégia), Victor Zardini (Head Comercial), Flaviana Ribeiro (Head de Marketing).

**Stack/SEO técnico:** React + Vite pré-renderizado (Vercel), GTM `GTM-KCMV9BD`, fontes DM Sans + Manrope, tema escuro (`#0d0d11`). JSON-LD rico (Organization, etc.). `robots.txt` libera explicitamente crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) e há `llms.txt` — foco claro em GEO/visibilidade em IAs. Blog em WordPress + Yoast servido em `/conteudo/`.

**Páginas pilar de SEO:** `/expansao-de-franquias`, `/como-vender-franquias`, `/crm-para-franquias`.

## Estratégia de conteúdo (blog)

- **117 posts**, média de 1072 palavras.
- Período: 2025-05-19 a 2026-11-24. **45 posts em nov/2026** — produção em massa recente focada em expansão de franquias (provável conteúdo assistido por IA para SEO/GEO).
- Virada temática: até 2025 temas genéricos de marketing digital (inbound, CTR, site, SEO); 2026 → nicho franquias (qualificação de candidato, tempo de resposta, CAC de expansão, repescagem, feiras, IA no atendimento, escolha de agência).
- Autores: David Borges (33), Fernanda Danilaits (26), Prospecta (prospectadev) (22), Nayara Maira (14), Flaviana Ribeiro (12), Victor Zardini (6), Carol Fernandes (4)
- Categorias: Franquias (54), Marketing (40), Vendas (30), Leads (27), CRM (7), SEO (7), IA (6), Business (4), Conteúdo (3), Sem categoria (3), ADS (2), redes sociais (2), KPIs (2)
- Posts por mês: 2025-05: 17, 2025-06: 5, 2025-07: 4, 2025-08: 3, 2025-09: 4, 2025-10: 2, 2025-11: 3, 2025-12: 4, 2026-01: 3, 2026-02: 3, 2026-03: 4, 2026-04: 3, 2026-05: 1, 2026-07: 3, 2026-08: 4, 2026-09: 4, 2026-10: 5, 2026-11: 45

## Estrutura desta pasta

- `paginas/` — 8 páginas institucionais em Markdown (título, meta description, headings, conteúdo, JSON-LD)
- `raw/` — HTML original das páginas institucionais
- `blog/` — 117 posts (`AAAA-MM-DD_slug.md`)
- `wp-paginas/` — páginas do WordPress (LGPD, política de privacidade, índice do blog)
- `meta/` — robots.txt, llms.txt, sitemaps, `indice.json` (metadados de tudo)

## Páginas institucionais

| Página | Título | Meta description |
|---|---|---|
| [home](paginas/home.md) | Prospecta | Marketing, CRM e expansão de franquias há 15 anos | Há 15 anos ao lado de franqueadoras: marketing, CRM e acompanhamento semanal com o time de expansão. As redes clientes venderam 1.200 franquias em 2025. |
| [metodo](paginas/metodo.md) | Método Prospecta: os 6 pilares da expansão de franquias | Atração, conversão, pós-conversão, comercial, nutrição e ativação: o método que conecta marketing e comercial até o contrato assinado. |
| [resultados](paginas/resultados.md) | Resultados: redes que vendem mais franquias com a Prospecta | 1.200 franquias vendidas pelas redes clientes em 2025 e 500 no 1º trimestre de 2026. Cases de Mercadão dos Óculos, Bella Capri, Lavateria e Milky Moo. |
| [sobre](paginas/sobre.md) | Sobre a Prospecta | 15 anos ajudando franqueadoras a expandir | Conheça a Prospecta, de São José do Rio Preto (SP): 15 anos de história, mais de uma década no franchising, com David Borges e Fernanda Danilaits. |
| [perguntas-frequentes](paginas/perguntas-frequentes.md) | Perguntas frequentes | Prospecta para franqueadoras | Como a Prospecta trabalha, como cobra, prazo de implantação, CRM, fidelidade e para quem é. |
| [expansao-de-franquias](paginas/expansao-de-franquias.md) | Expansão de franquias: marketing e CRM | Prospecta | Agência de marketing para franqueadoras: tráfego, landing pages, CRM e acompanhamento semanal com o time de expansão. As redes clientes venderam 1.200 franquias em 2025. |
| [como-vender-franquias](paginas/como-vender-franquias.md) | Como vender franquias: guia do lead ao contrato | Prospecta | Como vender franquias da sua rede: calcular a meta, atrair quem tem perfil, responder rápido, conduzir a reunião, nutrir e fechar. O caminho usado pelas redes atendidas pela Prospecta. |
| [crm-para-franquias](paginas/crm-para-franquias.md) | CRM para franquias: o funil de expansão | Prospecta | Como montar o CRM da expansão: etapas enxutas, motivos de perda, perfil separado de momento e automações. O funil que a Prospecta implanta no Cubo Suite. |

## Posts do blog (mais recente primeiro)

| Data | Título | Autor | Categorias | Palavras |
|---|---|---|---|---|
| 2026-11-24 | [Primeira resposta no WhatsApp: como medir e reduzir o tempo de atendimento ao candidato a franqueado](blog/2026-11-24_primeira-resposta-whatsapp-candidato-franqueado.md) | Fernanda Danilaits | Franquias | 838 |
| 2026-11-24 | [Faixa de investimento da franquia: como qualificar o capital do candidato antes da reunião](blog/2026-11-24_faixa-de-investimento-da-franquia.md) | Fernanda Danilaits | Franquias | 848 |
| 2026-11-23 | [Área de atuação do franqueado: como definir o território e captar quem conhece a praça](blog/2026-11-23_area-de-atuacao-do-franqueado.md) | Fernanda Danilaits | Franquias | 854 |
| 2026-11-22 | [Dezembro na franqueadora: o que preparar para janeiro começar vendendo](blog/2026-11-22_dezembro-na-franqueadora.md) | Prospecta (prospectadev) | Franquias | 1173 |
| 2026-11-22 | [Horário real do candidato: como descobrir quando o seu público atende](blog/2026-11-22_horario-real-do-candidato.md) | Prospecta (prospectadev) | Franquias | 1250 |
| 2026-11-22 | [Time interno ou agência na expansão: o que manter dentro da franqueadora e o que terceirizar](blog/2026-11-22_time-interno-ou-agencia-na-expansao.md) | Prospecta (prospectadev) | Franquias | 1110 |
| 2026-11-22 | [Taxa de conversão do funil de expansão: como medir cada etapa antes de definir a meta](blog/2026-11-22_taxa-de-conversao-do-funil-de-expansao.md) | Prospecta (prospectadev) | Franquias | 1193 |
| 2026-11-22 | [Pré-qualificação automática: o que o atendimento automático pergunta e o que fica com o consultor](blog/2026-11-22_pre-qualificacao-automatica-de-candidatos.md) | Prospecta (prospectadev) | Franquias, Leads | 1054 |
| 2026-11-22 | [Sinais de alerta na agência de expansão: quando o relatório mostra lead e esconde a venda](blog/2026-11-22_sinais-de-alerta-na-agencia-de-expansao.md) | Prospecta (prospectadev) | Franquias | 1113 |
| 2026-11-22 | [5 tentativas em 8 dias: a cadência mínima antes de dar o candidato como perdido](blog/2026-11-22_tentativas-de-contato-com-candidato.md) | Prospecta (prospectadev) | Franquias | 1203 |
| 2026-11-22 | [Sazonalidade na venda de franquias: como distribuir a meta pelos meses do ano](blog/2026-11-22_sazonalidade-na-venda-de-franquias.md) | Prospecta (prospectadev) | Franquias | 1210 |
| 2026-11-22 | [Perguntas para fazer à agência antes de contratar (e as respostas que importam)](blog/2026-11-22_perguntas-para-fazer-a-agencia-antes-de-contratar.md) | Prospecta (prospectadev) | Franquias | 1057 |
| 2026-11-22 | [Tempo de primeiro contato: como medir quanto o seu time demora para responder o candidato](blog/2026-11-22_tempo-de-primeiro-contato.md) | Prospecta (prospectadev) | Franquias | 1392 |
| 2026-11-22 | [Perguntas para qualificar candidato a franqueado, critério por critério](blog/2026-11-22_perguntas-para-qualificar-candidato-a-franqueado.md) | Prospecta (prospectadev) | Franquias, Vendas | 1137 |
| 2026-11-22 | [Planejamento comercial da expansão: o plano anual que o time de expansão consegue executar](blog/2026-11-22_planejamento-comercial-da-expansao.md) | Prospecta (prospectadev) | Franquias | 1236 |
| 2026-11-22 | [O que medir no contrato com a agência de expansão: de custo por lead a custo por franquia vendida](blog/2026-11-22_o-que-medir-no-contrato-com-a-agencia.md) | Prospecta (prospectadev) | Franquias | 1106 |
| 2026-11-22 | [Roteiro do primeiro contato com o candidato a franqueado: o que dizer para sair com a reunião marcada](blog/2026-11-22_roteiro-do-primeiro-contato-com-candidato.md) | Prospecta (prospectadev) | Franquias | 1296 |
| 2026-11-22 | [Lead qualificado na franquia: a definição que marketing e expansão precisam assinar juntos](blog/2026-11-22_lead-qualificado-na-franquia.md) | Prospecta (prospectadev) | Franquias, Leads | 1122 |
| 2026-11-22 | [Meta por consultor de expansão: como dividir o número do ano pelo time](blog/2026-11-22_meta-por-consultor-de-expansao.md) | Prospecta (prospectadev) | Franquias | 1152 |
| 2026-11-22 | [Agência, consultoria de franquias ou formatadora: quem faz o quê na expansão](blog/2026-11-22_agencia-consultoria-ou-formatadora.md) | Prospecta (prospectadev) | Franquias | 1067 |
| 2026-11-22 | [Lead de franquia fora do horário comercial: como responder à noite e no fim de semana](blog/2026-11-22_lead-de-franquia-fora-do-horario.md) | Prospecta (prospectadev) | Franquias | 1307 |
| 2026-11-22 | [Formulário de franquia que qualifica: quais campos pedir sem derrubar a conversão](blog/2026-11-22_formulario-de-qualificacao-de-candidatos.md) | Prospecta (prospectadev) | Franquias, Leads | 1099 |
| 2026-11-22 | [Meta de vendas de franquias: como a franqueadora define o número do ano e o desdobra até o lead](blog/2026-11-22_meta-de-vendas-de-franquias.md) | Prospecta (prospectadev) | Franquias | 1787 |
| 2026-11-22 | [Como escolher uma agência para franquias: os critérios que separam lead de franquia vendida](blog/2026-11-22_como-escolher-agencia-para-franquias.md) | Prospecta (prospectadev) | Franquias | 1789 |
| 2026-11-22 | [Quando automatizar o primeiro contato (e quando o consultor liga na hora)](blog/2026-11-22_automatizar-o-primeiro-contato.md) | Prospecta (prospectadev) | Franquias | 1342 |
| 2026-11-20 | [Segunda unidade do franqueado: como o relacionamento desde o lead prepara a expansão dentro da rede](blog/2026-11-20_segunda-unidade-do-franqueado.md) | Fernanda Danilaits | Franquias | 988 |
| 2026-11-20 | [Capital do candidato a franqueado: como confirmar investimento e capital de giro sem constranger](blog/2026-11-20_capital-de-giro-do-candidato-a-franqueado.md) | Fernanda Danilaits | Franquias, Vendas | 1112 |
| 2026-11-19 | [IA no atendimento ao candidato a franqueado: como medir o retorno antes de ampliar o investimento](blog/2026-11-19_retorno-da-ia-no-atendimento-de-candidatos.md) | Fernanda Danilaits | Franquias | 996 |
| 2026-11-19 | [Captação de franqueados em rede pequena: o que o Mapeamento da ABF e do Sebrae muda no plano](blog/2026-11-19_captacao-de-franqueados-rede-pequena.md) | Fernanda Danilaits | Franquias | 989 |
| 2026-11-18 | [WhatsApp na expansão de franquias: o que muda no atendimento ao candidato com a cobrança por mensagem](blog/2026-11-18_whatsapp-na-expansao-de-franquias.md) | Fernanda Danilaits | Franquias | 974 |
| 2026-11-18 | [Repasse de franquia: como captar e qualificar quem compra uma unidade já em operação](blog/2026-11-18_repasse-de-franquia-captar-candidato.md) | Fernanda Danilaits | Franquias | 1023 |
| 2026-11-17 | [Como qualificar um multifranqueado: o que a disputa entre Wendy’s e uma operadora de 314 lojas ensina](blog/2026-11-17_qualificar-multifranqueado.md) | Fernanda Danilaits | Franquias | 1013 |
| 2026-11-17 | [Microfranquia e multifranqueado: como captar cada perfil de candidato](blog/2026-11-17_captar-candidatos-microfranquia-multifranqueado.md) | Fernanda Danilaits | Franquias | 1037 |
| 2026-11-16 | [Ranking de franquias por cidade: como usar sem escolher a praça pelo retrovisor](blog/2026-11-16_ranking-de-franquias-por-cidade.md) | Fernanda Danilaits | Franquias, Vendas | 942 |
| 2026-11-13 | [Como priorizar cidades na expansão de uma franquia: o que o plano do Divino Fogão ensina](blog/2026-11-13_priorizar-cidades-expansao-franquia.md) | Fernanda Danilaits | Franquias, Vendas | 912 |
| 2026-11-13 | [Passar loja própria para franqueado: como achar e qualificar quem vai operar](blog/2026-11-13_loja-propria-para-franqueado.md) | Fernanda Danilaits | Franquias, Vendas | 989 |
| 2026-11-12 | [IA no atendimento de leads de franquia: onde ajuda e o que ainda precisa de gente](blog/2026-11-12_ia-no-atendimento-de-leads-de-franquia.md) | Fernanda Danilaits | Franquias, Leads | 984 |
| 2026-11-11 | [Da reunião à assinatura: como apresentar o padrão da rede ao candidato a franqueado](blog/2026-11-11_candidato-a-franqueado-ate-a-assinatura.md) | Fernanda Danilaits | Franquias, Vendas | 927 |
| 2026-11-11 | [Quantos leads para vender franquias? A conta da meta reversa, do contrato ao lead](blog/2026-11-11_quantos-leads-para-vender-franquias.md) | Fernanda Danilaits | Franquias, Leads | 1068 |
| 2026-11-11 | [Onboarding de franqueado: por que a venda não termina na assinatura do contrato](blog/2026-11-11_onboarding-de-franqueado.md) | Fernanda Danilaits | Franquias, Vendas | 832 |
| 2026-11-11 | [Indicadores de expansão de franquias: o que acompanhar por canal, e não só no total](blog/2026-11-11_indicadores-de-expansao-de-franquias.md) | Fernanda Danilaits | CRM, Franquias | 991 |
| 2026-11-09 | [Qualificação de candidatos a franqueado: como separar curioso de comprador antes da reunião](blog/2026-11-09_qualificar-candidato-a-franqueado.md) | Fernanda Danilaits | Franquias, Vendas | 1557 |
| 2026-11-09 | [Velocidade de resposta ao lead de franquia: por que o candidato esfria em minutos e como responder primeiro](blog/2026-11-09_velocidade-de-resposta-lead-franquia.md) | Fernanda Danilaits | Franquias, Leads | 1800 |
| 2026-11-05 | [Como criar uma estratégia de SEO além das palavras-chave](blog/2026-11-05_como-criar-uma-estrategia-de-seo-alem-das-palavras-chave.md) | Flaviana Ribeiro | SEO | 3401 |
| 2026-11-03 | [Google Search Profile: o que é, como funciona e por que sua marca precisa conhecer essa novidade?](blog/2026-11-03_google-search-profile.md) | David Borges | Marketing | 1125 |
| 2026-10-29 | [Agentes de IA: como essa tecnologia está mudando processos empresariais](blog/2026-10-29_agentes-de-ia-como-essa-tecnologia-esta-mudando-processos-empresariais.md) | David Borges | Business, IA | 1127 |
| 2026-10-27 | [Conteúdo evergreen: como criar materiais que continuam gerando resultados](blog/2026-10-27_conteudo-evergreen-como-criar-materiais-que-continuam-gerando-resultados.md) | David Borges | Conteúdo | 1843 |
| 2026-10-21 | [Objeções de vendas: como preparar o time para negociações difíceis](blog/2026-10-21_objecoes-de-vendas-como-preparar-o-time-para-negociacoes-dificeis.md) | Victor Zardini | Vendas | 1734 |
| 2026-10-13 | [Como criar uma cultura de IA dentro das empresas](blog/2026-10-13_cultura-de-ia.md) | Carol Fernandes | IA | 874 |
| 2026-10-06 | [IA preditiva x IA generativa: qual a diferença e quando usar cada uma](blog/2026-10-06_ia-preditiva-e-generativa.md) | David Borges | IA | 915 |
| 2026-09-29 | [Revenue Operations: como unir marketing, vendas e dados em uma única operação](blog/2026-09-29_revenue-operations.md) | David Borges | Marketing, Vendas | 847 |
| 2026-09-15 | [Marketing orientado a receita: como transformar ações em impacto comercial](blog/2026-09-15_marketing-orientado-a-receita.md) | Nayara Maira | Marketing | 1043 |
| 2026-09-09 | [Lead barato ou candidato qualificado: qual número deve orientar a mídia da expansão](blog/2026-09-09_lead-barato.md) | David Borges | Franquias, Leads | 1081 |
| 2026-09-02 | [Repescagem de Leads de franquia: como recuperar candidatos que pararam de responder](blog/2026-09-02_repescagem-de-leads.md) | Fernanda Danilaits | Franquias, Leads | 1066 |
| 2026-08-25 | [Como transformar leads de feiras de franquias em reuniões comerciais](blog/2026-08-25_feiras-de-franquias.md) | Victor Zardini | Franquias | 1066 |
| 2026-08-18 | [Fadiga de criativos: como saber quando um anúncio parou de funcionar?](blog/2026-08-18_fadiga-de-criativos.md) | Carol Fernandes | ADS | 1117 |
| 2026-08-12 | [Distribuição de leads: como encaminhar cada oportunidade para o vendedor certo](blog/2026-08-12_distribuica-de-leads.md) | Nayara Maira | CRM, Leads | 1169 |
| 2026-08-06 | [CAC de expansão de franquias: quanto custa conquistar um novo franqueado?](blog/2026-08-06_cac-de-expansao-de-franquias.md) | Nayara Maira | Franquias | 966 |
| 2026-07-24 | [7 formas de integrar marketing digital e IA generativa até 2026](blog/2026-07-24_7-formas-integrar-marketing-digital-ia-generativa-2026.md) | Nayara Maira | IA | 1374 |
| 2026-07-24 | [Como usar IA para prever o comportamento do cliente em vendas](blog/2026-07-24_usar-ia-para-prever-comportamento-do-cliente-em-vendas.md) | Nayara Maira | IA | 1461 |
| 2026-07-24 | [7 erros comuns ao alinhar marketing e vendas nas empresas](blog/2026-07-24_7-erros-comuns-ao-alinhar-marketing-e-vendas.md) | Nayara Maira | Marketing | 1358 |
| 2026-05-05 | [Como vender mais sem depender de desconto](blog/2026-05-05_como-vender-mais.md) | David Borges | Vendas | 1352 |
| 2026-04-29 | [Marketing e vendas conectados: como parar de perder oportunidades no meio do caminho](blog/2026-04-29_marketing-e-vendas-conectados.md) | Victor Zardini | Marketing, Vendas | 1567 |
| 2026-04-20 | [Funil de vendas moderno: o que mudou e como vender melhor sem empurrar nada](blog/2026-04-20_funil-de-vendas-moderno-o-que-mudou-e-como-vender-melhor-sem-empurrar-nada.md) | David Borges | Leads, Marketing, Vendas | 1436 |
| 2026-04-07 | [IA Generativa: qual a melhor estratégia de GEO?](blog/2026-04-07_ia-generativa-qual-a-melhor-estrategia-de-geo.md) | Flaviana Ribeiro | Conteúdo | 1212 |
| 2026-03-26 | [Planejamento de conteúdo B2B: conteúdos que convertem](blog/2026-03-26_planejamento-de-conteudo-b2b-conteudos-que-convertem.md) | David Borges | Marketing | 728 |
| 2026-03-18 | [Como evitar o sumiço de leads após proposta e como o CX pode resolver isso](blog/2026-03-18_como-evitar-o-sumico-de-leads-apos-proposta-e-como-o-cx-pode-resolver-isso.md) | David Borges | Vendas | 731 |
| 2026-03-10 | [Hiperpersonalização e automação na prática: como montar fluxos dinâmicos e vivos](blog/2026-03-10_hiperpersonalizacao-e-automacao-na-pratica-como-montar-fluxos-dinamicos-e-vivos.md) | Fernanda Danilaits | Conteúdo, Marketing | 732 |
| 2026-03-03 | [Lead scoring para franqueadoras: como pontuar candidatos por perfil e por comportamento](blog/2026-03-03_lead-scoring-2-0.md) | Flaviana Ribeiro | Franquias, Leads | 1200 |
| 2026-02-24 | [Social Selling B2B: como transformar LinkedIn, WhatsApp e conteúdo em vendas reais](blog/2026-02-24_social-selling-b2b-como-transformar-linkedin-whatsapp-e-conteudo-em-vendas-reais.md) | Nayara Maira | Vendas | 845 |
| 2026-02-20 | [O papel do CRM na retenção de clientes e no aumento do LTV](blog/2026-02-20_o-papel-do-crm-na-retencao.md) | David Borges | CRM | 707 |
| 2026-02-03 | [Dark Funnel: por que grande parte da sua jornada de vendas é invisível](blog/2026-02-03_dark-funnel-por-que-grande-parte-da-sua-jornada-de-vendas-e-invisivel.md) | Flaviana Ribeiro | Vendas | 810 |
| 2026-01-27 | [Site dinâmico ou site estático: qual é o melhor?](blog/2026-01-27_site-dinamico-ou-site-estatico-qual-e-o-melhor.md) | Fernanda Danilaits | SEO | 644 |
| 2026-01-20 | [Planejamento de Marketing 2026: as prioridades que vão definir quem cresce e quem fica para trás](blog/2026-01-20_planejamento-de-marketing-2026-as-prioridades-que-vao-definir-quem-cresce-e-quem-fica-para-tras.md) | Carol Fernandes | Marketing | 901 |
| 2026-01-13 | [Conteúdo interativo que funciona: formatos para atrair, engajar e converter](blog/2026-01-13_conteudo-interativo-que-funciona-formatos-para-atrair-engajar-e-converter.md) | Nayara Maira | redes sociais | 728 |
| 2025-12-23 | [Como criar trilha de e-mails B2B: guiando o lead até a conversão com lógica e contexto](blog/2025-12-23_como-criar-trilha-de-e-mails-b2b-guiando-o-lead-ate-a-conversao-com-logica-e-contexto.md) | Victor Zardini | Vendas | 700 |
| 2025-12-16 | [Conteúdo pós-venda B2B: como manter clientes engajados após a venda](blog/2025-12-16_conteudo-pos-venda-b2b-como-manter-clientes-engajados-apos-a-venda.md) | Nayara Maira | Vendas | 684 |
| 2025-12-09 | [Social Commerce e vendas dentro das redes: o que funciona hoje (e amanhã)](blog/2025-12-09_social-commerce-e-vendas-dentro-das-redes-o-que-funciona-hoje-e-amanha.md) | Fernanda Danilaits | Vendas | 783 |
| 2025-12-02 | [Sustentabilidade, ética e propósito: como as marcas estão ajustando seu marketing para 2026](blog/2025-12-02_sustentabilidade-etica-e-proposito.md) | Victor Zardini | Marketing | 764 |
| 2025-11-26 | [Campanhas sazonais o ano inteiro: como planejar ações além da Black Friday](blog/2025-11-26_campanhas-sazonais-o-ano-inteiro-como-planejar-acoes-alem-da-black-friday.md) | David Borges | Marketing | 725 |
| 2025-11-17 | [Chatbots & Voz: como o atendimento por IA está mudando o marketing de relacionamento](blog/2025-11-17_atendimento-ia.md) | David Borges | IA | 691 |
| 2025-11-07 | [Humanos ou algoritmos: quem você quer encantar com seu conteúdo?](blog/2025-11-07_humanos-ou-algoritmos.md) | David Borges | Marketing | 533 |
| 2025-10-31 | [Veja como planejar sua estratégia de mídia paga com previsibilidade](blog/2025-10-31_estrategia-de-midia-paga.md) | David Borges | Leads, Marketing | 920 |
| 2025-10-14 | [Como aparecer nas IAs? O novo jogo da visibilidade digital (e como se posicionar para ele)](blog/2025-10-14_como-aparecer-nas-ias.md) | Nayara Maira | SEO | 749 |
| 2025-09-30 | [Como criar um site? Veja nossas dicas para não errar na base da sua presença digital](blog/2025-09-30_como-criar-um-site.md) | Victor Zardini | Leads, Marketing, Vendas | 927 |
| 2025-09-22 | [Como aumentar o ticket médio: veja dicas!](blog/2025-09-22_como-aumentar-o-ticket-medio.md) | Carol Fernandes | Business, CRM, KPIs, Leads | 751 |
| 2025-09-08 | [Marketing para Indústrias: estratégias certeiras](blog/2025-09-08_marketing-para-industrias-estrategias-certeiras.md) | David Borges | Business, CRM, Leads, Marketing | 933 |
| 2025-09-01 | [Google AI Mode: anúncios serão permitidos](blog/2025-09-01_google-ai-mode-anuncios-serao-permitidos.md) | Fernanda Danilaits | Business, KPIs, Leads, Marketing | 718 |
| 2025-08-25 | [Inbound marketing: o que é e como funciona?](blog/2025-08-25_inbound-marketing-o-que-e.md) | Nayara Maira | Marketing, SEO | 958 |
| 2025-08-18 | [Dia internacional do blog: por que investir nesta ferramenta de marketing?](blog/2025-08-18_dia-internacional-do-blog-entenda-a-ferramenta.md) | Flaviana Ribeiro | Marketing, SEO | 834 |
| 2025-08-11 | [Check List: como aplicá-lo em franquias de alimentos](blog/2025-08-11_check-list-franquias-de-alimentos.md) | David Borges | Franquias, Marketing | 993 |
| 2025-07-28 | [Marketing digital: vantagens, como fazer, estratégias, exemplos de sucesso](blog/2025-07-28_vantagens-do-marketing-digital-e-como-fazer.md) | David Borges | CRM, Leads, Marketing, Vendas | 1083 |
| 2025-07-21 | [Conquiste mais leads com o Marketing de Conteúdo para franquias](blog/2025-07-21_marketing-de-conteudo-para-franquias.md) | Nayara Maira | Franquias, Leads, Marketing | 862 |
| 2025-07-14 | [Utilize as ferramentas certas para gerar leads](blog/2025-07-14_gerar-leads-conheca-ferramentas.md) | Nayara Maira | Leads, Marketing | 1351 |
| 2025-07-07 | [Passo a passo para a geração de leads com o Google Ads](blog/2025-07-07_geracao-de-leads-google-ads.md) | David Borges | Leads, Marketing, Vendas | 1209 |
| 2025-06-30 | [Como montar a jornada do consumidor da sua empresa?](blog/2025-06-30_jornada-do-consumidor-como-montar.md) | David Borges | Leads, Marketing, Vendas | 948 |
| 2025-06-23 | [Saiba o que é um funil de vendas de forma descomplicada](blog/2025-06-23_o-que-e-um-funil-de-vendas.md) | David Borges | Marketing | 908 |
| 2025-06-16 | [Estrategista digital: por que um atendimento estratégico vale ouro atualmente?](blog/2025-06-16_estrategista-digital-entenda-o-que-e.md) | Flaviana Ribeiro | CRM, Leads, Marketing, SEO | 789 |
| 2025-06-09 | [O que significa CTR? Descubra e domine o Google](blog/2025-06-09_o-que-significa-ctr.md) | David Borges | Marketing | 1053 |
| 2025-06-02 | [Economia da atenção: o que tem a ver com marketing?](blog/2025-06-02_economia-da-atencao.md) | David Borges | Marketing, Sem categoria | 1018 |
| 2025-05-26 | [Marketing de conteúdo: conheça 4 vantagens dessa estratégia para a sua indústria](blog/2025-05-26_marketing-de-conteudo-conheca-4-vantagens-2.md) | Nayara Maira | Marketing | 875 |
| 2025-05-19 | [Vendarketing: conceitos e benefícios para o seu negócio](blog/2025-05-19_vendarketing-conceitos-e-beneficios.md) | David Borges | Leads, Marketing, Vendas | 1634 |
| 2025-05-19 | [Aprenda a diferença entre Inbound e Outbound Marketing](blog/2025-05-19_inbound-e-outbound-marketing-entenda.md) | Flaviana Ribeiro | Marketing | 1523 |
| 2025-05-19 | [5 motivos pelos quais sua empresa deve ter um site](blog/2025-05-19_motivos-para-fazer-um-site-empresa.md) | David Borges | Marketing, SEO, Vendas | 747 |
| 2025-05-19 | [Como utilizar o Facebook a favor da sua franquia](blog/2025-05-19_facebook-franquia-como-usar.md) | David Borges | Franquias, Marketing | 861 |
| 2025-05-19 | [Melhore seu processo de vendas criando uma buyer persona](blog/2025-05-19_melhore-seu-processo-de-vendas.md) | David Borges | Marketing, Vendas | 903 |
| 2025-05-19 | [Veja a relação entre jornada do cliente e customer success](blog/2025-05-19_jornada-do-cliente-e-customer-success-2.md) | Flaviana Ribeiro | Sem categoria | 826 |
| 2025-05-19 | [5 dicas para otimizar seu site e atrair franqueados](blog/2025-05-19_como-atrair-franqueados-pelo-site.md) | David Borges | Franquias, Leads, Marketing | 780 |
| 2025-05-19 | [Veja novos modelos de captura de lead e nutrição de lead](blog/2025-05-19_captura-de-lead-veja-modelos-2-2.md) | David Borges | Leads, Marketing | 1194 |
| 2025-05-19 | [12 dicas valiosas de finanças para franquias](blog/2025-05-19_financas-para-franquias.md) | David Borges | Franquias, Marketing, Vendas | 571 |
| 2025-05-19 | [A importância da inovação para o sucesso da sua indústria](blog/2025-05-19_inovacao-industria-importancia-2.md) | David Borges | Leads, Marketing, Vendas | 593 |
| 2025-05-19 | [Plano de conteúdo: veja como é importante na sua estratégia](blog/2025-05-19_plano-de-conteudo-veja-como-e-importante-na-sua-estrategia.md) | Flaviana Ribeiro | Sem categoria | 1791 |
| 2025-05-19 | [Dicas para criar uma campanha eficiente com Inbound Marketing](blog/2025-05-19_dicas-para-criar-uma-campanha-eficiente-inbound-marketing.md) | Flaviana Ribeiro | Marketing | 1124 |
| 2025-05-19 | [Conheça 5 ideias de marketing para vendas](blog/2025-05-19_ideias-de-marketing-para-vendas.md) | Flaviana Ribeiro | Marketing, Vendas | 803 |
| 2025-05-19 | [Aprenda como internacionalizar sua franquia](blog/2025-05-19_internacionalizar-sua-franquia-descubra-como.md) | David Borges | Franquias | 655 |
| 2025-05-19 | [Saiba como gerar leads para a sua empresa com o Facebook Ads](blog/2025-05-19_saiba-como-gerar-leads-para-a-sua-empresa-com-o-facebook-ads.md) | David Borges | ADS, redes sociais, Vendas | 1862 |
| 2025-05-19 | [Webinar: o que é e como gerar leads por meio dele](blog/2025-05-19_webinar-o-que-e-e-com-gerar-leads.md) | Flaviana Ribeiro | Leads | 864 |
