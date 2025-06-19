import axios from 'axios';

// Create an axios instance for ML API calls
const mlApiClient = axios.create({
  baseURL: import.meta.env.VITE_ML_API_URL || 'http://localhost:3000/api/ml',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token interceptor
mlApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ML API service functions with fallback to mock data
export const mlApiService = {
  // Generate fashion design ideas
  generateIdeas: async (prompt) => {
    try {
      // Try to call the real ML API
      const response = await mlApiClient.post('/generate-ideas', { prompt });
      return response.data;
    } catch (error) {
      console.warn('Falling back to mock data for idea generation:', error);
      
      // Mock response if API call fails
      return {
        ideas: [
          "A sustainable collection featuring recycled materials with clean, minimalist lines",
          "Versatile pieces that transition seamlessly from day to evening wear",
          "Focus on natural dyes and locally-sourced fabrics for minimal environmental impact",
          "Incorporate adjustable design elements to extend the garment lifecycle"
        ],
        timestamp: new Date().toISOString(),
        model: 'fashion-gen'
      };
    }
  },

  // Generate fashion design images
  generateImage: async (prompt) => {
    try {
      // Try to call the real ML API
      const response = await mlApiClient.post('/generate-image', { prompt });
      return response.data;
    } catch (error) {
      console.warn('Falling back to mock data for image generation:', error);
      
      // Mock response if API call fails
      return {
        image_url: 'https://placehold.co/600x800/png?text=AI+Generated+Fashion+Design',
        prompt: prompt,
        timestamp: new Date().toISOString(),
        model: 'image-gen'
      };
    }
  },

  // Analyze fashion style
  analyzeStyle: async (imageUrl) => {
    try {
      // Try to call the real ML API
      const response = await mlApiClient.post('/analyze-style', { imageUrl });
      return response.data;
    } catch (error) {
      console.warn('Falling back to mock data for style analysis:', error);
      
      // Mock response if API call fails
      return {
        analysis: {
          style_categories: ['minimalist', 'contemporary', 'casual'],
          color_palette: ['#f5f5f5', '#333333', '#a0a0a0'],
          fabric_suggestions: ['cotton', 'linen', 'silk blend'],
          similar_styles: ['Scandinavian minimalism', 'Japanese contemporary']
        },
        timestamp: new Date().toISOString(),
        model: 'style-analyzer'
      };
    }
  },

  // Get ML model status
  getModelStatus: async () => {
    try {
      // Try to call the real ML API
      const response = await mlApiClient.get('/model-status');
      return response.data;
    } catch (error) {
      console.warn('Falling back to mock data for model status:', error);
      
      // Mock response if API call fails
      return {
        models: {
          'fashion-gen': {
            'status': 'active',
            'type': 'text',
            'description': 'Generates fashion design ideas and descriptions'
          },
          'style-analyzer': {
            'status': 'active',
            'type': 'text',
            'description': 'Analyzes fashion styles from text descriptions'
          },
          'image-gen': {
            'status': 'active',
            'type': 'image',
            'description': 'Generates fashion design images from descriptions'
          }
        },
        timestamp: new Date().toISOString()
      };
    }
  }
};

export default mlApiService;