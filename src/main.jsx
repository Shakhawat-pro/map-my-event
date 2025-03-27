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

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>

)
