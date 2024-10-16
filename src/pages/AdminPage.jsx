// src/pages/AdminPage.jsx
import React, { useEffect } from 'react';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AdminPage = () => {
  useEffect(() => {
    // Initialize AdminLTE (if necessary)
    if (window.$) {
      window.$(document).ready(function () {
        // Any specific initialization code goes here
      });
    }
  }, []);

  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
              <i className="fas fa-bars"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/members">Members</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/events">Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/teams">Teams</Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">Blue Phoenix Sports</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/members">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Members</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/events">
                  <i className="nav-icon fas fa-calendar-alt"></i>
                  <p>Events</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/teams">
                  <i className="nav-icon fas fa-futbol"></i>
                  <p>Teams</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Admin Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* Small box (Stat box) */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Members</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>53<sup style={{ fontSize: '20px' }}>%</sup></h3>
                    <p>Membership Growth</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>Events This Month</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Active Teams</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-futbol"></i>
                  </div>
                  <Link to="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                </div>
              </div>
            </div>

            {/* Main Row */}
            <div className="row">
              <div className="col-md-12">
                {/* Your additional content, charts, etc. */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Recent Activities</h3>
                  </div>
                  <div className="card-body">
                    {/* Content goes here */}
                    <p>List of recent activities and updates...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
