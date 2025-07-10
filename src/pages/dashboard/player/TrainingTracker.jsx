import React, { useState, useMemo } from "react"; 
import {
  FiTrendingUp,
  FiFilter,
  FiCheckCircle,
  FiSearch,
  FiCalendar,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const mockSessions = [
  {
    id: 1,
    title: "Strength & Conditioning",
    date: "2025-07-01",
    duration: 75,
    completed: true,
    exercises: 12,
    calories: 280,
    intensity: "Medium",
    progress: 65,
  },
  {
    id: 2,
    title: "Speed & Agility",
    date: "2025-07-03",
    duration: 45,
    completed: false,
    exercises: 8,
    calories: 320,
    intensity: "High",
    progress: 100,
  },
  {
    id: 3,
    title: "Cardio Endurance",
    date: "2025-07-07",
    duration: 30,
    completed: false,
    exercises: 5,
    calories: 200,
    intensity: "Low",
    progress: 0,
  },
];

const weeklyConsistency = [
  { day: "Mon", consistency: 85 },
  { day: "Tue", consistency: 70 },
  { day: "Wed", consistency: 90 },
  { day: "Thu", consistency: 0 },
  { day: "Fri", consistency: 0 },
  { day: "Sat", consistency: 0 },
  { day: "Sun", consistency: 0 },
];

const performanceMetrics = [
  { label: "Endurance", score: 8.2 },
  { label: "Strength", score: 7.8 },
  { label: "Speed", score: 9.1 },
  { label: "Flexibility", score: 6.5 },
];

const TrainingTracker = () => {
  const [sessions, setSessions] = useState(mockSessions);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const toggleCompletion = (id) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => {
        if (filter === "completed") return s.completed;
        if (filter === "pending") return !s.completed;
        return true;
      })
      .filter((s) =>
        s.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
      .filter((s) => {
        if (!dateRange.from && !dateRange.to) return true;
        const sessionDate = new Date(s.date);
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;
        if (fromDate && sessionDate < fromDate) return false;
        if (toDate && sessionDate > toDate) return false;
        return true;
      });
  }, [filter, sessions, searchTerm, dateRange]);

  const summaryStats = [
    { title: "Training Sessions", value: 24, change: "+12%", progress: 85 },
    { title: "Matches Played", value: 8, change: "+3", progress: 67 },
    { title: "Performance Score", value: 92, change: "+8.5%", progress: 92 },
    { title: "Training Hours", value: 156, change: "+22h", progress: 78 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 font-sans text-gray-800">
      {/* Header and filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h1 className="text-3xl font-extrabold flex items-center gap-3 text-blue-600">
          <FiTrendingUp className="text-4xl" />
          Training & Athletic Progress
        </h1>

        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-600 bg-gray-100 rounded-md px-3 py-2 shadow-sm w-full sm:w-auto">
            <FiFilter />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent outline-none text-sm flex-grow"
              aria-label="Filter training sessions"
            >
              <option value="all">All Sessions</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 shadow-sm text-gray-600 w-full sm:w-auto">
            <FiSearch />
            <input
              type="search"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full sm:w-64"
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 shadow-sm text-gray-600 w-full sm:w-auto">
            <FiCalendar />
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, from: e.target.value }))
              }
              className="outline-none text-sm flex-grow"
              aria-label="From date"
            />
            <span className="mx-1 font-semibold text-gray-400">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, to: e.target.value }))
              }
              className="outline-none text-sm flex-grow"
              aria-label="To date"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {summaryStats.map(({ title, value, change, progress }) => (
          <article
            key={title}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            role="region"
            aria-label={title}
          >
            <h2 className="text-sm font-semibold text-blue-700 mb-1 tracking-wide uppercase">
              {title}
            </h2>
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl font-extrabold text-gray-900">{value}</span>
              <span className="text-green-500 font-semibold">{change}</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-blue-600 font-medium">
              {progress}% of monthly goal
            </p>
          </article>
        ))}
      </section>

      {/* Chart */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Training Duration Chart</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={sessions.map((s) => ({ name: s.title, duration: s.duration }))}
            margin={{ left: 0, right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#4B5563" }} />
            <YAxis unit="min" tick={{ fontSize: 13, fill: "#4B5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: 6,
                border: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
              itemStyle={{ color: "#1E40AF" }}
            />
            <Bar dataKey="duration" fill="#3B82F6" radius={[5, 5, 0, 0]} barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Training Sessions */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Training Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredSessions.length === 0 ? (
            <p className="text-gray-500 italic col-span-full">No sessions found.</p>
          ) : (
            filteredSessions.map((s) => (
              <article
                key={s.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                tabIndex={0}
                aria-label={`Training session: ${s.title}`}
              >
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                  <button
                    onClick={() => toggleCompletion(s.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full font-medium transition-colors w-full sm:w-auto justify-center ${
                      s.completed
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-pressed={s.completed}
                    aria-label={`Mark session as ${
                      s.completed ? "incomplete" : "completed"
                    }`}
                  >
                    <FiCheckCircle className="text-lg" />
                    {s.completed ? "Completed" : "Mark Complete"}
                  </button>
                </header>
                <ul className="text-gray-600 space-y-1 mb-4 text-sm">
                  <li>
                    <strong>Date:</strong> {new Date(s.date).toLocaleDateString()}
                  </li>
                  <li>
                    <strong>Duration:</strong> {s.duration} min
                  </li>
                  <li>
                    <strong>Exercises:</strong> {s.exercises}
                  </li>
                  <li>
                    <strong>Calories burned:</strong> {s.calories} cal
                  </li>
                  <li>
                    <strong>Intensity:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-semibold text-xs ${
                        s.intensity === "High"
                          ? "bg-red-200 text-red-800"
                          : s.intensity === "Medium"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {s.intensity}
                    </span>
                  </li>
                </ul>

                <div
                  className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
                  aria-label={`Progress: ${s.progress}%`}
                >
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-blue-600">{s.progress}% Progress</p>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Weekly Overview */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-center">Weekly Overview</h2>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={weeklyConsistency}
            margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
          >
            <XAxis dataKey="day" tick={{ fontSize: 14, fill: "#4B5563" }} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: 6,
                border: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
              itemStyle={{ color: "#1E40AF" }}
            />
            <Bar dataKey="consistency" fill="#3B82F6" radius={[5, 5, 5, 5]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-4 text-sm text-gray-700 font-semibold flex-wrap gap-4">
          {weeklyConsistency.map(({ day, consistency }) => (
            <div key={day} className="text-center min-w-[3rem]">
              <div>{day}</div>
              <div>{consistency}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">Performance Metrics</h2>
        {performanceMetrics.map(({ label, score }) => (
          <div key={label} className="mb-5">
            <div className="flex justify-between mb-1 font-medium text-gray-700">
              <span>{label}</span>
              <span>{score.toFixed(1)}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
              <div
                className="bg-blue-600 h-5 rounded-full transition-all duration-700"
                style={{ width: `${(score / 10) * 100}%` }}
                aria-label={`${label} score is ${score.toFixed(1)} out of 10`}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TrainingTracker;
