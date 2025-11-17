#!/usr/bin/env node

/**
 * Script de Teste para Webhooks do Vendas.IA
 * Testa todos os endpoints n8n configurados
 *
 * Uso: node test-webhooks.js [endpoint]
 *
 * Endpoints disponíveis:
 * - contact-form
 * - whatsapp-direct
 * - link-tracking
 * - all (padrão)
 */

import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configuração dos testes
const CONFIG = {
  // URLs de teste (ajuste conforme necessário)
  baseUrl: process.env.VITE_N8N_WEBHOOK_URL_DEV || 'http://localhost:5678/webhook',
  authToken: process.env.VITE_N8N_AUTH_TOKEN_DEV || 'test-token',
  timeout: 10000, // 10 segundos
};

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Função para fazer requisições HTTP
function makeRequest(endpoint, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${CONFIG.baseUrl}/${endpoint}`);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const postData = JSON.stringify(data);

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${CONFIG.authToken}`,
        'User-Agent': 'Vendas.IA-Test/1.0',
      },
      timeout: CONFIG.timeout,
    };

    const req = client.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null,
          };
          resolve(response);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
            parseError: error.message,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

// Dados de teste para cada endpoint
const testData = {
  'contact-form': {
    submissionId: `test-${Date.now()}`,
    timestamp: new Date().toISOString(),
    personalInfo: {
      name: 'João Teste Webhook',
      email: 'joao.teste@vendas.ia.br',
      phone: '5516999887766',
      position: 'CEO',
    },
    businessInfo: {
      company: 'Empresa Teste Ltda',
      website: 'https://empresateste.com.br',
      industry: 'technology',
      size: '10-50',
      revenue: '100k-500k',
    },
    interests: {
      products: ['disparo-rapido', 'leads-rapido'],
      timeline: 'immediate',
      budget: '15k-50k',
      message: 'Preciso automatizar vendas com IA urgentemente',
    },
    consent: {
      marketing: true,
      whatsapp: true,
      terms: true,
      lgpd: true,
    },
    analytics: {
      source: 'test-script',
      medium: 'webhook',
      campaign: 'automated-test',
      sessionId: `test-session-${Date.now()}`,
    },
  },

  'whatsapp-direct': {
    messageData: {
      recipient: '5516997787674', // Johnny's WhatsApp
      message: 'Teste automatizado do webhook WhatsApp - Vendas.IA',
      template: 'URGENT_LEAD',
      priority: 'urgent',
    },
    leadData: {
      name: 'João Teste Webhook',
      company: 'Empresa Teste Ltda',
      interest: 'disparo-rapido',
      urgencyLevel: 'urgent',
      source: 'webhook-test',
    },
    trackingParams: {
      source: 'test-script',
      medium: 'whatsapp',
      campaign: 'webhook-test',
      content: 'automated-message',
    },
  },

  'link-tracking': {
    linkType: 'whatsapp-cta',
    clickData: {
      timestamp: new Date().toISOString(),
      userAgent: 'Vendas.IA-Test-Script/1.0',
      referrer: 'https://vendas.ia.br',
      sessionId: `test-session-${Date.now()}`,
      leadId: `test-lead-${Date.now()}`,
    },
    deviceInfo: {
      isMobile: false,
      screenResolution: '1920x1080',
      platform: 'Test Environment',
    },
  },
};

// Função para testar um endpoint específico
async function testEndpoint(endpoint) {
  log(`\n🧪 Testando endpoint: ${endpoint}`, 'cyan');
  log(`📍 URL: ${CONFIG.baseUrl}/${endpoint}`, 'blue');

  const data = testData[endpoint];
  if (!data) {
    log(`❌ Dados de teste não encontrados para: ${endpoint}`, 'red');
    return false;
  }

  try {
    const startTime = Date.now();
    const response = await makeRequest(endpoint, data);
    const duration = Date.now() - startTime;

    // Análise da resposta
    log(`⏱️  Tempo de resposta: ${duration}ms`, 'yellow');
    log(`📊 Status: ${response.statusCode}`, response.statusCode < 300 ? 'green' : 'red');

    if (response.parseError) {
      log(`⚠️  Erro ao parsear JSON: ${response.parseError}`, 'yellow');
      log(`📄 Body raw: ${response.body}`, 'yellow');
    } else if (response.body) {
      log(`📦 Resposta:`, 'blue');
      console.log(JSON.stringify(response.body, null, 2));
    }

    // Verificação de sucesso
    const isSuccess = response.statusCode >= 200 && response.statusCode < 300;

    if (isSuccess) {
      log(`✅ ${endpoint}: SUCESSO`, 'green');

      // Verificações específicas
      if (response.body) {
        if (response.body.success !== undefined && !response.body.success) {
          log(`⚠️  Campo 'success' indica falha`, 'yellow');
        }
        if (response.body.error) {
          log(`⚠️  Erro retornado: ${response.body.error.message || 'N/A'}`, 'yellow');
        }
      }
    } else {
      log(`❌ ${endpoint}: FALHA (${response.statusCode})`, 'red');
    }

    return isSuccess;

  } catch (error) {
    log(`❌ ${endpoint}: ERRO - ${error.message}`, 'red');
    return false;
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const targetEndpoint = args[0] || 'all';

  log('🚀 Iniciando testes dos webhooks Vendas.IA', 'cyan');
  log(`🔧 Base URL: ${CONFIG.baseUrl}`, 'blue');
  log(`🔑 Token configurado: ${CONFIG.authToken ? 'Sim' : 'Não'}`, CONFIG.authToken ? 'green' : 'red');

  if (!CONFIG.authToken || CONFIG.authToken === 'test-token') {
    log('\n⚠️  ATENÇÃO: Configure as variáveis de ambiente:', 'yellow');
    log('export VITE_N8N_WEBHOOK_URL_DEV="http://localhost:5678/webhook"', 'yellow');
    log('export VITE_N8N_AUTH_TOKEN_DEV="seu-token-aqui"', 'yellow');
  }

  let results = {};
  let endpoints = [];

  if (targetEndpoint === 'all') {
    endpoints = Object.keys(testData);
  } else if (testData[targetEndpoint]) {
    endpoints = [targetEndpoint];
  } else {
    log(`❌ Endpoint inválido: ${targetEndpoint}`, 'red');
    log(`📝 Endpoints disponíveis: ${Object.keys(testData).join(', ')}`, 'cyan');
    process.exit(1);
  }

  // Executar testes
  for (const endpoint of endpoints) {
    results[endpoint] = await testEndpoint(endpoint);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay entre testes
  }

  // Resumo dos resultados
  log('\n📊 RESUMO DOS TESTES:', 'cyan');
  log('=' * 50, 'cyan');

  let successCount = 0;
  for (const [endpoint, success] of Object.entries(results)) {
    const status = success ? '✅ PASSOU' : '❌ FALHOU';
    const color = success ? 'green' : 'red';
    log(`${endpoint.padEnd(20)} ${status}`, color);
    if (success) successCount++;
  }

  const totalTests = Object.keys(results).length;
  const successRate = ((successCount / totalTests) * 100).toFixed(1);

  log(`\n🎯 Taxa de sucesso: ${successCount}/${totalTests} (${successRate}%)`,
    successRate == 100 ? 'green' : successRate >= 50 ? 'yellow' : 'red');

  if (successRate == 100) {
    log('🎉 Todos os testes passaram! Webhooks funcionando perfeitamente.', 'green');
  } else if (successRate >= 50) {
    log('⚠️  Alguns testes falharam. Verifique a configuração.', 'yellow');
  } else {
    log('🚨 Muitos testes falharam. Verifique se o n8n está rodando e configurado.', 'red');
  }

  process.exit(successCount === totalTests ? 0 : 1);
}

// Verificar se é o módulo principal
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Executar se chamado diretamente
if (process.argv[1] === __filename) {
  main().catch(error => {
    log(`💥 Erro fatal: ${error.message}`, 'red');
    process.exit(1);
  });
}

export { testEndpoint, makeRequest, testData };