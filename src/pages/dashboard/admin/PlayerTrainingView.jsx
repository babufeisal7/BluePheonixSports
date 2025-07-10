import React from 'react';

const PlayerTrainingView = ({ darkMode }) => {
  // Sample training data
  const trainingData = {
    playerName: "Alex Morgan",
    position: "Forward",
    currentProgram: "Striker Intensive Week 3",
    nextSession: "Tomorrow, 9:00 AM",
    progress: 65,
    recentSessions: [
      { date: "May 15", type: "Finishing", duration: "90 min", intensity: "High", rating: 4.5 },
      { date: "May 13", type: "Strength", duration: "75 min", intensity: "Medium", rating: 4.0 },
      { date: "May 11", type: "Tactical", duration: "105 min", intensity: "High", rating: 4.2 },
    ],
    upcomingSessions: [
      { date: "May 17", type: "Speed Drills", focus: "Acceleration" },
      { date: "May 18", type: "Match Simulation", focus: "Positioning" },
      { date: "May 20", type: "Recovery", focus: "Flexibility" },
    ],
    keyMetrics: {
      sprint: "7.2s (30m)",
      endurance: "12.8 km/h avg",
      strength: "85% max",
      recovery: "92% optimal"
    }
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} shadow-md`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Training Program</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {trainingData.playerName} • {trainingData.position}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
        }`}>
          {trainingData.currentProgram}
        </div>
      </div>

      {/* Progress and Next Session */}
      <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Program Progress</p>
          <p className="text-sm font-semibold">{trainingData.progress}%</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              trainingData.progress > 75 
                ? 'bg-green-500' 
                : trainingData.progress > 50 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`} 
            style={{ width: `${trainingData.progress}%` }}
          ></div>
        </div>
        <p className="text-xs mt-2">
          Next session: <span className="font-medium">{trainingData.nextSession}</span>
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(trainingData.keyMetrics).map(([metric, value]) => (
          <div 
            key={metric} 
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          >
            <p className="text-xs font-medium capitalize">{metric}</p>
            <p className="text-sm font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Sessions */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Recent Sessions</h3>
        <div className="space-y-2">
          {trainingData.recentSessions.map((session, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">{session.type}</p>
                  <p className="text-xs">{session.date} • {session.duration}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-1 rounded mr-2 ${
                    session.intensity === "High" 
                      ? (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                      : (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                  }`}>
                    {session.intensity}
                  </span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm ml-1">{session.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
        <div className="space-y-2">
          {trainingData.upcomingSessions.map((session, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg flex justify-between items-center ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div>
                <p className="text-sm font-medium">{session.type}</p>
                <p className="text-xs">{session.date} • Focus: {session.focus}</p>
              </div>
              <button className={`px-2 py-1 rounded text-xs ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}>
                Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button className={`px-4 py-2 rounded text-sm font-medium ${
          darkMode 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-green-100 hover:bg-green-200 text-green-800'
        }`}>
          Log Today's Session
        </button>
        <button className={`px-4 py-2 rounded text-sm font-medium ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
        }`}>
          View Full Program
        </button>
      </div>
    </div>
  );
};

export default PlayerTrainingView;