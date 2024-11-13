import React, { Suspense, lazy } from "react";

// Lazy load components
const Hero = lazy(() => import("../components/hero"));
const Aboutus = lazy(() => import("../components/aboutus"));
const Sportsprograms = lazy(() => import("../components/sportsprograms"));
const Services = lazy(() => import("../components/services"));
const Ourteams = lazy(() => import("../components/ourteams"));
const Events = lazy(() => import("../components/events"));
const Gallery = lazy(() => import("../components/gallery"));
const Testimonials = lazy(() => import("../components/testimonials"));
const Achievements = lazy(() => import("../components/achievements"));

const HomePage = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Hero />
      <Aboutus />
      <Sportsprograms />
      <Services />
      <Ourteams />
      <Events />
      <Gallery />
      <Testimonials />
      <Achievements />
    </Suspense>
  </div>
);

export default HomePage;
