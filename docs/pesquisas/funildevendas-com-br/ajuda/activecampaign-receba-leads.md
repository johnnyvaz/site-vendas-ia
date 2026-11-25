# Activecampaign – Receba leads

- **URL:** https://www.funildevendas.com.br/ajuda/activecampaign-receba-leads/
- **Data:** 2025-07-29T21:17:04
- **Modificado:** 2025-07-29T21:17:53

---

Receba os leads do Activecampaing direto no Funil de Vendas

É possível levar os leads do Active Campaing para sua conta do Funil de Vendas.

## Dados integrados

Nome Completo

e-mail

Telefone

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
    
    
    https://leads.funildevendas.com.br/Integrations/ActiveCampaing/?IntegrationKey=**IntegrationKey** &Code_User=**Vendedor** &Code_Funil=**Funil** &Code_Step=**Etapa** &Code_Channel=**Canal de Venda** &email=**Email do usuário para ser notificado**

**Copie o link substituindo os valores em negrito pelos valores apresentados na tela de Configurações.**

## Exemplo:
    
    
    https://leads.funildevendas.com.br/Integrations/ActiveCampaing/?**IntegrationKey** =f8bf6251-3f74-4je0-5821-eed7a344bd20&**Code_User** =16260&**Code_Funil** =6633&**Code_Step** =31665&**Code_Channel** =60118&**Email** =email@funildevendas.com.br

*Insira na variável `email` o E-mail de quem receberá a notificação

## No Active Campaing

  1. Menu > Configurações > Desenvolvedor > [Gerenciar Webhooks](https://yopmail25345.activehosted.com/admin/main.php?action=webhook)

  2. Adicionar um novo Webhook

  3. Escolha a lista, nome e cole sua URL de integração no campo 

  4. Selecione o Tipo: Contato adicionado

  5. Selecione o Iniciar a partir de: Por um contato

[![](https://downloads.intercomcdn.com/i/o/420331196/56905e1f1644c6640a20c688/Captura+de+Tela+2021-11-17+a%CC%80s+11.30.08.png?expires=1753825500&signature=22d3851be3df3b4808fc09b4a5ce7e05293749a864f1b668d1429c369aa1735a&req=cCInFcp%2FnIhZFb4f3HP0gCe%2BUtk8DbZMzv17KxI3VukMMccqKNyPzw30KrSl%0Arfl0W93zpHnQuNqbtQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/420331196/56905e1f1644c6640a20c688/Captura+de+Tela+2021-11-17+a%CC%80s+11.30.08.png?expires=1753825500&signature=22d3851be3df3b4808fc09b4a5ce7e05293749a864f1b668d1429c369aa1735a&req=cCInFcp%2FnIhZFb4f3HP0gCe%2BUtk8DbZMzv17KxI3VukMMccqKNyPzw30KrSl%0Arfl0W93zpHnQuNqbtQ%3D%3D%0A)

**Salve o WebHook!**

* * *

## Exemplo no Funil de Vendas

[![](https://downloads.intercomcdn.com/i/o/420332009/530af29d4241e3b8c3dffeeb/Captura+de+Tela+2021-11-17+a%CC%80s+11.30.54.png?expires=1753825500&signature=83f1a73f9ac5a806e7f7b98d99bf83a2dfb0904cdd46d5fa1b1c1e61febaa2a2&req=cCInFcp8nYFWFb4f3HP0gBFgMpMNntDc%2FotK9%2BXsTzJxmlDe9hv5zeWn5j9L%0AnXN%2Fkvym7bZd%2BXXrZQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/420332009/530af29d4241e3b8c3dffeeb/Captura+de+Tela+2021-11-17+a%CC%80s+11.30.54.png?expires=1753825500&signature=83f1a73f9ac5a806e7f7b98d99bf83a2dfb0904cdd46d5fa1b1c1e61febaa2a2&req=cCInFcp8nYFWFb4f3HP0gBFgMpMNntDc%2FotK9%2BXsTzJxmlDe9hv5zeWn5j9L%0AnXN%2Fkvym7bZd%2BXXrZQ%3D%3D%0A)
