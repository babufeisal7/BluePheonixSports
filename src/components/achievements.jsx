import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types'; // Import PropTypes

// Classes for styling
const cardClasses = 'bg-blue-700 p-4 sm:p-6 rounded-lg shadow-lg text-center text-white'; // Responsive padding
const titleClasses = 'text-2xl sm:text-3xl font-bold mb-4 text-white'; // Responsive title size
const valueClasses = 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2'; // Responsive value size
const textClasses = 'text-base sm:text-lg'; // Responsive text size
const imageClasses = 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4'; // Responsive image size

const AchievementCard = ({ value, text, image }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className={cardClasses} ref={ref}>
            <img src={image} alt={text} className={imageClasses} />
            <div className={valueClasses}>
                {inView ? (
                    <CountUp start={0} end={value} duration={2} separator="," />
                ) : null}
                +
            </div>
            <div className={textClasses}>{text}</div>
        </div>
    );
};

// PropTypes validation
AchievementCard.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

const Achievements = () => {
    return (
        <div className="bg-blue-800 p-4 sm:p-6 lg:p-8 shadow-lg text-center">
            <h2 className={titleClasses}>Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-6xl">
                <AchievementCard
                    value={24}
                    text="Uganda Rugby League"
                    image="/Trophies.png"
                />
                <AchievementCard
                    value={12}
                    text="CURA 7s"
                    image="/Awards-Trophy.png"
                />
                <AchievementCard
                    value={8}
                    text="Super League"
                    image="/Trophy-Cup.png"
                />
                <AchievementCard
                    value={16}
                    text="Kisibi 10s"
                    image="/Trophy2.png"
                />
            </div>
        </div>
    );
};

export default Achievements;
