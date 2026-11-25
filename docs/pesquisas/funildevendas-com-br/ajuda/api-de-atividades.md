# Api de Atividades (Criação, Edição, Exclusão, Exibição)

- **URL:** https://www.funildevendas.com.br/ajuda/api-de-atividades/
- **Data:** 2025-08-22T14:40:01
- **Modificado:** 2026-02-26T19:50:11

---

Lista de métodos da API do Funil de Vendas

### Criação de Atividade

POST /v2/activities  
Authorization: Basic  
Content-Type: application/json  
{ ACTIVITY }

**Exemplo:**  
POST /api/v2/activities HTTP/1.1  
Host: app.funildevendas.com.br  
Content-Type: application/json  
Authorization: Basic IORVhRtYc2FudG9zQGh0aWNJhtr1bHRvcmlhLmNvbS5icjoxMjM0NTY=
    
    
    {
     "code_opportunity": 874338,
     "kind": {
     "code": 2
     },
     "annotation": "Test",
     "date": "2018-11-07",
     "start_time": "15:50",
     "end_time": "16:00",
     "status": 3,
     "owner": {
     "code": 3
     }
    }
    

### Edição de Atividade

POST /v2/activities/ACTIVITY_CODE  
Authorization: Basic  
Content-Type: application/json  
{ ACTIVITY }

**Exemplo:**  
POST /api/v2/activities/664222 HTTP/1.1  
Host: sandbox.funildevendas.com.br  
Content-Type: application/json  
Authorization: Basic IORVhRtYc2FudG9zQGh0aWNJhtr1bHRvcmlhLmNvbS5icjoxMjM0NTY=  
​
    
    
    {
     "code_opportunity": 874338,
     "kind": {
     "name": "ligação"
     },
     "annotation": "Test 2",
     "date": "2018-11-07",
     "start_time": "15:50",
     "end_time": "16:00",
     "owner": {
     "email": "lucas.santos@hticonsultoria.com.br"
     },
     "file": {
    “base64”:”//OCxAAAAANIAYAAA…",
    "name": “gtr-nylon22.mp3"
     }
    }
    

### Exclusão de Atividade

DELETE /v2/activities/ACTIVITY_CODE  
Authorization: Basic

Api de Atividades  
DELETE /api/v2/activities/664225 HTTP/1.1  
Host: sandbox.funildevendas.com.br  
Authorization: Basic IORVhRtYc2FudG9zQGh0aWNJhtr1bHRvcmlhLmNvbS5icjoxMjM0NTY=  
Retorno:
    
    
    {
     "content": {
     "code": 0
     },
     "status": "OK",
     "messages": []
    }
    

### Exibição de Atividade

GET /v2/activities/ACTIVITY_CODE  
Authorization: Basic

**Exemplo:**  
GET /api/v2/activities/664222 HTTP/1.1  
Host: sandbox.funildevendas.com.br  
Authorization: Basic IORVhRtYc2FudG9zQGh0aWNJhtr1bHRvcmlhLmNvbS5icjoxMjM0NTY=  
Retorno:
    
    
    {
     "code": 664227,
     "code_opportunity": 874338,
     "kind": {
     "code": 2,
     "name": "ALMOÇO"
     },
     "title": "ALMOÇO",
     "annotation": "Test",
     "date": "2018-11-07",
     "start_time": "15:50",
     "end_time": "16:00",
     "status": 3,
     "created_at": "2018-08-24 16:02:55",
     "updated_at": "2018-08-24 16:02:55",
     "owner": {
     "code": 3,
     "email": "lucas.santos@hticonsultoria.com.br"
     },
     "file": null
    }
