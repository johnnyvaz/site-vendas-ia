# Api Listagem de Etapas

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-etapas/
- **Data:** 2025-07-29T22:00:01
- **Modificado:** 2025-07-29T22:00:01

---

Api para listar Etapas do Funil

**GET:** /api/v2/references/methodologies/{id}/steps

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/methodologies/1/steps>

### Retorno:
    
    
    [ 
        { 
            "code": "CÓDIGO DO ETAPA", 
            "name": "NOME DA ETAPA" 
        }, 
        { 
            "code": "CÓDIGO DA ETAPA", 
            "name": "NOME DA ETAPA" 
        }, 
    ] 
    
    
    

## Lista de objetos

**Cabeçalhos**

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (‘ Basic ‘+ base 64 encoding do email e senha). ****  
  
****

**Parâmetros de entrada**

**Campo** | **Tipo** | **Obrigatório?** | **Descrição**  
---|---|---|---  
id | Texto (Numeral) | Sim | Código do funil que deseja verificar as etapas  
**** **** **Dados de retorno** |  |  |   
**Campo** | **Tipo** | **Descrição** |   
**retorno** | Lista de etapas | Lista com as etapas do funil selecionado  
  
**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código da etapa  
Name | Texto | Nome da etapa
