# Api Transferência de oportunidade

- **URL:** https://www.funildevendas.com.br/ajuda/api-transferencia-de-oportunidade/
- **Data:** 2026-02-16T14:34:31
- **Modificado:** 2026-02-16T14:37:51

---

Lista de métodos da API do Funil de Vendas

### Transferência de oportunidades para outros usuários

Host: app.funildevendas.com.br  
Authorization: Basic ZW1haWw6c2VuaGE=  
Content-Type: application/json

**Requisição:**  
POST /api/v2/opportunities/transfer

Content-Type: application/json  
Authorization: Basic IORVhRtYc2FudG9zQGh0aWNJhtr1bHRvcmlhLmNvbS5icjoxMjM0NTY=
    
    
    {
    "codigo_metodologia": 123,
    "codigo_etapa": 456,
    "codigo_vendedor": 789,
    "oportunidades": [
    123,
    456,
    789
    ]
    }
    

**Retorno:**  
{  
“message”: “Oportunidade(s) transferida(s) com sucesso.”  
}

## Cabeçalhos

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (“Basic” + base 64 encoding do email e senha).  
  
## Corpo da requisição

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
codigo_metodologia | Número inteiro | Sim | Código da metodologia (Funil) de destino das oportunidades.  
codigo_etapa | Número inteiro | Não | Código da etapa de destino das oportunidades.  
codigo_vendedor | Número inteiro | Sim | Código do vendedor de destino das oportunidades.  
oportunidades | Lista de números inteiros | Sim | Código das oportunidades que serão transferidas.
