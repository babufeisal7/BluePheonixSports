import { FiAward, FiActivity, FiTrendingUp, FiHeart } from "react-icons/fi";
import { Outlet, Link } from "react-router-dom";

const PlayerDashboard = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-6">Player Dashboard</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          to="training"
          className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'}`}
        >
          <FiActivity className="inline mr-2" /> Training
        </Link>
        <Link
          to="matches"
          className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-100 hover:bg-purple-200'}`}
        >
          <FiTrendingUp className="inline mr-2" /> Matches
        </Link>
        <Link
          to="health"
          className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-100 hover:bg-green-200'}`}
        >
          <FiHeart className="inline mr-2" /> Health
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PlayerDashboard;