/* eslint-disable react/prop-types */
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If there is no token, redirect to the AuthPage
    return <Navigate to="/AuthPage" replace />;
  }

  // If token exists, render the children components
  return children;
};

export default ProtectedRoute;
