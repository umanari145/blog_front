// authMiddleware.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const authMiddleware = (
  Component: React.FC, 
  isAuthenticated: boolean
): React.FC => {
  return (props) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
};

export default authMiddleware;
