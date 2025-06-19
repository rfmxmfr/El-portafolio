import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useLoading from '../hooks/useLoading';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        startLoading();
        const response = await axios.get('/api/auth/me');
        setIsAdmin(response.data.role === 'admin');
      } catch (err) {
        setError(err.message);
      } finally {
        stopLoading();
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      startLoading();
      const response = await axios.post('/api/auth/login', { email, password });
      setIsAdmin(response.data.role === 'admin');
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      stopLoading();
    }
  };

  const logout = async () => {
    try {
      startLoading();
      await axios.post('/api/auth/logout');
      setIsAdmin(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      stopLoading();
    }
  };

  const refreshAuth = async () => {
    try {
      startLoading();
      await axios.post('/api/auth/refresh');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Token refresh failed');
    } finally {
      stopLoading();
    }
  };

  const value = {
    isAdmin,
    isLoadingAuth,
    error,
    login,
    logout,
    refreshAuth,
    isLoading,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === null) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
