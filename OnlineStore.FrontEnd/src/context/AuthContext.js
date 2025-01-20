import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const auth = localStorage.getItem('isAuthenticated');
      return auth === 'true';
    } catch (error) {
      console.error('Error reading auth state:', error);
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('isAuthenticated', isAuthenticated);
      localStorage.setItem('user', user ? JSON.stringify(user) : '');
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    toast.success('Successfully logged in!');
    navigate('/home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast.info('Logged out');
    navigate('/auth');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 