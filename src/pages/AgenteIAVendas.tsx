import { Link } from 'react-router-dom';
import { ChamadaMentoria, LayoutGuia } from '@/components/guia/LayoutGuia';
import { FAQ_AGENTE } from '@/conteudo/faq';
import { AUTOR } from '@/conteudo/site';
import { useHead } from '@/hooks/useHead';

const AgenteIAVendas = () => {
  useHead('/agente-de-ia-para-vendas');

  return (
    <LayoutGuia pagina="agente">
      <article className="gv-artigo">
        <p className="gv-rotulo">
          <Link to="/">IA para vendas</Link> · Agentes
        </p>
        <h1>Agente de IA para vendas: o que é e quando vale a pena</h1>

        <p className="gv-resposta">
          Um agente de IA para vendas é um programa que usa um modelo de linguagem para executar
          uma sequência de passos do processo comercial com alguma autonomia — responder o lead,
          fazer as perguntas de qualificação, consultar a agenda, marcar a reunião e registrar tudo
          no CRM. Vale a pena quando o processo já está escrito, se repete em volume e tem alguém
          para supervisionar. Sem essas três coisas, ele automatiza a confusão.
        </p>

        <p className="gv-meta">
          Por <a href={AUTOR.url}>{AUTOR.nome}</a>
        </p>

        <h2>Qual a diferença entre chatbot, assistente de IA e agente?</h2>
        <div className="gv-tabela-wrap">
          <table className="gv-tabela">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Chatbot de roteiro</th>
                <th scope="col">Assistente de IA</th>
                <th scope="col">Agente de IA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Como funciona</th>
                <td>Botões e respostas prontas</td>
                <td>Responde ao que você pede</td>
                <td>Decide o próximo passo dentro de limites</td>
              </tr>
              <tr>
                <th scope="row">Quem dispara</th>
                <td>O cliente, escolhendo opções</td>
                <td>O vendedor, a cada pedido</td>
                <td>Um evento: lead novo, mensagem, horário</td>
              </tr>
              <tr>
                <th scope="row">Age em outros sistemas?</th>
                <td>Pouco</td>
                <td>Não — você copia e cola</td>
                <td>Sim: CRM, agenda, WhatsApp, e-mail</td>
              </tr>
              <tr>
                <th scope="row">Risco de erro com cliente</th>
                <td>Baixo, e limitado</td>
                <td>Baixo: uma pessoa revisa antes</td>
                <td>Maior: pode falar com o cliente sem revisão</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Para a maior parte dos times, o assistente resolve o começo. O{' '}
          <Link to="/">guia de IA para vendas</Link> mostra como usá-lo em prospecção, abordagem,
          follow-up e CRM.
        </p>

        <h2>O que um agente de IA faz na prática em vendas?</h2>
        <ul>
          <li>
            <strong>Atende o lead que chega</strong> pelo site ou pelo WhatsApp, a qualquer hora,
            e faz as perguntas de qualificação que o time definiu.
          </li>
          <li>
            <strong>Responde dúvidas frequentes</strong> a partir de um material aprovado —
            catálogo, política de entrega, horários —, e passa para uma pessoa o que fugir dele.
          </li>
          <li>
            <strong>Marca reunião</strong> consultando a agenda do vendedor.
          </li>
          <li>
            <strong>Registra no CRM</strong> o resumo da conversa, a origem do lead e o próximo
            passo.
          </li>
          <li>
            <strong>Prepara o vendedor:</strong> antes da reunião, junta num resumo o que o lead
            disse e o que há de público sobre a empresa.
          </li>
        </ul>

        <h2>Quando um agente de IA vale a pena?</h2>
        <p>Vale quando as quatro respostas abaixo são “sim”:</p>
        <ol>
          <li>
            <strong>O processo está escrito?</strong> Se o time não consegue listar as perguntas
            de qualificação e os critérios de passagem, o agente não tem o que seguir.
          </li>
          <li>
            <strong>Há volume?</strong> Dezenas de leads por dia com as mesmas perguntas justificam
            o trabalho de montar e manter. Cinco por semana, não.
          </li>
          <li>
            <strong>Os dados estão organizados?</strong> Agente ligado a um CRM bagunçado espalha a
            bagunça mais rápido.
          </li>
          <li>
            <strong>Tem dono?</strong> Alguém precisa ler as conversas toda semana, corrigir o
            material e decidir o que o agente pode ou não responder.
          </li>
        </ol>

        <h2>Quando um agente de IA não vale a pena?</h2>
        <ul>
          <li>Venda consultiva, com poucos clientes e negociação longa — a conversa é o produto.</li>
          <li>Produto com preço sob medida, em que qualquer resposta errada vira compromisso.</li>
          <li>Time que ainda não usa bem o assistente de IA no dia a dia.</li>
          <li>Quando ninguém tem tempo de supervisionar.</li>
        </ul>

        <ChamadaMentoria
          posicao="agente-meio"
          titulo="Antes do agente, o time precisa saber usar a IA"
          texto="A mentoria de IA da Geniaria ensina o critério que vem antes de qualquer automação: o que delegar à IA, o que conferir e o que nunca entregar a ela."
        />

        <h2>Quais os riscos de um agente de IA atendendo clientes?</h2>
        <ul>
          <li>
            <strong>Responder errado com segurança:</strong> o modelo pode inventar prazo, preço
            ou condição. Limite o agente a um material aprovado e mande o resto para uma pessoa.
          </li>
          <li>
            <strong>Prometer o que a empresa não cumpre:</strong> resposta de agente para cliente
            é comunicação da empresa e pode ser cobrada como tal.
          </li>
          <li>
            <strong>Dados pessoais:</strong> a conversa traz nome, telefone e às vezes documentos.
            É preciso base legal para tratar esses dados, contrato com o fornecedor do modelo e
            transparência — a pessoa deve saber que fala com uma automação.
          </li>
          <li>
            <strong>Regras do canal:</strong> no WhatsApp, mensagens ativas exigem consentimento e
            modelos aprovados; disparo em massa sem isso derruba o número.
          </li>
          <li>
            <strong>Custo que cresce escondido:</strong> cada conversa consome uso do modelo. Meça
            o custo por lead qualificado, não só a assinatura.
          </li>
        </ul>

        <h2>Como começar com agente de IA sem expor o cliente?</h2>
        <ol>
          <li>
            <strong>Escreva o processo</strong> que o agente vai seguir: perguntas, critérios e o
            que ele nunca responde.
          </li>
          <li>
            <strong>Comece em modo rascunho:</strong> o agente prepara a resposta e um vendedor
            aprova o envio.
          </li>
          <li>
            <strong>Leia as conversas toda semana</strong> e anote cada resposta corrigida.
          </li>
          <li>
            <strong>Automatize só o que quase não precisou de correção</strong> — em geral,
            dúvidas frequentes e agendamento. Negociação continua com gente.
          </li>
        </ol>

        <h2>Comprar pronto ou montar um agente sob medida?</h2>
        <p>
          Ferramenta pronta resolve casos comuns — atendimento no WhatsApp, qualificação simples,
          agendamento — e começa rápido. Montar sob medida faz sentido quando o processo tem regras
          próprias ou precisa ler sistemas internos. Nos dois casos, a parte que nenhum fornecedor
          entrega é a mesma: o processo escrito e alguém do time que sabe conferir o que a IA faz.
        </p>

        <ChamadaMentoria
          posicao="agente-fim"
          titulo="Quer avaliar se um agente faz sentido no seu time?"
          texto="Na consultoria individual da mentoria de IA da Geniaria, o caso da sua empresa é olhado de perto: o que vale automatizar, o que deve continuar com gente e por onde começar."
        />

        <section className="gv-faq" aria-labelledby="perguntas">
          <h2 id="perguntas">Perguntas frequentes</h2>
          {FAQ_AGENTE.map((p) => (
            <details key={p.q}>
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </section>

        <p className="gv-proxima">
          Volte ao guia: <Link to="/">IA para vendas: como usar no dia a dia do time comercial</Link>
        </p>
      </article>
    </LayoutGuia>
  );
};

export default AgenteIAVendas;
