import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ 
  isOpen, 
  onClose, 
  sportName, 
  description, 
  children, 
  size = 'md', 
  closeOnOutsideClick = true,
  showCloseButton = true,
  customStyles = {},
  animation = 'fade'
}) => {
  const modalRef = useRef(null);
  
  // Define size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full w-full'
  };

  // Define animation classes
  const animationClasses = {
    fade: 'opacity-0 animate-fade-in',
    slide: 'translate-y-10 animate-slide-up',
    scale: 'scale-95 animate-scale-in'
  };

  // Handle close events
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Close modal on Escape key press
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  // Close modal on outside click
  const handleOutsideClick = useCallback((e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      handleClose();
    }
  }, [closeOnOutsideClick, handleClose]);

  // Focus trap for accessibility
  const handleTabKey = useCallback((e) => {
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }, []);

  // Add/remove event listeners when modal opens/closes
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);
    
    if (closeOnOutsideClick) {
      document.addEventListener('click', handleOutsideClick);
    }

    // Focus the modal when it opens for accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape, handleTabKey, handleOutsideClick, closeOnOutsideClick]);

  // Close modal if isOpen is false
  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 ${animationClasses[animation]}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      tabIndex="-1"
    >
      <div 
        className={`bg-white rounded-lg p-6 shadow-xl w-full ${sizeClasses[size]} ${customStyles.container || ''}`}
        style={customStyles.content}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 id="modal-title" className="text-2xl font-bold">
            {sportName} Program
          </h2>
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div id="modal-description" className="mb-6">
          {description && <p className="mb-4">{description}</p>}
          {children}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleClose}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sportName: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  closeOnOutsideClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  customStyles: PropTypes.shape({
    container: PropTypes.string,
    content: PropTypes.object
  }),
  animation: PropTypes.oneOf(['fade', 'slide', 'scale'])
};

export default React.memo(Modal);