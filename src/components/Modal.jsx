import React from 'react';

const Modal = ({ isOpen, onClose, sportName, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{sportName} Program</h2>
        <p className="mb-6">{description}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
