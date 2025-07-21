import React, { useState, useMemo } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  FaHeartbeat,
  FaClipboardList,
  FaChartLine,
  FaStethoscope,
  FaComments,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaBell,
  FaSearch,
  FaCalendarAlt,
  FaUserMd
} from 'react-icons/fa';

// Profile Data
const medicProfile = {
  name: 'Dr. Sarah Johnson',
  role: 'Head Sports Physician',
  avatar: '/coach2.jpg',
  specialty: 'Orthopedics & Sports Medicine',
  yearsExperience: 12,
  contact: 'sarah.j@bluephoenix.com',
  teams: ['Rugby', 'Football', 'Swimming'],
  notifications: 3,
  upcomingAppointments: 2
};

const navItems = [
  { icon: <FaStethoscope />, text: 'Injury Logs', path: '/dashboard/medic/injury-logs' },
  { icon: <FaHeartbeat />, text: 'Health Reports', path: '/dashboard/medic/health-reports' },
  { icon: <FaClipboardList />, text: 'Recovery Tracker', path: '/dashboard/medic/recovery-tracker' },
  { icon: <FaChartLine />, text: 'Upload Reports', path: '/dashboard/medic/medical-upload' },
  { icon: <FaComments />, text: 'Messages', path: '/dashboard/medic/messaging' }
];

const quickActions = [
  { icon: <FaUserMd />, text: 'New Patient', path: '/dashboard/medic/add-patient' },
  { icon: <FaClipboardList />, text: 'Quick Report', path: '/dashboard/medic/quick-report' },
  { icon: <FaCalendarAlt />, text: 'Schedule', path: '/dashboard/medic/schedule' }
];

const MedicDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const firstName = useMemo(() => medicProfile.name.split(' ')[0], []);

  // Check if we're on a sub-route
  const isSubRoute = location.pathname !== '/dashboard/medic';

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-blue-900 text-white p-4 flex justify-between items-center z-30 md:hidden shadow-md">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-blue-700 transition-colors"
          aria-label="Open menu"
        >
          <FaBars className="text-xl" />
        </button>
        <h1 className="text-xl font-bold">Blue Phoenix Sports</h1>
        <div className="relative">
          <FaBell className="text-xl" />
          {medicProfile.notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {medicProfile.notifications}
            </span>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-20 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-blue-700 transition-colors md:hidden"
          aria-label="Close menu"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-8 mt-4">
          <div className="relative">
            <img
              src={medicProfile.avatar}
              alt={medicProfile.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
              loading="lazy"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{medicProfile.name}</h2>
            <p className="text-sm text-blue-200">{medicProfile.role}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-blue-800 text-white placeholder-blue-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-300" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 text-lg flex-1">
          {navItems.map(({ icon, text, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              <span className="text-blue-300">{icon}</span>
              <span>{text}</span>
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-blue-700">
          <h3 className="text-xs uppercase text-blue-400 mb-2 px-3">Quick Actions</h3>
          {quickActions.map(({ icon, text, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              <span className="text-blue-300">{icon}</span>
              <span>{text}</span>
            </Link>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-auto pt-4 border-t border-blue-700">
          <Link
            to="/dashboard/medic/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <FaUserCircle className="text-blue-300" /> <span>My Profile</span>
          </Link>
          <Link
            to="/dashboard/medic/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <FaCog className="text-blue-300" /> <span>Settings</span>
          </Link>
          <Link
            to="/logout"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-blue-700 transition-colors text-red-200 hover:text-red-100 text-sm"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </Link>
          <div className="pt-4 text-xs text-blue-300 select-none">
            © {new Date().getFullYear()} Blue Phoenix Sports
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto pt-20 md:pt-8">
        {isSubRoute ? (
          <Outlet />
        ) : (
          <>
            {/* Dashboard Home Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
                  Welcome back, <span className="text-blue-600">{firstName}</span>
                </h1>
                <p className="text-gray-500">Here's what's happening today</p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Appointments</p>
                    <p className="font-semibold">{medicProfile.upcomingAppointments}</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <FaHeartbeat />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Patients</p>
                    <p className="font-semibold">24</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <FaStethoscope />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="text-lg font-semibold">{medicProfile.yearsExperience}+ years</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                  <FaHeartbeat />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Specialty</h3>
                  <p className="text-lg font-semibold">{medicProfile.specialty}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                  <FaUserMd />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Assigned Teams</h3>
                  <p className="text-lg font-semibold">{medicProfile.teams.join(', ')}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                  <FaComments />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="text-lg font-semibold">{medicProfile.contact}</p>
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-blue-800">Patient Monitoring</h2>
                    <Link to="/dashboard/medic/health-reports" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Dashboard →
                    </Link>
                  </div>
                  <p className="text-gray-600">Track vitals, injury status, and medical flags in real-time.</p>
                </section>
                
                <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-blue-800">Recent Injury Reports</h2>
                    <Link to="/dashboard/medic/injury-logs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div>
                        <h3 className="font-medium">Michael Johnson</h3>
                        <p className="text-sm text-gray-600">ACL Tear</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">2 days ago</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                          High
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div>
                        <h3 className="font-medium">Sarah Williams</h3>
                        <p className="text-sm text-gray-600">Concussion</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">5 days ago</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                          Medium
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-blue-800">Upcoming Appointments</h2>
                    <Link to="/dashboard/medic/schedule" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Calendar →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div>
                        <h3 className="font-medium">David Miller</h3>
                        <p className="text-sm text-gray-600">Follow-up</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">10:30 AM</p>
                        <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                          Details
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div>
                        <h3 className="font-medium">Emma Wilson</h3>
                        <p className="text-sm text-gray-600">Initial Assessment</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">2:15 PM</p>
                        <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-blue-800">Health Tips & Resources</h2>
                    <Link to="/dashboard/medic/blogs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All Articles →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start group">
                      <img 
                        src="/image4.jpg" 
                        alt="Concussion Protocols" 
                        className="w-16 h-16 object-cover rounded-md group-hover:opacity-90 transition" 
                        loading="lazy" 
                      />
                      <div>
                        <h3 className="font-medium text-blue-700 line-clamp-1 group-hover:text-blue-800 transition text-base">
                          Concussion Protocols in Contact Sports
                        </h3>
                        <p className="text-xs text-gray-500">Neurology</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          Learn the latest guidelines for identifying and managing concussions.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start group">
                      <img 
                        src="/image5.jpg" 
                        alt="Preventing ACL Injuries" 
                        className="w-16 h-16 object-cover rounded-md group-hover:opacity-90 transition" 
                        loading="lazy" 
                      />
                      <div>
                        <h3 className="font-medium text-blue-700 line-clamp-1 group-hover:text-blue-800 transition text-base">
                          Preventing ACL Injuries
                        </h3>
                        <p className="text-xs text-gray-500">Orthopedics</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          Key strengthening exercises to protect your knees.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MedicDashboard;