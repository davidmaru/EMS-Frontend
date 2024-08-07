import { elements } from "chart.js";
import MainApp from "../mainApp";
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
            path: "EventLiat",
            element: <EventList />
        }
    ]
}

export default MainRoutes;