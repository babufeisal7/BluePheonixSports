import React from 'react';
import PropTypes from 'prop-types';

const PlayerModal = ({ isOpen, player, onClose }) => {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto transition-transform transform scale-95 md:scale-100">
        <button
          className="absolute top-2 right-2 text-black text-2xl"
          onClick={onClose}
          aria-label="Close modal"
          aria-labelledby="close-modal"
        >
          &times;
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
    bio: PropTypes.string.isRequired,
    stats: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default PlayerModal;
