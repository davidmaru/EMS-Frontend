// src/router/dashboardRoutes.js
import React from "react";
import Dashboard from "../scenes/Dashboard";
import UsersPage from "../scenes/Dashboard/Views/userPage";
import UserDetails from "../scenes/Dashboard/Views/userDetails";
import ListEvent from "../scenes/Dashboard/Views/listEvent";
import EditEvent from "../scenes/Dashboard/Views/editEvent";
import RolesAdmin from "../scenes/Dashboard/Views/rolesAdmin";
import ProtectedRoute from "../scenes/Axios/ProtectedRoute";

const DashboardRoutes = {
  path: "dashboard",
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
  children: [
    { path: "", element: <p>Hello from dashboard</p> },
    { path: "user", element: <UsersPage /> },
    { path: "user/:id", element: <UserDetails /> },
    { path: "event", element: <ListEvent /> },
    { path: "event/:id", element: <EditEvent /> },
    { path: "roles", element: <RolesAdmin /> },
  ],
};

export default DashboardRoutes;
