import React from "react";
import { useAuth } from "@hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace/>;
  }
    return children;
  };