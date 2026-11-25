# Api Listagem Funil

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-funil/
- **Data:** 2025-07-29T21:57:48
- **Modificado:** 2025-07-29T22:00:27

---

Api para listar Funil

**GET:** /api/v2/references/methodologies

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/methodologies>

### Retorno:
    
    
    [ 
        { 
            "code": "CÓDIGO DO FUNIL", 
            "name": "NOME DO FUNIL" 
        }, 
        { 
            "code": "CÓDIGO DO FUNIL", 
            "name": "NOME DO FUNIL" 
        }, 
    ] 
    
    

## Lista de objetos

**Cabeçalhos**

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (‘ Basic ‘+ base 64 encoding do email e senha). ********  
  
**Dados de retorno**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
**retorno** | Lista de Funis | Lista com os funis presents nesse usuário  
  
****

**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código do funil  
Name | Texto | Nome do funil
