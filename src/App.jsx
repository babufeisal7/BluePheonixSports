import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const Home = () => (
  <>
    <Hero />
    <Aboutus />
    <Sportsprograms />
    <Services />
    <Events />
    <Ourteams />
    <Gallery />
    <Achievements />
    
  
  </>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/join" element={<Joinus />} />
        <Route path="/teams/rugby" element={<RugbyPage />} />
        <Route path="/teams/football" element={<FootballPage />} />
        <Route path="/teams/basketball" element={<BasketballPage />} />
        <Route path="/teams/swimming" element={<SwimmingPage />} />
         <Route path="/pages/Gallerypage" element={< Gallerypage/>} />
      </Routes>
      <Blog />
    <Sponsers />
      <Joinus />
      <Footer />
    </Router>
  );
};

export default App;
