import React, { useState } from "react";
import {
  LineChart,
  Line,
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
} from "recharts";

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
];

const MyProfile = () => {
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
    },
    imageUrl: "/public/image3.jpg",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEditClick = () => {
    setEditData({ ...player });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setPlayer(editData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const renderProfileTab = () => (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 text-center md:text-left">
        <img
          src={isEditing ? editData.imageUrl : player.imageUrl}
          alt={`${player.name} profile`}
          className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-blue-500 mx-auto md:mx-0"
        />
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
        {(isEditing ? Object.entries(editData) : Object.entries(player))
          .filter(([key]) =>
            [
              "name",
              "age",
              "gender",
              "team",
              "coach",
              "trainingLevel",
              "height",
              "weight",
              "position",
              "jerseyNumber",
              "contactNumber",
              "email",
              "parentName",
              "parentContact",
            ].includes(key)
          )
          .map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
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
          ))}
      </div>
    </div>
  );

  const renderInjuriesTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Injury History</h3>
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
          Player has no current medical restrictions. Last physical exam was completed on 2024-01-15.
        </p>
      </div>
    </div>
  );

  const renderStatsTab = () => {
    const { matchesPlayed, tries, conversions, tackles, penalties } = player.performanceStats;
    const avgTriesPerMatch = (tries / matchesPlayed).toFixed(2);
    const maxTries = Math.max(...performanceHistoryData.map((d) => d.tries));

    return (
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-gray-800">Performance Statistics</h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">Matches Played</p>
            <p className="text-3xl font-bold text-blue-600">{matchesPlayed}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">Tries</p>
            <p className="text-3xl font-bold text-blue-600">{tries}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">Conversions</p>
            <p className="text-3xl font-bold text-blue-600">{conversions}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">Tackles</p>
            <p className="text-3xl font-bold text-blue-600">{tackles}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">Penalties</p>
            <p className="text-3xl font-bold text-blue-600">{penalties}</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="p-4 bg-white border rounded-lg shadow-sm flex-1">
            <p className="text-gray-600 font-semibold">Average Tries per Match:</p>
            <p className="text-2xl font-bold">{avgTriesPerMatch}</p>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-sm flex-1">
            <p className="text-gray-600 font-semibold">Max Tries in a Match (Recent):</p>
            <p className="text-2xl font-bold">{maxTries}</p>
          </div>
        </div>

        {/* Line Chart for Performance over Time */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-4">Performance Trend Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={performanceHistoryData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tries" stroke="#3b82f6" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="tackles" stroke="#10b981" />
              <Line type="monotone" dataKey="score" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart for Skills */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-4">Skill Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar
                name={player.name}
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Coach's Notes */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Coach's Notes</h4>
          <p className="text-blue-700">
            "John has shown excellent improvement in his passing accuracy this season. Needs to work on defensive positioning."
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900">My Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm md:text-base self-start md:self-auto"
          >
            Edit
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="flex space-x-4 sm:space-x-8 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("injuries")}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === "injuries"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Injuries
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === "stats"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Statistics
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "injuries" && renderInjuriesTab()}
        {activeTab === "stats" && renderStatsTab()}
      </div>

      {/* Edit Buttons on Desktop */}
      {isEditing && (
        <div className="flex flex-col md:flex-row gap-4 mt-6 justify-end">
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancelClick}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
