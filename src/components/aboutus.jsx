import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const containerClasses = 'py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8'; // Padding adjustments
const cardContainerClasses = 'flex flex-col md:flex-row items-center'; // Flex container for responsiveness
const cardClasses = 'flex flex-col md:flex-row items-start md:items-center bg-white p-6 '; // Card styling with shadow for better visibility
const titleClasses = 'text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6'; // Responsive heading size
const sectionTitleClasses = 'text-xl sm:text-2xl font-semibold text-primary mb-4'; // Section headings with responsive sizes
const textClasses = 'text-base sm:text-lg text-muted-foreground mb-4'; // Responsive text size
const buttonClasses = 'bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg mt-4'; // Responsive button styling
const imageContainerClasses = 'w-full sm:w-1/2 mt-4 sm:mt-0'; // Responsive image container
const imageClasses = 'rounded-lg w-full h-auto'; // Ensure image is responsive
const dropdownClasses = 'absolute top-full left-0 w-full bg-gray-100 p-4 rounded-lg shadow-lg mt-4'; // Dropdown card styling

const AboutUs = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(prevState => !prevState);
    };

    return (
        <div id="about-us" className={containerClasses}>
            <div className="relative">
                <div className={cardContainerClasses}>
                    <div className={cardClasses}>
                        <div className="w-full sm:w-1/2 max-w-full">
                            <h2 className={titleClasses}>About Us</h2>

                            <section className="mb-8">
                                <h3 className={sectionTitleClasses}>Our Mission & Vision</h3>
                                <p className={textClasses}>
                                    At Blue Phoenix Sports Limited, our mission is to foster athletic excellence and community engagement through a diverse range of sports programs. Founded in 2022, we are dedicated to nurturing talent, promoting teamwork, and supporting local sports initiatives.
                                </p>
                                <p className={textClasses}>
                                    Our vision is to be a leading sports academy that empowers athletes to reach their full potential while making a positive impact in their communities. We collaborate with schools and organizations to provide top-notch training and development opportunities.
                                </p>
                            </section>

                            <section>
                                <Link to="/about" className={buttonClasses}>
                                    Read More >>
                                </Link>
                            </section>
                        </div>

                        <div className={imageContainerClasses}>
                            <img src="/photo13.jpg" alt="Blue Phoenix Sports Limited Team" className={imageClasses} />
                        </div>
                    </div>

                    {isDropdownVisible && (
                        <div className={dropdownClasses}>
                            <h3 className={sectionTitleClasses}>Our Programs</h3>
                            <p className={textClasses}>
                                We offer a variety of sports programs including Rugby, Football, Basketball, and Swimming. Each program is designed to provide comprehensive training, skill development, and competitive opportunities. Our coaches are experienced and dedicated to helping each athlete achieve their best.
                            </p>
                            <h3 className={sectionTitleClasses}>Our Facilities</h3>
                            <p className={textClasses}>
                                Our state-of-the-art facilities include multiple sports fields, a gymnasium, swimming pool, and training rooms equipped with the latest equipment. We ensure that all our facilities meet the highest standards to provide an excellent environment for training and development.
                            </p>
                            <h3 className={sectionTitleClasses}>Community Engagement</h3>
                            <p className={textClasses}>
                                We actively engage with the local community through events, workshops, and outreach programs. Our goal is to make sports accessible to everyone and to promote a healthy and active lifestyle.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
