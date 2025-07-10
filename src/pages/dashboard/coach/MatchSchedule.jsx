import React, { useState } from "react";

const MatchCard = ({ match, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...match });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const matchDate = new Date(`${match.date}T${match.time}`);
  const formattedDate = matchDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = matchDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
      {isEditing ? (
        <div className="flex flex-col md:flex-row md:space-x-4 flex-1 flex-wrap gap-2">
          <input
            type="date"
            name="date"
            value={editData.date}
            onChange={handleChange}
            className="border p-1 rounded"
          />
          <input
            type="time"
            name="time"
            value={editData.time}
            onChange={handleChange}
            className="border p-1 rounded"
          />
          <input
            type="text"
            name="opponent"
            value={editData.opponent}
            onChange={handleChange}
            placeholder="Opponent Team"
            className="border p-1 rounded flex-1 min-w-[150px]"
          />
          <select
            name="location"
            value={editData.location}
            onChange={handleChange}
            className="border p-1 rounded"
          >
            <option value="Home">Home</option>
            <option value="Away">Away</option>
          </select>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <p className="font-medium">
            {formattedDate} @ {formattedTime}
          </p>
          <p className="text-sm text-gray-700">
            vs <strong>{match.opponent}</strong> — {match.location}
          </p>
        </div>
      )}

      <div className="flex space-x-2 flex-shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(match)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
};

const MatchSchedule = () => {
  const [matches, setMatches] = useState([
    { id: 1, date: "2025-07-10", opponent: "Lions Academy", location: "Home", time: "16:00" },
    { id: 2, date: "2025-07-15", opponent: "Falcons United", location: "Away", time: "14:30" },
  ]);

  const [newMatch, setNewMatch] = useState({
    date: "",
    opponent: "",
    location: "Home",
    time: "",
  });

  const [filterUpcoming, setFilterUpcoming] = useState(true);

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
    setNewMatch({ date: "", opponent: "", location: "Home", time: "" });
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

  const clearAll = () => {
    if (window.confirm("Clear all matches?")) {
      setMatches([]);
    }
  };

  const filteredMatches = filterUpcoming
    ? matches.filter((m) => new Date(`${m.date}T${m.time}`) >= new Date())
    : matches;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Matches</h2>

      <form onSubmit={addMatch} className="mb-6 bg-white p-4 rounded shadow space-y-3 max-w-lg">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="date"
            name="date"
            value={newMatch.date}
            onChange={handleInputChange}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="time"
            name="time"
            value={newMatch.time}
            onChange={handleInputChange}
            className="border p-2 rounded flex-1"
            required
          />
        </div>
        <input
          type="text"
          name="opponent"
          value={newMatch.opponent}
          onChange={handleInputChange}
          placeholder="Opponent Team"
          className="border p-2 rounded w-full"
          required
        />
        <select
          name="location"
          value={newMatch.location}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        >
          <option value="Home">Home</option>
          <option value="Away">Away</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Match
        </button>
      </form>

      <div className="mb-4 flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={filterUpcoming}
            onChange={() => setFilterUpcoming(!filterUpcoming)}
            className="mr-2"
          />
          Show only upcoming matches
        </label>
        <button
          onClick={clearAll}
          className="ml-auto bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Clear All Matches
        </button>
      </div>

      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <p className="text-gray-500">No matches to show.</p>
        ) : (
          filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onDelete={deleteMatch}
              onEdit={editMatch}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MatchSchedule;
