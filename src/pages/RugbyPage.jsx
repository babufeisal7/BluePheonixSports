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

const RugbyPage = () => {
  const [activePlayerId, setActivePlayerId] = useState(null);

  const handleCardClick = (id) => {
    setActivePlayerId(activePlayerId === id ? null : id); // Toggle bio visibility
  };

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-12 text-center">Rugby Players and Coaches</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        <PlayerCard 
          id={1}
          name="John Doe" 
          imgSrc="https://placehold.co/200x200" 
          altText="John Doe" 
          position="Wing"
          stats="Tries: 12 | Conversions: 5 | Tackles: 30" 
          bio="John is known for his explosive speed and agility on the field. With a passion for rugby since a young age, he has quickly become one of the top wingers in the league."
          onClick={handleCardClick}
          isActive={activePlayerId === 1}
        />
        <PlayerCard 
          id={2}
          name="Michael Smith" 
          imgSrc="https://placehold.co/200x200" 
          altText="Michael Smith" 
          position="Fly-half"
          stats="Tries: 8 | Conversions: 15 | Tackles: 22" 
          bio="Michael excels in game management and tactical kicking. His strategic vision and decision-making skills make him a key player in high-pressure situations."
          onClick={handleCardClick}
          isActive={activePlayerId === 2}
        />
        <PlayerCard 
          id={3}
          name="James Wilson" 
          imgSrc="https://placehold.co/200x200" 
          altText="James Wilson" 
          position="Lock"
          stats="Tries: 5 | Conversions: 2 | Tackles: 40" 
          bio="James is a dominant force in the lineouts and scrums. His strength and physicality make him a cornerstone of the team’s forward pack."
          onClick={handleCardClick}
          isActive={activePlayerId === 3}
        />
        <PlayerCard 
          id={4}
          name="Robert Brown" 
          imgSrc="https://placehold.co/200x200" 
          altText="Robert Brown" 
          position="Prop"
          stats="Tries: 3 | Conversions: 0 | Tackles: 50" 
          bio="Robert brings exceptional power and durability to the front row. His scrummaging skills and work rate are vital to the team’s success."
          onClick={handleCardClick}
          isActive={activePlayerId === 4}
        />
        <PlayerCard 
          id={5}
          name="William Johnson" 
          imgSrc="https://placehold.co/200x200" 
          altText="William Johnson" 
          position="Scrum-half"
          stats="Tries: 7 | Conversions: 10 | Tackles: 28" 
          bio="William is known for his quick decision-making and precise passing. His ability to link play and control the tempo is crucial for the team."
          onClick={handleCardClick}
          isActive={activePlayerId === 5}
        />
        <PlayerCard 
          id={6}
          name="David Jones" 
          imgSrc="https://placehold.co/200x200" 
          altText="David Jones" 
          position="Number 8"
          stats="Tries: 9 | Conversions: 3 | Tackles: 35" 
          bio="David’s dynamic running and powerful carries make him a key offensive threat. His leadership on and off the field is invaluable."
          onClick={handleCardClick}
          isActive={activePlayerId === 6}
        />
        <PlayerCard 
          id={7}
          name="Richard Miller" 
          imgSrc="https://placehold.co/200x200" 
          altText="Richard Miller" 
          position="Centre"
          stats="Tries: 11 | Conversions: 7 | Tackles: 26" 
          bio="Richard is a strong and aggressive centre with excellent defensive skills. His ability to break through tackles and create opportunities is a major asset."
          onClick={handleCardClick}
          isActive={activePlayerId === 7}
        />
        <PlayerCard 
          id={8}
          name="Charles Davis" 
          imgSrc="https://placehold.co/200x200" 
          altText="Charles Davis" 
          position="Full-back"
          stats="Tries: 6 | Conversions: 12 | Tackles: 32" 
          bio="Charles is a versatile full-back known for his solid defense and counter-attacking ability. His skill in reading the game and positional play is exceptional."
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

export default RugbyPage;
