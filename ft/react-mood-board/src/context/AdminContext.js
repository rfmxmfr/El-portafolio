import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  login: () => {},
  logout: () => {}
});

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username, password) => {
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

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
