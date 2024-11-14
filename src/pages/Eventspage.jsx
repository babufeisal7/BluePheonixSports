import React, { useState, useMemo, useCallback } from 'react';
import Modal from 'react-modal';
import { useDebounce } from 'use-debounce'; // Install use-debounce for debouncing

Modal.setAppElement('#root');

// EventCard Component
const EventCard = React.memo(({ date, title, content, imageUrl, onClick }) => {
  const cardClasses = 'relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-105';
  const cardContentClasses = 'absolute bottom-0 left-0 w-full p-6 z-20 text-white';
  const textClasses = 'text-white';

  return (
    <div className={cardClasses} onClick={onClick}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover transition-opacity duration-300"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-40 z-10" />
      {/* Content */}
      <div className={cardContentClasses}>
        <span className="text-sm sm:text-base">{date}</span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-colors duration-300 hover:text-blue-600">
          {title}
        </h3>
        <p className={`${textClasses} text-sm sm:text-base md:text-lg mt-2`}>{content}</p>
      </div>
    </div>
  );
});

// EventsPage Component
const EventsPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300); // Debounce search query to prevent excessive re-renders
  const [selectedFilter, setSelectedFilter] = useState('');

  const events = useMemo(() => [
    { title: 'CURA 7s', date: 'September 14, 2024', imageUrl: '/photo71.jpg', description: 'A thrilling 7s rugby tournament.', category: 'rugby' },
    { title: 'Football Super Cup', date: 'March 5, 2025', imageUrl: '/football3.jpg', description: 'The premier football event of the year.', category: 'football' },
    { title: 'Kisubi 10s', date: 'November 20, 2024', imageUrl: '/photo9.jpg', description: 'A competitive 10s rugby tournament.', category: 'rugby' },
    { title: 'Basketball PlayOffs', date: 'May 25, 2025', imageUrl: '/basketball4.jpg', description: 'Exciting basketball playoffs with top teams.', category: 'basketball' },
    { title: 'Uganda Cup', date: 'December 15, 2024', imageUrl: '/photo6.jpg', description: 'Annual Uganda Cup for rugby teams.', category: 'rugby' },
    { title: 'Swimming Championship', date: 'January 10, 2025', imageUrl: '/swimming3.jpg', description: 'A championship for swimmers across various categories.', category: 'swimming' },
    { title: 'Football Super Cup', date: 'March 5, 2025', imageUrl: '/football4.jpg', description: 'Another Football Super Cup event.', category: 'football' },
    { title: 'Central League', date: 'October 5, 2024', imageUrl: '/photo10.jpg', description: 'A regional sports league featuring various sports.', category: 'multi-sport' },
    { title: 'Basketball Finals', date: 'February 15, 2025', imageUrl: '/basketball2.jpg', description: 'The finals of the basketball league.', category: 'basketball' },
    { title: 'Athletics Meet', date: 'April 20, 2025', imageUrl: '/photo6.jpg', description: 'An athletics meet featuring various track and field events.', category: 'athletics' },
  ], []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  // Filter events based on search query and selected filter
  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        (event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) &&
        (selectedFilter === '' || event.category === selectedFilter)
    );
  }, [debouncedSearchQuery, selectedFilter, events]);

  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Upcoming Events</h1>
        <p className="text-lg text-gray-700">Stay updated with our latest events and activities. Join us for exciting matches, training camps, and more!</p>
      </header>

      {/* Search and Filter Section */}
      <section className="flex gap-4 mb-8 justify-center">
        <div className="flex-1 max-w-xs">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="gap-4 mb-8 w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="rugby">Rugby</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="swimming">Swimming</option>
            <option value="athletics">Athletics</option>
            <option value="multi-sport">Multi-sport</option>
          </select>
        </div>
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Featured Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              imageUrl={event.imageUrl}
              onClick={() => openModal(event)}
              content={event.description}
            />
          ))}
        </div>
      </section>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Event Details" className="modal-content bg-white p-8 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedEvent.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{selectedEvent.description}</p>
          <p className="text-gray-600 mb-4">{`Date: ${selectedEvent.date}`}</p>
          <button
            onClick={() => window.location.href = 'https://registration-link.com'}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
          >
            Book Now
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mt-4 ml-2 hover:bg-gray-400"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default EventsPage;
