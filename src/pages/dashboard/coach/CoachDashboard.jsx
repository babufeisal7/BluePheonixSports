import React, { useState, useEffect } from "react";
import { 
  FiHome,
  FiUsers,
  FiCalendar,
  FiMail,
  FiAward,
  FiFileText,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX
} from "react-icons/fi";
import { 
  FaHeartbeat, 
  FaDumbbell, 
  FaComments, 
  FaFolderOpen, 
  FaCalendarAlt,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

// Mock coach profile data
const coachProfile = {
  name: "Coach Michael Brown",
  role: "Head Football Coach",
  avatar: "/public/coach2.jpg",
  specialty: "Tactical Strategy & Player Development",
  yearsExperience: 8,
  contact: "michael.b@bluephoenix.com",
  teams: ["Senior Football", "U21 Football"],
  stats: {
    totalPlayers: 24,
    upcomingMatches: 3,
    trainingSessions: 12,
    messages: 5
  }
};

const features = [
  { name: "Player Management", path: "players", icon: <FiUsers />, description: "Manage all player profiles and data" },
  { name: "Training Plans", path: "training-plans", icon: <FaDumbbell />, description: "Create and assign training sessions" },
  { name: "Match Schedule", path: "match-schedule", icon: <FiCalendar />, description: "View and manage upcoming matches" },
  { name: "Player Health", path: "player-health", icon: <FaHeartbeat />, description: "Monitor player fitness and injuries" },
  { name: "Performance Analysis", path: "performance", icon: <FiActivity />, description: "Player stats and analytics" },
  { name: "Feedback", path: "feedback", icon: <FaComments />, description: "Provide player feedback" },
  { name: "Messages", path: "messages", icon: <FiMail />, description: "Team communications" },
  { name: "Resources", path: "resources", icon: <FaFolderOpen />, description: "Training materials and guides" },
  { name: "Achievements", path: "achievements", icon: <FiAward />, description: "Team and player awards" },
  { name: "Reports", path: "reports", icon: <FiFileText />, description: "Generate performance reports" },
];

const CoachDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we are on root dashboard or profile page
  const isRoot = location.pathname === "/dashboard/coach" || location.pathname === "/dashboard/coach/";
  const isProfile = location.pathname.includes("profile");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-blue-900 text-white">
        <button onClick={toggleSidebar} className="text-white p-1">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-lg font-bold">Coach Dashboard</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </header>
{/* Sidebar - Mobile overlay */}
<aside className={`${sidebarOpen ? "fixed inset-0 z-50 md:relative" : "hidden"} bg-blue-900 text-white p-6 flex flex-col md:w-64 md:block md:sticky md:top-0 md:h-screen overflow-y-auto`}>
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-4">
      <img 
        src={coachProfile.avatar} 
        alt={coachProfile.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-white"
      />
      <div>
        <h2 className="text-xl font-bold line-clamp-1">{coachProfile.name.split(' ')[0]}</h2>
        <p className="text-xs text-blue-200">{coachProfile.role}</p>
      </div>
    </div>
    <button 
      onClick={toggleSidebar}
      className="text-white p-1 rounded hover:bg-blue-700 md:hidden"
    >
      <FiX size={20} />
    </button>
  </div>

  {/* Navigation */}
  <nav className="flex-1 flex flex-col gap-1">
    {/* Dashboard Home */}
    <NavLink
      to=""
      end
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
          isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700"
        }`
      }
    >
      <FiHome className="text-lg" />
      Dashboard
    </NavLink>

    {/* Features (first 6) */}
    {features.slice(0, 6).map(({ name, path, icon }) => (
      <NavLink
        key={name}
        to={path}
        onClick={closeSidebar}
        className={({ isActive }) =>
          `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
            isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700"
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </NavLink>
    ))}

    {/* Divider */}
    <div className="pt-4 border-t border-blue-700" />

    {/* Features (remaining) */}
    {features.slice(6).map(({ name, path, icon }) => (
      <NavLink
        key={name}
        to={path}
        onClick={closeSidebar}
        className={({ isActive }) =>
          `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
            isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700"
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </NavLink>
    ))}

    {/* Profile and Settings */}
    <NavLink
      to="profile"
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
          isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700"
        }`
      }
    >
      <FiUser className="text-lg" />
      My Profile
    </NavLink>
    <NavLink
      to="settings"
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
          isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700"
        }`
      }
    >
      <FiSettings className="text-lg" />
      Settings
    </NavLink>

    {/* Logout */}
    <NavLink
      to="logout"
      onClick={closeSidebar}
      className={`flex items-center gap-3 py-2 px-3 rounded-md transition-colors hover:bg-blue-700 text-red-200 hover:text-red-100`}
    >
      <FiLogOut className="text-lg" />
      Logout
    </NavLink>

    {/* Footer text */}
    <div className="pt-4 text-sm text-blue-300 select-none">
      &copy; {new Date().getFullYear()} Blue Phoenix Sports
    </div>
  </nav>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Back button (only show if not on dashboard root or profile) */}
        {!isRoot && !isProfile && (
          <button 
            onClick={() => navigate("/dashboard/coach")} 
            className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
        )}

        {/* Profile Header (hide on profile page) */}
        {!isProfile && isRoot && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
              Welcome back, <span className="text-blue-400">{coachProfile.name.split(' ')[0]}</span>
            </h1>
            <div className="flex items-center gap-4 p-3 rounded-lg shadow-sm bg-white w-full md:w-auto">
              <img 
                src={coachProfile.avatar} 
                alt={coachProfile.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{coachProfile.role}</h3>
                <p className="text-xs text-gray-600">{coachProfile.specialty}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats cards on dashboard root */}
        {isRoot && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <StatCard title="Players" value={coachProfile.stats.totalPlayers} icon={<FiUsers className="text-blue-500" />} />
            <StatCard title="Matches" value={coachProfile.stats.upcomingMatches} icon={<FaCalendarAlt className="text-green-500" />} />
            <StatCard title="Trainings" value={coachProfile.stats.trainingSessions} icon={<FaDumbbell className="text-orange-500" />} />
            <StatCard title="Messages" value={coachProfile.stats.messages} icon={<FaEnvelope className="text-purple-500" />} />
          </div>
        )}

        {/* Quick Actions on dashboard root */}
        {isRoot && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction title="Add Player" icon={<FiUser className="text-lg" />} onClick={() => {
                closeSidebar();
                alert("Add Player clicked");
              }} />
              <QuickAction title="Schedule Match" icon={<FaCalendarAlt className="text-lg" />} onClick={() => {
                closeSidebar();
                alert("Schedule Match clicked");
              }} />
              <QuickAction title="Create Training" icon={<FaDumbbell className="text-lg" />} onClick={() => {
                closeSidebar();
                alert("Create Training clicked");
              }} />
              <QuickAction title="Send Message" icon={<FiMail className="text-lg" />} onClick={() => {
                closeSidebar();
                alert("Send Message clicked");
              }} />
            </div>
          </div>
        )}

        {/* Feature overview cards on dashboard root */}
        {isRoot && (
          <div className="grid grid-cols-1 gap-4 mb-6">
            {features.map(({ name, path, icon, description }) => (
              <NavLink 
                to={path} 
                key={name} 
                onClick={closeSidebar}
                className="p-4 rounded-lg shadow-md hover:shadow-lg transition bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl text-blue-600">{icon}</div>
                  <div>
                    <h2 className="font-semibold text-base text-gray-800">{name}</h2>
                    <p className="text-xs text-gray-600">{description}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}

        {/* Outlet renders nested routes here */}
        <div className={(!isRoot && !isProfile) ? "rounded-lg shadow-md p-4 bg-white" : ""}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Small reusable StatCard component (updated for mobile)
const StatCard = ({ title, value, icon }) => (
  <div className="p-3 rounded-lg shadow-sm flex items-start gap-3 bg-white">
    <div className="p-2 rounded-full bg-blue-50 text-blue-500">
      {icon}
    </div>
    <div>
      <h3 className="text-xs font-medium text-gray-500">{title}</h3>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Small reusable QuickAction button (updated for mobile)
const QuickAction = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 rounded-lg bg-white hover:bg-blue-50 text-gray-800 shadow-sm hover:shadow transition text-center"
  >
    <div className="p-2 rounded-full mb-1 bg-blue-50">
      {icon}
    </div>
    <span className="text-xs font-medium">{title}</span>
  </button>
);

export default CoachDashboard;