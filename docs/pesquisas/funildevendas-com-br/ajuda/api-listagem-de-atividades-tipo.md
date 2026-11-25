# Api Listagem de Atividades – Tipo

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-atividades-tipo/
- **Data:** 2026-03-10T14:33:14
- **Modificado:** 2026-03-10T14:34:26

---

### Listagem de tipos de atividades

Host: app.funildevendas.com.br Authorization: Basic ZW1haWw6c2VuaGE= Content-Type: application/json

**Requisição:**  
GET /api/v2/references/activity-kind

Content-Type: application/json  
Authorization: Basic ZW1haWw6c2VuaGE=

**Retorno:**
    
    
    [{"code":"131702","name":"ACOMP 14 DIAS"},
    {"code":"169544","name":"CONTRATO"},
    {"code":"14565","name":"DEMONSTRAÇÃO"},
    {"code":"75932","name":"DEMONSTRAÇÃO (BOLO)"},
    {"code":"170896","name":"E-MAIL"},
    {"code":"131705","name":"IMPLANTAÇÃO"},
    {"code":"9","name":"LEVANTAMENTO DE INFORMAÇÕES"},
    {"code":"10","name":"LIGAÇÃO"},
    {"code":"154711","name":"LIGAÇÃO (NÃO ATENDIDA)"},
    {"code":"131706","name":"TREINAMENTO EQUIPE"},
    {"code":"131936","name":"VIP SOLUTIONS"},
    {"code":"77916","name":"WHATSAPP"}]

## Cabeçalhos

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (“Basic” + base 64 encoding do email e senha).  
  
## Parâmetros da requisição

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
Não possui parâmetros | – | – | Este endpoint retorna a lista de tipos de atividades disponíveis no sistema.  
  
## Campos do retorno

Campo | Tipo | Descrição  
---|---|---  
code | Número inteiro | Código identificador do tipo de atividade.  
description | Texto | Descrição do tipo de atividade.
