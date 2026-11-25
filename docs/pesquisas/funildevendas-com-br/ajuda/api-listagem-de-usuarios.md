# Api Listagem de usuários

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-usuarios/
- **Data:** 2025-07-29T21:52:51
- **Modificado:** 2025-07-29T21:55:12

---

Api para listar usuários do CRM

**GET:** /api/v2/references/vendors

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/vendors>

### Retorno:
    
    
    [
    {
    "code": "CÓDIGO DE USUÁRIO",
    "name": "NOME DE USUÁRIO",
    "label": “EMAIL DO USUÁRIO"
    },
    {
    "code": "CÓDIGO DE USUÁRIO",
    "name": "NOME DE USUÁRIO",
    "label": EMAIL DO USUÁRIO"
    }
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
**retorno** | Lista de usuários | Lista com os usuários presentes nesse cliente.  
  
****

**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código do usuário  
Name | Texto | Nome do usuário no sistema  
Label | Texto | Email do usuário do sistema
