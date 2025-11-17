/**
 * Performance Monitoring for Vendas.IA
 * Tracks Core Web Vitals and custom metrics for Brazilian mobile optimization
 * Target: <3s load time on 3G networks
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte

  // Custom Metrics
  timeToInteractive?: number;
  loadEventEnd?: number;
  domContentLoaded?: number;

  // Network & Device Info
  connectionType?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;

  // User Context
  timestamp: number;
  url: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
}

export interface PerformanceThresholds {
  lcp: { good: number; poor: number };
  fid: { good: number; poor: number };
  cls: { good: number; poor: number };
  fcp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

// Performance thresholds optimized for Brazilian mobile networks
export const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  fid: { good: 100, poor: 300 },   // First Input Delay
  cls: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  fcp: { good: 1800, poor: 3000 }, // First Contentful Paint
  ttfb: { good: 800, poor: 1800 }  // Time to First Byte
};

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private isMonitoring = false;

  constructor() {
    this.initializeMetrics();
  }

  /**
   * Initialize performance monitoring
   */
  public start(): void {
    if (this.isMonitoring || typeof window === 'undefined') return;

    this.isMonitoring = true;
    this.setupBasicMetrics();
    this.observePerformanceEntries();
    this.observeCoreWebVitals();
    this.monitorNetworkInfo();

    console.log('[PerformanceMonitor] Started monitoring');
  }

  /**
   * Stop performance monitoring and cleanup observers
   */
  public stop(): void {
    if (!this.isMonitoring) return;

    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.isMonitoring = false;

    console.log('[PerformanceMonitor] Stopped monitoring');
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return {
      ...this.metrics,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    } as PerformanceMetrics;
  }

  /**
   * Send metrics to n8n analytics workflow
   */
  public async reportMetrics(): Promise<void> {
    const metrics = this.getMetrics();
    const analysis = this.analyzeMetrics(metrics);

    try {
      // Send to n8n analytics workflow
      const response = await fetch('/api/n8n/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'performance',
          metrics,
          analysis,
          timestamp: metrics.timestamp
        })
      });

      if (!response.ok) {
        throw new Error(`Analytics failed: ${response.statusText}`);
      }

      console.log('[PerformanceMonitor] Metrics reported successfully');
    } catch (error) {
      console.error('[PerformanceMonitor] Failed to report metrics:', error);

      // Fallback: Store in localStorage for later retry
      this.storeMetricsLocally(metrics, analysis);
    }
  }

  /**
   * Analyze performance metrics against thresholds
   */
  private analyzeMetrics(metrics: PerformanceMetrics) {
    const analysis = {
      score: 0,
      issues: [] as string[],
      recommendations: [] as string[],
      passedMetrics: [] as string[],
      isMobileFriendly: true
    };

    // Analyze Core Web Vitals
    if (metrics.lcp) {
      if (metrics.lcp <= PERFORMANCE_THRESHOLDS.lcp.good) {
        analysis.score += 20;
        analysis.passedMetrics.push('LCP');
      } else if (metrics.lcp <= PERFORMANCE_THRESHOLDS.lcp.poor) {
        analysis.score += 10;
        analysis.issues.push(`LCP (${metrics.lcp}ms) needs improvement`);
        analysis.recommendations.push('Optimize largest contentful paint with image optimization and lazy loading');
      } else {
        analysis.issues.push(`LCP (${metrics.lcp}ms) is poor`);
        analysis.recommendations.push('Critical: Optimize images, enable CDN, and implement code splitting');
        analysis.isMobileFriendly = false;
      }
    }

    if (metrics.fid !== undefined) {
      if (metrics.fid <= PERFORMANCE_THRESHOLDS.fid.good) {
        analysis.score += 20;
        analysis.passedMetrics.push('FID');
      } else if (metrics.fid <= PERFORMANCE_THRESHOLDS.fid.poor) {
        analysis.score += 10;
        analysis.issues.push(`FID (${metrics.fid}ms) needs improvement`);
        analysis.recommendations.push('Reduce JavaScript execution time and eliminate render-blocking resources');
      } else {
        analysis.issues.push(`FID (${metrics.fid}ms) is poor`);
        analysis.recommendations.push('Critical: Minimize main thread work and defer non-critical JavaScript');
        analysis.isMobileFriendly = false;
      }
    }

    if (metrics.cls !== undefined) {
      if (metrics.cls <= PERFORMANCE_THRESHOLDS.cls.good) {
        analysis.score += 20;
        analysis.passedMetrics.push('CLS');
      } else if (metrics.cls <= PERFORMANCE_THRESHOLDS.cls.poor) {
        analysis.score += 10;
        analysis.issues.push(`CLS (${metrics.cls}) needs improvement`);
        analysis.recommendations.push('Add size attributes to images and reserve space for dynamic content');
      } else {
        analysis.issues.push(`CLS (${metrics.cls}) is poor`);
        analysis.recommendations.push('Critical: Fix layout shifts by setting dimensions for all elements');
        analysis.isMobileFriendly = false;
      }
    }

    // Check mobile-specific criteria
    if (metrics.viewport.width < 768 && metrics.lcp && metrics.lcp > 3000) {
      analysis.isMobileFriendly = false;
      analysis.recommendations.push('Mobile optimization needed: Target <3s load time on mobile networks');
    }

    return analysis;
  }

  /**
   * Setup basic performance metrics
   */
  private setupBasicMetrics(): void {
    if (!window.performance) return;

    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      this.metrics.loadEventEnd = navigation.loadEventEnd - navigation.loadEventStart;
    }

    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      this.metrics.fcp = fcpEntry.startTime;
    }
  }

  /**
   * Observe performance entries for Core Web Vitals
   */
  private observePerformanceEntries(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if ('processingStart' in entry && 'startTime' in entry && entry.name === 'first-input') {
            this.metrics.fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();

        entries.forEach((entry) => {
          if ('hadRecentInput' in entry && 'value' in entry) {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
        });

        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

    } catch (error) {
      console.warn('[PerformanceMonitor] Some observers not supported:', error);
    }
  }

  /**
   * Observe Core Web Vitals using web-vitals library approach
   */
  private observeCoreWebVitals(): void {
    // Time to Interactive approximation
    if (document.readyState === 'complete') {
      this.metrics.timeToInteractive = performance.now();
    } else {
      window.addEventListener('load', () => {
        this.metrics.timeToInteractive = performance.now();
      });
    }
  }

  /**
   * Monitor network and device information
   */
  private monitorNetworkInfo(): void {
    // Network Information API
    const connection = (navigator as Navigator & {
      connection?: { effectiveType?: string; type?: string };
      mozConnection?: { effectiveType?: string; type?: string };
      webkitConnection?: { effectiveType?: string; type?: string };
    }).connection || (navigator as Navigator & { mozConnection?: { effectiveType?: string; type?: string } }).mozConnection || (navigator as Navigator & { webkitConnection?: { effectiveType?: string; type?: string } }).webkitConnection;
    if (connection) {
      this.metrics.connectionType = connection.effectiveType || connection.type;
    }

    // Device Memory API
    if ('deviceMemory' in navigator) {
      this.metrics.deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    }

    // Hardware Concurrency
    if ('hardwareConcurrency' in navigator) {
      this.metrics.hardwareConcurrency = navigator.hardwareConcurrency;
    }
  }

  /**
   * Store metrics locally when network reporting fails
   */
  private storeMetricsLocally(metrics: PerformanceMetrics, analysis: unknown): void {
    try {
      const stored = localStorage.getItem('vendas-ia-performance');
      const data = stored ? JSON.parse(stored) : [];

      data.push({ metrics, analysis, timestamp: Date.now() });

      // Keep only last 10 entries
      if (data.length > 10) {
        data.splice(0, data.length - 10);
      }

      localStorage.setItem('vendas-ia-performance', JSON.stringify(data));
    } catch (error) {
      console.warn('[PerformanceMonitor] Failed to store metrics locally:', error);
    }
  }

  /**
   * Initialize default metrics structure
   */
  private initializeMetrics(): void {
    this.metrics = {
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewport: {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
      }
    };
  }

  /**
   * Get stored metrics for retry attempts
   */
  public getStoredMetrics(): Array<{ metrics: PerformanceMetrics; analysis: unknown; timestamp: number }> {
    try {
      const stored = localStorage.getItem('vendas-ia-performance');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear stored metrics after successful upload
   */
  public clearStoredMetrics(): void {
    try {
      localStorage.removeItem('vendas-ia-performance');
    } catch (error) {
      console.warn('[PerformanceMonitor] Failed to clear stored metrics:', error);
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-start monitoring when module loads (client-side only)
if (typeof window !== 'undefined') {
  // Start monitoring after page load
  if (document.readyState === 'complete') {
    performanceMonitor.start();
  } else {
    window.addEventListener('load', () => {
      performanceMonitor.start();

      // Report metrics after 5 seconds to capture most interactions
      setTimeout(() => {
        performanceMonitor.reportMetrics();
      }, 5000);
    });
  }

  // Report metrics before page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.reportMetrics();
  });

  // Report metrics on visibility change (mobile app switching)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      performanceMonitor.reportMetrics();
    }
  });
}

// Export for manual usage
export default performanceMonitor;