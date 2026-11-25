# Api Importação de Arquivos

- **URL:** https://www.funildevendas.com.br/ajuda/api-importacao-de-arquivos/
- **Data:** 2026-02-16T14:50:04
- **Modificado:** 2026-02-16T14:54:45

---

## Lista de métodos da API do Funil de Vendas

Esta coleção tem como objetivo auxiliar os clientes do Funil de Vendas com as integrações de API.

Em caso de dúvida, entrar em contato através do e-mail suporte@funildevendas.com.br.

**Coleção no Postman:[Funil de Vendas – Público.postman_collection.json](https://www.funildevendas.com.br/wp-content/uploads/2026/02/Funil-de-Vendas-Publico.postman_collection.json_.zip)**

* * *

## Oportunidades

Este diretório concentra todas as requisições pertinentes ao módulo de Oportunidades.

### Importação de Arquivo

Esta API é responsável por importar um arquivo para uma oportunidade.

**Método:** POST

**Endpoint:** /api/v2/opportunities/codigo_da_oportunidade/file-upload/tipo_de_permissao

**Authorization:** Basic

  * **username:** E-mail
  * **password:** Chave de Integração

**Content-Type:** multipart/form-data

#### Parâmetros de rota

Parâmetro | Obrigatório? | Descrição | Exemplo  
---|---|---|---  
codigo_da_oportunidade | Sim | Código identificador da oportunidade | 1234  
tipo_de_permissao | Sim | Indica se o arquivo será público ou não. Valores permitidos: private/public | private  
  
#### Corpo da requisição (form-data)

Campo | Tipo | Obrigatório? | Descrição  
---|---|---|---  
file | Arquivo | Sim | Arquivo que será vinculado à oportunidade  
  
#### Exemplo

**Requisição (HTTP):**
    
    
    POST /api/v2/opportunities/1234/file-upload/private HTTP/1.1
    Host: app.funildevendas.com.br
    Authorization: Basic 
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryX
    
    ------WebKitFormBoundaryX
    Content-Disposition: form-data; name="file"; filename="arquivo.pdf"
    Content-Type: application/pdf
    
    
    ------WebKitFormBoundaryX--

**Requisição (cURL):**
    
    
    curl --request POST \
      --url "https://app.funildevendas.com.br/api/v2/opportunities/1234/file-upload/private" \
      --user "seu_email@dominio.com:CHAVE_DE_INTEGRACAO" \
      --form "file=@/caminho/do/arquivo.pdf"
