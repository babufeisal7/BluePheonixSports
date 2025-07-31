import React from 'react';
import PropTypes from 'prop-types';

const teams = [
  {
    sport: 'Rugby',
    image: '/image1.jpg',
    description: 'We will always Rise!',
    buttonText: 'Join Us',
  },
  {
    sport: 'Football',
    image: '/football1.jpg',
    description: 'We will always Rise!',
    buttonText: 'Coming Soon',
  },
  {
    sport: 'Basketball',
    image: '/basketball4.jpg',
    description: 'We will always Rise!',
    buttonText: 'Coming Soon',
  },
  {
    sport: 'Swimming',
    image: '/swimmingteam.jpg',
    description: 'We will always Rise!',
    buttonText: 'Coming Soon',
  },
];

const TeamSummaryCard = ({ sport, image, description, buttonText }) => {
  const buttonClasses = [
    'text-white border-2 border-white px-4 py-2 text-sm rounded-full transition-colors duration-300',
    buttonText === 'Join Us'
      ? 'bg-orange-700 hover:bg-orange-600'
      : 'bg-blue-700 hover:bg-blue-800',
  ].join(' ');

  return (
    <div className="bg- rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={image}
        alt={`${sport} team`}
        className="w-full h-40 md:h-48 lg:h-60 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl text-white">{sport} Team</h3>
        <p className="text-white mb-4">{description}</p>
        <a
          href={`/${sport.toLowerCase()}`}
          className={buttonClasses}
          aria-label={`Learn more about our ${sport} team`}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

TeamSummaryCard.propTypes = {
  sport: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const OurTeamsSummary = () => {
  return (
    <section id="teams" className="relative py-16 bg-blue-700 min-h-screen">
      <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-12 text-white">
        Our Teams
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-12 mb-12">
        {teams.map((team) => (
          <TeamSummaryCard key={team.sport} {...team} />
        ))}
      </div>
    </section>
  );
};

export default OurTeamsSummary;