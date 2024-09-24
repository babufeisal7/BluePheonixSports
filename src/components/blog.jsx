import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme styles

const cardClasses = "bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mx-2"; // Reduced margin
const textClasses = "text-gray-600";
const profileImageClasses = "w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"; // Reduced size
const cardContentClasses = "p-3 text-left"; // Reduced padding

const BlogCard = ({ date, category, title, content, author, role, image, authorImage, link }) => {
    return (
        <div className={cardClasses}>
            <img 
                src={image} 
                alt={title} 
                className="w-full h-36 object-cover sm:h-48 md:h-56 hover:opacity-90 transition-opacity duration-300" // Reduced height
            />
            <div className={cardContentClasses}>
                <span className={`${textClasses} text-xs sm:text-xs md:text-sm`}>{date} | {category}</span> {/* Reduced text size */}
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-1 transition-colors duration-300 hover:text-blue-600">{title}</h3> {/* Reduced text size */}
                </a>
                <p className={`${textClasses} text-xs sm:text-xs md:text-sm mt-1`}>{content}</p> {/* Reduced text size */}
                <div className="mt-3 flex items-center flex-wrap"> {/* Reduced margin top */}
                    <img src={authorImage} alt={author} className={profileImageClasses} />
                    <div>
                        <p className="font-medium text-xs sm:text-sm">{author}</p> {/* Reduced text size */}
                        <p className={`${textClasses} text-xs sm:text-xs`}>{role}</p> {/* Reduced text size */}
                    </div>
                </div>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired, // Add the link prop
};

const BlogSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 2 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 slides at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Change speed to match interval
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
        <section className="py-6 sm:py-8 bg-gradient-to-b from-gray-100 to-white relative"> {/* Reduced padding */}
            <div className="max-w-7xl mx-auto text-center px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">From the Blog</h2> {/* Reduced text size */}
                <p className={`${textClasses} text-xs sm:text-sm md:text-base mb-6`}>
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
                        image="/photo8.jpg" // Local image path
                        authorImage="/coach3.jpg" // Local image path
                        link="https://example.com/rugby-training" // Link for the blog
                    />
                    <BlogCard
                        date="Aug 10, 2024"
                        category="Football"
                        title="Enhancing Performance Through Football Tactics"
                        content="Learn about innovative football tactics and strategies being implemented at Blue Phoenix Sports to maximize team performance."
                        author="Sarah Williams"
                        role="Football Strategist"
                        image="/football6.jpg" // Local image path
                        authorImage="/coach2.jpg" // Local image path
                        link="https://example.com/football-tactics" // Link for the blog
                    />
                    <BlogCard
                        date="Aug 09, 2024"
                        category="Events"
                        title="Upcoming Blue Phoenix Sports Tournaments and Events"
                        content="Stay informed about our upcoming tournaments and events at Blue Phoenix Sports, and find out how you can participate."
                        author="Michael Lee"
                        role="Event Coordinator"
                        image="/photo13" // Local image path
                        authorImage="/coach1.jpg" // Local image path
                        link="https://example.com/upcoming-events" // Link for the blog
                    />
                    <BlogCard
                        date="Aug 08, 2024"
                        category="Health"
                        title="Nutrition Strategies for Optimal Athletic Performance"
                        content="Explore key nutrition strategies that athletes at Blue Phoenix Sports use to enhance their performance and overall health."
                        author="Emily Clark"
                        role="Nutrition Specialist"
                        image="/nutrition.jpg" // Local image path
                        authorImage="/coach1.jpg" // Local image path
                        link="https://example.com/nutrition-strategies" // Link for the blog
                    />
                    <BlogCard
                        date="Aug 07, 2024"
                        category="Training"
                        title="Strengthening Core Muscles for Better Athletic Performance"
                        content="Learn how core strength plays a vital role in athletic performance and ways to enhance it."
                        author="Tom Harris"
                        role="Strength Coach"
                        image="/strength.jpg" // Local image path
                        authorImage="/coach3.jpg" // Local image path
                        link="https://example.com/core-muscles" // Link for the blog
                    />
                    <BlogCard
                        date="Aug 06, 2024"
                        category="Wellness"
                        title="Mental Resilience: Key to Consistent Athletic Success"
                        content="Understand the importance of mental resilience in sports and strategies to cultivate it."
                        author="Alice Green"
                        role="Sports Psychologist"
                        image="/football3.jpg" // Local image path
                        authorImage="/coach2.jpg" // Local image path
                        link="https://example.com/mental-resilience" // Link for the blog
                    />
                    <BlogCard
                        date="Aug 05, 2024"
                        category="Youth"
                        title="Nurturing Young Talent: A Glimpse into Blue Phoenix's Youth Programs"
                        content="An inside look at how Blue Phoenix is shaping the future of sports through its youth programs."
                        author="John Doe"
                        role="Youth Program Director"
                        image="/basketball1.jpg" // Local image path
                        authorImage="/coach1.jpg" // Local image path
                        link="https://example.com/youth-programs" // Link for the blog
                    />
                
                </Slider>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 w-6 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-400 transition duration-300 ease-in-out`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
