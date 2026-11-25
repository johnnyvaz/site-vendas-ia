# Api Entrada de Dados

- **URL:** https://www.funildevendas.com.br/ajuda/api-entrada-de-dados/
- **Data:** 2025-07-29T21:44:57
- **Modificado:** 2025-07-29T21:48:20

---

Defina as regras de integração, para automatizar o fluxo de informação, tanto para entrada de dados quanto para saída via WebHooks.

## Recursos de Integrações do Funil de Vendas

Este recurso serve para integrar seus formulários de contato de Sites, Landing Pages, Squeeze Pages, etc, no Funil de Vendas™, automatizando o processo de cadastros. É possível integrar também com outros CRM’s como entrada de dados ou saída via Webhooks.

**Importante:** _Recomendamos que utilize o serviço de um profissional para integrar sua aplicação ao Funil de Vendas._

## Entrada de Dados

Para usar este recurso é necessário ser o Administrador da conta. Se você contratou um programador ou agencia para integrar seus recursos geradores de leads ao Funil de Vendas, passe para ele o login e senha.

Após logado em sua conta, entre em Configuração > Integrações > Entrada de dados.

[![](https://downloads.intercomcdn.com/i/o/60739644/3d2d576cddefe488099ab799/image.png?expires=1753827300&signature=488b667b8510b43ddf7386ab6d6eb6b7b691e259246c12aa4bdfdca0ab401343&req=ciAgFcB4mYUTWLcX3D%2B5hiLmDKzeNPtS4Zy9G6Y65FRZZKSUccyEypzRek4o%0AJM8IRDoPTP8lceJS%0A)](https://downloads.intercomcdn.com/i/o/60739644/3d2d576cddefe488099ab799/image.png?expires=1753827300&signature=488b667b8510b43ddf7386ab6d6eb6b7b691e259246c12aa4bdfdca0ab401343&req=ciAgFcB4mYUTWLcX3D%2B5hiLmDKzeNPtS4Zy9G6Y65FRZZKSUccyEypzRek4o%0AJM8IRDoPTP8lceJS%0A)

## Exemplo: Formulários

Use este recurso para assim que submeter o Formulário, o lead entrar direto para o Funil de Vendas.

### Não recomendamos utilizar a passagem de dados de forma explicita no código fonte, pois desta forma você estará expondo a chave de integração e variáveis de sua conta.

## 1#Passo

**Instale os códigos (Obrigatório)**

## 2#Passo

**Capture os campos que deseja enviar ao Funil de Vendas (Pessoa, Organização e Titulo da Oportunidade são obrigatórios)**

Código Simplificado
    
    
    
     
     

​**Este código deverá ser inserido na página que está o Formulário. Este mesmo código se adapta a ferramentas de captura de leads como RDStation, Leadlovers, etc.**

## Exemplo de integração via ServerXMLHTTP – ASP

Este tipo de integração é a mais recomendada, pois não deixará exposto os códigos de Chave de Integração, Usuário, Canais, etc no código fonte da página de captura.
    
    
    <%
    Titulo = "Teste de Envio API"
    Usuario = "000"
    codigo_metodologia = "000"
    codigo_canal_venda = "000"
    codigo_etapa = "000"
    Organization = "Empresa API"
    Pessoa = "Pessoa API"
    email = ""
    telefone = ""
    cargo = ""
    Integration_Key = "0000000000-0000000-00000"
    
    
    OPP = "{ ""oportunidades"": [ { ""titulo"": """ & Titulo & """, ""valor"":  ""0"", ""codigo_vendedor"": """ & Usuario & """, ""codigo_metodologia"": """ & codigo_metodologia & """, ""codigo_canal_venda"": """ & codigo_canal_venda & """, ""codigo_etapa"": """ & codigo_etapa & """, ""personalizados"": ["{ titulo: ""Titulo do campo"", valor: """&Valor_Variavel&""" }"], ""empresa"": { ""nome"": """ & Organization & """, ""cnpj"": "" "", ""endereco_completo"": { ""logradouro"": "" "", ""numero"": "" "", ""complemento"": "" "", ""bairro"": "" "", ""cidade"": "" "", ""uf"": "" "", ""cep"": "" "" }, ""personalizados"": ["{ titulo: ""Titulo do campo"", valor: """&Valor_Variavel&""" }" ], }, ""contato"": { ""nome"": """ & Pessoa & """, ""email"": """ & email & """, ""telefone1"": """ & telefone & """, ""telefone2"": "" "", ""cargo"": """ & cargo & """, ""cpf"": "" "", ""personalizados"": ["{ titulo: ""Titulo do campo"", valor: """&Valor_Variavel&""" }"], } } ] }"
    
    
    
    
    Set httpRequest = Server.CreateObject("Msxml2.XMLHTTP.6.0")
    httpRequest.Open "POST", "https://app.funildevendas.com.br/api/Opportunity?IntegrationKey="&Integration_Key, false
    httpRequest.SetRequestHeader "Content-Type", "application/json; Charset=FOO"
    httpRequest.Send OPP
    
    
    
    Response.Write httpRequest.ResponseText
    set httpRequest = Nothing
    
    
    
    
    %>

[Ver documentação completa](https://www.funildevendas.com.br/wp-content/uploads/2019/06/API-Insert_Edit.pdf)
