import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { EnhancedAdminDashboard } from '../components/EnhancedAdminDashboard';
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
  analyticsService: mockAnalytics()
}));

vi.mock('../services/cacheService', () => ({
  cacheService: mockCache()
}));

vi.mock('../services/performanceMonitor', () => ({
  performanceMonitor: mockPerformanceMonitor()
}));

describe('EnhancedAdminDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<EnhancedAdminDashboard onClose={() => {}} />);
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();
  });

  it('handles tab navigation', async () => {
    render(<EnhancedAdminDashboard onClose={() => {}} />);
    
    const collectionsTab = screen.getByText('dashboard.tabs.collections');
    const designTab = screen.getByText('dashboard.tabs.design');
    const trendsTab = screen.getByText('dashboard.tabs.trends');

    fireEvent.click(designTab);
    await waitFor(() => expect(screen.getByText('design.title')).toBeInTheDocument());

    fireEvent.click(trendsTab);
    await waitFor(() => expect(screen.getByText('trends.title')).toBeInTheDocument());

    fireEvent.click(collectionsTab);
    await waitFor(() => expect(screen.getByText('collections.title')).toBeInTheDocument());
  });

  it('handles AI design suggestions', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockResolvedValue(mockAiCalls.mockAIResponse());

    render(<EnhancedAdminDashboard onClose={() => {}} />);
    
    fireEvent.click(screen.getByText('dashboard.tabs.design'));
    
    const input = screen.getByPlaceholderText('design.promptPlaceholder');
    fireEvent.change(input, { target: { value: 'modern dress' } });
    
    fireEvent.click(screen.getByText('design.generate'));
    
    await waitFor(() => {
      expect(screen.getByText('design.suggestion', { number: 1 })).toBeInTheDocument();
    });
  });

  it('handles trend analysis', async () => {
    const mockAiCalls = mockApiCalls();
    vi.mocked(enhancedAiService.analyzeTrends).mockResolvedValue(mockAiCalls.mockTrendAnalysis());

    render(<EnhancedAdminDashboard onClose={() => {}} />);
    
    fireEvent.click(screen.getByText('dashboard.tabs.trends'));
    
    const fileInput = screen.getByLabelText('trends.uploadImages');
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    
    fireEvent.click(screen.getByText('trends.analyze'));
    
    await waitFor(() => {
      expect(screen.getByText('trends.results')).toBeInTheDocument();
    });
  });

  it('handles error states', async () => {
    vi.mocked(enhancedAiService.generateDesignSuggestions).mockRejectedValue(new Error('AI error'));

    render(<EnhancedAdminDashboard onClose={() => {}} />);
    
    fireEvent.click(screen.getByText('dashboard.tabs.design'));
    
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

    render(<EnhancedAdminDashboard onClose={() => {}} />);
    
    fireEvent.click(screen.getByText('dashboard.tabs.design'));
    
    await waitFor(() => {
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('ai.cache_miss', { feature: 'design_suggestions' });
    });
  });
});
