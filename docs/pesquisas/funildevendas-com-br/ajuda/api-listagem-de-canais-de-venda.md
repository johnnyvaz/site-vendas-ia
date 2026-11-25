# Api Listagem de Canais de Venda

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-canais-de-venda/
- **Data:** 2025-07-29T22:02:23
- **Modificado:** 2025-07-29T22:02:26

---

Api para listar Canais de Vendas

**GET:** /api/v2/references/sales-channel

Host: app.funildevendas.com.br

Authorization: Basic ZW1haWw6c2VuaGE=

Content-Type: application/json

**URL:** <https://app.funildevendas.com.br/api/v2/references/sales-channel>

### Retorno:
    
    
    [ 
        { 
            "code": "CÓDIGO DO CANAL DE VENDA", 
            "name": "NOME DO CANAL DE VENDA" 
        }, 
        { 
            "code": "CÓDIGO DO CANAL DE VENDA", 
            "name": "NOME DO CANAL DE VENDA" 
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
**retorno** | Lista de canais de venda | Lista com os canais de venda  
  
****

**Campos personalizados**

**Campo** | **Tipo** | **Descrição**  
---|---|---  
Code | Numeral (INT) | Código do canal de venda  
Name | Texto | Nome do canal de venda
