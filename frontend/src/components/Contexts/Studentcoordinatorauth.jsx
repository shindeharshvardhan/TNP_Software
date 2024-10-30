// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with value from local storage
  const [studentCoordinatorId, setStudentCoordinatorId] = useState(() => {
    const savedId = localStorage.getItem('studentCoordinatorId');
    return savedId ? savedId : null; // Get the ID from local storage if it exists
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true'; // Parse the value to boolean
  });

  // Effect to update local storage whenever authentication state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated); // Persist the authentication status
    if (isAuthenticated) {
      localStorage.setItem('studentCoordinatorId', studentCoordinatorId); // Persist the ID when authenticated
    } else {
      localStorage.removeItem('studentCoordinatorId'); // Clear ID when logged out
    }
  }, [isAuthenticated, studentCoordinatorId]); // Update local storage whenever these states change

  return (
    <AuthContext.Provider value={{ studentCoordinatorId, isAuthenticated, setIsAuthenticated, setStudentCoordinatorId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
