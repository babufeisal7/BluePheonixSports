import React, { useState, useMemo } from "react";
import { FiEye, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

const mockPlayers = [
  {
    id: 1,
    name: "John Doe",
    ageGroup: "U16 - U18",
    position: "Forward",
    sex: "Male",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Alice Smith",
    ageGroup: "U11 - U15",
    position: "Midfielder",
    sex: "Female",
    status: "Injured",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Bob Johnson",
    ageGroup: "Senior",
    position: "Defender",
    sex: "Male",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: 4,
    name: "Sophie Lee",
    ageGroup: "U1 - U10",
    position: "Goalkeeper",
    sex: "Female",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Injured: "bg-red-100 text-red-800",
  Suspended: "bg-yellow-100 text-yellow-800",
};

const PlayersList = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filtering
  const filteredPlayers = useMemo(() => {
    return mockPlayers.filter((player) =>
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      player.ageGroup.toLowerCase().includes(search.toLowerCase()) ||
      player.position.toLowerCase().includes(search.toLowerCase()) ||
      player.sex.toLowerCase().includes(search.toLowerCase()) ||
      player.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Sorting
  const sortedPlayers = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredPlayers, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedPlayers.length / pageSize);
  const pagedPlayers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedPlayers.slice(start, start + pageSize);
  }, [sortedPlayers, currentPage]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-2">Players List</h2>
      <p className="text-gray-600 mb-4">View and manage all players under your sport.</p>

      {/* Search bar */}
      <div className="mb-4 flex items-center space-x-2 max-w-md">
        <FiSearch className="text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search players..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Search players"
        />
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {pagedPlayers.length === 0 ? (
          <p className="text-center text-gray-500">No players found.</p>
        ) : (
          pagedPlayers.map(({ id, name, ageGroup, position, sex, status, avatar }) => (
            <div
              key={id}
              className="border rounded-lg p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={avatar}
                alt={`Profile of ${name}`}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-gray-600">{ageGroup} | {position} | {sex}</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[status] || "bg-gray-100 text-gray-800"
                  }`}
                  aria-label={`Status: ${status}`}
                >
                  {status}
                </span>
              </div>
              <div className="flex flex-col space-y-2 text-xl text-gray-600">
                <button
                  aria-label={`View ${name}`}
                  title="View Player"
                  onClick={() => alert(`View ${name}`)}
                  className="hover:text-blue-600"
                >
                  <FiEye />
                </button>
                <button
                  aria-label={`Edit ${name}`}
                  title="Edit Player"
                  onClick={() => alert(`Edit ${name}`)}
                  className="hover:text-yellow-500"
                >
                  <FiEdit2 />
                </button>
                <button
                  aria-label={`Delete ${name}`}
                  title="Delete Player"
                  onClick={() => window.confirm(`Delete ${name}?`) && alert(`${name} deleted`)}
                  className="hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left">Photo</th>
              {["name", "ageGroup", "position", "sex", "status"].map((key) => (
                <th
                  key={key}
                  className="cursor-pointer select-none py-3 px-4 text-left font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => toggleSort(key)}
                  aria-sort={
                    sortKey === key
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  scope="col"
                >
                  {key === "name" && "Name"}
                  {key === "ageGroup" && "Age Group"}
                  {key === "position" && "Position"}
                  {key === "sex" && "Sex"}
                  {key === "status" && "Status"}
                  {sortKey === key && (
                    <span className="inline-block ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
              <th className="py-3 px-4 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedPlayers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No players found.
                </td>
              </tr>
            )}
            {pagedPlayers.map(({ id, name, ageGroup, position, sex, status, avatar }) => (
              <tr key={id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <img
                    src={avatar}
                    alt={`Profile of ${name}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    loading="lazy"
                  />
                </td>
                <td className="py-3 px-4 font-medium">{name}</td>
                <td className="py-3 px-4">{ageGroup}</td>
                <td className="py-3 px-4">{position}</td>
                <td className="py-3 px-4">{sex}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[status] || "bg-gray-100 text-gray-800"
                    }`}
                    aria-label={`Status: ${status}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`View ${name}`}
                    title="View Player"
                    onClick={() => alert(`View ${name}`)}
                  >
                    <FiEye />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    aria-label={`Edit ${name}`}
                    title="Edit Player"
                    onClick={() => alert(`Edit ${name}`)}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Delete ${name}`}
                    title="Delete Player"
                    onClick={() => window.confirm(`Delete ${name}?`) && alert(`${name} deleted`)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-gray-700">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Previous page"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayersList;
