// Analytics Tracking for Vendas.IA
// Sends events to n8n analytics workflow for comprehensive tracking

import type {
  N8nLinkTrackingRequest,
  UTMParameters,
  ProductInterest,
  UrgencyLevel,
  LinkType,
} from '@/types/n8n';
import {
  trackAnalyticsEvent,
  generateSubmissionId,
  N8nError,
} from './n8n-client';

// Analytics event types
export type AnalyticsEventType = 
  | 'page_view'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'form_start'
  | 'form_step'
  | 'form_submit'
  | 'form_abandon'
  | 'cta_click'
  | 'product_interest'
  | 'download'
  | 'video_play'
  | 'scroll_depth'
  | 'session_start'
  | 'session_end';

export interface AnalyticsEventData {
  eventType: AnalyticsEventType;
  eventCategory?: 'engagement' | 'conversion' | 'navigation' | 'user_behavior';
  eventLabel?: string;
  eventValue?: number;
  timestamp: string;
  sessionId?: string;
  userId?: string;
  
  // Page context
  pageUrl?: string;
  pageTitle?: string;
  referrer?: string;
  
  // User context
  userAgent?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  
  // Campaign tracking
  utmParams?: UTMParameters;
  
  // Custom data
  customData?: Record<string, unknown>;
}

export interface WhatsAppTrackingData {
  phoneNumber: string;
  message: string;
  source: string;
  campaign?: string;
  product?: ProductInterest;
  urgency?: UrgencyLevel;
  buttonText?: string;
  pageUrl?: string;
}

// Main analytics tracking class
export class Analytics {
  private sessionId: string;
  private userId?: string;
  private sessionStartTime: number;
  private eventsQueue: AnalyticsEventData[] = [];
  private isProcessing = false;

  constructor(userId?: string) {
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.userId = userId;
    this.sessionStartTime = Date.now();
    
    // Track session start
    this.trackEvent('session_start', {
      eventCategory: 'user_behavior',
    });

    // Setup session end tracking
    this.setupSessionEndTracking();
  }

  // Track WhatsApp link clicks
  async trackWhatsAppClick(data: WhatsAppTrackingData): Promise<void> {
    const eventData: AnalyticsEventData = {
      eventType: 'whatsapp_click',
      eventCategory: 'conversion',
      eventLabel: `WhatsApp: ${data.source}`,
      eventValue: this.getEventValue('whatsapp_click', data.urgency),
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      pageUrl: data.pageUrl || this.getCurrentPageUrl(),
      pageTitle: this.getCurrentPageTitle(),
      referrer: this.getReferrer(),
      userAgent: this.getUserAgent(),
      deviceType: this.getDeviceType(),
      customData: {
        phoneNumber: data.phoneNumber,
        message: data.message,
        source: data.source,
        campaign: data.campaign,
        product: data.product,
        urgency: data.urgency,
        buttonText: data.buttonText,
      },
    };

    await this.sendEvent(eventData);

    // Create n8n tracking request
    const trackingRequest: N8nLinkTrackingRequest = {
      linkType: 'whatsapp-cta',
      clickData: {
        timestamp: eventData.timestamp,
        userAgent: eventData.userAgent || '',
        referrer: eventData.referrer,
        utmParameters: eventData.utmParams,
        sessionId: this.sessionId,
        leadId: this.userId,
      },
    };

    try {
      await trackAnalyticsEvent(trackingRequest);
    } catch (error) {
      console.warn('Failed to send WhatsApp tracking to n8n:', error);
      // Continue execution - don't fail the click because of tracking
    }
  }

  // Track general events
  async trackEvent(
    eventType: AnalyticsEventType,
    data: Partial<AnalyticsEventData> = {}
  ): Promise<void> {
    const eventData: AnalyticsEventData = {
      eventType,
      eventCategory: data.eventCategory || this.getDefaultCategory(eventType),
      eventLabel: data.eventLabel,
      eventValue: data.eventValue || this.getEventValue(eventType),
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      pageUrl: data.pageUrl || this.getCurrentPageUrl(),
      pageTitle: data.pageTitle || this.getCurrentPageTitle(),
      referrer: data.referrer || this.getReferrer(),
      userAgent: data.userAgent || this.getUserAgent(),
      deviceType: data.deviceType || this.getDeviceType(),
      utmParams: data.utmParams || this.getUTMParams(),
      customData: data.customData,
      ...data,
    };

    await this.sendEvent(eventData);
  }

  // Track form interactions
  async trackFormStep(
    stepName: string,
    action: 'start' | 'complete' | 'abandon',
    formProgress?: number
  ): Promise<void> {
    await this.trackEvent('form_step', {
      eventCategory: 'conversion',
      eventLabel: `Form ${stepName}: ${action}`,
      eventValue: formProgress || 0,
      customData: {
        stepName,
        action,
        formProgress,
      },
    });
  }

  // Track CTA clicks
  async trackCTAClick(
    ctaText: string,
    ctaType: 'primary' | 'secondary' | 'text',
    targetUrl?: string
  ): Promise<void> {
    await this.trackEvent('cta_click', {
      eventCategory: 'engagement',
      eventLabel: `CTA: ${ctaText}`,
      eventValue: ctaType === 'primary' ? 10 : ctaType === 'secondary' ? 5 : 1,
      customData: {
        ctaText,
        ctaType,
        targetUrl,
      },
    });
  }

  // Track page views
  async trackPageView(pageUrl?: string, pageTitle?: string): Promise<void> {
    await this.trackEvent('page_view', {
      eventCategory: 'navigation',
      eventLabel: pageTitle || this.getCurrentPageTitle(),
      pageUrl: pageUrl || this.getCurrentPageUrl(),
      pageTitle: pageTitle || this.getCurrentPageTitle(),
    });
  }

  // Track scroll depth
  async trackScrollDepth(percentage: number): Promise<void> {
    // Only track significant milestones
    if (percentage % 25 === 0 && percentage > 0) {
      await this.trackEvent('scroll_depth', {
        eventCategory: 'engagement',
        eventLabel: `Scroll: ${percentage}%`,
        eventValue: percentage,
        customData: {
          scrollPercentage: percentage,
        },
      });
    }
  }

  // Send event to queue and process
  private async sendEvent(eventData: AnalyticsEventData): Promise<void> {
    this.eventsQueue.push(eventData);
    
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  // Process events queue
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.eventsQueue.length === 0) return;

    this.isProcessing = true;

    while (this.eventsQueue.length > 0) {
      const batch = this.eventsQueue.splice(0, 10); // Process in batches of 10
      
      try {
        await Promise.all(
          batch.map(event => this.sendToN8n(event))
        );
      } catch (error) {
        console.warn('Failed to send analytics batch:', error);
        // In production, you might want to retry or store failed events
      }
    }

    this.isProcessing = false;
  }

  // Send individual event to n8n
  private async sendToN8n(eventData: AnalyticsEventData): Promise<void> {
    // Determine link type based on event type
    let linkType: LinkType = 'analytics-event';
    if (eventData.eventType === 'whatsapp_click') {
      linkType = 'whatsapp-cta';
    } else if (eventData.eventType === 'email_click') {
      linkType = 'email-cta';
    }

    const trackingRequest: N8nLinkTrackingRequest = {
      linkType,
      clickData: {
        timestamp: eventData.timestamp,
        userAgent: eventData.userAgent || '',
        referrer: eventData.referrer,
        utmParameters: eventData.utmParams,
        sessionId: eventData.sessionId,
        leadId: eventData.userId,
        eventType: eventData.eventType,
        eventCategory: eventData.eventCategory,
        eventLabel: eventData.eventLabel,
        eventValue: eventData.eventValue,
        pageUrl: eventData.pageUrl,
        pageTitle: eventData.pageTitle,
        deviceType: eventData.deviceType,
        customData: eventData.customData,
      },
    };

    await trackAnalyticsEvent(trackingRequest);
  }

  // Utility methods
  private getCurrentPageUrl(): string {
    return typeof window !== 'undefined' ? window.location.href : '';
  }

  private getCurrentPageTitle(): string {
    return typeof document !== 'undefined' ? document.title : '';
  }

  private getReferrer(): string {
    return typeof document !== 'undefined' ? document.referrer : '';
  }

  private getUserAgent(): string {
    return typeof navigator !== 'undefined' ? navigator.userAgent : '';
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  private getUTMParams(): UTMParameters | undefined {
    if (typeof window === 'undefined') return undefined;
    
    const params = new URLSearchParams(window.location.search);
    const utmParams: Partial<UTMParameters> = {};
    
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    let hasUTM = false;
    
    utmKeys.forEach(key => {
      const value = params.get(key);
      if (value) {
        utmParams[key as keyof UTMParameters] = value;
        hasUTM = true;
      }
    });
    
    return hasUTM ? utmParams as UTMParameters : undefined;
  }

  private getDefaultCategory(eventType: AnalyticsEventType): 'engagement' | 'conversion' | 'navigation' | 'user_behavior' {
    const categoryMap: Record<AnalyticsEventType, 'engagement' | 'conversion' | 'navigation' | 'user_behavior'> = {
      'page_view': 'navigation',
      'whatsapp_click': 'conversion',
      'email_click': 'conversion',
      'phone_click': 'conversion',
      'form_start': 'conversion',
      'form_step': 'conversion',
      'form_submit': 'conversion',
      'form_abandon': 'conversion',
      'cta_click': 'engagement',
      'product_interest': 'engagement',
      'download': 'conversion',
      'video_play': 'engagement',
      'scroll_depth': 'engagement',
      'session_start': 'user_behavior',
      'session_end': 'user_behavior',
    };
    
    return categoryMap[eventType];
  }

  private getEventValue(eventType: AnalyticsEventType, urgency?: UrgencyLevel): number {
    const baseValues: Record<AnalyticsEventType, number> = {
      'page_view': 1,
      'whatsapp_click': 20,
      'email_click': 10,
      'phone_click': 15,
      'form_start': 5,
      'form_step': 3,
      'form_submit': 50,
      'form_abandon': -5,
      'cta_click': 8,
      'product_interest': 12,
      'download': 25,
      'video_play': 15,
      'scroll_depth': 2,
      'session_start': 1,
      'session_end': 1,
    };

    let value = baseValues[eventType];

    // Adjust value based on urgency
    if (urgency) {
      const urgencyMultiplier = {
        'urgent': 2,
        'high': 1.5,
        'medium': 1,
        'low': 0.8,
      };
      value *= urgencyMultiplier[urgency];
    }

    return Math.round(value);
  }

  private setupSessionEndTracking(): void {
    if (typeof window === 'undefined') return;

    // Track session end on page unload
    const trackSessionEnd = () => {
      this.trackEvent('session_end', {
        eventCategory: 'user_behavior',
        eventValue: Date.now() - this.sessionStartTime,
        customData: {
          sessionDuration: Date.now() - this.sessionStartTime,
        },
      });
    };

    window.addEventListener('beforeunload', trackSessionEnd);
    window.addEventListener('pagehide', trackSessionEnd);
  }
}

// Global analytics instance
let globalAnalytics: Analytics | null = null;

// Factory function to get/create analytics instance
export function getAnalytics(userId?: string): Analytics {
  if (!globalAnalytics) {
    globalAnalytics = new Analytics(userId);
  }
  return globalAnalytics;
}

// Convenience functions for common tracking scenarios
export async function trackWhatsAppClick(data: WhatsAppTrackingData): Promise<void> {
  const analytics = getAnalytics();
  await analytics.trackWhatsAppClick(data);
}

export async function trackFormInteraction(
  stepName: string,
  action: 'start' | 'complete' | 'abandon',
  formProgress?: number
): Promise<void> {
  const analytics = getAnalytics();
  await analytics.trackFormStep(stepName, action, formProgress);
}

export async function trackPageView(pageUrl?: string, pageTitle?: string): Promise<void> {
  const analytics = getAnalytics();
  await analytics.trackPageView(pageUrl, pageTitle);
}

export async function trackCTAClick(
  ctaText: string,
  ctaType: 'primary' | 'secondary' | 'text' = 'primary',
  targetUrl?: string
): Promise<void> {
  const analytics = getAnalytics();
  await analytics.trackCTAClick(ctaText, ctaType, targetUrl);
}

// Setup scroll depth tracking
export function setupScrollTracking(): void {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  let lastReported = 0;

  const checkScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Report every 25% milestone
      const milestone = Math.floor(scrollPercent / 25) * 25;
      if (milestone > lastReported && milestone > 0) {
        lastReported = milestone;
        const analytics = getAnalytics();
        analytics.trackScrollDepth(milestone);
      }
    }
  };

  window.addEventListener('scroll', checkScrollDepth, { passive: true });
}

// Initialize analytics on page load
export function initializeAnalytics(userId?: string): void {
  if (typeof window === 'undefined') return;

  // Get or create analytics instance
  getAnalytics(userId);

  // Setup scroll tracking
  setupScrollTracking();

  // Track initial page view
  trackPageView();
}

export default Analytics;