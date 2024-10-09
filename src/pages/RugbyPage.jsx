import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

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
          <FaTimes />
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
              {player.experience && <p><strong>Experience:</strong> {player.experience} years</p>}
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
    bio: PropTypes.string.isRequired,
    stats: PropTypes.string.isRequired,
    experience: PropTypes.number,
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
  <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8 mb-8">
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

const RugbyPage = () => {
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
    {
      id: 1,
      name: "John Doe",
      imgSrc: "/photo8.jpg",
      altText: "John Doe",
      position: "Fly-half",
      stats: "Games Played: 50 | Tries: 30 | Tackles: 120 | Kicks: 150",
      bio: "John Doe is a skilled Fly-half known for his strategic playmaking.",
      experience: 5,
    },
    {
      id: 2,
      name: "James Smith",
      imgSrc: "/photo9.jpg",
      altText: "James Smith",
      position: "Fullback",
      stats: "Games Played: 35 | Tries: 15 | Tackles: 100 | Kicks: 60",
      bio: "James Smith excels in defensive strategies and is a reliable kicker.",
      experience: 3,
    },
    {
      id: 3,
      name: "Michael Johnson",
      imgSrc: "/photo10.jpg",
      altText: "Michael Johnson",
      position: "Prop",
      stats: "Games Played: 75 | Tries: 5 | Tackles: 300 | Scrums Won: 200",
      bio: "Michael Johnson is known for his strength in the scrum and tackles.",
      experience: 7,
    },
    {
      id: 4,
      name: "David Williams",
      imgSrc: "/image1.jpg",
      altText: "David Williams",
      position: "Scrum-half",
      stats: "Games Played: 40 | Tries: 18 | Tackles: 90 | Passes: 600",
      bio: "David Williams is a talented Scrum-half with exceptional passing skills.",
      experience: 4,
    },
    {
      id: 5,
      name: "Chris Brown",
      imgSrc: "/image2.jpg",
      altText: "Chris Brown",
      position: "Wing",
      stats: "Games Played: 25 | Tries: 22 | Tackles: 70 | Kicks: 40",
      bio: "Chris Brown is a fast-wing player known for his scoring ability.",
      experience: 2,
    },
    {
      id: 6,
      name: "Paul Adams",
      imgSrc: "/image3.jpg",
      altText: "Paul Adams",
      position: "Lock",
      stats: "Games Played: 65 | Tries: 10 | Tackles: 250 | Lineouts Won: 180",
      bio: "Paul Adams is recognized for his performance in lineouts and defense.",
      experience: 6,
    },
    {
      id: 7,
      name: "Luke Turner",
      imgSrc: "/image4.jpg",
      altText: "Luke Turner",
      position: "Hooker",
      stats: "Games Played: 55 | Tries: 8 | Tackles: 210 | Lineout Throws: 300",
      bio: "Luke Turner is known for his accuracy in lineout throws.",
      experience: 5,
    },
    {
      id: 8,
      name: "Henry Baker",
      imgSrc: "/photo11.jpg",
      altText: "Henry Baker",
      position: "Flanker",
      stats: "Games Played: 45 | Tries: 12 | Tackles: 230 | Turnovers: 50",
      bio: "Henry Baker is a dynamic flanker known for his speed and agility.",
      experience: 3,
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Rugby Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
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

export default RugbyPage;
