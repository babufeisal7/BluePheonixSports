// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="#" className="brand-link">
        <span className="brand-text font-weight-light">Blue Phoenix Sports</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/members" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Members</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/events" className="nav-link">
                <i className="nav-icon fas fa-calendar-alt"></i>
                <p>Events</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/teams" className="nav-link">
                <i className="nav-icon fas fa-futbol"></i>
                <p>Teams</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
