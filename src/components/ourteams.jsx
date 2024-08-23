import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const teams = [
    {
        sport: 'Rugby',
        image: '/image1.jpg',
        description: 'We will always Rise!',
        buttonText: 'Join Us'
    },
    {
        sport: 'Football',
        image: '/image3.jpg',
        description: 'We will always Rise!',
        buttonText: 'Coming Soon'
    },
    {
        sport: 'Basketball',
        image: '/image2.jpg',
        description: 'We will always Rise!',
        buttonText: 'Coming Soon'
    },
    {
        sport: 'Swimming',
        image: '/image4.jpg',
        description: 'We will always Rise!',
        buttonText: 'Coming Soon'
    },
];

const cardClasses = "bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105";
const titleClasses = "text-xl font-bold text-gray-900";
const descriptionClasses = "text-gray-700 mb-4";

const TeamSummaryCard = ({ sport, image, description, buttonText }) => (
    <div className={cardClasses}>
        <img
            src={image}
            alt={`${sport} team`}
            className="w-full h-40 md:h-48 lg:h-60 object-cover"
        />
        <div className="p-4">
            <h3 className={titleClasses}>{sport} Team</h3>
            <p className={descriptionClasses}>{description}</p>
            <a
                href={`/${sport.toLowerCase()}`}
                className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 text-sm rounded-lg"
                aria-label={`Learn more about our ${sport} team`}
            >
                {buttonText}
            </a>
        </div>
    </div>
);

// Add PropTypes validation for the TeamSummaryCard component
TeamSummaryCard.propTypes = {
    sport: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
};

const OurTeamsSummary = () => (
    <div id="teams" className="relative py-16 bg-blue-700 min-h-screen">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">Our Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-12 mb-12">
            {teams.map((team, index) => (
                <TeamSummaryCard
                    key={index}
                    sport={team.sport}
                    image={team.image}
                    description={team.description}
                    buttonText={team.buttonText}
                />
            ))}
        </div>
    </div>
);

export default OurTeamsSummary;
