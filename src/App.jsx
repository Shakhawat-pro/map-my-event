import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import "./App.css"
import "./global.css"


const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default App; 