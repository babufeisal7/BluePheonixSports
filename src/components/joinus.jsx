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
        <div className="bg-blue-700 text-white p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                {/* First Column - Text Section */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-center">
                        Join Us
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 text-center lg:text-center">
                        Become a part of the Blue Phoenix community! Choose your preferred sports and get involved today.
                    </p>
                    <div className="max-w-md mx-auto p-8 bg-card rounded-lg shadow-lg border border-border">
                        <form>
                            <div className="mb-5">
                                <label className="block text-muted-foreground mb-1" htmlFor="name">
                                    Full Name
                                </label>
                                <input className={inputClasses} type="text" id="name" placeholder="John Doe" required />
                            </div>
                            <div className="mb-5">
                                <label className="block text-muted-foreground mb-1" htmlFor="email">
                                    Email address
                                </label>
                                <input className={inputClasses} type="email" id="email" placeholder="you@example.com" required />
                            </div>
                            <div className="mb-5">
                                <label className="block text-muted-foreground mb-1" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input className={inputClasses} type="tel" id="phone" placeholder="+265 7756 7890" required />
                            </div>
                            <div className="mb-5">
                                <label className="block text-muted-foreground mb-1" htmlFor="team-preference">
                                    Team Preference
                                </label>
                                <select
                                    className={inputClasses}
                                    id="team-preference"
                                    style={{ color: 'black' }} // Apply black text color to the select element
                                    required
                                >
                                    <option value="">Select a team</option>
                                    <option value="rugby">Rugby</option>
                                    <option value="football">Football</option>
                                    <option value="basketball">Basketball</option>
                                    <option value="swimming">Swimming</option>
                                </select>
                            </div>
                            <button className={buttonClasses}>Join Us</button>
                        </form>
                        <div className="my-6 text-center text-muted-foreground">Or join us with</div>
                        <div className="flex justify-center space-x-4">
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
                    <div className={videoContainerStyles} style={{ paddingTop: '56.25%' }}> {/* Aspect Ratio 16:9 */}
                        <video
                            className={videoStyles}
                            style={{ width: '100%', height: '100%' }} // Set the resolution by adjusting the container size
                            src="/BLUE PHEONIX.mp4" // Path to your local video
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
                    <label htmlFor="email" className={`${sharedTextClasses} mb-2 lg:mb-0 lg:w-1/2 text-center lg:text-center`}>
                        Want product news and updates.
                        <p className={`${sharedTextClasses} mt-2 text-center lg:text-center`}>
                        Sign up for our newsletter.
                        </p>
                    </label>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:w-1/2 space-y-4 lg:space-y-0 lg:space-x-4">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className={`p-3 ${sharedBorderClasses} rounded-lg w-full lg:w-80 focus:outline-none focus:ring focus:ring-primary`} // Increased width
                        />
                        <button className={`${joinButtonClass} ${sharedButtonClasses} w-full lg:w-auto`}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
