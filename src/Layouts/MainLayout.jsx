import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar'; 

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />  {/* Render child routes */}
    <ToastContainer />  {/* Toast notifications */}
  </>
);

export default MainLayout;
