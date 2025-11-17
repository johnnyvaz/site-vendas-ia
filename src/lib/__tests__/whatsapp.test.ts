/**
 * WhatsApp Integration Tests
 * Comprehensive testing for WhatsApp link generation, Brazilian phone handling,
 * message templates, tracking, and business logic
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateWhatsAppLink,
  generateMessageFromTemplate,
  createWhatsAppLink,
  createProductWhatsAppLink,
  createUrgentWhatsAppLink,
  createDemoWhatsAppLink,
  handleWhatsAppClick,
  validateBrazilianPhone,
  formatPhoneForWhatsApp,
  formatPhoneDisplay,
  createFloatingWhatsAppButton,
  JOHNNY_WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE_TEMPLATES,
  WHATSAPP_CONSTANTS,
  type WhatsAppLinkConfig,
  type WhatsAppLeadData,
  type MessageTemplate
} from '../whatsapp';
import type { ProductInterest, UrgencyLevel, UTMParameters } from '@/types/n8n';

// Mock analytics tracking
const mockTrackAnalyticsEvent = vi.fn();
vi.mock('../n8n-client', () => ({
  trackAnalyticsEvent: mockTrackAnalyticsEvent
}));

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen
});

// Mock navigator
Object.defineProperty(window, 'navigator', {
  writable: true,
  value: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    platform: 'Win32'
  }
});

// Mock screen
Object.defineProperty(window, 'screen', {
  writable: true,
  value: {
    width: 1920,
    height: 1080
  }
});

// Mock document
Object.defineProperty(window, 'document', {
  writable: true,
  value: {
    referrer: 'https://vendas.ia.br',
    getElementById: vi.fn(),
    createElement: vi.fn(() => ({
      addEventListener: vi.fn(),
      appendChild: vi.fn(),
      setAttribute: vi.fn(),
      innerHTML: '',
      className: '',
      href: '',
      target: '',
      rel: ''
    }))
  }
});

describe('WhatsApp Link Generation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('generateWhatsAppLink', () => {
    it('generates basic WhatsApp link with default number', () => {
      const config: WhatsAppLinkConfig = {
        message: 'Olá! Gostaria de mais informações.'
      };

      const link = generateWhatsAppLink(config);

      expect(link).toBe(`https://api.whatsapp.com/send?phone=${JOHNNY_WHATSAPP_NUMBER}&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.`);
    });

    it('generates link with custom phone number', () => {
      const config: WhatsAppLinkConfig = {
        phoneNumber: '5511999887766',
        message: 'Test message'
      };

      const link = generateWhatsAppLink(config);

      expect(link).toBe('https://api.whatsapp.com/send?phone=5511999887766&text=Test%20message');
    });

    it('properly encodes Portuguese characters and special symbols', () => {
      const config: WhatsAppLinkConfig = {
        message: 'Olá! Tenho interesse em automação. Como funciona?'
      };

      const link = generateWhatsAppLink(config);

      expect(link).toContain('Ol%C3%A1!');
      expect(link).toContain('automa%C3%A7%C3%A3o');
    });

    it('includes UTM parameters when provided', () => {
      const config: WhatsAppLinkConfig = {
        message: 'Test message',
        trackingParams: {
          source: 'website',
          medium: 'whatsapp',
          campaign: 'disparo-rapido',
          content: 'hero-cta',
          term: 'automacao'
        }
      };

      const link = generateWhatsAppLink(config);

      expect(link).toContain('utm_source=website');
      expect(link).toContain('utm_medium=whatsapp');
      expect(link).toContain('utm_campaign=disparo-rapido');
      expect(link).toContain('utm_content=hero-cta');
      expect(link).toContain('utm_term=automacao');
    });

    it('handles partial UTM parameters', () => {
      const config: WhatsAppLinkConfig = {
        message: 'Test message',
        trackingParams: {
          source: 'website',
          campaign: 'test-campaign'
        }
      };

      const link = generateWhatsAppLink(config);

      expect(link).toContain('utm_source=website');
      expect(link).toContain('utm_campaign=test-campaign');
      expect(link).not.toContain('utm_medium');
      expect(link).not.toContain('utm_content');
    });

    it('handles empty message', () => {
      const config: WhatsAppLinkConfig = {
        message: ''
      };

      const link = generateWhatsAppLink(config);

      expect(link).toBe(`https://api.whatsapp.com/send?phone=${JOHNNY_WHATSAPP_NUMBER}&text=`);
    });
  });

  describe('Message Template System', () => {
    describe('generateMessageFromTemplate', () => {
      it('generates message from GENERAL_INQUIRY template', () => {
        const message = generateMessageFromTemplate('GENERAL_INQUIRY');

        expect(message).toBe('Olá! Vim do site da Vendas.IA e gostaria de entender como vocês podem ajudar minha empresa a aumentar as vendas com IA.');
      });

      it('replaces variables in DISPARO_RAPIDO template', () => {
        const message = generateMessageFromTemplate('DISPARO_RAPIDO', {
          company: 'Empresa Teste Ltda'
        });

        expect(message).toContain('Empresa Teste Ltda');
        expect(message).not.toContain('{{company}}');
      });

      it('replaces multiple variables in URGENT_LEAD template', () => {
        const message = generateMessageFromTemplate('URGENT_LEAD', {
          name: 'João Silva',
          company: 'TechCorp Brasil'
        });

        expect(message).toContain('João Silva');
        expect(message).toContain('TechCorp Brasil');
        expect(message).not.toContain('{{name}}');
        expect(message).not.toContain('{{company}}');
      });

      it('removes unreplaced placeholders', () => {
        const message = generateMessageFromTemplate('LEADS_RAPIDO');

        expect(message).not.toContain('{{company}}');
        expect(message).not.toMatch(/\{\{[^}]+\}\}/);
      });

      it('handles empty variables object', () => {
        const message = generateMessageFromTemplate('CUSTOM_SOLUTION', {});

        expect(message).toBeTruthy();
        expect(message).not.toMatch(/\{\{[^}]+\}\}/);
      });

      it('cleans up extra spaces after variable removal', () => {
        const message = generateMessageFromTemplate('URGENT_LEAD');

        expect(message).not.toMatch(/\s{2,}/); // No double spaces
        expect(message.trim()).toBe(message); // No leading/trailing spaces
      });

      it('handles case-sensitive variable names', () => {
        const message = generateMessageFromTemplate('URGENT_LEAD', {
          name: 'João',
          NAME: 'JOÃO', // Different case should not replace
          company: 'TechCorp'
        });

        expect(message).toContain('João');
        expect(message).not.toContain('JOÃO');
        expect(message).toContain('TechCorp');
      });
    });

    describe('Template Categories', () => {
      it('has correct category for each template', () => {
        expect(WHATSAPP_MESSAGE_TEMPLATES.GENERAL_INQUIRY.category).toBe('general');
        expect(WHATSAPP_MESSAGE_TEMPLATES.DISPARO_RAPIDO.category).toBe('product');
        expect(WHATSAPP_MESSAGE_TEMPLATES.URGENT_LEAD.category).toBe('urgent');
        expect(WHATSAPP_MESSAGE_TEMPLATES.DEMO_REQUEST.category).toBe('demo');
      });

      it('contains all expected templates', () => {
        const expectedTemplates = [
          'GENERAL_INQUIRY',
          'LEADS_RAPIDO',
          'DISPARO_RAPIDO',
          'SDR_VIRTUAL',
          'CUSTOM_SOLUTION',
          'URGENT_LEAD',
          'DEMO_REQUEST',
          'CALLBACK_REQUEST'
        ];

        expectedTemplates.forEach(template => {
          expect(WHATSAPP_MESSAGE_TEMPLATES[template as MessageTemplate]).toBeDefined();
        });
      });
    });
  });

  describe('Product-Specific Link Generation', () => {
    describe('createProductWhatsAppLink', () => {
      it('creates link for disparo-rapido product', () => {
        const link = createProductWhatsAppLink('disparo-rapido');

        expect(link).toContain('text=Ol%C3%A1!%20Vi%20sobre%20o%20Disparo%20R%C3%A1pido');
        expect(link).toContain('utm_campaign=product-disparo-rapido');
      });

      it('includes company name in product link', () => {
        const leadData: WhatsAppLeadData = {
          company: 'Empresa ABC Ltda',
          interest: 'leads-rapido'
        };

        const link = createProductWhatsAppLink('leads-rapido', leadData);

        expect(link).toContain('Empresa%20ABC%20Ltda');
      });

      it('includes lead name when provided', () => {
        const leadData: WhatsAppLeadData = {
          name: 'Maria Silva',
          company: 'TechCorp'
        };

        const link = createProductWhatsAppLink('sdr-virtual', leadData);

        // Note: SDR_VIRTUAL template doesn't use name, but it should be stored in leadData
        expect(link).toContain('TechCorp');
      });

      it('uses correct template for each product', () => {
        const products: ProductInterest[] = ['disparo-rapido', 'leads-rapido', 'sdr-virtual', 'custom-solution'];

        products.forEach(product => {
          const link = createProductWhatsAppLink(product);
          expect(link).toContain(`utm_campaign=product-${product}`);
        });
      });

      it('merges custom tracking parameters', () => {
        const customTracking: UTMParameters = {
          source: 'email',
          content: 'newsletter-cta'
        };

        const link = createProductWhatsAppLink('disparo-rapido', undefined, customTracking);

        expect(link).toContain('utm_source=email');
        expect(link).toContain('utm_content=newsletter-cta');
        expect(link).toContain('utm_medium=whatsapp'); // Default should be preserved
      });
    });

    describe('createUrgentWhatsAppLink', () => {
      it('creates urgent link with lead data', () => {
        const leadData: WhatsAppLeadData = {
          name: 'Carlos Santos',
          company: 'Urgente Corp',
          urgencyLevel: 'urgent'
        };

        const link = createUrgentWhatsAppLink(leadData);

        expect(link).toContain('Carlos%20Santos');
        expect(link).toContain('Urgente%20Corp');
        expect(link).toContain('utm_campaign=urgent-lead');
        expect(link).toContain('utm_source=contact-form');
      });

      it('sets urgency level to urgent automatically', () => {
        const leadData: WhatsAppLeadData = {
          name: 'Test User',
          company: 'Test Company',
          urgencyLevel: 'medium' // This should be overridden
        };

        const link = createUrgentWhatsAppLink(leadData);

        // We can't directly test the internal leadData, but the campaign should indicate urgency
        expect(link).toContain('utm_campaign=urgent-lead');
      });

      it('handles missing optional data gracefully', () => {
        const leadData: WhatsAppLeadData = {
          company: 'Only Company'
        };

        const link = createUrgentWhatsAppLink(leadData);

        expect(link).toContain('Only%20Company');
        expect(link).not.toContain('{{name}}'); // Should not have unreplaced placeholders
      });
    });

    describe('createDemoWhatsAppLink', () => {
      it('creates demo request link', () => {
        const leadData: WhatsAppLeadData = {
          company: 'Demo Corp'
        };

        const link = createDemoWhatsAppLink(leadData);

        expect(link).toContain('Demo%20Corp');
        expect(link).toContain('utm_campaign=demo-request');
        expect(link).toContain('utm_content=demo-cta');
      });

      it('works without lead data', () => {
        const link = createDemoWhatsAppLink();

        expect(link).toBeTruthy();
        expect(link).toContain('utm_campaign=demo-request');
        expect(link).not.toContain('{{company}}');
      });
    });
  });

  describe('Brazilian Phone Number Handling', () => {
    describe('validateBrazilianPhone', () => {
      it('validates mobile numbers with country code', () => {
        const validPhones = [
          '5516997787674', // Johnny's number
          '5511999887766',
          '5521987654321',
          '5585998877665'
        ];

        validPhones.forEach(phone => {
          expect(validateBrazilianPhone(phone)).toBe(true);
        });
      });

      it('validates mobile numbers with area code only', () => {
        const validPhones = [
          '16997787674',
          '11999887766',
          '21987654321',
          '85998877665'
        ];

        validPhones.forEach(phone => {
          expect(validateBrazilianPhone(phone)).toBe(true);
        });
      });

      it('validates mobile numbers without area code', () => {
        const validPhones = [
          '997787674',
          '999887766',
          '987654321',
          '998877665'
        ];

        validPhones.forEach(phone => {
          expect(validateBrazilianPhone(phone)).toBe(true);
        });
      });

      it('validates formatted phone numbers', () => {
        const validPhones = [
          '+55 16 99778-7674',
          '(11) 99988-7766',
          '+55 (21) 98765-4321',
          '16 99778-7674'
        ];

        validPhones.forEach(phone => {
          expect(validateBrazilianPhone(phone)).toBe(true);
        });
      });

      it('rejects invalid phone numbers', () => {
        const invalidPhones = [
          '123456789', // Too short
          '123456789012345', // Too long
          '5511888776655', // Landline with country code
          '1188887766', // Landline without 9
          '551199887766', // Wrong format
          'not-a-number',
          '',
          '55119988776', // Missing digit
        ];

        invalidPhones.forEach(phone => {
          expect(validateBrazilianPhone(phone)).toBe(false);
        });
      });

      it('handles edge cases', () => {
        expect(validateBrazilianPhone('5511000000000')).toBe(false); // Invalid area code pattern
        expect(validateBrazilianPhone('5500999887766')).toBe(false); // Invalid area code
        expect(validateBrazilianPhone('5511799887766')).toBe(false); // Invalid mobile prefix
      });
    });

    describe('formatPhoneForWhatsApp', () => {
      it('formats phone numbers with country code', () => {
        expect(formatPhoneForWhatsApp('5516997787674')).toBe('5516997787674');
        expect(formatPhoneForWhatsApp('+55 16 99778-7674')).toBe('5516997787674');
      });

      it('adds country code to area code numbers', () => {
        expect(formatPhoneForWhatsApp('16997787674')).toBe('5516997787674');
        expect(formatPhoneForWhatsApp('(11) 99988-7766')).toBe('5511999887766');
      });

      it('adds area code to mobile-only numbers', () => {
        expect(formatPhoneForWhatsApp('997787674')).toBe('5516997787674'); // Default area code 16
        expect(formatPhoneForWhatsApp('999887766', '11')).toBe('5511999887766'); // Custom area code
      });

      it('handles landline to mobile conversion', () => {
        expect(formatPhoneForWhatsApp('1634567890')).toBe('551634567890'); // Note: this might not be a real scenario
      });

      it('throws error for invalid formats', () => {
        expect(() => formatPhoneForWhatsApp('123')).toThrow('Invalid Brazilian phone number format');
        expect(() => formatPhoneForWhatsApp('123456789012345')).toThrow('Invalid Brazilian phone number format');
      });

      it('handles formatted input strings', () => {
        expect(formatPhoneForWhatsApp('+55 (16) 99778-7674')).toBe('5516997787674');
        expect(formatPhoneForWhatsApp('(16) 9.9778.7674')).toBe('5516997787674');
      });
    });

    describe('formatPhoneDisplay', () => {
      it('formats numbers with country code for display', () => {
        expect(formatPhoneDisplay('5516997787674')).toBe('+55 (16) 99778-7674');
        expect(formatPhoneDisplay('5511999887766')).toBe('+55 (11) 99988-7766');
      });

      it('formats area code numbers for display', () => {
        expect(formatPhoneDisplay('16997787674')).toBe('(16) 99778-7674');
        expect(formatPhoneDisplay('11999887766')).toBe('(11) 99988-7766');
      });

      it('returns original string for unrecognized formats', () => {
        expect(formatPhoneDisplay('123456')).toBe('123456');
        expect(formatPhoneDisplay('invalid')).toBe('invalid');
      });

      it('handles already formatted numbers', () => {
        expect(formatPhoneDisplay('+55 (16) 99778-7674')).toBe('+55 (16) 99778-7674');
      });
    });
  });

  describe('Click Tracking and Analytics', () => {
    describe('handleWhatsAppClick', () => {
      it('tracks click event with correct data', async () => {
        const linkUrl = 'https://api.whatsapp.com/send?phone=5516997787674&text=test';
        const metadata = {
          linkType: 'whatsapp-cta' as const,
          source: 'hero-section',
          leadId: 'lead-123',
          sessionId: 'session-456'
        };

        await handleWhatsAppClick(linkUrl, metadata);

        expect(mockTrackAnalyticsEvent).toHaveBeenCalledWith({
          linkType: 'whatsapp-cta',
          clickData: {
            timestamp: expect.any(String),
            userAgent: expect.any(String),
            referrer: 'https://vendas.ia.br',
            sessionId: 'session-456',
            leadId: 'lead-123'
          },
          deviceInfo: {
            isMobile: false, // Based on mocked userAgent
            screenResolution: '1920x1080',
            platform: 'Win32'
          }
        });
      });

      it('generates session ID when not provided', async () => {
        const metadata = {
          linkType: 'whatsapp-direct' as const,
          source: 'contact-form'
        };

        await handleWhatsAppClick('https://wa.me/test', metadata);

        const trackingCall = mockTrackAnalyticsEvent.mock.calls[0][0];
        expect(trackingCall.clickData.sessionId).toMatch(/^session-\d+-[a-z0-9]{9}$/);
      });

      it('opens WhatsApp link in new tab', async () => {
        const linkUrl = 'https://api.whatsapp.com/send?phone=test&text=test';
        const metadata = {
          linkType: 'whatsapp-cta' as const
        };

        await handleWhatsAppClick(linkUrl, metadata);

        expect(mockWindowOpen).toHaveBeenCalledWith(linkUrl, '_blank', 'noopener,noreferrer');
      });

      it('handles tracking errors gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        mockTrackAnalyticsEvent.mockRejectedValueOnce(new Error('Tracking failed'));

        const metadata = {
          linkType: 'whatsapp-cta' as const
        };

        await expect(handleWhatsAppClick('https://wa.me/test', metadata)).resolves.not.toThrow();

        expect(consoleSpy).toHaveBeenCalledWith('Failed to track WhatsApp click:', expect.any(Error));
        expect(mockWindowOpen).toHaveBeenCalled(); // Should still open the link

        consoleSpy.mockRestore();
      });

      it('detects mobile devices correctly', async () => {
        // Mock mobile user agent
        Object.defineProperty(window, 'navigator', {
          writable: true,
          value: {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
            platform: 'iPhone'
          }
        });

        const metadata = {
          linkType: 'whatsapp-cta' as const
        };

        await handleWhatsAppClick('https://wa.me/test', metadata);

        const trackingCall = mockTrackAnalyticsEvent.mock.calls[0][0];
        expect(trackingCall.deviceInfo.isMobile).toBe(true);
        expect(trackingCall.deviceInfo.platform).toBe('iPhone');
      });
    });
  });

  describe('Floating WhatsApp Button', () => {
    describe('createFloatingWhatsAppButton', () => {
      let mockContainer: any;

      beforeEach(() => {
        mockContainer = {
          appendChild: vi.fn()
        };

        document.getElementById = vi.fn().mockReturnValue(mockContainer);
      });

      it('creates floating button with default configuration', () => {
        createFloatingWhatsAppButton('whatsapp-container');

        expect(document.getElementById).toHaveBeenCalledWith('whatsapp-container');
        expect(mockContainer.appendChild).toHaveBeenCalled();
      });

      it('does not create button if container not found', () => {
        document.getElementById = vi.fn().mockReturnValue(null);

        createFloatingWhatsAppButton('non-existent-container');

        expect(mockContainer.appendChild).not.toHaveBeenCalled();
      });

      it('respects mobile configuration', () => {
        // Mock mobile device
        Object.defineProperty(window, 'navigator', {
          writable: true,
          value: {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
          }
        });

        createFloatingWhatsAppButton('container', {
          showOnMobile: false
        });

        expect(mockContainer.appendChild).not.toHaveBeenCalled();
      });

      it('creates button with custom template and variables', () => {
        createFloatingWhatsAppButton('container', {
          template: 'DISPARO_RAPIDO',
          variables: {
            company: 'Test Company'
          },
          position: 'bottom-left'
        });

        expect(mockContainer.appendChild).toHaveBeenCalled();

        // Check if the button element has correct properties
        const createElementCalls = document.createElement.mock.calls;
        expect(createElementCalls.some(call => call[0] === 'a')).toBe(true);
      });
    });
  });

  describe('Constants and Utilities', () => {
    describe('WHATSAPP_CONSTANTS', () => {
      it('exports correct constants', () => {
        expect(WHATSAPP_CONSTANTS.JOHNNY_NUMBER).toBe(JOHNNY_WHATSAPP_NUMBER);
        expect(WHATSAPP_CONSTANTS.CLICK_TO_CHAT_BASE).toBe('https://api.whatsapp.com/send');
        expect(WHATSAPP_CONSTANTS.DISPLAY_NUMBER).toMatch(/^\+55 \(\d{2}\) \d{5}-\d{4}$/);
      });

      it('has consistent Johnny number across exports', () => {
        expect(JOHNNY_WHATSAPP_NUMBER).toBe('5516997787674');
        expect(WHATSAPP_CONSTANTS.JOHNNY_NUMBER).toBe(JOHNNY_WHATSAPP_NUMBER);
      });
    });
  });

  describe('Integration with Business Logic', () => {
    it('creates appropriate messages for different urgency levels', () => {
      const urgencyTemplates: Record<UrgencyLevel, MessageTemplate> = {
        'urgent': 'URGENT_LEAD',
        'high': 'CALLBACK_REQUEST',
        'medium': 'GENERAL_INQUIRY',
        'low': 'GENERAL_INQUIRY'
      };

      Object.entries(urgencyTemplates).forEach(([urgency, template]) => {
        const message = generateMessageFromTemplate(template, {
          name: 'Test User',
          company: 'Test Corp'
        });

        expect(message).toBeTruthy();
        expect(message).not.toMatch(/\{\{[^}]+\}\}/); // No unreplaced placeholders
      });
    });

    it('handles Brazilian business context appropriately', () => {
      const businessMessage = generateMessageFromTemplate('CUSTOM_SOLUTION', {
        company: 'Empresa Brasileira LTDA',
        industry: 'agronegócio'
      });

      expect(businessMessage).toContain('Empresa Brasileira LTDA');
      expect(businessMessage).toContain('agronegócio');
    });

    it('maintains proper Portuguese language in all templates', () => {
      const templates = Object.keys(WHATSAPP_MESSAGE_TEMPLATES) as MessageTemplate[];

      templates.forEach(template => {
        const message = generateMessageFromTemplate(template);

        // Should contain Portuguese greeting
        expect(message).toMatch(/^Olá!/);

        // Should not contain English words that would indicate wrong language
        expect(message.toLowerCase()).not.toContain('hello');
        expect(message.toLowerCase()).not.toContain('hi ');
        expect(message.toLowerCase()).not.toContain('company');
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles malformed phone numbers gracefully', () => {
      expect(() => formatPhoneForWhatsApp('abc')).toThrow();
      expect(() => formatPhoneForWhatsApp('')).toThrow();
      expect(() => formatPhoneForWhatsApp('123')).toThrow();
    });

    it('handles empty or null template variables', () => {
      const message = generateMessageFromTemplate('URGENT_LEAD', {
        name: '',
        company: null as any
      });

      expect(message).toBeTruthy();
      expect(message).not.toMatch(/\{\{[^}]+\}\}/);
    });

    it('handles special characters in messages', () => {
      const config: WhatsAppLinkConfig = {
        message: 'Test with special chars: @#$%^&*()_+=[]{}|;:"<>?,./'
      };

      const link = generateWhatsAppLink(config);

      expect(link).toBeTruthy();
      expect(link).toContain('text=');
    });

    it('handles very long messages', () => {
      const longMessage = 'A'.repeat(1000);
      const config: WhatsAppLinkConfig = {
        message: longMessage
      };

      const link = generateWhatsAppLink(config);

      expect(link).toBeTruthy();
      expect(link.length).toBeGreaterThan(1000);
    });

    it('handles undefined or null parameters', () => {
      expect(() => generateWhatsAppLink({ message: null as any })).not.toThrow();
      expect(() => generateWhatsAppLink({ message: undefined as any })).not.toThrow();
    });
  });

  describe('Performance and Security', () => {
    it('does not expose sensitive information in generated links', () => {
      const config: WhatsAppLinkConfig = {
        message: 'Test message',
        leadData: {
          name: 'Test User',
          company: 'Secret Corp'
        }
      };

      const link = generateWhatsAppLink(config);

      // Lead data should not be included in the URL itself
      expect(link).not.toContain('Secret Corp');
      expect(link).not.toContain('leadData');
    });

    it('efficiently handles multiple link generations', () => {
      const startTime = performance.now();

      // Generate 100 links
      for (let i = 0; i < 100; i++) {
        generateWhatsAppLink({
          message: `Test message ${i}`,
          trackingParams: {
            source: 'test',
            campaign: `campaign-${i}`
          }
        });
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in reasonable time (less than 100ms for 100 links)
      expect(duration).toBeLessThan(100);
    });

    it('properly encodes to prevent XSS in messages', () => {
      const maliciousMessage = '<script>alert("xss")</script>';
      const config: WhatsAppLinkConfig = {
        message: maliciousMessage
      };

      const link = generateWhatsAppLink(config);

      expect(link).not.toContain('<script>');
      expect(link).toContain('%3Cscript%3E'); // Should be URL encoded
    });
  });
});