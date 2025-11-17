#!/usr/bin/env node

/**
 * Demo de Teste de Webhooks - Vendas.IA
 * Usa httpbin.org para simular respostas e demonstrar funcionamento
 *
 * Uso: node test-webhooks-demo.js
 */

import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configuração de demo usando httpbin.org
const CONFIG = {
  baseUrl: 'https://httpbin.org/post', // Simula webhook que sempre responde
  authToken: 'demo-token-123',
  timeout: 10000,
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
function makeRequest(data) {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.baseUrl);
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
        'User-Agent': 'Vendas.IA-Demo/1.0',
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

// Dados de teste
const demoData = {
  webhook_type: 'vendas-ia-contact-form',
  demo: true,
  submissionId: `demo-${Date.now()}`,
  timestamp: new Date().toISOString(),
  personalInfo: {
    name: 'João Demo',
    email: 'joao.demo@vendas.ia.br',
    phone: '5516999887766',
  },
  businessInfo: {
    company: 'Empresa Demo Ltda',
    industry: 'technology',
  },
  message: 'Esta é uma demonstração do sistema de webhooks do Vendas.IA'
};

async function runDemo() {
  log('🎭 DEMONSTRAÇÃO - Teste de Webhooks Vendas.IA', 'cyan');
  log('=' * 60, 'cyan');
  log(`🌐 Usando httpbin.org como simulador de webhook`, 'blue');
  log(`📦 Dados que serão enviados:`, 'yellow');
  console.log(JSON.stringify(demoData, null, 2));
  log('\n🚀 Enviando requisição...', 'cyan');

  try {
    const startTime = Date.now();
    const response = await makeRequest(demoData);
    const duration = Date.now() - startTime;

    log(`\n✅ SUCESSO! Resposta recebida em ${duration}ms`, 'green');
    log(`📊 Status HTTP: ${response.statusCode}`, 'blue');

    if (response.body && response.body.json) {
      log('\n📦 Dados recebidos pelo webhook (confirmação):', 'yellow');
      console.log(JSON.stringify(response.body.json, null, 2));
    }

    if (response.body && response.body.headers) {
      log('\n📋 Headers enviados:', 'yellow');
      console.log(JSON.stringify(response.body.headers, null, 2));
    }

    log('\n🎉 Demo concluída com sucesso!', 'green');
    log('💡 Para usar com seu n8n real:', 'cyan');
    log('   1. Configure as variáveis de ambiente:', 'cyan');
    log('      export VITE_N8N_WEBHOOK_URL_DEV="http://localhost:5678/webhook"', 'cyan');
    log('      export VITE_N8N_AUTH_TOKEN_DEV="seu-token-real"', 'cyan');
    log('   2. Execute: node test-webhooks.js', 'cyan');

  } catch (error) {
    log(`❌ Erro na demonstração: ${error.message}`, 'red');
    log('🔧 Verificações:', 'yellow');
    log('   - Conexão com internet ativa?', 'yellow');
    log('   - Firewall bloqueando requisições HTTPS?', 'yellow');
  }
}

// Verificar se é o módulo principal
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
  runDemo().catch(error => {
    log(`💥 Erro fatal: ${error.message}`, 'red');
    process.exit(1);
  });
}

export { runDemo };