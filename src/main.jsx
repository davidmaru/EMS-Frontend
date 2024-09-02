import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./scenes/AuthContext.jsx";
import getTheme from "./scenes/Dashboard/theme"; 
import { useState, useEffect } from "react";

const usePreferredTheme = () => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') || 'light';
    setThemeMode(savedTheme);
  }, []);

  return themeMode;
};
function Root() {
  const themeMode = usePreferredTheme();
  const theme = getTheme(themeMode);
return (
// ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
