# Api Listagem de Respostas de Perda

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-respostas-de-perda/
- **Data:** 2025-07-29T22:06:14
- **Modificado:** 2025-07-29T22:06:22

---

Api para listar Respostas de Perda

**GET:** /api/v2/references/loss-responses

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/loss-responses>

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

**Cabeçalhos**

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (‘ Basic ‘+ base 64 encoding do email e senha). ****  
  
********

**Dados de retorno**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
**retorno** | Lista das respostas da perda de oportunidade | Lista com as respostas da perda de oportunidade  
  
****

**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código da resposta da perda  
Name | Texto | Nome da resposta da perda
