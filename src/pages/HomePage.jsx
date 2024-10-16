// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/admin">Go to Admin Dashboard</Link>
    </div>
  );
};

export default HomePage;
