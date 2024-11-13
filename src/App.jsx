import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// Layouts
import MainLayout from './Layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import RugbyPage from './pages/RugbyPage'; 
import FootballPage from './pages/FootballPage'; 
import BasketballPage from './pages/BasketballPage'; 
import SwimmingPage from './pages/SwimmingPage';
import Gallerypage from './pages/Gallerypage'; 
import Eventspage from './pages/Eventspage';
import AboutusPage from './pages/AboutusPage';
import BlogPage from './pages/BlogPage';
import SportsProgramPage from './pages/SportsProgramPage';
import AdminPage from './pages/AdminPage';

// Components
import Navbar from "./components/navbar";
import Hero from './components/hero';
import Aboutus from './components/aboutus';
import Sportsprograms from './components/sportsprograms';
import Services from './components/services';
import Events from './components/events';
import Ourteams from "./components/ourteams";
import Gallery from './components/gallery';
import Achievements from "./components/achievements";
import Testimonials from "./components/Testimonials";
import Joinus from './components/joinus';
import Faq from './components/faq';
import Sponsers from './components/sponsers';
import Footer from './components/footer';
import Experts from './components/experts'; 

// Main Home Layout
const Home = () => (
  <>
    <Hero />
    <Aboutus />
    <Sportsprograms />
    <Services />
    <Ourteams />
    <Events />
    <Gallery />
    <Testimonials />
    <Achievements />
    
  </>
);

// Routes Configuration
const AppContent = () => {
  const location = useLocation();

  // Define routes where Navbar should not be shown
  const noNavbarRoutes = ["/admin"]; 

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutusPage />} />
        <Route path="/events" element={<Eventspage />} />
        <Route path="/gallery" element={<Gallerypage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/join" element={<Joinus />} />
        <Route path="/teams/rugby" element={<RugbyPage />} />
        <Route path="/teams/football" element={<FootballPage />} />
        <Route path="/teams/basketball" element={<BasketballPage />} />
        <Route path="/teams/swimming" element={<SwimmingPage />} />
        <Route path="/sports-programs" element={<SportsProgramPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Admin page */}
      </Routes>

      {/* Footer, JoinUs, Faq, Experts, Sponsers - Rendered below routes */}
      <Joinus />
      <Faq />
      <Sponsers />
      <Footer />
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
