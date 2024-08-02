//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import HomePage from "./scenes/HomePage/HomePage";
import OrganizersPage from './scenes/OrganizersPage/OrganizersPage';
import AuthPage from './scenes/AuthPage';
import CheckoutPage from './scenes/CheckoutPage/CheckoutPage';
import Cart from './scenes/cartPage/cart';
import AddEventPage from './scenes/OrganizersPage/AddEvent';
import Admin from './scenes/Admin/Admin';
import  Eventpage from './scenes/Eventpage/event';
import Eventlist from './scenes/Eventlist/eventlist';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:5081/graphql/",
  cache: new InMemoryCache()
});
function App() {
  const [theme, colorMode] = useMode();
  const Location = useLocation();

  const hideTopbar = location.pathname === '/Admin';
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
        <div className="app">
          <main className="content">
            {!hideTopbar && <Topbar/>}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/OrganizersPage" element={<OrganizersPage />} />
              <Route path="/authpage" element={<AuthPage />}/>
              <Route path="/CheckoutPage" element={<CheckoutPage />}/>
              <Route path="/cartpage" element={<Cart/>}/>
              <Route path="/AddEventPage" element={<AddEventPage/>}/>
              <Route path="/Admin" element={<Admin/>}/>
              <Route path="/Eventpage" element= {<Eventpage/>}/>
              <Route path="/Eventlist" element= {<Eventlist/>}/>
              </Routes>
              </main>
        </div>
        </ApolloProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
