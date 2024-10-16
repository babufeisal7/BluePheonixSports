import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Define categories of images and videos
const categories = {
    Rugby: [
        { src: '/photo8.jpg', alt: 'Rugby Tournament Highlights 1', type: 'image', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
        { src: '/photo9.jpg', alt: 'Rugby Tournament Highlights 2', type: 'image', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
        { src: '/photo10.jpg', alt: 'Rugby Tournament Highlights 3', type: 'image', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
        { src: '/photo11.jpg', alt: 'Rugby Tournament Highlights 4', type: 'image', description: 'Rugby Tournament Highlights', link: '/categories/rugby-tournament' },
        { src: '/video1.mp4', alt: 'Rugby Tournament Highlights Video 1', type: 'video', link: '/categories/rugby-tournament' },
        { src: '/video2.mp4', alt: 'Rugby Tournament Highlights Video 2', type: 'video', link: '/categories/rugby-tournament' },
        { src: '/video2.mp4', alt: 'Swimming Competition Highlights Video 2', type: 'video', link: '/categories/swimming-competition' },
    ],
    Football: [
        { src: '/football1.jpg', alt: 'Football Championship Moments 1', type: 'image', description: 'Football Championship Moments', link: '/categories/football-championship' },
        { src: '/football2.jpg', alt: 'Football Championship Moments 2', type: 'image', description: 'Football Championship Moments', link: '/categories/football-championship' },
        { src: '/football3.jpg', alt: 'Football Championship Moments 3', type: 'image', description: 'Football Championship Moments', link: '/categories/football-championship' },
        { src: '/football4.jpg', alt: 'Football Championship Moments 4', type: 'image', description: 'Football Championship Moments', link: '/categories/football-championship' },
        { src: '/footballvid.mp4', alt: 'Football Championship Highlights Video 1', type: 'video', link: '/categories/football-championship' },
        { src: '/footballvid2.mp4', alt: 'Football Championship Highlights Video 2', type: 'video', link: '/categories/football-championship' },
        { src: '/video2.mp4', alt: 'Swimming Competition Highlights Video 2', type: 'video', link: '/categories/swimming-competition' },
    ],
    Basketball: [
        { src: '/basketball1.jpg', alt: 'Basketball Finals Excitement 1', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
        { src: '/basketball3.jpg', alt: 'Basketball Finals Excitement 2', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
        { src: '/basketball2.jpg', alt: 'Basketball Finals Excitement 3', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
        { src: '/basketball4.jpg', alt: 'Basketball Finals Excitement 4', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
        { src: '/video2.mp4', alt: 'Basketball Finals Highlights Video 2', type: 'video', link: '/categories/basketball-finals' },
        { src: '/basketball6.jpg', alt: 'Basketball Finals Excitement 4', type: 'image', description: 'Basketball Finals Excitement', link: '/categories/basketball-finals' },
        { src: '/video2.mp4', alt: 'Swimming Competition Highlights Video 2', type: 'video', link: '/categories/swimming-competition' },
    ],
    Swimming: [
        { src: '/swimming1.jpg', alt: 'Swimming Competition Action 1', type: 'image', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
        { src: '/swimming3.jpg', alt: 'Swimming Competition Action 2', type: 'image', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
        { src: '/swimming2.jpg', alt: 'Swimming Competition Action 3', type: 'image', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
        { src: '/swimming4.jpg', alt: 'Swimming Competition Action 4', type: 'image', description: 'Swimming Competition Action', link: '/categories/swimming-competition' },
        { src: '/video1.mp4', alt: 'Swimming Competition Highlights Video 1', type: 'video', link: '/categories/swimming-competition' },
        { src: '/video2.mp4', alt: 'Swimming Competition Highlights Video 2', type: 'video', link: '/categories/swimming-competition' },
        { src: '/video2.mp4', alt: 'Swimming Competition Highlights Video 2', type: 'video', link: '/categories/swimming-competition' },
    ],
};

const GalleryPage = () => {
    const [visibleCategory, setVisibleCategory] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.gallery-category');
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setVisibleCategory(section.dataset.category);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="p-4 bg-gray-100">
            <div className="gallery-header mb-8">
                <h1 className="text-3xl font-bold text-center mb-4">Gallery</h1>
                <h2 className="text-xl text-center">Explore our collection</h2>
            </div>
            {Object.entries(categories).map(([category, images], index) => {
                const [featuredImage, ...otherImages] = images;
                return (
                    <div
                        key={index}
                        data-category={category}
                        className={`gallery-category mb-12 ${visibleCategory === category ? 'bg-blue-100' : ''}`}  // Highlight the visible section
                    >
                        <h2 className="text-2xl font-bold mb-4">{category}</h2>
                        <div className="flex flex-col md:flex-row">
                            {/* Featured Image */}
                            <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                                <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
                                    <img
                                        src={featuredImage.src}
                                        alt={featuredImage.alt}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                        loading="lazy"  // Lazy loading for the featured image
                                    />
                                    {featuredImage.description && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white text-lg">{featuredImage.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* 3x3 Grid */}
                            <div className="flex-[1.6] grid grid-cols-3 gap-4 h-96">
                                {otherImages.map((item, index) => (
                                    <div key={index} className="relative overflow-hidden rounded-lg shadow-lg h-full">
                                        {item.type === 'video' ? (
                                            <video
                                                src={item.src}
                                                alt={item.alt}
                                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                                                muted
                                                loop
                                                playsInline
                                                onClick={(e) => {
                                                    const video = e.target;
                                                    if (video.paused) {
                                                        video.play();
                                                    } else {
                                                        video.pause();
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={item.src}
                                                alt={item.alt}
                                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                                loading="lazy"  // Lazy loading for images in the grid
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

GalleryPage.propTypes = {
    categoryImages: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['image', 'video']).isRequired,
            description: PropTypes.string,
            link: PropTypes.string.isRequired,
        })
    ),
};

export default GalleryPage;
