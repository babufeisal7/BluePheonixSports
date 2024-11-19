import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
    '/photo12.jpg',
    '/football1.jpg',
    '/swimming1.jpg',
    '/basketball4.jpg',
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Automatically change the slide every 5 seconds
    useEffect(() => {
        const changeSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const intervalId = setInterval(changeSlide, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const goToSlide = (index) => setCurrentIndex(index);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div
            className="relative w-full h-[60vh] sm:h-[80vh] lg:h-screen overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
                <div
                    className="flex flex-col items-center justify-center h-full w-full absolute bg-black bg-opacity-50 z-10 p-4 sm:p-6 md:p-8 lg:p-12"
                    aria-live="polite"
                >
                    <div className="text-center text-white">
                        <h1
                            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 animate-fade-in"
                            style={{ animationDuration: '2s' }}
                        >
                            Welcome to Blue Phoenix Sports Limited
                        </h1>
                        <p
                            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 animate-fade-in delay-200"
                            style={{ animationDuration: '2s' }}
                        >
                            Join us for exciting sports action and community spirit!
                        </p>
                        {/* Link to Join Us component */}
                        <Link to="/contactus">
                            <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 sm:px-6 md:px-8 rounded-full shadow-lg border border-white-700 transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-400">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 w-5 rounded-md ${currentIndex === index ? 'bg-white' : 'bg-gray-300'} hover:bg-white transition duration-300 ease-in-out`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
