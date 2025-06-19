import axios from 'axios';
import { cacheService } from './cacheService';
import config from '../config/configService';
import { performanceMonitor } from './performanceMonitor';
import { analyticsService } from './analyticsService';

export const enhancedAiService = {
  async generateDesignSuggestions(prompt) {
    try {
      const startTime = performance.now();
      performanceMonitor.trackApiCall();
      
      const cacheKey = `design-suggestions:${prompt}`;
      const cachedResponse = await cacheService.get(cacheKey);
      
      if (cachedResponse) {
        performanceMonitor.trackCacheHit();
        analyticsService.trackEvent('ai.cache_hit', { feature: 'design_suggestions' });
        return cachedResponse;
      }

      const response = await axios.post(`${config.AI_API_URL}/api/ai/design-suggestions`, { prompt });
      const data = response.data;
      
      // Cache the response
      await cacheService.set(cacheKey, data);
      performanceMonitor.trackCacheMiss();
      analyticsService.trackEvent('ai.cache_miss', { feature: 'design_suggestions' });
      
      const loadingTime = performance.now() - startTime;
      performanceMonitor.trackLoadingTime(loadingTime);
      analyticsService.trackEvent('ai.performance', { 
        feature: 'design_suggestions',
        loadingTime,
        cacheHit: false
      });
      
      return data;
    } catch (error) {
      performanceMonitor.trackError();
      analyticsService.trackEvent('error.ai', { 
        type: 'design_suggestions',
        message: error.message
      });
      console.error('AI service error:', error);
      throw error;
    }
  },

  async analyzeTrends(images) {
    try {
      const startTime = performance.now();
      performanceMonitor.trackApiCall();
      
      const cacheKey = `trend-analysis:${images.map(img => img.name).join(',')}`;
      const cachedResponse = await cacheService.get(cacheKey);
      
      if (cachedResponse) {
        performanceMonitor.trackCacheHit();
        analyticsService.trackEvent('ai.cache_hit', { feature: 'trend_analysis' });
        return cachedResponse;
      }

      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.post(`${config.AI_API_URL}/api/ai/trend-analysis`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data;
      
      // Cache the response
      await cacheService.set(cacheKey, data);
      performanceMonitor.trackCacheMiss();
      analyticsService.trackEvent('ai.cache_miss', { feature: 'trend_analysis' });
      
      const loadingTime = performance.now() - startTime;
      performanceMonitor.trackLoadingTime(loadingTime);
      analyticsService.trackEvent('ai.performance', { 
        feature: 'trend_analysis',
        loadingTime,
        cacheHit: false
      });
      
      return data;
    } catch (error) {
      performanceMonitor.trackError();
      analyticsService.trackEvent('error.ai', { 
        type: 'trend_analysis',
        message: error.message
      });
      console.error('AI trend analysis error:', error);
      throw error;
    }
  },

  async generateColorPalette(image) {
    try {
      const startTime = performance.now();
      performanceMonitor.trackApiCall();
      
      const cacheKey = `color-palette:${image.name}`;
      const cachedResponse = await cacheService.get(cacheKey);
      
      if (cachedResponse) {
        performanceMonitor.trackCacheHit();
        analyticsService.trackEvent('ai.cache_hit', { feature: 'color_palette' });
        return cachedResponse;
      }

      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post(`${config.AI_API_URL}/api/ai/color-palette`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data;
      
      // Cache the response
      await cacheService.set(cacheKey, data);
      performanceMonitor.trackCacheMiss();
      analyticsService.trackEvent('ai.cache_miss', { feature: 'color_palette' });
      
      const loadingTime = performance.now() - startTime;
      performanceMonitor.trackLoadingTime(loadingTime);
      analyticsService.trackEvent('ai.performance', { 
        feature: 'color_palette',
        loadingTime,
        cacheHit: false
      });
      
      return data;
    } catch (error) {
      performanceMonitor.trackError();
      analyticsService.trackEvent('error.ai', { 
        type: 'color_palette',
        message: error.message
      });
      console.error('AI color palette error:', error);
      throw error;
    }
  },

  async invalidateCache(type, identifier) {
    try {
      const cacheKey = `${type}:${identifier}`;
      await cacheService.delete(cacheKey);
      return true;
    } catch (error) {
      console.error('Cache invalidation error:', error);
      return false;
    }
  },
};
