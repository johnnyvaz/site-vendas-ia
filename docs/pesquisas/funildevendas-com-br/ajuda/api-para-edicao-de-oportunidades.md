# API para Edição de Oportunidades

- **URL:** https://www.funildevendas.com.br/ajuda/api-para-edicao-de-oportunidades/
- **Data:** 2025-07-29T21:42:44
- **Modificado:** 2026-02-16T17:27:02

---

Edite direto de sua aplicação dados do Funil de Vendas

## Inclusão e edição de oportunidades

opportunity?IntegrationKey=SUA_CHAVE_DE_INTEGRAÇÃO

**Exemplo:**

POST /api/opportunity?IntegrationKey=00000000-0000-0000-0000-000000000000

Host: [sandbox.funildevendas.com.br](http://sandbox.funildevendas.com.br/)

Content-Type: application/json

{ Exemplo de requisição }

**Retorno:**

{ Exemplo de retorno }

**Observação**

Os valores de alguns campos são fornecidos pelo portal do Funil de Vendas. Para maiores informações, por favor, faça o login em nosso portal e acesse o link [https://app.funildevendas.com.br/Settings/IntegrationParameterization.](https://app.funildevendas.com.br/Settings/IntegrationParameterization)

## Exemplo de requisição
    
    
    {
    
    "oportunidades": [
    
    {
    
    "titulo": "Título da oportunidade",
    
    "valor": 100,
    
    "codigo_vendedor": SEU_CÓDIGO_DE_VENDEDOR,
    
    "codigo_metodologia": SEU_CÓDIGO_DE_METODOLOGIA,
    
    "codigo_etapa": SEU_CÓDIGO_DE_ETAPA,
    
    "codigo_canal_venda": SEU_CÓDIGO_DE_CANAL_DE_VENDA,
    
    "empresa": {
    
    "nome": "Nome da empresa",
    
    "cnpj": "",
    
    "ie": "",
    
    "codigo_segmento": "",
    
    "endereco_completo": {
    
    "logradouro": "",
    
    "numero": "",
    
    "complemento": "",
    
    "bairro": "",
    
    "cidade": "",
    
    "uf": "",
    
    "cep": ""
    
    }
    
    },
    
    "contato": {
    
    "nome": "Nome do contato",
    
    "email": "email@contato.com.br",
    
    "telefone1": "",
    
    "telefone2": "",
    
    "cargo": "",
    
    "cpf": ""
    
    }
    
    }
    
    ]
    
    }
    

## Exemplo de retorno (Sucesso)

**Código de status HTTP:** 200
    
    
    { 
    
    "response": "success", 
    
    "message": "Oportunidades importadas com sucesso.", 
    
    "value": null 
    
    } 
    

## Exemplo de retorno (Falha)

**Código de status HTTP:** 200
    
    
    { 
    
    "response": "failure", 
    
    "message": "Um ou mais erros foram encontrados. Para mais detalhes veja a propriedade value.", 
    
    "value": [ 
    
    "A oportunidade informada não existe ou você não possui permissão para alterá-la. - Linha: 1" 
    
    ] 
    
    } 
    

[Download da documentação completa](https://www.funildevendas.com.br/wp-content/uploads/2019/06/API-Insert_Edit.pdf)
