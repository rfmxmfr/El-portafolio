import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username, password) => {
    // In a real application, you would make an API call here
    // For demo purposes, we'll use hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
