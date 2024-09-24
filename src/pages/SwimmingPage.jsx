import PropTypes from 'prop-types';
import { useState } from 'react';
import PlayerModal from "../components/PlayerModal";


const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white mb-6 cursor-pointer';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';
const statsClasses = 'text-sm text-gray-300 mt-2'; 
const bioClasses = 'mt-2 text-gray-200';

const PlayerCard = ({ id, name, imgSrc, altText, position, stats, bio, onClick, isActive }) => (
  <div className={`${cardClasses} ${isActive ? 'bg-gray-200' : ''}`} onClick={() => onClick({ id, name, imgSrc, altText, position, stats, bio })}>
    <img src={imgSrc} alt={altText} className={imageClasses} />
    <div className={overlayClasses}></div>
    <div className={textClasses}>
      <h2 className={titleClasses}>{name}</h2>
      <h3 className="text-sm text-gray-300">{position}</h3>
      <p className={statsClasses}>{stats}</p>
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
    <img className={imageClasses} src="/photo5.jpg" alt="Coach Image" />
    <div className={textClasses}>
      <h2 className={titleClasses}>ITSUKI TAKAHASHI</h2>
      <h3 className="text-sm text-gray-300">COACH</h3>
      <p className={bioClasses}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </p>
      <div className="mt-4 text-sm text-gray-300">
        <p><strong>Date of birth:</strong> 11 August 1967</p>
        <p><strong>Place of birth:</strong> Livorno</p>
        <p><strong>Nationality:</strong> Norway</p>
      </div>
    </div>
  </div>
);

const SwimmingPage = () => {
  const [activePlayer, setActivePlayer] = useState(null);

  const handleCardClick = (player) => {
    setActivePlayer(player);
  };

  const handleCloseModal = () => {
    setActivePlayer(null);
  };

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-12 text-center">Swimming Team and Coaches</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        <PlayerCard 
          id={1}
          name="Katie Ledecky" 
          imgSrc="/photo6.jpg" 
          altText="Katie Ledecky" 
          position="Freestyle"
          stats="Gold Medals: 6 | World Records: 14" 
          bio="Katie Ledecky is an American swimmer known for her long-distance freestyle events. She has won multiple gold medals in the Olympics and set numerous world records."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 1}
        />
        <PlayerCard 
          id={2}
          name="Caeleb Dressel" 
          imgSrc="/photo8.jpg" 
          altText="Caeleb Dressel" 
          position="Butterfly"
          stats="Gold Medals: 7 | World Records: 4" 
          bio="Caeleb Dressel is an American swimmer renowned for his sprinting ability. He has achieved remarkable success in butterfly and freestyle events."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 2}
        />
        <PlayerCard 
          id={3}
          name="Adam Peaty" 
          imgSrc="/photo8.jpg" 
          altText="Adam Peaty" 
          position="Breaststroke"
          stats="Gold Medals: 5 | World Records: 7" 
          bio="Adam Peaty is a British swimmer known for his dominance in breaststroke. His impressive performances have earned him several Olympic and World Championship titles."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 3}
        />
        <PlayerCard 
          id={4}
          name="Simone Manuel" 
          imgSrc="/photo9.jpg" 
          altText="Simone Manuel" 
          position="Freestyle"
          stats="Gold Medals: 4 | World Records: 1" 
          bio="Simone Manuel is an American swimmer who has made history with her achievements in freestyle events. She is known for her sprinting prowess and Olympic successes."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 4}
        />
        <PlayerCard 
          id={5}
          name="Ryan Murphy" 
          imgSrc="/photo10.jpg" 
          altText="Ryan Murphy" 
          position="Backstroke"
          stats="Gold Medals: 3 | World Records: 2" 
          bio="Ryan Murphy is an American swimmer specializing in backstroke. His remarkable performances in international competitions have made him a standout athlete in his field."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 5}
        />
        <PlayerCard 
          id={6}
          name="Sarah Sjöström" 
          imgSrc="/photo11.jpg" 
          altText="Sarah Sjöström" 
          position="Butterfly"
          stats="Gold Medals: 6 | World Records: 8" 
          bio="Sarah Sjöström is a Swedish swimmer known for her butterfly and freestyle events. Her world records and numerous gold medals showcase her exceptional talent."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 6}
        />
        <PlayerCard 
          id={7}
          name="Maya DiRado" 
          imgSrc="/photo5.jpg" 
          altText="Maya DiRado" 
          position="Individual Medley"
          stats="Gold Medals: 4 | World Records: 0" 
          bio="Maya DiRado is an American swimmer renowned for her versatility in individual medley events. Her performance in major championships has earned her several accolades."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 7}
        />
        <PlayerCard 
          id={8}
          name="Michael Phelps" 
          imgSrc="/photo5.jpg" 
          altText="Michael Phelps" 
          position="All-Strokes"
          stats="Gold Medals: 23 | World Records: 39" 
          bio="Michael Phelps is an American swimmer widely regarded as the greatest swimmer of all time. His unparalleled success in multiple events has set him apart in the sport."
          onClick={handleCardClick}
          isActive={activePlayer?.id === 8}
        />
      </div>
      
      <CoachCard />

      <PlayerModal isOpen={!!activePlayer} onClose={handleCloseModal} player={activePlayer} />
    </div>
  );
};

export default SwimmingPage;
