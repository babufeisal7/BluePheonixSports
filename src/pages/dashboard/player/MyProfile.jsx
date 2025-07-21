import React, { useState, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FaUser, FaEdit, FaSave, FaTimes, FaFileMedical, FaChartLine, FaRunning, FaWeight, FaRulerVertical, FaPhone, FaEnvelope, FaUserFriends } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerProfile = () => {
  // Performance data
  const performanceHistoryData = [
    { date: "2025-04-01", matches: 1, tries: 2, tackles: 5, score: 85 },
    { date: "2025-04-08", matches: 1, tries: 3, tackles: 6, score: 88 },
    { date: "2025-04-15", matches: 1, tries: 1, tackles: 7, score: 90 },
    { date: "2025-04-22", matches: 1, tries: 4, tackles: 8, score: 92 },
    { date: "2025-04-29", matches: 1, tries: 3, tackles: 9, score: 93 },
  ];

  const skillRadarData = [
    { skill: "Endurance", value: 8.2, fullMark: 10 },
    { skill: "Strength", value: 7.8, fullMark: 10 },
    { skill: "Speed", value: 9.1, fullMark: 10 },
    { skill: "Flexibility", value: 6.5, fullMark: 10 },
    { skill: "Agility", value: 8.7, fullMark: 10 },
    { skill: "Game IQ", value: 8.9, fullMark: 10 },
  ];

  const positionComparisonData = [
    { name: 'You', tries: 15, tackles: 87, conversions: 32 },
    { name: 'Team Avg', tries: 9, tackles: 65, conversions: 28 },
    { name: 'Top Player', tries: 18, tackles: 92, conversions: 40 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Player state
  const [player, setPlayer] = useState({
    name: "John Doe",
    age: 17,
    gender: "Male",
    team: "U18 Rugby",
    coach: "Coach Daniel",
    trainingLevel: "Advanced",
    height: "182 cm",
    weight: "78 kg",
    position: "Fly-half",
    jerseyNumber: 10,
    contactNumber: "+1 555-123-4567",
    email: "john.doe@example.com",
    parentName: "Jane Doe",
    parentContact: "+1 555-987-6543",
    injuryHistory: [
      { date: "2024-11-20", injury: "Knee sprain", recoveryTime: "2 weeks", status: "Recovered" },
      { date: "2023-09-10", injury: "Ankle twist", recoveryTime: "3 weeks", status: "Recovered" },
    ],
    performanceStats: {
      matchesPlayed: 24,
      tries: 15,
      conversions: 32,
      tackles: 87,
      penalties: 5,
      metersGained: 1245,
      cleanBreaks: 18,
      turnoversWon: 12,
    },
    imageUrl: "/public/image3.jpg",
    medicalNotes: "Player has no current medical restrictions. Last physical exam was completed on 2024-01-15.",
    coachNotes: "John has shown excellent improvement in his passing accuracy this season. Needs to work on defensive positioning.",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handlers
  const handleEditClick = () => {
    setEditData({ ...player });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setPlayer(editData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setEditData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Tab renderers
  const renderProfileTab = () => (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 text-center md:text-left">
        <div className="relative">
          <img
            src={isEditing ? (tempImage || editData.imageUrl) : player.imageUrl}
            alt={`${player.name} profile`}
            className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-blue-500 mx-auto md:mx-0"
          />
          {isEditing && (
            <>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              >
                <FaEdit size={14} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          )}
        </div>
        
        {isEditing && (
          <input
            type="text"
            name="imageUrl"
            value={editData.imageUrl}
            onChange={handleInputChange}
            className="mt-3 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Image URL"
          />
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
        {[
          { key: "name", icon: <FaUser className="mr-2" /> },
          { key: "age", icon: null },
          { key: "gender", icon: null },
          { key: "team", icon: <FaUserFriends className="mr-2" /> },
          { key: "coach", icon: null },
          { key: "trainingLevel", icon: null },
          { key: "height", icon: <FaRulerVertical className="mr-2" /> },
          { key: "weight", icon: <FaWeight className="mr-2" /> },
          { key: "position", icon: <FaRunning className="mr-2" /> },
          { key: "jerseyNumber", icon: null },
          { key: "contactNumber", icon: <FaPhone className="mr-2" /> },
          { key: "email", icon: <FaEnvelope className="mr-2" /> },
          { key: "parentName", icon: null },
          { key: "parentContact", icon: null },
        ].map(({ key, icon }) => {
          const value = isEditing ? editData[key] : player[key];
          return (
            <div key={key} className="flex items-center">
              {icon}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                </label>
                {isEditing ? (
                  key === "gender" ? (
                    <select
                      name="gender"
                      value={value}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : key === "trainingLevel" ? (
                    <select
                      name="trainingLevel"
                      value={value}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  ) : (
                    <input
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                    />
                  )
                ) : (
                  <p className="text-lg font-medium">{value}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderInjuriesTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <FaFileMedical className="mr-2 text-red-500" />
        Injury History
      </h3>
      
      {player.injuryHistory.length > 0 ? (
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Date", "Injury", "Recovery Time", "Status"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {player.injuryHistory.map((injury, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{injury.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{injury.injury}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{injury.recoveryTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        injury.status === "Recovered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {injury.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 italic">No injury history recorded.</p>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Medical Notes</h4>
        <p className="text-blue-700">
          {player.medicalNotes}
        </p>
      </div>
    </div>
  );

  const renderStatsTab = () => {
    const { matchesPlayed, tries, conversions, tackles, penalties, metersGained, cleanBreaks, turnoversWon } = player.performanceStats;
    const avgTriesPerMatch = (tries / matchesPlayed).toFixed(2);
    const avgTacklesPerMatch = (tackles / matchesPlayed).toFixed(1);
    const avgMetersPerMatch = (metersGained / matchesPlayed).toFixed(0);
    const maxTries = Math.max(...performanceHistoryData.map(d => d.tries));
    const maxScore = Math.max(...performanceHistoryData.map(d => d.score));

    return (
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" />
          Performance Analytics
        </h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: "Matches", value: matchesPlayed, color: "blue" },
            { label: "Tries", value: tries, color: "green" },
            { label: "Conversions", value: conversions, color: "indigo" },
            { label: "Tackles", value: tackles, color: "purple" },
            { label: "Penalties", value: penalties, color: "red" },
            { label: "Meters Gained", value: metersGained, color: "yellow" },
            { label: "Clean Breaks", value: cleanBreaks, color: "pink" },
            { label: "Turnovers Won", value: turnoversWon, color: "teal" },
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <p className="text-gray-600 font-semibold">Average Tries per Match</p>
            <p className="text-2xl font-bold text-green-600">{avgTriesPerMatch}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <p className="text-gray-600 font-semibold">Average Tackles per Match</p>
            <p className="text-2xl font-bold text-purple-600">{avgTacklesPerMatch}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <p className="text-gray-600 font-semibold">Average Meters per Match</p>
            <p className="text-2xl font-bold text-yellow-600">{avgMetersPerMatch}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">Performance Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceHistoryData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tries" stroke="#10B981" name="Tries" strokeWidth={2} />
                <Line type="monotone" dataKey="tackles" stroke="#3B82F6" name="Tackles" strokeWidth={2} />
                <Line type="monotone" dataKey="score" stroke="#F59E0B" name="Score" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Position Comparison */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">Position Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionComparisonData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tries" fill="#10B981" name="Tries" />
                <Bar dataKey="tackles" fill="#3B82F6" name="Tackles" />
                <Bar dataKey="conversions" fill="#F59E0B" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Radar */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">Skill Assessment</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                  name={player.name}
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Distribution */}
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">Performance Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Tries', value: tries },
                    { name: 'Tackles', value: tackles },
                    { name: 'Conversions', value: conversions }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Coach's Evaluation</h4>
            <p className="text-blue-700">{player.coachNotes}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Recent Highlights</h4>
            <ul className="list-disc pl-5 text-green-700 space-y-1">
              <li>Scored 3 tries in last 5 matches</li>
              <li>Improved tackle success rate by 15% this season</li>
              <li>Named Player of the Match on 2025-04-22</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <FaUser className="mr-3 text-blue-600" />
          Player Profile
        </h2>
        <div className="flex gap-3 self-start md:self-auto">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="flex space-x-4 sm:space-x-8 whitespace-nowrap">
          {[
            { id: "profile", label: "Profile", icon: <FaUser className="mr-1" /> },
            { id: "injuries", label: "Injuries", icon: <FaFileMedical className="mr-1" /> },
            { id: "stats", label: "Statistics", icon: <FaChartLine className="mr-1" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "injuries" && renderInjuriesTab()}
        {activeTab === "stats" && renderStatsTab()}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PlayerProfile;