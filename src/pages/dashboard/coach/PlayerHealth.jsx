import React, { useState, useEffect } from "react";
import { 
  FaUser, 
  FaUserInjured, 
  FaUserCheck, 
  FaUserClock, 
  FaChartLine, 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaCalendarAlt,
  FaNotesMedical,
  FaClipboardList
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample player data with more details
const playersData = [
  { 
    id: 1, 
    name: "Alex Morgan", 
    position: "Forward",
    status: "Fit", 
    injury: "None", 
    lastCheckup: "2025-07-01",
    recoveryProgress: 100,
    nextCheckup: "2025-08-01",
    medicalNotes: "No issues reported. Maintaining peak condition.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  { 
    id: 2, 
    name: "Jamie Johnson", 
    position: "Midfielder",
    status: "Injured", 
    injury: "Ankle Sprain (Grade 2)", 
    lastCheckup: "2025-06-28",
    recoveryProgress: 35,
    nextCheckup: "2025-07-15",
    medicalNotes: "Limited mobility. Physical therapy 3x/week. No contact drills.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  { 
    id: 3, 
    name: "Taylor Smith", 
    position: "Defender",
    status: "Recovering", 
    injury: "Hamstring Strain", 
    lastCheckup: "2025-07-03",
    recoveryProgress: 75,
    nextCheckup: "2025-07-20",
    medicalNotes: "Light training approved. Monitor for any discomfort.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  { 
    id: 4, 
    name: "Mia Wong", 
    position: "Goalkeeper",
    status: "Fit", 
    injury: "None", 
    lastCheckup: "2025-06-25",
    recoveryProgress: 100,
    nextCheckup: "2025-07-25",
    medicalNotes: "Regular checkup showed excellent condition.",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  { 
    id: 5, 
    name: "Jordan Lee", 
    position: "Midfielder",
    status: "Injured", 
    injury: "ACL Tear", 
    lastCheckup: "2025-06-10",
    recoveryProgress: 15,
    nextCheckup: "2025-07-10",
    medicalNotes: "Post-surgery recovery. Long-term rehabilitation program.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  { 
    id: 6, 
    name: "Casey Williams", 
    position: "Forward",
    status: "Recovering", 
    injury: "Concussion", 
    lastCheckup: "2025-07-05",
    recoveryProgress: 90,
    nextCheckup: "2025-07-12",
    medicalNotes: "Final evaluation before full clearance expected next week.",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg"
  },
];

// Status configuration with icons and colors
const statusConfig = {
  Fit: {
    color: "bg-green-100 text-green-800",
    icon: <FaUserCheck className="text-green-500" />,
    chartColor: "#10B981"
  },
  Injured: {
    color: "bg-red-100 text-red-800",
    icon: <FaUserInjured className="text-red-500" />,
    chartColor: "#EF4444"
  },
  Recovering: {
    color: "bg-yellow-100 text-yellow-800",
    icon: <FaUserClock className="text-yellow-500" />,
    chartColor: "#F59E0B"
  }
};

// Chart data preparation
const prepareChartData = (players) => {
  const positions = [...new Set(players.map(p => p.position))];
  
  return positions.map(position => {
    const positionPlayers = players.filter(p => p.position === position);
    return {
      position,
      Fit: positionPlayers.filter(p => p.status === "Fit").length,
      Injured: positionPlayers.filter(p => p.status === "Injured").length,
      Recovering: positionPlayers.filter(p => p.status === "Recovering").length,
    };
  });
};

const PlayerHealth = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "Forward",
    status: "Fit",
    injury: "None",
    lastCheckup: new Date().toISOString().split('T')[0]
  });

  // Initialize chart data
  useEffect(() => {
    setChartData(prepareChartData(playersData));
  }, []);

  // Filter players by status and search term
  const filteredPlayers = playersData.filter((player) => {
    const matchesFilter = filter === "All" ? true : player.status === filter;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         player.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Summary counts
  const summary = {
    Fit: playersData.filter((p) => p.status === "Fit").length,
    Injured: playersData.filter((p) => p.status === "Injured").length,
    Recovering: playersData.filter((p) => p.status === "Recovering").length,
    Total: playersData.length
  };

  // Handle adding new player (simulated)
  const handleAddPlayer = (e) => {
    e.preventDefault();
    // In a real app, you would add to your database/state management
    alert(`New player ${newPlayer.name} would be added to the system`);
    setShowAddForm(false);
    setNewPlayer({
      name: "",
      position: "Forward",
      status: "Fit",
      injury: "None",
      lastCheckup: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaNotesMedical className="mr-2 text-blue-600" />
            Player Health Monitoring
          </h2>
          <p className="text-gray-600 mt-1">
            Comprehensive medical status, injury reports, and health analytics
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Player
        </button>
      </div>

      {/* Add Player Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Player</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddPlayer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Forward">Forward</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Defender">Defender</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newPlayer.status}
                  onChange={(e) => setNewPlayer({...newPlayer, status: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Fit">Fit</option>
                  <option value="Injured">Injured</option>
                  <option value="Recovering">Recovering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Injury</label>
                <input
                  type="text"
                  value={newPlayer.injury}
                  onChange={(e) => setNewPlayer({...newPlayer, injury: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Checkup</label>
                <input
                  type="date"
                  value={newPlayer.lastCheckup}
                  onChange={(e) => setNewPlayer({...newPlayer, lastCheckup: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search players by name or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Fit", "Injured", "Recovering"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {status !== "All" && (
                <span className="mr-2">
                  {statusConfig[status]?.icon || <FaUser />}
                </span>
              )}
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-green-800">Fit Players</p>
              <p className="text-2xl font-bold">{summary.Fit}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaUserCheck className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">
            {Math.round((summary.Fit / summary.Total) * 100)}% of squad
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-red-800">Injured Players</p>
              <p className="text-2xl font-bold">{summary.Injured}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaUserInjured className="text-red-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2">
            {Math.round((summary.Injured / summary.Total) * 100)}% of squad
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-yellow-800">Recovering</p>
              <p className="text-2xl font-bold">{summary.Recovering}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaUserClock className="text-yellow-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            {Math.round((summary.Recovering / summary.Total) * 100)}% of squad
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Players</p>
              <p className="text-2xl font-bold">{summary.Total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaClipboardList className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Current roster size
          </p>
        </div>
      </div>

      {/* Health Statistics Chart */}
      <div className="bg-white border rounded-lg shadow-sm p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FaChartLine className="mr-2 text-blue-600" />
            Health Status by Position
          </h3>
          <div className="flex space-x-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Fit</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span>Recovering</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Injured</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="position" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Fit" fill="#10B981" name="Fit" />
              <Bar dataKey="Recovering" fill="#F59E0B" name="Recovering" />
              <Bar dataKey="Injured" fill="#EF4444" name="Injured" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Player Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredPlayers.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No players match your search criteria</p>
            <button 
              onClick={() => { setFilter("All"); setSearchTerm(""); }}
              className="mt-2 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <div
              key={player.id}
              className={`border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer ${
                selectedPlayer?.id === player.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.position}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${
                          statusConfig[player.status].color
                        }`}
                      >
                        {statusConfig[player.status].icon}
                        <span className="ml-1">{player.status}</span>
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">
                        <span className="font-medium">Injury:</span> {player.injury}
                      </p>
                      <p className="text-sm mt-1 flex items-center">
                        <FaCalendarAlt className="mr-1 text-gray-400" />
                        <span className="text-gray-600">
                          Last check: {new Date(player.lastCheckup).toLocaleDateString()}
                        </span>
                      </p>
                      {player.status !== "Fit" && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Recovery Progress</span>
                            <span>{player.recoveryProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                player.status === "Injured" ? "bg-red-500" : "bg-yellow-500"
                              }`}
                              style={{ width: `${player.recoveryProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Player Detail Panel */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedPlayer.name}</h3>
                <p className="text-gray-600">{selectedPlayer.position}</p>
              </div>
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <img
                  src={selectedPlayer.avatar}
                  alt={selectedPlayer.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100"
                />
                <div className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      statusConfig[selectedPlayer.status].color
                    }`}
                  >
                    {selectedPlayer.status}
                  </span>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Injury</p>
                    <p className="font-semibold">{selectedPlayer.injury}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Last Checkup</p>
                    <p className="font-semibold">
                      {new Date(selectedPlayer.lastCheckup).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Next Checkup</p>
                    <p className="font-semibold">
                      {new Date(selectedPlayer.nextCheckup).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedPlayer.status !== "Fit" && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Recovery Progress</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              selectedPlayer.status === "Injured" ? "bg-red-500" : "bg-yellow-500"
                            }`}
                            style={{ width: `${selectedPlayer.recoveryProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">
                          {selectedPlayer.recoveryProgress}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Medical Notes</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedPlayer.medicalNotes}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Update Status
                  </button>
                  <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
                    View Full History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerHealth;