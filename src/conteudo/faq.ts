/**
 * Perguntas frequentes das duas páginas. A mesma lista alimenta o bloco
 * visível e o JSON-LD `FAQPage` (via `rotas.ts`), para os dois não divergirem.
 */
export type Pergunta = { q: string; a: string };

export const FAQ_GUIA: Pergunta[] = [
  {
    q: 'Qual IA usar para vendas?',
    a: 'Qualquer assistente de uso geral — ChatGPT, Claude, Gemini ou Copilot — dá conta das tarefas deste guia. A escolha pesa menos que duas regras: usar a conta da empresa, com a opção de treinar com seus dados desligada, e nunca colar dado pessoal de cliente.',
  },
  {
    q: 'A IA vai substituir o vendedor?',
    a: 'Não nas tarefas que decidem a venda: entender o problema do cliente, negociar e assumir o compromisso. Ela tira do caminho a parte repetitiva — pesquisar, rascunhar, resumir, organizar — e devolve tempo para conversa.',
  },
  {
    q: 'Posso colocar a lista de clientes no ChatGPT?',
    a: 'Não com nome, telefone, e-mail, CPF ou histórico identificável. Isso é dado pessoal protegido pela LGPD, e a empresa responde pelo que compartilha. Para analisar a base, troque os dados que identificam a pessoa por códigos antes de colar, ou use uma ferramenta contratada pela empresa para isso.',
  },
  {
    q: 'Preciso saber programar para usar IA em vendas?',
    a: 'Não. Tudo neste guia se faz escrevendo em português num assistente de IA. Programação só entra quando a empresa quer ligar a IA ao CRM ou ao WhatsApp de forma automática — e aí já é conversa de agente.',
  },
  {
    q: 'Preciso de um agente de IA ou de um assistente?',
    a: 'Comece pelo assistente. Agente só vale quando o processo já está escrito, se repete muito e tem alguém para supervisionar. A diferença está explicada na página sobre agente de IA para vendas.',
  },
];

export const FAQ_AGENTE: Pergunta[] = [
  {
    q: 'O que é um agente de IA para vendas?',
    a: 'É um programa que usa um modelo de linguagem para executar uma sequência de passos do processo comercial com alguma autonomia — por exemplo, responder um lead, fazer as perguntas de qualificação, consultar a agenda e marcar a reunião — usando ferramentas como CRM, agenda e WhatsApp.',
  },
  {
    q: 'Qual a diferença entre agente de IA e chatbot?',
    a: 'O chatbot tradicional segue um roteiro fixo de botões e respostas prontas. O agente entende texto livre, decide o próximo passo dentro de limites definidos e age em outros sistemas, como registrar o lead no CRM ou marcar uma reunião.',
  },
  {
    q: 'Agente de IA pode conversar com o cliente sozinho?',
    a: 'Pode, mas o começo seguro é o modo rascunho: o agente prepara a resposta e uma pessoa aprova o envio. Só depois de semanas de respostas conferidas, e para perguntas de baixo risco, vale deixar o envio automático.',
  },
  {
    q: 'Agente de IA no WhatsApp está de acordo com a LGPD?',
    a: 'Depende de como é feito. A pessoa precisa saber que fala com uma automação, a empresa precisa de base legal para tratar os dados, e o fornecedor do modelo precisa estar no contrato de tratamento de dados. Para mensagens ativas, o WhatsApp também exige consentimento e modelos aprovados.',
  },
  {
    q: 'Quanto custa um agente de IA para vendas?',
    a: 'Varia de uma assinatura mensal de ferramenta pronta a um projeto sob medida. Além do preço, conte o custo de uso do modelo por conversa e as horas de quem supervisiona — sem supervisão o agente não fica seguro em atendimento ao cliente.',
  },
];
