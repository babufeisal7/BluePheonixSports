import React, { useState } from 'react';

// Shared Tailwind CSS classes
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const nameClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';
const positionClasses = 'text-sm text-gray-300';
const experienceClasses = 'text-sm text-gray-300';

// Modal Component
const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={content.imgSrc} alt={content.altText} className="w-full h-60 object-cover rounded-lg mb-4" />
        <h2 className="text-2xl font-bold mb-2">{content.name}</h2>
        <h3 className="text-xl text-gray-700 mb-4">{content.position || content.title}</h3>
        <p className="text-gray-600 mb-2">Experience: {content.experience}</p>
        {content.teamsCoached && (
          <p className="text-gray-600 mb-2">Teams Coached: {content.teamsCoached}</p>
        )}
        {content.achievements && (
          <p className="text-gray-600">Achievements: {content.achievements}</p>
        )}
      </div>
    </div>
  );
};

const RugbyPage = () => {
  const [activePlayerId, setActivePlayerId] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (playerOrCoach) => {
    setModalContent(playerOrCoach);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const players = [
    {
      id: 1,
      name: 'John Doe',
      imgSrc: '/photo8.jpg',
      altText: 'John Doe',
      position: 'Fly-half',
      experience: '5 Years',
    },
    {
      id: 2,
      name: 'James Smith',
      imgSrc: '/photo9.jpg',
      altText: 'James Smith',
      position: 'Fullback',
      experience: '3 Years',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      imgSrc: '/photo10.jpg',
      altText: 'Michael Johnson',
      position: 'Prop',
      experience: '7 Years',
    },
    {
      id: 4,
      name: 'David Williams',
      imgSrc: '/image1.jpg',
      altText: 'David Williams',
      position: 'Scrum-half',
      experience: '4 Years',
    },
    {
      id: 5,
      name: 'Chris Brown',
      imgSrc: '/image2.jpg',
      altText: 'Chris Brown',
      position: 'Wing',
      experience: '2 Years',
    },
    {
      id: 6,
      name: 'Paul Adams',
      imgSrc: '/image3.jpg',
      altText: 'Paul Adams',
      position: 'Lock',
      experience: '6 Years',
    },
    {
      id: 7,
      name: 'Luke Turner',
      imgSrc: '/image4.jpg',
      altText: 'Luke Turner',
      position: 'Hooker',
      experience: '5 Years',
    },
    {
      id: 8,
      name: 'Henry Baker',
      imgSrc: '/photo11.jpg',
      altText: 'Henry Baker',
      position: 'Flanker',
      experience: '3 Years',
    },
  ];

  const coaches = [
    {
      id: 1,
      name: 'Jane Doe',
      imgSrc: '/photo11.jpg',
      altText: 'Jane Doe',
      title: 'Head Coach',
      experience: '10+ Years',
      teamsCoached: 'Blue Phoenix Rugby Club, Tokyo Warriors',
      achievements: '3 National Titles, 2 International Cups',
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">Rugby Team</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        {players.map((player) => (
          <div key={player.id}>
            <div
              className={cardClasses}
              onClick={() => handleCardClick(player)}
            >
              <img src={player.imgSrc} alt={player.altText} className={imageClasses} />
              <div className={overlayClasses}></div>
              <div className={textClasses}>
                <h2 className={nameClasses}>{player.name}</h2>
                <h3 className={positionClasses}>{player.position}</h3>
                <p className={experienceClasses}>Experience: {player.experience}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Coaches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {coaches.map((coach) => (
            <div key={coach.id}>
              <div
                className={cardClasses}
                onClick={() => handleCardClick(coach)}
              >
                <img src={coach.imgSrc} alt={coach.altText} className={imageClasses} />
                <div className={overlayClasses}></div>
                <div className={textClasses}>
                  <h2 className={nameClasses}>{coach.name}</h2>
                  <h3 className={positionClasses}>{coach.title}</h3>
                  <p className={experienceClasses}>Experience: {coach.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default RugbyPage;
