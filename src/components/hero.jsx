import React, { useState, useEffect } from 'react';

const images = [
    '/photo12.jpg',
    '/football1.jpg',
    '/swimming1.jpg',
    '/basketball4.jpg',
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
                <div
                    className="flex items-center justify-center h-full w-full absolute bg-black bg-opacity-50 z-10"
                    aria-live="polite"
                >
                    <div className="text-center text-white p-4 md:p-8 lg:p-12">
                        <h1
                            className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 animate-fade-in"
                            style={{ animationDuration: '2s' }}
                        >
                            Welcome to Blue Phoenix Sports Limited
                        </h1>
                        <p
                            className="text-lg md:text-xl lg:text-2xl mb-6 animate-fade-in delay-200"
                            style={{ animationDuration: '2s' }}
                        >
                            Join us for exciting sports action and community spirit!
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 animate-slide-down z-20">
                            Join Us
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-300'} hover:bg-white transition duration-300 ease-in-out`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
