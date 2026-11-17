# vendas.ia.br — textos do site (sem design)

> Fonte de copy para gerar um visual novo. Os textos são os mesmos que estão no código em 17/11/2026
> (`src/pages/GuiaIAVendas.tsx`, `src/pages/AgenteIAVendas.tsx`, `src/conteudo/faq.ts`, `src/components/guia/LayoutGuia.tsx`).
> Se um texto mudar aqui, mudar lá também.

## Regras que o visual novo não pode quebrar

- Os títulos das seções são **perguntas** (é o formato que o Google e as IAs citam). Pode mudar o estilo, não a frase.
- O parágrafo de resposta direta logo abaixo do H1 fica **no topo**, visível sem rolar.
- Sem promessa de resultado ("dobre suas vendas", "+300%"): o guia não promete isso.
- A caixa "O que nunca colar na IA" é o alerta da página: precisa se destacar.
- Todo botão de mentoria leva para o link com UTM abaixo. Só muda o último valor (`utm_content`), conforme a posição.
- O aviso "domínio à venda" fica discreto, no rodapé.
- Conteúdo precisa sair em HTML (não só em imagem nem só em JavaScript): robôs de busca e de IA leem o texto.

### Links

| Nome | URL |
|---|---|
| Mentoria (menu) | `https://geniaria.com.br/mentoria?utm_source=vendasia&utm_medium=referral&utm_campaign=ia-para-vendas&utm_content=menu` |
| Mentoria (meio do guia) | `…&utm_content=guia-meio` |
| Mentoria (fim do guia) | `…&utm_content=guia-fim` |
| Mentoria (meio da página do agente) | `…&utm_content=agente-meio` |
| Mentoria (fim da página do agente) | `…&utm_content=agente-fim` |
| Mentoria (rodapé) | `…&utm_content=rodape` |
| Autor | `https://johnnyvaz.com.br/` |
| Página do agente | `/agente-de-ia-para-vendas` |
| Domínio à venda | `/dominio-a-venda` |
| Proposta pelo domínio | `mailto:contato@johnnyvaz.com.br?subject=Proposta para o domínio vendas.ia.br` |
| Política de privacidade | `/politica-privacidade` |

---

## Elementos comuns (todas as páginas)

**Marca:** vendas.ia.br

**Menu:** IA para vendas · Agente de IA para vendas · Mentoria de IA (botão)

**Link de acessibilidade:** Pular para o conteúdo

**Rodapé**
- Guia escrito por Johnny Vaz. Engenheiro de software e especialista em inteligência artificial, fundador da Geniaria.
- Quer treinar o time comercial com acompanhamento? Conheça a mentoria de IA da Geniaria.
- Links: IA para vendas: o guia · Agente de IA para vendas · Política de privacidade
- Aviso discreto: **Este domínio está à venda. Propostas: contato@johnnyvaz.com.br · detalhes**

**Bloco de chamada para a mentoria (componente reutilizado)**
- Título: varia por posição (abaixo)
- Texto: varia por posição (abaixo)
- Botão: **Conhecer a mentoria de IA**
- Nota pequena: A mentoria de IA da Geniaria é conduzida por Johnny Vaz: turma com data marcada, mentoria em grupo ou consultoria individual, sem programar.

---

## Página 1 — Home `/` (guia pilar)

**SEO**
- Title: IA para vendas: como usar no dia a dia do time comercial · vendas.ia.br
- Description: Guia prático de IA para vendas: prospecção, roteiro de abordagem, follow-up e CRM com ChatGPT, Claude ou Gemini — e o que nunca colar na IA (LGPD). Sem promessa mágica.

### Primeira dobra

- Rótulo: **Guia prático**
- H1: **IA para vendas: como usar no dia a dia do time comercial**
- Resposta direta: Usar IA em vendas é entregar a um assistente — ChatGPT, Claude, Gemini ou Copilot — as tarefas de texto e organização do time comercial: pesquisar a empresa antes do contato, rascunhar a abordagem, escrever o follow-up, resumir a reunião e preencher o CRM. A decisão e a conversa continuam com o vendedor, e uma pessoa confere tudo antes de chegar ao cliente.
- Linha do autor: Por Johnny Vaz · atualizado em 17 de novembro de 2026
- Botões sugeridos para a dobra (opcionais): **Ler o guia** (âncora para o sumário) · **Conhecer a mentoria** (link `guia-topo`)

### Sumário — "Neste guia"
1. O que a IA faz bem em vendas — e o que não faz?
2. Como usar IA na prospecção?
3. Como montar um roteiro de abordagem com IA?
4. Como escrever follow-up com IA sem soar robô?
5. Como usar IA junto com o CRM?
6. O que nunca colar na IA?
7. Como conferir o que a IA escreveu?
8. Por onde o time começa?
9. Perguntas frequentes

### Abertura
Este guia não promete dobrar vendas. Promete uma coisa menor e mais útil: mostrar onde a IA economiza tempo de verdade no trabalho comercial, com modelos de pedido prontos para copiar, e onde ela cria risco — principalmente com dados de clientes.

### 1. O que a IA faz bem em vendas — e o que não faz?
A IA generativa é boa em **linguagem**: ler, resumir, reescrever, sugerir perguntas, organizar texto solto em campos. É fraca em **fato**: ela pode inventar um cargo, um número ou uma notícia com a mesma segurança com que acerta. A regra prática sai daí — a IA rascunha, a pessoa confere e decide.

Tabela:

| Tarefa | A IA ajuda em | Fica com o vendedor |
|---|---|---|
| Prospecção | Organizar o que é público sobre a empresa e levantar hipóteses de dor | Confirmar cada fato na fonte e escolher quem abordar |
| Abordagem | Rascunhar mensagem e perguntas de descoberta | Ajustar o tom e decidir o que perguntar de fato |
| Follow-up | Escrever a partir das suas anotações da conversa | Garantir que nada prometido saiu diferente |
| Reunião | Resumir anotações em próximos passos | Negociar, assumir compromisso, dar preço |
| CRM | Transformar texto solto em campos padronizados | Revisar antes de salvar e decidir o estágio do negócio |

### 2. Como usar IA na prospecção?
Use a IA para **organizar** o que você já encontrou sobre a empresa, não para descobrir fatos sozinha. Copie trechos do site da empresa, de uma notícia ou da descrição de uma vaga aberta, cole no assistente e peça hipóteses. Assim a resposta fica presa ao material que você trouxe, e cada afirmação tem de onde ter saído.

**Modelo de pedido · pesquisa de conta** (bloco copiável)
```
Sou vendedor de [o que você vende] para [tipo de empresa].
Abaixo estão trechos públicos sobre a empresa [nome]: site, notícia e vaga aberta.

[cole os trechos aqui]

Com base SÓ nesse material:
1. Resuma o que a empresa faz em 3 linhas.
2. Liste 3 hipóteses de problema que [o que você vende] poderia resolver,
   citando o trecho que sustenta cada uma.
3. Diga o que NÃO dá para saber por esse material.
```

O item 3 é o mais importante: ele obriga a IA a separar o que leu do que está supondo. Hipótese não é fato — vira pergunta na primeira conversa, nunca afirmação na mensagem.

### 3. Como montar um roteiro de abordagem com IA?
Peça um rascunho curto, com uma pergunta no fim, e dê à IA o contexto que ela não tem: quem é a pessoa, por que você escolheu essa empresa e o que você quer como próximo passo. Mensagem genérica nasce de pedido genérico.

**Modelo de pedido · primeira mensagem** (bloco copiável)
```
Escreva uma primeira mensagem de LinkedIn para [cargo] da [empresa].
Motivo do contato: [a hipótese que você confirmou na pesquisa].
O que eu ofereço: [uma frase].
Próximo passo que eu quero: [conversa de 15 minutos / enviar material].

Regras: até 60 palavras, sem elogio genérico, sem promessa de resultado,
termine com UMA pergunta fácil de responder. Escreva 3 versões
com tons diferentes: direta, curiosa e consultiva.
```

Pedir três versões ajuda a escolher, e escolher é trabalho do vendedor. Depois de enviar, anote qual teve resposta — em poucas semanas o time tem um padrão próprio, melhor que qualquer modelo pronto.

A IA também ajuda a preparar a **conversa**, não só a mensagem: peça a ela as dez objeções mais prováveis para o seu produto e treine as respostas em voz alta, com a IA fazendo o papel do cliente.

> **Chamada para a mentoria (`guia-meio`)**
> Título: Quer treinar o time inteiro nisso, com acompanhamento?
> Texto: Ler o guia resolve o primeiro passo. A mentoria de IA da Geniaria acompanha quem vende enquanto aplica a IA no próprio trabalho — com método, conferência e cuidado com os dados dos clientes.

### 4. Como escrever follow-up com IA sem soar robô?
O follow-up soa robótico quando a IA não sabe o que aconteceu na conversa. A saída é dar a ela as suas anotações — em tópicos, do jeito que você escreveu — e pedir que ela só organize, sem acrescentar nada.

**Modelo de pedido · follow-up de reunião** (bloco copiável)
```
Minhas anotações da reunião com [cargo] da [empresa], sem dados pessoais:

[cole suas anotações]

Escreva um e-mail de follow-up que:
- agradeça em uma linha, sem exagero;
- liste o que combinamos e o próximo passo com data;
- use as palavras que o cliente usou para descrever o problema;
- não acrescente nada que não esteja nas anotações.
```

A última linha do pedido evita o defeito mais comum: a IA "melhorar" o que foi combinado, prometendo prazo ou condição que ninguém ofereceu.

### 5. Como usar IA junto com o CRM?
O ganho mais rápido é no preenchimento. Vendedor odeia preencher CRM, e a IA transforma anotação solta em campo padronizado: dor principal, quem decide, orçamento citado, prazo, próximo passo. Você revisa e cola.

- **Resumo de reunião em campos:** peça a saída no formato exato dos campos do seu CRM.
- **Próximo passo claro:** peça que a IA aponte o que ficou sem data ou sem dono nas anotações.
- **Revisão do funil:** com a lista de negócios sem nome de pessoa, peça os que estão parados há mais tempo e uma pergunta para destravar cada um.

Muitos CRMs já trazem IA embutida. Ela costuma ser a opção mais segura para dados de clientes, porque fica dentro do contrato que a empresa já tem com o fornecedor — confira com quem cuida dos dados antes de ligar.

### 6. O que nunca colar na IA?
**Caixa de alerta (destaque da página)**
> **Regra de bolso:** se o texto identifica uma pessoa ou revela uma condição comercial negociada, ele não vai para um assistente de IA de uso pessoal.
> - Nome completo, CPF, telefone, e-mail ou endereço de cliente;
> - Exportação da base de leads ou da carteira, mesmo "só para analisar";
> - Contrato, proposta assinada, preço ou desconto negociado com um cliente;
> - Print de conversa de WhatsApp com cliente;
> - Senha, token ou acesso de qualquer sistema.

A LGPD trata nome, telefone e e-mail de cliente como dado pessoal, e a empresa responde pelo que compartilha com terceiros — e o fornecedor de IA é um terceiro. Três cuidados resolvem quase tudo:

1. **Troque o nome por um papel:** "a diretora financeira de uma distribuidora em Ribeirão Preto" rende o mesmo rascunho que o nome dela.
2. **Use a conta da empresa**, com a opção de usar seus dados para treinar o modelo desligada, em vez da conta pessoal do vendedor.
3. **Escreva a regra do time** em meia página: o que pode, o que não pode e em qual ferramenta. Regra que só existe na cabeça do gestor não protege ninguém.

Nota pequena: Este guia orienta o uso no dia a dia e não substitui a análise jurídica da sua empresa.

### 7. Como conferir o que a IA escreveu?
Antes de qualquer texto feito com IA chegar ao cliente, passe por cinco perguntas. Leva menos de um minuto e pega quase todo erro que importa.

1. **Fatos:** cada nome, cargo, número e data está na minha fonte?
2. **Promessa:** o texto promete prazo, resultado ou condição que eu não ofereci?
3. **Tom:** eu falaria assim com essa pessoa, olhando para ela?
4. **Pedido:** está claro qual é o próximo passo e quem faz?
5. **Dado:** sobrou alguma informação de outro cliente no texto?

### 8. Por onde o time começa?
Comece por **uma** tarefa, não por uma ferramenta. Escolha a mais repetitiva da semana — quase sempre é o follow-up ou o preenchimento do CRM — e faça assim:

1. Anote quanto tempo a tarefa leva hoje, sem IA.
2. Escreva um modelo de pedido para ela, como os deste guia, e salve onde o time acha.
3. Use por duas semanas, sempre com a conferência das cinco perguntas.
4. Compare o tempo e a qualidade. Se ganhou, passe para a próxima tarefa.

Só depois que o processo está escrito e funcionando com o assistente faz sentido pensar em automatizar com um agente. Entenda a diferença em **agente de IA para vendas: o que é e quando vale** (link para `/agente-de-ia-para-vendas`).

> **Chamada para a mentoria (`guia-fim`)**
> Título: Quer ajuda para colocar isso em prática?
> Texto: A mentoria de IA da Geniaria ensina quem vende a usar IA no trabalho com método: o que delegar, o que conferir e o que nunca entregar a ela. Sem programar, com Johnny Vaz.

### 9. Perguntas frequentes
**Qual IA usar para vendas?**
Qualquer assistente de uso geral — ChatGPT, Claude, Gemini ou Copilot — dá conta das tarefas deste guia. A escolha pesa menos que duas regras: usar a conta da empresa, com a opção de treinar com seus dados desligada, e nunca colar dado pessoal de cliente.

**A IA vai substituir o vendedor?**
Não nas tarefas que decidem a venda: entender o problema do cliente, negociar e assumir o compromisso. Ela tira do caminho a parte repetitiva — pesquisar, rascunhar, resumir, organizar — e devolve tempo para conversa.

**Posso colocar a lista de clientes no ChatGPT?**
Não com nome, telefone, e-mail, CPF ou histórico identificável. Isso é dado pessoal protegido pela LGPD, e a empresa responde pelo que compartilha. Para analisar a base, troque os dados que identificam a pessoa por códigos antes de colar, ou use uma ferramenta contratada pela empresa para isso.

**Preciso saber programar para usar IA em vendas?**
Não. Tudo neste guia se faz escrevendo em português num assistente de IA. Programação só entra quando a empresa quer ligar a IA ao CRM ou ao WhatsApp de forma automática — e aí já é conversa de agente.

**Preciso de um agente de IA ou de um assistente?**
Comece pelo assistente. Agente só vale quando o processo já está escrito, se repete muito e tem alguém para supervisionar. A diferença está explicada na página sobre agente de IA para vendas.

**Fecho:** Próxima leitura: Agente de IA para vendas: o que é e quando vale

---

## Página 2 — `/agente-de-ia-para-vendas`

**SEO**
- Title: Agente de IA para vendas: o que é e quando vale a pena · vendas.ia.br
- Description: O que é um agente de IA para vendas, a diferença para chatbot e assistente, o que ele faz na prática, quando vale, quando não vale e como começar sem expor o cliente.

### Primeira dobra
- Rótulo / trilha: IA para vendas · Agentes
- H1: **Agente de IA para vendas: o que é e quando vale a pena**
- Resposta direta: Um agente de IA para vendas é um programa que usa um modelo de linguagem para executar uma sequência de passos do processo comercial com alguma autonomia — responder o lead, fazer as perguntas de qualificação, consultar a agenda, marcar a reunião e registrar tudo no CRM. Vale a pena quando o processo já está escrito, se repete em volume e tem alguém para supervisionar. Sem essas três coisas, ele automatiza a confusão.
- Linha do autor: Por Johnny Vaz

### Qual a diferença entre chatbot, assistente de IA e agente?

| | Chatbot de roteiro | Assistente de IA | Agente de IA |
|---|---|---|---|
| Como funciona | Botões e respostas prontas | Responde ao que você pede | Decide o próximo passo dentro de limites |
| Quem dispara | O cliente, escolhendo opções | O vendedor, a cada pedido | Um evento: lead novo, mensagem, horário |
| Age em outros sistemas? | Pouco | Não — você copia e cola | Sim: CRM, agenda, WhatsApp, e-mail |
| Risco de erro com cliente | Baixo, e limitado | Baixo: uma pessoa revisa antes | Maior: pode falar com o cliente sem revisão |

Para a maior parte dos times, o assistente resolve o começo. O **guia de IA para vendas** (link `/`) mostra como usá-lo em prospecção, abordagem, follow-up e CRM.

### O que um agente de IA faz na prática em vendas?
- **Atende o lead que chega** pelo site ou pelo WhatsApp, a qualquer hora, e faz as perguntas de qualificação que o time definiu.
- **Responde dúvidas frequentes** a partir de um material aprovado — catálogo, política de entrega, horários —, e passa para uma pessoa o que fugir dele.
- **Marca reunião** consultando a agenda do vendedor.
- **Registra no CRM** o resumo da conversa, a origem do lead e o próximo passo.
- **Prepara o vendedor:** antes da reunião, junta num resumo o que o lead disse e o que há de público sobre a empresa.

### Quando um agente de IA vale a pena?
Vale quando as quatro respostas abaixo são "sim":
1. **O processo está escrito?** Se o time não consegue listar as perguntas de qualificação e os critérios de passagem, o agente não tem o que seguir.
2. **Há volume?** Dezenas de leads por dia com as mesmas perguntas justificam o trabalho de montar e manter. Cinco por semana, não.
3. **Os dados estão organizados?** Agente ligado a um CRM bagunçado espalha a bagunça mais rápido.
4. **Tem dono?** Alguém precisa ler as conversas toda semana, corrigir o material e decidir o que o agente pode ou não responder.

### Quando um agente de IA não vale a pena?
- Venda consultiva, com poucos clientes e negociação longa — a conversa é o produto.
- Produto com preço sob medida, em que qualquer resposta errada vira compromisso.
- Time que ainda não usa bem o assistente de IA no dia a dia.
- Quando ninguém tem tempo de supervisionar.

> **Chamada para a mentoria (`agente-meio`)**
> Título: Antes do agente, o time precisa saber usar a IA
> Texto: A mentoria de IA da Geniaria ensina o critério que vem antes de qualquer automação: o que delegar à IA, o que conferir e o que nunca entregar a ela.

### Quais os riscos de um agente de IA atendendo clientes?
- **Responder errado com segurança:** o modelo pode inventar prazo, preço ou condição. Limite o agente a um material aprovado e mande o resto para uma pessoa.
- **Prometer o que a empresa não cumpre:** resposta de agente para cliente é comunicação da empresa e pode ser cobrada como tal.
- **Dados pessoais:** a conversa traz nome, telefone e às vezes documentos. É preciso base legal para tratar esses dados, contrato com o fornecedor do modelo e transparência — a pessoa deve saber que fala com uma automação.
- **Regras do canal:** no WhatsApp, mensagens ativas exigem consentimento e modelos aprovados; disparo em massa sem isso derruba o número.
- **Custo que cresce escondido:** cada conversa consome uso do modelo. Meça o custo por lead qualificado, não só a assinatura.

### Como começar com agente de IA sem expor o cliente?
1. **Escreva o processo** que o agente vai seguir: perguntas, critérios e o que ele nunca responde.
2. **Comece em modo rascunho:** o agente prepara a resposta e um vendedor aprova o envio.
3. **Leia as conversas toda semana** e anote cada resposta corrigida.
4. **Automatize só o que quase não precisou de correção** — em geral, dúvidas frequentes e agendamento. Negociação continua com gente.

### Comprar pronto ou montar um agente sob medida?
Ferramenta pronta resolve casos comuns — atendimento no WhatsApp, qualificação simples, agendamento — e começa rápido. Montar sob medida faz sentido quando o processo tem regras próprias ou precisa ler sistemas internos. Nos dois casos, a parte que nenhum fornecedor entrega é a mesma: o processo escrito e alguém do time que sabe conferir o que a IA faz.

> **Chamada para a mentoria (`agente-fim`)**
> Título: Quer avaliar se um agente faz sentido no seu time?
> Texto: Na consultoria individual da mentoria de IA da Geniaria, o caso da sua empresa é olhado de perto: o que vale automatizar, o que deve continuar com gente e por onde começar.

### Perguntas frequentes
**O que é um agente de IA para vendas?**
É um programa que usa um modelo de linguagem para executar uma sequência de passos do processo comercial com alguma autonomia — por exemplo, responder um lead, fazer as perguntas de qualificação, consultar a agenda e marcar a reunião — usando ferramentas como CRM, agenda e WhatsApp.

**Qual a diferença entre agente de IA e chatbot?**
O chatbot tradicional segue um roteiro fixo de botões e respostas prontas. O agente entende texto livre, decide o próximo passo dentro de limites definidos e age em outros sistemas, como registrar o lead no CRM ou marcar uma reunião.

**Agente de IA pode conversar com o cliente sozinho?**
Pode, mas o começo seguro é o modo rascunho: o agente prepara a resposta e uma pessoa aprova o envio. Só depois de semanas de respostas conferidas, e para perguntas de baixo risco, vale deixar o envio automático.

**Agente de IA no WhatsApp está de acordo com a LGPD?**
Depende de como é feito. A pessoa precisa saber que fala com uma automação, a empresa precisa de base legal para tratar os dados, e o fornecedor do modelo precisa estar no contrato de tratamento de dados. Para mensagens ativas, o WhatsApp também exige consentimento e modelos aprovados.

**Quanto custa um agente de IA para vendas?**
Varia de uma assinatura mensal de ferramenta pronta a um projeto sob medida. Além do preço, conte o custo de uso do modelo por conversa e as horas de quem supervisiona — sem supervisão o agente não fica seguro em atendimento ao cliente.

**Fecho:** Volte ao guia: IA para vendas: como usar no dia a dia do time comercial

---

## Página 3 — `/dominio-a-venda` (já existe com visual próprio)
Texto atual mantido no código (`src/pages/DominioVenda.tsx`). Essência: "vendas.ia.br — domínio premium à venda. Correspondência exata de vendas + inteligência artificial na extensão brasileira .ia.br. Sem preço fixo; propostas por e-mail para contato@johnnyvaz.com.br." Se for redesenhar também, peça que eu extraia os textos dela.
