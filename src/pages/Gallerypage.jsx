import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

const GalleryPage = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [volume, setVolume] = useState(1);  // Volume control (0 to 1)
    const [isCCActive, setIsCCActive] = useState(false); // Closed Captions
    const videoRef = useRef(null);

    // Fetch items from the API
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/db.json');
            const data = await response.json();
            setItems(data.items); // Store items in state
        };

        fetchItems();
    }, []);

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

    // Masonry grid breakpoint layout
    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <div className="p-4 bg-gray-100">
            <div className="gallery-header mb-8">
                <h1 className="text-3xl font-bold text-center mb-4">Gallery</h1>
                <h2 className="text-xl text-center">Explore our collection</h2>
            </div>

            {/* Masonry Grid Layout with Increased Space */}
            <Masonry
                className="flex gap-6"  // Increased gap for more space between items
                breakpointCols={breakpoints}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 mb-6" // Added bottom margin for vertical space
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
            </Masonry>

            {/* Modal for Viewing Clicked Item */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 opacity-100">
                    <div className="relative bg-white p-6 rounded-lg max-w-4xl w-full shadow-xl">
                        {/* Close Button Above the Content */}
                        <button
                            className="absolute top-4 right-4 p-3 text-2xl text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none transition duration-200"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>

                        {/* Content */}
                        <div className="text-center">
                            {selectedItem.type === 'video' ? (
                                <div className="relative mb-4">
                                    <video
                                        ref={videoRef}
                                        src={selectedItem.src}
                                        alt={selectedItem.alt}
                                        className="w-full h-auto object-contain max-h-[80vh] mx-auto" // Adjusted for object-contain
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
                                    className="w-full max-h-[80vh] object-contain mx-auto"
                                />
                            )}

                            {/* Description */}
                            {selectedItem.description && (
                                <p className="text-lg text-gray-700 mt-4">{selectedItem.description}</p>
                            )}
                            
                        </div>
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
