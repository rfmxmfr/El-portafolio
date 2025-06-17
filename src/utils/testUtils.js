import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

export const mockApiCalls = () => {
  return {
    mockAIResponse: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        suggestions: [
          {
            text: 'Modern minimalist dress',
            image: 'mock-image-url-1.jpg'
          },
          {
            text: 'Boho chic outfit',
            image: 'mock-image-url-2.jpg'
          }
        ]
      }
    }),
    mockTrendAnalysis: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        trends: [
          'Sustainable materials',
          'Minimalist silhouettes',
          'Monochrome palettes'
        ]
      }
    }),
    mockPaletteGeneration: vi.fn().mockResolvedValue({
      status: 200,
      data: {
        palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
      }
    })
  };
};

export const mockAnalytics = () => {
  return {
    trackEvent: vi.fn(),
    getAnalytics: vi.fn().mockReturnValue({
      userActions: {},
      featureUsage: {},
      errorRates: {},
      performance: {}
    })
  };
};

export const mockCache = () => {
  return {
    get: vi.fn(),
    set: vi.fn()
  };
};

export const mockPerformanceMonitor = () => {
  return {
    trackApiCall: vi.fn(),
    trackCacheHit: vi.fn(),
    trackCacheMiss: vi.fn(),
    trackError: vi.fn(),
    trackLoadingTime: vi.fn()
  };
};

export const mockTranslation = () => {
  return {
    t: vi.fn().mockImplementation((key) => key)
  };
};

export const simulateNetworkDelay = async (ms = 1000) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

export const simulateError = async (error) => {
  throw new Error(error);
};

export const testUtils = {
  simulateNetworkDelay,
  simulateError,
  mockApiCalls,
  mockAnalytics,
  mockCache,
  mockPerformanceMonitor,
  mockTranslation,
  screen,
  fireEvent,
  waitFor,
  within,
  userEvent
};
