import React, { useState } from 'react';
import {
  FiCalendar, FiUsers, FiStar, FiClipboard,
  FiClock, FiAward, FiUser, FiCheck
} from 'react-icons/fi';

const MatchAssignments = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      date: '2023-06-15',
      opponent: 'City FC',
      opponentLogo: '/logo2.png',
      teamLogo: '/logo.jpg',
      location: 'Home Stadium',
      time: '7:30 PM',
      formation: '4-3-3',
      roles: [
        { position: 'Forward', number: 9, name: 'You', instructions: 'Stay high, press defenders', rating: null },
        { position: 'Midfielder', number: 8, name: 'Alex', instructions: 'Box-to-box coverage', rating: null },
      ],
      preparationNotes: 'Focus on quick counter-attacks. Their weak spot is left defense.',
      performanceSummary: '',
      completed: false
    },
    // Add more matches as needed
  ]);

  const [performanceData, setPerformanceData] = useState({});
  const [activeTab, setActiveTab] = useState('upcoming');

  const handlePerformanceChange = (matchId, field, value) => {
    setPerformanceData({
      ...performanceData,
      [matchId]: {
        ...performanceData[matchId],
        [field]: value
      }
    });
  };

  const submitPerformance = (matchId) => {
    setMatches(matches.map(match =>
      match.id === matchId
        ? {
            ...match,
            roles: match.roles.map(role => ({
              ...role,
              rating: performanceData[matchId]?.[`rating-${role.number}`] || role.rating
            })),
            performanceSummary: performanceData[matchId]?.summary || match.performanceSummary
          }
        : match
    ));
  };

  const markAsCompleted = (matchId) => {
    setMatches(matches.map(match =>
      match.id === matchId ? { ...match, completed: true } : match
    ));
  };

  const upcomingMatches = matches.filter(m => !m.completed);
  const pastMatches = matches.filter(m => m.completed);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 bg-white rounded-lg shadow-md">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <FiCalendar className="mr-2 text-blue-600" /> Match Assignments
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Past Matches
          </button>
        </div>
      </div>

      {/* Match List */}
      {(activeTab === 'upcoming' ? upcomingMatches : pastMatches).map(match => (
        <div key={match.id} className="mb-6 border rounded-lg bg-gray-50">
          {/* Match Header */}
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b bg-white gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <img src={match.teamLogo} alt="Team" className="w-12 h-12" />
              <div>
                <div className="text-sm text-gray-500">{match.location}</div>
                <div className="text-lg font-bold">VS</div>
                <div className="text-sm">{match.date} • {match.time}</div>
              </div>
              <img src={match.opponentLogo} alt="Opponent" className="w-12 h-12" />
            </div>
            <div className="text-sm text-gray-600 mt-2 sm:mt-0">{match.formation}</div>
          </div>

          {/* Match Content */}
          <div className="p-4">
            {/* Your Role */}
            <h4 className="font-semibold flex items-center mb-2"><FiUser className="mr-2" /> Your Role</h4>
            {match.roles.filter(role => role.name === 'You').map(role => (
              <div key={role.position} className="mb-4 p-3 bg-blue-50 rounded-md">
                <div className="font-bold">#{role.number} {role.position}</div>
                <div className="text-sm">{role.instructions}</div>
              </div>
            ))}

            {/* Other Roles */}
            <h4 className="font-semibold flex items-center mb-2 mt-4"><FiUsers className="mr-2" /> Other Roles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {match.roles.filter(role => role.name !== 'You').map(role => (
                <div key={role.number} className="border p-2 rounded bg-white">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">#{role.number} {role.name}</span>
                    <span className="text-gray-600">{role.position}</span>
                  </div>
                  <div className="text-sm text-gray-600">{role.instructions}</div>
                </div>
              ))}
            </div>

            {/* Preparation Notes */}
            <h4 className="font-semibold flex items-center mt-4"><FiClipboard className="mr-2" /> Preparation Notes</h4>
            <p className="bg-white p-3 rounded border text-sm text-gray-700 mt-1">{match.preparationNotes}</p>

            {/* Controls for Upcoming or Past */}
            {activeTab === 'upcoming' ? (
              <div className="flex justify-center sm:justify-end mt-4">
                <button
                  onClick={() => markAsCompleted(match.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                >
                  <FiCheck className="mr-2" /> Mark as Completed
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <h4 className="font-semibold flex items-center mb-2"><FiAward className="mr-2" /> Performance Evaluation</h4>

                {match.roles.filter(r => r.name === 'You').map(role => (
                  <div key={role.number} className="mb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <span className="font-bold">#{role.number} {role.position}</span>
                        {role.rating && (
                          <span className="ml-3 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Rating: {role.rating}/10
                          </span>
                        )}
                      </div>
                      {!role.rating && (
                        <select
                          className="border rounded p-1 text-sm"
                          value={performanceData[match.id]?.[`rating-${role.number}`] || ''}
                          onChange={e =>
                            handlePerformanceChange(match.id, `rating-${role.number}`, e.target.value)
                          }
                        >
                          <option value="">Rate</option>
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{role.instructions}</div>
                  </div>
                ))}

                <textarea
                  className="w-full border rounded p-2 mt-2 text-sm"
                  placeholder="Write performance summary..."
                  value={performanceData[match.id]?.summary || ''}
                  onChange={e =>
                    handlePerformanceChange(match.id, 'summary', e.target.value)
                  }
                />

                <div className="flex justify-center sm:justify-end mt-2">
                  <button
                    onClick={() => submitPerformance(match.id)}
                    disabled={!performanceData[match.id]?.summary}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    Submit Evaluation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchAssignments;
