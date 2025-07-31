import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
    { src: '/photo5.jpg', alt: 'Gallery Image 1', size: 'large', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
    { src: '/football2.jpg', alt: 'Gallery Image 2', size: 'medium', description: 'Football Championship Moments', link: '/categories/football-championship' },
    { src: '/video2.mp4', alt: 'Gallery Video 2', size: 'small', description: 'Football Championship Highlights Video', link: '/categories/football-championship', type: 'video' },
    { src: '/swimming9.jpg', alt: 'Gallery Image 4', size: 'large', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
    { src: '/video1.mp4', alt: 'Gallery Video 1', size: 'medium', description: 'Rugby Tournament Highlights Video', link: '/categories/rugby-tournament', type: 'video' },
    { src: '/basketball6.jpg', alt: 'Gallery Image 3', size: 'small', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
];

const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-1',
    small: 'col-span-1 row-span-1',
};

const Gallery = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint is 768px
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Filter gallery items for mobile view: only first image and first video
    let filteredItems = galleryItems;
    if (isMobile) {
        const firstImage = galleryItems.find(item => !item.type); // first image (no type means image)
        const firstVideo = galleryItems.find(item => item.type === 'video');
        filteredItems = [];
        if (firstImage) filteredItems.push(firstImage);
        if (firstVideo) filteredItems.push(firstVideo);
    }

    return (
        <div className="w-full p-4 md:p-6 lg:p-8 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Our Gallery</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
                {filteredItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className={`relative overflow-hidden rounded-lg shadow-lg ${sizeClasses[item.size]} group`}
                    >
                        {item.type === 'video' ? (
                            <video
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                onError={(e) => e.target.src = '/default-image.jpg'}
                            />
                        )}
                        {item.type !== 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                <p
                                    className="text-xl font-bold px-2"
                                    style={{
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                    }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        )}
                    </a>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Link
                    to="/gallery"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
                >
                    View More..
                </Link>
            </div>
        </div>
    );
};

export default Gallery;
