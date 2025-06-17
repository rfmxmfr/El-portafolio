import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { App } from '../App';
import { testUtils } from '../utils/testUtils';

const { mockApiCalls, mockAnalytics, mockCache, mockPerformanceMonitor, mockTranslation } = testUtils;

vi.mock('../services/enhancedAiService', () => ({
  enhancedAiService: {
    generateDesignSuggestions: vi.fn(),
    analyzeTrends: vi.fn(),
    generateColorPalette: vi.fn()
  }
}));

vi.mock('../services/analyticsService', () => ({
  analyticsService: testUtils.mockAnalytics()
}));

vi.mock('../services/cacheService', () => ({
  cacheService: testUtils.mockCache()
}));

vi.mock('../services/performanceMonitor', () => ({
  performanceMonitor: testUtils.mockPerformanceMonitor()
}));

describe('Performance Monitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tracks API calls', async () => {
    const mockPerformance = testUtils.mockPerformanceMonitor();
    vi.mock('../services/performanceMonitor', () => ({
      performanceMonitor: mockPerformance
    }));

    render(<App />);
    
    fireEvent.click(screen.getByText('common.adminPanel'));
    
    await waitFor(() => {
      expect(mockPerformance.trackApiCall).toHaveBeenCalled();
    });
  });

  it('tracks cache hits and misses', async () => {
    const mockCache = testUtils.mockCache();
    const mockPerformance = testUtils.mockPerformanceMonitor();

    vi.mock('../services/cacheService', () => ({
      cacheService: mockCache
    }));

    vi.mock('../services/performanceMonitor', () => ({
      performanceMonitor: mockPerformance
    }));

    render(<App />);
    
    fireEvent.click(screen.getByText('common.adminPanel'));
    
    await waitFor(() => {
      expect(mockPerformance.trackCacheHit).toHaveBeenCalled();
      expect(mockPerformance.trackCacheMiss).toHaveBeenCalled();
    });
  });

  it('tracks loading times', async () => {
    const mockPerformance = testUtils.mockPerformanceMonitor();
    vi.mock('../services/performanceMonitor', () => ({
      performanceMonitor: mockPerformance
    }));

    render(<App />);
    
    fireEvent.click(screen.getByText('common.adminPanel'));
    
    await waitFor(() => {
      expect(mockPerformance.trackLoadingTime).toHaveBeenCalled();
    });
  });

  it('handles errors gracefully', async () => {
    const mockPerformance = testUtils.mockPerformanceMonitor();
    vi.mock('../services/performanceMonitor', () => ({
      performanceMonitor: mockPerformance
    }));

    render(<App />);
    
    fireEvent.click(screen.getByText('common.adminPanel'));
    
    await waitFor(() => {
      expect(mockPerformance.trackError).toHaveBeenCalled();
    });
  });

  it('provides analytics data', async () => {
    const mockAnalytics = testUtils.mockAnalytics();
    vi.mock('../services/analyticsService', () => ({
      analyticsService: mockAnalytics
    }));

    render(<App />);
    
    fireEvent.click(screen.getByText('common.adminPanel'));
    
    await waitFor(() => {
      expect(mockAnalytics.getAnalytics).toHaveBeenCalled();
    });
  });

  it('handles multiple concurrent operations', async () => {
    const mockPerformance = testUtils.mockPerformanceMonitor();
    vi.mock('../services/performanceMonitor', () => ({
      performanceMonitor: mockPerformance
    }));

    render(<App />);
    
    // Simulate multiple concurrent operations
    fireEvent.click(screen.getByText('common.adminPanel'));
    fireEvent.click(screen.getByText('dashboard.tabs.design'));
    fireEvent.click(screen.getByText('dashboard.tabs.trends'));

    await waitFor(() => {
      expect(mockPerformance.trackApiCall).toHaveBeenCalledTimes(3);
      expect(mockPerformance.trackLoadingTime).toHaveBeenCalledTimes(3);
    });
  });
});
