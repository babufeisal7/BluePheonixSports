import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactUs = () => {
    return (
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Compact Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                    <p className="text-blue-100 max-w-md mx-auto">
                        Reach out for inquiries or more information
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info - More Compact */}
                    <div className="space-y-4">
                        <div className="bg-white/10 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <i className="fas fa-info-circle text-yellow-300 mr-2"></i>
                                Contact Info
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <i className="fas fa-envelope text-yellow-300 mt-1 mr-3 w-4"></i>
                                    <div>
                                        <p className="text-sm text-blue-100">info@bluephoenixsports.com</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-phone-alt text-yellow-300 mt-1 mr-3 w-4"></i>
                                    <div>
                                        <p className="text-sm text-blue-100">(+256) 773 - 45678</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-map-marker-alt text-yellow-300 mt-1 mr-3 w-4"></i>
                                    <div>
                                        <p className="text-sm text-blue-100">5523 Buziga Kampala, Uganda</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media - Compact */}
                        <div className="bg-white/10 p-4 rounded-xl">
                            <h3 className="text-sm font-medium mb-3">FOLLOW US</h3>
                            <div className="flex space-x-3">
                                {['facebook', 'twitter', 'instagram'].map((icon) => (
                                    <a
                                        key={icon}
                                        href="#"
                                        className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                                        aria-label={icon}
                                    >
                                        <i className={`fab fa-${icon} text-sm`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Compact Form */}
                    <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    rows="3"
                                    placeholder="Your Message"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;