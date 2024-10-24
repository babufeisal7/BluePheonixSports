import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes for card design
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-4';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-2';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-300';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const nameClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';
const titleClasses = 'text-sm sm:text-base md:text-lg transition-transform duration-300 ease-in-out group-hover:scale-110';

const experts = [
    { name: "Balya Dennis Abel", role: "CEO", imgSrc: "/coach1.jpg", bio: "Visionary leader and strategist." },
    { name: "Muhindo Joshua Kazimoto", role: "Sports Administrator", imgSrc: "/coach2.jpg", bio: "Expert in sports management." },
    { name: "Asea Louis James", role: "Marketing and Communication", imgSrc: "/coach1.jpg", bio: "Builds our brand and connects with the community." },
    { name: "Okello Rodney", role: "Finance Manager", imgSrc: "/coach2.jpg", bio: "Manages our financial health." },
    { name: "Luyima Andrew Kalali", role: "Executive President", imgSrc: "/coach1.jpg", bio: "Leads our strategic initiatives." },
    { name: "Mariah Tal", role: "Head Coach", imgSrc: "/coach2.jpg", bio: "Expert in youth development." },
    { name: "Jerome Bell", role: "Assistant Coach", imgSrc: "/coach1.jpg", bio: "Tactical genius and player developer." },
    { name: "Guy Hawkins", role: "Fitness Trainer", imgSrc: "/coach2.jpg", bio: "Enhances athlete performance." },
    { name: "Savannah Nguyen", role: "Nutritionist", imgSrc: "/coach1.jpg", bio: "Specializes in sports nutrition." },
    { name: "Liam Smith", role: "Mental Coach", imgSrc: "/coach2.jpg", bio: "Focuses on mental resilience." },
    { name: "Olivia Johnson", role: "Youth Coach", imgSrc: "/coach1.jpg", bio: "Passionate about coaching youth." },
];

const ExpertCard = ({ name, role, imgSrc, bio }) => (
    <div className={cardClasses}>
        <img src={imgSrc} alt={name} className={imageClasses} />
        <div className={overlayClasses}></div>
        <div className={textClasses}>
            <h3 className={nameClasses}>{name}</h3>
            <span className={titleClasses}>{role}</span>
            <p className="text-xs sm:text-sm">{bio}</p>
        </div>
    </div>
);

ExpertCard.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
};

ExpertCard.displayName = 'ExpertCard';

const Experts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === experts.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        afterChange: (current) => setCurrentIndex(current),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-white relative">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Meet Our Experts</h2>
                <p className="text-lg sm:text-xl text-center text-black mb-8">Learn from the best in the field!</p>
                <Slider {...settings} className="flex flex-wrap">
                    {experts.map((expert, index) => (
                        <ExpertCard
                            key={index}
                            name={expert.name}
                            role={expert.role}
                            imgSrc={expert.imgSrc}
                            bio={expert.bio}
                        />
                    ))}
                </Slider>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: Math.ceil(experts.length / 3) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 w-8 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-400 transition duration-300 ease-in-out`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experts;
