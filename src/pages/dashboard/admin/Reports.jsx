import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { FiFilter, FiRefreshCw, FiTrendingUp, FiAward, FiClock, FiUsers, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

// Sport-specific data and metrics
const sportsData = {
  Rugby: {
    color: "#E53E3E",
    metrics: [
      { name: "Tackles", value: 87, trend: "up" },
      { name: "Lineouts Won", value: 92, trend: "up" },
      { name: "Penalties", value: 15, trend: "down" },
      { name: "Possession %", value: 62, trend: "steady" }
    ],
    players: [
      { name: "John Smith", tries: 8, tackles: 42, meters: 387 },
      { name: "Mike Johnson", tries: 5, tackles: 37, meters: 412 }
    ]
  },
  Football: {
    color: "#38A169",
    metrics: [
      { name: "Pass Accuracy", value: 84, trend: "up" },
      { name: "Shots on Target", value: 12, trend: "steady" },
      { name: "Fouls", value: 8, trend: "down" },
      { name: "Possession %", value: 58, trend: "up" }
    ],
    players: [
      { name: "David Beck", goals: 5, assists: 3, passes: 89 },
      { name: "Sam Wilson", goals: 3, assists: 6, passes: 112 }
    ]
  },
  Basketball: {
    color: "#DD6B20",
    metrics: [
      { name: "3P%", value: 38, trend: "up" },
      { name: "Rebounds", value: 42, trend: "steady" },
      { name: "Turnovers", value: 9, trend: "down" },
      { name: "Assists", value: 24, trend: "up" }
    ],
    players: [
      { name: "James Harden", points: 28, assists: 8, rebounds: 5 },
      { name: "Kevin Love", points: 18, assists: 3, rebounds: 12 }
    ]
  },
  Swimming: {
    color: "#3182CE",
    metrics: [
      { name: "50m Time", value: 24.8, trend: "down" },
      { name: "Strokes/Lap", value: 18, trend: "steady" },
      { name: "Turns", value: 8, trend: "up" },
      { name: "Starts", value: 9.2, trend: "up" }
    ],
    players: [
      { name: "Michael Phelps", events: 3, gold: 2, silver: 1 },
      { name: "Katie Ledecky", events: 2, gold: 2, silver: 0 }
    ]
  }
};

const trainingData = [
  { name: "Rugby", sessions: 14, hours: 45, wins: 8, losses: 2, injuries: 3 },
  { name: "Football", sessions: 18, hours: 50, wins: 10, losses: 5, injuries: 2 },
  { name: "Basketball", sessions: 12, hours: 35, wins: 7, losses: 4, injuries: 1 },
  { name: "Swimming", sessions: 10, hours: 30, wins: 6, losses: 1, injuries: 0 },
];

const performanceTrends = [
  { month: "Jan", Rugby: 65, Football: 70, Basketball: 60, Swimming: 75 },
  { month: "Feb", Rugby: 68, Football: 72, Basketball: 62, Swimming: 78 },
  { month: "Mar", Rugby: 72, Football: 75, Basketball: 65, Swimming: 80 },
  { month: "Apr", Rugby: 75, Football: 78, Basketball: 68, Swimming: 82 },
  { month: "May", Rugby: 78, Football: 80, Basketball: 72, Swimming: 85 },
];

const radarData = [
  { subject: "Defense", Rugby: 80, Football: 70, Basketball: 60, Swimming: 40 },
  { subject: "Offense", Rugby: 70, Football: 85, Basketball: 75, Swimming: 50 },
  { subject: "Teamwork", Rugby: 90, Football: 78, Basketball: 88, Swimming: 60 },
  { subject: "Stamina", Rugby: 85, Football: 82, Basketball: 76, Swimming: 90 },
  { subject: "Discipline", Rugby: 88, Football: 77, Basketball: 82, Swimming: 95 }
];

const COLORS = ["#E53E3E", "#38A169", "#DD6B20", "#3182CE"];

const Reports = () => {
  const [activeSport, setActiveSport] = useState("Rugby");
  const [timeRange, setTimeRange] = useState("season");
  const [isLoading, setIsLoading] = useState(false);
  const [predictiveData, setPredictiveData] = useState(null);
  const [showSportDropdown, setShowSportDropdown] = useState(false);

  // Simulate loading predictive data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPredictiveData({
        nextMatchWinProbability: 72,
        injuryRisk: 18,
        performanceTrend: "+7%"
      });
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeSport]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const renderTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <FiTrendingUp className="text-green-500" />;
      case "down":
        return <FiTrendingUp className="text-red-500 transform rotate-180" />;
      default:
        return <FiTrendingUp className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
          Sports Performance
        </h1>
        <p className="text-sm text-gray-600">
          Analytics and insights for {activeSport} program.
        </p>
      </motion.div>

      {/* Sport Navigation - Mobile Dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setShowSportDropdown(!showSportDropdown)}
          className="w-full flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-gray-300"
        >
          <span>{activeSport}</span>
          <FiChevronDown className={`transition-transform ${showSportDropdown ? 'transform rotate-180' : ''}`} />
        </button>
        
        {showSportDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
            {Object.keys(sportsData).map((sport) => (
              <button
                key={sport}
                onClick={() => {
                  setActiveSport(sport);
                  setShowSportDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 ${
                  activeSport === sport ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="season">Current Season</option>
          </select>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <FiRefreshCw className={`mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Sport-Specific Metrics - Horizontal Scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 overflow-x-auto pb-2"
      >
        <div className="flex space-x-3" style={{ minWidth: `${sportsData[activeSport].metrics.length * 160}px` }}>
          {sportsData[activeSport].metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 min-w-[150px]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500">{metric.name}</p>
                  <p className="text-xl font-bold mt-1">
                    {typeof metric.value === "number" && metric.name.includes("%")
                      ? `${metric.value}%`
                      : metric.value}
                  </p>
                </div>
                <div className="flex items-center">
                  {renderTrendIcon(metric.trend)}
                </div>
              </div>
              <div className="mt-3 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 rounded-full"
                  style={{
                    width: `${Math.min(100, metric.value)}%`,
                    backgroundColor: sportsData[activeSport].color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Predictive Analytics - Stacked on mobile */}
      {predictiveData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-3 mb-6"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <FiAward className="text-blue-500 mr-2" />
              <h3 className="font-medium text-sm">Win Probability</h3>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold mr-2">
                {predictiveData.nextMatchWinProbability}%
              </span>
              <span className="text-xs text-green-500 mb-1 flex items-center">
                <FiTrendingUp className="mr-1" /> +5%
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <FiUsers className="text-red-500 mr-2" />
              <h3 className="font-medium text-sm">Injury Risk</h3>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold mr-2">
                {predictiveData.injuryRisk}%
              </span>
              <span className="text-xs text-red-500 mb-1 flex items-center">
                <FiTrendingUp className="mr-1 transform rotate-180" /> -2%
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <FiClock className="text-orange-500 mr-2" />
              <h3 className="font-medium text-sm">Performance Trend</h3>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold">
                {predictiveData.performanceTrend}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Player Performance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 mb-6"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Top Performers</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  {activeSport === "Rugby" && (
                    <>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tries
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tkl
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meters
                      </th>
                    </>
                  )}
                  {activeSport === "Football" && (
                    <>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Goals
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ast
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pass
                      </th>
                    </>
                  )}
                  {activeSport === "Basketball" && (
                    <>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pts
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ast
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reb
                      </th>
                    </>
                  )}
                  {activeSport === "Swimming" && (
                    <>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Events
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gold
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Silver
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sportsData[activeSport].players.map((player, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 whitespace-nowrap text-sm font-medium">
                      {player.name.split(' ')[0]}
                    </td>
                    {Object.keys(player)
                      .filter(key => key !== "name")
                      .map((key, i) => (
                        <td key={i} className="px-2 py-2 whitespace-nowrap text-sm">
                          {player[key]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Performance Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={activeSport}
                  stroke={sportsData[activeSport].color}
                  fill={sportsData[activeSport].color}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Comprehensive Charts Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Training Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trainingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3182CE" />
                <YAxis yAxisId="right" orientation="right" stroke="#E53E3E" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sessions" name="Sessions" fill="#3182CE" />
                <Bar yAxisId="left" dataKey="hours" name="Hours" fill="#38A169" />
                <Bar yAxisId="right" dataKey="wins" name="Wins" fill="#E53E3E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Skill Radar</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="subject" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name={activeSport}
                  dataKey={activeSport}
                  stroke={sportsData[activeSport].color}
                  fill={sportsData[activeSport].color}
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;