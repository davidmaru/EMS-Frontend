// eslint-disable-next-line no-unused-vars
import { elements } from "chart.js";
import MainApp from "../mainApp";
// eslint-disable-next-line no-unused-vars
import { Children } from "react";
import HomePage from "../scenes/HomePage/HomePage";
import OrganizersPage from "../scenes/OrganizersPage/OrganizersPage";
import AuthPage from "../scenes/AuthPage";
import CheckoutPage from "../scenes/CheckoutPage/CheckoutPage";
import Cart from "../scenes/cartPage/cart";
import AddEventPage from "../scenes/OrganizersPage/AddEvent";
import Admin from "../scenes/Admin/Admin";
import Eventpage from "../scenes/Eventpage/event";
import EventList from "../scenes/Eventlist/eventlist";
import OrganizerDashboard from "../scenes/OrganizersPage/OrganizersPage";

const MainRoutes = {
    path: "/",
    element: <MainApp />,
    children: [
        {
            path: "",
            element: <HomePage />
        },
        {
            path: "OrganizersPage",
            element: <OrganizersPage />
        },
        {
            path: "Authpage",
            element: <AuthPage />
        },
        {
            path: "CheckoutPage",
            element: <CheckoutPage />
        },
        {
            path: "CartPage",
            element: <Cart />
        },
        {
            path: "AddEventPage",
            element: <AddEventPage />
        },
        {
            path: "Admin",
            element: <Admin />
        },
        {
            path: "EventPage",
            element: <Eventpage />
        },
        {
            path: "EventList",
            element: <EventList />
        },
        {
            path: "OrganizersPage/:organizerId",
            element: <OrganizerDashboard />,
          }
          
    ]
}

export default MainRoutes;