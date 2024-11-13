import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <i className="fas fa-bars" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
