# Apontar Perda e Ganho do Funil de Vendas para o RD Station

- **URL:** https://www.funildevendas.com.br/ajuda/apontar-perda-e-ganho-do-funil-de-vendas-para-o-rd-station/
- **Data:** 2025-07-29T21:24:18
- **Modificado:** 2025-07-29T21:24:18

---

Integração de ganho e perda – Webhook

Para realizar um integração de ganho e perda do Funil de Vendas CRM para o Rd Station, siga os passos:

**Utilize o Webhook do Funil de Vendas**

  1. Entre em Configurações > Integrações > Webhooks

  2. Novo Webhook

  3. Selecione o Tipo: Oportunidade

  4. Dê um nome para este Webhook

  5. Insira um login e senha de sua aplicação (caso não houver, coloque seu e-mail e senha ADM do Funil de Vendas)

  6. **Insira o link:**_https://leads.funildevendas.com.br/Integrations/RDStation/opportunity/lose/?CODE_OPPORTUNITY=1 &token_rdstation=**TokenPublico**_

  7. Modifique o **TokenPublico** (Insira a informação do Token do RD Station)

  8. Link para pegar o token no RD (<https://app.rdstation.com.br/integracoes/tokens>)

  9. Selecione a opção Ganhar e Perder

  10. Grave o Webhook

[![](https://downloads.intercomcdn.com/i/o/305162294/c3b54c9cdc4a00a002f10b4a/Captura+de+Tela+2021-02-26+a%CC%80s+15.02.45.png?expires=1753826400&signature=2767dea9c5418c4cece058759e502bdb6e0e02434c0468ba19727f73c3c9b87d&req=dyAiF898n4hbFb4f3HP0gK1lekhMJL36wORZRStX1W1LNmh4FYMxQnfQ14HV%0AdMp%2Bk847NcChrREFyA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/305162294/c3b54c9cdc4a00a002f10b4a/Captura+de+Tela+2021-02-26+a%CC%80s+15.02.45.png?expires=1753826400&signature=2767dea9c5418c4cece058759e502bdb6e0e02434c0468ba19727f73c3c9b87d&req=dyAiF898n4hbFb4f3HP0gK1lekhMJL36wORZRStX1W1LNmh4FYMxQnfQ14HV%0AdMp%2Bk847NcChrREFyA%3D%3D%0A)

## Formato de conversão no RD Station

[![](https://downloads.intercomcdn.com/i/o/305163771/b0dee8441b6ddead10873152/Conversao.jpg?expires=1753826400&signature=621c0b371e180d98e35b689dac24230fefc55e052e7de98840b4a1b9bbc3e238&req=dyAiF899moZeFb4f3HP0gAksncT5LBY4fyK5mminZA%2FOLTGS1L91FxEU711p%0AC7qRzzOqsvvJOYBe0g%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/305163771/b0dee8441b6ddead10873152/Conversao.jpg?expires=1753826400&signature=621c0b371e180d98e35b689dac24230fefc55e052e7de98840b4a1b9bbc3e238&req=dyAiF899moZeFb4f3HP0gAksncT5LBY4fyK5mminZA%2FOLTGS1L91FxEU711p%0AC7qRzzOqsvvJOYBe0g%3D%3D%0A)

## Crie fluxos de automação

Utilize no RD Station os dados de conversão do lead para Segmentar e criar fluxos de nutrição.

**Code_Oportunidade** : 5425

**Code_User** : 34

**Email_User** : [vendas1@funildevendas.com.br](mailto:vendas1@funildevendas.com.br)

**Etapa_Funil** : Negociações

**Funil** : Novas Contas

**Motivo** : TENTAMOS DIVERSAS VEZES CONTATO

**Status_Funil** : Perda

**Identificador** : Status_FunildeVendas_CRM

**Email** : [diogoc@gmail.com](mailto:diogoc@gmail.com)

**Nome** : Diogo Ro

**titulo_oportunidade** : Agendamento Demonstração | Site Funil de Vendas

**canal_de_venda** : Google Orgânico

**codigo_canal** : 12

**Exemplo: Automação para Marcar uma Venda no Rd Station**

[![](https://downloads.intercomcdn.com/i/o/305164724/486926fa96e10f020858dfe0/Captura+de+Tela+2021-02-26+a%CC%80s+15.08.14.png?expires=1753826400&signature=f224185e7bb743e215cea20998d8a7dc457e0af9dff22e000ea1fa42fe2554d6&req=dyAiF896moNbFb4f3HP0gIWjWbN4%2BbIymlg0NKwvvJP67iif8f2KE6%2BjwPsy%0AMc9VcFqA%2BNoWZJC5gg%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/305164724/486926fa96e10f020858dfe0/Captura+de+Tela+2021-02-26+a%CC%80s+15.08.14.png?expires=1753826400&signature=f224185e7bb743e215cea20998d8a7dc457e0af9dff22e000ea1fa42fe2554d6&req=dyAiF896moNbFb4f3HP0gIWjWbN4%2BbIymlg0NKwvvJP67iif8f2KE6%2BjwPsy%0AMc9VcFqA%2BNoWZJC5gg%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/305166757/a57ac325068877e288258625/Captura+de+Tela+2021-02-26+a%CC%80s+15.12.44.png?expires=1753826400&signature=278d5f49b153929d74d8b35acc7b33a3c2af55ac690c322eb6d72708de28d236&req=dyAiF894moRYFb4f3HP0gEtXtKCfKmFBAdjO2zawRVkalLnHDN5NwYngn6we%0AUxdn8P0ufs276X4Nmw%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/305166757/a57ac325068877e288258625/Captura+de+Tela+2021-02-26+a%CC%80s+15.12.44.png?expires=1753826400&signature=278d5f49b153929d74d8b35acc7b33a3c2af55ac690c322eb6d72708de28d236&req=dyAiF894moRYFb4f3HP0gEtXtKCfKmFBAdjO2zawRVkalLnHDN5NwYngn6we%0AUxdn8P0ufs276X4Nmw%3D%3D%0A)

**Exemplo: Automação para Nutrir o Lead Perdido**

[![](https://downloads.intercomcdn.com/i/o/305165592/1f05e0ed038d8910f4856b97/Captura+de+Tela+2021-02-26+a%CC%80s+15.10.04.png?expires=1753826400&signature=e538f7f9d7cdacceda246396d2a8e50702a2fca9c21eb59ce7c98dc0bc07fe8b&req=dyAiF897mIhdFb4f3HP0gPv%2B7SHj6gj2rkpn%2BJQWJvCHvdFOlJ0qKh1UwbPO%0Ax%2BmFv9hIOGmqLefPeg%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/305165592/1f05e0ed038d8910f4856b97/Captura+de+Tela+2021-02-26+a%CC%80s+15.10.04.png?expires=1753826400&signature=e538f7f9d7cdacceda246396d2a8e50702a2fca9c21eb59ce7c98dc0bc07fe8b&req=dyAiF897mIhdFb4f3HP0gPv%2B7SHj6gj2rkpn%2BJQWJvCHvdFOlJ0qKh1UwbPO%0Ax%2BmFv9hIOGmqLefPeg%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/305165893/7c773b124d5b40978f4ed31a/Captura+de+Tela+2021-02-26+a%CC%80s+15.10.52.png?expires=1753826400&signature=115fc5744f1b8c2f793a943f71f4a8a5732de8d17dcabf1a9a48898ab42a2bb6&req=dyAiF897lYhcFb4f3HP0gMzF1EPTJeTnAZeO3EA%2BvBqq7yjry7j5lk0EliBP%0AhAFI6Bh8DphMGYwUwg%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/305165893/7c773b124d5b40978f4ed31a/Captura+de+Tela+2021-02-26+a%CC%80s+15.10.52.png?expires=1753826400&signature=115fc5744f1b8c2f793a943f71f4a8a5732de8d17dcabf1a9a48898ab42a2bb6&req=dyAiF897lYhcFb4f3HP0gMzF1EPTJeTnAZeO3EA%2BvBqq7yjry7j5lk0EliBP%0AhAFI6Bh8DphMGYwUwg%3D%3D%0A)

É isto aí… agora bora testar este recurso para criar a sinergia entre Marketing e Vendas.
