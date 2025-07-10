import { FiPlusCircle, FiAlertTriangle, FiActivity } from "react-icons/fi";

const InjuryLog = ({ darkMode }) => {
  // Mock data - replace with real data
  const activeInjuries = [
    { player: "John Doe", injury: "Ankle Sprain", daysOut: 5 },
    { player: "Jane Smith", injury: "Hamstring Strain", daysOut: 12 },
    { player: "Mike Johnson", injury: "Shoulder Tendonitis", daysOut: 8 }
  ];

  return (
    <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Injury Log</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          {activeInjuries.length} Active
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Report New Injury Card */}
        <div className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <FiPlusCircle className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className="font-medium text-base sm:text-inherit">Report New Injury</h3>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              New
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-7">Document and track new player injuries</p>
        </div>

        {/* Active Injuries Card */}
        <div className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center mb-2">
            <FiAlertTriangle className={`w-5 h-5 mr-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h3 className="font-medium text-base sm:text-inherit">Active Injuries</h3>
          </div>
          
          <div className="space-y-2 mt-3">
            {activeInjuries.map((injury, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <div>
                  <p className="text-sm font-medium">{injury.player}</p>
                  <p className="text-xs text-gray-500">{injury.injury}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${injury.daysOut > 10 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                  {injury.daysOut}d
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Progress Card */}
        <div className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center mb-2">
            <FiActivity className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className="font-medium text-base sm:text-inherit">Recovery Progress</h3>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Overall Recovery</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                style={{ width: '75%' }}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2 rounded bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30">
                <p className="text-xs text-gray-500 dark:text-gray-300">On Track</p>
                <p className="font-bold text-sm">2</p>
              </div>
              <div className="p-2 rounded bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-30">
                <p className="text-xs text-gray-500 dark:text-gray-300">Delayed</p>
                <p className="font-bold text-sm">1</p>
              </div>
              <div className="p-2 rounded bg-green-50 dark:bg-green-900 dark:bg-opacity-30">
                <p className="text-xs text-gray-500 dark:text-gray-300">Cleared</p>
                <p className="font-bold text-sm">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InjuryLog;