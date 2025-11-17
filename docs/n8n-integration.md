# Sistema de Integração n8n - Vendas.IA

## Visão Geral

Este documento descreve o sistema completo de integração com n8n implementado na plataforma Vendas.IA para automação de leads, WhatsApp e analytics.

## Arquitetura do Sistema

### Componentes Principais

1. **n8n-client.ts** - Cliente principal para comunicação com webhooks
2. **n8n-auth.ts** - Sistema de autenticação e segurança
3. **analytics.ts** - Rastreamento de eventos e analytics
4. **form-handlers.ts** - Handlers para processamento de formulários
5. **whatsapp.ts** - Integração com WhatsApp

### Fluxo de Dados

```
Website → Form Submission → form-handlers.ts → n8n-client.ts → n8n Workflows
                                                            ↓
Analytics Events → analytics.ts → n8n Analytics Workflow
                                                            ↓
WhatsApp Triggers → whatsapp.ts → n8n WhatsApp Automation
```

## Configuração

### 1. Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
# URLs dos webhooks
VITE_N8N_WEBHOOK_URL_DEV=http://localhost:5678/webhook
VITE_N8N_WEBHOOK_URL_PROD=https://your-n8n.com/webhook

# Tokens de autenticação
VITE_N8N_AUTH_TOKEN_DEV=dev-token
VITE_N8N_AUTH_TOKEN_PROD=prod-token

# WhatsApp
VITE_WHATSAPP_NUMBER=5516997787674
```

### 2. Workflows n8n Necessários

#### A. Contact Form Workflow
- **Endpoint**: `/webhook/contact-form`
- **Método**: POST
- **Função**: Processar formulários de contato
- **Saída**: Email automático + lead no CRM

#### B. WhatsApp Direct Workflow
- **Endpoint**: `/webhook/whatsapp-direct`
- **Método**: POST
- **Função**: Enviar mensagens WhatsApp urgentes
- **Saída**: Mensagem automática via WhatsApp Business API

#### C. Analytics Tracking Workflow
- **Endpoint**: `/webhook/link-tracking`
- **Método**: POST
- **Função**: Rastrear cliques e eventos
- **Saída**: Dados no analytics/dashboard

## Uso dos Componentes

### 1. Formulário de Contato

```tsx
import { handleContactFormSubmission } from '@/lib/form-handlers';

const result = await handleContactFormSubmission({
  personalInfo: { name, email, phone },
  businessInfo: { company, industry },
  consent: { lgpdConsent: true },
  // ...outros dados
});
```

### 2. Analytics

```tsx
import { trackWhatsAppClick, initializeAnalytics } from '@/lib/analytics';

// Inicializar analytics
initializeAnalytics('user-id');

// Rastrear clique no WhatsApp
await trackWhatsAppClick({
  phoneNumber: '5516997787674',
  message: 'Olá, gostaria de saber mais sobre...',
  source: 'hero-section',
  urgency: 'high'
});
```

### 3. WhatsApp Button

```tsx
import { WhatsAppButton } from '@/components/WhatsAppButton';

<WhatsAppButton
  variant="urgent"
  template="DEMO_REQUEST"
  leadData={{ name: 'João', company: 'Empresa XYZ' }}
  productInterest="leads-rapido"
/>
```

## Tipos de Dados

### ContactForm Request

```typescript
interface N8nContactFormRequest {
  webhookSource: 'vendas-ia-website';
  submissionId: string;
  timestamp: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  businessInfo?: {
    company?: string;
    industry?: Industry;
    size?: CompanySize;
  };
  consent: {
    lgpdConsent: true;
    marketingConsent?: boolean;
    whatsappConsent?: boolean;
  };
  urgencyLevel: UrgencyLevel;
  leadScore: number;
}
```

### WhatsApp Request

```typescript
interface N8nWhatsAppRequest {
  phoneNumber: string;
  messageType: WhatsAppMessageType;
  leadData: {
    name: string;
    company: string;
    interest?: ProductInterest;
    urgencyLevel?: UrgencyLevel;
  };
  customMessage?: string;
}
```

### Analytics Event

```typescript
interface N8nLinkTrackingRequest {
  linkType: LinkType;
  clickData: {
    timestamp: string;
    userAgent: string;
    sessionId?: string;
    eventType?: string;
    customData?: Record<string, unknown>;
  };
}
```

## Segurança

### Autenticação

1. **Bearer Token**: Incluído no header `Authorization`
2. **Webhook Token**: Header `X-Webhook-Token`
3. **Signature Validation**: Header `X-Webhook-Signature` (produção)
4. **Request Timestamp**: Header `X-Request-Timestamp`

### Retry Logic

- **Tentativas**: 3x por padrão
- **Delay**: 1 segundo entre tentativas
- **Timeout**: 30 segundos (produção), 10 segundos (dev)

### Rate Limiting

- Detecção automática de rate limiting
- Retry após `retryAfter` segundos
- Fallback gracioso em caso de limite

## Monitoramento

### Logs

```typescript
// Debug logs (desenvolvimento)
console.log('N8n request:', { endpoint, payload });

// Error logs (sempre)
console.error('N8n error:', error);
```

### Métricas

- **Latência**: Tempo de resposta dos webhooks
- **Taxa de Sucesso**: % de requests bem-sucedidos
- **Rate Limits**: Quantos limits foram atingidos
- **Retry Rate**: % de requests que precisaram retry

## Testing

### Desenvolvimento Local

1. Execute n8n localmente:
```bash
npx n8n start
```

2. Configure variáveis de desenvolvimento
3. Teste conexão:
```tsx
import { testN8nConnection } from '@/lib/n8n-auth';
const result = await testN8nConnection();
```

### Workflows de Teste

Cada workflow deve ter um endpoint `/test` para validação:

```json
{
  "test": true,
  "timestamp": "2024-01-01T00:00:00Z",
  "source": "vendas-ia-connection-test"
}
```

## Troubleshooting

### Problemas Comuns

1. **401 Unauthorized**
   - Verificar `VITE_N8N_AUTH_TOKEN`
   - Confirmar endpoint correto

2. **Timeout**
   - Verificar conectividade de rede
   - Aumentar timeout se necessário

3. **Rate Limited**
   - Implementar backoff exponencial
   - Verificar limites do n8n

4. **Invalid Webhook**
   - Confirmar estrutura do payload
   - Verificar tipos de dados

### Debug Mode

```typescript
// Habilitar debug
const auth = getN8nAuth('development');
console.log(auth.getDebugInfo());

// Test endpoints
const result = await testN8nConnection();
console.log('Connection test:', result);
```

## Roadmap

### Funcionalidades Planejadas

- [ ] Webhook signature validation em produção
- [ ] Retry com backoff exponencial
- [ ] Circuit breaker pattern
- [ ] Métricas detalhadas
- [ ] Dashboard de monitoramento
- [ ] Webhook health checks automáticos

### Otimizações

- [ ] Batch processing para analytics
- [ ] Caching de responses
- [ ] Compression de payloads
- [ ] Connection pooling

## Suporte

Para problemas ou dúvidas sobre a integração n8n:

1. Verificar logs de erro
2. Testar conectividade
3. Validar configuração de ambiente
4. Consultar documentação n8n oficial

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0