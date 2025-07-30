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
import { 
  FaUser, FaEdit, FaSave, FaTimes, FaFileMedical, 
  FaChartLine, FaRunning, FaWeight, FaRulerVertical, 
  FaPhone, FaEnvelope, FaUserFriends, FaTrophy,
  FaMedal, FaHeartbeat, FaChartBar, FaChartPie
} from "react-icons/fa";
import { IoMdFitness } from "react-icons/io";
import { GiSoccerBall } from "react-icons/gi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerProfile = () => {
  // Performance data
  const performanceHistoryData = [
    { date: "Apr 1", matches: 1, tries: 2, tackles: 5, score: 85 },
    { date: "Apr 8", matches: 1, tries: 3, tackles: 6, score: 88 },
    { date: "Apr 15", matches: 1, tries: 1, tackles: 7, score: 90 },
    { date: "Apr 22", matches: 1, tries: 4, tackles: 8, score: 92 },
    { date: "Apr 29", matches: 1, tries: 3, tackles: 9, score: 93 },
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

  const COLORS = ['#6366F1', '#10B981', '#F59E0B'];

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
      { date: "Nov 20, 2024", injury: "Knee sprain", recoveryTime: "2 weeks", status: "Recovered" },
      { date: "Sep 10, 2023", injury: "Ankle twist", recoveryTime: "3 weeks", status: "Recovered" },
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
    achievements: [
      "Player of the Match (Apr 2025)",
      "Top Scorer U18 League 2024",
      "Most Improved Player 2023"
    ],
    imageUrl: "/public/image3.jpg",
    medicalNotes: "Player has no current medical restrictions. Last physical exam was completed on Jan 15, 2024.",
    coachNotes: "John has shown excellent improvement in his passing accuracy this season. Needs to work on defensive positioning.",
  });

  const [activeTab, setActiveTab] = useState("overview");
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
  const renderOverviewTab = () => {
    const { matchesPlayed, tries, conversions, tackles } = player.performanceStats;
    const avgTriesPerMatch = (tries / matchesPlayed).toFixed(2);
    const avgTacklesPerMatch = (tackles / matchesPlayed).toFixed(1);
    
    return (
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <div className="text-indigo-600 mb-1 flex items-center">
              <GiSoccerBall className="mr-2" />
              <span className="text-sm font-medium">Matches</span>
            </div>
            <div className="text-2xl font-bold text-indigo-800">{matchesPlayed}</div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <div className="text-emerald-600 mb-1 flex items-center">
              <FaTrophy className="mr-2" />
              <span className="text-sm font-medium">Tries</span>
            </div>
            <div className="text-2xl font-bold text-emerald-800">{tries}</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <div className="text-amber-600 mb-1 flex items-center">
              <FaChartBar className="mr-2" />
              <span className="text-sm font-medium">Conversions</span>
            </div>
            <div className="text-2xl font-bold text-amber-800">{conversions}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <div className="text-purple-600 mb-1 flex items-center">
              <IoMdFitness className="mr-2" />
              <span className="text-sm font-medium">Tackles</span>
            </div>
            <div className="text-2xl font-bold text-purple-800">{tackles}</div>
          </div>
        </div>

        {/* Profile and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={isEditing ? (tempImage || editData.imageUrl) : player.imageUrl}
                  alt={`${player.name} profile`}
                  className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white ring-2 ring-indigo-200"
                />
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      <FaEdit size={12} />
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
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {isEditing ? (
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="text-center px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                ) : (
                  player.name
                )}
              </h3>
              <p className="text-indigo-600 font-medium mb-3">
                #{player.jerseyNumber} | {player.position}
              </p>
              
              <div className="flex space-x-3 mb-4">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                  {player.team}
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                  {player.trainingLevel}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-500">Age</div>
                <div className="font-medium">{isEditing ? (
                  <input
                    name="age"
                    value={editData.age}
                    onChange={handleInputChange}
                    className="w-full px-1 py-0 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="number"
                  />
                ) : player.age}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-500">Height</div>
                <div className="font-medium">{isEditing ? (
                  <input
                    name="height"
                    value={editData.height}
                    onChange={handleInputChange}
                    className="w-full px-1 py-0 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                ) : player.height}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-500">Weight</div>
                <div className="font-medium">{isEditing ? (
                  <input
                    name="weight"
                    value={editData.weight}
                    onChange={handleInputChange}
                    className="w-full px-1 py-0 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                ) : player.weight}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-gray-500">Coach</div>
                <div className="font-medium">{isEditing ? (
                  <input
                    name="coach"
                    value={editData.coach}
                    onChange={handleInputChange}
                    className="w-full px-1 py-0 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                ) : player.coach}</div>
              </div>
            </div>
          </div>
          
          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-indigo-500" />
              Performance Trend
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceHistoryData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="tries" 
                  stroke="#10B981" 
                  name="Tries" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tackles" 
                  stroke="#6366F1" 
                  name="Tackles" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#F59E0B" 
                  name="Score" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
              <FaMedal className="mr-2 text-amber-500" />
              Achievements
            </h4>
            <ul className="space-y-2">
              {player.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-2 text-amber-500">
                    <FaTrophy size={14} />
                  </span>
                  <span className="text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
              <FaEnvelope className="mr-2 text-indigo-500" />
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-medium">
                    {isEditing ? (
                      <input
                        name="contactNumber"
                        value={editData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    ) : player.contactNumber}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium">
                    {isEditing ? (
                      <input
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    ) : player.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Parent/Guardian</div>
                  <div className="font-medium">
                    {isEditing ? (
                      <input
                        name="parentName"
                        value={editData.parentName}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    ) : player.parentName}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Parent Contact</div>
                  <div className="font-medium">
                    {isEditing ? (
                      <input
                        name="parentContact"
                        value={editData.parentContact}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    ) : player.parentContact}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatsTab = () => {
    const { matchesPlayed, tries, conversions, tackles, penalties, metersGained, cleanBreaks, turnoversWon } = player.performanceStats;
    const avgTriesPerMatch = (tries / matchesPlayed).toFixed(2);
    const avgTacklesPerMatch = (tackles / matchesPlayed).toFixed(1);
    const avgMetersPerMatch = (metersGained / matchesPlayed).toFixed(0);

    return (
      <div className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <GiSoccerBall className="mr-2 text-emerald-500" />
              <span className="font-medium text-gray-700">Tries per Match</span>
            </div>
            <div className="text-3xl font-bold text-emerald-600">{avgTriesPerMatch}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <IoMdFitness className="mr-2 text-indigo-500" />
              <span className="font-medium text-gray-700">Tackles per Match</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600">{avgTacklesPerMatch}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <FaRunning className="mr-2 text-amber-500" />
              <span className="font-medium text-gray-700">Meters per Match</span>
            </div>
            <div className="text-3xl font-bold text-amber-600">{avgMetersPerMatch}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Position Comparison */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">Position Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionComparisonData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Legend />
                <Bar dataKey="tries" fill="#10B981" name="Tries" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tackles" fill="#6366F1" name="Tackles" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="#F59E0B" name="Conversions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Radar */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">Skill Assessment</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                  name={player.name}
                  dataKey="value"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">Performance Distribution</h4>
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">Detailed Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Matches Played", value: matchesPlayed, color: "indigo" },
                { label: "Clean Breaks", value: cleanBreaks, color: "emerald" },
                { label: "Turnovers Won", value: turnoversWon, color: "purple" },
                { label: "Penalties", value: penalties, color: "red" },
                { label: "Meters Gained", value: metersGained, color: "amber" },
                { label: "Conversion Rate", value: `${((conversions / tries) * 100).toFixed(1)}%`, color: "blue" },
              ].map((stat, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-800 mb-3 flex items-center">
              <FaUserFriends className="mr-2" />
              Coach's Evaluation
            </h4>
            <p className="text-indigo-700">{player.coachNotes}</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center">
              <FaChartLine className="mr-2" />
              Recent Highlights
            </h4>
            <ul className="list-disc pl-5 text-emerald-700 space-y-1">
              <li>Scored 3 tries in last 5 matches</li>
              <li>Improved tackle success rate by 15% this season</li>
              <li>Named Player of the Match on Apr 22, 2025</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderHealthTab = () => (
    <div className="space-y-6">
      {/* Injury History */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaHeartbeat className="mr-2 text-red-500" />
          Injury History
        </h3>
        
        {player.injuryHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Date", "Injury", "Recovery", "Status"].map((header) => (
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
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {injury.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                      {injury.injury}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {injury.recoveryTime}
                    </td>
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
      </div>

      {/* Medical Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center">
            <FaFileMedical className="mr-2 text-blue-500" />
            Medical Notes
          </h4>
          <p className="text-gray-700">
            {player.medicalNotes}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center">
            <FaHeartbeat className="mr-2 text-red-500" />
            Health Metrics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Resting HR</div>
              <div className="text-xl font-bold text-indigo-600">58 bpm</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">VO2 Max</div>
              <div className="text-xl font-bold text-emerald-600">52 ml/kg/min</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Last Physical</div>
              <div className="text-xl font-bold text-amber-600">Jan 15, 2024</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Recovery Index</div>
              <div className="text-xl font-bold text-purple-600">8.2/10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Player Profile
          </h2>
          <p className="text-gray-600">Comprehensive overview of player data and performance</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center shadow-sm"
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center shadow-sm"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-1">
          {[
            { id: "overview", label: "Overview", icon: <FaUser className="mr-1" /> },
            { id: "stats", label: "Statistics", icon: <FaChartPie className="mr-1" /> },
            { id: "health", label: "Health", icon: <FaHeartbeat className="mr-1" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "stats" && renderStatsTab()}
        {activeTab === "health" && renderHealthTab()}
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        toastClassName="shadow-sm rounded-lg"
        progressClassName="bg-indigo-500"
      />
    </div>
  );
};

export default PlayerProfile;