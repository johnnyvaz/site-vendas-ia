# Hotmart

- **URL:** https://www.funildevendas.com.br/ajuda/hotmart/
- **Data:** 2025-07-29T21:25:37
- **Modificado:** 2025-07-29T21:26:27

---

Boleto gerado no Hotmart cria oportunidade no Funil de Vendas

Integração que visa criar oportunidade no Funil de Vendas CRM quando o cliente **gera um boleto** no Hotmart.

## No Funil de Vendas

Pela conta do Administrador entre em **Configurações > Integrações > Entrada de dados**

[![](https://downloads.intercomcdn.com/i/o/161587344/123f2ba2411c3cd630a3c9b7/image.png?expires=1753826400&signature=2ad4c43d720c84a1118c6d75ea2c24884a5e19ff24e5ba6eda4f6fd8a675ce6c&req=dSYmE8F5noVbFb4f3HP0gASBiOU5enerQM9QiXo7NRQsKvV7qNLzhYBg2oC6%0ADR2q9O5JnODkd3MIuw%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/161587344/123f2ba2411c3cd630a3c9b7/image.png?expires=1753826400&signature=2ad4c43d720c84a1118c6d75ea2c24884a5e19ff24e5ba6eda4f6fd8a675ce6c&req=dSYmE8F5noVbFb4f3HP0gASBiOU5enerQM9QiXo7NRQsKvV7qNLzhYBg2oC6%0ADR2q9O5JnODkd3MIuw%3D%3D%0A)

Copie e cole os valores das variáveis formando o seguinte link  
​

IntegrationKey**= IntegrationKey**  
Code_User = **Vendedor**  
Code_Funil = **Funil**  
Code_Step = **Etapa**  
Code_Channel = **Canal de Venda**

## Endereço de envio para o Funil de Vendas
    
    
    https://leads.funildevendas.com.br/Integrations/Hotmart/?IntegrationKey=**IntegrationKey** &Code_User=**Vendedor** &Code_Funil=**Funil** &Code_Step=**Etapa** &Code_Channel=**Canal de Venda** &emailNotification=**Email do usuário para ser notificado**

**Copie o link substituindo os valores em negrito pelos valores apresentados na tela de Configurações.**

## Exemplo:
    
    
    https://leads.funildevendas.com.br/Integrations/Hotmart/?**IntegrationKey** =f5bf6251-3f74-4je0-5821-eed7a344bd20&**Code_User** =16260&**Code_Funil** =6633&**Code_Step** =31665&**Code_Channel** =60118&emailNotification=email@funildevendas.com.br

*Insira na variável `emailNotification` o E-mail de quem receberá a notificação

**Crie um campo personalizado chamado (Hotmart) na Aba Oportunidades para receber os dados adicionais:**

  1. Configurações > Personalizar campos

  2. Aba Oportunidades

  3. Tipo de campo “Texto área”

  4. Nome do Campo: Hotmart

[![](https://downloads.intercomcdn.com/i/o/252054991/0a915fcac03a28778fa3f239/Campo.jpg?expires=1753826400&signature=9a9f12d2e469e5e70c26c1c4776057071cff0197919c7742a828c1595ebd5e93&req=diUlFsx6lIheFb4f3HP0gHZR6YljbqvZTsgccGZKmFxP6qImjioWX0zgSLN7%0A1qD8iVFvmuG0bE0YpQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/252054991/0a915fcac03a28778fa3f239/Campo.jpg?expires=1753826400&signature=9a9f12d2e469e5e70c26c1c4776057071cff0197919c7742a828c1595ebd5e93&req=diUlFsx6lIheFb4f3HP0gHZR6YljbqvZTsgccGZKmFxP6qImjioWX0zgSLN7%0A1qD8iVFvmuG0bE0YpQ%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/252055030/29c053d2f9a2a0c6615a7546/Campo2.jpg?expires=1753826400&signature=9bc0c5e9a18345f9281efabb5300ada281c3680293de6fed72136ce6dc2563a9&req=diUlFsx7nYJfFb4f3HP0gL%2Bg5lrRHW65JggVXIdbejDzPZBq%2BkVP6ovqX3VV%0ARUXlX%2F1tix0cpi1IoA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/252055030/29c053d2f9a2a0c6615a7546/Campo2.jpg?expires=1753826400&signature=9bc0c5e9a18345f9281efabb5300ada281c3680293de6fed72136ce6dc2563a9&req=diUlFsx7nYJfFb4f3HP0gL%2Bg5lrRHW65JggVXIdbejDzPZBq%2BkVP6ovqX3VV%0ARUXlX%2F1tix0cpi1IoA%3D%3D%0A)

## No Hotmart

Entre em sua conta do Hotmart e siga os passos:

  1. Acesse o link do Webhook <https://app-vlc.hotmart.com/tools/webhook>

  2. Crie no botão de ( + ) um novo Hook escolhendo a Boleto Impresso, Selecionando o produto que deseja e colando o link gerado (Envio para o CRM).

[![](https://downloads.intercomcdn.com/i/o/252000767/e45f210424a76a520f5bc008/Captura+de+Tela+2020-10-02+a%CC%80s+13.07.54.png?expires=1753826400&signature=e53e01a9ba4c19c29537f87b5390dd6b8e7f3dbeee4c1a96d290b3cdbba20392&req=diUlFsl%2BmodYFb4f3HP0gERfcw1YcOA31lBB4lPZ6sWgcdMnXdzEXxo7YspP%0ARh6ZODrYowHTLBMyJA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/252000767/e45f210424a76a520f5bc008/Captura+de+Tela+2020-10-02+a%CC%80s+13.07.54.png?expires=1753826400&signature=e53e01a9ba4c19c29537f87b5390dd6b8e7f3dbeee4c1a96d290b3cdbba20392&req=diUlFsl%2BmodYFb4f3HP0gERfcw1YcOA31lBB4lPZ6sWgcdMnXdzEXxo7YspP%0ARh6ZODrYowHTLBMyJA%3D%3D%0A)

3\. Salve

4\. Pronto. Agora quando alguém comprar seu infoproduto por meio de boletos, o Funil de Vendas criará automaticamente uma oportunidade.

## Informações Salvas no Funil de Vendas

[![](https://downloads.intercomcdn.com/i/o/252055954/a764e77a674396942f406c3b/Captura+de+Tela+2020-10-02+a%CC%80s+15.49.43.png?expires=1753826400&signature=70752b9945bc76f4d550afd5d109eaf5778c90fbbe64779fca376a2537939e31&req=diUlFsx7lIRbFb4f3HP0gEp441xDibPc6chQNbqsFDSOpKd6SS%2Fv%2BPan1xf7%0A4C7KTaerQKMXExGJBw%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/252055954/a764e77a674396942f406c3b/Captura+de+Tela+2020-10-02+a%CC%80s+15.49.43.png?expires=1753826400&signature=70752b9945bc76f4d550afd5d109eaf5778c90fbbe64779fca376a2537939e31&req=diUlFsx7lIRbFb4f3HP0gEp441xDibPc6chQNbqsFDSOpKd6SS%2Fv%2BPan1xf7%0A4C7KTaerQKMXExGJBw%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/252055990/971fc6ab9d479c2e6abb0b00/Captura+de+Tela+2020-10-02+a%CC%80s+15.49.53.png?expires=1753826400&signature=4a9d20352eb02e1883ca23a4ef9663d3e05d1ed7993926c65a6cc650b25fa14c&req=diUlFsx7lIhfFb4f3HP0gBc%2FVALZhKOeJl2YkLDexQkOt%2Fpq2pMxfEDPwAQM%0AOsb3nmII2GoidN5WCA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/252055990/971fc6ab9d479c2e6abb0b00/Captura+de+Tela+2020-10-02+a%CC%80s+15.49.53.png?expires=1753826400&signature=4a9d20352eb02e1883ca23a4ef9663d3e05d1ed7993926c65a6cc650b25fa14c&req=diUlFsx7lIhfFb4f3HP0gBc%2FVALZhKOeJl2YkLDexQkOt%2Fpq2pMxfEDPwAQM%0AOsb3nmII2GoidN5WCA%3D%3D%0A)

Boa sorte 😉
