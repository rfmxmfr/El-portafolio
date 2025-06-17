import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { EnhancedCollectionManager } from '../components/EnhancedCollectionManager';
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

describe('EnhancedCollectionManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders collections list', () => {
    render(<EnhancedCollectionManager />);
    expect(screen.getByText('collections.title')).toBeInTheDocument();
  });

  it('handles new collection creation', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockResolvedValue(mockAiCalls.mockAIResponse());

    render(<EnhancedCollectionManager />);
    
    const input = screen.getByPlaceholderText('collections.newCollection');
    fireEvent.change(input, { target: { value: 'Summer 2024' } });
    
    fireEvent.click(screen.getByText('common.create'));
    
    await waitFor(() => {
      expect(screen.getByText('Summer 2024')).toBeInTheDocument();
    });
  });

  it('handles AI analysis', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.analyzeTrends).mockResolvedValue(mockAiCalls.mockTrendAnalysis());

    render(<EnhancedCollectionManager />);
    
    const collection = screen.getByText('Spring 2024');
    fireEvent.click(collection);
    
    fireEvent.click(screen.getByText('collections.analyzeWithAI'));
    
    await waitFor(() => {
      expect(screen.getByText('trends.results')).toBeInTheDocument();
    });
  });

  it('handles loading states', async () => {
    vi.mocked(enhancedAiService.analyzeTrends).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockApiCalls().mockTrendAnalysis()), 2000);
      });
    });

    render(<EnhancedCollectionManager />);
    
    const collection = screen.getByText('Spring 2024');
    fireEvent.click(collection);
    
    fireEvent.click(screen.getByText('collections.analyzeWithAI'));
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('trends.results')).toBeInTheDocument();
    });
  });

  it('handles error states', async () => {
    vi.mocked(enhancedAiService.analyzeTrends).mockRejectedValue(new Error('AI error'));

    render(<EnhancedCollectionManager />);
    
    const collection = screen.getByText('Spring 2024');
    fireEvent.click(collection);
    
    fireEvent.click(screen.getByText('collections.analyzeWithAI'));
    
    await waitFor(() => {
      expect(screen.getByText('error.title')).toBeInTheDocument();
    });
  });

  it('tracks analytics events', async () => {
    const mockAnalytics = mockAnalytics();
    vi.mock('../services/analyticsService', () => ({
      analyticsService: mockAnalytics
    }));

    render(<EnhancedCollectionManager />);
    
    const collection = screen.getByText('Spring 2024');
    fireEvent.click(collection);
    
    await waitFor(() => {
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('collections.selected', { collection: 'Spring 2024' });
    });
  });
});
