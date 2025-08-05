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

// Main Rugby Page
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
      name: "James Wilson",
      imgSrc: "/photo8.jpg",
      altText: "James Wilson",
      position: "Prop",
      stats: "Tackles: 87 | Scrums Won: 92%",
      bio: "James is a powerhouse prop known for his strength in scrums and relentless tackling.",
    },
    {
      id: 2,
      name: "Michael Thompson",
      imgSrc: "/photo9.jpg",
      altText: "Michael Thompson",
      position: "Hooker",
      stats: "Lineouts Won: 85% | Tackles: 65",
      bio: "Michael is a precise hooker with excellent throwing accuracy and work rate around the pitch.",
    },
    {
      id: 3,
      name: "David O'Connor",
      imgSrc: "/photo10.jpg",
      altText: "David O'Connor",
      position: "Lock",
      stats: "Lineouts Won: 45 | Carries: 32",
      bio: "David is an athletic lock who dominates the lineouts and provides physicality in the tight.",
    },
    {
      id: 4,
      name: "Robert Harris",
      imgSrc: "/image1.jpg",
      altText: "Robert Harris",
      position: "Flanker",
      stats: "Tackles: 102 | Turnovers Won: 18",
      bio: "Robert is a tireless flanker with exceptional breakdown skills and defensive work rate.",
    },
    {
      id: 5,
      name: "Thomas Evans",
      imgSrc: "/image2.jpg",
      altText: "Thomas Evans",
      position: "Number 8",
      stats: "Carries: 58 | Defenders Beaten: 27",
      bio: "Thomas is a dynamic number 8 who provides go-forward ball and leadership in the pack.",
    },
    {
      id: 6,
      name: "William Brown",
      imgSrc: "/image3.jpg",
      altText: "William Brown",
      position: "Scrum-half",
      stats: "Passes: 423 | Try Assists: 12",
      bio: "William is a sharp scrum-half with quick service and excellent game management skills.",
    },
    {
      id: 7,
      name: "Benjamin Taylor",
      imgSrc: "/image4.jpg",
      altText: "Benjamin Taylor",
      position: "Fly-half",
      stats: "Points: 156 | Kicking %: 82",
      bio: "Benjamin is a composed fly-half with excellent tactical kicking and game control.",
    },
    {
      id: 8,
      name: "Daniel White",
      imgSrc: "/photo11.jpg",
      altText: "Daniel White",
      position: "Center",
      stats: "Defenders Beaten: 34 | Trys: 8",
      bio: "Daniel is a powerful center who breaks the gain line and organizes the backline defense.",
    },
    {
      id: 9,
      name: "Christopher Martin",
      imgSrc: "/photo8.jpg",
      altText: "Christopher Martin",
      position: "Wing",
      stats: "Meters Gained: 876 | Trys: 11",
      bio: "Christopher is a lightning-fast winger with exceptional finishing ability.",
    },
    {
      id: 10,
      name: "Matthew Clark",
      imgSrc: "/photo9.jpg",
      altText: "Matthew Clark",
      position: "Fullback",
      stats: "Kicks Returned: 42 | Try Assists: 9",
      bio: "Matthew is a reliable fullback with excellent positional play and counter-attacking skills.",
    },
    {
      id: 11,
      name: "Andrew Lewis",
      imgSrc: "/photo10.jpg",
      altText: "Andrew Lewis",
      position: "Prop",
      stats: "Scrums Won: 89% | Tackles: 72",
      bio: "Andrew is a technically strong prop who anchors the scrum and works hard in defense.",
    },
    {
      id: 12,
      name: "Edward Walker",
      imgSrc: "/image1.jpg",
      altText: "Edward Walker",
      position: "Flanker",
      stats: "Turnovers Won: 21 | Tackles: 94",
      bio: "Edward is a breakdown specialist who consistently wins possession for his team.",
    },
    {
      id: 13,
      name: "Joseph Wright",
      imgSrc: "/image2.jpg",
      altText: "Joseph Wright",
      position: "Center",
      stats: "Defenders Beaten: 28 | Trys: 6",
      bio: "Joseph is a creative center with excellent distribution skills and defensive organization.",
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
        name="Balya Denis"
        imgSrc="/coach1.jpg"
        position="Head Coach"
        bio="Denis has 15 years of professional coaching experience, having played internationally before transitioning to coaching. He specializes in forward play and set-piece strategies."
        dob="June 22, 1996"
        pob="buziga, Uganda"
        nationality="Ugandan"
      />
    </div>
  );
};

export default RugbyPage;