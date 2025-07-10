import React, { useState, useEffect } from "react";

const initialEvents = [
  {
    id: 1,
    title: "Rugby Championship",
    sport: "Rugby",
    date: "2025-08-10",
    location: "Main Stadium",
    description: "Annual rugby tournament for all age groups.",
    image: "/public/image1.jpg",
  },
  {
    id: 2,
    title: "Football Friendly Match",
    sport: "Football",
    date: "2025-08-20",
    location: "City Sports Complex",
    description: "Friendly match between local teams.",
    image: "/public/football1.jpg",
  },
];

const sports = ["All", "Rugby", "Football", "Basketball", "Swimming"];

const EventsManager = () => {
  const [events, setEvents] = useState(initialEvents);
  const [filterSport, setFilterSport] = useState("All");
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    sport: "Rugby",
    date: "",
    location: "",
    description: "",
    image: null,
  });

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const filteredEvents =
    filterSport === "All" ? events : events.filter((e) => e.sport === filterSport);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((fd) => ({ ...fd, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert("Please fill in Title and Date");
      return;
    }

    if (editingEvent) {
      setEvents((evts) =>
        evts.map((ev) =>
          ev.id === editingEvent.id ? { ...editingEvent, ...formData } : ev
        )
      );
      setEditingEvent(null);
    } else {
      const newEvent = { id: Date.now(), ...formData };
      setEvents((evts) => [...evts, newEvent]);
    }

    setFormData({
      title: "",
      sport: "Rugby",
      date: "",
      location: "",
      description: "",
      image: null,
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      sport: event.sport,
      date: event.date,
      location: event.location,
      description: event.description,
      image: event.image || null,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((evts) => evts.filter((ev) => ev.id !== id));
      if (editingEvent?.id === id) {
        setEditingEvent(null);
        setFormData({
          title: "",
          sport: "Rugby",
          date: "",
          location: "",
          description: "",
          image: null,
        });
      }
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      sport: "Rugby",
      date: "",
      location: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Events Management</h2>

      {/* Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label className="font-semibold mb-2 sm:mb-0" htmlFor="filterSport">
          Filter by Sport:
        </label>
        <select
          id="filterSport"
          value={filterSport}
          onChange={(e) => setFilterSport(e.target.value)}
          className="border rounded px-3 py-1 max-w-xs"
        >
          {sports.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Events Table (responsive) */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Image</th>
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Sport</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Location</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No events found.
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-100 transition-colors duration-150"
                >
                  <td className="border border-gray-300 p-2">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-16 bg-gray-300 rounded flex items-center justify-center text-sm text-gray-600">
                        No Image
                      </div>
                    )}
                  </td>
                  <td
                    className="border border-gray-300 p-2"
                    title={event.description}
                  >
                    {event.title}
                  </td>
                  <td className="border border-gray-300 p-2">{event.sport}</td>
                  <td className="border border-gray-300 p-2">{formatDate(event.date)}</td>
                  <td className="border border-gray-300 p-2">{event.location}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(event)}
                      className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Event Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-md max-w-md mx-auto"
        encType="multipart/form-data"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">
          {editingEvent ? "Edit Event" : "Add New Event"}
        </h3>
        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="title">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Event title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="sport">
            Sport
          </label>
          <select
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {sports
              .filter((s) => s !== "All")
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="date">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Event location"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Event description"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Event Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-32 h-24 object-cover rounded"
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-2 gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex-1"
          >
            {editingEvent ? "Update Event" : "Add Event"}
          </button>
          {editingEvent && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventsManager;
