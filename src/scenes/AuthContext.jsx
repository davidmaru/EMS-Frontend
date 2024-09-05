/* eslint-disable react/prop-types */
import{ createContext, useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Add role state
  const navigate = useNavigate();


  useEffect(() => {
    // Check if a token exists in localStorage and update the auth state
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const login = (userRole, token) => {
    // Logic to log in (e.g., setting tokens)
    // You might store a token in local storage or make an API call here
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', userRole);
    setRole(userRole);
    console.log('Logged in:', { isAuthenticated: true, role: userRole });
  };

  const logout = () => {
    // Logic to log out (e.g., clearing tokens)
    // Clear token from local storage or call logout API
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Example of clearing a token
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('tokenExpiration');
    setRole(null);
    console.log('Logged out:', { isAuthenticated: false, role: null });

    Swal.fire({
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      icon: 'success',
      customClass: {
        container: 'swal-container',
        header: 'swal-header',
        title: 'swal-title',
        content: 'swal-content',
        footer: 'swal-footer',
        confirmButton: 'swal-confirm-button',
      },
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/'); // Redirect to home or login page
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
