import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // In local mode, allow access to all routes without auth
  return <>{children}</>;
};