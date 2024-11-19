import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useDebounce } from 'use-debounce';

Modal.setAppElement('#root');

// EventCard Component
const EventCard = React.memo(({ title, date, content, imageUrl, onClick }) => {
  const cardClasses = 'relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-105';
  const cardContentClasses = 'absolute bottom-0 left-0 w-full p-6 z-20 text-white';
  const textClasses = 'text-white';

  return (
    <div className={cardClasses} onClick={onClick}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-96 object-cover transition-opacity duration-300" // Increased image height to h-96
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
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      });
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        (event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) &&
        (selectedFilter === '' || event.category?.toLowerCase() === selectedFilter)
    );
  }, [debouncedSearchQuery, selectedFilter, events]);

  return (
    <div className="p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Upcoming Events</h1>
        <p className="text-lg text-gray-700">Stay updated with our latest events and activities. Join us for exciting matches, training camps, and more!</p>
      </header>

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

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Events</h2>
        {isLoading ? (
          <div>Loading events...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                imageUrl={event.image}
                onClick={() => openModal(event)}
                content={event.description}
              />
            ))}
          </div>
        )}
      </section>

      {selectedEvent && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Event Details" className="modal-content bg-white p-8 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedEvent.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{selectedEvent.description}</p>
          <p className="text-gray-600 mb-4">{`Date: ${selectedEvent.date}`}</p>
          <button
            onClick={() => window.location.href = 'https://registration-link.com'}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-4"
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
