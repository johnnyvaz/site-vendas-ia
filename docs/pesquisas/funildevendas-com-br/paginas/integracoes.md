# Integrações - Funil de Vendas™ | CRM > Educação > Franquia

- **URL:** https://www.funildevendas.com.br/integracoes/
- **Meta description:** Este recurso serve para integrar seus formulários de contato de Sites, Landing Pages, Squeeze Pages, etc, no Funil de Vendas™, automatizando o processo de
- **Robots:** index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large

## Headings

-   H2: Recursos de integrações do Funil de Vendas
-     H3: Após logado em sua conta, entre em Configuração > Integrações > Entrada de dados.
-   H2: Exemplo: Formulários
-     H3: 1#Passo
-     H3: 2#Passo
-     H3: 3#Passo
-   H2: Este código deverá ser inserido na página que está o Formulário. Este mesmo código se adapta a ferramentas de captura de leads como RDStation, Leadlovers, etc.
-     H3: Para a saída de dados do Funil de Vendas, crie o Webhook desejado e siga a documentação à baixo.
-   H2: Lista de eventos do Funil de Vendas que suportam Webhooks
-   H2: Edição de oportunidades
-   H2: Exclusão de oportunidades
-   H2: Ganhar oportunidade
-   H2: Perder oportunidade
-   H2: Lista de objetos
-     H3: Objeto Opportunitty
-     H3: Objeto Contact
-     H3: Objeto Company
-     H3: Objeto Vendor
-     H3: Objeto Pipeline
-     H3: Objeto PipelineStep
-     H3: Objeto SalesChannel
-     H3: Objeto Product
-     H3: Enumerador OpportunittyStatus
-   H2: Códigos dos status de retornos
-   H2: Cadastrar seus Webhook
-   H2: Autenticação
-   H2: Ambientes
-   H2: Produção

## Conteúdo

## Recursos de integrações do Funil de Vendas

Este recurso serve para integrar seus formulários de contato de Sites, Landing Pages, Squeeze Pages, etc, no Funil de Vendas™, automatizando o processo de cadastros. É possível integrar também com outros CRM’s como entrada de dados ou saída via Webhooks.

Recomendamos que utilize o serviço de um profissional para integrar sua aplicação ao Funil de Vendas.

Para usar este recurso é necessário ser o Administrador da conta. Se você contratou um programador ou agencia para integrar seus recursos geradores de leads ao Funil de Vendas, passe para ele o login e senha.

### Após logado em sua conta, entre em Configuração > Integrações > Entrada de dados.

![](/~funildev/wp-content/uploads/2017/12/tela1.jpg)

## Exemplo: Formulários

Use este recurso para assim que submeter o Formulário, o lead entrar direto para o Funil de Vendas.

### 1#Passo

**Instale os códigos (Obrigatório)**
<script type=“text/javascript” src=“https://code.jquery.com/jquery-1.12.0.min.js”></script>
<script type=“text/javascript” src=“//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js”></script>

### 2#Passo

**Capture os campos que deseja enviar ao Funil de Vendas (Pessoa, Organização e Titulo da Oportunidade são obrigatórios)**

<script type=”text/javascript”>
$(function(){
//Aqui .enviar insira o class ou Id do botão
$(“form”).submit(function(event) {
// Aqui insira os class ou ids dos campos
var NomePessoa = $( “#nome” ).val();
var Empresa = $( “#empresa” ).val();
var email = $( “#email” ).val();
var telefone = $( “#telefone” ).val();

### 3#Passo

**Preencha os demais campos de acordo com as variáveis fornecidos pelo Funil de Vendas**

var opps = {
‘oportunidades’:
[
{
‘titulo’: ‘**Oportunidade vinda do site xpto** ‘,
‘valor’:**0** , // Valor da oportunidades
‘codigo_vendedor’: **00** ,
‘codigo_metodologia’: **00** ,
‘codigo_canal_venda’: **00** ,

‘personalizados’: [
{
//titulo: ‘Contatar’, //Aqui é o nome do campo personalizado que você criou
//valor: Contatar // Aqui é o valor do campo que está recebendo a informação (Select com Whats, telefone ou e-mail)
},
],

‘empresa’: {
‘nome’: **Empresa** , // Como o campo organização é obrigatório no Funil, caso não tenha esta informação em seu formulário, use o nome da pessoa
‘cnpj’: ”,
‘ie’: ”,
‘segmento’: ”,
‘endereco_completo’: {
‘logradouro’: ”,
‘numero’: ”,
‘complemento’: ”,
‘bairro’: ”,
‘cidade’: ”,
‘uf’: ”,
‘cep’: ”
},
‘personalizados’: [
{ titulo: ”,
valor: ” },
{ titulo: ”,
valor: ” },
{ titulo: ”,
valor: ” },
]
},

‘contato’: {
‘nome’: **NomePessoa** ,
‘email’: email,
‘telefone1’: telefone,
‘telefone2’: ”,
‘cargo’: ”,
‘cpf’: ”,
‘emails_adicionais’: [ ],
‘personalizados’: [
{ titulo: ”,
valor: ” },
{ titulo: ”,
valor: ” },
{ titulo: ”,
valor: ” }

]
} },

] };
$.ajax({
type: ‘POST’,
url: “https://app.funildevendas.com.br/api/Opportunity?IntegrationKey=**ChaveIntegração** “, //Inserir a chave da integração
dataType: “json”,
contentType: ‘application/json’,
data: JSON.stringify(opps),
async: false,
success: function (data) {
//alert(data.message);
}
});
//alert(“Integrado”);
// return false;
});

});

</script>

## Este código deverá ser inserido na página que está o Formulário. Este mesmo código se adapta a ferramentas de captura de leads como RDStation, Leadlovers, etc.

### Para a saída de dados do Funil de Vendas, crie o Webhook desejado e siga a documentação à baixo.

Webhook é uma ferramenta útil para aplicativos que desejam executar algum código após um evento específico acontecer, por exemplo, uma oportunidade ser cadastrada ou ter um novo produto inserido.

Ao invés de preparar seu aplicativo para listar os dados em uma API a cada X número de minutos para verificar se o evento ocorreu, você pode registrar webhooks, que enviam requisições HTTP para sua aplicação levando as informações do evento.

Webhooks são configurados para o aplicativo ao qual estão registrados. Isso significa que quando um webhook é registrado em um aplicativo, outros aplicativos não podem visualizá-lo, modificá-lo ou excluí-lo.

## **Lista de eventos do Funil de Vendas que suportam Webhooks**

**Criação de oportunidades**

POST /opportunity

Host: [www.suaaplicacao.com.br](http://www.suaaplicacao.com.br)

Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==

Content-Type: application/json

{ OPPORTUNITY }

## **Edição de oportunidades**

PUT /opportunity/CODE_OPPORTUNITY

Host: [www.suaaplicacao.com.br](http://www.suaaplicacao.com.br)

Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==

Content-Type: application/json

{ OPPORTUNITY }

## **Exclusão de oportunidades**

DELETE /opportunity/CODE_OPPORTUNITY

Host: [www.suaaplicacao.com.br](http://www.suaaplicacao.com.br)

Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==

## **
Ganhar oportunidade**

POST /opportunity/win/CODE_OPPORTUNITY

Host: [www.suaaplicacao.com.br](http://www.suaaplicacao.com.br)

Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==

## **Perder oportunidade**

POST /opportunity/lose/ CODE_OPPORTUNITY

Host: [www.suaaplicacao.com.br](http://www.suaaplicacao.com.br)

Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==

## **Lista de objetos**

### **Objeto Opportunitty**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código da oportunidade
Title | String | Título da oportunidade
contact | Contact | Objeto de contato
owner_vendor | Vendor | Vendedor dono da oportunidade
shared_vendors | Vendor | Array de vendedores / gestores que a oportunidade está compartilhada
pipeline | Pipeline | Funil de Vendas onde está a oportunidade
step | PipelineStep | Passo do Funil de Vendas onde está a oportunidade
sales_channel | SalesChannel | Canal de vendas de origem da oportunidade
products | Product[] | Produtos da oportunidade
value | Decimal | Valor da oportunidade
created_at | DateTime | Date de criação da oportunidade
updated_at | DateTime | Date de atualização da oportunidade
closing_expectation | DateTime | Data de expectativa de fechamento
closed_at | DateTime | Date de fechamento da oportunidade
status | OpportunittyStatus | Status da oportunidade
answer | String | Resposta do fechamento da oportunidade
custom_fields | Dictionary<String,Object> | Campos personalizados da oportunidade

### **Objeto Contact**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código do contato
name | String | Nome do contato
email | String | E-mail do contato
phone | String | Telefone do contato
smartphone | String | Celular do contato
role | String | Cargo do contato
document | String | CPF do contato
additional_emails | String[] | E-mails adicionais separados por “,”
additional_phones | String[] | Telefones adicionais separados por “,”
company | Company | Empresa do contato
custom_fields | Dictionay<String, Object> | Campos personalizados do contato

### **Objeto Company**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código da empresa
name | String | Nome da empresa
segment | String | Segmento da empresa
document | String | CNPJ da empresa
state_document | String | IE da empresa
address | String | Endereço da empresa
latitude | Decimal | Latitude da empresa
longitude | Decimal | Longitude da empresa
custom_fields | Dictionary<String,Object> | Campos personalizados da empresa

### **Objeto Vendor**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código do vendedor
name | String | Nome do vendedor
Email | String | E-mail do vendedor

### **Objeto Pipeline**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código do Funil de Vendas
name | String | Nome do Funil de Vendas

### **Objeto PipelineStep**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código da etapa do Funil de Vendas
name | String | Nome da etapa do Funil de Vendas

### **Objeto SalesChannel**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código do canal de vendas
name | String | Nome do canal de vendas

### **Objeto Product**

**Campo** | **Tipo** | **Descrição**
---|---|---
code | Int | Código do produto
name | String | Nome do produto
price | Decimal | Preço do produto
quantity | Int | Quantidade do produto

### **Enumerador OpportunittyStatus**

Open | 0 | Oportunidade em aberto
---|---|---
Wins | 1 | Oportunidade ganha
Lost | 2 | Oportunidade perdida

## **Códigos dos status de retornos**

2xx – Sucesso

4xx – Erros do cliente

5xx – Erros do servidor

## **Cadastrar seus Webhook**

Para informar seus webhooks, no Funil de Vendas, acesse a opção Configuração > Integrações e na aba Webhooks crie um novo webhook.

**![](/~funildev/wp-content/uploads/2017/12/webhook-funil-de-vendas.jpg)**

Ao criar um novo webhook é necessário informar o nome, a URL, o usuário, a senha e os eventos que deseja que o Funil de Vendas comunique o seu sistema.

****

## **Autenticação**

O Funil de Vendas chamará seus webhooks passando um token do tipo Basic gerado a partir do usuário e senha informado no cadastro do webhook. Esse token é enviado no cabeçalho das requisições na propriedade “Authorization”. Ex:

POST / opportunity HTTP/1.1

Host: [www.suaaplicacao.com.br](http://www.suaaplicacao.com.br)

Authorization: Basic MzY0RkI0REUtNEE5RC00MjQ5LTgyM0YtOTE0NTY0MjIxRkI4OjEyMzQ1Ng==

Content-Type: application/json

* O token do tipo basic é um Base64 criado a partir de um login e uma senha.

## **Ambientes**

**Sandbox**

<https://sandbox.funildevendas.com.br>

Disponível 45 dias para testes

## **Produção**

<https://app.funildevendas.com.br>

## JSON-LD

```json
[
 {
  "@context": "https://schema.org",
  "@graph": [
   {
    "@type": [
     "Person",
     "Organization"
    ],
    "@id": "https://www.funildevendas.com.br/#person",
    "name": "Funil de Vendas™ | CRM &gt; Educação &gt; Franquia"
   },
   {
    "@type": "WebSite",
    "@id": "https://www.funildevendas.com.br/#website",
    "url": "https://www.funildevendas.com.br",
    "name": "Funil de Vendas™ | CRM &gt; Educação &gt; Franquia",
    "publisher": {
     "@id": "https://www.funildevendas.com.br/#person"
    },
    "inLanguage": "pt-BR"
   },
   {
    "@type": "ImageObject",
    "@id": "/~funildev/wp-content/uploads/2017/12/tela1.jpg",
    "url": "/~funildev/wp-content/uploads/2017/12/tela1.jpg",
    "width": "2000",
    "height": "798",
    "inLanguage": "pt-BR"
   },
   {
    "@type": "WebPage",
    "@id": "https://www.funildevendas.com.br/integracoes/#webpage",
    "url": "https://www.funildevendas.com.br/integracoes/",
    "name": "Integrações - Funil de Vendas™ | CRM &gt; Educação &gt; Franquia",
    "datePublished": "2017-12-18T13:22:30+00:00",
    "dateModified": "2017-12-18T13:22:30+00:00",
    "isPartOf": {
     "@id": "https://www.funildevendas.com.br/#website"
    },
    "primaryImageOfPage": {
     "@id": "/~funildev/wp-content/uploads/2017/12/tela1.jpg"
    },
    "inLanguage": "pt-BR"
   },
   {
    "@type": "Person",
    "@id": "https://www.funildevendas.com.br/author/thiagopirinelli/",
    "name": "Thiago Pirinelli",
    "url": "https://www.funildevendas.com.br/author/thiagopirinelli/",
    "image": {
     "@type": "ImageObject",
     "@id": "https://secure.gravatar.com/avatar/3e416c6016e133f01e7d49a70546fad8524dc381e47ed26e16ed9474cfd2c162?s=96&amp;d=mm&amp;r=g",
     "url": "https://secure.gravatar.com/avatar/3e416c6016e133f01e7d49a70546fad8524dc381e47ed26e16ed9474cfd2c162?s=96&amp;d=mm&amp;r=g",
     "caption": "Thiago Pirinelli",
     "inLanguage": "pt-BR"
    },
    "sameAs": [
     "https://www.funildevendas.com.br"
    ]
   },
   {
    "@type": "Article",
    "headline": "Integrações - Funil de Vendas™ | CRM &gt; Educação &gt; Franquia",
    "datePublished": "2017-12-18T13:22:30+00:00",
    "dateModified": "2017-12-18T13:22:30+00:00",
    "author": {
     "@id": "https://www.funildevendas.com.br/author/thiagopirinelli/",
     "name": "Thiago Pirinelli"
    },
    "publisher": {
     "@id": "https://www.funildevendas.com.br/#person"
    },
    "description": "Este recurso serve para integrar seus formulários de contato de Sites, Landing Pages, Squeeze Pages, etc, no Funil de Vendas™, automatizando o processo de",
    "name": "Integrações - Funil de Vendas™ | CRM &gt; Educação &gt; Franquia",
    "@id": "https://www.funildevendas.com.br/integracoes/#richSnippet",
    "isPartOf": {
     "@id": "https://www.funildevendas.com.br/integracoes/#webpage"
    },
    "image": {
     "@id": "/~funildev/wp-content/uploads/2017/12/tela1.jpg"
    },
    "inLanguage": "pt-BR",
    "mainEntityOfPage": {
     "@id": "https://www.funildevendas.com.br/integracoes/#webpage"
    }
   }
  ]
 }
]
```
