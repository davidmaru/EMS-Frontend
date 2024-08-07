import { createBrowserRouter } from "react-router-dom";
import MainRoutes from "./mainRoutes";
import DashboardRoutes from "./dashboardRoutes";

const router = createBrowserRouter([MainRoutes, DashboardRoutes])

export default router