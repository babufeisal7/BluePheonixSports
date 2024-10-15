import React from 'react';

// Shared styles
const sharedButtonClasses = 'px-4 py-2 rounded-lg border border-white'; // Base button style
const sharedTextClasses = 'text-muted-foreground';
const sharedBorderClasses = 'border border-border';
const joinButtonClass = 'bg-primary text-primary-foreground border border-white'; // Base button style with white border
const inputClasses = 'w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary';
const buttonClasses = 'w-full p-3 rounded-lg border border-white bg-primary text-primary-foreground shadow hover:bg-primary-dark transition duration-200'; // Updated hover effect
const socialButtonClasses = 'flex items-center bg-white border border-border rounded-lg p-2 shadow hover:bg-zinc-200 transition duration-200'; // Updated hover effect

// Aspect ratio styles
const videoContainerStyles = 'relative w-full h-0';  // Container for maintaining aspect ratio
const videoStyles = 'absolute top-0 left-0 object-cover'; // Styles for the video

const JoinUs = () => {
    return (
        <div className="bg-blue-700 text-white p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg"> {/* Reduced padding for mobile */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                {/* First Column - Text Section */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
                        Join Us
                    </h1>
                    <p className="text-base md:text-lg mb-6 text-center lg:text-left">
                        Become a part of the Blue Phoenix community! Choose your preferred sports and get involved today.
                    </p>
                    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border border-border"> {/* Reduced padding */}
                        <form>
                            {/** Input fields for the form */}
                            <div className="mb-4"> {/* Increased margin for spacing */}
                                <label className="block text-muted-foreground mb-1 text-xs" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    className={`${inputClasses} text-xs`}
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-muted-foreground mb-1 text-xs" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    className={`${inputClasses} text-xs`}
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-muted-foreground mb-1 text-xs" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    className={`${inputClasses} text-xs`}
                                    type="tel"
                                    id="phone"
                                    placeholder="+265 7756 7890"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-muted-foreground mb-1 text-xs" htmlFor="team-preference">
                                    Team Preference
                                </label>
                                <select
                                    className={`${inputClasses} text-xs`}
                                    id="team-preference"
                                    style={{ color: 'black' }}
                                    required
                                >
                                    <option value="">Select a team</option>
                                    <option value="rugby">Rugby</option>
                                    <option value="football">Football</option>
                                    <option value="basketball">Basketball</option>
                                    <option value="swimming">Swimming</option>
                                </select>
                            </div>
                            <button className={`${buttonClasses} text-xs`}>Join Us</button>
                        </form>

                        <div className="my-4 text-center text-muted-foreground">Or join us with</div>
                        <div className="flex flex-col sm:flex-row justify-center space-x-0 space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className={socialButtonClasses}>
                                <img src="https://openui.fly.dev/openui/google.svg?text=Google" alt="Google" className="w-5 h-5 mr-2" />
                                Google
                            </button>
                            <button className={socialButtonClasses}>
                                <img src="https://openui.fly.dev/openui/github.svg?text=GitHub" alt="GitHub" className="w-5 h-5 mr-2" />
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>

                {/* Second Column - Video Section */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    <div className={videoContainerStyles} style={{ paddingTop: '56.25%' }}>
                        <video
                            className={videoStyles}
                            style={{ width: '100%', height: '100%' }}
                            src="/BLUE PHEONIX.mp4"
                            title="Introduction to Blue Phoenix"
                            controls
                            autoPlay
                            muted
                            loop
                        ></video>
                    </div>
                </div>
            </div>

            {/* Sign-Up Form Row - Positioned Below the Columns */}
            <div className="mt-8 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full space-y-4 lg:space-y-0 lg:space-x-4">
                    <label htmlFor="newsletter-email" className={`${sharedTextClasses} mb-2 lg:mb-0 lg:w-1/2 text-center lg:text-left`}>
                        Want product news and updates.
                        <p className={`${sharedTextClasses} mt-2 text-center lg:text-left`}>
                        Sign up for our newsletter.
                        </p>
                    </label>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:w-1/2 space-y-4 lg:space-y-0 lg:space-x-4">
                        <input
                            type="email"
                            id="newsletter-email"
                            placeholder="Enter your email"
                            className={`p-3 ${sharedBorderClasses} rounded-lg w-full lg:w-80 focus:outline-none focus:ring focus:ring-primary`}
                        />
                        <button className={`${joinButtonClass} ${sharedButtonClasses} w-full lg:w-auto`}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
