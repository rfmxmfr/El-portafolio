import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const mlApi = {
  // Fashion Items
  getFashionItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/fashion-items/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching fashion items:', error);
      throw error;
    }
  },
  
  getFashionItem: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/fashion-items/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching fashion item ${id}:`, error);
      throw error;
    }
  },
  
  createFashionItem: async (data) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'image' && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (typeof data[key] === 'object') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      
      const response = await axios.post(`${API_URL}/fashion-items/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating fashion item:', error);
      throw error;
    }
  },
  
  analyzeFashionItem: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/fashion-items/${id}/analyze/`);
      return response.data;
    } catch (error) {
      console.error(`Error analyzing fashion item ${id}:`, error);
      throw error;
    }
  },
  
  getSimilarItems: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/fashion-items/${id}/similar_items/`);
      return response.data;
    } catch (error) {
      console.error(`Error getting similar items for ${id}:`, error);
      throw error;
    }
  },
  
  // Style Recommendations
  getRecommendations: async (sourceId = null) => {
    try {
      let url = `${API_URL}/recommendations/`;
      if (sourceId) {
        url += `?source_id=${sourceId}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },
};

export default mlApi;