import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const containerClasses = 'py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8';
const cardContainerClasses = 'flex flex-col md:flex-row items-center';
const cardClasses = 'flex flex-col md:flex-row items-start md:items-center bg-white p-6';
const titleClasses = 'text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6';
const textClasses = 'text-base sm:text-lg text-muted-foreground mb-4 fade-in';
const buttonClasses = 'bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300';
const imageContainerClasses = 'w-full sm:w-1/2 mt-4 sm:mt-0';
const imageClasses = 'rounded-lg w-full h-auto slide-in';

const AboutUs = () => {
  return (
    <div id="about-us" className={containerClasses}>
      <div className="relative">
        <div className={cardContainerClasses}>
          <div className={cardClasses}>
            <div className="w-full sm:w-1/2 max-w-full">
              <h2 className={titleClasses}>About Us</h2>

              <section className="mb-8">
                <p className={textClasses}>
                  At Blue Phoenix Sports Limited, our mission is to foster athletic excellence and community engagement through a diverse range of sports programs. Founded in 2022, we are dedicated to nurturing talent, promoting teamwork, and supporting local sports initiatives.
                </p>
                <p className={textClasses}>
                  Our vision is to be a leading sports academy that empowers athletes to reach their full potential while making a positive impact in their communities. We collaborate with schools and organizations to provide top-notch training and development opportunities.
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

AboutUs.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default AboutUs;
