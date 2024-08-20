import React, { useState, useEffect } from 'react';

const images = [
    '/photo12.jpg',
    '/image1.jpg',
    '/image2.jpg',
    '/photo9.jpg',
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [isPaused]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
                <div
                    className="flex items-center justify-center h-full w-full absolute bg-black bg-opacity-50"
                    aria-live="polite"
                >
                    <div className="text-center text-white p-4 md:p-8 lg:p-12">
                        <h1
                            className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 animate-fadeIn"
                            style={{ animationDuration: '2s' }}
                        >
                            Welcome to Blue Phoenix Sports Limited
                        </h1>
                        <p
                            className="text-lg md:text-xl lg:text-2xl mb-6 animate-fadeIn delay-200"
                            style={{ animationDuration: '2s' }}
                        >
                            Join us for exciting sports action and community spirit!
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                            Join Us
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 w-8 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-300'} hover:bg-white transition duration-300 ease-in-out`}
                        ></button>
                    ))}
                </div>

                {/* Pause/Play Button */}
                <button
                    className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-gray-800 text-white py-2 px-4 rounded"
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? 'Resume Carousel' : 'Pause Carousel'}
                >
                    {isPaused ? 'Play' : 'Pause'}
                </button>
            </div>
        </div>
    );
};

export default Hero;
