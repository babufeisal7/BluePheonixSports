import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, sportName, description }) => {
  // Close modal if isOpen is false
  if (!isOpen) return null;

  // Close modal on Escape key press or outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOutsideClick);

    // Clean up the event listeners
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg" role="document">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {sportName} Program
        </h2>
        <p className="mb-6">{description}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={onClose}
          aria-label="Close Modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default React.memo(Modal);  // Wrap the component with memo for performance optimization
