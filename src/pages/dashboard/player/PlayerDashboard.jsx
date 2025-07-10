import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaHeartbeat,
  FaFutbol,
  FaRunning,
  FaComments,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaArrowLeft,
  FaBars,
  FaTimes
} from "react-icons/fa";

const playerProfile = {
  name: "Michael Otieno",
  role: "Midfielder - Blue Phoenix FC",
  avatar: "/public/coach3.jpg",
  position: "Midfielder",
  age: 20,
  contact: "m.otieno@bluephoenix.com",
  teams: ["Football", "Swimming"],
  stats: {
    matchesPlayed: 24,
    goalsScored: 12,
    fitnessScore: 89,
  }
};

const features = [
  { name: "Performance", path: "training-tracker", icon: <FaChartLine />, description: "View your performance metrics." },
  { name: "Training Schedule", path: "training-schedule", icon: <FaRunning />, description: "See upcoming training sessions." },
  { name: "Match Assignments", path: "match-assignments", icon: <FaFutbol />, description: "View upcoming matches." },
  { name: "Health & Wellness", path: "my-health", icon: <FaHeartbeat />, description: "Access fitness & recovery data." },
  { name: "Messages", path: "messages", icon: <FaComments />, description: "Chat with your coaches or teammates." },
];

const PlayerDashboard = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/dashboard/player";
  const isProfile = location.pathname.includes("my-profile");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => isMobile && setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 relative">
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 bg-blue-900 text-white p-4 flex justify-between items-center z-30 shadow-md">
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-blue-700 transition-colors">
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-xl font-bold">Player Dashboard</h1>
          <div className="w-8"></div>
        </header>
      )}

      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform transition-transform duration-300 ease-in-out w-64 bg-blue-900 text-white p-6 flex flex-col fixed md:sticky top-0 h-screen z-20`}>
        {isMobile && (
          <button onClick={toggleSidebar} className="absolute top-4 right-4 p-1 rounded-md hover:bg-blue-700 transition-colors">
            <FaTimes className="text-xl" />
          </button>
        )}

        <div className="flex items-center gap-4 mb-8 mt-4 md:mt-0">
          <img src={playerProfile.avatar} alt={playerProfile.name} className="w-12 h-12 rounded-full object-cover border-2 border-white" />
          <div>
            <h2 className="text-xl font-bold">{playerProfile.name}</h2>
            <p className="text-sm text-blue-200">{playerProfile.role}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-lg flex-1 overflow-y-auto">
          <Link to="my-profile" onClick={closeSidebar} className={`flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors ${isProfile ? "bg-blue-700" : ""}`}>
            <FaUserCircle /> My Profile
          </Link>

          {features.map(({ name, path, icon }) => (
            <Link to={path} key={name} onClick={closeSidebar} className={`flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors ${location.pathname.includes(path) ? "bg-blue-700" : ""}`}>
              {icon} {name}
            </Link>
          ))}

          <Link to="/settings" onClick={closeSidebar} className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors">
            <FaCog /> Settings
          </Link>

          <Link to="/logout" onClick={closeSidebar} className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors text-red-200 hover:text-red-100">
            <FaSignOutAlt /> Logout
          </Link>

          <div className="pt-4 text-sm text-blue-300 select-none">
            &copy; {new Date().getFullYear()} Blue Phoenix Sports
          </div>
        </nav>
      </aside>

      <main className={`flex-1 p-4 md:p-6 lg:p-8 overflow-auto ${isMobile ? 'pt-20' : ''}`}>
        {!isRoot && !isProfile && (
          <Link to="/dashboard/player" className="flex items-center gap-2 text-blue-600 mb-4 md:mb-6">
            <FaArrowLeft /> Back to Dashboard
          </Link>
        )}

        {!isProfile && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900">
              Welcome, <span className="text-blue-600">{playerProfile.name.split(" ")[0]}</span>
            </h1>
            <div className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-lg shadow-sm w-full md:w-auto">
              <img src={playerProfile.avatar} alt={playerProfile.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">{playerProfile.position}</h3>
                <p className="text-xs md:text-sm text-gray-600">{playerProfile.contact}</p>
              </div>
            </div>
          </div>
        )}

        {isRoot && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <StatCard title="Matches Played" value={playerProfile.stats.matchesPlayed} icon={<FaFutbol className="text-green-500" />} />
              <StatCard title="Goals Scored" value={playerProfile.stats.goalsScored} icon={<FaChartLine className="text-blue-500" />} />
              <StatCard title="Fitness Score" value={`${playerProfile.stats.fitnessScore}%`} icon={<FaHeartbeat className="text-red-500" />} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {features.map(({ name, path, icon, description }) => (
                <Link to={path} key={name} onClick={closeSidebar} className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition hover:-translate-y-1">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-xl md:text-2xl text-blue-600">{icon}</div>
                    <div>
                      <h2 className="font-semibold text-base md:text-lg">{name}</h2>
                      <p className="text-xs md:text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className={!isRoot ? "bg-white rounded-lg shadow-md p-4 md:p-6" : ""}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-4 md:p-6 flex items-start gap-3 md:gap-4">
    <div className="p-2 md:p-3 bg-blue-50 rounded-full text-blue-600">{icon}</div>
    <div>
      <h3 className="text-xs md:text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default PlayerDashboard;
