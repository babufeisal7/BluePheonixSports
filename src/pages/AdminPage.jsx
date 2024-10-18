import React, { useEffect, useState } from 'react';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  // State to track current view
  const [currentView, setCurrentView] = useState('Dashboard');

  useEffect(() => {
    // Initialize AdminLTE (if necessary)
    if (window.$) {
      window.$(document).ready(function () {
        // Any specific initialization code
      });
    }
  }, []);

  // Functions to handle view changes
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
   // Content for Events
  const renderEventsContent = () => (
    <div>
      <h2>Manage Events</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Event</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input type="text" className="form-control" id="eventName" placeholder="Enter event name" />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Event Date</label>
              <input type="date" className="form-control" id="eventDate" />
            </div>
            <div className="form-group">
              <label htmlFor="eventImage">Event Image</label>
              <input type="file" className="form-control" id="eventImage" />
            </div>
            <button type="submit" className="btn btn-primary">Add Event</button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Event List</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>Event 1 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
            <li>Event 2 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Content for Blog
  const renderBlogContent = () => (
    <div>
      <h2>Manage Blog</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Blog Post</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="blogTitle">Blog Title</label>
              <input type="text" className="form-control" id="blogTitle" placeholder="Enter blog title" />
            </div>
            <div className="form-group">
              <label htmlFor="blogContent">Blog Content</label>
              <textarea className="form-control" id="blogContent" rows="4" placeholder="Enter blog content"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="blogImage">Blog Image</label>
              <input type="file" className="form-control" id="blogImage" />
            </div>
            <button type="submit" className="btn btn-primary">Add Blog Post</button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Blog List</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>Blog Post 1 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
            <li>Blog Post 2 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Content for Testimonials
  const renderTestimonialsContent = () => (
    <div>
      <h2>Manage Testimonials</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Testimonial</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="testimonialName">Name</label>
              <input type="text" className="form-control" id="testimonialName" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="testimonialContent">Testimonial</label>
              <textarea className="form-control" id="testimonialContent" rows="4" placeholder="Enter testimonial"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Testimonial</button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Testimonials List</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>Testimonial 1 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
            <li>Testimonial 2 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Content for Teams
  const renderTeamsContent = () => (
    <div>
      <h2>Manage Teams</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Team</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="teamName">Team Name</label>
              <input type="text" className="form-control" id="teamName" placeholder="Enter team name" />
            </div>
            <div className="form-group">
              <label htmlFor="teamDescription">Team Description</label>
              <textarea className="form-control" id="teamDescription" rows="4" placeholder="Enter team description"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Team</button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Team List</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>Team 1 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
            <li>Team 2 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Content for Sponsors
  const renderSponsorsContent = () => (
    <div>
      <h2>Manage Sponsors</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Sponsor</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="sponsorName">Sponsor Name</label>
              <input type="text" className="form-control" id="sponsorName" placeholder="Enter sponsor name" />
            </div>
            <div className="form-group">
              <label htmlFor="sponsorLogo">Sponsor Logo</label>
              <input type="file" className="form-control" id="sponsorLogo" />
            </div>
            <button type="submit" className="btn btn-primary">Add Sponsor</button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Sponsor List</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>Sponsor 1 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
            <li>Sponsor 2 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Content for Members
  const renderMembersContent = () => (
    <div>
      <h2>Manage Members</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Member</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="memberName">Member Name</label>
              <input type="text" className="form-control" id="memberName" placeholder="Enter member name" />
            </div>
            <div className="form-group">
              <label htmlFor="memberEmail">Member Email</label>
              <input type="email" className="form-control" id="memberEmail" placeholder="Enter email address" />
            </div>
            <div className="form-group">
              <label htmlFor="memberRole">Member Role</label>
              <input type="text" className="form-control" id="memberRole" placeholder="Enter role" />
            </div>
            <button type="submit" className="btn btn-primary">Add Member</button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Members List</h3>
        </div>
        <div className="card-body">
          <ul>
            <li>Member 1 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
            <li>Member 2 <button className="btn btn-danger btn-sm ml-2">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Main content switcher based on the current view
const renderContent = () => {
  switch (currentView) {
    case 'Blog':
      return renderBlogContent();
    case 'Testimonials':
      return renderTestimonialsContent();
    case 'Teams':
      return renderTeamsContent();
    case 'Sponsors':
      return renderSponsorsContent();
    case 'Members':
      return renderMembersContent();
    case 'Events': // Add Events case
      return renderEventsContent(); // Render Events content
    default:
      return <div>Welcome to the Admin Dashboard!</div>;
  }
};


  return (
    <div className="wrapper">
      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <span className="brand-text font-weight-light">Admin Dashboard</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleViewChange('Dashboard')}>
                  Dashboard
                </button>
              </li>
          <li className="nav-item">
  <button className="nav-link" onClick={() => handleViewChange('Events')}>
    Events
  </button>
</li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => handleViewChange('Blog')}>
                  Blog
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleViewChange('Testimonials')}>
                  Testimonials
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleViewChange('Teams')}>
                  Teams
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleViewChange('Sponsors')}>
                  Sponsors
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleViewChange('Members')}>
                  Members
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {renderContent()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
