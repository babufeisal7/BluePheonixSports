import { FiClipboard, FiActivity, FiVideo } from "react-icons/fi";
import { Outlet, Link } from "react-router-dom";

const CoachDashboard = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? "text-white" : "text-gray-800"} max-w-4xl mx-auto p-4 sm:p-6`}>
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Coach Dashboard</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-6 justify-center sm:justify-start">
        <Link
          to="training"
          className={`px-4 py-2 rounded-lg text-center sm:text-left w-full sm:w-auto ${
            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-100 hover:bg-blue-200"
          } flex items-center justify-center sm:justify-start gap-2`}
        >
          <FiActivity /> Training Tools
        </Link>
        <Link
          to="matches"
          className={`px-4 py-2 rounded-lg text-center sm:text-left w-full sm:w-auto ${
            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-100 hover:bg-blue-200"
          } flex items-center justify-center sm:justify-start gap-2`}
        >
          <FiVideo /> Match Tools
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default CoachDashboard;
