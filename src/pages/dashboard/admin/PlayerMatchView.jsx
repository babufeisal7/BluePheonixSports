import React from 'react';

const PlayerMatchView = ({ darkMode }) => {
  // Sample match data
  const matchData = {
    playerName: "Alex Morgan",
    position: "Forward",
    matchDate: "May 12, 2023",
    opponent: "Chicago Red Stars",
    result: "W 3-1",
    rating: 8.2,
    stats: {
      minutesPlayed: 87,
      goals: 2,
      assists: 1,
      shots: 5,
      shotsOnTarget: 3,
      passes: 42,
      passAccuracy: "85%",
      tackles: 2,
      interceptions: 1,
      distanceCovered: "9.8 km"
    },
    highlights: [
      { time: "23'", event: "Goal", video: true },
      { time: "56'", event: "Assist", video: true },
      { time: "72'", event: "Goal", video: true },
      { time: "81'", event: "Yellow Card", video: false }
    ]
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Match Performance</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {matchData.playerName} • {matchData.position}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm">{matchData.matchDate}</p>
          <p className={`text-lg font-bold ${
            matchData.result.startsWith('W') 
              ? (darkMode ? 'text-green-400' : 'text-green-600') 
              : matchData.result.startsWith('L') 
                ? (darkMode ? 'text-red-400' : 'text-red-600') 
                : (darkMode ? 'text-yellow-400' : 'text-yellow-600')
          }`}>
            {matchData.result} vs {matchData.opponent}
          </p>
        </div>
      </div>

      {/* Performance Rating */}
      <div className={`p-3 rounded-lg mb-4 flex items-center justify-between ${
        darkMode ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <div>
          <p className="text-xs font-medium">Performance Rating</p>
          <p className="text-sm">{matchData.rating}/10</p>
        </div>
        <div className="w-3/4">
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                matchData.rating > 8 
                  ? 'bg-green-500' 
                  : matchData.rating > 6 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              }`} 
              style={{ width: `${matchData.rating * 10}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {Object.entries(matchData.stats).map(([stat, value]) => (
          <div 
            key={stat} 
            className={`p-2 rounded-lg text-center ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <p className="text-xs font-medium capitalize">
              {stat.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-sm font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Match Highlights */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Match Highlights</h3>
        <div className="space-y-2">
          {matchData.highlights.map((highlight, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg flex items-center justify-between ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div>
                <p className="text-sm font-medium">
                  <span className={`px-2 py-1 rounded mr-2 ${
                    highlight.event === "Goal" 
                      ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                      : highlight.event === "Assist"
                        ? (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800')
                        : (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                  }`}>
                    {highlight.time}
                  </span>
                  {highlight.event}
                </p>
              </div>
              {highlight.video && (
                <button className={`px-2 py-1 rounded text-xs ${
                  darkMode 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}>
                  View Clip
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button className={`px-4 py-2 rounded text-sm font-medium ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
        }`}>
          Full Match Report
        </button>
        <button className={`px-4 py-2 rounded text-sm font-medium ${
          darkMode 
            ? 'bg-gray-600 hover:bg-gray-500 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}>
          Compare Performance
        </button>
      </div>
    </div>
  );
};

export default PlayerMatchView;