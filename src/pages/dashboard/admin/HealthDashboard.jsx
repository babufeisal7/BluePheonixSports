import { FiTrendingUp, FiDroplet, FiPill } from "react-icons/fi";

const HealthDashboard = ({ darkMode }) => {
  // Mock data - replace with real data
  const wellnessData = { score: 82, trend: 'up' };
  const healthMetrics = { hrv: 65, sleep: 7.5 };
  const medications = { active: 2, total: 5 };

  return (
    <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Health Dashboard</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Updated Today
        </span>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Wellness Card */}
        <div className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <FiTrendingUp className={`w-4 h-4 ${wellnessData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <h3 className="font-medium text-base sm:text-inherit">Player Wellness</h3>
            </div>
            <span className={`text-sm font-bold ${wellnessData.score > 75 ? 'text-green-500' : 'text-yellow-500'}`}>
              {wellnessData.score}%
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-11">Daily wellness survey results</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-green-400" 
              style={{ width: `${wellnessData.score}%` }}
            ></div>
          </div>
        </div>

        {/* Health Metrics Card */}
        <div className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center mb-1">
            <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <FiDroplet className="w-4 h-4 text-purple-500" />
            </div>
            <h3 className="font-medium text-base sm:text-inherit">Health Metrics</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-11">HRV, sleep, and other health data</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="text-center p-2 rounded bg-opacity-20 bg-purple-500">
              <p className="text-xs text-gray-500">HRV</p>
              <p className="font-bold text-sm">{healthMetrics.hrv} ms</p>
            </div>
            <div className="text-center p-2 rounded bg-opacity-20 bg-blue-500">
              <p className="text-xs text-gray-500">Sleep</p>
              <p className="font-bold text-sm">{healthMetrics.sleep} hrs</p>
            </div>
          </div>
        </div>

        {/* Medications Card */}
        <div className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                <FiPill className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="font-medium text-base sm:text-inherit">Medication Records</h3>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              {medications.active} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-11">Track prescribed medications</p>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <span>{medications.total} total prescriptions</span>
            <span className="mx-2">•</span>
            <span>3 due today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;