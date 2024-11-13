import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component Imports
import Navbar from '../components/Navbar'; // Ensure correct path

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />  {/* Render child routes */}
    <ToastContainer />  {/* Toast notifications */}
  </>
);

export default MainLayout;
