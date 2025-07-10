import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { 
  FaHeartbeat, 
  FaClipboardList, 
  FaChartLine, 
  FaStethoscope, 
  FaComments, 
  FaRunning, 
  FaFutbol, 
  FaBasketballBall, 
  FaSwimmer,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaBars
} from "react-icons/fa";

// Mock data
const medicProfile = {
  name: "Dr. Sarah Johnson",
  role: "Head Sports Physician",
  avatar: "/public/coach2.jpg",
  specialty: "Orthopedics & Sports Medicine",
  yearsExperience: 12,
  contact: "sarah.j@bluephoenix.com",
  teams: ["Rugby", "Football", "Swimming"]
};

const featuredBlogs = [
  {
    id: 1,
    title: "Concussion Protocols in Contact Sports",
    excerpt: "Learn the latest guidelines for identifying and managing concussions.",
    image: "/public/image4.jpg",
    category: "Neurology"
  },
  // ... other blog items
];

const MedicDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
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
    <div className="flex min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 bg-blue-900 text-white p-4 flex justify-between items-center z-30 shadow-md">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-xl font-bold">Blue Phoenix Sports</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </header>
      )}

      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        w-64 bg-blue-900 text-white p-6 flex flex-col fixed md:sticky top-0 h-screen z-20`}
      >
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        )}

        <div className="flex items-center gap-4 mb-8 mt-4 md:mt-0">
          <img 
            src={medicProfile.avatar} 
            alt={medicProfile.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h2 className="text-xl font-bold">{medicProfile.name}</h2>
            <p className="text-sm text-blue-200">{medicProfile.role}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-lg flex-1">
          {[
            { icon: <FaStethoscope />, text: "Injury Logs", path: "/dashboard/medic/injury-logs" },
            { icon: <FaHeartbeat />, text: "Health Reports", path: "/dashboard/medic/health-reports" },
            { icon: <FaClipboardList />, text: "Recovery Tracker", path: "/dashboard/medic/recovery-tracker" },
            { icon: <FaChartLine />, text: "Upload Reports", path: "/dashboard/medic/medical-upload" },
            { icon: <FaComments />, text: "Messages", path: "/dashboard/medic/messaging" }
          ].map((item, index) => (
            <a 
              key={index}
              href={item.path}
              onClick={closeSidebar}
              className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {item.icon}
              {item.text}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-blue-700">
          <a 
            href="/dashboard/medic/profile" 
            onClick={closeSidebar}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaUserCircle /> My Profile
          </a>
          <a 
            href="/settings" 
            onClick={closeSidebar}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaCog /> Settings
          </a>
          <a 
            href="/logout" 
            onClick={closeSidebar}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors text-red-200 hover:text-red-100"
          >
            <FaSignOutAlt /> Logout
          </a>
          <div className="pt-4 text-sm text-blue-300 select-none">
            &copy; {new Date().getFullYear()} Blue Phoenix Sports
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 md:p-8 overflow-auto ${isMobile ? 'pt-20' : ''}`}>
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-900">
            Welcome back, <span className="text-blue-600">{medicProfile.name.split(' ')[0]}</span>
          </h1>
          
          <div className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-lg shadow-sm w-full md:w-auto">
            <img 
              src={medicProfile.avatar} 
              alt={medicProfile.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm md:text-base">{medicProfile.role}</h3>
              <p className="text-xs md:text-sm text-gray-600">{medicProfile.specialty}</p>
            </div>
          </div>
        </div>

        {/* Profile Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <ProfileCard 
            title="Experience" 
            value={`${medicProfile.yearsExperience}+ years`}
            icon={<FaStethoscope className="text-blue-500" />}
          />
          <ProfileCard 
            title="Specialty" 
            value={medicProfile.specialty}
            icon={<FaHeartbeat className="text-red-500" />}
          />
          <ProfileCard 
            title="Assigned Teams" 
            value={medicProfile.teams.join(", ")}
            icon={<FaFutbol className="text-green-500" />}
          />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Patient Monitoring */}
          <DashboardCard 
            title="Patient Monitoring" 
            content="Track vitals, injury status, and medical flags in real-time."
          />

          {/* Health Tips with Images */}
          <section className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition">
            <h2 className="text-lg md:text-xl font-semibold text-blue-800 p-4 md:p-6 pb-0">Health Tips & Blog</h2>
            <div className="p-4 md:p-6 pt-2 md:pt-3">
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Latest health education articles:</p>
              <div className="space-y-3 md:space-y-4">
                {featuredBlogs.map(blog => (
                  <BlogPreview key={blog.id} blog={blog} />
                ))}
              </div>
              <button className="mt-3 md:mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all articles →
              </button>
            </div>
          </section>

          {/* Other dashboard cards... */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Reusable Components
const DashboardCard = ({ title, content }) => (
  <section className="bg-white rounded-lg shadow-md p-4 md:p-6 transform hover:-translate-y-1 hover:shadow-xl transition">
    <h2 className="text-lg md:text-xl font-semibold text-blue-800 mb-2">{title}</h2>
    <p className="text-gray-600 text-sm md:text-base">{content}</p>
  </section>
);

const ProfileCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex items-start gap-3 md:gap-4">
    <div className="p-2 md:p-3 bg-blue-50 rounded-full text-blue-600">
      {icon}
    </div>
    <div>
      <h3 className="text-xs md:text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-base md:text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const BlogPreview = ({ blog }) => (
  <div className="flex gap-2 md:gap-3 items-start group">
    <img 
      src={blog.image} 
      alt={blog.title}
      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md group-hover:opacity-90 transition"
      loading="lazy"
    />
    <div>
      <h3 className="font-medium text-blue-700 line-clamp-1 group-hover:text-blue-800 transition text-sm md:text-base">
        {blog.title}
      </h3>
      <p className="text-xs text-gray-500">{blog.category}</p>
      <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
    </div>
  </div>
);

export default MedicDashboard;