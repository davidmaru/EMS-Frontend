// src/App.jsx
import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainApp from "./mainApp";
import HomePage from "./scenes/HomePage/HomePage";
import AuthPage from "./scenes/AuthPage";
import OrganizersPage from "./scenes/OrganizersPage/OrganizersPage";
import CheckoutPage from "./scenes/CheckoutPage/CheckoutPage";
import Cart from "./scenes/cartPage/cart";
import AddEventPage from "./scenes/OrganizersPage/AddEvent";
import Admin from "./scenes/Admin/Admin";
import Eventpage from "./scenes/Eventpage/event";
import EventList from "./scenes/Eventlist/eventlist";
import OrganizerDashboard from "./scenes/OrganizersPage/OrganizersPage";
import EventsPage from "./scenes/OrganizersPage/Events";
import CalendarPage from "./scenes/OrganizersPage/Calendar";
import AttendeesPage from "./scenes/OrganizersPage/Attendees";
import Dashboard from "./scenes/Dashboard";
import UsersPage from "./scenes/Dashboard/Views/userPage";
import UserDetails from "./scenes/Dashboard/Views/userDetails";
import ListEvent from "./scenes/Dashboard/Views/listEvent";
import EditEvent from "./scenes/Dashboard/Views/editEvent";
import RolesAdmin from "./scenes/Dashboard/Views/rolesAdmin";

const client = new ApolloClient({
  uri: "https://localhost:5001/graphql/",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("authToken")
      ? `Bearer ${localStorage.getItem("authToken")}`
      : "",
  },
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (authToken && tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime < tokenExpiration) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiration");
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />}>
            <Route index element={<HomePage />} />
            <Route
              path="/AuthPage"
              element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="OrganizersPage"
              element={
                isAuthenticated ? (
                  <OrganizersPage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="CheckoutPage"
              element={
                isAuthenticated ? (
                  <CheckoutPage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="CartPage"
              element={
                isAuthenticated ? <Cart /> : <Navigate to="/AuthPage" replace />
              }
            />
            <Route
              path="AddEventPage"
              element={
                isAuthenticated ? (
                  <AddEventPage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="Admin"
              element={
                isAuthenticated ? (
                  <Admin />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="EventPage"
              element={
                isAuthenticated ? (
                  <Eventpage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="EventList"
              element={
                isAuthenticated ? (
                  <EventList />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="organizer/:organizerId"
              element={
                isAuthenticated ? (
                  <OrganizerDashboard />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="organizer/:id/events"
              element={
                isAuthenticated ? (
                  <EventsPage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="organizer/:id/calendar"
              element={
                isAuthenticated ? (
                  <CalendarPage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="organizer/:id/attendees"
              element={
                isAuthenticated ? (
                  <AttendeesPage />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            />
            <Route
              path="dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/AuthPage" replace />
                )
              }
            >
              <Route index element={<p>Hello from dashboard</p>} />
              <Route path="user" element={<UsersPage />} />
              <Route path="user/:id" element={<UserDetails />} />
              <Route path="event" element={<ListEvent />} />
              <Route path="event/:id" element={<EditEvent />} />
              <Route path="roles" element={<RolesAdmin />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
