import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import "./App.css"
import "./global.css"
import EventCard from './components/EventCard';
import './i18n'; // Import the i18n configuration
import { LanguageProvider } from './context/LanguageProvider';


const App = () => {
  const location = useLocation()
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <LanguageProvider>
      <div>
        {!hideNavbar && <Navbar />}
        <Outlet></Outlet>
      </div>
    </LanguageProvider>

  );
};

export default App; 