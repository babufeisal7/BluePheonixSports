import React from 'react';
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';
const paragraphClasses = 'mt-2 text-gray-700';

// Player Card Component
const PlayerCard = ({ name, imgSrc, altText, position }) => (
  <div className={cardClasses}>
    <img src={imgSrc} alt={altText} className={imageClasses} />
    <div className={overlayClasses}></div>
    <div className={textClasses}>
      <h2 className={titleClasses}>{name}</h2>
      <h3 className="text-sm text-gray-300">{position}</h3>
    </div>
  </div>
);

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

// Coach Card Component
const CoachCard = () => (
  <div className={cardClasses}>
    <img className={imageClasses} src="https://placehold.co/200x200" alt="Coach Image" />
    <div className={textClasses}>
      <h2 className={titleClasses}>DARVIN HAM</h2>
      <h3 className="text-sm text-gray-600">HEAD COACH</h3>
      <p className={paragraphClasses}>
        Darvin Ham, known for his defensive strategies and leadership, brings a wealth of experience and passion to the Lakers.
      </p>
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Date of birth:</strong> 23 July 1973</p>
        <p><strong>Place of birth:</strong> Saginaw, Michigan</p>
        <p><strong>Nationality:</strong> USA</p>
      </div>
    </div>
  </div>
);

const BasketballPage = () => (
  <div className="bg-gray-50 p-8">
    <h1 className="text-4xl font-extrabold text-black mb-8 text-center">Los Angeles Lakers Players and Coach</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
      <PlayerCard name="LeBron James" imgSrc="https://example.com/lebron.jpg" altText="LeBron James" position="Forward" />
      <PlayerCard name="Anthony Davis" imgSrc="https://example.com/davis.jpg" altText="Anthony Davis" position="Forward-Center" />
      <PlayerCard name="D'Angelo Russell" imgSrc="https://example.com/russell.jpg" altText="D'Angelo Russell" position="Guard" />
      <PlayerCard name="Austin Reaves" imgSrc="https://example.com/reaves.jpg" altText="Austin Reaves" position="Guard" />
      <PlayerCard name="Jarred Vanderbilt" imgSrc="https://example.com/vanderbilt.jpg" altText="Jarred Vanderbilt" position="Forward" />
      <PlayerCard name="Rui Hachimura" imgSrc="https://example.com/hachimura.jpg" altText="Rui Hachimura" position="Forward" />
      <PlayerCard name="Christian Wood" imgSrc="https://example.com/wood.jpg" altText="Christian Wood" position="Forward-Center" />
      <PlayerCard name="Mo Bamba" imgSrc="https://example.com/bamba.jpg" altText="Mo Bamba" position="Center" />
    </div>
    
    <CoachCard />

  </div>
);

export default BasketballPage;
