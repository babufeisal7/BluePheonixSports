import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div id="about-us" className="py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="relative flex flex-col md:flex-row items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center bg-white p-6">
          
          {/* Text Container */}
          <div className="w-full md:w-2/5 max-w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 animate-slide-in">About Us</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 animate-slide-in">
              Welcome to <span className="font-semibold text-primary">Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels.
            </p>
            <Link to="/AboutusPage" className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 transition duration-300 animate-slide-in">
              Read More..
            </Link>
          </div>

          {/* Image Container */}
          <div className="w-full md:w-3/5">
            <img src="/photo13.jpg" alt="Blue Phoenix Sports Limited Team" className="rounded-lg w-full h-auto max-w-lg md:max-w-2xl animate-fade-in" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
