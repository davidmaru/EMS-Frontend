/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';

const RoleBasedRoute = ({ element, isAuthenticated, requiredRoles }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole'); // Or fetch this from context or state
  
  if (!isAuthenticated) {
    return <Navigate to="/AuthPage" state={{ from: location }} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return element;
};

export default RoleBasedRoute;
