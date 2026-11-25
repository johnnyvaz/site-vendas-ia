# Api Listagem de Oportunidades

- **URL:** https://www.funildevendas.com.br/ajuda/api-consulta/
- **Data:** 2025-07-28T17:07:30
- **Modificado:** 2026-01-05T22:16:45

---

**Consulta de Oportunidades**

**Dados gerais**

**GET: /** api/v2/methodologies/{code}/opportunities

**Host:** app.funildevendas.com.br

**Authorization:** Basic ZW1haWw6c2VuaGE=

**Content-Type:** application/json

**URL Exemplo:**
    
    
    https://app.funildevendas.com.br/api/v2/methodologies/**CODE_FUNIL** /opportunities/?**initial_date** =2025-01-01&**final_date** =2025-06-30&**limit** =35

## Parâmetros de entrada

**Campo** | **Tipo de parâmetro** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---|---  
code | Rota | Int  | Sim | Código do funil que será feita a consulta  
text | QueryString | String | Não | Busca por título de oportunidade, nome de empresa, nome de contato e telefone do contado  
initial_date | QueryString | String | Sim | Data inicial do intervalo de busca no formato “yyyyMM-dd”. Apenas registros com data de cadastro igual ou posterior a essa data serão incluídos nos resultados. Ex: “2025-01-01″  
final_date | QueryString | String | Sim | Data final do intervalo de busca no formato “yyyyMM-dd”. Apenas registros com data de cadastro igual ou posterior a essa data serão incluídos nos resultados. Ex: “2025-05-30″  
sales_channel | QueryString | String | Não | Lista de códigos dos canais de vendas separados por vírgula “,”Ex: “1,2,3”  
products | QueryString | String | Não | Lista de códigos dos produtos separados por vírgula. Ex: “1,2,3”  
segments | QueryString | String | Não | Lista de códigos de segmentos separados por vírgula. Ex: “1,2,3”  
replies | QueryString | String | Não | Lista de códigos de respostas separados por vígula. Ex:”1,2,3”  
users | QueryString | String | Não | Lista de códigos de usuários separados por vírgula. Ex: “1,2,3”  
open | QueryString | Bool | Não | Se informado 1, irá buscar por oportunidades com status “Aberta”  
gain | QueryString | Bool  | Não | Se informado 1, irá buscar por oportunidades com status “Ganha”  
lost | QueryString | Bool  | Não | Se informado 1, irá buscar por oportunidades com status “Perdida”  
offset | QueryString | Int | Não | Número de registros a serem desconsiderados no início da listagem. Usado em conjunto com o parâmetro limit para implementar a paginação dos resultados. Por exemplo, Offset=20 retorna os resultados a partir do 21º item  
limit | QueryString | Int | Não | Quantidade de registros no resultado da consulta Número máximo de itens a serem retornados na resposta. Utilizado para paginação em conjunto com o parâmetro offset. Por exemplo, limit= 10  
  
****

## Cabeçalhos

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (‘ Basic ‘+ base 64 encoding do email e senha). ****  
  
## Dados de retorno

**Campo** | **Tipo** | **Descrição**  
---|---|---  
**total** | Int  | Total de oportunidades localizadas a partir dos filtros informados. Obs: Essa quantidade não considera parâmetros de paginação  
**offset** | Int  | Número de registros a serem desconsiderados no início da listagem  
**limit** | Int | Número de itens que serão retornados na listagem  
**results** | Lista de oportunidades | Lista com as oportunidades localizadas a partir dos filtros informados  
  
## Objeto Opportunity

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Int  | Código da oportunidade  
title | String  | Título da oportunidade no sistema  
fbclid | String  | Resultado do FBClid da oportunidade  
gclid | String  | Resultado do GClid da oportunidade  
tiktok | String  | Resultado do TikTok da oportunidade  
  
## Objeto Contact

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
  
## Objeto Company

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
  
## Objeto Owner Vendor

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código do vendedor  
name | String |  | Nome do vendedor  
Email | String |  | E-mail do vendedor  
Internal_code | int |  |   
  
## Objeto Shared_Vendors

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código do vendedor  
name | String |  | Nome do vendedor  
  
## Objeto Pipeline

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código do Funil de Vendas  
name | String |  | Nome do Funil de Vendas  
  
## Objeto Step

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código da etapa do Funil de Vendas  
name | String |  | Nome da etapa do Funil de Vendas  
  
## Objeto Sales Channel

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código do canal de vendas  
name | String |  | Nome do canal de vendas  
  
## Objeto Product

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código do produto  
name | String |  | Nome do produto  
price | Decimal |  | Preço do produto  
quantity | Int |  | Quantidade do produto  
  
## Objeto Logbook

**Campo** |  | **Tipo** | **Descrição**  
---|---|---|---  
code | Int |  | Código do diário de bordo  
type | Int |  |  1 = anotação / 2 = log de sistema  
text | String |  | Conteúdo do diário de bordo  
created_at | Date time |  | Data da criação do diário de bordo  
  
## **Exemplo de retorno:**
    
    
    {
      "total": "",
      "offset": "",
      "limit": "",
      "results": [
        {
          "code":,
          "title": "",
          "fbclid": "",
          "gclid": "",
          "tiktok": "",
          "contact": {
            "code":,
            "name": "",
            "email": "",
            "phone": "",
            "smartphone":,
            "role":,
            "document":,
            "additional_emails": [],
            "additional_phones": [],
            "company": {
              "code":,
              "name": "",
              "segment":,
              "document":,
              "state_document":,
              "address":,
              "latitude": ,
              "longitude": ,
              "custom_fields": {}
            },
            "custom_fields": {}
          },
          "owner_vendor": {
            "code": ,
            "name": "",
            "email":,
            "internal_code":
          },
          "shared_vendors": [],
          "pipeline": {
            "code": ,
            "name":
          },
          "step": {
            "code": ,
            "name": ""
          },
          "sales_channel": {
            "code":,
            "name": ""
          },
          "products": [
            {
              "code":,
              "internal_code": "",
              "name": "",
              "price": ,
              "cost_per_unit": ,
              "value_per_unit": ,
              "quantity":
            }
          ],
          "logbook": [
            {
              "code":,
              "type": ,
              "text": "",
              "created_at": ""
            }
          ],
          "value":,
          "created_at": "",
          "updated_at": "",
          "closing_expectation": "",
          "closed_at": "",
          "status": ,
          "answer": "",
          "custom_fields": {}
        }
      ]
    }
