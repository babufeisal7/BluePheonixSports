// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ManagementCard = ({ color, icon, title, description, link }) => (
  <div className="col-lg-3 col-6">
    <div className={`small-box ${color}`}>
      <div className="inner">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <Link to={link} className="small-box-footer">
        Go to {title} <i className="fas fa-arrow-circle-right"></i>
      </Link>
    </div>
  </div>
);

const AdminDashboard = () => {
  const cardsData = [
    {
      color: 'bg-info',
      icon: 'fa-pencil-alt',
      title: 'Blog Management',
      description: 'Manage your blog posts and articles',
      link: '#blogManagement',
    },
    {
      color: 'bg-success',
      icon: 'fa-images',
      title: 'Gallery Management',
      description: 'Upload and manage gallery images',
      link: '#galleryManagement',
    },
    {
      color: 'bg-warning',
      icon: 'fa-comment-dots',
      title: 'Testimonials Management',
      description: 'Manage member testimonials',
      link: '#testimonialsManagement',
    },
    {
      color: 'bg-danger',
      icon: 'fa-hand-holding-usd',
      title: 'Sponsorship Management',
      description: 'Manage sponsorships and partnerships',
      link: '#sponsorshipManagement',
    },
  ];

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
              {cardsData.map((card, index) => (
                <ManagementCard key={index} {...card} />
              ))}
            </div>

            {/* Main Row for management features */}
            <div className="row">
              <div className="col-md-12">
                {cardsData.map((card, index) => (
                  <div key={index} className="card" id={card.link.replace('#', '')}>
                    <div className="card-header">
                      <h3 className="card-title">{card.title}</h3>
                    </div>
                    <div className="card-body">
                      <p>{card.description} here.</p>
                      {/* Implement your {card.title} functionalities here */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
