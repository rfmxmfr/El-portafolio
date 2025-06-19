class PerformanceMonitor {
  constructor() {
    this.metrics = {
      apiCalls: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      loadingTimes: [],
    };
    this.startTime = Date.now();
  }

  trackApiCall() {
    this.metrics.apiCalls++;
  }

  trackCacheHit() {
    this.metrics.cacheHits++;
  }

  trackCacheMiss() {
    this.metrics.cacheMisses++;
  }

  trackError() {
    this.metrics.errors++;
  }

  trackLoadingTime(time) {
    this.metrics.loadingTimes.push(time);
  }

  getMetrics() {
    const now = Date.now();
    const totalTime = now - this.startTime;
    
    return {
      ...this.metrics,
      totalTime,
      averageLoadingTime: this.metrics.loadingTimes.length > 0 
        ? this.metrics.loadingTimes.reduce((a, b) => a + b) / this.metrics.loadingTimes.length
        : 0,
      cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) || 0,
    };
  }

  reset() {
    this.metrics = {
      apiCalls: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      loadingTimes: [],
    };
    this.startTime = Date.now();
  }
}

export const performanceMonitor = new PerformanceMonitor();
