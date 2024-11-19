import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const ContactUs = () => {
    return (
        <div className="bg-blue-700 text-white p-6 lg:p-12 shadow-lg">
            {/* Centered Header */}
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Contact Card Section */}
                <div>
                    <div className="bg-blue-700 text-white p-6 rounded-lg h-full">
                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <ul className="space-y-4 text-base">
                            <li className="flex items-center space-x-4">
                                <i className="fas fa-envelope text-lg" aria-hidden="true"></i>
                                <span><strong>Email:</strong> info@bluephoenixsports.com</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <i className="fas fa-phone-alt text-lg" aria-hidden="true"></i>
                                <span><strong>Phone:</strong> (+256) 773 - 45678</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <i className="fas fa-map-marker-alt text-lg" aria-hidden="true"></i>
                                <span><strong>Location:</strong> 5523 Buziga Kampala, Uganda, 9001 UG</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <i className="fas fa-futbol text-lg" aria-hidden="true"></i>
                                <span><strong>Training Grounds:</strong> Phoenix Training Grounds, Sports Avenue, Blantyre</span>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-base">
                            Follow us on social media to stay updated on events, programs, and announcements!
                        </p>
                        <div className="flex justify-center mt-4 space-x-6">
                            <a
                                href="#"
                                className="text-white hover:text-yellow-300 transition"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook text-xl mr-2" aria-hidden="true"></i> Facebook
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-yellow-300 transition"
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter text-xl mr-2" aria-hidden="true"></i> Twitter
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-yellow-300 transition"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram text-xl mr-2" aria-hidden="true"></i> Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-base font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-300"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-base font-semibold mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-300"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-base font-semibold mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-300"
                                placeholder="Write your message"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                        >
                            Submit Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
