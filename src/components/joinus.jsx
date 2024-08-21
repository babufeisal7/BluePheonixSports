import React from 'react';

// Shared styles
const sharedButtonClasses = 'px-4 py-2 rounded-lg'; // No color applied here
const sharedTextClasses = 'text-muted-foreground';
const sharedBorderClasses = 'border border-border';
const joinButtonClass = 'bg-primary text-primary-foreground'; // Default button color

const JoinUs = () => {
    return (
        <div className="bg-blue-700 text-white p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                {/* First Column - Text Section */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
                        Join Us
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 text-center lg:text-left">
                        Become a part of the Blue Phoenix community! Choose your preferred sports and get involved today.
                    </p>
                    <div className="flex flex-col items-center lg:items-centre space-y-2">
                        <button className={`${sharedButtonClasses} ${joinButtonClass}`}>Rugby</button>
                        <button className={`${sharedButtonClasses} ${joinButtonClass}`}>Football</button>
                        <button className={`${sharedButtonClasses} ${joinButtonClass}`}>Basketball</button>
                        <button className={`${sharedButtonClasses} ${joinButtonClass}`}>Swimming</button>
                    </div>
                </div>

                {/* Second Column - Video Section */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    <iframe
                        className={`w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-lg ${sharedBorderClasses}`}
                        src="https://www.youtube.com/embed/your_video_id"
                        title="Introduction to Blue Phoenix"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Sign-Up Form Row - Positioned Below the Columns */}
            <div className="mt-8 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full space-y-4 lg:space-y-0 lg:space-x-4">
                    <label htmlFor="email" className={`${sharedTextClasses} mb-2 lg:mb-0 lg:w-1/2 text-center lg:text-left`}>
                        Sign up for more information and updates.
                    </label>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:w-1/2 space-y-4 lg:space-y-0 lg:space-x-4">
                        <input
                            type="email"
                            id="email"
                            placeholder="e.g., name@example.com"
                            className={`p-3 ${sharedBorderClasses} rounded-lg w-full lg:w-96 focus:outline-none focus:ring focus:ring-primary`} // Increased width
                        />
                        <button className={`${joinButtonClass} ${sharedButtonClasses} w-full lg:w-auto`}>Join Us</button>
                    </div>
                </div>
                <p className={`${sharedTextClasses} mt-2 text-center lg:text-left`}>
                    We'll keep you informed about upcoming events and activities.
                </p>
            </div>
        </div>
    );
};

export default JoinUs;
