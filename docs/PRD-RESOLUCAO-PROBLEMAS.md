# Empresa Lean Quality
# PRD — Plataforma de Resolução de Problemas (MASP + 8D + A3)

**Produto:** Plataforma Web — Resolução de Problemas Multimetodologia (MASP, 8D e A3)

**Responsável:** Lean Quality — Consultoria, Educação e Editora LTDA

**Versão:** 1.0

**Data:** Novembro/2025

---

## 1. Visão Geral do Produto

### Propósito

Unificar em uma única plataforma SaaS a aplicação prática e colaborativa das metodologias MASP, Global 8D e Relatório A3, oferecendo um fluxo guiado por etapas, ferramentas de qualidade integradas, rastreabilidade de evidências e relatórios gerenciais. O sistema permitirá escolher a metodologia mais adequada a cada problema, mantendo dados e artefatos compartilháveis entre métodos.

---

## 2. Objetivos Estratégicos

- Digitalizar MASP, 8D e A3 em um produto escalável (SaaS).
- Padronizar a execução e elevar a qualidade da análise de causas.
- Reduzir tempo de resolução em até 40% com automação e templates.
- Oferecer relatórios específicos por metodologia e indicadores consolidados.
- Habilitar mentoria/colaboração e certificação Lean Quality integrada.

---

## 3. Público‑Alvo (Personas)

- Gestor de Qualidade: precisa padronizar a resolução e reportar resultados.
- Mentor/Consultor Lean: acompanha múltiplos times, projetos e evidências.
- Aluno/Participante: aprende e pratica as metodologias de forma guiada.

---

## 4. Proposta de Valor Multimetodologia

- Um único workspace para MASP, 8D e A3.
- Reuso de artefatos (5W2H, Ishikawa, 5 Porquês, fluxogramas, Pareto).
- Motor de workflow parametrizável que reflete cada método e suas etapas.
- Relatórios nativos: D0–D8 (8D), 8 etapas (MASP) e canvas A3 visual.
- Rastreabilidade ponta a ponta: problema → causas → ações → resultados.

---

## 5. Funcionalidades Principais

- Seleção de Metodologia e Templates
  - Criar projeto escolhendo MASP, 8D ou A3, com exemplos e boas práticas.
- Motor de Workflow Parametrizável
  - MASP (8 etapas), 8D (D0–D8) e A3 (7 seções) como configurações de etapas.
- Ferramentas Integradas
  - 5W2H, Ishikawa (6M/6M+Ts), 5 Porquês, Fluxograma, Pareto, Checklists PDCA.
- Gestão de Ações (5W2H)
  - Planejamento com responsáveis, prazos, custos, status e anexos.
- Evidências e Rastreabilidade
  - Upload, versionamento, vínculo de evidências a causas e etapas.
- Relatórios e Exportações
  - Relatório MASP, Relatório 8D e Relatório A3 (PDF/CSV/XLSX), Power BI.
- Colaboração e Mentoria
  - Comentários por etapa, menções, trilhas de aprovação e visão do mentor.
- Notificações e Alertas
  - SLA por etapa, prazos e pendências de validação.

---

## 6. Funcionalidades Avançadas (Pro)

- IA Lean Quality Assistant
  - Sugestões de causas/ações; análise GUT/Pareto assistida; revisão de coerência.
- Conversor entre Metodologias
  - Portar um caso entre MASP ↔ 8D ↔ A3 mantendo artefatos comuns (5W2H, Ishikawa, 5 Porquês) e mapeando etapas correspondentes.
- Biblioteca de Casos e Reuso
  - Templates organizacionais, casos de referência e comparação antes/depois.
- Integração BI e Gamificação
  - Indicadores consolidados, ranking, selos e jornada de aprendizado.

---

## 7. Arquitetura e Tecnologia

- Front‑end: React.js + TailwindCSS (wizard por método + canvas A3)
- Back‑end: Node.js + Express (API REST)
- Banco: PostgreSQL/MongoDB (projetos, etapas, artefatos, ações, evidências)
- Autenticação: OAuth2.0/SSO, JWT
- Infra: AWS/Azure, multi‑tenant, logs e auditoria
- Módulos: Workflow/Rules Engine; Editor Ishikawa (drag & drop); Canvas A3; Relatórios PDF; Conectores BI

---

## 8. Design e UX

- Wizards por Metodologia
  - MASP: 8 etapas com cores e checklists PDCA.
  - 8D: timeline D0–D8 com marcos de aprovação.
  - A3: canvas visual em uma página (seções PDCA) com impressão fiel.
- Biblioteca de Ferramentas
  - Componentes reutilizáveis (5W2H, Ishikawa, 5 Porquês, Pareto, Fluxo).
- Acessibilidade e Responsividade
  - Layout responsivo, atalhos de teclado e leitura clara de relatórios.

---

## 9. Métricas de Sucesso (KPIs)

- Conclusão de projetos (MASP/8D/A3)
- Redução do tempo médio de resolução
- % eficácia das ações (antes/depois)
- Engajamento (comentários, anexos, revisões)
- NPS e renovação (SaaS)

---

## 10. Roadmap de Desenvolvimento

- Fase 1 — MVP (0–3 meses)
  - Autenticação, criação de projetos, MASP completo, 5W2H, relatório PDF.
- Fase 2 — 8D (3–5 meses)
  - Workflow D0–D8, relatório 8D, ações de contenção, validação de eficácia.
- Fase 3 — A3 (5–7 meses)
  - Canvas A3, impressão A3, indicadores por seção, exportações.
- Fase 4 — Pro (7–10 meses)
  - IA Assistant, Pareto automático, conversor entre metodologias, BI, gamificação.

---

## 11. Segurança e LGPD

- Criptografia de dados sensíveis (AES‑256) e TLS em trânsito.
- Perfis e escopos por organização, projetos e papéis.
- Trilhas de auditoria, retenção e consentimento LGPD.

---

## 12. Modelo de Negócio

- Freemium: 1 projeto ativo, ferramentas básicas.
- Profissional: projetos ilimitados, relatórios e certificação.
- Corporativo: multiusuário, BI, integrações e governança.

---

## 13. Anexo — Mapeamento Entre Metodologias

- Problema e Contexto
  - MASP: Identificação/Observação
  - 8D: D0 (constatação) e D2 (descrição)
  - A3: Contexto/Definição e Situação Atual
- Análise de Causas
  - MASP: Análise (Ishikawa, 5 Porquês, Pareto)
  - 8D: D4 (causa raiz)
  - A3: Análise da Causa Raiz
- Ações e Implementação
  - MASP: Plano de Ação → Ação → Verificação
  - 8D: D3 (contenção), D5 (corretivas), D6 (eficácia)
  - A3: Propostas de Melhoria → Plano de Ação
- Padronização/Prevenção e Encerramento
  - MASP: Padronização e Conclusão
  - 8D: D7 (preventivas) e D8 (encerramento)
  - A3: Acompanhamento e Indicadores

---

### Referências

- MASP/PRD.md
- 8D/Apostila_Metodologia_8D.md
- A3/Apostila_Ferramenta_A3.md

