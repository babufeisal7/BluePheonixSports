// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./components/navbar"; // Adjust the import path if necessary

const AdminDashboard = () => {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
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
      <div className="content-wrapper pt-44">
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
              {/* Card for Blog Management */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Blog Management</h3>
                    <p>Manage your blog posts and articles</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-pencil-alt"></i>
                  </div>
                  <Link to="#blogManagement" className="small-box-footer">
                    Go to Blog <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              {/* Card for Gallery Management */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>Gallery Management</h3>
                    <p>Upload and manage gallery images</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-images"></i>
                  </div>
                  <Link to="#galleryManagement" className="small-box-footer">
                    Go to Gallery <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              {/* Card for Testimonials Management */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>Testimonials Management</h3>
                    <p>Manage member testimonials</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-comment-dots"></i>
                  </div>
                  <Link to="#testimonialsManagement" className="small-box-footer">
                    Go to Testimonials <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              {/* Card for Sponsorship Management */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>Sponsorship Management</h3>
                    <p>Manage sponsorships and partnerships</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-hand-holding-usd"></i>
                  </div>
                  <Link to="#sponsorshipManagement" className="small-box-footer">
                    Go to Sponsorships <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Row for management features */}
            <div className="row">
              <div className="col-md-12">
                <div className="card" id="blogManagement">
                  <div className="card-header">
                    <h3 className="card-title">Blog Management</h3>
                  </div>
                  <div className="card-body">
                    <p>Add, edit, or remove blog posts here.</p>
                    {/* Implement your blog management functionalities here */}
                  </div>
                </div>

                <div className="card" id="galleryManagement">
                  <div className="card-header">
                    <h3 className="card-title">Gallery Management</h3>
                  </div>
                  <div className="card-body">
                    <p>Upload and manage gallery images here.</p>
                    {/* Implement your gallery management functionalities here */}
                  </div>
                </div>

                <div className="card" id="testimonialsManagement">
                  <div className="card-header">
                    <h3 className="card-title">Testimonials Management</h3>
                  </div>
                  <div className="card-body">
                    <p>Manage member testimonials here.</p>
                    {/* Implement your testimonials management functionalities here */}
                  </div>
                </div>

                <div className="card" id="sponsorshipManagement">
                  <div className="card-header">
                    <h3 className="card-title">Sponsorship Management</h3>
                  </div>
                  <div className="card-body">
                    <p>Manage sponsorships and partnerships here.</p>
                    {/* Implement your sponsorship management functionalities here */}
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
