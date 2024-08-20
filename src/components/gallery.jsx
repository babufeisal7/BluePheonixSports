import React from 'react';

// Define gallery items with varying sizes, descriptions, and links
const galleryItems = [
    { src: '/photo8.jpg', alt: 'Gallery Image 1', size: 'large', description: 'Kisubi 7s', link: '/categories/kisubi-7s' },
    { src: '/photo9.jpg', alt: 'Gallery Image 2', size: 'medium', description: 'Mbale 7s', link: '/categories/mbale-7s' },
    { src: '/photo10.jpg', alt: 'Gallery Image 3', size: 'small', description: 'Gulu 7s', link: '/categories/gulu-7s' },
    { src: '/photo11.jpg', alt: 'Gallery Image 4', size: 'large', description: 'Ebbs 7s', link: '/categories/ebbs-7s' },
    { src: '/video1.mp4', alt: 'Gallery Video 1', size: 'medium', description: '', link: '/categories/kisubi-7s', type: 'video' },
    { src: '/video2.mp4', alt: 'Gallery Video 2', size: 'small', description: '', link: '/categories/mbale-7s', type: 'video' },
];

// Tailwind CSS classes for image and video sizes
const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-1',
    small: 'col-span-1 row-span-1',
};

const Gallery = () => (
    <div className="w-full p-4 md:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
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
                    {/* Only display text overlay for images, not videos */}
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
        {/* View More button */}
        <div className="flex justify-center mt-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                View More
            </button>
        </div>
    </div>
);

export default Gallery;
