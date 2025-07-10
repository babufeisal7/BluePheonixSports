import React from "react";

const dummyData = [
  {
    playerName: "John Doe",
    team: "Rugby",
    injury: "Knee Sprain",
    status: "Under Treatment",
    lastUpdated: "2025-07-05",
    updatedBy: "Medic Alex",
  },
  {
    playerName: "Sarah Kim",
    team: "Football",
    injury: "Concussion",
    status: "Cleared",
    lastUpdated: "2025-07-03",
    updatedBy: "Medic Rita",
  },
];

const MedicalMonitor = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🩺 Player Medical Monitor</h2>
      <p className="text-gray-600 mb-6">
        Track ongoing injuries and health updates from the medic team.
      </p>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-left">Injury</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Updated By</th>
              <th className="px-4 py-2 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((entry, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{entry.playerName}</td>
                <td className="px-4 py-2">{entry.team}</td>
                <td className="px-4 py-2">{entry.injury}</td>
                <td className="px-4 py-2">{entry.status}</td>
                <td className="px-4 py-2">{entry.updatedBy}</td>
                <td className="px-4 py-2">{entry.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {dummyData.map((entry, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 rounded-lg p-4 shadow"
          >
            <div className="mb-2">
              <span className="font-semibold">Player: </span>
              <span>{entry.playerName}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Team: </span>
              <span>{entry.team}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Injury: </span>
              <span>{entry.injury}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status: </span>
              <span>{entry.status}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Updated By: </span>
              <span>{entry.updatedBy}</span>
            </div>
            <div>
              <span className="font-semibold">Last Updated: </span>
              <span>{entry.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalMonitor;
