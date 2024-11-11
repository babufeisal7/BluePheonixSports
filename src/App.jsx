import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from './components/hero';
import Aboutus from './components/aboutus';
import Sportsprograms from './components/sportsprograms';
import Services from './components/services';
import Events from './components/events';
import Ourteams from "./components/ourteams";
import Gallery from './components/gallery';
import Achievements from "./components/achievements";
import Blog from './components/blog';
import Sponsers from './components/sponsers';
import Joinus from './components/joinus';
import Footer from './components/footer';
import RugbyPage from './pages/RugbyPage'; 
import FootballPage from './pages/FootballPage'; 
import BasketballPage from './pages/BasketballPage'; 
import SwimmingPage from './pages/SwimmingPage';
import Gallerypage from './pages/Gallerypage'; 
import Eventspage from './pages/Eventspage';
import AboutusPage from './pages/AboutusPage';
import BlogPage from './pages/BlogPage';
import Experts from './components/experts'; 
import Faq from './components/faq'; 
import SportsProgramPage from './pages/SportsProgramPage';
import Testimonials from "./components/Testimonials";
import AdminPage from './pages/AdminPage';


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

const AppContent = () => {
  const location = useLocation();

  // Define the paths where you don't want the Navbar to show
  const noNavbarRoutes = ["/admin"]; 

  return (
    <>
      {/* Conditionally render the Navbar if the current path is not in the noNavbarRoutes */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallerypage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/join" element={<Joinus />} />
        <Route path="/teams/rugby" element={<RugbyPage />} />
        <Route path="/teams/football" element={<FootballPage />} />
        <Route path="/teams/basketball" element={<BasketballPage />} />
        <Route path="/teams/swimming" element={<SwimmingPage />} />
        <Route path="/gallerypage" element={<Gallerypage />} />
        <Route path="/eventspage" element={<Eventspage />} />
        <Route path="/aboutuspage" element={<AboutusPage />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/experts" element={<Experts />} /> 
        <Route path="/sports-programs" element={<SportsProgramPage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Admin page */}
      </Routes>

      <Experts />
      <Joinus />
      <Blog />
      <Faq />
      <Sponsers />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
