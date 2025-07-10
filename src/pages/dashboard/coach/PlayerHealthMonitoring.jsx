export const PlayerHealthDashboard = ({ darkMode }) => {
  const players = [
    { id: 1, name: "Alex Morgan", status: "Fit", lastCheckup: "2023-05-15", injury: "None" },
    { id: 2, name: "Jamie Johnson", status: "Injured", lastCheckup: "2023-05-10", injury: "Ankle sprain" },
    { id: 3, name: "Taylor Smith", status: "Recovering", lastCheckup: "2023-05-12", injury: "Hamstring strain" },
  ];

  return (
    <div className={`p-6 rounded-lg shadow-md max-w-xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
        Player Health Overview
      </h2>

      {/* Mobile card list */}
      <div className="space-y-4 md:hidden">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
          >
            <h3 className="font-semibold">{player.name}</h3>
            <p>
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  player.status === "Fit"
                    ? "bg-green-100 text-green-800"
                    : player.status === "Injured"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {player.status}
              </span>
            </p>
            <p>Last Checkup: {player.lastCheckup}</p>
            <p>Injury: {player.injury}</p>
            <button
              className={`mt-2 px-3 py-1 rounded-md ${
                darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <th className="p-3 text-left">Player</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Last Checkup</th>
              <th className="p-3 text-left">Injury</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-t">
                <td className="p-3">{player.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      player.status === "Fit"
                        ? "bg-green-100 text-green-800"
                        : player.status === "Injured"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {player.status}
                  </span>
                </td>
                <td className="p-3">{player.lastCheckup}</td>
                <td className="p-3">{player.injury}</td>
                <td className="p-3">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
          <h3 className="font-medium mb-2">Fit Players</h3>
          <p className="text-2xl font-bold">18</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-yellow-50"}`}>
          <h3 className="font-medium mb-2">Recovering</h3>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-50"}`}>
          <h3 className="font-medium mb-2">Injured</h3>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>
    </div>
  );
};
