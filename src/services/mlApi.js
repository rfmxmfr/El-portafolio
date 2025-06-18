import axios from 'axios';

// Create an axios instance for ML API calls
const mlApiClient = axios.create({
  baseURL: process.env.REACT_APP_ML_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token interceptor
mlApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ML API service functions
export const mlApiService = {
  // Generate fashion design ideas
  generateIdeas: async (prompt) => {
    try {
      const response = await mlApiClient.post('/generate-ideas', { prompt });
      return response.data;
    } catch (error) {
      console.error('Error generating ideas:', error);
      throw error;
    }
  },

  // Generate fashion design images
  generateImage: async (prompt) => {
    try {
      const response = await mlApiClient.post('/generate-image', { prompt });
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  },

  // Analyze fashion style
  analyzeStyle: async (imageUrl) => {
    try {
      const response = await mlApiClient.post('/analyze-style', { imageUrl });
      return response.data;
    } catch (error) {
      console.error('Error analyzing style:', error);
      throw error;
    }
  },

  // Get ML model status
  getModelStatus: async () => {
    try {
      const response = await mlApiClient.get('/model-status');
      return response.data;
    } catch (error) {
      console.error('Error getting model status:', error);
      throw error;
    }
  }
};

export default mlApiService;