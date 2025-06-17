class AnalyticsService {
  constructor() {
    this.events = [];
    this.metrics = {
      userActions: {},
      featureUsage: {},
      errorRates: {},
      performance: {},
    };
  }

  trackEvent(eventName, data = {}) {
    const event = {
      timestamp: Date.now(),
      name: eventName,
      data,
    };
    this.events.push(event);
    this._updateMetrics(eventName, data);
  }

  _updateMetrics(eventName, data) {
    // Update user actions
    if (!this.metrics.userActions[eventName]) {
      this.metrics.userActions[eventName] = 0;
    }
    this.metrics.userActions[eventName]++;

    // Update feature usage
    const feature = data.feature;
    if (feature) {
      if (!this.metrics.featureUsage[feature]) {
        this.metrics.featureUsage[feature] = 0;
      }
      this.metrics.featureUsage[feature]++;
    }

    // Update error rates if error event
    if (eventName.startsWith('error')) {
      const errorType = data.type || 'unknown';
      if (!this.metrics.errorRates[errorType]) {
        this.metrics.errorRates[errorType] = 0;
      }
      this.metrics.errorRates[errorType]++;
    }

    // Update performance metrics
    if (data.performance) {
      const { loadingTime, cacheHit } = data.performance;
      if (!this.metrics.performance.loadingTimes) {
        this.metrics.performance.loadingTimes = [];
      }
      this.metrics.performance.loadingTimes.push(loadingTime);
      
      if (cacheHit) {
        if (!this.metrics.performance.cacheHits) {
          this.metrics.performance.cacheHits = 0;
        }
        this.metrics.performance.cacheHits++;
      }
    }
  }

  getAnalytics() {
    const now = Date.now();
    const metrics = {
      ...this.metrics,
      lastUpdated: now,
      totalEvents: this.events.length,
      averageLoadingTime: this.metrics.performance.loadingTimes.length > 0
        ? this.metrics.performance.loadingTimes.reduce((a, b) => a + b) / this.metrics.performance.loadingTimes.length
        : 0,
      cacheHitRate: this.metrics.performance.cacheHits / this.metrics.performance.loadingTimes.length || 0,
    };
    return metrics;
  }

  reset() {
    this.events = [];
    this.metrics = {
      userActions: {},
      featureUsage: {},
      errorRates: {},
      performance: {},
    };
  }
}

export const analyticsService = new AnalyticsService();
