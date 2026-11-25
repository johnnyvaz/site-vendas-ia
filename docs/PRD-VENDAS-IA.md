# PRD — Vendas IA (Mel + Johnny)

> Versão 0.1 · 25/11/2026 · nível de ideia, para alinhar os sócios e colocar o site no ar hoje.
> Base: [Ladder Sale: Metodologia e Esteira](ladder-sale-metodologia-e-esteira.md) (Mel) + tecnologia que o Johnny já tem (Gêmeo Digital, Sextante, Geniaria).
> Pontos em aberto marcados com **[decidir]** e reunidos na seção 10.
>
> **Decidido em 25/11/2026:** marca = **Vendas IA**; site **sem preço**; primeira apresentação para **grandes empresas cautelosas** (tom sóbrio, governança e LGPD em destaque, piloto antes da escala); contato = WhatsApp da Melissa (+55 16 99966-6080). O Raio-X gratuito saiu da v1 do site — a chamada é "Agendar uma conversa".

## 1. A ideia em uma frase

**Método de vendas da Mel + tecnologia do Johnny = pequenas empresas e comércios vendendo na internet com processo, um degrau por vez, com IA fazendo o trabalho repetitivo.**

A Mel traz *o que fazer* (a Escada de Vendas, 6 degraus). O Johnny traz *a máquina que faz e mede* (gêmeo digital do negócio, site que aparece no Google e nas IAs, telemetria, agentes de IA, plataforma de cursos).

## 2. Problema

- Pequena empresa vende "no improviso": não sabe onde a venda trava, não mede CAC/LTV, não tem cadência de follow-up.
- Compra ferramenta (CRM, disparo, anúncio) antes de ter processo — e a ferramenta vira custo.
- Consultoria de vendas tradicional entrega diagnóstico e PDF; a execução morre depois.
- Agência de tráfego entrega lead, não venda (mesma crítica que a Prospecta usa).
- Ferramentas de "IA para vendas" vendem tecnologia sem método.

## 3. Para quem

| Segmento | Exemplo | Porta de entrada provável |
|---|---|---|
| Comércio e serviço local (B2C) | loja, clínica, escola, restaurante | Raio-X gratuito, Workshop, Acompanhamento |
| Pequena empresa B2B | indústria pequena, software, serviços para empresas | Diagnóstico → Escada Completa |
| Grupos (Sebrae, associações, CDL) | turmas de empresários | Workshop IA no Comercial |
| Empresa com time de vendas | 3+ vendedores | Time Comercial com IA |

Foco inicial (regra do foco da própria Mel: 1 cliente, 1 região, 1 produto, 1 canal): **[decidir]** — sugestão: pequenas empresas da região da Mel + turmas via Sebrae.

## 4. Proposta de valor

> "Método que funciona + tecnologia que executa. Você sobe um degrau por vez e vê o número mudar."

Diferenciais:
1. **Método antes da ferramenta** — a tecnologia entra só no degrau em que faz sentido.
2. **Tudo medido** — o gêmeo digital mostra CAC, LTV, funil e gargalo com número rastreável, não opinião.
3. **IA prepara, pessoa decide** — regra de ouro da Mel; a máquina cuida da cadência, o humano do relacionamento.
4. **Aparece no Google e nas IAs** — site e conteúdo com SEO/GEO (o que concorrentes como Prospecta já fazem para franquias).

## 5. Como funciona — degrau × tecnologia

| Degrau (Mel) | O que a Mel faz | O que a tecnologia faz (Johnny) | Ferramenta |
|---|---|---|---|
| **1. Diagnosticar** | Entrevista, acha o gargalo, plano de 90 dias | Raio-X automático com IA; monta o **gêmeo digital** do cliente (canon com funil, CAC, LTV, payback, churn); calcula os números da máquina | Gêmeo Digital (`/montar-gemeo`, `calc`) |
| **2. Conhecer o cliente** | Cliente ideal, mapa da dor, entrevistas | Pesquisa de mercado e concorrentes, roteiro e resumo de entrevistas; perfil cognitivo do cliente/time | Gêmeo (dimensões do negócio), Análise Cognitiva |
| **3. Construir a oferta** | Proposta de valor, posicionamento, materiais | Rascunho de oferta, páginas de venda, conteúdo em escala | Agentes de conteúdo, site |
| **4. Atrair e prospectar** | Escolhe canal, cadência, primeiro contato | Site/landing com SEO/GEO, telemetria instalada, monitor semanal (Google, Bing, GA4, robôs de IA); listas e mensagens personalizadas de WhatsApp | **Sextante** (instalador + monitor), kit SEO/GEO |
| **5. Converter** | Funil, BANT/SPIN, roteiro, pipeline | Agente de IA no WhatsApp para primeira resposta e qualificação; CRM/pipeline; automações (n8n) | Agente de IA para vendas, n8n |
| **6. Reter e crescer** | Pós-venda, playbook, rotina | Alerta de cliente em risco, painel de métricas, briefing semanal, oráculo ("e se subir o preço?") | Gêmeo (`/painel`, `/briefing`, `/oraculo`) |
| **Corrimão (educação)** | Aulas, mentoria | Trilhas, turmas, certificado, comunidade | **Geniaria** (plataforma de cursos) |

**O fio que liga tudo:** o gêmeo digital de cada cliente. Ele nasce no Diagnóstico e é atualizado a cada degrau — é o "prontuário" do negócio e a prova de evolução.

## 6. Esteira de produtos (versão sócios)

Mesma esteira da Mel, com a camada de tecnologia de cada nível:

| Nível | Produto | Mel entrega | Tecnologia entrega | Preço |
|---|---|---|---|---|
| 0. Isca | Raio-X Comercial com IA | — | Questionário no site + devolutiva gerada por IA + convite para conversa | Gratuito |
| 1. Entrada | Diagnóstico Ladder | Conversa e plano de 90 dias | Gêmeo digital inicial + relatório com números da máquina | [decidir] |
| 2. Workshop | IA no Comercial | Condução da turma | Kit de comandos, trilha na Geniaria | [decidir] |
| 3. Principal | Escada Completa | Mentoria por degrau | Gêmeo atualizado por degrau, site/landing, agente WhatsApp, telemetria | [decidir] |
| 4. Recorrente | Acompanhamento | Encontro mensal | Painel + briefing semanal + monitor Sextante | Assinatura [decidir] |
| 5. Completo | Time Comercial com IA | Papéis, playbook, comissão | CRM, automações, agentes, treinamento na plataforma | Projeto [decidir] |

Possível produto só-tecnologia (sem consultoria), para escala: **"Máquina Vendas IA"** — site + telemetria + agente WhatsApp + painel mensal. **[decidir]** se entra agora ou depois.

## 7. Papéis dos sócios

| | Mel | Johnny |
|---|---|---|
| Foco | Método, diagnóstico, mentoria, relacionamento com cliente | Tecnologia, produto, site, automação, dados |
| Dono de | Escada de Vendas, conteúdo das aulas, Sebrae/editais | Gêmeo, Sextante, Geniaria, agentes, infraestrutura |
| Vende | Diagnóstico, Escada, Workshop | Implantação técnica, Máquina Vendas IA |

Divisão societária, de receita e de custos: **[decidir]** (fora deste PRD).

## 8. O site (o que vai ao ar hoje)

Domínio: **vendas.ia.br** (hoje um guia de "IA para vendas" com aviso de domínio à venda → vira o site do negócio; o aviso sai).

### Objetivo do site
1. Explicar o negócio em 10 segundos.
2. Capturar contato pelo **Raio-X gratuito** (CTA principal) e pelo WhatsApp.
3. Manter e ampliar o tráfego orgânico do guia atual (não quebrar URLs).

### Páginas v1 (hoje)

| Página | Conteúdo | Estado |
|---|---|---|
| `/` Home | Promessa, problema, Escada de 6 degraus, como a tecnologia ajuda, esteira resumida, quem somos (Mel + Johnny), CTA Raio-X | nova |
| `/metodo` | Os 6 degraus + chão e corrimão + regra do foco + regra de ouro da IA | nova |
| `/solucoes` (ou âncora na home) | Esteira de produtos, sem preço ("valores após o diagnóstico") | nova |
| `/raio-x` | Formulário curto (nome, WhatsApp, segmento, 5–8 perguntas) → lead | nova (v1 pode ser só formulário; devolutiva por IA na v2) |
| `/ia-para-vendas` | Guia atual (hoje na home) | mover, com redirect 301 |
| `/agente-de-ia-para-vendas` | Página atual do agente | manter |
| `/politica-privacidade` | — | manter |

### Regras herdadas
- Títulos em forma de pergunta onde for conteúdo de guia (Google e IAs citam).
- Texto em HTML pré-renderizado (robôs leem); `llms.txt` e `robots.txt` liberando robôs de IA (como faz a Prospecta).
- Sem promessa de resultado numérico.
- Telemetria do Sextante instalada.

### Fora da v1
Blog, área do cliente, painel do gêmeo online, devolutiva automática do Raio-X, checkout.

## 9. Aprendizados dos concorrentes pesquisados

Detalhes em [`pesquisas/`](pesquisas/).

| | Prospecta | Funil de Vendas | O que copiar / evitar |
|---|---|---|---|
| Nicho | Só franqueadoras | PME geral + educação + franquia | Ter um foco claro (regra do foco) |
| CTA | Diagnóstico gratuito 45 min | Teste do CRM via chatbot → vendedor | Raio-X gratuito como porta única |
| Preço | Só após diagnóstico | Público (R$ 350–1.350/mês CRM) | Decidir **[decidir]** |
| IA | Chatbot + agentes no CRM próprio | "CRM com IA" só no rótulo | Mostrar IA de verdade, com exemplo |
| SEO/GEO | `llms.txt`, robôs de IA liberados, 117 posts | Blog parado, posts reescritos para IA | Fazer desde o dia 1 |
| Prova | Números grandes + logos | Números grandes, inconsistentes | Começar com casos reais da Mel, sem inflar |

## 10. Dúvidas para os sócios decidirem

**Para o site de hoje:**
- [ ] **Marca:** "Vendas IA" (domínio) ou "Ladder Sale" (nome do método da Mel)? Sugestão: marca = Vendas IA, método = Escada de Vendas / Ladder Sale.
- [ ] Frase principal da home.
- [ ] Foto e mini-bio da Mel (e quais clientes/casos dela podem aparecer).
- [ ] WhatsApp e e-mail de contato do negócio.
- [ ] Para onde vai o lead do Raio-X: WhatsApp da Mel, planilha, CRM, Geniaria?
- [ ] Mostrar preços no site ou "após diagnóstico"?
- [ ] Os botões atuais de "mentoria da Geniaria" continuam ou viram "Raio-X"?

**Para o negócio (pode esperar):**
- [ ] Foco inicial: segmento e região.
- [ ] Preço e formato de cada produto (lista da Mel no doc da metodologia).
- [ ] Produto só-tecnologia (Máquina Vendas IA) entra agora?
- [ ] Qual CRM/WhatsApp recomendar e operar.
- [ ] Gêmeo digital do cliente: fica com a gente (serviço) ou o cliente recebe acesso?
- [ ] LGPD: dados do cliente no gêmeo — contrato e suboperadores.
- [ ] Divisão societária e de receita.
