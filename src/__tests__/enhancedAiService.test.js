import { enhancedAiService } from '../services/enhancedAiService';
import { cacheService } from '../services/cacheService';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock cache service
jest.mock('../services/cacheService', () => ({
  cacheService: {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Enhanced AI Service', () => {
  const mockDesignSuggestions = {
    suggestions: [
      { text: 'First suggestion', image: 'image1.jpg' },
      { text: 'Second suggestion', image: 'image2.jpg' },
    ],
  };

  const mockTrendAnalysis = {
    trends: ['trend1', 'trend2'],
    confidence: 0.95,
  };

  const mockColorPalette = {
    colors: [
      { hex: '#FF0000', name: 'Red' },
      { hex: '#00FF00', name: 'Green' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateDesignSuggestions', () => {
    it('should return cached response when available', async () => {
      (cacheService.get as jest.Mock).mockResolvedValue(mockDesignSuggestions);

      const result = await enhancedAiService.generateDesignSuggestions('test prompt');
      expect(result).toEqual(mockDesignSuggestions);
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should make API call and cache response when no cache', async () => {
      (cacheService.get as jest.Mock).mockResolvedValue(null);
      (axios.post as jest.Mock).mockResolvedValue({ data: mockDesignSuggestions });

      const result = await enhancedAiService.generateDesignSuggestions('test prompt');
      expect(result).toEqual(mockDesignSuggestions);
      expect(cacheService.set).toHaveBeenCalledWith(
        expect.stringContaining('design-suggestions:test prompt'),
        mockDesignSuggestions
      );
    });

    it('should handle errors', async () => {
      (cacheService.get as jest.Mock).mockRejectedValue(new Error('Cache error'));
      (axios.post as jest.Mock).mockRejectedValue(new Error('API error'));

      await expect(
        enhancedAiService.generateDesignSuggestions('test prompt')
      ).rejects.toThrow('API error');
    });
  });

  describe('analyzeTrends', () => {
    it('should return cached response when available', async () => {
      const mockImages = [{ name: 'image1.jpg' }];
      (cacheService.get as jest.Mock).mockResolvedValue(mockTrendAnalysis);

      const result = await enhancedAiService.analyzeTrends(mockImages);
      expect(result).toEqual(mockTrendAnalysis);
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should make API call and cache response when no cache', async () => {
      const mockImages = [{ name: 'image1.jpg' }];
      (cacheService.get as jest.Mock).mockResolvedValue(null);
      (axios.post as jest.Mock).mockResolvedValue({ data: mockTrendAnalysis });

      const result = await enhancedAiService.analyzeTrends(mockImages);
      expect(result).toEqual(mockTrendAnalysis);
      expect(cacheService.set).toHaveBeenCalledWith(
        expect.stringContaining('trend-analysis:image1.jpg'),
        mockTrendAnalysis
      );
    });
  });

  describe('generateColorPalette', () => {
    it('should return cached response when available', async () => {
      const mockImage = { name: 'image.jpg' };
      (cacheService.get as jest.Mock).mockResolvedValue(mockColorPalette);

      const result = await enhancedAiService.generateColorPalette(mockImage);
      expect(result).toEqual(mockColorPalette);
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should make API call and cache response when no cache', async () => {
      const mockImage = { name: 'image.jpg' };
      (cacheService.get as jest.Mock).mockResolvedValue(null);
      (axios.post as jest.Mock).mockResolvedValue({ data: mockColorPalette });

      const result = await enhancedAiService.generateColorPalette(mockImage);
      expect(result).toEqual(mockColorPalette);
      expect(cacheService.set).toHaveBeenCalledWith(
        expect.stringContaining('color-palette:image.jpg'),
        mockColorPalette
      );
    });
  });
});
