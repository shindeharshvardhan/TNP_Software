// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/Studentcoordinatorauth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/coordinator_login" />;
  }

  // Render the component if authenticated
  return <Component {...rest} />;
};

export default ProtectedRoute;
