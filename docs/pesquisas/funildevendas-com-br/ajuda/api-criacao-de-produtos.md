# Api Criação de produtos

- **URL:** https://www.funildevendas.com.br/ajuda/api-criacao-de-produtos/
- **Data:** 2026-02-27T15:48:51
- **Modificado:** 2026-02-27T15:48:51

---

## **Criação de produtos**

**Dados gerais**

**POST:** /api/v2/products  
**Host:** app.funildevendas.com.br  
**Authorization:** Basic ZW1haWw6c2VuaGE=  
**Content-Type:** application/json

**Exemplo:**
    
    
    {
      "name": "Nome do produto",
      "price": 00.00
    }

### Request body

**Campo** | **Tipo** | **Descrição**  
---|---|---  
name | String | Nome do produto que deseja adicionar  
price | Decimal | Valor unitário do produto (reais separados por “.” dos centavos)  
  
### Retorno
    
    
    {
      "code": "Código do produto",
      "name": "Nome do produto cadastrado",
      "price": 99.00,
      "created_at": "2025-07-22T16:09:16.5074918",
      "updated_at": "2025-07-22T16:09:16.5074918"
    }

### Dados de retorno

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Numeral (INT) | Código do produto  
name | String | Nome do produto  
price | Decimal | Valor do produto  
created_at | String | Data da criação do produto  
updated_at | String | Data da atualização do produto  
  
* * *

## **Edição de produtos**

**Dados gerais**

**PUT:** /api/v2/products/{id}  
**Host:** app.funildevendas.com.br  
**Authorization:** Basic ZW1haWw6c2VuaGE=  
**Content-Type:** application/json

**Exemplo:**
    
    
    {
      "name": "Nome do produto",
      "price": 00.00
    }

### Request body

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Name | String | Novo nome do produto que deseja editar  
Price | Decimal | Novo valor unitário do produto (reais separados por “.” dos centavos)  
  
### Parâmetros de rota

**Campo** | **Tipo** | **Descrição**  
---|---|---  
id | Numeral (INT) | Código do produto que deseja editar  
  
### Retorno
    
    
    {
      "code": "Código do produto",
      "name": "Nome do produto cadastrado",
      "price": 99.00,
      "created_at": "2025-07-22T16:09:16.5074918",
      "updated_at": "2025-07-22T17:09:16.5074918"
    }

### Dados de retorno

**Campo** | **Tipo** | **Descrição**  
---|---|---  
code | Numeral (INT) | Código do produto  
name | String | Nome do produto  
price | Decimal | Valor do produto  
created_at | String | Data da criação do produto  
updated_at | String | Data da atualização do produto  
  
* * *

## **Exclusão de produtos**

**Dados gerais**

**DELETE:** /api/v2/products/{id}  
**Host:** app.funildevendas.com.br  
**Authorization:** Basic ZW1haWw6c2VuaGE=  
**Content-Type:** application/json

### Parâmetros de rota

**Campo** | **Tipo** | **Descrição**  
---|---|---  
id | Numeral (INT) | Código do produto que deseja editar  
  
### Retorno

**Vazio**
