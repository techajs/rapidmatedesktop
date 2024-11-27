import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UseFetch } from './UseFetch';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) =>state.auth );
  const { user } = UseFetch();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  if(role == 'DELIVERY_BOY' || role== 'ENTERPRISE'){
    if(user?.userDetails?.is_active==0){
      return <Navigate to="/request-pending" />;
    }
  }
  return children;
};

export default ProtectedRoute;
