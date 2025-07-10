import React, { useState } from "react";

const playersData = [
  { id: 1, name: "Alex Morgan", status: "Fit", injury: "None", lastCheckup: "2025-07-01" },
  { id: 2, name: "Jamie Johnson", status: "Injured", injury: "Ankle Sprain", lastCheckup: "2025-06-28" },
  { id: 3, name: "Taylor Smith", status: "Recovering", injury: "Hamstring Strain", lastCheckup: "2025-07-03" },
  { id: 4, name: "Mia Wong", status: "Fit", injury: "None", lastCheckup: "2025-06-25" },
];

const statusColors = {
  Fit: "bg-green-100 text-green-800",
  Injured: "bg-red-100 text-red-800",
  Recovering: "bg-yellow-100 text-yellow-800",
};

const PlayerHealth = () => {
  const [filter, setFilter] = useState("All");

  // Filter players by status
  const filteredPlayers = playersData.filter((p) =>
    filter === "All" ? true : p.status === filter
  );

  // Summary counts
  const summary = {
    Fit: playersData.filter((p) => p.status === "Fit").length,
    Injured: playersData.filter((p) => p.status === "Injured").length,
    Recovering: playersData.filter((p) => p.status === "Recovering").length,
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Player Health Monitoring</h2>
      <p className="text-gray-700 text-center mb-6">
        View medical status, injury reports, and health updates from medic staff.
      </p>

      {/* Filter buttons */}
      <div className="flex justify-center space-x-3 mb-6">
        {["All", "Fit", "Injured", "Recovering"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded font-semibold ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 p-4 rounded text-center">
          <p className="font-semibold text-green-700">Fit</p>
          <p className="text-xl font-bold">{summary.Fit}</p>
        </div>
        <div className="bg-red-50 p-4 rounded text-center">
          <p className="font-semibold text-red-700">Injured</p>
          <p className="text-xl font-bold">{summary.Injured}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded text-center">
          <p className="font-semibold text-yellow-700">Recovering</p>
          <p className="text-xl font-bold">{summary.Recovering}</p>
        </div>
      </div>

      {/* Player health cards */}
      <div className="space-y-4">
        {filteredPlayers.length === 0 ? (
          <p className="text-center text-gray-500">No players found in this category.</p>
        ) : (
          filteredPlayers.map(({ id, name, status, injury, lastCheckup }) => (
            <div
              key={id}
              className="border p-4 rounded shadow flex flex-col space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
                >
                  {status}
                </span>
              </div>
              <p>
                <strong>Injury:</strong> {injury}
              </p>
              <p className="text-sm text-gray-600">
                Last Checkup: {new Date(lastCheckup).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Placeholder for chart/report */}
      <div className="mt-8 p-4 bg-blue-50 rounded shadow text-center text-blue-700 font-semibold">
        Performance & health charts coming soon...
      </div>
    </div>
  );
};

export default PlayerHealth;
