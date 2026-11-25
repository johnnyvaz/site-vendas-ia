# Conversão Pixel Facebook (Meta)

- **URL:** https://www.funildevendas.com.br/ajuda/conversao-pixel-facebook-meta/
- **Data:** 2025-07-29T21:37:29
- **Modificado:** 2026-01-05T16:45:01

---

&Marque as conversões do Facebook Pixel via Módulo de Automação

Este recurso é para você que precisa marcar uma conversão no Meta (Pixel) quando:

✅ Cadastrar uma oportunidade no CRM

✅ Mudar de etapa

✅ Ganhar ou perder um negócio

[Vídeo/embed: YouTube video player](https://www.youtube.com/embed/2IdOlxFlH-U?si=f1IRMEiCdhmpCtSH)

A conversão aparecerá em seu Gerenciador de Eventos do Meta Business neste formato:

_FunildeVendasCRM_**** _ _ _

**Status**

Edit = Indica Inserção ou Edição de uma oportunidade no CRM

Gain = Indica quando uma oportunidade é ganha

Lost = Indica quando uma oportunidade é perdida

Funil = Indica qual Funil (processo) a oportunidade pertence

Etapa = Indica qual Etapa (do Funil) a oportunidade pertence

Exemplos: **FunildeVendasCRM_Edit_Vendas_Qualificação**

[![](https://downloads.intercomcdn.com/i/o/1008677559/7680978962001eec19172f4a/Captura+de+Tela+2024-04-01+a%CC%80s+21_12_43.png?expires=1753826400&signature=e737e67e8cf369250fdb5c8d2c4beb175fe24672cc15b06060652db651bd11ec&req=dSAnHs95moRaUPMW1HO4zTdvsPUyygFNkJYgEaAZLsAJzH33yvvI7rxXprLa%0A4Ozrw%2BmASrpON%2F8jLq0%3D%0A)](https://downloads.intercomcdn.com/i/o/1008677559/7680978962001eec19172f4a/Captura+de+Tela+2024-04-01+a%CC%80s+21_12_43.png?expires=1753826400&signature=e737e67e8cf369250fdb5c8d2c4beb175fe24672cc15b06060652db651bd11ec&req=dSAnHs95moRaUPMW1HO4zTdvsPUyygFNkJYgEaAZLsAJzH33yvvI7rxXprLa%0A4Ozrw%2BmASrpON%2F8jLq0%3D%0A)

## Criando link para a Api de Conversão
    
    
    https://leads.funildevendas.com.br/integrations/facebook/?pixel=**SeuPixel** &access_token=**SeuToken** &test_event_code=SeuCódigo

pixel = Pixel do MetaAds

access_token = Token gerado pelo MetaAds

test_event_code = Código do evento teste

**É possível adicionar uma nomenclatura de conversão:**  
conversion_name = Caso queria colocar um nome específico de conversão para este evento Exemplo: Lead_Campanha ou usar as próprias nomenclaturas de conversão do Facebook (Exemplo: Lead)

Substitua as informações de acordo com os dados do Facebook.

  1. Para gerar um token nho Gerenciador de Eventos do Meta Business

[![](https://downloads.intercomcdn.com/i/o/1008678406/afc13b23a7643ab3a6cc9040/Captura+de+Tela+2024-04-01+a%CC%80s+21_14_58.png?expires=1753826400&signature=167ce18b3e6e4973a269120f4dc60e9e7bc9f9833dfda7ebb0e773b2e8f08d02&req=dSAnHs95lYVfX%2FMW1HO4zWW%2B5P4BwcXogtCGnjJxxI5Qf4aoveRGUYOl3FaC%0A4h%2BMJX61vF%2BVTP1vcLQ%3D%0A)](https://downloads.intercomcdn.com/i/o/1008678406/afc13b23a7643ab3a6cc9040/Captura+de+Tela+2024-04-01+a%CC%80s+21_14_58.png?expires=1753826400&signature=167ce18b3e6e4973a269120f4dc60e9e7bc9f9833dfda7ebb0e773b2e8f08d02&req=dSAnHs95lYVfX%2FMW1HO4zWW%2B5P4BwcXogtCGnjJxxI5Qf4aoveRGUYOl3FaC%0A4h%2BMJX61vF%2BVTP1vcLQ%3D%0A)

2\. Configurações > **API de Conversões**

Role a página até a sessão **API de Conversões** e toque em Gerar Token de Acesso

[![](https://downloads.intercomcdn.com/i/o/1008679078/d3efa054344c3eb1f29dfa50/Captura+de+Tela+2024-04-01+a%CC%80s+21_16_45.png?expires=1753826400&signature=de9f36885b6fb9440f105be0cec4a158b47d361c9e45b73caa4b0bb3439fcf8c&req=dSAnHs95lIFYUfMW1HO4zSSVHB0JCSlbwq61blSjFMLv4463u0flkGg%2Buhpk%0AZo%2FhzFCoZf2ozEb%2BCJQ%3D%0A)](https://downloads.intercomcdn.com/i/o/1008679078/d3efa054344c3eb1f29dfa50/Captura+de+Tela+2024-04-01+a%CC%80s+21_16_45.png?expires=1753826400&signature=de9f36885b6fb9440f105be0cec4a158b47d361c9e45b73caa4b0bb3439fcf8c&req=dSAnHs95lIFYUfMW1HO4zSSVHB0JCSlbwq61blSjFMLv4463u0flkGg%2Buhpk%0AZo%2FhzFCoZf2ozEb%2BCJQ%3D%0A)

Copie o Token gerado e cole para formar o link:

**Evento com nomenclatura padrão do Funil de Vendas™ CRM**

<https://leads.funildevendas.com.br/integrations/facebook/?pixel=>**SeuPixel** &access_token=**SeuToken**

**Evento com nomenclatura personalizada do Funil de Vendas™ CRM**

<https://leads.funildevendas.com.br/integrations/facebook/?pixel=>**SeuPixel** &access_token=**SeuToken** &conversion_name=**Lead**

3\. No Funil de Vendas configure a automação que deseja para marcar a conversão

Configure a entrada de dados e depois insira uma ação de Hook para enviar o pacote de dados para o link gerado.

[![](https://downloads.intercomcdn.com/i/o/1008680566/6d73d40732babda13b5ca85a/Captura+de+Tela+2024-04-01+a%CC%80s+21_20_24.png?expires=1753826400&signature=66beed7c13a54e737b630c1a585c8a437c020bcfaa9be7d8ae97e122a4c5b0e6&req=dSAnHs92nYRZX%2FMW1HO4zYDuI0HxPlJB%2FOw3j1VP6fg3TAhoZPAuJ5z8NxLS%0Aybxv4qyG9GTeNRo%2BN2E%3D%0A)](https://downloads.intercomcdn.com/i/o/1008680566/6d73d40732babda13b5ca85a/Captura+de+Tela+2024-04-01+a%CC%80s+21_20_24.png?expires=1753826400&signature=66beed7c13a54e737b630c1a585c8a437c020bcfaa9be7d8ae97e122a4c5b0e6&req=dSAnHs92nYRZX%2FMW1HO4zYDuI0HxPlJB%2FOw3j1VP6fg3TAhoZPAuJ5z8NxLS%0Aybxv4qyG9GTeNRo%2BN2E%3D%0A)
