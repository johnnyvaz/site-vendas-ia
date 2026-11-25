# Integração com SMS Mobizon

- **URL:** https://www.funildevendas.com.br/ajuda/integracao-com-sms-mobizon/
- **Data:** 2025-07-30T21:03:33
- **Modificado:** 2025-09-08T13:35:56

---

Permite disparar SMS para o lead com www.mobizon.com.br

Esta integração com <https://mobizon.com.br/> permite ser disparado um SMS para os leads via Automação do Funil de Vendas™ CRM.

## Requisitos

  1. Conta Funil de Vendas™ CRM ([www.funildevendas.com.br](https://www.funildevendas.com.br/))

  2. Ativação das Automações ([www.funildevendas.com.br/automacao](https://www.funildevendas.com.br/automacao))

  3. Conta + Crédito na plataforma Mobizon (<https://mobizon.com.br/>)

## Configurações da integração e automação

Configure o link + texto SMS

**Exemplo**
    
    
    https://leads.funildevendas.com.br/integrations/Mobizon/?text=Sua Mensagem aqui&key=ChaveMobizon

**Chave de integração no Mobizon**

  1. Logue-se na conta

  2. Clique em Configurações

  3. Configurações da API (Conforme imagem)

  4. Copie a Chave API

[![](https://downloads.intercomcdn.com/i/o/828987082/9291b54a482b977737650fb0/Captura+de+Tela+2023-09-12+a%CC%80s+17.19.32.png?expires=1753911000&signature=d4eaa4cce64f97e5601f009329eace34cb9517fcb327a80a50436e91a2154af1&req=fCIvH8F5nYldFb4f3HP0gA56JpaP06NsrVeX15NJvdrhcOgU0EgLINrXmSTu%0ApNSomHrkS3YK3znfeQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/828987082/9291b54a482b977737650fb0/Captura+de+Tela+2023-09-12+a%CC%80s+17.19.32.png?expires=1753911000&signature=d4eaa4cce64f97e5601f009329eace34cb9517fcb327a80a50436e91a2154af1&req=fCIvH8F5nYldFb4f3HP0gA56JpaP06NsrVeX15NJvdrhcOgU0EgLINrXmSTu%0ApNSomHrkS3YK3znfeQ%3D%3D%0A)

Insira o Texto + Chave no link
    
    
    https://leads.funildevendas.com.br/integrations/Mobizon/?text=Sua Mensagem aqui&key=ChaveMobizon

⚠️ **PS: O serviço SMS cobra por sessão de até 120 caracteres e não aceita acentos**

## Com este link siga os passos no Funil de Vendas™ CRM

  1. Configure uma automação

  2. Crie o gatilho Hook

  3. Insira este link na url

  4. Em usuário e senha pode inserir qualquer informação ex: User | 123

[![](https://downloads.intercomcdn.com/i/o/828992337/ac04645d3b219dc59088f3db/Captura+de+Tela+2023-09-12+a%CC%80s+17.27.45.png?expires=1753911000&signature=77197c499d2762675b3cf5780ce470db274019834a8aac81a1ee32683518ca5b&req=fCIvH8B8noJYFb4f3HP0gA6heEgKLp4BQ%2FdwVovKV7PipU2aQFKcgFgu7zcS%0A0ylAh%2BUBqq0KpNploQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/828992337/ac04645d3b219dc59088f3db/Captura+de+Tela+2023-09-12+a%CC%80s+17.27.45.png?expires=1753911000&signature=77197c499d2762675b3cf5780ce470db274019834a8aac81a1ee32683518ca5b&req=fCIvH8B8noJYFb4f3HP0gA6heEgKLp4BQ%2FdwVovKV7PipU2aQFKcgFgu7zcS%0A0ylAh%2BUBqq0KpNploQ%3D%3D%0A)

**Salve e Ative a automação. Pronto!**

Agora toda vez que um lead for inserido do Funil de Vendas, ganho, perdido ou movido de etapa ele receberá um SMS.
