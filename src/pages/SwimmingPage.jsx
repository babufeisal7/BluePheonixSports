import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white mb-6 cursor-pointer';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';
const statsClasses = 'text-sm text-gray-600 mt-2'; // Style for stats
const bioClasses = 'mt-2 text-gray-800';

const PlayerCard = ({ id, name, imgSrc, altText, position, stats, bio, onClick, isActive }) => (
  <div className={`${cardClasses} ${isActive ? 'bg-gray-200' : ''}`} onClick={() => onClick(id)}>
    <img src={imgSrc} alt={altText} className={imageClasses} />
    <div className={overlayClasses}></div>
    <div className={textClasses}>
      <h2 className={titleClasses}>{name}</h2>
      <h3 className="text-sm text-gray-300">{position}</h3>
      <p className={statsClasses}>{stats}</p> {/* Displaying player stats */}
      {isActive && <p className={bioClasses}>{bio}</p>}
    </div>
  </div>
);

PlayerCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const CoachCard = () => (
  <div className={cardClasses}>
    <img className={imageClasses} src="https://placehold.co/200x200" alt="Coach Image" />
    <div className={textClasses}>
      <h2 className={titleClasses}>ITSUKI TAKAHASHI</h2>
      <h3 className="text-sm text-gray-600">COACH</h3>
      <p className={bioClasses}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </p>
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Date of birth:</strong> 11 August 1967</p>
        <p><strong>Place of birth:</strong> Livorno</p>
        <p><strong>Nationality:</strong> Norway</p>
      </div>
    </div>
  </div>
);

const SwimmingPage = () => {
  const [activePlayerId, setActivePlayerId] = useState(null);

  const handleCardClick = (id) => {
    setActivePlayerId(activePlayerId === id ? null : id); // Toggle bio visibility
  };

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-12 text-center">Swimming Team and Coaches</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        <PlayerCard 
          id={1}
          name="Katie Ledecky" 
          imgSrc="https://placehold.co/200x200" 
          altText="Katie Ledecky" 
          position="Freestyle"
          stats="Gold Medals: 6 | World Records: 14" 
          bio="Katie Ledecky is an American swimmer known for her long-distance freestyle events. She has won multiple gold medals in the Olympics and set numerous world records."
          onClick={handleCardClick}
          isActive={activePlayerId === 1}
        />
        <PlayerCard 
          id={2}
          name="Caeleb Dressel" 
          imgSrc="https://placehold.co/200x200" 
          altText="Caeleb Dressel" 
          position="Butterfly"
          stats="Gold Medals: 7 | World Records: 4" 
          bio="Caeleb Dressel is an American swimmer renowned for his sprinting ability. He has achieved remarkable success in butterfly and freestyle events."
          onClick={handleCardClick}
          isActive={activePlayerId === 2}
        />
        <PlayerCard 
          id={3}
          name="Adam Peaty" 
          imgSrc="https://placehold.co/200x200" 
          altText="Adam Peaty" 
          position="Breaststroke"
          stats="Gold Medals: 5 | World Records: 7" 
          bio="Adam Peaty is a British swimmer known for his dominance in breaststroke. His impressive performances have earned him several Olympic and World Championship titles."
          onClick={handleCardClick}
          isActive={activePlayerId === 3}
        />
        <PlayerCard 
          id={4}
          name="Simone Manuel" 
          imgSrc="https://placehold.co/200x200" 
          altText="Simone Manuel" 
          position="Freestyle"
          stats="Gold Medals: 4 | World Records: 1" 
          bio="Simone Manuel is an American swimmer who has made history with her achievements in freestyle events. She is known for her sprinting prowess and Olympic successes."
          onClick={handleCardClick}
          isActive={activePlayerId === 4}
        />
        <PlayerCard 
          id={5}
          name="Ryan Murphy" 
          imgSrc="https://placehold.co/200x200" 
          altText="Ryan Murphy" 
          position="Backstroke"
          stats="Gold Medals: 3 | World Records: 2" 
          bio="Ryan Murphy is an American swimmer specializing in backstroke. His remarkable performances in international competitions have made him a standout athlete in his field."
          onClick={handleCardClick}
          isActive={activePlayerId === 5}
        />
        <PlayerCard 
          id={6}
          name="Sarah Sjöström" 
          imgSrc="https://placehold.co/200x200" 
          altText="Sarah Sjöström" 
          position="Butterfly"
          stats="Gold Medals: 6 | World Records: 8" 
          bio="Sarah Sjöström is a Swedish swimmer known for her butterfly and freestyle events. Her world records and numerous gold medals showcase her exceptional talent."
          onClick={handleCardClick}
          isActive={activePlayerId === 6}
        />
        <PlayerCard 
          id={7}
          name="Maya DiRado" 
          imgSrc="https://placehold.co/200x200" 
          altText="Maya DiRado" 
          position="Individual Medley"
          stats="Gold Medals: 4 | World Records: 0" 
          bio="Maya DiRado is an American swimmer renowned for her versatility in individual medley events. Her performance in major competitions has earned her several accolades."
          onClick={handleCardClick}
          isActive={activePlayerId === 7}
        />
        <PlayerCard 
          id={8}
          name="Chad le Clos" 
          imgSrc="https://placehold.co/200x200" 
          altText="Chad le Clos" 
          position="Butterfly"
          stats="Gold Medals: 3 | World Records: 1" 
          bio="Chad le Clos is a South African swimmer known for his achievements in butterfly events. His competitive spirit and skill have made him a notable figure in the swimming world."
          onClick={handleCardClick}
          isActive={activePlayerId === 8}
        />
      </div>
      
      <div className="mb-12">
        <CoachCard />
      </div>
    
    </div>
  );
};

export default SwimmingPage;
