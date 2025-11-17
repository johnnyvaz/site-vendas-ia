// n8n Webhook Client for Vendas.IA
// Handles all communication with n8n workflows for email and WhatsApp automation

import type {
  N8nWebhookConfig,
  N8nContactFormRequest,
  N8nWhatsAppRequest,
  N8nLinkTrackingRequest,
  N8nWebhookResponse,
  N8nErrorResponse,
  N8nRateLimitResponse,
  N8nErrorCode,
} from '@/types/n8n';
import { 
  N8N_ENDPOINTS,
  N8N_CONFIG_DEFAULTS,
  isN8nError,
  isN8nRateLimit,
  isN8nSuccess,
} from '@/types/n8n';
import { getN8nAuth, authenticatedFetch, N8nAuthError } from './n8n-auth';

// N8n client class with retry logic and error handling
export class N8nWebhookClient {
  private config: N8nWebhookConfig;
  private abortController: AbortController | null = null;

  constructor(config: Partial<N8nWebhookConfig>) {
    this.config = {
      ...N8N_CONFIG_DEFAULTS,
      ...config,
    } as N8nWebhookConfig;
  }

  // Main method to submit contact form to n8n
  async submitContactForm(
    formData: N8nContactFormRequest
  ): Promise<N8nWebhookResponse> {
    return this.makeRequest('/webhook/contact-form', formData as unknown as Record<string, unknown>);
  }

  // Send urgent WhatsApp message via n8n
  async sendWhatsAppMessage(
    messageData: N8nWhatsAppRequest
  ): Promise<N8nWebhookResponse> {
    return this.makeRequest('/webhook/whatsapp-direct', messageData as unknown as Record<string, unknown>);
  }

  // Track link clicks for analytics
  async trackLinkClick(
    trackingData: N8nLinkTrackingRequest
  ): Promise<N8nWebhookResponse> {
    return this.makeRequest('/webhook/link-tracking', trackingData as unknown as Record<string, unknown>);
  }

  // Generic method to make webhook requests with retry logic
  private async makeRequest(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<N8nWebhookResponse> {
    this.abortController = new AbortController();

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const response = await this.fetchWithTimeout(endpoint, data);

        if (isN8nSuccess(response)) {
          return response;
        }

        if (isN8nRateLimit(response)) {
          if (attempt === this.config.retryAttempts) {
            throw new N8nRateLimitError(response);
          }
          await this.wait(response.retryAfter * 1000);
          continue;
        }

        if (isN8nError(response)) {
          if (response.error.retryable && attempt < this.config.retryAttempts) {
            await this.wait(this.config.retryDelay * attempt);
            continue;
          }
          throw new N8nApiError(response);
        }

        throw new N8nUnknownError('Unexpected response format', response);

      } catch (error) {
        if (error instanceof N8nError) {
          throw error;
        }

        if (error instanceof Error && error.name === 'AbortError') {
          throw new N8nNetworkError('Request was aborted');
        }

        if (attempt === this.config.retryAttempts) {
          if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new N8nNetworkError('Network connection failed');
          }
          throw new N8nUnknownError('Unknown error occurred', error);
        }

        await this.wait(this.config.retryDelay * attempt);
      }
    }

    throw new N8nNetworkError('Max retry attempts exceeded');
  }

  // Make HTTP request with timeout
  private async fetchWithTimeout(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<unknown> {
    const url = `${this.config.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.authToken}`,
        'User-Agent': 'Vendas.IA/1.0',
      },
      body: JSON.stringify(data),
      signal: this.abortController?.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new N8nApiError({
        success: false,
        error: {
          message: `HTTP ${response.status}: ${response.statusText}`,
          code: this.getErrorCodeFromStatus(response.status),
          details: errorData,
          retryable: this.isRetryableStatus(response.status),
        },
        timestamp: new Date().toISOString(),
      });
    }

    return response.json();
  }

  // Utility methods
  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getErrorCodeFromStatus(status: number): N8nErrorCode {
    switch (status) {
      case 400:
        return 'VALIDATION_ERROR';
      case 401:
      case 403:
        return 'AUTHENTICATION_ERROR';
      case 429:
        return 'RATE_LIMIT_ERROR';
      case 500:
      case 502:
      case 503:
        return 'WORKFLOW_ERROR';
      default:
        return 'NETWORK_ERROR';
    }
  }

  private isRetryableStatus(status: number): boolean {
    return [408, 429, 500, 502, 503, 504].includes(status);
  }

  // Cancel ongoing requests
  abort(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // Update configuration
  updateConfig(newConfig: Partial<N8nWebhookConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Custom error classes for better error handling
export abstract class N8nError extends Error {
  abstract readonly code: string;
  abstract readonly retryable: boolean;

  constructor(
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class N8nApiError extends N8nError {
  readonly code: string;
  readonly retryable: boolean;

  constructor(private errorResponse: N8nErrorResponse) {
    super(errorResponse.error.message);
    this.code = errorResponse.error.code;
    this.retryable = errorResponse.error.retryable ?? false;
  }

  getResponse(): N8nErrorResponse {
    return this.errorResponse;
  }
}

export class N8nRateLimitError extends N8nError {
  readonly code = 'RATE_LIMIT_ERROR';
  readonly retryable = true;

  constructor(private rateLimitResponse: N8nRateLimitResponse) {
    super(rateLimitResponse.message);
  }

  getRetryAfter(): number {
    return this.rateLimitResponse.retryAfter;
  }

  getResponse(): N8nRateLimitResponse {
    return this.rateLimitResponse;
  }
}

export class N8nNetworkError extends N8nError {
  readonly code = 'NETWORK_ERROR';
  readonly retryable = true;

  constructor(message: string) {
    super(message);
  }
}

export class N8nUnknownError extends N8nError {
  readonly code = 'UNKNOWN_ERROR';
  readonly retryable = false;

  constructor(message: string, public readonly details?: unknown) {
    super(message);
  }
}

// Factory function to create configured client
export function createN8nClient(config?: Partial<N8nWebhookConfig>): N8nWebhookClient {
  const defaultConfig = {
    baseUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.vendas.ia.br',
    authToken: process.env.NEXT_PUBLIC_N8N_WEBHOOK_TOKEN || '',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  };

  return new N8nWebhookClient({ ...defaultConfig, ...config });
}

// Singleton instance for global use
let globalN8nClient: N8nWebhookClient | null = null;

export function getN8nClient(): N8nWebhookClient {
  if (!globalN8nClient) {
    globalN8nClient = createN8nClient();
  }
  return globalN8nClient;
}

// Helper functions for common operations
export async function submitContactFormToN8n(
  formData: N8nContactFormRequest
): Promise<N8nWebhookResponse> {
  const client = getN8nClient();
  return client.submitContactForm(formData);
}

export async function sendUrgentWhatsAppNotification(
  messageData: N8nWhatsAppRequest
): Promise<N8nWebhookResponse> {
  const client = getN8nClient();
  return client.sendWhatsAppMessage(messageData);
}

export async function trackAnalyticsEvent(
  trackingData: N8nLinkTrackingRequest
): Promise<N8nWebhookResponse> {
  const client = getN8nClient();
  return client.trackLinkClick(trackingData);
}

// Utility function to generate submission ID
export function generateSubmissionId(): string {
  return `vendas-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Utility function to calculate lead score
export function calculateLeadScore(formData: Partial<N8nContactFormRequest>): number {
  let score = 0;

  // Personal info completeness (20 points max)
  if (formData.personalInfo?.name) score += 5;
  if (formData.personalInfo?.email) score += 5;
  if (formData.personalInfo?.phone) score += 5;
  if (formData.personalInfo?.position) score += 5;

  // Business info quality (40 points max)
  if (formData.businessInfo?.company) score += 10;
  if (formData.businessInfo?.website) score += 5;
  if (formData.businessInfo?.industry) score += 5;
  if (formData.businessInfo?.size) score += 10;
  if (formData.businessInfo?.revenue) score += 10;

  // Interest indicators (30 points max)
  if (formData.interests?.products?.length) {
    score += Math.min(formData.interests.products.length * 5, 15);
  }
  if (formData.interests?.timeline === 'immediate') score += 15;
  else if (formData.interests?.timeline === '1-month') score += 10;
  else if (formData.interests?.timeline === '3-months') score += 5;

  // Budget indication (10 points max)
  if (formData.interests?.budget) {
    const budgetScores: Record<string, number> = {
      'under-5k': 2,
      '5k-15k': 4,
      '15k-50k': 6,
      '50k-100k': 8,
      '100k+': 10,
    };
    score += budgetScores[formData.interests.budget] || 0;
  }

  return Math.min(score, 100);
}

// Utility function to determine urgency level
export function calculateUrgencyLevel(formData: Partial<N8nContactFormRequest>): string {
  const leadScore = calculateLeadScore(formData);
  const timeline = formData.interests?.timeline;
  const budget = formData.interests?.budget;

  if (timeline === 'immediate' && leadScore > 70) return 'urgent';
  if (timeline === 'immediate' || (leadScore > 80 && budget !== 'under-5k')) return 'high';
  if (leadScore > 60 || timeline === '1-month') return 'medium';
  return 'low';
}

// Health check function
export async function checkN8nHealth(): Promise<boolean> {
  try {
    const client = getN8nClient();
    // Simple ping to test connectivity
    await client.trackLinkClick({
      linkType: 'whatsapp-cta',
      clickData: {
        timestamp: new Date().toISOString(),
        userAgent: 'health-check',
      },
    });
    return true;
  } catch (error) {
    console.warn('N8n health check failed:', error);
    return false;
  }
}

// Environment validation
export function validateN8nConfiguration(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
    errors.push('N8N_WEBHOOK_URL environment variable is required');
  }

  if (!process.env.NEXT_PUBLIC_N8N_WEBHOOK_TOKEN) {
    errors.push('N8N_WEBHOOK_TOKEN environment variable is required');
  }

  try {
    new URL(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '');
  } catch {
    errors.push('N8N_WEBHOOK_URL must be a valid URL');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}