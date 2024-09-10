import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) =>state.auth );
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
