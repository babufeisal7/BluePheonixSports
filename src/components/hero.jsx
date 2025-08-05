import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const mediaItems = [
  { type: 'image', src: '/photo12.jpg',  },
  { type: 'video', src: '/swimmingvid.mp4', },
  { type: 'image', src: '/football1.jpg',  },
  { type: 'video', src: '/video1.mp4',  },
  { type: 'image', src: '/basketball4.jpg',  },
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRefs = mediaItems.map(() => React.createRef());

    // Memoized slide change functions
    const nextSlide = useCallback(() => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, []);

    const prevSlide = useCallback(() => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
    }, []);

    const goToSlide = useCallback((index) => {
        if (index !== currentIndex) {
            setIsAnimating(true);
            setCurrentIndex(index);
        }
    }, [currentIndex]);

    // Handle video playback
    const handleVideoPlayback = useCallback(() => {
        videoRefs.forEach((ref, index) => {
            if (ref.current) {
                if (index === currentIndex && mediaItems[index].type === 'video') {
                    ref.current.currentTime = 0;
                    ref.current.play().catch(e => console.log("Autoplay prevented:", e));
                    setIsVideoPlaying(true);
                } else {
                    ref.current.pause();
                }
            }
        });
    }, [currentIndex, videoRefs]);

    // Auto-rotation with 5 second interval
    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000);
        return () => clearInterval(intervalId);
    }, [nextSlide]);

    // Reset animation state and handle video playback
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 1000);
            handleVideoPlayback();
            return () => clearTimeout(timer);
        }
    }, [isAnimating, handleVideoPlayback]);

    return (
        <section 
            className="relative w-full h-[60vh] sm:h-[80vh] lg:h-screen overflow-hidden"
            aria-label="Hero carousel"
        >
            {/* Background media items */}
            <div className="relative w-full h-full">
                {mediaItems.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        style={{ 
                            transitionProperty: 'opacity',
                            willChange: 'opacity'
                        }}
                        aria-hidden={index !== currentIndex}
                    >
                        {item.type === 'image' ? (
                            <div 
                                className="w-full h-full bg-cover bg-center"
                                style={{ 
                                    backgroundImage: `url(${item.src})`,
                                    opacity: item.opacity
                                }}
                            />
                        ) : (
                            <video
                                ref={videoRefs[index]}
                                className="w-full h-full object-cover"
                                style={{ opacity: item.opacity }}
                                muted
                                loop
                                playsInline
                                aria-hidden="true"
                            >
                                <source src={item.src} type="video/mp4" />
                            </video>
                        )}
                    </div>
                ))}
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="text-center text-white max-w-4xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in-up">
                        Welcome to <span className="text-orange-400">Blue Phoenix</span> Sports
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 animate-fade-in-up delay-100">
                        Elevate your game with our premier sports programs and community spirit!
                    </p>
                    <div className="animate-fade-in-up delay-200">
                        <Link 
                            to="/contactus" 
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Join Our Community
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation arrows (always visible) */}
            <>
                <button
                    onClick={prevSlide}
                    className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </>

            {/* Dots indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {mediaItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 w-6 sm:w-8 rounded-full transition-all duration-300 ${currentIndex === index ? 
                            (item.type === 'video' ? 'bg-blue-400 w-8 sm:w-12' : 'bg-white w-8 sm:w-12') : 
                            'bg-gray-400 hover:bg-gray-200'}`}
                        title={item.type === 'video' ? 'Video content' : ''}
                    />
                ))}
            </div>

            {/* Video play indicator */}
            {mediaItems[currentIndex].type === 'video' && isVideoPlaying && (
                <div className="absolute top-4 right-4 z-20 flex items-center bg-black/50 text-white px-2 py-1 rounded text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Playing
                </div>
            )}
        </section>
    );
};

export default Hero;