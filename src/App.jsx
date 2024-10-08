// src/App.jsx
import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MainApp from './mainApp';
import HomePage from './scenes/HomePage/HomePage';
import AuthPage from './scenes/AuthPage';
import OrganizersPage from './scenes/OrganizersPage/OrganizersPage';
import CheckoutPage from './scenes/CheckoutPage/CheckoutPage';
import Cart from './scenes/cartPage/cart';
import AddEventPage from './scenes/OrganizersPage/AddEvent';
import Admin from './scenes/Admin/Admin';
import Eventpage from './scenes/Eventpage/event';
import EventList from './scenes/Eventlist/eventlist';
import OrganizerDashboard from './scenes/OrganizersPage/OrganizersPage';
import EventsPage from './scenes/OrganizersPage/Events';
import CalendarPage from './scenes/OrganizersPage/Calendar';
import AttendeesPage from './scenes/OrganizersPage/Attendees';
import Dashboard from './scenes/Dashboard';
import UsersPage from './scenes/Dashboard/Views/userPage';
import UserDetails from './scenes/Dashboard/Views/userDetails';
import ListEvent from './scenes/Dashboard/Views/listEvent';
import EditEvent from './scenes/Dashboard/Views/editEvent';
import RolesAdmin from './scenes/Dashboard/Views/rolesAdmin';
import RoleBasedRoute from './scenes/RoleBasedRoute';
import Unauthorized from './scenes/UnAauthorized';
import { setContext } from '@apollo/client/link/context';


// const client = new ApolloClient({
//   uri: 'http://localhost:5081/graphql/',
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: localStorage.getItem('authToken')
//       ? `Bearer ${localStorage.getItem('authToken')}`
//       : '',
//   },
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:5081/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken');
  console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
  }
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (authToken && tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime < tokenExpiration) {
        setIsAuthenticated(true);
      } else {
        logout();
    }
    }
  }, []);

  return (
    <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<MainApp />}>
            <Route index element={<HomePage />} />
            <Route
              path="/AuthPage"
              element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/OrganizersPage"
              element={<RoleBasedRoute element={<OrganizersPage />} isAuthenticated={isAuthenticated} requiredRoles={['Organizer', 'Admin']} />}
            />
            <Route
              path="/CheckoutPage"
              element={<RoleBasedRoute element={<CheckoutPage />} isAuthenticated={isAuthenticated} requiredRoles={['Organizer', 'Admin', 'Basic']} />}
            />
            <Route
              path="/CartPage"
              element={<RoleBasedRoute element={<Cart />} isAuthenticated={isAuthenticated} requiredRoles={['Organizer', 'Admin', 'Basic']} />}
            />
            <Route
              path="/AddEventPage"
              element={<RoleBasedRoute element={<AddEventPage />} isAuthenticated={isAuthenticated} requiredRoles={['Organizer', 'Admin']} />}
            />
            <Route
              path="/Admin"
              element={<RoleBasedRoute element={<Admin />} isAuthenticated={isAuthenticated} requiredRoles={['Admin']} />}
            />
            <Route
              path="/EventPage"
              element={<RoleBasedRoute element={<Eventpage />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/EventList"
              element={<RoleBasedRoute element={<EventList />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/organizer/:organizerId"
              element={<RoleBasedRoute element={<OrganizerDashboard />} isAuthenticated={isAuthenticated} requiredRoles={['Organizer', 'Admin']}/>}
            />
            <Route
              path="/organizer/:id/events"
              element={<RoleBasedRoute element={<EventsPage />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/organizer/:id/calendar"
              element={<RoleBasedRoute element={<CalendarPage />} isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/organizer/:id/attendees"
              element={<RoleBasedRoute element={<AttendeesPage />} isAuthenticated={isAuthenticated} />}
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
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
    </ApolloProvider>
  );
}
