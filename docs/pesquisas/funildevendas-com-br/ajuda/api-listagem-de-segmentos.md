# Api Listagem de Segmentos

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-segmentos/
- **Data:** 2025-07-29T22:04:28
- **Modificado:** 2025-07-29T22:04:28

---

Api para listar Segmentos

**GET:** /api/v2/references/segments

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/segments>

### Retorno:
    
    
    [ 
    { 
            "code": "CÓDIGO DO SEGMENTO", 
            "name": "NOME DO SEGMENTO" 
        }, 
    { 
            "code": "CÓDIGO DO SEGMENTO", 
            "name": "NOME DO SEGMENTO" 
        }, 
    ] 
    
    

## Lista de objetos

**Cabeçalhos**

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (‘ Basic ‘+ base 64 encoding do email e senha). ****  
  
****

****

**Dados de retorno**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
**retorno** | Lista de segmentos | Lista com os segmentos  
  
****

**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código do segmento  
Name | Texto | Nome do segmento
