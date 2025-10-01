// Performance monitoring utilities

interface PerformanceMetrics {
  navigationStart: number;
  loadEventEnd: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
    this.measureNavigationTiming();
  }

  private initializeObservers() {
    if (!('PerformanceObserver' in window)) return;

    // Initialize CLS tracking
    this.metrics.cumulativeLayoutShift = 0;

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.largestContentfulPaint = Math.round(lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(lcpObserver);
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const firstInput = entries[0] as any;
          this.metrics.firstInputDelay = Math.round(firstInput.processingStart - firstInput.startTime);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.push(fidObserver);
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            this.metrics.cumulativeLayoutShift = (this.metrics.cumulativeLayoutShift || 0) + (entry as any).value;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(clsObserver);
    } catch (e) {
      // CLS not supported
    }

    // Paint timing
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            this.metrics.firstPaint = Math.round(entry.startTime);
          } else if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = Math.round(entry.startTime);
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
      this.observers.push(paintObserver);
    } catch (e) {
      // Paint timing not supported
    }
  }

  private measureNavigationTiming() {
    if ('performance' in window && performance.getEntriesByType) {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const nav = navEntries[0];
        this.metrics.navigationStart = Math.round(nav.fetchStart);
        this.metrics.loadEventEnd = Math.round(nav.loadEventEnd);
        this.metrics.domContentLoaded = Math.round(nav.domContentLoadedEventEnd - nav.fetchStart);
      }
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logPerformanceMetrics() {
    console.group('🚀 Performance Metrics');
    console.log('First Paint:', (this.metrics.firstPaint || 0) + 'ms');
    console.log('First Contentful Paint:', (this.metrics.firstContentfulPaint || 0) + 'ms');
    console.log('Largest Contentful Paint:', (this.metrics.largestContentfulPaint || 0) + 'ms');
    console.log('First Input Delay:', (this.metrics.firstInputDelay || 0) + 'ms');
    console.log('Cumulative Layout Shift:', (this.metrics.cumulativeLayoutShift || 0).toFixed(3));
    console.log('DOM Content Loaded:', (this.metrics.domContentLoaded || 0) + 'ms');
    console.groupEnd();
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  // Performance grade based on Core Web Vitals
  public getPerformanceGrade(): { grade: string; score: number; recommendations: string[] } {
    const recommendations: string[] = [];
    let score = 100;

    // LCP should be less than 2.5s
    if (this.metrics.largestContentfulPaint && this.metrics.largestContentfulPaint > 2500) {
      score -= 30;
      recommendations.push('Optimize Largest Contentful Paint (LCP) - should be < 2.5s');
    }

    // FID should be less than 100ms
    if (this.metrics.firstInputDelay && this.metrics.firstInputDelay > 100) {
      score -= 25;
      recommendations.push('Optimize First Input Delay (FID) - should be < 100ms');
    }

    // CLS should be less than 0.1
    if (this.metrics.cumulativeLayoutShift && this.metrics.cumulativeLayoutShift > 0.1) {
      score -= 25;
      recommendations.push('Optimize Cumulative Layout Shift (CLS) - should be < 0.1');
    }

    // FCP should be less than 1.8s
    if (this.metrics.firstContentfulPaint && this.metrics.firstContentfulPaint > 1800) {
      score -= 20;
      recommendations.push('Optimize First Contentful Paint (FCP) - should be < 1.8s');
    }

    let grade = 'A+';
    if (score < 90) grade = 'A';
    if (score < 80) grade = 'B';
    if (score < 70) grade = 'C';
    if (score < 60) grade = 'D';
    if (score < 50) grade = 'F';

    return { grade, score, recommendations };
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility to measure function execution time
export const measureExecutionTime = <T extends (...args: any[]) => any>(
  fn: T,
  label?: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`⏱️ ${label || fn.name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }) as T;
};

// Utility to measure async function execution time
export const measureAsyncExecutionTime = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  label?: string
): T => {
  return (async (...args: Parameters<T>) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    console.log(`⏱️ ${label || fn.name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }) as T;
};

// Initialize performance monitoring when DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logPerformanceMetrics();
      const grade = performanceMonitor.getPerformanceGrade();
      console.log(`🏆 Performance Grade: ${grade.grade} (${grade.score}/100)`);
      if (grade.recommendations.length > 0) {
        console.log('💡 Recommendations:', grade.recommendations);
      }
    }, 1000);
  });
}