import React, { createContext, useContext, useState, useEffect } from 'react';
import { studentAPI } from '../services/studentAPI';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    if (token) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [token]);

  const checkAuthStatus = async () => {
    try {
      const response = await studentAPI.getProfile();
      setStudent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      const response = await studentAPI.login(credentials);
      const { token: newToken, data: studentData } = response;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('student', JSON.stringify(studentData));
      
      setToken(newToken);
      setStudent(studentData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (studentData) => {
    try {
      const response = await studentAPI.register(studentData);
      const { token: newToken, data: newStudent } = response;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('student', JSON.stringify(newStudent));
      
      setToken(newToken);
      setStudent(newStudent);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    setToken(null);
    setStudent(null);
  };

  const value = {
    student,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 