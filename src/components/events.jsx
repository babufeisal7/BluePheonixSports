import React, { useState, useEffect } from 'react'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes with color changes removed
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-4';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-2';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-300';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const dateClasses = 'text-sm sm:text-base md:text-lg transition-transform duration-300 ease-in-out group-hover:scale-110';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';

const events = [
    { title: 'CURA 7s', date: 'September 14, 2024', image: '/photo71.jpg' },
    { title: 'Football Super Cup', date: 'March 5, 2025', image: '/football3.jpg' },
    { title: 'Kisubi 10s', date: 'November 20, 2024', image: '/photo9.jpg' },
    { title: 'Basketball PlayOffs', date: 'May 25, 2025', image: '/basketball4.jpg' },
    { title: 'Uganda Cup', date: 'December 15, 2024', image: '/photo6.jpg' },
    { title: 'Swimming Championship', date: 'January 10, 2025', image: '/swimming3.jpg' },
    { title: 'Football Super Cup', date: 'March 5, 2025', image: '/football4.jpg' },
    { title: 'Central League', date: 'October 5, 2024', image: '/photo10.jpg' },
    { title: 'Basketball Finals', date: 'February 15, 2025', image: '/basketball2.jpg' },
    { title: 'Athletics Meet', date: 'April 20, 2025', image: '/photo6.jpg' },
];

const EventCard = ({ title, date, image }) => (
    <div className={cardClasses}>
        <img src={image} alt={title} className={imageClasses} />
        <div className={overlayClasses}></div>
        <div className={textClasses}>
            <h3 className={titleClasses}>{title}</h3>
            <span className={dateClasses}>{date}</span>
        </div>
    </div>
);

EventCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

EventCard.displayName = 'EventCard';

const Events = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === events.length - 1 ? 0 : prevIndex + 1
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
        speed: 300,
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
                {/* Centered heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Upcoming Events</h2>
                <p className="text-lg sm:text-xl text-center text-black mb-8">Join us for exciting events and sports action!</p>
                <Slider {...settings} className="flex flex-wrap">
                    {events.map((event, index) => (
                        <EventCard
                            key={index}
                            title={event.title}
                            date={event.date}
                            image={event.image}
                        />
                    ))}
                </Slider>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: Math.ceil(events.length / 3) }).map((_, index) => (
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

export default Events;
