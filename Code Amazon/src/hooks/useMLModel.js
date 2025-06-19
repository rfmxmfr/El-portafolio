import { useState, useCallback, useEffect } from 'react';

// Hook for managing ML model loading and caching
export default function useMLModel(modelUrl) {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if model is in cache
  const checkCache = useCallback(async () => {
    try {
      const cachedModel = localStorage.getItem(`ml-model-${modelUrl}`);
      if (cachedModel) {
        const modelData = JSON.parse(cachedModel);
        const cacheTime = modelData.timestamp;
        const now = Date.now();
        
        // Cache valid for 24 hours
        if (now - cacheTime < 24 * 60 * 60 * 1000) {
          return modelData.model;
        }
      }
      return null;
    } catch (err) {
      console.error('Error checking model cache:', err);
      return null;
    }
  }, [modelUrl]);

  // Cache model
  const cacheModel = useCallback(async (modelData) => {
    try {
      const cacheData = {
        model: modelData,
        timestamp: Date.now()
      };
      localStorage.setItem(`ml-model-${modelUrl}`, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Error caching model:', err);
    }
  }, [modelUrl]);

  // Load model
  const loadModel = useCallback(async () => {
    if (isLoading || model) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Check cache first
      const cachedModel = await checkCache();
      if (cachedModel) {
        setModel(cachedModel);
        setIsLoading(false);
        return;
      }
      
      // Simulate model loading - in a real app, this would use TensorFlow.js
      const loadedModel = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: 'Fashion ML Model', version: '1.0' });
        }, 1000);
      });
      
      // Cache the model
      await cacheModel(loadedModel);
      
      setModel(loadedModel);
    } catch (err) {
      console.error('Error loading model:', err);
      setError(err.message || 'Failed to load ML model');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, model, checkCache, cacheModel]);

  // Performance tracking
  const trackInference = useCallback((inputSize) => {
    const startTime = performance.now();
    
    return {
      end: () => {
        const duration = performance.now() - startTime;
        console.log(`ML inference took ${duration.toFixed(2)}ms for input size ${inputSize}`);
        return duration;
      }
    };
  }, []);

  return {
    model,
    isLoading,
    error,
    loadModel,
    trackInference
  };
}