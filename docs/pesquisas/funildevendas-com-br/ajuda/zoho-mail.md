# Zoho Mail

- **URL:** https://www.funildevendas.com.br/ajuda/zoho-mail/
- **Data:** 2025-07-30T18:56:11
- **Modificado:** 2025-07-30T18:56:11

---

## SMTP – Simple Mail Transfer Protocol

O SMTP, ou Simple Mail Transfer Protocol, permite que você envie mensagens por um aplicativo de e-mail através de um servidor específico. Por exemplo, se você deseja usar sua conta do [Zoho Mail](https://www.zoho.com/pt-br/mail/) para enviar mensagens por meio de outro cliente de e-mail, você precisará configurar esse cliente com informações de SMTP do Zoho.

## Configurações SMTP para o Zoho Mail – SSL

**Configurações do servidor de saída:** (Usuários pessoais com um endereço de e-mail, username@zoho.com):

Nome do servidor de saída: **smtp.zoho.com**  
Porta: **465**  
Tipo de segurança:**SSL**  
Requer autenticação: **Sim.**

**Configurações do servidor de saída:** (Usuários da organização com um endereço de e-mail baseado em domínio, you@yourdomain.com):

Nome do servidor de saída: **smtppro.zoho.com**  
Porta: **465** com **SSL** _ou_  
Porta: **587** com **TLS**  
Requer autenticação: **Sim**

**O endereço de e-mail deve corresponder ao endereço de e-mail/[alias de e-mail](https://www.zoho.com/mail/how-to/create-email-alias.html) da conta para a qual os dados de autenticação foram fornecidos.**

## Configurações SMTP para o Zoho Mail – TLS

Nome do servidor de saída: **smtp.zoho.com**  
Porta: **587**  
Tipo de segurança:**TLS**

Requer autenticação: **Sim. O endereço de e-mail deve corresponder endereço de e-mail/alias de e-mail da conta, para a qual os detalhes de autenticação são fornecidos.**

Você pode exigir uma [Application-specific Password (Senha específica do aplicativo)](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html#alink5) para configurar a conta em outros dispositivos, se tiver ativado a autenticação de dois fatores.

## Duplicar cópias enviadas – Não salvar uma cópia na pasta de itens enviados

Quando você envia uma mensagem por clientes de e-mail, como o Outlook ou outros clientes usando smtp.zoho.com, esses e-mails são salvos automaticamente em sua caixa de itens enviados. Entretanto, há alguns clientes de e-mail que, por costume, salvam uma cópia na pasta Sent (Enviados) local. Isso faz com que os e-mails sejam duplicados na pasta de itens enviados (um salvo pelo cliente de e-mail e outro pelos servidores do Zoho). Em tais casos, o usuário pode escolher a opção **Do not save a copy in Sent folder (Não salvar uma cópia na pasta Enviados)** para evitar a duplicação. ​

  1. Faça login no [Zoho Mail](https://www.zoho.com/mail/login.html)
  2. Acesse **Configurações** ​
  3. Navegue até **[Mail Accounts (Contas de e-mail)](https://mail.zoho.com/zm/#settings/all/mailaccounts) **e clique no respectivo endereço de e-mail na lista à esquerda.
  4. Na seção **SMTP** , desmarque a opção **‘Save Sent Mail Copy’ (Salvar cópia de e-mail enviado)** para não salvar os e-mails enviados usando a configuração smtp.zoho.com na pasta Sent (Enviados).  
![Configurações SMTP](https://www.zohowebstatic.com/sites/zweb/images/mail/smtp1.jpg)

## IMAP – Introdução

IMAP e POP3 são protocolos que permitem o download de mensagens de e-mail do servidor do Zoho Mail e o acesso com os clientes de e-mail desktop, como o Outlook/ Mac Mail, e/ou aplicativos móveis de clientes de e-mail iPhone/Android. O Zoho Mail pode ser configurado em qualquer cliente de e-mail IMAP padrão, usando as configurações de servidor IMAP e SMTP.

O IMAP é mais recente que o POP e permite sincronização bidirecional entre os clientes de e-mail e sua conta do [Zoho Mail](https://www.zoho.com/pt-br/mail/). O IMAP é recomendado quando você quer acessar a mesma conta de e-mail em vários clientes.

## Habilitar o acesso IMAP

### Para habilitar o acesso IMAP para sua conta de e-mail:

  1. Faça login no [Zoho Mail](https://www.zoho.com/mail/login.html)
  2. Acesse **Configurações** ​
  3. Navegue até **[Mail Accounts (Contas de e-mail)](https://mail.zoho.com/zm/#settings/all/mailaccounts) **e clique no respectivo endereço de e-mail na lista à esquerda.
  4. Na seção **IMAP** , marque a opção **IMAP Access (Acesso IMAP)**.  
​![imap](https://www.zohowebstatic.com/sites/zweb/images/mail/help/imap1.jpg)
  5. Você também pode ativar **Auto-Expunge (Auto-exclusão)** e configurar as **Folder Settings (Configurações da pasta)** .
  6. Clique em **Save (Salvar)**.

## Detalhes do servidor IMAP do Zoho Mail

Você pode configurar sua conta Zoho Mail em qualquer cliente IMAP padrão com a configuração abaixo.

**Configurações do servidor de entrada**(Usuários pessoais com um endereço de e-mail,****_nomedousuario_**@zoho.com):**

Nome do servidor de entrada: **imap.zoho.com**  
Porta: **993**  
Requer SSL: **Sim**  
Nome de usuário: **username@zoho.com**

**Configurações do servidor de entrada**(Usuários de organizações, com endereço de e-mail de domínio,**seunome** @**_seudominio.com_):**

Nome do servidor de entrada: **imappro.zoho.com**  
Porta: **993**  
Requer SSL: **Sim**  
Nome de usuário: **you@yourdomain.com**

**Configurações do servidor de saída:**(Usuários pessoais com um endereço de e-mail como,****_nome de usuário_**@zoho.com):**

Nome do servidor de saída: **smtp.zoho.com**  
Porta: **465** com **SSL** _ou_  
Porta: **587** com **TLS**  
Requer autenticação: **Sim**

**Configurações do servidor de entrada**(Usuários de organizações, com endereço de e-mail de domínio,**seunome** @**_seudominio.com_):**

Nome do servidor de saída: **smtppro.zoho.com**  
Porta: **465** com **SSL** _ou_  
Porta: **587** com **TLS**  
Requer autenticação: **Sim**

**Nome de usuário:** Digite seu nome de usuário Zoho ou seu endereço completo do Zoho Mail. Se o seu domínio estiver hospedado no Zoho, seu endereço de e-mail será no formato **seunome@seudominio.com**.  
**Endereço de e-mail:** Insira seu e-mail do Zoho Mail. Se o seu domínio estiver hospedado no Zoho, seu endereço de e-mail será no formato **seunome@seudominio.com**.  
**Senha:** Digite a senha da sua conta Zoho. (Você pode exigir uma [senha específica do aplicativo](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html#alink5) se a autenticação de dois fatores estiver ativada).

## Configurações de exibição de pastas para IMAP

Uma grande caixa postal com muitas pastas pode ser trabalhosa para visualizar e sincronizar e-mails em clientes IMAP. Para otimizar o desempenho do seu cliente IMAP, você pode escolher as pastas que deseja sincronizar com o IMAP , através das etapas abaixo:

  1. Faça login no [Zoho Mail](https://www.zoho.com/mail/login.html)
  2. Acesse **Configurações** ​
  3. Navegue até **[Mail Accounts (Contas de e-mail)](https://mail.zoho.com/zm/#settings/all/mailaccounts) **e clique no respectivo endereço de e-mail na lista à esquerda.
  4. Na seção Acesso **IMAP** , clique em **Launch folder settings (Iniciar configurações de pastas agora).**  
![configurações de pastas](https://www.zohowebstatic.com/sites/zweb/images/mail/help/imap2.jpg)
  5. Selecione as pastas que você deseja visualizar nos clientes IMAP.  
![configurações de pastas](https://www.zohowebstatic.com/sites/zweb/images/mail/help/imap3.jpg)

Observação:

  1. Apenas as pastas selecionadas aqui estarão disponíveis nos clientes IMAP que você usa.
  2. As pastas compartilhadas com você podem ser visualizadas em clientes IMAP desktop e em telefones celulares.
  3. O cliente Thunderbird tem suporte às opções de leitura e gravação no [compartilhamento de pastas](https://www.zoho.com/mail/help/folder-sharing.html) no Zoho Mail. [Saiba mais.](https://www.zoho.com/mail/help/thunderbird-imap-access.html#alink4)

## Opções de exclusão IMAP

Quando você exclui um e-mail ou o movimenta para outra pasta no seu cliente IMAP, o e-mail será excluído ou movido para outra pasta com base em suas configurações de IMAP. Para fazer essas alterações imediatamente em sua conta IMAP, você pode ativar a opção ‘Excluir imediatamente’, conforme as etapas abaixo.

  1. Faça login no [Zoho Mail](https://www.zoho.com/mail/login.html)
  2. Acesse **Configurações** ​
  3. Navegue até **[Mail Accounts (Contas de e-mail)](https://mail.zoho.com/zm/#settings/all/mailaccounts) **>> Configure IMAP (Configurar IMAP)
  4. Na seção IMAP, selecione a opção desejada de exclusão para IMAP 
     * Marcar **Auto-exclusão de e-mails** – Isso irá remover as mensagens do servidor do Zoho Mail quando você excluir/ mover e-mails no cliente IMAP.  
![eliminação](https://www.zohowebstatic.com/sites/zweb/images/mail/help/imap4.jpg)
     * Desmarcar **Auto-exclusão de e-mails** – Essa opção não irá excluir os e-mails, exceto se eles forem excluídos manualmente do cliente IMAP.
  5. Clique em **Save (Salvar)**.

## Solução de problemas de configuração IMAP

### Não é possível efetuar login em clientes IMAP

Caso você tenha ativado a Autenticação de dois fatores em sua conta, é necessário gerar e usar a [senha específica do aplicativo](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html#alink5) no cliente IMAP.

No caso de um usuário de login centralizado (login através do Google Apps/ Gmail/ Facebook etc.), talvez você não tenha uma senha exclusiva no Zoho para a sua conta de e-mail e, portanto, será necessário [gerar uma senha para sua conta](https://www.zoho.com/mail/help/login-to-zoho.html#alink4). Não é possível entrar usando sua conta externa POP/ IMAP/ Active Sync.

### Acesso IMAP não habilitado

Você precisa ter o acesso IMAP habilitado para sua conta, antes de configurar o e-mail IMAP em outros clientes de e-mail. Consulte [esta seção](https://www.zoho.com/pt-br/mail/help/imap-access.html#EnableIMAP) para obter instruções.  
No caso de um usuário de organização, verifique com o administrador se o acesso IMAP é permitido para a sua conta com base nas [políticas de e-mail](https://www.zoho.com/mail/help/adminconsole/email-policy.html#a5).

### Contas de login SAML

Para organizações que usam autenticação SAML, os usuários precisam gerar e usar a [senha específica do aplicativo](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html#alink5) para configurar o Zoho Mail como uma conta IMAP em outros clientes de e-mail.

Observação:Para os usuários recém-inscritos (plano gratuito), o recurso de acesso POP não estará disponível. Consulte [aqui](https://www.zoho.com/mail/help/adminconsole/subscription.html#alink0) para obter mais detalhes.
