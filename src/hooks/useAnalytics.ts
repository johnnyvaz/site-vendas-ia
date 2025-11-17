// Analytics Hook - DISABLED
// This hook is currently disabled to prevent performance issues

export function useAnalytics(_options?: any) {
  return {
    // State
    isInitialized: false,
    sessionId: '',
    utmParams: null,
    eventBuffer: [],
    conversionGoals: [],

    // Core tracking - all no-ops (accept any parameters)
    trackEvent: (..._args: any[]) => {},
    trackConversion: (..._args: any[]) => {},
    enableTracking: () => {},
    disableTracking: () => {},

    // Utilities - all no-ops
    flushEvents: () => Promise.resolve(),
    trackPagePerformance: () => {},
    getAnalyticsSummary: () => ({}),

    // Data
    analyticsData: {
      sessionHistory: [],
      conversionHistory: [],
      utmHistory: [],
      lastVisit: Date.now(),
      visitCount: 1,
    },
    config: {
      enableTracking: false,
      enableLocalStorage: false,
      enableN8nReporting: false,
      enableConversionTracking: false,
      enablePageViewTracking: false,
      trackingConsent: false,
      bufferSize: 10,
      flushInterval: 30000,
      enableDebugLogging: false,
      enableUTMCapture: false,
    },
  };
}

// Export types for compatibility
export type AnalyticsReturn = ReturnType<typeof useAnalytics>;
export type AnalyticsEventType = string;