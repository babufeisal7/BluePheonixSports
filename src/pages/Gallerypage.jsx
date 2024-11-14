import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const items = [
    // Example items
    { src: '/photo8.jpg', alt: 'Rugby Tournament Highlights 1', type: 'image', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
    { src: '/photo9.jpg', alt: 'Rugby Tournament Highlights 2', type: 'image', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
    { src: '/video1.mp4', alt: 'Rugby Tournament Highlights Video 1', type: 'video', link: '/categories/rugby-tournament' },

    // Football
    { src: '/football1.jpg', alt: 'Football Championship Moments 1', type: 'image', description: 'Football Championship Moments', link: '/categories/football-championship' },
    { src: '/football2.jpg', alt: 'Football Championship Moments 2', type: 'image', description: 'Football Championship Moments', link: '/categories/football-championship' },
    { src: '/footballvid.mp4', alt: 'Football Championship Highlights Video 1', type: 'video', link: '/categories/football-championship' },

    // Basketball
    { src: '/basketball1.jpg', alt: 'Basketball Finals Excitement 1', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
    { src: '/basketball2.jpg', alt: 'Basketball Finals Excitement 2', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
    { src: '/basketballvid.mp4', alt: 'Basketball Finals Highlights Video 1', type: 'video', link: '/categories/basketball-finals' },

    // Swimming
    { src: '/swimming1.jpg', alt: 'Swimming Competition Action 1', type: 'image', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
    { src: '/swimming2.jpg', alt: 'Swimming Competition Action 2', type: 'image', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
    { src: '/swimmingvid.mp4', alt: 'Swimming Competition Highlights Video 1', type: 'video', link: '/categories/swimming-competition' },
];

const GalleryPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [volume, setVolume] = useState(1);  // Volume control (0 to 1)
    const [isCCActive, setIsCCActive] = useState(false); // Closed Captions
    const videoRef = useRef(null);

    const handleClick = (item) => {
        setSelectedItem(item);
        if (item.type === 'video') {
            setIsVideoPlaying(true);
        }
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setIsVideoPlaying(false);
        setIsCCActive(false); // Reset CC state
    };

    const handleVolumeChange = (e) => {
        const video = videoRef.current;
        video.volume = e.target.value;
        setVolume(e.target.value);
    };

    const toggleCC = () => {
        setIsCCActive(!isCCActive);
    };

    return (
        <div className="p-4 bg-gray-100">
            <div className="gallery-header mb-8">
                <h1 className="text-3xl font-bold text-center mb-4">Gallery</h1>
                <h2 className="text-xl text-center">Explore our collection</h2>
            </div>

            {/* Optimized Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                        onClick={() => handleClick(item)}
                    >
                        {item.type === 'video' ? (
                            <video
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-auto object-cover"
                                muted
                                loop
                                playsInline
                                loading="lazy"
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        )}
                        {item.description && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg">{item.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal for Viewing Clicked Item */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full">
                        <button
                            className="absolute top-0 right-0 p-2 text-xl text-white bg-gray-800 rounded-full"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>

                        {selectedItem.type === 'video' ? (
                            <div>
                                <video
                                    ref={videoRef}
                                    src={selectedItem.src}
                                    alt={selectedItem.alt}
                                    className="w-full max-w-4xl h-auto max-h-[80vh] object-cover mx-auto" // Max height set
                                    controls // Default controls enabled
                                    autoPlay={isVideoPlaying}
                                >
                                    {isCCActive && (
                                        <track
                                            kind="subtitles"
                                            src="path/to/your/cc-file.vtt"
                                            srcLang="en"
                                            label="English"
                                        />
                                    )}
                                </video>
                            </div>
                        ) : (
                            <img
                                src={selectedItem.src}
                                alt={selectedItem.alt}
                                className="w-full max-h-[80vh] object-cover mx-auto"

                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

GalleryPage.propTypes = {
    item: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['image', 'video']).isRequired,
        description: PropTypes.string,
        link: PropTypes.string.isRequired,
    }),
};

export default GalleryPage;
