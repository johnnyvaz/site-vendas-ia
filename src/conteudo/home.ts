/**
 * Conteúdo da home da Vendas IA.
 *
 * Método: Escada de Vendas (Melissa) — docs/ladder-sale-metodologia-e-esteira.md.
 * Tecnologia e negócio: docs/PRD-VENDAS-IA.md.
 * Público da v1: empresas grandes e cautelosas. Sem preço, sem promessa numérica,
 * sem prova social que não seja real.
 */

export type Degrau = {
  n: string;
  nome: string;
  pergunta: string;
  fazemos: string;
  ia: string;
  entrega: string;
};

export const DEGRAUS: Degrau[] = [
  {
    n: '01',
    nome: 'Diagnosticar',
    pergunta: 'Onde a venda trava?',
    fazemos: 'Mapeamos o funil atual, os números da operação e o gargalo principal. Um gargalo por vez.',
    ia: 'Lê planilhas e CRM, cruza os dados e aponta onde a conversão cai.',
    entrega: 'Raio-X comercial e plano de 90 dias',
  },
  {
    n: '02',
    nome: 'Conhecer o cliente',
    pergunta: 'Para quem vendemos e qual dor resolvemos?',
    fazemos: 'Definimos o cliente ideal com base em quem já compra, mapeamos a dor e a jornada de compra.',
    ia: 'Pesquisa mercado e concorrentes, prepara roteiros e resume entrevistas.',
    entrega: 'Perfil do cliente ideal e mapa da dor',
  },
  {
    n: '03',
    nome: 'Construir a oferta',
    pergunta: 'Por que o cliente escolheria a sua empresa?',
    fazemos: 'Proposta de valor, posicionamento e materiais de venda: casos, cálculo de retorno, roteiro de negociação.',
    ia: 'Rascunha propostas, testa versões de mensagem e acelera a produção de conteúdo.',
    entrega: 'Oferta escrita e kit de vendas',
  },
  {
    n: '04',
    nome: 'Atrair e prospectar',
    pergunta: 'Como chegam as oportunidades?',
    fazemos: 'Escolhemos o canal prioritário, montamos listas, primeiro contato e cadência de follow-up.',
    ia: 'Identifica sinais de compra, monta listas e personaliza mensagens em escala.',
    entrega: 'Cadência de prospecção em operação',
  },
  {
    n: '05',
    nome: 'Converter',
    pergunta: 'Como a oportunidade vira venda?',
    fazemos: 'Funil com etapas e critérios de passagem, qualificação, roteiro de reunião e proposta.',
    ia: 'Qualifica contatos, prepara a reunião, resume a conversa e atualiza o CRM.',
    entrega: 'Processo de vendas documentado',
  },
  {
    n: '06',
    nome: 'Reter e crescer',
    pergunta: 'O cliente fica, compra mais e indica?',
    fazemos: 'Pós-venda ativo, expansão da base, pedido de indicação e playbook comercial.',
    ia: 'Sinaliza clientes em risco, sugere a próxima oferta e mantém o painel de indicadores.',
    entrega: 'Playbook comercial e rotina de gestão',
  },
];

export type Capacidade = { titulo: string; texto: string; degraus: string };

export const CAPACIDADES: Capacidade[] = [
  {
    titulo: 'Gêmeo digital comercial',
    texto:
      'Uma representação viva da sua operação de vendas: funil, CAC, LTV, payback e churn, cada número com a origem registrada. Nasce no diagnóstico e evolui a cada degrau.',
    degraus: 'Degraus 01, 05 e 06',
  },
  {
    titulo: 'Telemetria de aquisição',
    texto:
      'Mede de onde vêm as oportunidades: site, buscadores, redes e assistentes de IA. Relatório semanal para decidir onde investir com dado, não com impressão.',
    degraus: 'Degrau 04',
  },
  {
    titulo: 'Agentes de IA supervisionados',
    texto:
      'Primeira resposta, qualificação e follow-up no WhatsApp e no e-mail, dentro de regras escritas, com registro de cada ação e uma pessoa no comando.',
    degraus: 'Degraus 04 e 05',
  },
  {
    titulo: 'Formação do time',
    texto:
      'Trilhas e workshops para o time comercial usar IA no dia a dia com método, critério e cuidado com dados de clientes.',
    degraus: 'Todos os degraus',
  },
];

export type Principio = { titulo: string; texto: string };

export const PRINCIPIOS: Principio[] = [
  {
    titulo: 'A IA prepara. A pessoa decide.',
    texto:
      'A máquina cuida da cadência; o relacionamento com o cliente continua humano. Nenhuma mensagem sai sem regra aprovada pela sua equipe.',
  },
  {
    titulo: 'Processo antes de ferramenta.',
    texto:
      'Só automatizamos o que já está desenhado e medido. Ferramenta sem processo vira custo.',
  },
  {
    titulo: 'Nenhum número sem origem.',
    texto:
      'Todo indicador aponta de onde veio: CRM, planilha, contrato ou cálculo. Quando o dado não existe, dizemos que não existe.',
  },
  {
    titulo: 'Dados protegidos por padrão.',
    texto:
      'Tratamento conforme a LGPD, acesso mínimo necessário e dados de clientes fora de ferramentas abertas de IA.',
  },
  {
    titulo: 'Um gargalo por vez.',
    texto:
      'Foco em um cliente ideal, um produto, um canal e um jeito de vender até o ciclo se repetir com previsibilidade.',
  },
];

export type Etapa = { n: string; titulo: string; texto: string };

export const ETAPAS: Etapa[] = [
  {
    n: '01',
    titulo: 'Conversa inicial',
    texto: 'Entendemos o momento da empresa, o time e o objetivo comercial. Sem compromisso.',
  },
  {
    n: '02',
    titulo: 'Diagnóstico',
    texto: 'Gargalo principal, números da operação e plano de 90 dias, apresentados à liderança.',
  },
  {
    n: '03',
    titulo: 'Implantação por degraus',
    texto: 'Um degrau por ciclo, com entregas verificáveis. A tecnologia entra onde há processo.',
  },
  {
    n: '04',
    titulo: 'Acompanhamento',
    texto: 'Indicadores, rotina comercial e revisão periódica do que a IA está fazendo.',
  },
];

export type Formato = { nome: string; texto: string; paraQuem: string };

export const FORMATOS: Formato[] = [
  {
    nome: 'Diagnóstico',
    texto: 'Análise do funil e dos números da operação, com o gargalo principal e o plano de 90 dias.',
    paraQuem: 'Liderança que quer clareza antes de investir',
  },
  {
    nome: 'Escada Completa',
    texto: 'Implantação dos seis degraus junto com a sua equipe, um degrau por ciclo.',
    paraQuem: 'Empresas que vão estruturar ou reorganizar o comercial',
  },
  {
    nome: 'Time Comercial com IA',
    texto: 'Papéis, acordos entre áreas, playbook, modelo de comissão, CRM e automações.',
    paraQuem: 'Operações com time de vendas próprio',
  },
  {
    nome: 'Workshop IA no Comercial',
    texto: 'Formação prática para times e lideranças usarem IA com método e segurança.',
    paraQuem: 'Times comerciais, lideranças e grupos de empresas',
  },
  {
    nome: 'Acompanhamento',
    texto: 'Revisão periódica de pipeline, indicadores, rotina e uso da IA.',
    paraQuem: 'Quem concluiu o diagnóstico ou a implantação',
  },
];

export type PerguntaHome = { q: string; a: string };

export const FAQ_HOME: PerguntaHome[] = [
  {
    q: 'A Vendas IA substitui o nosso time comercial?',
    a: 'Não. O time continua vendendo e se relacionando com os clientes. A tecnologia assume o trabalho repetitivo — pesquisa, registro, primeira resposta, lembretes — para o time dedicar tempo às conversas que decidem a venda.',
  },
  {
    q: 'Os dados dos nossos clientes vão para ferramentas de IA?',
    a: 'Só o necessário, em ambiente aprovado pela sua empresa e conforme a LGPD. Dados pessoais e informações sensíveis não são colados em ferramentas abertas. As regras de uso de dados são definidas por escrito antes de qualquer automação.',
  },
  {
    q: 'Precisamos trocar o nosso CRM ou nossas ferramentas?',
    a: 'Não necessariamente. O diagnóstico avalia o que já existe. Na maior parte dos casos, organizamos o processo e integramos às ferramentas atuais.',
  },
  {
    q: 'Funciona para empresas de grande porte?',
    a: 'Sim. Em operações maiores, o método começa por uma unidade, um produto ou uma região — um piloto controlado — e só se expande depois de o ciclo funcionar com números.',
  },
  {
    q: 'Como é feita a proposta comercial?',
    a: 'Depois da conversa inicial e do diagnóstico, apresentamos escopo, prazos e investimento de acordo com o momento da empresa e as frentes contratadas.',
  },
  {
    q: 'Quanto tempo leva para ver resultado?',
    a: 'O diagnóstico já entrega clareza sobre o gargalo e as prioridades. A implantação acontece em ciclos, com entregas verificáveis em cada degrau. Não prometemos números antes de conhecer a operação.',
  },
];
