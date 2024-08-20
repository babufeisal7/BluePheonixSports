import React from 'react';

const buttonClass = 'bg-accent text-accent-foreground py-2 px-4 rounded-lg transition-transform transform hover:scale-105 opacity-90';
const inputClass = 'border border-border rounded-l-lg p-3 w-full md:w-64 focus:outline-none focus:ring focus:ring-primary';
const joinButtonClass = 'bg-primary text-primary-foreground rounded-r-lg py-2 px-4 transition-transform transform hover:scale-105';

const JoinUs = () => {
    return (
        <div className="bg-blue-700 text-white p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Text Column */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Join Us</h1>
                    <p className="text-base sm:text-lg lg:text-xl mb-6">
                        Become a part of the Blue Phoenix community! Choose your preferred sports and get involved today.
                    </p>
                    <div className="flex flex-col items-center lg:items-start space-y-2">
                        <button className={buttonClass}>Rugby</button>
                        <button className={buttonClass}>Football</button>
                        <button className={buttonClass}>Basketball</button>
                        <button className={buttonClass}>Swimming</button>
                    </div>
                </div>

                {/* Video Column */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mt-6 lg:mt-0">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                        <video
                            className="rounded-lg shadow-lg w-full h-auto object-cover"
                            controls
                            src="/videos/intro-video.mp4"
                            title="Introduction to Blue Phoenix"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Subscription Text */}
                <div className="text-center lg:text-left w-full lg:w-1/2">
                    <p className="text-base sm:text-lg mb-2">Sign up for more information and updates.</p>
                    <p className="text-base sm:text-lg">We'll keep you informed about upcoming events and activities.</p>
                </div>

                {/* Subscription Form */}
                <div className="flex w-full lg:w-1/2 items-center space-x-4 mt-4 lg:mt-0">
                    <input type="email" placeholder="e.g., name@example.com" className={inputClass} />
                    <button className={joinButtonClass}>Join Us</button>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
