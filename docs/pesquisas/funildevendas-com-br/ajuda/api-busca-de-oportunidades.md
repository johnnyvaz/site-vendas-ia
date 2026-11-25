# Api Busca de Oportunidades

- **URL:** https://www.funildevendas.com.br/ajuda/api-busca-de-oportunidades/
- **Data:** 2026-02-27T15:54:56
- **Modificado:** 2026-02-27T15:54:56

---

## **API de Oportunidades**

### **Busca de oportunidade por código**

**Dados gerais**

**GET:** /api/v2/opportunities/**OPPORTUNITY_CODE**  
**Authorization:** Basic   
**Content-Type:** application/json

**Exemplo:**
    
    
    GET https://app.funildevendas.com.br/api/v2/opportunities/874396

**Retorno:** _{ Exemplo de retorno }_

* * *

### **Busca de oportunidade por telefone de contato**

**Dados gerais**

**GET:** /api/v2/opportunities?**limit** =…&**offset** =…&**contact_phone** =…  
**Host (Sandbox):** app.funildevendas.com.br  
**Authorization:** Basic   
**Content-Type:** application/json

**Exemplo:**
    
    
    GET https://app.funildevendas.com.br/api/v2/opportunities?limit=2&offset=1&contact_phone=1111-1111

**Retorno:** _{ Exemplo de retorno }_

* * *

### **Busca de oportunidade por e-mail de contato**

**Dados gerais**

**GET:** /api/v2/opportunities?**limit** =…&**offset** =…&**contact_mail** =…  
**Host (Sandbox):** app.funildevendas.com.br  
**Authorization:** Basic   
**Content-Type:** application/json

**Exemplo:**
    
    
    GET https://app.funildevendas.com.br/api/v2/opportunities?limit=2&offset=1&contact_mail=teste@teste.com

**Retorno:** _{ Exemplo de retorno }_

* * *

### **Busca de oportunidade por CNPJ de empresa**

**Dados gerais**

**GET:** /api/v2/opportunities?**limit** =…&**offset** =…&**enterprise_document** =…  
**Host (Sandbox):** app.funildevendas.com.br  
**Authorization:** Basic   
**Content-Type:** application/json

**Exemplo:**
    
    
    GET https://app.funildevendas.com.br/api/v2/opportunities?limit=2&offset=1&enterprise_document=63.156.817/0001-73

**Retorno:** _{ Exemplo de retorno }_

* * *

### **Busca de oportunidade por nome de empresa**

**Dados gerais**

**GET:** /api/v2/opportunities?**limit** =…&**offset** =…&**enterprise_name** =…  
**Host (Sandbox):** app.funildevendas.com.br  
**Authorization:** Basic   
**Content-Type:** application/json

**Exemplo:**
    
    
    GET https://app.funildevendas.com.br/api/v2/opportunities?limit=2&offset=1&enterprise_name=TesteSA

**Retorno:** _{ Exemplo de retorno }_

* * *

### **Busca de oportunidade por título**

**Dados gerais**

**GET:** /api/v2/opportunities?**limit** =…&**offset** =…&**title** =…  
**Host (Sandbox):** app.funildevendas.com.br  
**Authorization:** Basic   
**Content-Type:** application/json

**Exemplo:**
    
    
    GET https://app.funildevendas.com.br/api/v2/opportunities?limit=2&offset=1&title=OppTeste

**Retorno:** _{ Exemplo de retorno }_

* * *

## **Exemplo de retorno**
    
    
    {
      "total": "1",
      "offset": "1",
      "limit": "10",
      "results": [
        {
          "code": 874390,
          "title": "Oportunidade de Teste",
          "contact": {
            "code": 974924,
            "name": "Contato de Teste",
            "email": "contato@teste.com.br",
            "phone": "(11) 2345-6789",
            "smartphone": "(11) 94567-8901",
            "role": null,
            "document": "",
            "additional_emails": [],
            "additional_phones": [],
            "company": {
              "code": 824601,
              "name": "Empresa de Teste",
              "segment": "company segment",
              "document": "75.162.227/0001-32",
              "state_document": "809.186.814.906",
              "address": "Av. Paulista, 1",
              "latitude": 0.0,
              "longitude": 0.0,
              "custom_fields": {
                "tituloCampoCustomCompany1": "valorCampoCustomCompany1"
              }
            },
            "custom_fields": {
              "tituloCampoCustomContact1": "valorCampoCustomContact1"
            }
          },
          "owner_vendor": {
            "code": 3,
            "name": "Vendedor Teste",
            "email": "vendedor@teste.com.br"
          },
          "shared_vendors": [],
          "pipeline": {
            "code": 1,
            "name": "Funil de Vendas"
          },
          "step": {
            "code": 1,
            "name": "Alimentar"
          },
          "sales_channel": {
            "code": 6,
            "name": "GOOGLE"
          },
          "products": [],
          "logbook": [],
          "value": 334.01,
          "created_at": "2018-07-24T20:02:17",
          "updated_at": "2018-07-27T12:14:26",
          "closing_expectation": "0001-01-01T00:00:00",
          "closed_at": "2018-07-27T12:14:25",
          "status": 1,
          "answer": "ERA MEU NETWORK",
          "custom_fields": {
            "tituloCampoCustomOpp1": "valorCampoCustomOpp1"
          }
        }
      ]
    }

* * *

## **Lista de objetos**

### **Objeto Opportunity**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código da oportunidade  
title | String | Título da oportunidade  
contact | Contact | Objeto de contato  
owner_vendor | Vendor | Vendedor dono da oportunidade  
shared_vendors | Vendor | Array de vendedores/gestores que a oportunidade está compartilhada  
pipeline | Pipeline | Funil de Vendas onde está a oportunidade  
step | PipelineStep | Passo do Funil de Vendas onde está a oportunidade  
sales_channel | SalesChannel | Canal de vendas de origem da oportunidade  
products | Product[] | Produtos da oportunidade  
estimed_value | Decimal | Valor estimado da oportunidade  
value | Decimal | Valor da oportunidade  
created_at | DateTime | Data de criação da oportunidade  
updated_at | DateTime | Data de atualização da oportunidade  
closing_expectation | DateTime | Data de expectativa de fechamento  
closed_at | DateTime | Data de fechamento da oportunidade  
status | OpportunittyStatus | Status da oportunidade  
answer | String | Resposta do fechamento da oportunidade  
custom_fields | Dictionary | Campos personalizados da oportunidade  
  
### **Objeto Contact**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código do contato  
name | String | Nome do contato  
email | String | E-mail do contato  
phone | String | Telefone do contato  
smartphone | String | Celular do contato  
role | String | Cargo do contato  
document | String | CPF do contato  
additional_emails | String[] | E-mails adicionais separados por “,”  
additional_phones | String[] | Telefones adicionais separados por “,”  
company | Company | Empresa do contato  
custom_fields | Dictionay | Campos personalizados do contato  
  
### **Objeto Company**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código da empresa  
name | String | Nome da empresa  
segment | String | Segmento da empresa  
document | String | CNPJ da empresa  
state_document | String | IE da empresa  
address | String | Endereço da empresa  
latitude | Decimal | Latitude da empresa  
longitude | Decimal | Longitude da empresa  
custom_fields | Dictionary | Campos personalizados da empresa  
  
### **Objeto Vendor**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código do vendedor  
name | String | Nome do vendedor  
Email | String | E-mail do vendedor  
  
### **Objeto Pipeline**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código do Funil de Vendas  
name | String | Nome do Funil de Vendas  
  
### **Objeto PipelineStep**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código da etapa do Funil de Vendas  
name | String | Nome da etapa do Funil de Vendas  
  
### **Objeto SalesChannel**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código do canal de vendas  
name | String | Nome do canal de vendas  
  
### **Objeto Product**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int | Código do produto  
name | String | Nome do produto  
price | Decimal | Preço do produto  
quantity | Int | Quantidade do produto  
  
### **Enumerador OpportunittyStatus**

**Nome** | **Código** | **Descrição**  
---|---|---  
Open | 0 | Oportunidade em aberto  
Wins | 1 | Oportunidade ganha  
Lost | 2 | Oportunidade perdida  
  
* * *

## **Autenticação**

O Funil de Vendas responde às chamadas da API através de um token do tipo **Basic** , gerado a partir do usuário e senha informados no cabeçalho **Authorization**.

**Exemplo:**
    
    
    POST /api/v2/opportunities HTTP/1.1
    Host: https://app.funildevendas.com.br
    Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==
    Content-Type: application/json

* * *

## **Ambientes**

  * **Produção:** https://app.funildevendas.com.br

## **Códigos dos status de retornos**

  * **2xx** – Sucesso
  * **4xx** – Erros do cliente
  * **5xx** – Erros do servidor
