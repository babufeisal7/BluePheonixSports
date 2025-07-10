import React from 'react';

const TrainingToolsMobile = ({ darkMode }) => {
  return (
    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <h2 className="text-lg font-semibold mb-3">Training Tools</h2>
      <div className="space-y-3">
        {/* Session Planner Card */}
        <div 
          className={`p-3 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} active:scale-[0.98] transition-transform`}
          onClick={() => console.log('Session Planner clicked')}
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-base">Session Planner</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Drag and drop interface for creating training sessions
              </p>
            </div>
          </div>
        </div>

        {/* Drill Library Card */}
        <div 
          className={`p-3 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} active:scale-[0.98] transition-transform`}
          onClick={() => console.log('Drill Library clicked')}
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-base">Drill Library</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Collection of drills with video demonstrations
              </p>
            </div>
          </div>
        </div>

        {/* Player Performance Card */}
        <div 
          className={`p-3 rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} active:scale-[0.98] transition-transform`}
          onClick={() => console.log('Player Performance clicked')}
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-base">Player Performance</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Analytics and metrics for each player
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingToolsMobile;