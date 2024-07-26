//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import HomePage from "./scenes/HomePage/HomePage";
import OrganizersPage from './scenes/OrganizersPage/OrganizersPage';
import AuthPage from './scenes/AuthPage';
import CheckoutPage from './scenes/CheckoutPage/CheckoutPage';
import Cart from './scenes/cartPage/cart';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/OrganizersPage" element={<OrganizersPage />} />
              <Route path="/authpage" element={<AuthPage />}/>
              <Route path="/CheckoutPage" element={<CheckoutPage />}/>
              <Route path="/cartpage" element={<Cart/>}/>
              
              </Routes>
              </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
