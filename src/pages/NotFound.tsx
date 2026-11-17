import { Link } from 'react-router-dom';
import { LayoutGuia } from '@/components/guia/LayoutGuia';

const NotFound = () => (
  <LayoutGuia pagina="outra">
    <article className="gv-artigo">
      <p className="gv-rotulo">Erro 404</p>
      <h1>Esta página não existe</h1>
      <p className="gv-resposta">
        O endereço pode ter mudado ou ter sido digitado errado. O conteúdo do site está nestas duas páginas:
      </p>
      <ul>
        <li><Link to="/">IA para vendas: como usar no dia a dia do time comercial</Link></li>
        <li><Link to="/agente-de-ia-para-vendas">Agente de IA para vendas: o que é e quando vale a pena</Link></li>
      </ul>
    </article>
  </LayoutGuia>
);

export default NotFound;
