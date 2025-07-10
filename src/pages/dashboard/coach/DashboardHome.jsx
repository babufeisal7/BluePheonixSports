import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { FiTrendingUp, FiUsers, FiCalendar, FiActivity } from "react-icons/fi";

const teamStats = [
  { name: "Wins", value: 12, color: "#4caf50", icon: <FiTrendingUp className="inline mr-1" /> },
  { name: "Losses", value: 5, color: "#f44336", icon: null },
  { name: "Draws", value: 2, color: "#ff9800", icon: null },
];

const playerRoster = [
  { name: "John Doe", position: "Forward", goals: 15, status: "Active" },
  { name: "Alice Smith", position: "Midfielder", goals: 7, status: "Injured" },
  { name: "Bob Johnson", position: "Defender", goals: 2, status: "Active" },
];

const upcomingMatches = [
  { date: "2025-07-10", opponent: "Rivals FC", location: "Home" },
  { date: "2025-07-17", opponent: "City United", location: "Away" },
];

const recentActivity = [
  { time: "1h ago", description: "John Doe scored a goal in training." },
  { time: "2d ago", description: "Team attended nutrition workshop." },
  { time: "5d ago", description: "Match vs. Rivals FC rescheduled." },
];

const performanceData = [
  { match: "Match 1", goals: 3, assists: 1 },
  { match: "Match 2", goals: 1, assists: 0 },
  { match: "Match 3", goals: 2, assists: 2 },
  { match: "Match 4", goals: 0, assists: 1 },
  { match: "Match 5", goals: 4, assists: 3 },
];

const DashboardHome = () => {
  return (
    <div className="space-y-10 px-4 py-6 max-w-7xl mx-auto">
      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {teamStats.map(({ name, value, color, icon }) => (
          <div
            key={name}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-2xl transition-shadow"
          >
            <div
              className="text-4xl font-extrabold"
              style={{ color }}
              aria-label={`${name} icon`}
            >
              {icon || "•"}
            </div>
            <div>
              <p className="text-gray-600 uppercase tracking-wide text-sm font-semibold">{name}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Player Roster */}
      <section className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-5 border-b pb-2">Player Roster</h2>
        <table className="w-full min-w-[400px] table-auto text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Goals</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {playerRoster.map(({ name, position, goals, status }) => (
              <tr
                key={name}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4 font-medium">{name}</td>
                <td className="py-3 px-4">{position}</td>
                <td className="py-3 px-4">{goals}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                      status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Upcoming Matches & Recent Activity */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Matches */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-5 border-b pb-2 flex items-center gap-2">
            <FiCalendar /> Upcoming Matches
          </h2>
          <ul className="space-y-3">
            {upcomingMatches.map(({ date, opponent, location }) => (
              <li key={date} className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                <span className="font-semibold">{date}</span>
                <span>vs <strong>{opponent}</strong></span>
                <span className="italic text-gray-500">{location}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-5 border-b pb-2 flex items-center gap-2">
            <FiActivity /> Recent Activity
          </h2>
          <ul className="space-y-3 text-gray-700">
            {recentActivity.map(({ time, description }, i) => (
              <li key={i}>
                <span className="font-semibold">{time}:</span> {description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center gap-2">
          Performance Analytics
          <FiTrendingUp className="text-blue-500 text-2xl" />
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="match" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line type="monotone" dataKey="goals" stroke="#3b82f6" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="assists" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Team Comparison */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center gap-2">
          Team Comparison
          <FiUsers className="text-indigo-500 text-2xl" />
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="match" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="goals" fill="#3b82f6" />
            <Bar dataKey="assists" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-lg shadow-lg p-6 flex flex-wrap gap-4 justify-center">
        {[
          { label: "Add Player", color: "bg-blue-600 hover:bg-blue-700" },
          { label: "Schedule Training", color: "bg-green-600 hover:bg-green-700" },
          { label: "Create Match", color: "bg-indigo-600 hover:bg-indigo-700" },
          { label: "Send Message", color: "bg-purple-600 hover:bg-purple-700" },
        ].map(({ label, color }) => (
          <button
            key={label}
            className={`${color} text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition w-full sm:w-auto`}
            onClick={() => alert(`${label} clicked`)}
          >
            {label}
          </button>
        ))}
      </section>
    </div>
  );
};

export default DashboardHome;
