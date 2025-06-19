import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { EnhancedDesignAssistant } from '../components/EnhancedDesignAssistant';
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

describe('EnhancedDesignAssistant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders design interface', () => {
    render(<EnhancedDesignAssistant />);
    expect(screen.getByText('design.title')).toBeInTheDocument();
  });

  it('generates design suggestions', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockResolvedValue(mockAiCalls.mockAIResponse());

    render(<EnhancedDesignAssistant />);
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    await waitFor(() => {
      expect(screen.getByText('design.suggestion', { number: 1 })).toBeInTheDocument();
    });
  });

  it('handles multiple suggestions', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockResolvedValue({
      ...mockAiCalls.mockAIResponse(),
      data: {
        suggestions: Array(5).fill({
          text: 'Modern minimalist dress',
          image: 'mock-image-url.jpg'
        })
      }
    });

    render(<EnhancedDesignAssistant />);
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(5);
    });
  });

  it('caches results', async () => {
    const mockCache = testUtils.mockCache();
    vi.mock('../services/cacheService', () => ({
      cacheService: mockCache
    }));

    render(<EnhancedDesignAssistant />);
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    await waitFor(() => {
      expect(mockCache.set).toHaveBeenCalled();
    });
  });

  it('handles loading states', async () => {
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockApiCalls().mockAIResponse()), 2000);
      });
    });

    render(<EnhancedDesignAssistant />);
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('design.suggestion', { number: 1 })).toBeInTheDocument();
    });
  });

  it('handles errors gracefully', async () => {
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockRejectedValue(new Error('AI error'));

    render(<EnhancedDesignAssistant />);
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    await waitFor(() => {
      expect(screen.getByText('error.title')).toBeInTheDocument();
    });
  });

  it('tracks analytics events', async () => {
    const mockAnalytics = mockAnalytics();
    vi.mock('../services/analyticsService', () => ({
      analyticsService: mockAnalytics
    }));

    render(<EnhancedDesignAssistant />);
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    await waitFor(() => {
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('ai.cache_miss', { feature: 'design_suggestions' });
    });
  });
});
