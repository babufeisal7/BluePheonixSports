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
        <h2 className="text-3xl font-bold text-primary">COACH NAME</h2>
        <h3 className="text-xl text-secondary-foreground">HEAD COACH</h3>
        <p className="mt-4 text-muted-foreground">
          Brief bio about the coach's background and achievements.
        </p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Date of birth:</strong> Date here</p>
          <p><strong>Place of birth:</strong> Place here</p>
          <p><strong>Nationality:</strong> Nationality here</p>
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
    { name: "Jordan Rivers", imgSrc: "/photo11.jpg", altText: "Jordan Rivers", position: "Point Guard", bio: "Jordan is known for his incredible speed and court vision.", stats: "20 points, 8 assists per game" },
    { name: "Isaiah Carter", imgSrc: "/photo12.jpg", altText: "Isaiah Carter", position: "Shooting Guard", bio: "Isaiah is a sharpshooter with a knack for hitting clutch shots.", stats: "25 points, 5 rebounds per game" },
    { name: "Marcus Allen", imgSrc: "/photo10.jpg", altText: "Marcus Allen", position: "Small Forward", bio: "Marcus is an athletic player with great defensive skills.", stats: "18 points, 7 rebounds per game" },
    { name: "DeAndre Simmons", imgSrc: "/photo8.jpg", altText: "DeAndre Simmons", position: "Power Forward", bio: "DeAndre is known for his strong post moves and rebounding ability.", stats: "15 points, 10 rebounds per game" },
    { name: "Trey Parker", imgSrc: "/photo8.jpg", altText: "Trey Parker", position: "Center", bio: "Trey is a dominant presence in the paint and an excellent shot-blocker.", stats: "12 points, 11 rebounds per game" },
    { name: "Liam Foster", imgSrc: "/photo6.jpg", altText: "Liam Foster", position: "Point Guard", bio: "Liam is known for his leadership on and off the court.", stats: "22 points, 7 assists per game" },
    { name: "Noah Taylor", imgSrc: "/photo8.jpg", altText: "Noah Taylor", position: "Shooting Guard", bio: "Noah has a deadly three-point shot and excellent footwork.", stats: "23 points, 4 rebounds per game" },
    { name: "Ethan King", imgSrc: "/photo8.jpg", altText: "Ethan King", position: "Small Forward", bio: "Ethan is a versatile scorer who can play multiple positions.", stats: "19 points, 6 rebounds per game" },
    { name: "Oliver Scott", imgSrc: "/photo9.jpg", altText: "Oliver Scott", position: "Power Forward", bio: "Oliver brings size and strength to the team, excelling in post play.", stats: "16 points, 9 rebounds per game" },
    { name: "Lucas Rivera", imgSrc: "/photo10.jpg", altText: "Lucas Rivera", position: "Center", bio: "Lucas is an elite shot-blocker and rim protector.", stats: "14 points, 10 rebounds per game" },
    { name: "Mason Brooks", imgSrc: "/photo11.jpg", altText: "Mason Brooks", position: "Small Forward", bio: "Mason is an athletic player known for his quickness and agility.", stats: "21 points, 5 rebounds per game" },
    { name: "James Bennett", imgSrc: "/photo12.jpg", altText: "James Bennett", position: "Shooting Guard", bio: "James is a crafty scorer with a high basketball IQ.", stats: "17 points, 3 assists per game" },
  ];
  
  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">NBS Pro Players</h1>
      
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
