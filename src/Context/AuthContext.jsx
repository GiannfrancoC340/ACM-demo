import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    // Load registered users
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with empty array if no users exist
      localStorage.setItem('users', JSON.stringify([]));
    }
    
    setLoading(false);
  }, []);
  
  // Login function
  const login = (username, password) => {
    // In a real app, you would validate credentials with an API
    // This is a simplified example
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      const userInfo = { username: user.username };
      localStorage.setItem('user', JSON.stringify(userInfo));
      setCurrentUser(userInfo);
      return true;
    }
    return false;
  };
  
  // Signup function
  const signup = (username, password, email) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username already exists
    if (storedUsers.some(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }
    
    // Add new user
    const newUser = { username, password, email };
    const updatedUsers = [...storedUsers, newUser];
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    // Auto login after signup
    const userInfo = { username };
    localStorage.setItem('user', JSON.stringify(userInfo));
    setCurrentUser(userInfo);
    
    return { success: true };
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    login,
    logout,
    signup
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};