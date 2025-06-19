import api from './api';

// Global loading state tracker
export const loadingStates = {
  login: false,
  logout: false,
  collections: false,
  designs: false,
  // Add other API operations as needed
};

// Error handling helper
const handleApiError = (error, operation) => {
  const errorMessage = error.response?.data?.message || `${operation} failed`;
  const statusCode = error.response?.status;
  
  // Log detailed error info for debugging
  console.error(`API Error (${operation}):`, {
    message: errorMessage,
    status: statusCode,
    details: error.response?.data,
    originalError: error
  });
  
  // Create error with additional metadata
  const enhancedError = new Error(errorMessage);
  enhancedError.statusCode = statusCode;
  enhancedError.operation = operation;
  enhancedError.timestamp = new Date().toISOString();
  
  return enhancedError;
};

// User authentication
const login = async ({ email, password }) => {
  loadingStates.login = true;
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    if (!token || !user) {
      throw new Error('Invalid response from server');
    }
    
    // Store token and user data securely
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('lastActive', Date.now().toString());
    
    return user;
  } catch (error) {
    throw handleApiError(error, 'Login');
  } finally {
    loadingStates.login = false;
  }
};

const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Collections
const getCollections = async () => {
  try {
    const response = await api.get('/collections');
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

const getCollectionById = async (id) => {
  try {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching collection ${id}:`, error);
    throw error;
  }
};

const createCollection = async (data) => {
  try {
    const response = await api.post('/collections', data);
    return response.data;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

const updateCollection = async (id, data) => {
  try {
    const response = await api.put(`/collections/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating collection ${id}:`, error);
    throw error;
  }
};

const deleteCollection = async (id) => {
  try {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting collection ${id}:`, error);
    throw error;
  }
};

// Designs
const getDesigns = async () => {
  try {
    const response = await api.get('/designs');
    return response.data;
  } catch (error) {
    console.error('Error fetching designs:', error);
    throw error;
  }
};

const getDesignById = async (id) => {
  try {
    const response = await api.get(`/designs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching design ${id}:`, error);
    throw error;
  }
};

const createDesign = async (data) => {
  try {
    const response = await api.post('/designs', data);
    return response.data;
  } catch (error) {
    console.error('Error creating design:', error);
    throw error;
  }
};

const updateDesign = async (id, data) => {
  try {
    const response = await api.put(`/designs/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating design ${id}:`, error);
    throw error;
  }
};

const deleteDesign = async (id) => {
  try {
    const response = await api.delete(`/designs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting design ${id}:`, error);
    throw error;
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default {
  // Auth
  login,
  logout,
  getCurrentUser,
  
  // Collections
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  
  // Designs
  getDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign
};