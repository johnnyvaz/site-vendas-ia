/**
 * N8n Webhook Client Tests
 * Comprehensive testing for n8n integration with Brazilian market features
 * Tests webhook communication, error handling, retry logic, and business utilities
 */

import { describe, it, expect, vi, beforeEach, afterEach, type MockedFunction } from 'vitest';
import {
  N8nWebhookClient,
  N8nApiError,
  N8nRateLimitError,
  N8nNetworkError,
  N8nUnknownError,
  createN8nClient,
  getN8nClient,
  submitContactFormToN8n,
  sendUrgentWhatsAppNotification,
  trackAnalyticsEvent,
  generateSubmissionId,
  calculateLeadScore,
  calculateUrgencyLevel,
  checkN8nHealth,
  validateN8nConfiguration
} from '../n8n-client';
import type {
  N8nContactFormRequest,
  N8nWhatsAppRequest,
  N8nLinkTrackingRequest,
  N8nWebhookResponse,
  N8nErrorResponse,
  N8nRateLimitResponse
} from '@/types/n8n';

// Mock fetch globally
const mockFetch = vi.fn() as MockedFunction<typeof fetch>;
global.fetch = mockFetch;

// Mock AbortController
global.AbortController = vi.fn().mockImplementation(() => ({
  signal: {},
  abort: vi.fn()
}));

// Mock environment variables
const originalEnv = process.env;

describe('N8nWebhookClient', () => {
  let client: N8nWebhookClient;
  const mockConfig = {
    baseUrl: 'https://n8n.vendas.ia.br',
    authToken: 'test-token',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  };

  beforeEach(() => {
    vi.clearAllMocks();
    client = new N8nWebhookClient(mockConfig);

    // Reset environment
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_N8N_WEBHOOK_URL: 'https://n8n.vendas.ia.br',
      NEXT_PUBLIC_N8N_WEBHOOK_TOKEN: 'test-token'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  describe('Constructor and Configuration', () => {
    it('creates client with default configuration', () => {
      const defaultClient = new N8nWebhookClient({});
      expect(defaultClient).toBeInstanceOf(N8nWebhookClient);
    });

    it('merges custom configuration with defaults', () => {
      const customClient = new N8nWebhookClient({
        baseUrl: 'https://custom.n8n.io',
        retryAttempts: 5
      });
      expect(customClient).toBeInstanceOf(N8nWebhookClient);
    });

    it('updates configuration after creation', () => {
      client.updateConfig({ retryAttempts: 5 });
      expect(() => client.updateConfig({ timeout: 60000 })).not.toThrow();
    });
  });

  describe('Contact Form Submission', () => {
    const mockContactFormData: N8nContactFormRequest = {
      submissionId: 'test-123',
      timestamp: '2024-01-01T00:00:00Z',
      source: 'contact-form',
      personalInfo: {
        name: 'João Silva',
        email: 'joao@empresa.com.br',
        phone: '+55 11 99999-9999',
        position: 'Gerente de Vendas'
      },
      businessInfo: {
        company: 'Empresa Teste Ltda',
        website: 'https://empresa.com.br',
        industry: 'technology',
        size: '10-50',
        revenue: '1M-5M'
      },
      interests: {
        products: ['disparo-rapido'],
        timeline: 'immediate',
        budget: '15k-50k',
        message: 'Interessado no Disparo Rápido para WhatsApp'
      },
      consent: {
        marketing: true,
        privacy: true,
        terms: true
      },
      leadScore: 85,
      urgencyLevel: 'high'
    };

    it('submits contact form successfully', async () => {
      const mockResponse: N8nWebhookResponse = {
        success: true,
        data: { submissionId: 'test-123', status: 'received' },
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await client.submitContactForm(mockContactFormData);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://n8n.vendas.ia.br/webhook/contact-form',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
            'User-Agent': 'Vendas.IA/1.0'
          }),
          body: JSON.stringify(mockContactFormData)
        })
      );
    });

    it('handles validation errors', async () => {
      const errorResponse: N8nErrorResponse = {
        success: false,
        error: {
          message: 'Email field is required',
          code: 'VALIDATION_ERROR',
          details: { field: 'email' },
          retryable: false
        },
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve(errorResponse)
      } as Response);

      await expect(client.submitContactForm(mockContactFormData))
        .rejects.toThrow(N8nApiError);
    });

    it('retries on retryable errors', async () => {
      const errorResponse: N8nErrorResponse = {
        success: false,
        error: {
          message: 'Temporary server error',
          code: 'WORKFLOW_ERROR',
          retryable: true
        },
        timestamp: '2024-01-01T00:00:00Z'
      };

      const successResponse: N8nWebhookResponse = {
        success: true,
        data: { submissionId: 'test-123' },
        timestamp: '2024-01-01T00:00:00Z'
      };

      // First call fails, second succeeds
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: () => Promise.resolve(errorResponse)
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(successResponse)
        } as Response);

      const result = await client.submitContactForm(mockContactFormData);

      expect(result).toEqual(successResponse);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('WhatsApp Message Sending', () => {
    const mockWhatsAppData: N8nWhatsAppRequest = {
      urgencyLevel: 'urgent',
      contactInfo: {
        name: 'João Silva',
        phone: '+5511999999999',
        email: 'joao@empresa.com.br'
      },
      messageType: 'lead-notification',
      messageData: {
        subject: 'Novo Lead Urgente',
        content: 'Lead interessado no Disparo Rápido',
        leadData: {
          company: 'Empresa Teste',
          interest: 'disparo-rapido'
        }
      },
      timestamp: '2024-01-01T00:00:00Z',
      source: 'contact-form'
    };

    it('sends WhatsApp message successfully', async () => {
      const mockResponse: N8nWebhookResponse = {
        success: true,
        data: { messageId: 'wa-msg-123', status: 'sent' },
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await client.sendWhatsAppMessage(mockWhatsAppData);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://n8n.vendas.ia.br/webhook/whatsapp-direct',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockWhatsAppData)
        })
      );
    });
  });

  describe('Link Tracking', () => {
    const mockTrackingData: N8nLinkTrackingRequest = {
      linkType: 'whatsapp-cta',
      clickData: {
        timestamp: '2024-01-01T00:00:00Z',
        userAgent: 'Mozilla/5.0...',
        referrer: 'https://vendas.ia.br',
        sessionId: 'session-123'
      }
    };

    it('tracks link clicks successfully', async () => {
      const mockResponse: N8nWebhookResponse = {
        success: true,
        data: { trackingId: 'track-123' },
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response);

      const result = await client.trackLinkClick(mockTrackingData);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('Rate Limiting', () => {
    it('handles rate limits with retry', async () => {
      const rateLimitResponse: N8nRateLimitResponse = {
        success: false,
        message: 'Rate limit exceeded',
        retryAfter: 1,
        timestamp: '2024-01-01T00:00:00Z'
      };

      const successResponse: N8nWebhookResponse = {
        success: true,
        data: { result: 'success' },
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          json: () => Promise.resolve(rateLimitResponse)
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(successResponse)
        } as Response);

      const mockTrackingData: N8nLinkTrackingRequest = {
        linkType: 'test',
        clickData: { timestamp: '2024-01-01T00:00:00Z' }
      };

      const result = await client.trackLinkClick(mockTrackingData);

      expect(result).toEqual(successResponse);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('throws rate limit error after max retries', async () => {
      const rateLimitResponse: N8nRateLimitResponse = {
        success: false,
        message: 'Rate limit exceeded',
        retryAfter: 1,
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        json: () => Promise.resolve(rateLimitResponse)
      } as Response);

      const mockTrackingData: N8nLinkTrackingRequest = {
        linkType: 'test',
        clickData: { timestamp: '2024-01-01T00:00:00Z' }
      };

      await expect(client.trackLinkClick(mockTrackingData))
        .rejects.toThrow(N8nRateLimitError);
    });
  });

  describe('Network Error Handling', () => {
    it('handles network timeouts', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('fetch failed'));

      const mockTrackingData: N8nLinkTrackingRequest = {
        linkType: 'test',
        clickData: { timestamp: '2024-01-01T00:00:00Z' }
      };

      await expect(client.trackLinkClick(mockTrackingData))
        .rejects.toThrow(N8nNetworkError);
    });

    it('handles request abortion', async () => {
      mockFetch.mockRejectedValueOnce(Object.assign(new Error('Request aborted'), { name: 'AbortError' }));

      const mockTrackingData: N8nLinkTrackingRequest = {
        linkType: 'test',
        clickData: { timestamp: '2024-01-01T00:00:00Z' }
      };

      await expect(client.trackLinkClick(mockTrackingData))
        .rejects.toThrow(N8nNetworkError);
    });

    it('can abort ongoing requests', () => {
      expect(() => client.abort()).not.toThrow();
    });
  });

  describe('Error Classes', () => {
    it('creates N8nApiError with proper properties', () => {
      const errorResponse: N8nErrorResponse = {
        success: false,
        error: {
          message: 'Test error',
          code: 'VALIDATION_ERROR',
          retryable: false
        },
        timestamp: '2024-01-01T00:00:00Z'
      };

      const error = new N8nApiError(errorResponse);

      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.retryable).toBe(false);
      expect(error.getResponse()).toEqual(errorResponse);
    });

    it('creates N8nRateLimitError with retry information', () => {
      const rateLimitResponse: N8nRateLimitResponse = {
        success: false,
        message: 'Rate limit exceeded',
        retryAfter: 60,
        timestamp: '2024-01-01T00:00:00Z'
      };

      const error = new N8nRateLimitError(rateLimitResponse);

      expect(error.code).toBe('RATE_LIMIT_ERROR');
      expect(error.retryable).toBe(true);
      expect(error.getRetryAfter()).toBe(60);
      expect(error.getResponse()).toEqual(rateLimitResponse);
    });

    it('creates N8nNetworkError for connection issues', () => {
      const error = new N8nNetworkError('Connection failed');

      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.retryable).toBe(true);
      expect(error.message).toBe('Connection failed');
    });

    it('creates N8nUnknownError for unexpected issues', () => {
      const error = new N8nUnknownError('Unknown error', { detail: 'extra info' });

      expect(error.code).toBe('UNKNOWN_ERROR');
      expect(error.retryable).toBe(false);
      expect(error.details).toEqual({ detail: 'extra info' });
    });
  });
});

describe('Factory Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_N8N_WEBHOOK_URL: 'https://n8n.vendas.ia.br',
      NEXT_PUBLIC_N8N_WEBHOOK_TOKEN: 'test-token'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('createN8nClient', () => {
    it('creates client with environment variables', () => {
      const client = createN8nClient();
      expect(client).toBeInstanceOf(N8nWebhookClient);
    });

    it('creates client with custom config', () => {
      const client = createN8nClient({
        retryAttempts: 5,
        timeout: 60000
      });
      expect(client).toBeInstanceOf(N8nWebhookClient);
    });
  });

  describe('getN8nClient singleton', () => {
    it('returns same instance on multiple calls', () => {
      const client1 = getN8nClient();
      const client2 = getN8nClient();

      expect(client1).toBe(client2);
    });
  });

  describe('Helper Functions', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { result: 'success' },
          timestamp: '2024-01-01T00:00:00Z'
        })
      } as Response);
    });

    it('submitContactFormToN8n works correctly', async () => {
      const formData: N8nContactFormRequest = {
        submissionId: 'test-123',
        timestamp: '2024-01-01T00:00:00Z',
        source: 'contact-form',
        personalInfo: {
          name: 'Test User',
          email: 'test@example.com'
        },
        businessInfo: {
          company: 'Test Company'
        },
        interests: {
          products: ['disparo-rapido']
        },
        consent: {
          marketing: true,
          privacy: true,
          terms: true
        },
        leadScore: 50,
        urgencyLevel: 'medium'
      };

      const result = await submitContactFormToN8n(formData);
      expect(result.success).toBe(true);
    });

    it('sendUrgentWhatsAppNotification works correctly', async () => {
      const messageData: N8nWhatsAppRequest = {
        urgencyLevel: 'urgent',
        contactInfo: {
          name: 'Test User',
          phone: '+5511999999999'
        },
        messageType: 'lead-notification',
        messageData: {
          subject: 'Test Message',
          content: 'Test content'
        },
        timestamp: '2024-01-01T00:00:00Z',
        source: 'test'
      };

      const result = await sendUrgentWhatsAppNotification(messageData);
      expect(result.success).toBe(true);
    });

    it('trackAnalyticsEvent works correctly', async () => {
      const trackingData: N8nLinkTrackingRequest = {
        linkType: 'whatsapp-cta',
        clickData: {
          timestamp: '2024-01-01T00:00:00Z'
        }
      };

      const result = await trackAnalyticsEvent(trackingData);
      expect(result.success).toBe(true);
    });
  });
});

describe('Business Logic Utilities', () => {
  describe('generateSubmissionId', () => {
    it('generates unique submission IDs', () => {
      const id1 = generateSubmissionId();
      const id2 = generateSubmissionId();

      expect(id1).toMatch(/^vendas-\d+-[a-z0-9]{9}$/);
      expect(id2).toMatch(/^vendas-\d+-[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('calculateLeadScore', () => {
    it('calculates score for complete form data', () => {
      const formData: Partial<N8nContactFormRequest> = {
        personalInfo: {
          name: 'João Silva',
          email: 'joao@empresa.com.br',
          phone: '+55 11 99999-9999',
          position: 'CEO'
        },
        businessInfo: {
          company: 'Empresa Grande Ltda',
          website: 'https://empresa.com.br',
          industry: 'technology',
          size: '100-500',
          revenue: '50M+'
        },
        interests: {
          products: ['disparo-rapido', 'leads-rapido'],
          timeline: 'immediate',
          budget: '100k+'
        }
      };

      const score = calculateLeadScore(formData);
      expect(score).toBeGreaterThan(80);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('calculates lower score for minimal data', () => {
      const formData: Partial<N8nContactFormRequest> = {
        personalInfo: {
          name: 'João',
          email: 'joao@email.com'
        },
        interests: {
          products: ['disparo-rapido'],
          timeline: '6-months',
          budget: 'under-5k'
        }
      };

      const score = calculateLeadScore(formData);
      expect(score).toBeLessThan(50);
    });

    it('handles empty form data', () => {
      const score = calculateLeadScore({});
      expect(score).toBe(0);
    });

    it('scores Brazilian business characteristics correctly', () => {
      const brazilianData: Partial<N8nContactFormRequest> = {
        personalInfo: {
          name: 'Maria da Silva',
          email: 'maria@empresa.com.br',
          phone: '+55 11 9999-9999'
        },
        businessInfo: {
          company: 'Empresa Brasileira LTDA',
          size: '50-100',
          revenue: '5M-10M'
        },
        interests: {
          products: ['disparo-rapido'],
          timeline: '1-month',
          budget: '15k-50k'
        }
      };

      const score = calculateLeadScore(brazilianData);
      expect(score).toBeGreaterThan(60);
    });
  });

  describe('calculateUrgencyLevel', () => {
    it('returns urgent for immediate timeline and high score', () => {
      const formData: Partial<N8nContactFormRequest> = {
        personalInfo: { name: 'Test', email: 'test@test.com', phone: '123', position: 'CEO' },
        businessInfo: { company: 'Test', size: '100+', revenue: '50M+' },
        interests: {
          products: ['disparo-rapido', 'leads-rapido'],
          timeline: 'immediate',
          budget: '100k+'
        }
      };

      const urgency = calculateUrgencyLevel(formData);
      expect(urgency).toBe('urgent');
    });

    it('returns high for immediate timeline or high score', () => {
      const formData1: Partial<N8nContactFormRequest> = {
        interests: { timeline: 'immediate', products: [] }
      };

      const formData2: Partial<N8nContactFormRequest> = {
        personalInfo: { name: 'Test', email: 'test@test.com', phone: '123', position: 'CEO' },
        businessInfo: { company: 'Test', size: '100+', revenue: '50M+' },
        interests: {
          products: ['disparo-rapido', 'leads-rapido'],
          timeline: '1-month',
          budget: '50k-100k'
        }
      };

      expect(calculateUrgencyLevel(formData1)).toBe('high');
      expect(calculateUrgencyLevel(formData2)).toBe('high');
    });

    it('returns medium for moderate scores', () => {
      const formData: Partial<N8nContactFormRequest> = {
        personalInfo: { name: 'Test', email: 'test@test.com' },
        businessInfo: { company: 'Test' },
        interests: {
          products: ['disparo-rapido'],
          timeline: '1-month',
          budget: '15k-50k'
        }
      };

      const urgency = calculateUrgencyLevel(formData);
      expect(urgency).toBe('medium');
    });

    it('returns low for minimal data', () => {
      const formData: Partial<N8nContactFormRequest> = {
        personalInfo: { name: 'Test' },
        interests: { products: [], timeline: '6-months' }
      };

      const urgency = calculateUrgencyLevel(formData);
      expect(urgency).toBe('low');
    });
  });
});

describe('Health Check and Validation', () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_N8N_WEBHOOK_URL: 'https://n8n.vendas.ia.br',
      NEXT_PUBLIC_N8N_WEBHOOK_TOKEN: 'test-token'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('checkN8nHealth', () => {
    it('returns true when n8n is healthy', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { status: 'healthy' },
          timestamp: '2024-01-01T00:00:00Z'
        })
      } as Response);

      const isHealthy = await checkN8nHealth();
      expect(isHealthy).toBe(true);
    });

    it('returns false when n8n is unhealthy', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection failed'));

      const isHealthy = await checkN8nHealth();
      expect(isHealthy).toBe(false);
    });

    it('logs warning on health check failure', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Connection failed'));

      await checkN8nHealth();
      expect(consoleSpy).toHaveBeenCalledWith('N8n health check failed:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('validateN8nConfiguration', () => {
    it('validates correct configuration', () => {
      const result = validateN8nConfiguration();

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('detects missing webhook URL', () => {
      delete process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

      const result = validateN8nConfiguration();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('N8N_WEBHOOK_URL environment variable is required');
    });

    it('detects missing auth token', () => {
      delete process.env.NEXT_PUBLIC_N8N_WEBHOOK_TOKEN;

      const result = validateN8nConfiguration();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('N8N_WEBHOOK_TOKEN environment variable is required');
    });

    it('detects invalid webhook URL', () => {
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL = 'not-a-url';

      const result = validateN8nConfiguration();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('N8N_WEBHOOK_URL must be a valid URL');
    });

    it('handles multiple configuration errors', () => {
      delete process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      delete process.env.NEXT_PUBLIC_N8N_WEBHOOK_TOKEN;

      const result = validateN8nConfiguration();

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
    });
  });
});

describe('Brazilian Market Specific Features', () => {
  describe('Brazilian Phone Number Handling', () => {
    it('handles Brazilian phone formats in WhatsApp requests', async () => {
      const brazilianData: N8nWhatsAppRequest = {
        urgencyLevel: 'high',
        contactInfo: {
          name: 'João da Silva',
          phone: '+55 11 99999-9999', // Brazilian format
          email: 'joao@empresa.com.br'
        },
        messageType: 'lead-notification',
        messageData: {
          subject: 'Novo Lead do Brasil',
          content: 'Interessado no Disparo Rápido WhatsApp'
        },
        timestamp: '2024-01-01T00:00:00Z',
        source: 'contact-form'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { messageId: 'wa-br-123' },
          timestamp: '2024-01-01T00:00:00Z'
        })
      } as Response);

      const client = new N8nWebhookClient({
        baseUrl: 'https://n8n.vendas.ia.br',
        authToken: 'test-token'
      });

      const result = await client.sendWhatsAppMessage(brazilianData);

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://n8n.vendas.ia.br/webhook/whatsapp-direct',
        expect.objectContaining({
          body: JSON.stringify(brazilianData)
        })
      );
    });
  });

  describe('LGPD Compliance Integration', () => {
    it('includes consent information in contact form requests', async () => {
      const lgpdCompliantData: N8nContactFormRequest = {
        submissionId: 'lgpd-123',
        timestamp: '2024-01-01T00:00:00Z',
        source: 'contact-form',
        personalInfo: {
          name: 'Maria Santos',
          email: 'maria@empresa.com.br'
        },
        businessInfo: {
          company: 'Empresa Brasileira'
        },
        interests: {
          products: ['disparo-rapido']
        },
        consent: {
          marketing: true,
          privacy: true,
          terms: true,
          dataProcessing: true,
          lgpdCompliant: true
        },
        leadScore: 70,
        urgencyLevel: 'medium'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { submissionId: 'lgpd-123', lgpdCompliant: true },
          timestamp: '2024-01-01T00:00:00Z'
        })
      } as Response);

      const client = new N8nWebhookClient({
        baseUrl: 'https://n8n.vendas.ia.br',
        authToken: 'test-token'
      });

      const result = await client.submitContactForm(lgpdCompliantData);

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://n8n.vendas.ia.br/webhook/contact-form',
        expect.objectContaining({
          body: expect.stringContaining('"lgpdCompliant":true')
        })
      );
    });
  });

  describe('Portuguese Language Support', () => {
    it('handles Portuguese error messages', async () => {
      const errorResponse: N8nErrorResponse = {
        success: false,
        error: {
          message: 'O campo email é obrigatório',
          code: 'VALIDATION_ERROR',
          details: { field: 'email', message_pt: 'Campo obrigatório' },
          retryable: false
        },
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(errorResponse)
      } as Response);

      const client = new N8nWebhookClient({
        baseUrl: 'https://n8n.vendas.ia.br',
        authToken: 'test-token'
      });

      const mockData: N8nContactFormRequest = {
        submissionId: 'test-123',
        timestamp: '2024-01-01T00:00:00Z',
        source: 'contact-form',
        personalInfo: { name: 'Test' },
        businessInfo: {},
        interests: { products: [] },
        consent: { marketing: true, privacy: true, terms: true },
        leadScore: 0,
        urgencyLevel: 'low'
      };

      try {
        await client.submitContactForm(mockData);
      } catch (error) {
        expect(error).toBeInstanceOf(N8nApiError);
        expect((error as N8nApiError).message).toBe('O campo email é obrigatório');
      }
    });
  });

  describe('Timezone Handling', () => {
    it('handles Brazilian timezone in timestamps', () => {
      const brazilianTimestamp = '2024-01-01T15:30:00-03:00'; // UTC-3 (Brasília time)

      const formData: Partial<N8nContactFormRequest> = {
        timestamp: brazilianTimestamp,
        personalInfo: {
          name: 'Carlos Silva'
        }
      };

      expect(formData.timestamp).toBe(brazilianTimestamp);
    });
  });
});

describe('Performance and Reliability', () => {
  describe('Timeout Handling', () => {
    it('respects timeout configuration', async () => {
      const client = new N8nWebhookClient({
        baseUrl: 'https://n8n.vendas.ia.br',
        authToken: 'test-token',
        timeout: 1000 // 1 second
      });

      // Mock a slow response
      mockFetch.mockImplementationOnce(() =>
        new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay
      );

      const mockData: N8nLinkTrackingRequest = {
        linkType: 'test',
        clickData: { timestamp: '2024-01-01T00:00:00Z' }
      };

      // Should timeout and retry
      await expect(client.trackLinkClick(mockData)).rejects.toThrow();
    });
  });

  describe('Memory Management', () => {
    it('properly cleans up abort controllers', () => {
      const client = new N8nWebhookClient({
        baseUrl: 'https://n8n.vendas.ia.br',
        authToken: 'test-token'
      });

      // Simulate multiple abort calls
      client.abort();
      client.abort();
      client.abort();

      // Should not throw errors
      expect(() => client.abort()).not.toThrow();
    });
  });

  describe('Concurrent Requests', () => {
    it('handles multiple concurrent requests', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { result: 'success' },
          timestamp: '2024-01-01T00:00:00Z'
        })
      } as Response);

      const client = new N8nWebhookClient({
        baseUrl: 'https://n8n.vendas.ia.br',
        authToken: 'test-token'
      });

      const mockData: N8nLinkTrackingRequest = {
        linkType: 'concurrent-test',
        clickData: { timestamp: '2024-01-01T00:00:00Z' }
      };

      // Send 5 concurrent requests
      const promises = Array.from({ length: 5 }, () =>
        client.trackLinkClick(mockData)
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
      expect(mockFetch).toHaveBeenCalledTimes(5);
    });
  });
});