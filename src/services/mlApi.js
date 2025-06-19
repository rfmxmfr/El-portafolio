import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const mlApi = {
  // Style prediction endpoints
  predictStyle: async (imageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ml/style-prediction`, {
        image: imageData
      })
      return response.data
    } catch (error) {
      console.error('Error predicting style:', error)
      throw error
    }
  },

  // Color palette generation
  generatePalette: async (imageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ml/color-palette`, {
        image: imageData
      })
      return response.data
    } catch (error) {
      console.error('Error generating palette:', error)
      throw error
    }
  },

  // Pattern analysis
  analyzePattern: async (imageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ml/pattern-analysis`, {
        image: imageData
      })
      return response.data
    } catch (error) {
      console.error('Error analyzing pattern:', error)
      throw error
    }
  },

  // Trend prediction
  predictTrends: async (season, category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ml/trend-prediction`, {
        params: {
          season,
          category
        }
      })
      return response.data
    } catch (error) {
      console.error('Error predicting trends:', error)
      throw error
    }
  }
}
