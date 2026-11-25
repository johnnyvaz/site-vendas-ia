# Api Listagem de campos personalizados

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-campos-personalizados/
- **Data:** 2026-02-16T14:38:21
- **Modificado:** 2026-02-16T14:38:21

---

## Listagem de campos personalizados

### Dados gerais

**Método:** GET

**Endpoint:** /api/v2/custom-fields

**Host:** app.funildevendas.com.br

**Authorization:** Basic 

**Content-Type:** application/json

### Exemplo

**Requisição:**
    
    
    GET /api/v2/custom-fields HTTP/1.1
    Host: app.funildevendas.com.br
    Authorization: Basic ZW1haWw6c2VuaGE=
    Content-Type: application/json

**Retorno:**
    
    
    {
      "contact": [
        {
          "key": "Campo 1",
          "type": "Link"
        },
        {
          "key": "Campo 2",
          "type": "Texto"
        },
        {
          "key": "Campo 3",
          "type": "Lista",
          "options": [
            "Opção 1",
            "Opção 2"
          ]
        }
      ],
      "enterprise": ...,
      "opportunity": ...
    }

* * *

## Lista de objetos

### Cabeçalhos

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (“Basic” + base 64 encoding do email e senha).  
  
### Dados de retorno

Campo | Tipo | Descrição  
---|---|---  
contact | Lista de campos personalizados | Lista com os campos personalizados para o módulo de contatos.  
enterprise | Lista de campos personalizados | Lista com os campos personalizados para o módulo de empresas.  
opportunity | Lista de campos personalizados | Lista com os campos personalizados para o módulo de oportunidades.  
  
### Campos personalizados

Campo | Tipo | Descrição  
---|---|---  
key | Texto | Nome do campo personalizado.  
type | Texto | Tipo do campo personalizado. Valores possíveis: Texto, Texto área, Número, Lista, Data, Moeda e Link.  
options | Lista de texto | Opções permitidas quando o type for Lista.
