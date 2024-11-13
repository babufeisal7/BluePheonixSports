import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaSearch } from 'react-icons/fa';

Modal.setAppElement('#root');

// EventCard Component
const EventCard = React.memo(({ date, category, title, content, imageUrl, onClick }) => {
  const cardClasses = "relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-105";
  const cardContentClasses = "absolute bottom-0 left-0 w-full p-6 z-20 text-white";
  const textClasses = "text-white";

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
        <span className="text-sm sm:text-base">{date} | {category}</span>
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());
  const openModal = (event) => { setSelectedEvent(event); setModalIsOpen(true); };
  const closeModal = () => { setModalIsOpen(false); setSelectedEvent(null); };

  const eventCategories = ['All', 'Rugby', 'Football', 'Basketball', 'Swimming'];
  const events = [
    { title: 'CURA 7s', date: 'September 14, 2024', imageUrl: '/photo71.jpg', description: 'A thrilling 7s rugby tournament.', category: 'Rugby' },
    { title: 'Football Super Cup', date: 'March 5, 2025', imageUrl: '/football3.jpg', description: 'The premier football event of the year.', category: 'Football' },
    { title: 'Kisubi 10s', date: 'November 20, 2024', imageUrl: '/photo9.jpg', description: 'A competitive 10s rugby tournament.', category: 'Rugby' },
    { title: 'Basketball PlayOffs', date: 'May 25, 2025', imageUrl: '/basketball4.jpg', description: 'Exciting basketball playoffs with top teams.', category: 'Basketball' },
    { title: 'Uganda Cup', date: 'December 15, 2024', imageUrl: '/photo6.jpg', description: 'Annual Uganda Cup for rugby teams.', category: 'Rugby' },
    { title: 'Swimming Championship', date: 'January 10, 2025', imageUrl: '/swimming3.jpg', description: 'A championship for swimmers across various categories.', category: 'Swimming' },
    { title: 'Football Super Cup', date: 'March 5, 2025', imageUrl: '/football4.jpg', description: 'Another Football Super Cup event.', category: 'Football' },
    { title: 'Central League', date: 'October 5, 2024', imageUrl: '/photo10.jpg', description: 'A regional sports league featuring various sports.', category: 'Various' },
    { title: 'Basketball Finals', date: 'February 15, 2025', imageUrl: '/basketball2.jpg', description: 'The finals of the basketball league.', category: 'Basketball' },
    { title: 'Athletics Meet', date: 'April 20, 2025', imageUrl: '/photo6.jpg', description: 'An athletics meet featuring various track and field events.', category: 'Athletics' },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery) || event.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Upcoming Events</h1>
        <p className="text-lg text-gray-700">Stay updated with our latest events and activities. Join us for exciting matches, training camps, and more!</p>
      </header>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
        <div className="w-full sm:w-1/3 max-w-xs">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Filter by Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            {eventCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-1/3 max-w-xs">
          <label htmlFor="search" className="block text-lg font-medium text-gray-700 mb-2">Search Events</label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

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
              category={event.category}
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
          <p className="text-gray-600 mb-4">{`Category: ${selectedEvent.category}`}</p>
          <button
            onClick={() => window.location.href = 'https://registration-link.com'}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
          >
            Register Now
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
