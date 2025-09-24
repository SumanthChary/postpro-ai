// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: Map<string, PerformanceObserver> = new Map();
  private metrics: Map<string, number[]> = new Map();

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers() {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      let clsEntries: any[] = [];
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsEntries.push(entry);
            clsValue += entry.value;
          }
        });
        this.recordMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);

    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 10 measurements
    if (values.length > 10) {
      values.shift();
    }
  }

  getMetrics(): Record<string, { current: number; average: number; count: number }> {
    const result: Record<string, { current: number; average: number; count: number }> = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        const current = values[values.length - 1];
        const average = values.reduce((sum, val) => sum + val, 0) / values.length;
        result[name] = {
          current,
          average,
          count: values.length
        };
      }
    });
    
    return result;
  }

  // Memory usage monitoring
  getMemoryUsage(): any {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
      };
    }
    return null;
  }

  // Network timing
  getNetworkTiming(): any {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      return {
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        serverResponse: navigation.responseEnd - navigation.requestStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      };
    }
    return null;
  }

  // Resource timing
  getResourceTiming(): any[] {
    return performance.getEntriesByType('resource').map((entry: any) => ({
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize || 0,
      type: entry.initiatorType,
    }));
  }

  // Report performance issues
  reportPerformanceIssues(): string[] {
    const issues: string[] = [];
    const metrics = this.getMetrics();

    // Check LCP (should be < 2.5s)
    if (metrics.LCP && metrics.LCP.current > 2500) {
      issues.push(`Slow LCP: ${Math.round(metrics.LCP.current)}ms (target: <2500ms)`);
    }

    // Check FID (should be < 100ms)
    if (metrics.FID && metrics.FID.current > 100) {
      issues.push(`High FID: ${Math.round(metrics.FID.current)}ms (target: <100ms)`);
    }

    // Check CLS (should be < 0.1)
    if (metrics.CLS && metrics.CLS.current > 0.1) {
      issues.push(`High CLS: ${metrics.CLS.current.toFixed(3)} (target: <0.1)`);
    }

    // Check memory usage
    const memory = this.getMemoryUsage();
    if (memory && memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
      issues.push(`High memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
    }

    return issues;
  }

  cleanup() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
    this.metrics.clear();
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();
