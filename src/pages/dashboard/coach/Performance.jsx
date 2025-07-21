import React, { useState, useEffect } from "react";
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaRunning,
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaDownload,
  FaSyncAlt
} from "react-icons/fa";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample performance data
const performanceData = {
  teamStats: [
    { name: 'Jan', goals: 12, assists: 8, shots: 45 },
    { name: 'Feb', goals: 15, assists: 10, shots: 52 },
    { name: 'Mar', goals: 9, assists: 12, shots: 38 },
    { name: 'Apr', goals: 18, assists: 14, shots: 60 },
    { name: 'May', goals: 14, assists: 9, shots: 48 },
    { name: 'Jun', goals: 16, assists: 11, shots: 55 },
  ],
  playerStats: [
    { name: 'Alex Morgan', goals: 12, assists: 5, distance: 8.2, rating: 8.7 },
    { name: 'Jamie Johnson', goals: 8, assists: 10, distance: 9.5, rating: 8.9 },
    { name: 'Taylor Smith', goals: 5, assists: 7, distance: 7.8, rating: 7.5 },
    { name: 'Mia Wong', goals: 10, assists: 4, distance: 6.9, rating: 8.2 },
    { name: 'Jordan Lee', goals: 7, assists: 8, distance: 8.7, rating: 8.0 },
  ],
  positionDistribution: [
    { name: 'Forwards', value: 35 },
    { name: 'Midfielders', value: 30 },
    { name: 'Defenders', value: 25 },
    { name: 'Goalkeepers', value: 10 },
  ],
  trainingLoad: [
    { week: '1', load: 65, intensity: 70 },
    { week: '2', load: 70, intensity: 75 },
    { week: '3', load: 75, intensity: 80 },
    { week: '4', load: 68, intensity: 72 },
    { week: '5', load: 72, intensity: 78 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Performance = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('team');
  const [timeRange, setTimeRange] = useState('season');
  const [selectedMetric, setSelectedMetric] = useState('goals');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter players based on search term
  const filteredPlayers = performanceData.playerStats.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaChartLine className="mr-2 text-blue-600" />
            Performance Analysis Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Comprehensive metrics and visualizations for team and player performance
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={refreshData}
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            <FaSyncAlt className="mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['team', 'players', 'training'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeTab === tab ? 'bg-white shadow' : 'hover:bg-gray-50'
                }`}
              >
                {tab === 'team' && <FaUsers className="mr-2" />}
                {tab === 'players' && <FaRunning className="mr-2" />}
                {tab === 'training' && <FaCalendarAlt className="mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={activeTab !== 'players'}
              />
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="season">Full Season</option>
              <option value="month">Last Month</option>
              <option value="week">Last Week</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        // Loading skeleton
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      ) : (
        // Actual content
        <div className="space-y-8">
          {activeTab === 'team' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaChartBar className="mr-2 text-blue-500" />
                    Team Performance Trends
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData.teamStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="goals"
                          stroke="#3B82F6"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="assists"
                          stroke="#10B981"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaChartPie className="mr-2 text-green-500" />
                    Position Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={performanceData.positionDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {performanceData.positionDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaTrophy className="mr-2 text-yellow-500" />
                  Team Statistics Overview
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData.teamStats}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="goals" fill="#3B82F6" name="Goals" />
                      <Bar dataKey="assists" fill="#10B981" name="Assists" />
                      <Bar dataKey="shots" fill="#F59E0B" name="Shots" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab === 'players' && (
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaRunning className="mr-2 text-purple-500" />
                  Player Performance Comparison
                </h3>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="goals">Goals</option>
                  <option value="assists">Assists</option>
                  <option value="distance">Distance (km)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredPlayers}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={selectedMetric} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-red-500" />
                Training Load Analysis
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData.trainingLoad}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="load"
                      stroke="#3B82F6"
                      activeDot={{ r: 8 }}
                      name="Training Load"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="intensity"
                      stroke="#10B981"
                      name="Intensity Level"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Key Insights</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              {activeTab === 'team' && (
                <>
                  <li>Team performance shows consistent improvement in goals scored</li>
                  <li>April was our best month with 18 goals and 14 assists</li>
                  <li>Forwards make up 35% of our squad composition</li>
                </>
              )}
              {activeTab === 'players' && (
                <>
                  <li>Jamie Johnson leads in assists with 10 this season</li>
                  <li>Alex Morgan has the highest goal count at 12</li>
                  <li>All players maintaining above 7.5 average rating</li>
                </>
              )}
              {activeTab === 'training' && (
                <>
                  <li>Training load peaked in week 3 at 75 units</li>
                  <li>Intensity correlates with match performance improvements</li>
                  <li>Current load at sustainable levels for competition phase</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;