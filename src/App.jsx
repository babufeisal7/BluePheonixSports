import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// Layouts
import MainLayout from './Layouts/MainLayout'; // Optional if needed for specific routes

// Pages (lazy-loaded for optimization)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const RugbyPage = React.lazy(() => import('./pages/RugbyPage'));
const FootballPage = React.lazy(() => import('./pages/FootballPage'));
const BasketballPage = React.lazy(() => import('./pages/BasketballPage'));
const SwimmingPage = React.lazy(() => import('./pages/SwimmingPage'));
const Gallerypage = React.lazy(() => import('./pages/Gallerypage'));
const Eventspage = React.lazy(() => import('./pages/Eventspage'));
const AboutusPage = React.lazy(() => import('./pages/AboutusPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const SportsProgramPage = React.lazy(() => import('./pages/SportsProgramPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const NotFound = React.lazy(() => import('./pages/NotFound')); // Catch-all route

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
import Contactus from './components/contactus';
import Faq from './components/faq';
import Sponsers from './components/sponsers';
import Footer from './components/footer';
import Experts from './components/experts';

// Wrapper for shared global components
const Layout = ({ children }) => (
  <>
    {children}
    <Contactus />
    <Testimonials />
    <Faq />
    <Sponsers />
    <Footer />
  </>
);

// Main Home Layout
const Home = () => (
  <>
    <Hero />
    <Aboutus />
    <Sportsprograms />
    <Services />
    <Ourteams />
    <Events />
    <Achievements />
    <Gallery />
    <Experts />
  </>
);

// Routes Configuration
const AppContent = () => {
  const location = useLocation();

  // Dynamic Navbar logic
  const shouldShowNavbar = !location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally render the Navbar */}
      {shouldShowNavbar && <Navbar />}

      {/* Lazy-loaded routes with a fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutusPage />} />
          <Route path="/events" element={<Eventspage />} />
          <Route path="/gallery" element={<Gallerypage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/teams/rugby" element={<RugbyPage />} />
          <Route path="/teams/football" element={<FootballPage />} />
          <Route path="/teams/basketball" element={<BasketballPage />} />
          <Route path="/teams/swimming" element={<SwimmingPage />} />
          <Route path="/sports-programs" element={<SportsProgramPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </Suspense>
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Layout>
        <AppContent />
      </Layout>
    </Router>
  );
};

export default App;
