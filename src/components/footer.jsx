import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            {/* Break line above the footer */}
            <div className="h-0.4" /> {/* Adjust the height as needed */}

            <footer className="bg-[#1d4ed8] text-white py-8">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: Logo and Social Media Links (no right border on desktop) */}
                    <div className="flex flex-col items-start space-y-4 border-b sm:border-b-0 pb-4 sm:pb-0 pr-0 md:pr-6 lg:w-2/5">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/logo.jpg" // Ensure the path is correct for deployment
                                className="h-14 w-auto"
                                alt="Blue Phoenix Sports logo"
                            />
                            <h1 className="text-xl font-bold">Blue Phoenix</h1>
                        </div>
                        <div className="flex space-x-4 text-lg sm:text-xl md:text-2xl">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-200">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-200">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-200">
                                <FaTwitter />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-gray-200">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: About Us Links (with right border on desktop) */}
                    <div className="space-y-4 border-b sm:border-b-0 md:border-r border-white pb-4 sm:pb-0 md:pl-6">
                        <h5 className="text-lg font-bold">ABOUT US</h5>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li><a href="#" className="hover:underline">Homepage</a></li>
                            <li><a href="AboutusPage" className="hover:underline">About Us</a></li>
                            <li><a href="SportsProgramPage" className="hover:underline">Our Program</a></li>
                            <li><a href="BlogPage" className="hover:underline">Latest News</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Teams Info Links (with right border on desktop) */}
                    <div className="space-y-4 border-b sm:border-b-0 md:border-r border-white pb-4 sm:pb-0 md:pl-6">
                        <h5 className="text-lg font-bold">TEAMS INFO</h5>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li><a href="#" className="hover:underline">Player & Coach</a></li>
                            <li><a href="#" className="hover:underline">Player Profile</a></li>
                            <li><a href="#" className="hover:underline">Fixtures</a></li>
                            <li><a href="#" className="hover:underline">Tournament</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info (no right border, spacing on left for consistency) */}
                    <div className="space-y-4 pb-4 sm:pb-0 md:pl-6">
                        <h5 className="text-lg font-bold">CONTACT US</h5>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li>
                                <a href="tel:+6212345678" className="flex items-center hover:underline">
                                    <FaPhone className="mr-2" /> (+256) 773 - 45678
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@bluephoenixsports.com" className="flex items-center hover:underline">
                                    <FaEnvelope className="mr-2" /> info@bluephoenixsports.com
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center hover:underline">
                                    <FaMapMarkerAlt className="mr-2" /> 5523 Buziga Kampala, Uganda, 9001 UG
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center py-4 mt-4 border-t border-gray-500">
                    <p className="text-xs md:text-sm mb-2">
                        For more information, please visit our <a href="#" className="underline hover:text-gray-200">Privacy Policy</a> and <a href="#" className="underline hover:text-gray-200">Terms of Service</a>.
                    </p>
                    <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} Blue Phoenix Sports Limited. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
