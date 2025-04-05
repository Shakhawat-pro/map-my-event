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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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
        path: "calender",
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
        element: <PostEvent />
      }

    ]
  },
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
