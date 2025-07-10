import React, { useState, Suspense, useEffect } from "react";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiImage,
  FiSettings,
  FiBarChart2,
  FiSliders,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiBell,
  FiArrowLeft,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";

// Lazy-loaded components remain the same
const UserManagement = React.lazy(() => import("./UserManagement"));
const EventsManager = React.lazy(() => import("./EventsManager"));
const BlogEditor = React.lazy(() => import("./BlogEditor"));
const GalleryUpload = React.lazy(() => import("./GalleryUpload"));
const Reports = React.lazy(() => import("./Reports"));
const Settings = React.lazy(() => import("./Settings"));
const SportsConfiguration = React.lazy(() => import("./SportsConfiguration"));
const FacilityManagement = React.lazy(() => import("./FacilityManagement"));
const FinancialSettings = React.lazy(() => import("./FinancialSettings"));
const SecuritySettings = React.lazy(() => import("./SecuritySettings"));
const Notifications = React.lazy(() => import("./Notifications"));

// Mock admin profile data
const adminProfile = {
  name: "Admin User",
  role: "System Administrator",
  avatar: "/public/coach1.jpg",
  stats: {
    users: 1247,
    events: 34,
    reports: 12
  }
};

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const isRoot = location.pathname === "/dashboard/admin" || location.pathname === "/dashboard/admin/";
  const navigate = useNavigate();

  const features = [
    { name: "User Management", path: "users", icon: <FiUsers />, description: "Manage system users", component: UserManagement },
    { name: "Events", path: "events", icon: <FiCalendar />, description: "Manage events and schedules", component: EventsManager },
    { name: "Blog", path: "blog", icon: <FiFileText />, description: "Create and edit blog posts", component: BlogEditor },
    { name: "Gallery", path: "gallery", icon: <FiImage />, description: "Upload and manage media", component: GalleryUpload },
    { name: "Reports", path: "reports", icon: <FiBarChart2 />, description: "View system reports", component: Reports },
    { name: "Sports Configuration", path: "sports-config", icon: <FiSliders />, description: "Configure sports settings", component: SportsConfiguration },
    { name: "Facility Management", path: "facility", icon: <FiMapPin />, description: "Manage facilities", component: FacilityManagement },
    { name: "Financial Settings", path: "financial", icon: <FiCreditCard />, description: "Financial configurations", component: FinancialSettings },
    { name: "Security Settings", path: "security", icon: <FiShield />, description: "System security settings", component: SecuritySettings },
    { name: "Notifications", path: "notifications", icon: <FiBell />, description: "Manage notifications", component: Notifications },
    { name: "Settings", path: "settings", icon: <FiSettings />, description: "System settings", component: Settings },
  ];

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

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      {/* Mobile Header */}
      <header className={`md:hidden flex items-center justify-between p-4 ${
        darkMode ? "bg-gray-800" : "bg-blue-900"
      } text-white`}>
        <button onClick={toggleSidebar} className="text-white p-1">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </header>

      {/* Sidebar - Mobile overlay */}
      <aside className={`${sidebarOpen ? "fixed inset-0 z-50 md:relative" : "hidden"} ${
        darkMode ? "bg-gray-800" : "bg-blue-900"
      } text-white p-4 flex flex-col md:w-64 md:block md:sticky md:top-0 md:h-screen`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={adminProfile.avatar} 
              alt={adminProfile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h2 className="text-lg font-bold truncate">{adminProfile.name}</h2>
              <p className="text-xs text-blue-200 truncate">{adminProfile.role}</p>
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-white p-1 rounded hover:bg-blue-700 md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            <NavLink 
              to="" 
              end
              onClick={() => isMobile && setSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-blue-700" 
                    : "hover:bg-blue-700"
                }`
              }
            >
              <FiHome className="text-lg" />
              Dashboard
            </NavLink>
            
            {features.slice(0, 6).map(({ name, path, icon }) => (
              <NavLink 
                to={path} 
                key={name} 
                onClick={() => isMobile && setSidebarOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
                    isActive 
                      ? "bg-blue-700" 
                      : "hover:bg-blue-700"
                  }`
                }
              >
                {React.cloneElement(icon, { className: "text-lg" })}
                {name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-blue-700">
              {features.slice(6).map(({ name, path, icon }) => (
                <NavLink 
                  to={path} 
                  key={name} 
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
                      isActive 
                        ? "bg-blue-700" 
                        : "hover:bg-blue-700"
                    }`
                  }
                >
                  {React.cloneElement(icon, { className: "text-lg" })}
                  {name}
                </NavLink>
              ))}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-3 py-2 px-3 rounded-md hover:bg-blue-700 transition-colors w-full`}
              >
                {darkMode ? "☀️" : "🌙"}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button 
                onClick={() => navigate("/logout")}
                className={`flex items-center gap-3 py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-red-200 hover:text-red-100 w-full`}
              >
                <FiLogOut className="text-lg" />
                Logout
              </button>
              <div className="pt-4 text-xs text-blue-300 text-center select-none">
                &copy; {new Date().getFullYear()} Sports Admin
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Back button when not on root */}
        {!isRoot && (
          <button 
            onClick={() => navigate("/dashboard/admin")} 
            className={`flex items-center gap-2 mb-4 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
        )}
        
        {/* Profile Header */}
        {isRoot && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className={`text-2xl md:text-3xl font-bold ${
              darkMode ? "text-white" : "text-blue-900"
            }`}>
              Welcome, <span className="text-blue-600">{adminProfile.name.split(' ')[0]}</span>
            </h1>
            
            <div className={`flex items-center gap-4 p-3 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-white"
            } shadow-sm`}>
              <img 
                src={adminProfile.avatar} 
                alt={adminProfile.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{adminProfile.role}</h3>
                <p className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Last login: Today
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Stats Cards */}
        {isRoot && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <AdminStatCard 
              title="Total Users" 
              value={adminProfile.stats.users.toLocaleString()}
              icon={<FiUsers className="text-blue-500" />}
              darkMode={darkMode}
              onClick={() => {
                navigate("users");
                isMobile && setSidebarOpen(false);
              }}
            />
            <AdminStatCard 
              title="Events" 
              value={adminProfile.stats.events.toLocaleString()}
              icon={<FiCalendar className="text-green-500" />}
              darkMode={darkMode}
              onClick={() => {
                navigate("events");
                isMobile && setSidebarOpen(false);
              }}
            />
            <AdminStatCard 
              title="Reports Generated" 
              value={adminProfile.stats.reports.toLocaleString()}
              icon={<FiBarChart2 className="text-orange-500" />}
              darkMode={darkMode}
              onClick={() => {
                navigate("reports");
                isMobile && setSidebarOpen(false);
              }}
            />
          </div>
        )}

        {/* Dashboard Overview Cards */}
        {isRoot && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {features.map(({ name, path, icon, description }) => (
              <FeatureCard
                key={name}
                name={name}
                icon={icon}
                description={description}
                darkMode={darkMode}
                onClick={() => {
                  navigate(path);
                  isMobile && setSidebarOpen(false);
                }}
              />
            ))}
          </div>
        )}

        {/* Content for nested routes */}
        <div className={!isRoot ? `${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md p-4 md:p-6` : ""}>
          <Suspense fallback={
            <div className={`flex justify-center items-center h-64 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Loading...
            </div>
          }>
            <Routes>
              <Route index element={<DashboardHome darkMode={darkMode} />} />
              {features.map(({ path, component: Component }) => (
                <Route 
                  key={path}
                  path={path}
                  element={<Component darkMode={darkMode} />}
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

// AdminStatCard and FeatureCard components remain the same
const AdminStatCard = ({ title, value, icon, darkMode, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-start gap-3 p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg ${
      darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
    }`}
  >
    <div className={`p-2 rounded-full ${
      darkMode ? "bg-gray-600" : "bg-blue-50"
    }`}>
      {icon}
    </div>
    <div>
      <h3 className={`text-sm font-medium ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}>{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const FeatureCard = ({ name, icon, description, darkMode, onClick }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg shadow-md hover:shadow-lg transition hover:-translate-y-0.5 text-left ${
      darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${
        darkMode ? "bg-gray-600 text-blue-400" : "bg-blue-50 text-blue-600"
      }`}>
        {React.cloneElement(icon, { className: "text-lg" })}
      </div>
      <div>
        <h2 className="font-semibold text-base">{name}</h2>
        <p className={`text-xs ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          {description}
        </p>
      </div>
    </div>
  </button>
);

// DashboardHome component remains the same
const DashboardHome = ({ darkMode }) => {
  const navigate = useNavigate();
  const summaryData = [
    { title: "Users", icon: <FiUsers />, value: "1,247", color: "bg-blue-100", path: "users" },
    { title: "Events", icon: <FiCalendar />, value: "34", color: "bg-green-100", path: "events" },
    { title: "Reports", icon: <FiBarChart2 />, value: "12", color: "bg-yellow-100", path: "reports" },
  ];

  return (
    <div>
      <h2 className={`text-xl font-bold mb-2 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>Quick Access</h2>
      <p className={`text-sm mb-4 ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }`}>
        Manage your sports administration system efficiently
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {summaryData.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className={`flex items-center justify-between p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer ${
              item.color
            } ${darkMode ? "text-gray-800" : ""}`}
          >
            <div>
              <p className="text-xs text-gray-600">{item.title}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
            <div className="text-2xl text-gray-700">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;