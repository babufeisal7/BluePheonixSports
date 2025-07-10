import { FiClipboard, FiBarChart2, FiClock, FiVideo, FiUsers, FiSettings } from "react-icons/fi";

const MatchTools = ({ darkMode }) => {
  // Mock data - replace with real data
  const upcomingMatches = [
    { opponent: "City FC", date: "Tomorrow", time: "15:00" },
    { opponent: "United SC", date: "Sat", time: "19:30" }
  ];

  const tools = [
    { icon: <FiClipboard size={18} />, name: "Tactics", color: "blue" },
    { icon: <FiBarChart2 size={18} />, name: "Analysis", color: "purple" },
    { icon: <FiClock size={18} />, name: "Timeline", color: "orange" },
    { icon: <FiVideo size={18} />, name: "Video", color: "red" },
    { icon: <FiUsers size={18} />, name: "Opposition", color: "green" },
    { icon: <FiSettings size={18} />, name: "Settings", color: "gray" }
  ];

  return (
    <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Match Tools</h2>
          <p className="text-xs sm:text-sm text-gray-500">Tactical board and opposition analysis</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Updated
        </span>
      </div>

      {/* Upcoming Matches */}
      <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <FiClock className="mr-2" /> Upcoming Matches
        </h3>
        <div className="space-y-2">
          {upcomingMatches.map((match, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="font-medium">{match.opponent}</span>
              <span className="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded">
                {match.date} {match.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {tools.map((tool, index) => (
          <button
            key={index}
            className={`p-2 sm:p-3 rounded-lg flex flex-col items-center transition-all
              ${darkMode ? 
                `hover:bg-gray-700 bg-gray-800` : 
                `hover:bg-${tool.color}-50 bg-white`}
              border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className={`p-2 rounded-full mb-1 bg-${tool.color}-100 text-${tool.color}-600 dark:bg-${tool.color}-900 dark:text-${tool.color}-300`}>
              {tool.icon}
            </div>
            <span className="text-xs sm:text-sm font-medium">{tool.name}</span>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button className={`flex-1 text-xs sm:text-sm py-2 px-3 rounded-lg 
          ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
          Pre-match Report
        </button>
        <button className={`flex-1 text-xs sm:text-sm py-2 px-3 rounded-lg 
          ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} `}>
          Share
        </button>
      </div>
    </div>
  );
};

export default MatchTools;