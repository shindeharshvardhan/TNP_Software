import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const AuthContext = createContext();

// Provider component
export const StudentAuthProvider = ({ children }) => {
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);
  const [studentPrn, setStudentPrn] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status from localStorage or cookies on app load
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isStudentAuthenticated');
    const storedPrn = localStorage.getItem('studentPrn');
    const cookieAuthStatus = getCookie('isStudentAuthenticated');
    const cookiePrn = getCookie('studentPrn');

    console.log('Checking authentication status...');
    console.log('Stored Auth Status (localStorage):', storedAuthStatus);
    console.log('Stored PRN (localStorage):', storedPrn);
    console.log('Cookie Auth Status:', cookieAuthStatus);
    console.log('Cookie PRN:', cookiePrn);

    // Check if cookies or localStorage have valid data
    if ((storedAuthStatus === 'true' && storedPrn) || (cookieAuthStatus === 'true' && cookiePrn)) {
      console.log('Valid authentication data found in localStorage or cookies.');
      const prnToVerify = storedPrn || cookiePrn; // Prefer localStorage if both are available
      verifyAuthWithServer(prnToVerify);
    } else {
      console.log('No valid authentication data found.');
      setLoading(false); // If no valid info is found, just set loading to false
    }
  }, []);

  // Helper function to get cookies by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Verify authentication with the server
  const verifyAuthWithServer = async (prn) => {
    try {
      console.log('Verifying authentication with server...');
      const response = await fetch('http://localhost:5000/api/students/auth-status', {
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Server response:', data);

        // Check if the server confirms authentication and matches studentPrn
        if (data.isAuthenticated && data.studentPrn === prn) {
          console.log('Server confirmed authentication.');
          setIsStudentAuthenticated(true);
          setStudentPrn(prn);
        } else {
          console.log('Server did not confirm authentication or PRN mismatch.');
          setIsStudentAuthenticated(false);
          setStudentPrn(null);
        }
      } else {
        console.log('Error in server response:', response.status);
        setIsStudentAuthenticated(false);
        setStudentPrn(null);
      }
    } catch (error) {
      console.error('Error verifying authentication with the server:', error);
      setIsStudentAuthenticated(false);
      setStudentPrn(null);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const login = (prn) => {
    console.log('User logging in with PRN:', prn);
    setIsStudentAuthenticated(true);
    setStudentPrn(prn);

    // Persist authentication and PRN in localStorage
    localStorage.setItem('isStudentAuthenticated', 'true');
    localStorage.setItem('studentPrn', prn);

    // Set cookies with an expiration date (1 day)
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // 1 day expiry
    document.cookie = `isStudentAuthenticated=true; path=/; SameSite=Lax; expires=${expires.toUTCString()}`;
    document.cookie = `studentPrn=${prn}; path=/; SameSite=Lax; expires=${expires.toUTCString()}`;

    console.log('Login successful. Authentication data stored in localStorage and cookies.');
  };

  return (
    <AuthContext.Provider
      value={{
        isStudentAuthenticated,
        studentPrn,
        login,
        loading, // Provide loading state to consumers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

StudentAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
