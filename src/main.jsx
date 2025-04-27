import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Map from './components/Map.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import MapPage from './pages/mapPage/MapPage.jsx';
import Footer from './Footer.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import CalenderPage from './pages/calendarPage/CalendarPage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventDetails from './pages/eventDetails/EventDetails.jsx';
import PostEvent from './pages/PostEvent/PostEvent.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import AdminHome from './pages/Dashboard/AdminHome.jsx';
import ManageEvents from './pages/Dashboard/ManageEvents.jsx';
import ManageUser from './pages/Dashboard/manageUser.jsx';
import ManageHomePage from './pages/Dashboard/manageHomePage.jsx';
import ErrorPage from './pages/errorPage/ErrorPage.jsx';
import Profile from './pages/Profile/Profile.jsx';
import LegalPage from './pages/legalPage/LegalPage.jsx';
import PrivacyPolicy from './pages/legalPage/PrivacyPolicy.jsx';
import CookiePolicy from './pages/legalPage/CookiePolicy.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AdminRoute from './routes/AdminRoute.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>
      },
      {
        path: "map",
        element: <MapPage />
      },
      {
        path: "calendar",
        element: <CalenderPage />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "event/:id",
        element: <EventDetails />
      },
      {
        path: "post-event",
        element: <PrivateRoute><PostEvent /></PrivateRoute>
      },
      {
        path: "profile",
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: "mentions-legales",
        element: <LegalPage />
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />
      },
      {
        path: "cookie",
        element: <CookiePolicy />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children: [
      {
        path: '/dashboard',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'manageUser',
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path: 'manageEvents',
        element: <AdminRoute><ManageEvents></ManageEvents></AdminRoute>
      },
      {
        path: 'manageHomePage',
        element: <AdminRoute><ManageHomePage></ManageHomePage></AdminRoute>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)