import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div id="about-us" className="py-6 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center bg-white p-6 sm:p-8 rounded-lg shadow-md">
        
        {/* Text Container */}
        <div className="w-full md:w-2/5 space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4 animate-slide-in text-center md:text-left">
            About Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 animate-slide-in text-center md:text-left">
            Welcome to <span className="font-semibold text-primary">Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link 
              to="/Aboutus" 
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 transition duration-300 animate-slide-in text-sm sm:text-base"
            >
              Read More..
            </Link>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full md:w-3/5 mt-6 md:mt-0 md:ml-8 flex justify-center">
          <img 
            src="/photo13.jpg" 
            alt="Blue Phoenix Sports Limited Team" 
            className="rounded-lg w-full max-w-xs sm:max-w-md md:max-w-2xl animate-fade-in object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
