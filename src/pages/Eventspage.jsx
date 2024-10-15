import React, { useState } from 'react';
import Modal from 'react-modal'; // Import the modal component

// Set the app element for accessibility
Modal.setAppElement('#root');

// Sample Event Card Component
const EventCard = ({ title, date, imageUrl, onClick }) => (
  <div 
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
    onClick={onClick}
  >
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover transition-opacity duration-300 ease-in-out hover:opacity-75" />
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">{title}</h2>
      <p className="text-gray-600">{date}</p>
    </div>
  </div>
);

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const eventCategories = [
    'All', 'Rugby', 'Football', 'Basketball', 'Swimming'
  ];

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

  // Filter events based on the selected category
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const eventDetails = {
    name: "Golfers' Invitational Championship",
    date: "August 15-18, 2023",
    registration: "$86.00",
    format: "Stroke Play",
    organizer: "Golfy Club",
    organizerPhone: "(+1) 0 221 457 441",
    awards: "Overall Champion Golfer Trophy",
    catering: "Dinner on the final day",
    venue: "Starry Haven Events Center",
    venueLocation: "Pinecrest Golf Club, 123",
    venuePhone: "(+1) 0 221 457 441",
    venuePhoneTwo: "(+1) 0 221 457 441"
  };

  return (
    <div className="flex flex-row-reverse">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-100 border-l border-gray-200 min-h-screen">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Filter by Category</h2>
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange} 
            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            {eventCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </section>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-2">Upcoming Events</h1>
          <p className="text-lg text-gray-700">Stay updated with our latest events and activities. Join us for exciting matches, training camps, and more!</p>
        </header>

        {/* Featured Events */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={index}
                title={event.title}
                date={event.date}
                imageUrl={event.imageUrl}
                onClick={() => openModal(event)}
              />
            ))}
          </div>
        </section>

        {/* Modal for Event Details */}
        {selectedEvent && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
          >
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-gray-800"
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{selectedEvent.title}</h2>
            <p className="text-lg text-gray-700 mb-4">{selectedEvent.date}</p>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-48 object-cover mb-4 rounded-lg shadow-md" />
            <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
            
            {/* Additional Event Details */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Event Information</h3>
              <p className="text-gray-700 mb-1"><strong>Name:</strong> {eventDetails.name}</p>
              <p className="text-gray-700 mb-1"><strong>Date:</strong> {eventDetails.date}</p>
              <p className="text-gray-700 mb-1"><strong>Registration Fee:</strong> {eventDetails.registration}</p>
              <p className="text-gray-700 mb-1"><strong>Format:</strong> {eventDetails.format}</p>
              <p className="text-gray-700 mb-1"><strong>Organizer:</strong> {eventDetails.organizer}</p>
              <p className="text-gray-700 mb-1"><strong>Organizer Phone:</strong> {eventDetails.organizerPhone}</p>
              <p className="text-gray-700 mb-1"><strong>Awards:</strong> {eventDetails.awards}</p>
              <p className="text-gray-700 mb-1"><strong>Catering:</strong> {eventDetails.catering}</p>
            </div>

            {/* Event Venue Details */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Venue Information</h3>
              <p className="text-gray-700 mb-1"><strong>Venue:</strong> {eventDetails.venue}</p>
              <p className="text-gray-700 mb-1"><strong>Location:</strong> {eventDetails.venueLocation}</p>
              <p className="text-gray-700 mb-1"><strong>Venue Phone:</strong> {eventDetails.venuePhone}</p>
              <p className="text-gray-700 mb-1"><strong>Alternative Phone:</strong> {eventDetails.venuePhoneTwo}</p>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
