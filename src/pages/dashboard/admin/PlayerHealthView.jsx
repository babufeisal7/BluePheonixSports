import React from 'react';

const PlayerHealthView = ({ darkMode }) => {
  // Sample player health data
  const playerHealth = {
    name: "Alex Morgan",
    position: "Forward",
    status: "Active",
    lastInjury: "None (45 days)",
    fitnessLevel: 92,
    heartRate: "64 bpm (resting)",
    hydration: "Optimal",
    nextCheckup: "May 15, 2023",
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Player Health</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {playerHealth.name} • {playerHealth.position}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          playerHealth.status === "Active" 
            ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') 
            : (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
        }`}>
          {playerHealth.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs font-medium mb-1">Fitness Level</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                playerHealth.fitnessLevel > 75 
                  ? 'bg-green-500' 
                  : playerHealth.fitnessLevel > 50 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              }`} 
              style={{ width: `${playerHealth.fitnessLevel}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{playerHealth.fitnessLevel}%</p>
        </div>

        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs font-medium mb-1">Heart Rate</p>
          <p className="text-lg font-semibold">{playerHealth.heartRate}</p>
        </div>

        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs font-medium mb-1">Hydration</p>
          <p className="text-lg font-semibold">{playerHealth.hydration}</p>
        </div>

        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs font-medium mb-1">Last Injury</p>
          <p className="text-sm">{playerHealth.lastInjury}</p>
        </div>
      </div>

      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
        <p className="text-xs font-medium mb-1">Next Checkup</p>
        <p className="text-sm">{playerHealth.nextCheckup}</p>
      </div>

      <div className="flex space-x-2">
        <button className={`px-3 py-2 rounded text-sm font-medium ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
        }`}>
          View Full Report
        </button>
        <button className={`px-3 py-2 rounded text-sm font-medium ${
          darkMode 
            ? 'bg-gray-600 hover:bg-gray-500 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}>
          Log Treatment
        </button>
      </div>
    </div>
  );
};

export default PlayerHealthView;