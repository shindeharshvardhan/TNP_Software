// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Helper functions to get, set, and remove cookies
const setCookie = (name, value, days) => {
  const expires = days
    ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
    : '';
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with values from cookies
  const [studentCoordinatorId, setStudentCoordinatorId] = useState(() => {
    return getCookie('studentCoordinatorId') || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return getCookie('isAuthenticated') === 'true';
  });

  // Effect to update cookies whenever authentication state changes
  useEffect(() => {
    setCookie('isAuthenticated', isAuthenticated, 7); // Set to expire in 7 days, modify as needed
    if (isAuthenticated) {
      setCookie('studentCoordinatorId', studentCoordinatorId, 7); // Set ID with same expiration
    } else {
      removeCookie('studentCoordinatorId'); // Clear ID cookie on logout
    }
  }, [isAuthenticated, studentCoordinatorId]);

  return (
    <AuthContext.Provider value={{ studentCoordinatorId, isAuthenticated, setIsAuthenticated, setStudentCoordinatorId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
