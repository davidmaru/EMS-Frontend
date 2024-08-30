// src/router/mainRoutes.js
import React from "react";
import { Outlet } from "react-router-dom";
import MainApp from "../mainApp";
import HomePage from "../scenes/HomePage/HomePage";
import AuthPage from "../scenes/AuthPage";
import OrganizersPage from "../scenes/OrganizersPage/OrganizersPage";
import CheckoutPage from "../scenes/CheckoutPage/CheckoutPage";
import Cart from "../scenes/cartPage/cart";
import AddEventPage from "../scenes/OrganizersPage/AddEvent";
import Admin from "../scenes/Admin/Admin";
import Eventpage from "../scenes/Eventpage/event";
import EventList from "../scenes/Eventlist/eventlist";
import OrganizerDashboard from "../scenes/OrganizersPage/OrganizersPage";
import EventsPage from "../scenes/OrganizersPage/Events";
import CalendarPage from "../scenes/OrganizersPage/Calendar";
import AttendeesPage from "../scenes/OrganizersPage/Attendees";
import ProtectedRoute from "../scenes/Axios/ProtectedRoute";

const MainRoutes = {
  path: "/",
  element: <MainApp />,
  children: [
    { path: "", element: <HomePage /> },
    { path: "AuthPage", element: <AuthPage /> },
    {
      path: "OrganizersPage",
      element: (
        <ProtectedRoute>
          <OrganizersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "CheckoutPage",
      element: (
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "CartPage",
      element: (
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      ),
    },
    {
      path: "AddEventPage",
      element: (
        <ProtectedRoute>
          <AddEventPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "Admin",
      element: (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      ),
    },
    {
      path: "EventPage",
      element: (
        <ProtectedRoute>
          <Eventpage />
        </ProtectedRoute>
      ),
    },
    {
      path: "EventList",
      element: (
        <ProtectedRoute>
          <EventList />
        </ProtectedRoute>
      ),
    },
    {
      path: "organizer/:organizerId",
      element: (
        <ProtectedRoute>
          <OrganizerDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "organizer/:id/events",
      element: (
        <ProtectedRoute>
          <EventsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "organizer/:id/calendar",
      element: (
        <ProtectedRoute>
          <CalendarPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "organizer/:id/attendees",
      element: (
        <ProtectedRoute>
          <AttendeesPage />
        </ProtectedRoute>
      ),
    },
  ],
};

export default MainRoutes;
