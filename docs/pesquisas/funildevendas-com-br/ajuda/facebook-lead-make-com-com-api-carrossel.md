# Facebook Lead > Make.com | com API Carrossel

- **URL:** https://www.funildevendas.com.br/ajuda/facebook-lead-make-com-com-api-carrossel/
- **Data:** 2025-07-29T21:31:52
- **Modificado:** 2025-07-29T21:31:56

---

Esta integração permite capturar o lead por meio do Facebook Leads e cadastrar o lead diretamente no Funil de Vendas™ CRM por meio do Make.com

## Requisitos

  1. Conta no [https://www.make.com](https://ajuda.funildevendas.com.br/pt/articles/8092021-integracao-facebook-lead-make-com-com-api-carrossel)

  2. Conta no Funil de Vendas™ CRM (Master)

  3. Conta + acesso à página e formulário de campanha Facebook

## Assista o Video

[Vídeo/embed: YouTube video player](https://www.youtube.com/embed/e47dGZWBSaU?si=0jlRUTjPFOj9qlLO)

[Download do Template Json](https://funildevendas.com.br/wp-content/uploads/2024/09/ModeloMake.json_.zip)

## ⚠️ ATENÇÃO ⚠️

Caso a estrutura do Json chegue vazia, copie e cole esta estrutura na etapa Json.
    
    
    {
        "oportunidades": [
            {
                "titulo": "Titulo do Lead",
                "valor": "0",
                "codigo_vendedor": "Code_User",
                "codigo_metodologia": "Code_Methodology",
                "codigo_canal_venda": "Code_Channel",
                "codigo_etapa": "Code_StepMethodology",
                "personalizados": [
                    {
                        "titulo": "Titulo do campo 2",
                        "valor": "Valor para o campo 2"
                    }
                ],
                "empresa": {
                    "nome": "Company",
                    "cnpj": "cnpj",
                    "codigo_segmento": "0",
                    "endereco_completo": {
                        "logradouro": " ",
                        "numero": " ",
                        "complemento": " ",
                        "bairro": " ",
                        "cidade": " ",
                        "uf": " ",
                        "cep": " "
                    },
                    "personalizados": [
                        {
                            "titulo": "Titulo do campo 2",
                            "valor": "Valor para o campo 2"
                        }
                    ]
                },
                "contato": {
                    "nome": "Name",
                    "email": "eMail",
                    "telefone1": "WhatsApp",
                    "telefone2": " ",
                    "cargo": "Cargo",
                    "cpf": "cpf",
                    "personalizados": [
                        {
                            "titulo": "Titulo do campo 2",
                            "valor": "Valor para o campo 2"
                        }
                    ]
                }
            }
        ]
    }
    

Exemplo:

[![](https://downloads.intercomcdn.com/i/o/778369024/fb9bef196cea7308e19b31d6/Captura+de+Tela+2023-07-05+a%CC%80s+12.20.59.png?expires=1753826400&signature=01b7dcc9a937dcabf2f435e800280eb62a25f03babd4fa1b81542e4e83fbee2a&req=cycvFc93nYNbFb4f3HP0gF5ms7Pomd4Eqjo4TkOZDatqU%2BBLm68IX%2FreDqw1%0AS5TJfFlx7SOICNLnkQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/778369024/fb9bef196cea7308e19b31d6/Captura+de+Tela+2023-07-05+a%CC%80s+12.20.59.png?expires=1753826400&signature=01b7dcc9a937dcabf2f435e800280eb62a25f03babd4fa1b81542e4e83fbee2a&req=cycvFc93nYNbFb4f3HP0gF5ms7Pomd4Eqjo4TkOZDatqU%2BBLm68IX%2FreDqw1%0AS5TJfFlx7SOICNLnkQ%3D%3D%0A)

# ApiCarrossel

Para usar nossa ApiCarrossel o procedimento é o mesmo, mas ao invés de usar os Códigos de Integrações, utilize os dados conforme exemplo.

Code_User

Code_Methodology

Code_Channel

Code_StepMethodology

[![](https://downloads.intercomcdn.com/i/o/993007578/b96e639048dd09ef9f73c25b/Captura+de+Tela+2024-03-15+a%CC%80s+15_51_05.png?expires=1753826400&signature=ff4c96b7136de7761284f9980c994f1d4c423bf8eb8aea83b528ca8e6c8f88aa&req=fSkkFsl5mIZXFb4f3HP0gNR3k0fYk0hHIG1R4jEqI1F%2FScaPgAunX%2FHozL%2FT%0AkPzxJu5FS8j5F2FMmw%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/993007578/b96e639048dd09ef9f73c25b/Captura+de+Tela+2024-03-15+a%CC%80s+15_51_05.png?expires=1753826400&signature=ff4c96b7136de7761284f9980c994f1d4c423bf8eb8aea83b528ca8e6c8f88aa&req=fSkkFsl5mIZXFb4f3HP0gNR3k0fYk0hHIG1R4jEqI1F%2FScaPgAunX%2FHozL%2FT%0AkPzxJu5FS8j5F2FMmw%3D%3D%0A)
