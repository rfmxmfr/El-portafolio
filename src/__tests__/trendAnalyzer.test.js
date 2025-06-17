import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { EnhancedTrendAnalyzer } from '../components/EnhancedTrendAnalyzer';
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

describe('EnhancedTrendAnalyzer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders trend analyzer interface', () => {
    render(<EnhancedTrendAnalyzer />);
    expect(screen.getByText('trends.title')).toBeInTheDocument();
  });

  it('handles image uploads', async () => {
    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    await waitFor(() => {
      expect(screen.getByAltText('test.jpg')).toBeInTheDocument();
    });
  });

  it('analyzes trends', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.analyzeTrends).mockResolvedValue(mockAiCalls.mockTrendAnalysis());

    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    fireEvent.click(screen.getByText('trends.analyze'));
    
    await waitFor(() => {
      expect(screen.getByText('trends.results')).toBeInTheDocument();
    });
  });

  it('handles multiple image uploads', async () => {
    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFiles = [
      new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['test2'], 'test2.jpg', { type: 'image/jpeg' })
    ];
    
    fireEvent.change(fileInput, { target: { files: testFiles } });
    
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(2);
    });
  });

  it('caches results', async () => {
    const mockCache = testUtils.mockCache();
    vi.mock('../services/cacheService', () => ({
      cacheService: mockCache
    }));

    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    fireEvent.click(screen.getByText('trends.analyze'));
    
    await waitFor(() => {
      expect(mockCache.set).toHaveBeenCalled();
    });
  });

  it('handles loading states', async () => {
    vi.mocked(enhancedAiService.analyzeTrends).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockApiCalls().mockTrendAnalysis()), 2000);
      });
    });

    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    fireEvent.click(screen.getByText('trends.analyze'));
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('trends.results')).toBeInTheDocument();
    });
  });

  it('handles errors gracefully', async () => {
    vi.mocked(enhancedAiService.analyzeTrends).mockRejectedValue(new Error('AI error'));

    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    fireEvent.click(screen.getByText('trends.analyze'));
    
    await waitFor(() => {
      expect(screen.getByText('error.title')).toBeInTheDocument();
    });
  });

  it('tracks analytics events', async () => {
    const mockAnalytics = mockAnalytics();
    vi.mock('../services/analyticsService', () => ({
      analyticsService: mockAnalytics
    }));

    render(<EnhancedTrendAnalyzer />);
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    fireEvent.click(screen.getByText('trends.analyze'));
    
    await waitFor(() => {
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('ai.cache_miss', { feature: 'trend_analysis' });
    });
  });
});
