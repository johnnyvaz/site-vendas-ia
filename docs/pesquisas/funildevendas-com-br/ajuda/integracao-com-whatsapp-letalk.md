# Integração com WhatsApp (Letalk)

- **URL:** https://www.funildevendas.com.br/ajuda/integracao-com-whatsapp-letalk/
- **Data:** 2025-07-30T21:01:58
- **Modificado:** 2025-07-30T21:01:58

---

Permite disparar Mensagens por WhatsApp pelo Letalk usando a Automação

Esta integração com <https://www.letalk.com.br/> permite disparar mensagens Whuatsapp para os leads via Automação do Funil de Vendas™ CRM.

## Requisitos

  1. Conta Funil de Vendas™ CRM ([www.funildevendas.com.br](https://www.funildevendas.com.br/))

  2. Ativação das Automações ([www.funildevendas.com.br/automacao](https://www.funildevendas.com.br/automacao))

  3. Conta na plataforma Letalk (<https://letalk.com.br/>)

## Configurações da integração e automação

Configure o link + texto WhatsApp

**Exemplo**
    
    
    https://leads.funildevendas.com.br/integrations/letalk/?**LinkHook=https://w.letalk.com.br/becfba58-e31f-4abc-9133-fc42f2af665e/lead**

**Chave de integração no Letalk**

  1. Logue-se na conta

  2. Clique em Integrações

  3. Nova Integração e escolha a opção Webhook Customizado

  4. Configura a mensagem

[![](https://downloads.intercomcdn.com/i/o/828999431/d7e5b5335328dd538ebc949d/Captura+de+Tela+2023-09-12+a%CC%80s+17.39.16.png?expires=1753911000&signature=1ca37b541887bab6f91014b397c03d3448424b4503c86f84c88d8c77bd8eb2da&req=fCIvH8B3mYJeFb4f3HP0gGBMZC%2BeWaIIPhfjQw%2BUKKdHJfdbjW9Itq%2BqYxGZ%0AvdQ%2B9RB%2FvXMacWr6ow%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/828999431/d7e5b5335328dd538ebc949d/Captura+de+Tela+2023-09-12+a%CC%80s+17.39.16.png?expires=1753911000&signature=1ca37b541887bab6f91014b397c03d3448424b4503c86f84c88d8c77bd8eb2da&req=fCIvH8B3mYJeFb4f3HP0gGBMZC%2BeWaIIPhfjQw%2BUKKdHJfdbjW9Itq%2BqYxGZ%0AvdQ%2B9RB%2FvXMacWr6ow%3D%3D%0A)

Após salvar, copie a URL da Mensagem e cole após a variável LinkHook.
    
    
    ​https://leads.funildevendas.com.br/integrations/letalk/?**LinkHook** =https://w.letalk.com.br/becfba58-e31f-4abc-9133-fc42f2af665e/lead

## Com este link siga os passos no Funil de Vendas™ CRM

  1. Configure uma automação

  2. Crie o gatilho Hook

  3. Insira este link na url

  4. Em usuário e senha pode inserir qualquer informação ex: User | 123

[![](https://downloads.intercomcdn.com/i/o/828992337/ac04645d3b219dc59088f3db/Captura+de+Tela+2023-09-12+a%CC%80s+17.27.45.png?expires=1753911000&signature=77197c499d2762675b3cf5780ce470db274019834a8aac81a1ee32683518ca5b&req=fCIvH8B8noJYFb4f3HP0gA6heEgKLp4BQ%2FdwVovKV7PipU2aQFKcgFgu7zcS%0A0ylAh%2BUBqq0KpNploQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/828992337/ac04645d3b219dc59088f3db/Captura+de+Tela+2023-09-12+a%CC%80s+17.27.45.png?expires=1753911000&signature=77197c499d2762675b3cf5780ce470db274019834a8aac81a1ee32683518ca5b&req=fCIvH8B8noJYFb4f3HP0gA6heEgKLp4BQ%2FdwVovKV7PipU2aQFKcgFgu7zcS%0A0ylAh%2BUBqq0KpNploQ%3D%3D%0A)

**Salve e Ative a automação. Pronto!**

Agora toda vez que um lead for inserido do Funil de Vendas, ganho, perdido ou movido de etapa ele receberá um WhatsApp.
