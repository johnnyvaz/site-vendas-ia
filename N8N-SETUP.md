# Configuração do n8n para Webhooks Vendas.IA

## 🚀 Instalação Rápida do n8n

### Opção 1: Docker (Recomendado)
```bash
# Criar container n8n
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Acesse: http://localhost:5678
```

### Opção 2: NPM
```bash
# Instalar globalmente
npm install n8n -g

# Executar
n8n start

# Acesse: http://localhost:5678
```

### Opção 3: npx (Teste rápido)
```bash
npx n8n

# Acesse: http://localhost:5678
```

## ⚙️ Configuração dos Workflows

### 1. Workflow: Contact Form
1. **Webhook Node**:
   - HTTP Method: `POST`
   - Path: `/contact-form`
   - Authentication: `Header Auth`
   - Credential Name: `vendas-ia-auth`

2. **Function Node** (Processar dados):
```javascript
// Validar e processar dados do formulário
const data = $json;

// Calcular lead score
let score = 0;
if (data.personalInfo?.name) score += 10;
if (data.personalInfo?.email) score += 15;
if (data.personalInfo?.phone) score += 10;
if (data.businessInfo?.company) score += 20;
if (data.interests?.timeline === 'immediate') score += 25;

// Determinar urgência
let urgency = 'low';
if (score >= 80) urgency = 'high';
else if (score >= 60) urgency = 'medium';

return {
  json: {
    ...data,
    leadScore: score,
    urgencyLevel: urgency,
    processedAt: new Date().toISOString()
  }
};
```

3. **HTTP Response Node**:
```json
{
  "success": true,
  "message": "Formulário recebido com sucesso",
  "data": {
    "submissionId": "{{$json.submissionId}}",
    "leadScore": "{{$json.leadScore}}",
    "urgencyLevel": "{{$json.urgencyLevel}}"
  },
  "timestamp": "{{$json.processedAt}}"
}
```

### 2. Workflow: WhatsApp Direct
1. **Webhook Node**:
   - Path: `/whatsapp-direct`
   - Method: `POST`

2. **Function Node** (Formatar mensagem):
```javascript
const data = $json;

// Formatar mensagem para WhatsApp Business API
const message = {
  to: data.messageData.recipient,
  type: 'text',
  text: {
    body: data.messageData.message
  }
};

return {
  json: {
    whatsappMessage: message,
    leadData: data.leadData,
    timestamp: new Date().toISOString()
  }
};
```

3. **WhatsApp Business Node** (se disponível) ou **HTTP Request Node**

### 3. Workflow: Link Tracking
1. **Webhook Node**:
   - Path: `/link-tracking`
   - Method: `POST`

2. **Set Node** (Salvar analytics):
```javascript
return {
  json: {
    eventType: 'link_click',
    linkType: $json.linkType,
    timestamp: $json.clickData.timestamp,
    sessionId: $json.clickData.sessionId,
    userAgent: $json.clickData.userAgent,
    isMobile: $json.deviceInfo.isMobile,
    processed: true
  }
};
```

## 🔐 Configuração de Autenticação

### 1. Criar Credential
1. Vá em **Credentials** > **Create New**
2. Escolha **Header Auth**
3. Configure:
   - **Name**: `vendas-ia-auth`
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer SEU_TOKEN_AQUI`

### 2. Gerar Token Seguro
```bash
# Gerar token aleatório
openssl rand -hex 32

# Ou use o Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🌐 URLs dos Webhooks

Após configurar os workflows, suas URLs serão:
```
http://localhost:5678/webhook/contact-form
http://localhost:5678/webhook/whatsapp-direct
http://localhost:5678/webhook/link-tracking
```

## 🧪 Testar Configuração

### 1. Configurar Variáveis
```bash
export VITE_N8N_WEBHOOK_URL_DEV="http://localhost:5678/webhook"
export VITE_N8N_AUTH_TOKEN_DEV="seu-token-gerado"
```

### 2. Testar com Script
```bash
# Testar tudo
node test-webhooks.js

# Testar endpoint específico
node test-webhooks.js contact-form
```

### 3. Testar com Interface Web
```bash
# Iniciar projeto
npm run dev

# Acessar teste visual
http://localhost:8080/test-webhooks.html
```

## 📊 Monitoramento

### Logs do n8n
- **Interface**: http://localhost:5678/executions
- **Logs**: Executions > Ver detalhes de cada execução
- **Debug**: Ativar em Settings > Log Level: debug

### Troubleshooting Comum

1. **CORS Error**:
   - Adicionar headers no HTTP Response:
   ```json
   {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, OPTIONS",
     "Access-Control-Allow-Headers": "Content-Type, Authorization"
   }
   ```

2. **401 Unauthorized**:
   - Verificar token na credential
   - Verificar header `Authorization: Bearer TOKEN`

3. **404 Not Found**:
   - Confirmar paths dos webhooks
   - Verificar se workflows estão ativos

4. **Timeout**:
   - Verificar se n8n está respondendo
   - Aumentar timeout no script de teste

## 🎯 Exemplo Completo

Para um teste rápido, importe este workflow JSON:

```json
{
  "name": "Vendas.IA - Contact Form",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "contact-form",
        "responseMode": "responseNode",
        "authentication": "headerAuth"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [240, 300],
      "webhookId": "contact-form-webhook"
    },
    {
      "parameters": {
        "functionCode": "// Processar dados do formulário\nconst data = $json;\n\n// Calcular lead score básico\nlet score = 0;\nif (data.personalInfo?.name) score += 10;\nif (data.personalInfo?.email) score += 15;\nif (data.personalInfo?.phone) score += 10;\nif (data.businessInfo?.company) score += 20;\nif (data.interests?.timeline === 'immediate') score += 25;\n\nreturn {\n  json: {\n    ...data,\n    leadScore: score,\n    urgencyLevel: score >= 60 ? 'high' : 'low',\n    processedAt: new Date().toISOString()\n  }\n};"
      },
      "name": "Process Data",
      "type": "n8n-nodes-base.function",
      "position": [460, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"success\": true,\n  \"message\": \"Formulário processado com sucesso\",\n  \"data\": {\n    \"submissionId\": \"{{$json.submissionId}}\",\n    \"leadScore\": {{$json.leadScore}},\n    \"urgencyLevel\": \"{{$json.urgencyLevel}}\"\n  },\n  \"timestamp\": \"{{$json.processedAt}}\"\n}"
      },
      "name": "Respond",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [680, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Process Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Process Data": {
      "main": [
        [
          {
            "node": "Respond",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

Salve isso em um arquivo `.json` e importe no n8n!

## ✅ Checklist Final

- [ ] n8n instalado e rodando na porta 5678
- [ ] Workflows criados para os 3 endpoints
- [ ] Credential de autenticação configurada
- [ ] Token seguro gerado
- [ ] Variáveis de ambiente configuradas
- [ ] Testes executados com sucesso
- [ ] Logs sendo monitorados

Pronto! Seus webhooks estão configurados e prontos para uso.