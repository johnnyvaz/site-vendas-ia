# Forçando um título e canal de vendas no Formulário de Captura de lead

- **URL:** https://www.funildevendas.com.br/ajuda/forcando-um-titulo-e-canal-de-vendas-no-formulario-de-captura-de-lead/
- **Data:** 2025-07-29T21:35:15
- **Modificado:** 2025-07-29T21:35:15

---

Inserindo variáveis na url para mudar o titulo da oportunidade e o canal de vendas

Esta é uma função muito útil para empresas que querem trabalhar com apenas 1 página de captura e múltiplos canais de aquisição (tráfego pago).

Configure normalmente o Formulários de Captura em _Configurações > Integrações > Formulário_.

​**PS: Somente no acesso do ADM**

[![](https://downloads.intercomcdn.com/i/o/782685936/3877c1f8ec619944abec0474/Captura+de+Tela+2023-07-11+a%CC%80s+10.25.33.png?expires=1753826400&signature=aca3e9c56d167485fb9b1ae55f8283e612d71e6e64d7ddffb74415ece2844b49&req=cyglEMF7lIJZFb4f3HP0gNcTm4mWBgTRCWb7ssnwLn06MeVzUKj42l6hYBXE%0AUY1FAT6bPHKO%2B39rsQ%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/782685936/3877c1f8ec619944abec0474/Captura+de+Tela+2023-07-11+a%CC%80s+10.25.33.png?expires=1753826400&signature=aca3e9c56d167485fb9b1ae55f8283e612d71e6e64d7ddffb74415ece2844b49&req=cyglEMF7lIJZFb4f3HP0gNcTm4mWBgTRCWb7ssnwLn06MeVzUKj42l6hYBXE%0AUY1FAT6bPHKO%2B39rsQ%3D%3D%0A)

Após inserir em sua página o código do formulário, ajuste a url com os parâmetros:

**Tag** = Descrição que ficará no titulo da oportunidade

**ForceCodeChannel** = Código do canal de vendas novo (_Configurações > Integrações > Entrada de dados > Canal de Venda_)  
​  
⚠️ PS: As nomenclaturas dos parâmetros devem ser exatamente escritas como está indicado.

​**Exemplo**
    
    
    https://www.minhapagina.com.br/lpcaptura/?**Tag** =emailMKT&**ForceCodeChannel** =123
    
    
    

[![](https://downloads.intercomcdn.com/i/o/782694748/c0845a0fca825fa705894255/Captura+de+Tela+2023-07-11+a%CC%80s+10.34.40.png?expires=1753826400&signature=d690cf095f3269eb59c0390a7277a82f2a54417e2bb1d67d3e0ae8df20563a7f&req=cyglEMB6moVXFb4f3HP0gM7PWOd42SmUQnP67nxXABXjsHj%2F%2BdnUqPpeZcuY%0AUCsOVH7FoRCsDCIMgg%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/782694748/c0845a0fca825fa705894255/Captura+de+Tela+2023-07-11+a%CC%80s+10.34.40.png?expires=1753826400&signature=d690cf095f3269eb59c0390a7277a82f2a54417e2bb1d67d3e0ae8df20563a7f&req=cyglEMB6moVXFb4f3HP0gM7PWOd42SmUQnP67nxXABXjsHj%2F%2BdnUqPpeZcuY%0AUCsOVH7FoRCsDCIMgg%3D%3D%0A)

Note que após inserir os parâmetros na url, o valor dos campos type=”hidden” **Tag** e **ForceCodeChannel** são alterados.

Após submeter o formulário, no CRM o titulo da oportunidade estará com a informação inserida na **Tag** e o Canal de Vendas será mudado conforme valor inserido no **ForceCodeChannel.**

[![](https://downloads.intercomcdn.com/i/o/782697828/26927425c335dbf8cadcf703/Captura+de+Tela+2023-07-11+a%CC%80s+10.37.39.png?expires=1753826400&signature=7a21fe965df24dc30f4029a398cbac7523e379aa1ece6cae6dda66133b18d7c9&req=cyglEMB5lYNXFb4f3HP0gGgaZKVX5FewtisUQD%2B5eLym0HRIJPMNjHAHLl6V%0AR2rIBzpIzXbdVzYiWg%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/782697828/26927425c335dbf8cadcf703/Captura+de+Tela+2023-07-11+a%CC%80s+10.37.39.png?expires=1753826400&signature=7a21fe965df24dc30f4029a398cbac7523e379aa1ece6cae6dda66133b18d7c9&req=cyglEMB5lYNXFb4f3HP0gGgaZKVX5FewtisUQD%2B5eLym0HRIJPMNjHAHLl6V%0AR2rIBzpIzXbdVzYiWg%3D%3D%0A)

[![](https://downloads.intercomcdn.com/i/o/782700390/5d3021b5c5e54045413ef234/Captura+de+Tela+2023-07-11+a%CC%80s+10.40.08.png?expires=1753826400&signature=798b7a77de75bd295d3e95ad721da64c20fd8a18d0ec07e0fd2ada37ad3dac17&req=cyglEcl%2BnohfFb4f3HP0gJzFLmJenBog%2FGvVYOHT%2Beq6713QcyV%2BMj9QjLc7%0AlpqiHT4aTXkcmTRLQA%3D%3D%0A)](https://downloads.intercomcdn.com/i/o/782700390/5d3021b5c5e54045413ef234/Captura+de+Tela+2023-07-11+a%CC%80s+10.40.08.png?expires=1753826400&signature=798b7a77de75bd295d3e95ad721da64c20fd8a18d0ec07e0fd2ada37ad3dac17&req=cyglEcl%2BnohfFb4f3HP0gJzFLmJenBog%2FGvVYOHT%2Beq6713QcyV%2BMj9QjLc7%0AlpqiHT4aTXkcmTRLQA%3D%3D%0A)

## Boa sorte e bora bater meta todo dia!
