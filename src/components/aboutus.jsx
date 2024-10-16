import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const containerClasses = 'py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8';
const cardContainerClasses = 'flex flex-col md:flex-row items-center';
const cardClasses = 'flex flex-col md:flex-row items-start md:items-center bg-white p-6';
const highlightTextClasses = "font-semibold text-primary";
const titleClasses = 'text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 animate-slide-in'; // Adjusted for larger devices
const textClasses = 'text-sm sm:text-base md:text-lg text-muted-foreground mb-4 animate-slide-in'; // Adjusted for larger devices
const buttonClasses = 'bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-700 transition duration-300 animate-slide-in'; // Adjusted padding for smaller screens
const imageContainerClasses = 'w-full md:w-3/5 '; // Image container takes 60% on larger screens
const imageClasses = 'rounded-lg w-full h-auto max-w-lg md:max-w-2xl animate-fade-in'; // Increased max width for larger image
const textContainerClasses = 'w-full md:w-2/5 max-w-full'; // Text container takes 40% on larger screens

const AboutUs = () => {
  return (
    <div id="about-us" className={containerClasses}>
      <div className="relative">
        <div className={cardContainerClasses}>
          <div className={cardClasses}>
            <div className={textContainerClasses}>
              <h2 className={titleClasses}>About Us</h2>

              <section className="mb-8">
                <p className={textClasses}>
                  Welcome to <span className={highlightTextClasses}>Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels.
                </p>
              </section>

              <section>
                <Link to="/AboutusPage" className={buttonClasses}>
                  Read More..
                </Link>
              </section>
            </div>

            <div className={imageContainerClasses}>
              <img src="/photo13.jpg" alt="Blue Phoenix Sports Limited Team" className={imageClasses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation for the component
AboutUs.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default AboutUs;
