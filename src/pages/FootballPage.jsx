import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

// Styling for the components
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';

// Player Modal Component
const PlayerModal = ({ isOpen, player, onClose }) => {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
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

// Component prop validation
PlayerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    bio: PropTypes.string,
    stats: PropTypes.string,
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

// PlayerCard prop validation
PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Coach Card Component
const CoachCard = ({ name, imgSrc, position, bio, dob, pob, nationality }) => (
  <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8">
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 p-4">
        <img className="w-full h-64 object-cover rounded-lg shadow-md" src={imgSrc} alt={`${name}'s Image`} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold text-primary">{name}</h2>
        <h3 className="text-xl text-secondary-foreground">{position}</h3>
        <p className="mt-4 text-muted-foreground">{bio}</p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Date of birth:</strong> {dob}</p>
          <p><strong>Place of birth:</strong> {pob}</p>
          <p><strong>Nationality:</strong> {nationality}</p>
        </div>
      </div>
    </div>
  </div>
);

// CoachCard prop validation
CoachCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  pob: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
};

// Main Football Page
const FootballPage = () => {
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
    // Sample player data
    {
      id: 1,
      name: "Carlos Ramirez",
      imgSrc: "/football1.jpg",
      altText: "Carlos Ramirez",
      position: "Forward",
      stats: "Goals: 15 | Assists: 8",
      bio: "Carlos is a dynamic forward known for his exceptional scoring ability and agility on the field.",
    },
        {
      id: 2,
      name: "Luis Gonzales",
      imgSrc: "/football2.jpg", 
      altText: "Luis Gonzales",
      position: "Midfielder",
      stats: "Goals: 7 | Assists: 12",
      bio: "Luis is a creative midfielder with a keen eye for assists and a knack for controlling the game.",
    },
    {
      id: 3,
      name: "Marco Silva",
      imgSrc: "/football3.jpg", 
      altText: "Marco Silva",
      position: "Defender",
      stats: "Tackles: 20 | Blocks: 10",
      bio: "Marco is a solid defender known for his resilience and excellent tackling skills.",
    },
    {
      id: 4,
      name: "David Martinez",
      imgSrc: "/keeper.jpg", 
      altText: "David Martinez",
      position: "Goalkeeper",
      stats: "Saves: 50 | Clean Sheets: 7",
      bio: "David is a skilled goalkeeper with quick reflexes and great shot-stopping ability.",
    },
    {
      id: 5,
      name: "Diego Torres",
      imgSrc: "/image2.jpg", 
      altText: "Diego Torres",
      position: "Forward",
      stats: "Goals: 12 | Assists: 10",
      bio: "Diego is a forward known for his agility and goal-scoring prowess.",
    },
    {
      id: 6,
      name: "Antonio Ruiz",
      imgSrc: "/image3.jpg", 
      altText: "Antonio Ruiz",
      position: "Midfielder",
      stats: "Goals: 6 | Assists: 15",
      bio: "Antonio is a playmaker with excellent vision and passing accuracy.",
    },
    {
      id: 7,
      name: "Rafael Castillo",
      imgSrc: "/football5.jpg", 
      altText: "Rafael Castillo",
      position: "Defender",
      stats: "Tackles: 25 | Interceptions: 15",
      bio: "Rafael is a tough defender with a strong presence in the backline.",
    },
    {
      id: 8,
      name: "Jorge Moreno",
      imgSrc: "/photo11.jpg", 
      altText: "Jorge Moreno",
      position: "Goalkeeper",
      stats: "Saves: 40 | Clean Sheets: 6",
      bio: "Jorge is a reliable goalkeeper with exceptional agility and decision-making.",
    },
    {
      id: 9,
      name: "Pedro Fernandez",
      imgSrc: "/football6.jpg", 
      altText: "Pedro Fernandez",
      position: "Forward",
      stats: "Goals: 10 | Assists: 5",
      bio: "Pedro is a forward with a sharp eye for goal and excellent positioning.",
    },
    {
      id: 10,
      name: "Luis Martinez",
      imgSrc: "/football4.jpg", 
      altText: "Luis Martinez",
      position: "Midfielder",
      stats: "Goals: 8 | Assists: 10",
      bio: "Luis is a versatile midfielder with strong dribbling skills and vision.",
    },
    {
      id: 11,
      name: "Ricardo Vega",
      imgSrc: "/photo10.jpg",
      altText: "Ricardo Vega",
      position: "Defender",
      stats: "Tackles: 30 | Clearances: 12",
      bio: "Ricardo is a robust defender known for his leadership and defensive organization.",
    },
    {
      id: 12,
      name: "Miguel Santos",
      imgSrc: "/football3.jpg", 
      altText: "Miguel Santos",
      position: "Goalkeeper",
      stats: "Saves: 55 | Clean Sheets: 8",
      bio: "Miguel is a talented goalkeeper with excellent reflexes and command of the area.",
    },
    {
      id: 13,
      name: "Juan Carlos",
      imgSrc: "/football4.jpg", 
      altText: "Juan Carlos",
      position: "Forward",
      stats: "Goals: 9 | Assists: 6",
      bio: "Juan Carlos is a forward with strong finishing skills and a great sense of positioning.",
    }
  ];

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
        Blue Phoenix Rugby Club Players and Coach
      </h1>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
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

      {/* Modal for Selected Player */}
      <PlayerModal isOpen={isModalOpen} player={selectedPlayer} onClose={handleCloseModal} />

      {/* Coach Card Section */}
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
        Meet Our Coach
      </h1>
      <CoachCard
        name="Muheki Mathew"
        imgSrc="/coach3.jpg"
        position="Head Coach"
        bio="Muheki has over 20 years of coaching experience and has led various teams to championship victories."
        dob="March 15, 1980"
        pob="kampala, Uganda"
        nationality="Ugandan"
      />
    </div>
  );
};

export default FootballPage;
