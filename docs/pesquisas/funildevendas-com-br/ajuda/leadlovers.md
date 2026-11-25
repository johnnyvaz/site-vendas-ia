# LeadLovers

- **URL:** https://www.funildevendas.com.br/ajuda/leadlovers/
- **Data:** 2025-07-29T21:21:10
- **Modificado:** 2025-07-29T21:21:33

---

Recebendo lead do Lead Lovers

Integração que visa criar oportunidade no Funil de Vendas CRM quando o lead se cadastra em um formulário do Lead Lovers.

* Esta integração funciona com os campos padrões do lead que vem do LeadLovers: e-Mail, Nome, Telefone, Empresa, Cidade, Estado

## No Funil de Vendas

Pela conta do Administrador entre em **Configurações > Integrações > Entrada de dados**

[![](https://downloads.intercomcdn.com/i/o/161587344/123f2ba2411c3cd630a3c9b7/image.png?expires=1753825500&signature=125a66ee96ff47eb74a8ae2243cbf66aa6581478cb3782d125ad94786d66b855&req=dSYmE8F5noVbFb4f3HP0gASBiOU5eXarQM9QiXo7NRQttbveKfSFa0nzNoSp%0AQ%2Fz8aahJlMKnrrKjsA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/161587344/123f2ba2411c3cd630a3c9b7/image.png?expires=1753825500&signature=125a66ee96ff47eb74a8ae2243cbf66aa6581478cb3782d125ad94786d66b855&req=dSYmE8F5noVbFb4f3HP0gASBiOU5eXarQM9QiXo7NRQttbveKfSFa0nzNoSp%0AQ%2Fz8aahJlMKnrrKjsA%3D%3D%0A)

Copie e cole os valores das variáveis formando o seguinte link  
​

IntegrationKey**= IntegrationKey**  
Code_User = **Vendedor**  
Code_Funil = **Funil**  
Code_Step = **Etapa**  
Code_Channel = **Canal de Venda**

## Endereço de envio para o Funil de Vendas
    
    
    https://leads.funildevendas.com.br/Integrations/LeadLovers/Receive/?IntegrationKey=**IntegrationKey** &Code_User=**Vendedor** &Code_Funil=**Funil** &Code_Step=**Etapa** &Code_Channel=**Canal de Venda** &emailNotification=**Email do usuário para ser notificado** &Title_Opportunity=TitulodaOportunidade

**Copie o link substituindo os valores em negrito pelos valores apresentados na tela de Configurações.**

## Exemplo:
    
    
    https://leads.funildevendas.com.br/Integrations/LeadLovers/Receive/?**IntegrationKey** =f5bf6251-3f74-4je0-5821-eed7a344bd20&**Code_User** =16260&**Code_Funil** =6633&**Code_Step** =31665&**Code_Channel** =60118&emailNotification=email@funildevendas.com.br&Title_Opportunity=Oportunidade lead lovers

*Insira na variável `emailNotification` o E-mail de quem receberá a notificação

*Insira na variável `Title_Opportunity` o Título da oportunidade que será registrada no Funil de Vendas™ CRM.

## No Lead Lovers

Crie um Gatilho Inteligente para realizar a ação de envio para o Funil de Vendas™ CRM, siga os passos.

[![](https://downloads.intercomcdn.com/i/o/318737418/730de570ab00edb1f1499255/Captura+de+Tela+2021-03-31+a%CC%80s+17.11.20.png?expires=1753825500&signature=41432a7b8d147d062121c7186ecac30db978c3bd6213e4d753570b8d317d48d8&req=dyEvEcp5mYBXFb4f3HP0gKYK%2BUh8xb0W0htmafYXBDbScjBKfM2Om4e4XITv%0A%2BWDA3O5x%2BQ46%2BLIsnw%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/318737418/730de570ab00edb1f1499255/Captura+de+Tela+2021-03-31+a%CC%80s+17.11.20.png?expires=1753825500&signature=41432a7b8d147d062121c7186ecac30db978c3bd6213e4d753570b8d317d48d8&req=dyEvEcp5mYBXFb4f3HP0gKYK%2BUh8xb0W0htmafYXBDbScjBKfM2Om4e4XITv%0A%2BWDA3O5x%2BQ46%2BLIsnw%3D%3D%0A)

  1. Clique no [+] para criar o Gatilho e dê um nome

  2. Adicione um filtro para o Gatilho

[![](https://downloads.intercomcdn.com/i/o/318739393/fb7d6f6664b0868ebc5cb2af/Filtro.jpg?expires=1753825500&signature=6c6402b670b2b07441fed81f59fce369b72f0a6f2500632bc1e674a72243ee6d&req=dyEvEcp3nohcFb4f3HP0gDo1ehs5LIsncPp5u2F89azVLTxdo34UPEf%2FVvUD%0AABMbe8hrtD3O97riZw%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/318739393/fb7d6f6664b0868ebc5cb2af/Filtro.jpg?expires=1753825500&signature=6c6402b670b2b07441fed81f59fce369b72f0a6f2500632bc1e674a72243ee6d&req=dyEvEcp3nohcFb4f3HP0gDo1ehs5LIsncPp5u2F89azVLTxdo34UPEf%2FVvUD%0AABMbe8hrtD3O97riZw%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/318739702/aae706261fc22d8822ef372b/Captura+de+Tela+2021-03-31+a%CC%80s+17.17.42.png?expires=1753825500&signature=e401c19d6584b1dead7d9b0e647af6c455aeb2dafec02647706f7fc13d154e47&req=dyEvEcp3moFdFb4f3HP0gLgUkUR2vVEWIyIgyqcdmTHa%2B7e0o0ZdMMN3Xnoq%0An0UBRff0ILKRwumguA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/318739702/aae706261fc22d8822ef372b/Captura+de+Tela+2021-03-31+a%CC%80s+17.17.42.png?expires=1753825500&signature=e401c19d6584b1dead7d9b0e647af6c455aeb2dafec02647706f7fc13d154e47&req=dyEvEcp3moFdFb4f3HP0gLgUkUR2vVEWIyIgyqcdmTHa%2B7e0o0ZdMMN3Xnoq%0An0UBRff0ILKRwumguA%3D%3D%0A)

3\. Selecione as opções

Tipo de Filtro: Leads que estão na Máquina/funil/sequência

Máquina: Escolha

Funil: Escolha

Sequência: Escolha

4\. Crie a ação conforme a imagem

[![](https://downloads.intercomcdn.com/i/o/318741211/dff70187558a5cc03b6805a8/acao.jpg?expires=1753825500&signature=5e0a267098543fc8b3f417637c14d14ae31b6aa9574dfd4b4579c60bb1a54044&req=dyEvEc1%2Fn4BeFb4f3HP0gHZISUzv1CakwoYsWsPBYYtzXwXXTd4gknfGYU%2F5%0AgSp8TVG1OYNVLH18kQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/318741211/dff70187558a5cc03b6805a8/acao.jpg?expires=1753825500&signature=5e0a267098543fc8b3f417637c14d14ae31b6aa9574dfd4b4579c60bb1a54044&req=dyEvEc1%2Fn4BeFb4f3HP0gHZISUzv1CakwoYsWsPBYYtzXwXXTd4gknfGYU%2F5%0AgSp8TVG1OYNVLH18kQ%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/318741870/842c1eb2a7a996a7072110a3/Acao2.jpg?expires=1753825500&signature=9dfac277e020490497bcdafb08f5cad9d926563140a62feb69c86e98d0c17fcd&req=dyEvEc1%2FlYZfFb4f3HP0gCcLolo3joeHR7Gzln2rA2UN%2Fh3SqH8kULOwiE1q%0ANDiJpWKaA2sgiJQBBQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/318741870/842c1eb2a7a996a7072110a3/Acao2.jpg?expires=1753825500&signature=9dfac277e020490497bcdafb08f5cad9d926563140a62feb69c86e98d0c17fcd&req=dyEvEc1%2FlYZfFb4f3HP0gCcLolo3joeHR7Gzln2rA2UN%2Fh3SqH8kULOwiE1q%0ANDiJpWKaA2sgiJQBBQ%3D%3D%0A)

Configure as opções

Tipo de Ação: Executar HttpPost Simples

URL: Cole a sua URL aqui  
Tipo de comunicação: POST

Feito!

Espero que tenha gostado.
