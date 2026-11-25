# Api Listagem de Respostas de Ganho

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-respostas-de-ganho/
- **Data:** 2025-07-29T22:07:38
- **Modificado:** 2025-07-29T22:07:38

---

Api para listar Respostas de Ganho

**GET:** /api/v2/references/gain-responses

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/gain-responses >

### Retorno:
    
    
    [ 
      { 
            "code": "CÓDIGO DA RESPOSTA ", 
            "name": "NOME DA RESPOSTA" 
        }, 
      { 
            "code": "CÓDIGO DA RESPOSTA ", 
            "name": "NOME DA RESPOSTA" 
        }, 
    ] 
    
    
    

## Lista de objetos

****

**Cabeçalhos**

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (‘ Basic ‘+ base 64 encoding do email e senha). ****  
  
********

**Dados de retorno**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
**retorno** | Lista de respostas do ganho de oportunidade | Lista com as respostas do ganho de oportunidade  
  
****

**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código da resposta do ganho  
Name | Texto | Nome da resposta do ganho
