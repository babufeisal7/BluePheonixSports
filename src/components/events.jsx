import React from 'react';
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const dateClasses = 'text-sm sm:text-base md:text-lg transition-transform duration-300 ease-in-out group-hover:scale-110';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';

const events = [
    { title: 'CURA 7s', date: 'September 14, 2024', image: '/photo71.jpg' },
    { title: 'Central League', date: 'October 5, 2024', image: '/photo10.jpg' },
    { title: 'Kisubi 10s', date: 'November 20, 2024', image: '/photo9.jpg' },
    { title: 'Uganda Cup', date: 'December 15, 2024', image: '/photo6.jpg' },
];

const EventCard = ({ title, date, image }) => (
    <div className={cardClasses}>
        <img src={image} alt={title} className={imageClasses} />
        <div className={overlayClasses}></div>
        <div className={textClasses}>
            <span className={dateClasses}>{date}</span>
            <h3 className={titleClasses}>{title}</h3>
        </div>
    </div>
);

// Adding PropTypes validation
EventCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

// Adding display name for the component
EventCard.displayName = 'EventCard';

const Events = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-black">Upcoming Events</h2>
        <p className="text-lg sm:text-xl text-center text-black mb-8">Join us for exciting events and rugby action!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
                <EventCard
                    key={index}
                    title={event.title}
                    date={event.date}
                    image={event.image}
                />
            ))}
        </div>
    </div>
);

export default Events;
