import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 
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
              {/* Conditionally render experience */}
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
    bio: PropTypes.string,
    stats: PropTypes.string,
    experience: PropTypes.number, // Added experience prop
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
        <img className="w-full h-64 object-cover rounded-lg shadow-md" src="/swimming1.jpg" alt="Coach Image" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold text-primary">Shanitah JONES</h2>
        <h3 className="text-xl text-secondary-foreground">HEAD COACH</h3>
        <p className="mt-4 text-muted-foreground">
          Shanita Jones has been coaching swimming for over a decade, focusing on stroke techniques and competitive strategies.
        </p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Date of birth:</strong> 15 January 1997</p>
          <p><strong>Place of birth:</strong> Sydney, Uganda</p>
          <p><strong>Nationality:</strong> Ugandan</p>
        </div>
      </div>
    </div>
  </div>
);

const SwimmingPage = () => {
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
      name: "Swimmer 1",
      imgSrc: "/swimming10.jpg",
      altText: "Swimmer 1",
      position: "Freestyle Specialist",
      stats: "100m Freestyle: 50.23s | 200m Freestyle: 1:48.11",
      bio: "Swimmer 1 is a top competitor known for their speed in freestyle events.",
      experience: 5
    },
    {
      id: 2,
      name: "Swimmer 2",
      imgSrc: "/swimming3.jpg",
      altText: "Swimmer 2",
      position: "Butterfly Specialist",
      stats: "100m Butterfly: 54.10s | 200m Butterfly: 2:00.30",
      bio: "Swimmer 2 excels in butterfly, often breaking records in their category.",
      experience: 4
    },
    {
      id: 3,
      name: "Swimmer 3",
      imgSrc: "/swimming2.jpg",
      altText: "Swimmer 3",
      position: "Backstroke Specialist",
      stats: "100m Backstroke: 55.50s | 200m Backstroke: 1:59.80",
      bio: "Swimmer 3 has a strong technique in backstroke and consistently performs well.",
      experience: 3
    },
    {
      id: 4,
      name: "Swimmer 4",
      imgSrc: "/swimming11.jpg",
      altText: "Swimmer 4",
      position: "Individual Medley",
      stats: "200m IM: 2:01.90 | 400m IM: 4:15.60",
      bio: "Swimmer 4 is known for their versatility and strength in individual medley events.",
      experience: 6
    },
    {
      id: 5,
      name: "Swimmer 5",
      imgSrc: "/swimming6.jpg",
      altText: "Swimmer 5",
      position: "Sprint Specialist",
      stats: "50m Freestyle: 21.85s | 100m Freestyle: 47.20s",
      bio: "Swimmer 5 is a powerful sprinter with impressive speed in short-distance events.",
      experience: 2
    },
    {
      id: 6,
      name: "Swimmer 6",
      imgSrc: "/swimming7.jpg",
      altText: "Swimmer 6",
      position: "Distance Swimmer",
      stats: "800m Freestyle: 8:00.00 | 1500m Freestyle: 15:20.00",
      bio: "Swimmer 6 specializes in distance events and is known for their endurance.",
      experience: 4
    },
    {
      id: 7,
      name: "Swimmer 7",
      imgSrc: "/swimming11.jpg",
      altText: "Swimmer 7",
      position: "Relay Specialist",
      stats: "4x100m Freestyle Relay: 3:10.00",
      bio: "Swimmer 7 is a key member of the relay team, contributing to their success.",
      experience: 5
    },
    {
      id: 8,
      name: "Swimmer 8",
      imgSrc: "/swimming9.jpg",
      altText: "Swimmer 8",
      position: "Junior Swimmer",
      stats: "200m Freestyle: 2:10.00 | 100m Freestyle: 1:00.00",
      bio: "Swimmer 8 is an upcoming talent in the swimming world with a bright future.",
      experience: 1
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-primary mb-6">Swimming Team Players</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <PlayerModal isOpen={isModalOpen} player={selectedPlayer} onClose={handleCloseModal} />
      <CoachCard />
    </div>
  );
};

export default SwimmingPage;
