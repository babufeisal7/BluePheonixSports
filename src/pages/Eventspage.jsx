import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useDebounce } from 'use-debounce';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

Modal.setAppElement('#root');
const localizer = momentLocalizer(moment);

// EventCard Component
const EventCard = React.memo(({ title, date, content, imageUrl, onClick, category }) => {
  const categoryColors = {
    rugby: 'bg-red-500',
    football: 'bg-green-500',
    basketball: 'bg-orange-500',
    swimming: 'bg-blue-500',
    default: 'bg-purple-500'
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-[1.02] h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-40" />
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[category] || categoryColors.default}`}>
          {category}
        </span>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <span className="text-sm text-gray-500">{moment(date).format('MMMM D, YYYY - h:mm A')}</span>
        <h3 className="text-lg font-semibold mt-1 text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{content}</p>
        <div className="mt-auto pt-3">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
});

// Calendar View Component
const CalendarView = ({ events, onEventClick }) => {
  const formattedEvents = useMemo(() => 
    events.map(event => ({
      ...event,
      start: new Date(event.date),
      end: new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000), // 2 hour duration
      title: event.title
    })), 
    [events]
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={onEventClick}
        views={['month', 'week', 'day']}
        defaultView="month"
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: 
              event.category === 'rugby' ? '#ef4444' :
              event.category === 'football' ? '#22c55e' :
              event.category === 'basketball' ? '#f97316' :
              event.category === 'swimming' ? '#3b82f6' : '#8b5cf6',
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
          }
        })}
      />
    </div>
  );
};

// Fixtures Component
const FixturesTable = ({ events }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const toggleExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <React.Fragment key={event.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{moment(event.date).format('MMM D, YYYY')}</div>
                  <div className="text-sm text-gray-500">{moment(event.date).format('h:mm A')}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${event.category === 'rugby' ? 'bg-red-100 text-red-800' :
                      event.category === 'football' ? 'bg-green-100 text-green-800' :
                      event.category === 'basketball' ? 'bg-orange-100 text-orange-800' :
                      event.category === 'swimming' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {event.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location || 'TBD'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => toggleExpand(event.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    {expandedEvent === event.id ? 'Hide' : 'Details'}
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    Register
                  </button>
                </td>
              </tr>
              {expandedEvent === event.id && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 bg-gray-50">
                    <div className="flex">
                      <div className="w-1/3">
                        <img src={event.image} alt={event.title} className="rounded-lg h-40 object-cover" />
                      </div>
                      <div className="w-2/3 pl-4">
                        <h4 className="text-lg font-semibold mb-2">Event Details</h4>
                        <p className="text-gray-700 mb-3">{event.description}</p>
                        <div className="flex space-x-4 text-sm">
                          <div>
                            <span className="font-medium">Duration:</span> {event.duration || '2 hours'}
                          </div>
                          <div>
                            <span className="font-medium">Age Group:</span> {event.ageGroup || 'All ages'}
                          </div>
                          <div>
                            <span className="font-medium">Price:</span> {event.price || 'Free'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// EventsPage Component
const EventsPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('grid'); // 'grid', 'calendar', 'fixtures'
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an actual API call
        const response = await fetch('/db.json');
        const data = await response.json();
        setEvents(data.events.map(event => ({
          ...event,
          id: event.id || Math.random().toString(36).substr(2, 9)
        })));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! You'll receive updates about upcoming events.`);
    setEmail('');
  };

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        (event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
         event.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) &&
        (selectedFilter === '' || event.category?.toLowerCase() === selectedFilter)
    );
  }, [debouncedSearchQuery, selectedFilter, events]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents.filter(event => new Date(event.date) > new Date());
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents.filter(event => new Date(event.date) <= new Date());
  }, [filteredEvents]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Blue Phoenix Sports Events</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join us for thrilling matches, training camps, and community events. Stay updated with our calendar and never miss a game!
        </p>
      </header>

      {/* Search and Filter Section */}
      <section className="mb-8 bg-blue-50 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Sports</option>
              <option value="rugby">Rugby</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="swimming">Swimming</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3 flex justify-end">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveView('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeView === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setActiveView('calendar')}
                className={`px-4 py-2 text-sm font-medium ${activeView === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveView('fixtures')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeView === 'fixtures' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Fixtures
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* View Toggle Section */}
      <section className="mb-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeView === 'grid' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        imageUrl={event.image}
                        onClick={() => openModal(event)}
                        content={event.description}
                        category={event.category}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No upcoming events found. Check back later!</p>
                  </div>
                )}
              </div>
            )}

            {activeView === 'calendar' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Event Calendar</h2>
                <CalendarView events={upcomingEvents} onEventClick={openModal} />
              </div>
            )}

            {activeView === 'fixtures' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Match Fixtures</h2>
                <FixturesTable events={upcomingEvents} />
              </div>
            )}

            {pastEvents.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Past Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.date}
                      imageUrl={event.image}
                      onClick={() => openModal(event)}
                      content={event.description}
                      category={event.category}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-blue-600 rounded-xl p-8 text-white mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated With Blue Phoenix Sports</h2>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest event updates, match schedules, and exclusive offers directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join the Action?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you're a player, supporter, or sponsor, there's a place for you in the Blue Phoenix Sports community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register for Events
          </a>
          <a
            href="/membership"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Become a Member
          </a>
          <a
            href="/sponsors"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sponsor Our Team
          </a>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Event Details"
          className="modal-content bg-white p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-1/2 mx-auto my-8"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 md:h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{moment(selectedEvent.date).format('MMMM D, YYYY - h:mm A')}</span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              <div className="mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${selectedEvent.category === 'rugby' ? 'bg-red-100 text-red-800' :
                    selectedEvent.category === 'football' ? 'bg-green-100 text-green-800' :
                    selectedEvent.category === 'basketball' ? 'bg-orange-100 text-orange-800' :
                    selectedEvent.category === 'swimming' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                  {selectedEvent.category}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Age Group</div>
                  <div className="font-medium">{selectedEvent.ageGroup || 'All ages'}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-medium">{selectedEvent.price || 'Free'}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={selectedEvent.registrationLink || '/register'}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register Now
                </a>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventsPage;