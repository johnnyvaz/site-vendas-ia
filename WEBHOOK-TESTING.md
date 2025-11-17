# Guia Completo de Testes para Webhooks n8n

## 🎯 Configuração Inicial

### 1. Configurar Variáveis de Ambiente
Crie o arquivo `.env.local`:
```bash
# URLs dos webhooks do n8n
VITE_N8N_WEBHOOK_URL_DEV=http://localhost:5678/webhook
VITE_N8N_AUTH_TOKEN_DEV=seu-token-aqui

# Para produção
VITE_N8N_WEBHOOK_URL_PROD=https://seu-n8n.com/webhook
VITE_N8N_AUTH_TOKEN_PROD=seu-token-producao

# WhatsApp do Johnny
VITE_WHATSAPP_NUMBER=5516997787674
```

## 🛠️ Métodos de Teste

### 1. Teste Manual via Interface
Execute o projeto e teste os formulários:
```bash
npm run dev
```
- Acesse http://localhost:8080
- Preencha o formulário de contato
- Teste os botões de WhatsApp
- Verifique no console do navegador

### 2. Teste com cURL

#### Formulário de Contato:
```bash
curl -X POST http://localhost:5678/webhook/contact-form \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-token-aqui" \
  -d '{
    "submissionId": "test-123",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "personalInfo": {
      "name": "João Teste",
      "email": "joao@teste.com",
      "phone": "5516999887766",
      "position": "CEO"
    },
    "businessInfo": {
      "company": "Empresa Teste",
      "website": "https://empresateste.com",
      "industry": "technology",
      "size": "10-50",
      "revenue": "100k-500k"
    },
    "interests": {
      "products": ["disparo-rapido", "leads-rapido"],
      "timeline": "immediate",
      "budget": "15k-50k",
      "message": "Preciso automatizar vendas urgente"
    },
    "consent": {
      "marketing": true,
      "whatsapp": true,
      "terms": true,
      "lgpd": true
    },
    "analytics": {
      "source": "website",
      "medium": "form",
      "campaign": "landing-page",
      "sessionId": "session-123"
    }
  }'
```

#### WhatsApp Direto:
```bash
curl -X POST http://localhost:5678/webhook/whatsapp-direct \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-token-aqui" \
  -d '{
    "messageData": {
      "recipient": "5516999887766",
      "message": "Olá! Teste de webhook do site Vendas.IA",
      "template": "URGENT_LEAD",
      "priority": "urgent"
    },
    "leadData": {
      "name": "João Teste",
      "company": "Empresa Teste",
      "interest": "disparo-rapido",
      "urgencyLevel": "urgent",
      "source": "website"
    },
    "trackingParams": {
      "source": "test",
      "medium": "webhook",
      "campaign": "manual-test"
    }
  }'
```

#### Tracking de Link:
```bash
curl -X POST http://localhost:5678/webhook/link-tracking \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-token-aqui" \
  -d '{
    "linkType": "whatsapp-cta",
    "clickData": {
      "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
      "userAgent": "curl/test",
      "referrer": "https://vendas.ia.br",
      "sessionId": "test-session-123",
      "leadId": "lead-456"
    },
    "deviceInfo": {
      "isMobile": false,
      "screenResolution": "1920x1080",
      "platform": "Linux"
    }
  }'
```

### 3. Teste com Postman

#### Configuração da Collection:
1. Importe esta collection no Postman:

```json
{
  "info": {
    "name": "Vendas.IA Webhooks",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5678/webhook"
    },
    {
      "key": "authToken",
      "value": "seu-token-aqui"
    }
  ],
  "item": [
    {
      "name": "Contact Form",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{authToken}}"
          }
        ],
        "url": "{{baseUrl}}/contact-form",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"submissionId\": \"postman-{{$timestamp}}\",\n  \"timestamp\": \"{{$isoTimestamp}}\",\n  \"personalInfo\": {\n    \"name\": \"Teste Postman\",\n    \"email\": \"teste@postman.com\",\n    \"phone\": \"5516999887766\"\n  }\n}"
        }
      }
    }
  ]
}
```

### 4. Teste Automatizado via Jest

Crie arquivo de teste para webhooks:
```bash
npm run test src/lib/__tests__/n8n-client.test.ts
```

### 5. Teste no Console do Navegador

Abra o DevTools no site e execute:
```javascript
// Teste do formulário de contato
const testContactForm = async () => {
  const { submitContactFormToN8n } = await import('/src/lib/n8n-client.ts');

  const formData = {
    submissionId: `browser-test-${Date.now()}`,
    timestamp: new Date().toISOString(),
    personalInfo: {
      name: 'Teste Browser',
      email: 'teste@browser.com',
      phone: '5516999887766'
    },
    businessInfo: {
      company: 'Empresa Browser',
      industry: 'technology'
    },
    interests: {
      products: ['disparo-rapido'],
      timeline: 'immediate',
      message: 'Teste via console do navegador'
    },
    consent: {
      marketing: true,
      whatsapp: true,
      terms: true,
      lgpd: true
    },
    analytics: {
      source: 'browser-console',
      sessionId: 'console-session'
    }
  };

  try {
    const response = await submitContactFormToN8n(formData);
    console.log('✅ Sucesso:', response);
  } catch (error) {
    console.error('❌ Erro:', error);
  }
};

// Execute o teste
testContactForm();
```

## 🔍 Verificação de Respostas

### Respostas Esperadas:

#### Sucesso:
```json
{
  "success": true,
  "message": "Webhook processado com sucesso",
  "data": {
    "submissionId": "vendas-123456",
    "leadScore": 85,
    "urgencyLevel": "high",
    "processedAt": "2025-01-15T10:30:00Z"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

#### Erro de Validação:
```json
{
  "success": false,
  "error": {
    "message": "Dados inválidos",
    "code": "VALIDATION_ERROR",
    "details": {
      "field": "email",
      "issue": "Email inválido"
    },
    "retryable": false
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

#### Rate Limit:
```json
{
  "success": false,
  "message": "Muitas solicitações",
  "retryAfter": 60,
  "limit": 100,
  "remaining": 0,
  "resetTime": "2025-01-15T11:00:00Z"
}
```

## 🚨 Troubleshooting

### Erros Comuns:

1. **CORS Error**: Configure CORS no n8n
2. **401 Unauthorized**: Verifique o token de auth
3. **404 Not Found**: Confirme a URL do webhook
4. **429 Too Many Requests**: Aguarde o rate limit
5. **500 Server Error**: Verifique logs do n8n

### Debug no Console:
```javascript
// Habilitar logs detalhados
localStorage.setItem('debug', 'vendas-ia:*');

// Verificar configuração
console.log('N8N Config:', {
  url: import.meta.env.VITE_N8N_WEBHOOK_URL_DEV,
  hasToken: !!import.meta.env.VITE_N8N_AUTH_TOKEN_DEV
});
```

## 📊 Monitoramento

### Logs para Verificar:
1. **Console do navegador**: Erros JavaScript
2. **Network tab**: Requisições HTTP
3. **n8n logs**: Processamento do webhook
4. **Performance tab**: Timing das requisições

### Métricas Importantes:
- Taxa de sucesso dos webhooks
- Tempo de resposta médio
- Erros por tipo
- Volume de requisições

## ✅ Checklist de Testes

- [ ] Formulário de contato funciona
- [ ] WhatsApp direto funciona
- [ ] Tracking de links funciona
- [ ] Rate limiting é respeitado
- [ ] Retry logic funciona em caso de erro
- [ ] Dados são validados corretamente
- [ ] LGPD compliance é verificado
- [ ] Analytics são coletados
- [ ] Lead scoring é calculado
- [ ] Urgency level é determinado
- [ ] Respostas de erro são tratadas
- [ ] Timeout é respeitado (30s)

Use este guia para testar completamente a integração dos webhooks!