import { FiHeart, FiPlusSquare, FiMenu, FiBell, FiUser, FiCalendar } from "react-icons/fi";
import { Outlet, Link } from "react-router-dom";

const MedicDashboard = ({ darkMode }) => {
  // Mock data - replace with real data
  const notifications = 3;
  const upcomingAppointments = [
    { player: "John Doe", time: "10:30 AM", type: "Follow-up" },
    { player: "Jane Smith", time: "2:15 PM", type: "Injury Assessment" }
  ];

  return (
    <div className={`${darkMode ? 'text-white bg-gray-900' : 'text-gray-800 bg-gray-50'} min-h-screen`}>
      {/* Header */}
      <div className={`p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <FiUser className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className="text-xl sm:text-2xl font-bold">Medic Center</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="relative p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500">
              <FiBell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="sm:hidden p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500">
              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-2">
          <Link
            to="injuries"
            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center justify-center
              ${darkMode ? 
                'bg-gray-700 hover:bg-gray-600' : 
                'bg-red-100 hover:bg-red-200 text-red-800'}
              transition-colors`}
          >
            <FiPlusSquare className="mr-2" /> 
            <span className="text-sm sm:text-base">Injury Log</span>
          </Link>
          <Link
            to="health"
            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center justify-center
              ${darkMode ? 
                'bg-gray-700 hover:bg-gray-600' : 
                'bg-green-100 hover:bg-green-200 text-green-800'}
              transition-colors`}
          >
            <FiHeart className="mr-2" /> 
            <span className="text-sm sm:text-base">Health Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className={`p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-4 shadow-sm`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center">
            <FiCalendar className="mr-2" /> Today's Appointments
          </h2>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {upcomingAppointments.length} Scheduled
          </span>
        </div>
        
        <div className="space-y-3">
          {upcomingAppointments.map((appt, index) => (
            <div key={index} className={`p-3 rounded-lg flex justify-between items-center
              ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
              <div>
                <p className="font-medium">{appt.player}</p>
                <p className="text-xs text-gray-500">{appt.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                {appt.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MedicDashboard;