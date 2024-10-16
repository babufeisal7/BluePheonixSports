// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
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
              <li className="nav-item">
                <Link className="nav-link" to="/admin/settings">
                  <i className="nav-icon fas fa-cog"></i>
                  <p>Settings</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper pt-44"> {/* Add pt-4 class here */}
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

export default AdminDashboard;
