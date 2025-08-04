import React, { useState, useEffect } from "react";
import { format, parseISO, isBefore, isAfter, addDays } from "date-fns";

const MatchCard = ({ match, onDelete, onEdit, onToggleReminder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...match });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const matchDateTime = parseISO(`${match.date}T${match.time}`);
  const isPastMatch = isBefore(matchDateTime, new Date());

  const statusBadge = () => {
    if (isPastMatch) {
      return <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Completed</span>;
    }
    if (match.reminderSet) {
      return <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">Reminder Set</span>;
    }
    return <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">Upcoming</span>;
  };

  return (
    <article className={`border-l-4 ${isPastMatch ? 'border-gray-400 bg-gray-50' : 'border-blue-500 bg-blue-50'} p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={editData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Opponent</label>
              <input
                type="text"
                name="opponent"
                value={editData.opponent}
                onChange={handleChange}
                placeholder="Opponent Team"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={editData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Home">Home</option>
                <option value="Away">Away</option>
                <option value="Neutral">Neutral</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="flex-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${isPastMatch ? 'bg-gray-200' : 'bg-blue-100'}`}>
                <p className="font-bold text-center">{format(matchDateTime, 'MMM')}</p>
                <p className="text-2xl font-bold text-center">{format(matchDateTime, 'd')}</p>
              </div>
              <div>
                <p className="font-medium flex items-center gap-2">
                  {format(matchDateTime, 'h:mm a')} • {match.opponent}
                  {statusBadge()}
                </p>
                <p className="text-sm text-gray-600">
                  {match.location} • {match.notes && !isExpanded && `${match.notes.substring(0, 30)}...`}
                </p>
              </div>
            </div>
            {isExpanded && match.notes && (
              <div className="mt-2 p-3 bg-white rounded-md border border-gray-200">
                <p className="text-gray-700">{match.notes}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {!isPastMatch && (
                <button
                  onClick={() => onToggleReminder(match)}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${match.reminderSet ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {match.reminderSet ? 'Reminder On' : 'Set Reminder'}
                </button>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-md hover:bg-yellow-200 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(match)}
                className="bg-red-100 text-red-800 px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

const MatchSchedule = () => {
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem('matches');
    return savedMatches ? JSON.parse(savedMatches) : [
      { 
        id: 1, 
        date: "2025-07-10", 
        opponent: "Lions Academy", 
        location: "Home", 
        time: "16:00",
        notes: "Bring white jerseys and practice balls",
        reminderSet: false
      },
      { 
        id: 2, 
        date: "2025-07-15", 
        opponent: "Falcons United", 
        location: "Away", 
        time: "14:30",
        notes: "Meet at school parking lot at 12:30pm",
        reminderSet: true
      },
    ];
  });

  const [newMatch, setNewMatch] = useState({
    date: "",
    opponent: "",
    location: "Home",
    time: "",
    notes: "",
    reminderSet: false
  });

  const [filter, setFilter] = useState("upcoming"); // 'upcoming', 'past', or 'all'
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingMatch, setIsAddingMatch] = useState(false);

  // Save to localStorage whenever matches change
  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  const handleInputChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  };

  const addMatch = (e) => {
    e.preventDefault();
    if (!newMatch.date || !newMatch.opponent || !newMatch.time) {
      alert("Please fill all required fields");
      return;
    }
    const matchToAdd = { ...newMatch, id: Date.now() };
    setMatches((prev) => [...prev, matchToAdd]);
    setNewMatch({ date: "", opponent: "", location: "Home", time: "", notes: "", reminderSet: false });
    setIsAddingMatch(false);
  };

  const deleteMatch = (matchToDelete) => {
    if (window.confirm(`Delete match vs ${matchToDelete.opponent}?`)) {
      setMatches((prev) => prev.filter((m) => m.id !== matchToDelete.id));
    }
  };

  const editMatch = (editedMatch) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === editedMatch.id ? editedMatch : m))
    );
  };

  const toggleReminder = (match) => {
    setMatches((prev) =>
      prev.map((m) => 
        m.id === match.id ? { ...m, reminderSet: !m.reminderSet } : m
      )
    );
  };

  const clearAll = () => {
    if (window.confirm("Clear all matches?")) {
      setMatches([]);
    }
  };

  const filteredMatches = matches.filter((match) => {
    const matchDateTime = parseISO(`${match.date}T${match.time}`);
    const now = new Date();
    
    // Filter by time
    if (filter === "upcoming" && isBefore(matchDateTime, now)) return false;
    if (filter === "past" && isAfter(matchDateTime, now)) return false;
    
    // Filter by search term
    if (searchTerm && 
        !match.opponent.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !match.notes?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort matches - upcoming first, then past
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const aDate = parseISO(`${a.date}T${a.time}`);
    const bDate = parseISO(`${b.date}T${b.time}`);
    return aDate - bDate;
  });

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Match Schedule</h1>
          <p className="text-gray-600">Manage your team's upcoming games and events</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddingMatch(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Match
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search matches or notes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter("upcoming")}
                className={`px-3 py-2 text-sm font-medium rounded-l-md ${filter === "upcoming" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-3 py-2 text-sm font-medium ${filter === "past" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Past
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-2 text-sm font-medium rounded-r-md ${filter === "all" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                All
              </button>
            </div>
            <button
              onClick={clearAll}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
              title="Clear all matches"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Clear All
            </button>
          </div>
        </div>

        {isAddingMatch && (
          <form onSubmit={addMatch} className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Match</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newMatch.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newMatch.time}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="opponent" className="block text-sm font-medium text-gray-700 mb-1">Opponent*</label>
                <input
                  type="text"
                  id="opponent"
                  name="opponent"
                  value={newMatch.opponent}
                  onChange={handleInputChange}
                  placeholder="Opponent Team"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  id="location"
                  name="location"
                  value={newMatch.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Away">Away</option>
                  <option value="Neutral">Neutral</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={newMatch.notes}
                  onChange={handleInputChange}
                  placeholder="Additional information (meeting point, equipment needed, etc.)"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddingMatch(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Match
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {sortedMatches.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No matches found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === "upcoming" 
                  ? "You don't have any upcoming matches. Add one to get started!"
                  : "No matches match your current filters."}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddingMatch(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Match
                </button>
              </div>
            </div>
          ) : (
            sortedMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onDelete={deleteMatch}
                onEdit={editMatch}
                onToggleReminder={toggleReminder}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MatchSchedule;