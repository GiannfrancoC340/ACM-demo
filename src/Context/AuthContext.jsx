import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = (username, password) => {
    // In a real app, you would validate credentials with an API
    // This is a simplified example
    if (username && password) {
      const user = { username };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};