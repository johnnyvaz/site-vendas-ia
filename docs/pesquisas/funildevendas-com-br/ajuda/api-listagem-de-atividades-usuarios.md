# Api Listagem de atividades – Usuários

- **URL:** https://www.funildevendas.com.br/ajuda/api-listagem-de-atividades-usuarios/
- **Data:** 2026-03-10T14:38:50
- **Modificado:** 2026-03-17T15:08:22

---

### Listagem de atividades

Host: app.funildevendas.com.br  
Authorization: Basic ZW1haWw6c2VuaGE=  
Content-Type: application/json 

**Requisição:**  
GET /api/v2/activities/GetActivity?limit=10&offset=0&status=1&initial_date=2026-01-01&final_date=2026-02-28&date_filter_type=1&activities_kind=77915,2

Content-Type: application/json  
Authorization: Basic ZW1haWw6c2VuaGE=

**Retorno:**
    
    
    {
      "total": 10,
      "offset": 0,
      "limit": 10,
      "results": [
        {
          "code": 16438084,
          "code_opportunity": null,
          "kind": {
            "code": 2,
            "name": null
          },
          "title": "ALMOÇO",
          "annotation": "",
          "date": "2025-12-31",
          "start_time": "00:00",
          "end_time": "00:30",
          "status": 1,
          "created_at": "2026-01-26 15:18:02",
          "updated_at": "2026-01-26 15:18:02",
          "owner": {
            "code": 3,
            "email": "lucas@funildevendas.com.br"
          },
          "file": null
        },
        {
          "code": 16572717,
          "code_opportunity": null,
          "kind": {
            "code": 2,
            "name": null
          },
          "title": "ALMOÇO",
          "annotation": "",
          "date": "2026-02-13",
          "start_time": "00:00",
          "end_time": "01:00",
          "status": 1,
          "created_at": "2026-02-11 12:39:53",
          "updated_at": "2026-02-11 12:40:02",
          "owner": {
            "code": 3,
            "email": "lucas@funildevendas.com.br"
          },
          "file": null
        },
        {
          "code": 16579589,
          "code_opportunity": null,
          "kind": {
            "code": 1,
            "name": null
          },
          "title": "REUNIÃO",
          "annotation": "teste",
          "date": "2026-02-18",
          "start_time": "18:59",
          "end_time": "19:29",
          "status": 1,
          "created_at": "2026-02-12 10:12:29",
          "updated_at": "2026-02-12 10:12:57",
          "owner": {
            "code": 3,
            "email": "lucas@funildevendas.com.br"
          },
          "file": null
        }
      ]
    }

## Cabeçalhos

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
Authorization | Texto | Sim | Chave de identificação de usuário para a API no formato Basic Authentication (“Basic” + base 64 encoding do email e senha).  
Content-Type | Texto | Sim | Tipo de conteúdo da requisição. Para esta API, utilizar **application/json**.  
  
## Parâmetros da requisição

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
limit | Número inteiro | Não | Quantidade máxima de registros retornados na consulta.  
offset | Número inteiro | Não | Deslocamento inicial da paginação. Usado para definir a partir de qual registro os resultados serão retornados.  
status | Número inteiro | Não | Status da atividade para filtro da consulta.  
initial_date | Data (YYYY-MM-DD) | Não | Data inicial do filtro em formato americano Ex: 2026-01-01  
final_date | Data (YYYY-MM-DD) | Não | Data final do filtro em formato americano Ex: 2026-03-01  
date_filter_type | Número inteiro | Não | Tipo de filtro que será aplicado na busca, sendo ‘1’ para data de criação e ‘2’ para data de atualização.  
activities_kind | Lista de números inteiros | Não | Lista de códigos dos tipos de atividades a serem filtrados, separados por vírgula.  
  
## Campos do retorno

Campo | Tipo | Descrição  
---|---|---  
total | Número inteiro | Total de registros encontrados na consulta.  
offset | Número inteiro | Posição inicial da paginação retornada.  
limit | Número inteiro | Limite de registros retornados na resposta.  
results | Lista de objetos | Lista de atividades encontradas.  
code | Número inteiro | Código identificador da atividade.  
code_opportunity | Número inteiro / null | Código da oportunidade vinculada à atividade, quando existir.  
kind.code | Número inteiro | Código do tipo da atividade.  
kind.name | Texto / null | Nome do tipo da atividade.  
title | Texto | Título da atividade.  
annotation | Texto | Observações ou descrição da atividade.  
date | Data (YYYY-MM-DD) | Data da atividade.  
start_time | Hora (HH:mm) | Horário inicial da atividade.  
end_time | Hora (HH:mm) | Horário final da atividade.  
status | Número inteiro | Status da atividade.  
created_at | Data e hora (YYYY-MM-DD HH:mm:ss) | Data e hora de criação do registro.  
updated_at | Data e hora (YYYY-MM-DD HH:mm:ss) | Data e hora da última atualização do registro.  
owner.code | Número inteiro | Código do responsável pela atividade.  
owner.email | Texto | E-mail do responsável pela atividade.  
file | Objeto / null | Arquivo vinculado à atividade, quando existir.
