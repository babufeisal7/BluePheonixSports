import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme styles

const cardClasses = "bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mx-3"; // Added mx-3 for horizontal spacing
const textClasses = "text-gray-600";
const imagePlaceholder = "https://placehold.co/300x200"; // You can replace with actual image URLs
const profileImageClasses = "w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-4";
const cardContentClasses = "p-4 text-left"; // Ensure content is aligned to the left

const BlogCard = ({ date, category, title, content, author, role, image, authorImage }) => {
    return (
        <div className={cardClasses}>
            <img 
                src={image} 
                alt={title} 
                className="w-full h-48 object-cover sm:h-60 md:h-72 hover:opacity-90 transition-opacity duration-300" 
            />
            <div className={cardContentClasses}>
                <span className={`${textClasses} text-xs sm:text-sm md:text-base`}>{date} | {category}</span>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-2 transition-colors duration-300 hover:text-blue-600">{title}</h3>
                <p className={`${textClasses} text-xs sm:text-sm md:text-base mt-1`}>{content}</p>
                <div className="mt-4 flex items-center flex-wrap">
                    <img src={authorImage} alt={author} className={profileImageClasses} />
                    <div>
                        <p className="font-medium text-sm sm:text-base">{author}</p>
                        <p className={`${textClasses} text-xs sm:text-sm md:text-base`}>{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlogSection = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isPaused) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 2 ? 0 : prevIndex + 1
            );
        }, 4000); // Change slide every 5 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [isPaused]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 slides at once
        slidesToScroll: 1,
        autoplay: !isPaused,
        autoplaySpeed: 5000,
        arrows: false, // Hide default arrows
        afterChange: (current) => setCurrentIndex(current), // Update currentIndex on slide change
        responsive: [
            {
                breakpoint: 1024, // Adjust this breakpoint as needed
                settings: {
                    slidesToShow: 2, // Show 2 slides on medium screens
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600, // Adjust this breakpoint as needed
                settings: {
                    slidesToShow: 1, // Show 1 slide on small screens
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-white relative">
            <div className="max-w-7xl mx-auto text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">From the Blog</h2>
                <p className={`${textClasses} text-sm sm:text-base md:text-lg mb-8`}>
                    Explore the latest updates, training tips, and success stories from Blue Phoenix Sports Limited.
                </p>
                <Slider {...settings} className="flex flex-wrap">
                    <BlogCard
                        date="Aug 11, 2024"
                        category="Rugby"
                        title="The Evolution of Rugby Training Techniques"
                        content="Discover the latest advancements in rugby training techniques and how they are transforming the game at Blue Phoenix Sports."
                        author="James Anderson"
                        role="Rugby Coach"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                    <BlogCard
                        date="Aug 10, 2024"
                        category="Football"
                        title="Enhancing Performance Through Football Tactics"
                        content="Learn about innovative football tactics and strategies being implemented at Blue Phoenix Sports to maximize team performance."
                        author="Sarah Williams"
                        role="Football Strategist"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                    <BlogCard
                        date="Aug 09, 2024"
                        category="Events"
                        title="Upcoming Blue Phoenix Sports Tournaments and Events"
                        content="Stay informed about our upcoming tournaments and events at Blue Phoenix Sports, and find out how you can participate."
                        author="Michael Lee"
                        role="Event Coordinator"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                    <BlogCard
                        date="Aug 08, 2024"
                        category="Health"
                        title="Nutrition Strategies for Optimal Athletic Performance"
                        content="Explore key nutrition strategies that athletes at Blue Phoenix Sports use to enhance their performance and overall health."
                        author="Emily Clark"
                        role="Nutrition Specialist"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                    {/* Additional Blog Cards */}
                    <BlogCard
                        date="Aug 07, 2024"
                        category="Training"
                        title="Strengthening Core Muscles for Better Athletic Performance"
                        content="Learn how core strength plays a vital role in athletic performance and ways to enhance it."
                        author="Tom Harris"
                        role="Strength Coach"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                    <BlogCard
                        date="Aug 06, 2024"
                        category="Wellness"
                        title="Mental Resilience: Key to Consistent Athletic Success"
                        content="Understand the importance of mental resilience in sports and strategies to cultivate it."
                        author="Alice Green"
                        role="Sports Psychologist"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                    <BlogCard
                        date="Aug 05, 2024"
                        category="Youth"
                        title="Nurturing Young Talent: A Glimpse into Blue Phoenix's Youth Programs"
                        content="An inside look at how Blue Phoenix is shaping the future of sports through its youth programs."
                        author="John Doe"
                        role="Youth Program Director"
                        image={imagePlaceholder}
                        authorImage="https://placehold.co/100x100"
                    />
                </Slider>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 w-8 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-400 transition duration-300 ease-in-out`}
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
        </section>
    );
};

export default BlogSection;
