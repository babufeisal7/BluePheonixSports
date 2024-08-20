import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#f09a21] text-white py-8">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Column 1: Logo and Social Media Links */}
                <div className="flex flex-col items-start space-y-6 md:space-y-8 lg:w-2/5">
                    <div className="flex items-center space-x-4">
                        <img
                            src="/path/to/your/logo.png" // Replace with the path to your logo image
                            alt="Blue Phoenix Logo"
                            className="h-16 w-auto"
                        />
                        <h1 className="text-2xl font-bold text-white">Blue Phoenix</h1>
                    </div>
                    <div className="flex space-x-4 text-xl md:text-2xl lg:text-3xl">
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

                {/* Column 2: About Us Links */}
                <div className="flex flex-col space-y-4">
                    <h5 className="text-lg font-bold mb-4">ABOUT US</h5>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Homepage</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Academy Program</a></li>
                        <li><a href="#" className="hover:underline">Latest News</a></li>
                    </ul>
                </div>

                {/* Column 3: Teams Info Links */}
                <div className="flex flex-col space-y-4">
                    <h5 className="text-lg font-bold mb-4">TEAMS INFO</h5>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Player & Coach</a></li>
                        <li><a href="#" className="hover:underline">Player Profile</a></li>
                        <li><a href="#" className="hover:underline">Fixtures</a></li>
                        <li><a href="#" className="hover:underline">Tournament</a></li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div className="flex flex-col space-y-4">
                    <h5 className="text-lg font-bold mb-4">CONTACT US</h5>
                    <ul className="space-y-2">
                        <li>
                            <a href="tel:+6212345678" className="flex items-center hover:underline">
                                <FaPhone className="mr-2 text-lg md:text-xl lg:text-2xl" /> (+62) 123 - 45678
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@bluephoenixsports.com" className="flex items-center hover:underline">
                                <FaEnvelope className="mr-2 text-lg md:text-xl lg:text-2xl" /> info@bluephoenixsports.com
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center hover:underline">
                                <FaMapMarkerAlt className="mr-2 text-lg md:text-xl lg:text-2xl" /> 5523 Morgan Ave Los Angeles, California, 90011 US
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center py-4">
                <p className="text-sm mb-2">
                    For more information, please visit our <a href="#" className="underline hover:text-gray-200">Privacy Policy</a> and <a href="#" className="underline hover:text-gray-200">Terms of Service</a>.
                </p>
                <p className="text-sm">&copy; {new Date().getFullYear()} Blue Phoenix Sports Limited. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
