import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';

// Player Modal Component
const PlayerModal = ({ isOpen, player, onClose }) => {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <button
          className="absolute top-2 right-2 text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-4">
            <img className="w-full h-64 object-cover rounded-lg shadow-md" src={player.imgSrc} alt={player.altText} />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold text-primary">{player.name}</h2>
            <h3 className="text-xl text-secondary-foreground">{player.position}</h3>
            <p className="mt-4 text-muted-foreground">{player.bio}</p>
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Stats:</strong> {player.stats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    bio: PropTypes.string,
    stats: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

// Player Card Component
const PlayerCard = ({ name, imgSrc, altText, position, onClick }) => (
  <div className={cardClasses} onClick={onClick}>
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
  onClick: PropTypes.func.isRequired,
};

// Coach Card Component
const CoachCard = () => (
  <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8">
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 p-4">
        <img className="w-full h-64 object-cover rounded-lg shadow-md" src="/photo5.jpg" alt="Coach Image" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold text-primary">MIKE D&apos;ANTONI</h2>
        <h3 className="text-xl text-secondary-foreground">HEAD COACH</h3>
        <p className="mt-4 text-muted-foreground">
          Mike D&apos;Antoni, renowned for his innovative offensive strategies and fast-paced style of play, is a key figure in the team's success.
        </p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Date of birth:</strong> 8 May 1951</p>
          <p><strong>Place of birth:</strong> Mullens, West Virginia</p>
          <p><strong>Nationality:</strong> USA</p>
        </div>
      </div>
    </div>
  </div>
);

const BasketballPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleCardClick = (player) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlayer(null);
  };

  const players = [
    { name: "Carlos Ramirez", imgSrc: "/photo6.jpg", altText: "Carlos Ramirez", position: "Forward", bio: "Carlos is a dynamic forward known for his powerful shots and strategic play.", stats: "30 goals in 50 matches" },
    { name: "Luis Gonzales", imgSrc: "/photo8.jpg", altText: "Luis Gonzales", position: "Midfielder", bio: "Luis controls the midfield with his excellent passing and vision.", stats: "20 assists in 45 matches" },
    { name: "Marco Silva", imgSrc: "/photo8.jpg", altText: "Marco Silva", position: "Defender", bio: "Marco is a solid defender with great tackling and aerial ability.", stats: "50 clearances in 40 matches" },
    { name: "David Martinez", imgSrc: "/photo9.jpg", altText: "David Martinez", position: "Goalkeeper", bio: "David is an outstanding goalkeeper with quick reflexes and excellent shot-stopping skills.", stats: "15 clean sheets in 30 matches" },
    { name: "Diego Torres", imgSrc: "/photo10.jpg", altText: "Diego Torres", position: "Forward", bio: "Diego is a versatile forward with a knack for finding the back of the net.", stats: "25 goals in 40 matches" },
    { name: "Antonio Ruiz", imgSrc: "/photo11.jpg", altText: "Antonio Ruiz", position: "Midfielder", bio: "Antonio is a creative midfielder with exceptional dribbling and passing.", stats: "15 assists in 35 matches" },
    { name: "Rafael Castillo", imgSrc: "/photo6.jpg", altText: "Rafael Castillo", position: "Defender", bio: "Rafael is a tough defender who excels in one-on-one situations.", stats: "40 interceptions in 35 matches" },
    { name: "Jorge Moreno", imgSrc: "/photo8.jpg", altText: "Jorge Moreno", position: "Goalkeeper", bio: "Jorge is a reliable goalkeeper with a strong command of his area.", stats: "10 clean sheets in 25 matches" },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">Los Angeles Lakers Players and Coach</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        {players.map((player) => (
          <PlayerCard
            key={player.name}
            name={player.name}
            imgSrc={player.imgSrc}
            altText={player.altText}
            position={player.position}
            onClick={() => handleCardClick(player)}
          />
        ))}
      </div>
      
      <CoachCard />

      <PlayerModal isOpen={isModalOpen} player={selectedPlayer} onClose={handleCloseModal} />
    </div>
  );
};

export default BasketballPage;
