import { Link } from 'react-router-dom';
import { ChamadaMentoria, LayoutGuia } from '@/components/guia/LayoutGuia';
import { DobraPalco } from '@/components/dobra/DobraPalco';
import { FAQ_GUIA } from '@/conteudo/faq';
import { ATUALIZADO_EM } from '@/conteudo/site';
import { useHead } from '@/hooks/useHead';

const SUMARIO = [
  { id: 'o-que-faz', titulo: 'O que a IA faz bem em vendas — e o que não faz?' },
  { id: 'prospeccao', titulo: 'Como usar IA na prospecção?' },
  { id: 'abordagem', titulo: 'Como montar um roteiro de abordagem com IA?' },
  { id: 'follow-up', titulo: 'Como escrever follow-up com IA sem soar robô?' },
  { id: 'crm', titulo: 'Como usar IA junto com o CRM?' },
  { id: 'lgpd', titulo: 'O que nunca colar na IA?' },
  { id: 'conferir', titulo: 'Como conferir o que a IA escreveu?' },
  { id: 'comecar', titulo: 'Por onde o time começa?' },
  { id: 'perguntas', titulo: 'Perguntas frequentes' },
];

function dataPorExtenso(iso: string) {
  const [a, m, d] = iso.split('-').map(Number);
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  return `${d} de ${meses[m - 1]} de ${a}`;
}

const GuiaIAVendas = () => {
  useHead('/');

  return (
    <LayoutGuia pagina="guia" semTopo>
      <DobraPalco ancoraGuia="#guia" />
      <article className="gv-artigo" id="guia" aria-labelledby="titulo-guia">
        <p className="gv-meta">
          Atualizado em{' '}
          <time dateTime={ATUALIZADO_EM}>{dataPorExtenso(ATUALIZADO_EM)}</time>
        </p>

        <nav className="gv-sumario" aria-label="Neste guia">
          <p>Neste guia</p>
          <ol>
            {SUMARIO.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.titulo}</a>
              </li>
            ))}
          </ol>
        </nav>

        <p>
          Este guia não promete dobrar vendas. Promete uma coisa menor e mais útil: mostrar onde a
          IA economiza tempo de verdade no trabalho comercial, com modelos de pedido prontos para
          copiar, e onde ela cria risco — principalmente com dados de clientes.
        </p>

        {/* ── 1 ───────────────────────────────────────── */}
        <h2 id="o-que-faz">O que a IA faz bem em vendas — e o que não faz?</h2>
        <p>
          A IA generativa é boa em <strong>linguagem</strong>: ler, resumir, reescrever, sugerir
          perguntas, organizar texto solto em campos. É fraca em <strong>fato</strong>: ela pode
          inventar um cargo, um número ou uma notícia com a mesma segurança com que acerta. A
          regra prática sai daí — a IA rascunha, a pessoa confere e decide.
        </p>
        <div className="gv-tabela-wrap">
          <table className="gv-tabela">
            <thead>
              <tr>
                <th scope="col">Tarefa</th>
                <th scope="col">A IA ajuda em</th>
                <th scope="col">Fica com o vendedor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prospecção</td>
                <td>Organizar o que é público sobre a empresa e levantar hipóteses de dor</td>
                <td>Confirmar cada fato na fonte e escolher quem abordar</td>
              </tr>
              <tr>
                <td>Abordagem</td>
                <td>Rascunhar mensagem e perguntas de descoberta</td>
                <td>Ajustar o tom e decidir o que perguntar de fato</td>
              </tr>
              <tr>
                <td>Follow-up</td>
                <td>Escrever a partir das suas anotações da conversa</td>
                <td>Garantir que nada prometido saiu diferente</td>
              </tr>
              <tr>
                <td>Reunião</td>
                <td>Resumir anotações em próximos passos</td>
                <td>Negociar, assumir compromisso, dar preço</td>
              </tr>
              <tr>
                <td>CRM</td>
                <td>Transformar texto solto em campos padronizados</td>
                <td>Revisar antes de salvar e decidir o estágio do negócio</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── 2 ───────────────────────────────────────── */}
        <h2 id="prospeccao">Como usar IA na prospecção?</h2>
        <p>
          Use a IA para <strong>organizar</strong> o que você já encontrou sobre a empresa, não
          para descobrir fatos sozinha. Copie trechos do site da empresa, de uma notícia ou da
          descrição de uma vaga aberta, cole no assistente e peça hipóteses. Assim a resposta fica
          presa ao material que você trouxe, e cada afirmação tem de onde ter saído.
        </p>
        <p className="gv-prompt-titulo">Modelo de pedido · pesquisa de conta</p>
        <pre className="gv-prompt">{`Sou vendedor de [o que você vende] para [tipo de empresa].
Abaixo estão trechos públicos sobre a empresa [nome]: site, notícia e vaga aberta.

[cole os trechos aqui]

Com base SÓ nesse material:
1. Resuma o que a empresa faz em 3 linhas.
2. Liste 3 hipóteses de problema que [o que você vende] poderia resolver,
   citando o trecho que sustenta cada uma.
3. Diga o que NÃO dá para saber por esse material.`}</pre>
        <p>
          O item 3 é o mais importante: ele obriga a IA a separar o que leu do que está supondo.
          Hipótese não é fato — vira pergunta na primeira conversa, nunca afirmação na mensagem.
        </p>

        {/* ── 3 ───────────────────────────────────────── */}
        <h2 id="abordagem">Como montar um roteiro de abordagem com IA?</h2>
        <p>
          Peça um rascunho curto, com uma pergunta no fim, e dê à IA o contexto que ela não tem:
          quem é a pessoa, por que você escolheu essa empresa e o que você quer como próximo passo.
          Mensagem genérica nasce de pedido genérico.
        </p>
        <p className="gv-prompt-titulo">Modelo de pedido · primeira mensagem</p>
        <pre className="gv-prompt">{`Escreva uma primeira mensagem de LinkedIn para [cargo] da [empresa].
Motivo do contato: [a hipótese que você confirmou na pesquisa].
O que eu ofereço: [uma frase].
Próximo passo que eu quero: [conversa de 15 minutos / enviar material].

Regras: até 60 palavras, sem elogio genérico, sem promessa de resultado,
termine com UMA pergunta fácil de responder. Escreva 3 versões
com tons diferentes: direta, curiosa e consultiva.`}</pre>
        <p>
          Pedir três versões ajuda a escolher, e escolher é trabalho do vendedor. Depois de enviar,
          anote qual teve resposta — em poucas semanas o time tem um padrão próprio, melhor que
          qualquer modelo pronto.
        </p>
        <p>
          A IA também ajuda a preparar a <strong>conversa</strong>, não só a mensagem: peça a ela
          as dez objeções mais prováveis para o seu produto e treine as respostas em voz alta, com
          a IA fazendo o papel do cliente.
        </p>

        <ChamadaMentoria
          posicao="guia-meio"
          titulo="Quer treinar o time inteiro nisso, com acompanhamento?"
          texto="Ler o guia resolve o primeiro passo. A mentoria de IA da Geniaria acompanha quem vende enquanto aplica a IA no próprio trabalho — com método, conferência e cuidado com os dados dos clientes."
        />

        {/* ── 4 ───────────────────────────────────────── */}
        <h2 id="follow-up">Como escrever follow-up com IA sem soar robô?</h2>
        <p>
          O follow-up soa robótico quando a IA não sabe o que aconteceu na conversa. A saída é
          dar a ela as suas anotações — em tópicos, do jeito que você escreveu — e pedir que ela
          só organize, sem acrescentar nada.
        </p>
        <p className="gv-prompt-titulo">Modelo de pedido · follow-up de reunião</p>
        <pre className="gv-prompt">{`Minhas anotações da reunião com [cargo] da [empresa], sem dados pessoais:

[cole suas anotações]

Escreva um e-mail de follow-up que:
- agradeça em uma linha, sem exagero;
- liste o que combinamos e o próximo passo com data;
- use as palavras que o cliente usou para descrever o problema;
- não acrescente nada que não esteja nas anotações.`}</pre>
        <p>
          A última linha do pedido evita o defeito mais comum: a IA “melhorar” o que foi combinado,
          prometendo prazo ou condição que ninguém ofereceu.
        </p>

        {/* ── 5 ───────────────────────────────────────── */}
        <h2 id="crm">Como usar IA junto com o CRM?</h2>
        <p>
          O ganho mais rápido é no preenchimento. Vendedor odeia preencher CRM, e a IA transforma
          anotação solta em campo padronizado: dor principal, quem decide, orçamento citado, prazo,
          próximo passo. Você revisa e cola.
        </p>
        <ul>
          <li>
            <strong>Resumo de reunião em campos:</strong> peça a saída no formato exato dos campos
            do seu CRM.
          </li>
          <li>
            <strong>Próximo passo claro:</strong> peça que a IA aponte o que ficou sem data ou sem
            dono nas anotações.
          </li>
          <li>
            <strong>Revisão do funil:</strong> com a lista de negócios sem nome de pessoa, peça os
            que estão parados há mais tempo e uma pergunta para destravar cada um.
          </li>
        </ul>
        <p>
          Muitos CRMs já trazem IA embutida. Ela costuma ser a opção mais segura para dados de
          clientes, porque fica dentro do contrato que a empresa já tem com o fornecedor — confira
          com quem cuida dos dados antes de ligar.
        </p>

        {/* ── 6 ───────────────────────────────────────── */}
        <h2 id="lgpd">O que nunca colar na IA?</h2>
        <div className="gv-alerta">
          <p>
            <strong>Regra de bolso:</strong> se o texto identifica uma pessoa ou revela uma
            condição comercial negociada, ele não vai para um assistente de IA de uso pessoal.
          </p>
          <ul>
            <li>Nome completo, CPF, telefone, e-mail ou endereço de cliente;</li>
            <li>Exportação da base de leads ou da carteira, mesmo “só para analisar”;</li>
            <li>Contrato, proposta assinada, preço ou desconto negociado com um cliente;</li>
            <li>Print de conversa de WhatsApp com cliente;</li>
            <li>Senha, token ou acesso de qualquer sistema.</li>
          </ul>
        </div>
        <p>
          A LGPD trata nome, telefone e e-mail de cliente como dado pessoal, e a empresa responde
          pelo que compartilha com terceiros — e o fornecedor de IA é um terceiro. Três cuidados
          resolvem quase tudo:
        </p>
        <ol>
          <li>
            <strong>Troque o nome por um papel:</strong> “a diretora financeira de uma
            distribuidora em Ribeirão Preto” rende o mesmo rascunho que o nome dela.
          </li>
          <li>
            <strong>Use a conta da empresa</strong>, com a opção de usar seus dados para treinar o
            modelo desligada, em vez da conta pessoal do vendedor.
          </li>
          <li>
            <strong>Escreva a regra do time</strong> em meia página: o que pode, o que não pode e
            em qual ferramenta. Regra que só existe na cabeça do gestor não protege ninguém.
          </li>
        </ol>
        <p>
          Este guia orienta o uso no dia a dia e não substitui a análise jurídica da sua empresa.
        </p>

        {/* ── 7 ───────────────────────────────────────── */}
        <h2 id="conferir">Como conferir o que a IA escreveu?</h2>
        <p>
          Antes de qualquer texto feito com IA chegar ao cliente, passe por cinco perguntas. Leva
          menos de um minuto e pega quase todo erro que importa.
        </p>
        <ol>
          <li><strong>Fatos:</strong> cada nome, cargo, número e data está na minha fonte?</li>
          <li><strong>Promessa:</strong> o texto promete prazo, resultado ou condição que eu não ofereci?</li>
          <li><strong>Tom:</strong> eu falaria assim com essa pessoa, olhando para ela?</li>
          <li><strong>Pedido:</strong> está claro qual é o próximo passo e quem faz?</li>
          <li><strong>Dado:</strong> sobrou alguma informação de outro cliente no texto?</li>
        </ol>

        {/* ── 8 ───────────────────────────────────────── */}
        <h2 id="comecar">Por onde o time começa?</h2>
        <p>
          Comece por <strong>uma</strong> tarefa, não por uma ferramenta. Escolha a mais repetitiva
          da semana — quase sempre é o follow-up ou o preenchimento do CRM — e faça assim:
        </p>
        <ol>
          <li>Anote quanto tempo a tarefa leva hoje, sem IA.</li>
          <li>Escreva um modelo de pedido para ela, como os deste guia, e salve onde o time acha.</li>
          <li>Use por duas semanas, sempre com a conferência das cinco perguntas.</li>
          <li>Compare o tempo e a qualidade. Se ganhou, passe para a próxima tarefa.</li>
        </ol>
        <p>
          Só depois que o processo está escrito e funcionando com o assistente faz sentido pensar
          em automatizar com um agente. Entenda a diferença em{' '}
          <Link to="/agente-de-ia-para-vendas">agente de IA para vendas: o que é e quando vale</Link>.
        </p>

        <ChamadaMentoria
          posicao="guia-fim"
          titulo="Quer ajuda para colocar isso em prática?"
          texto="A mentoria de IA da Geniaria ensina quem vende a usar IA no trabalho com método: o que delegar, o que conferir e o que nunca entregar a ela. Sem programar, com Johnny Vaz."
        />

        {/* ── FAQ ───────────────────────────────────────── */}
        <section className="gv-faq" aria-labelledby="perguntas">
          <h2 id="perguntas">Perguntas frequentes</h2>
          {FAQ_GUIA.map((p) => (
            <details key={p.q}>
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </section>

        <p className="gv-proxima">
          Próxima leitura:{' '}
          <Link to="/agente-de-ia-para-vendas">Agente de IA para vendas: o que é e quando vale</Link>
        </p>
      </article>
    </LayoutGuia>
  );
};

export default GuiaIAVendas;
