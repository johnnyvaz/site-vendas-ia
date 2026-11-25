import { MENSAGEM_PADRAO, WHATSAPP_EXIBICAO, linkWhatsApp } from '@/conteudo/site';

/**
 * Contato direto pelo WhatsApp da Melissa. Sem formulário: o site não
 * coleta nem armazena dados pessoais (LGPD). No computador, o QR abre a
 * conversa no celular.
 */
export function ContatoWhatsApp() {
  return (
    <div className="vi-zap" data-revela>
      <div className="vi-zap-topo">
        <span className="vi-rotulo">WhatsApp</span>
        <p className="vi-zap-quem">Melissa · Método e estratégia comercial</p>
      </div>

      <a className="vi-zap-numero" href={linkWhatsApp(MENSAGEM_PADRAO)} target="_blank" rel="noopener noreferrer">
        {WHATSAPP_EXIBICAO}
      </a>

      <div className="vi-zap-acoes">
        <a className="vi-botao vi-botao-claro" href={linkWhatsApp(MENSAGEM_PADRAO)} target="_blank" rel="noopener noreferrer">
          Conversar no WhatsApp
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10M11 6l4 4-4 4" /></svg>
        </a>
        <p className="vi-zap-nota">
          A mensagem de abertura já vem escrita; é só enviar. Este site não coleta nem armazena dados
          pessoais.
        </p>
      </div>

      <figure className="vi-zap-qr">
        <img src="/images/whatsapp-qr.svg" alt="" width={132} height={132} loading="lazy" />
        <figcaption>No computador? Aponte a câmera do celular para abrir a conversa.</figcaption>
      </figure>
    </div>
  );
}
