// n8n Webhook Authentication and Security Configuration
// Manages secure communication with n8n workflows

export interface N8nAuthConfig {
  webhookToken: string;
  apiKey?: string;
  basicAuth?: {
    username: string;
    password: string;
  };
  headers?: Record<string, string>;
  signatureValidation?: boolean;
  secretKey?: string;
}

export interface N8nEnvironmentConfig {
  development: {
    baseUrl: string;
    authToken: string;
    enableDebug: boolean;
  };
  production: {
    baseUrl: string;
    authToken: string;
    enableDebug: boolean;
  };
}

// Environment configuration - should be moved to environment variables in production
const N8N_CONFIG: N8nEnvironmentConfig = {
  development: {
    baseUrl: process.env.VITE_N8N_WEBHOOK_URL_DEV || 'http://localhost:5678/webhook',
    authToken: process.env.VITE_N8N_AUTH_TOKEN_DEV || 'dev-webhook-token',
    enableDebug: true,
  },
  production: {
    baseUrl: process.env.VITE_N8N_WEBHOOK_URL_PROD || 'https://your-n8n-instance.com/webhook',
    authToken: process.env.VITE_N8N_AUTH_TOKEN_PROD || '',
    enableDebug: false,
  },
};

export class N8nAuthManager {
  private config: N8nAuthConfig;
  private environment: 'development' | 'production';

  constructor(environment: 'development' | 'production' = 'production') {
    this.environment = environment;
    this.config = this.initializeConfig();
  }

  private initializeConfig(): N8nAuthConfig {
    const envConfig = N8N_CONFIG[this.environment];
    
    if (!envConfig.baseUrl || !envConfig.authToken) {
      console.warn('N8n configuration incomplete. Check environment variables.');
    }

    return {
      webhookToken: envConfig.authToken,
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'vendas-ia-website',
        'X-Webhook-Version': '1.0',
        'User-Agent': 'VendasIA-WebhookClient/1.0',
      },
      signatureValidation: this.environment === 'production',
      secretKey: process.env.VITE_N8N_SECRET_KEY || 'vendas-ia-secret-key',
    };
  }

  // Get authentication headers for webhook requests
  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      ...this.config.headers,
    };

    // Add webhook token to headers
    if (this.config.webhookToken) {
      headers['Authorization'] = `Bearer ${this.config.webhookToken}`;
      headers['X-Webhook-Token'] = this.config.webhookToken;
    }

    // Add basic auth if configured
    if (this.config.basicAuth) {
      const credentials = btoa(`${this.config.basicAuth.username}:${this.config.basicAuth.password}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }

    // Add API key if configured
    if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }

    return headers;
  }

  // Get base URL for webhook requests
  getWebhookUrl(endpoint?: string): string {
    const envConfig = N8N_CONFIG[this.environment];
    const baseUrl = envConfig.baseUrl.endsWith('/') 
      ? envConfig.baseUrl.slice(0, -1) 
      : envConfig.baseUrl;
    
    if (endpoint) {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
      return `${baseUrl}/${cleanEndpoint}`;
    }
    
    return baseUrl;
  }

  // Generate request signature for webhook validation
  generateSignature(payload: string): string {
    if (!this.config.secretKey) {
      throw new Error('Secret key not configured for signature generation');
    }

    // In a real implementation, you would use a proper HMAC signature
    // This is a simplified version for demonstration
    const timestamp = Date.now().toString();
    const data = `${timestamp}.${payload}`;
    
    // Simple hash (in production, use crypto.createHmac)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return `t=${timestamp},v1=${Math.abs(hash).toString(16)}`;
  }

  // Validate webhook signature (for incoming webhooks from n8n)
  validateSignature(payload: string, signature: string): boolean {
    if (!this.config.signatureValidation || !this.config.secretKey) {
      return true; // Skip validation in development or if not configured
    }

    try {
      const expectedSignature = this.generateSignature(payload);
      return signature === expectedSignature;
    } catch (error) {
      console.error('Signature validation error:', error);
      return false;
    }
  }

  // Get timeout configuration
  getTimeoutConfig(): { timeout: number; retryAttempts: number; retryDelay: number } {
    return {
      timeout: this.environment === 'development' ? 10000 : 30000, // 10s dev, 30s prod
      retryAttempts: this.environment === 'development' ? 2 : 3,
      retryDelay: 1000, // 1 second
    };
  }

  // Prepare webhook request options
  prepareRequestOptions(payload: Record<string, unknown>): {
    method: string;
    headers: Record<string, string>;
    body: string;
    signal?: AbortSignal;
  } {
    const headers = this.getAuthHeaders();
    const body = JSON.stringify(payload);
    
    // Add signature if validation is enabled
    if (this.config.signatureValidation) {
      headers['X-Webhook-Signature'] = this.generateSignature(body);
    }

    // Add timestamp for request tracking
    headers['X-Request-Timestamp'] = new Date().toISOString();

    const timeoutConfig = this.getTimeoutConfig();
    const controller = new AbortController();
    
    // Set timeout
    setTimeout(() => controller.abort(), timeoutConfig.timeout);

    return {
      method: 'POST',
      headers,
      body,
      signal: controller.signal,
    };
  }

  // Test webhook connectivity
  async testConnection(): Promise<{ success: boolean; message: string; latency?: number }> {
    const startTime = Date.now();
    
    try {
      const testPayload = {
        test: true,
        timestamp: new Date().toISOString(),
        source: 'vendas-ia-connection-test',
      };

      const options = this.prepareRequestOptions(testPayload);
      const response = await fetch(this.getWebhookUrl('test'), options);
      
      const latency = Date.now() - startTime;

      if (response.ok) {
        return {
          success: true,
          message: 'Connection successful',
          latency,
        };
      } else {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
          latency,
        };
      }
    } catch (error) {
      const latency = Date.now() - startTime;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection failed',
        latency,
      };
    }
  }

  // Update configuration (useful for dynamic configuration changes)
  updateConfig(updates: Partial<N8nAuthConfig>): void {
    this.config = {
      ...this.config,
      ...updates,
    };
  }

  // Get debug information (safe for logging)
  getDebugInfo(): Record<string, unknown> {
    const envConfig = N8N_CONFIG[this.environment];
    
    return {
      environment: this.environment,
      baseUrl: envConfig.baseUrl,
      hasAuthToken: !!this.config.webhookToken,
      hasApiKey: !!this.config.apiKey,
      hasBasicAuth: !!this.config.basicAuth,
      signatureValidation: this.config.signatureValidation,
      enableDebug: envConfig.enableDebug,
      headers: Object.keys(this.config.headers || {}),
    };
  }

  // Check if authentication is properly configured
  isConfigured(): boolean {
    const envConfig = N8N_CONFIG[this.environment];
    return !!(envConfig.baseUrl && envConfig.authToken);
  }

  // Get current environment
  getEnvironment(): 'development' | 'production' {
    return this.environment;
  }
}

// Singleton instance for global use
let authManager: N8nAuthManager | null = null;

// Factory function to get authentication manager
export function getN8nAuth(environment?: 'development' | 'production'): N8nAuthManager {
  if (!authManager || (environment && authManager.getEnvironment() !== environment)) {
    const env = environment || (process.env.NODE_ENV === 'production' ? 'production' : 'development');
    authManager = new N8nAuthManager(env);
  }
  return authManager;
}

// Convenience function to test n8n connection
export async function testN8nConnection(): Promise<{ success: boolean; message: string; latency?: number }> {
  const auth = getN8nAuth();
  return await auth.testConnection();
}

// Error class for n8n authentication errors
export class N8nAuthError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'N8nAuthError';
  }
}

// Middleware function to add authentication to fetch requests
export async function authenticatedFetch(
  url: string,
  payload: Record<string, unknown>,
  options: RequestInit = {}
): Promise<Response> {
  const auth = getN8nAuth();
  
  if (!auth.isConfigured()) {
    throw new N8nAuthError('N8n authentication not configured');
  }

  const requestOptions = auth.prepareRequestOptions(payload);
  const finalOptions: RequestInit = {
    ...options,
    ...requestOptions,
    headers: {
      ...options.headers,
      ...requestOptions.headers,
    },
  };

  const fullUrl = auth.getWebhookUrl(url);
  
  try {
    const response = await fetch(fullUrl, finalOptions);
    
    if (!response.ok) {
      throw new N8nAuthError(
        `Webhook request failed: ${response.status} ${response.statusText}`,
        response.status,
        response
      );
    }
    
    return response;
  } catch (error) {
    if (error instanceof N8nAuthError) {
      throw error;
    }
    
    throw new N8nAuthError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export default N8nAuthManager;