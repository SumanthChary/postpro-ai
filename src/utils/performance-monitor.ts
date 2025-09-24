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
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.largestContentfulPaint = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0] as any;
          this.metrics.firstInputDelay = firstInput.processingStart - firstInput.startTime;
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.metrics.cumulativeLayoutShift = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Paint timing
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-paint') {
              this.metrics.firstPaint = entry.startTime;
            } else if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);
      } catch (e) {
        console.warn('Paint observer not supported');
      }
    }
  }

  private measureNavigationTiming() {
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      this.metrics.navigationStart = timing.navigationStart;
      this.metrics.loadEventEnd = timing.loadEventEnd;
      this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logPerformanceMetrics() {
    console.group('🚀 Performance Metrics');
    console.log('First Paint:', this.metrics.firstPaint?.toFixed(2) + 'ms');
    console.log('First Contentful Paint:', this.metrics.firstContentfulPaint?.toFixed(2) + 'ms');
    console.log('Largest Contentful Paint:', this.metrics.largestContentfulPaint?.toFixed(2) + 'ms');
    console.log('First Input Delay:', this.metrics.firstInputDelay?.toFixed(2) + 'ms');
    console.log('Cumulative Layout Shift:', this.metrics.cumulativeLayoutShift?.toFixed(4));
    console.log('DOM Content Loaded:', this.metrics.domContentLoaded?.toFixed(2) + 'ms');
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