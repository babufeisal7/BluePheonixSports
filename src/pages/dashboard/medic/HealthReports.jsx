import React, { useState, useEffect } from 'react';
import { FiUser, FiHeart, FiAlertTriangle, FiCheckCircle, FiCalendar } from 'react-icons/fi';

const HealthReports = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayerHealthData = async () => {
      try {
        // Simulate API call with player images
        const mockData = [
          {
            id: 1,
            name: 'John Doe',
            position: 'Forward',
            status: 'healthy',
            lastCheckup: '2023-05-15',
            injuries: [],
            fitnessLevel: 92,
            imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          {
            id: 2,
            name: 'Jane Smith',
            position: 'Midfielder',
            status: 'injured',
            lastCheckup: '2023-06-20',
            injuries: ['Sprained ankle'],
            fitnessLevel: 65,
            imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          {
            id: 3,
            name: 'Mike Johnson',
            position: 'Defender',
            status: 'recovering',
            lastCheckup: '2023-06-10',
            injuries: ['Hamstring strain'],
            fitnessLevel: 78,
            imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
          {
            id: 4,
            name: 'Sarah Williams',
            position: 'Goalkeeper',
            status: 'healthy',
            lastCheckup: '2023-06-25',
            injuries: [],
            fitnessLevel: 88,
            imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
        ];
        
        setPlayers(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load player health data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlayerHealthData();
  }, [teamId]);

  const togglePlayerDetails = (playerId) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  const filteredPlayers = players.filter(player => {
    if (filter === 'all') return true;
    return player.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <FiCheckCircle className="text-green-500" />;
      case 'injured':
        return <FiAlertTriangle className="text-red-500" />;
      case 'recovering':
        return <FiHeart className="text-yellow-500" />;
      default:
        return <FiUser className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Player Health Reports</h2>
        <div className="flex space-x-2">
          <select
            className="border rounded-md px-3 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Players</option>
            <option value="healthy">Healthy</option>
            <option value="injured">Injured</option>
            <option value="recovering">Recovering</option>
          </select>
        </div>
      </div>

      {filteredPlayers.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p>No players match the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => togglePlayerDetails(player.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={player.imageUrl} 
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48?text=Player';
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getStatusIcon(player.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-500">{player.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1" />
                    {new Date(player.lastCheckup).toLocaleDateString()}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    player.fitnessLevel >= 90 ? 'bg-green-100 text-green-800' :
                    player.fitnessLevel >= 70 ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    Fitness: {player.fitnessLevel}%
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedPlayer === player.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expandedPlayer === player.id && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <img 
                        src={player.imageUrl} 
                        alt={player.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/96?text=Player';
                        }}
                      />
                      <div className="text-center">
                        <h4 className="font-bold text-gray-800">{player.name}</h4>
                        <p className="text-sm text-gray-600">{player.position}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Injury History</h4>
                      {player.injuries.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {player.injuries.map((injury, index) => (
                            <li key={index} className="text-sm text-gray-600">{injury}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No recent injuries</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Medical Notes</h4>
                      <p className="text-sm text-gray-500">
                        {player.status === 'healthy' 
                          ? 'Player is in optimal condition with no medical concerns.'
                          : player.status === 'injured'
                          ? 'Player is currently undergoing treatment and is not cleared for full training.'
                          : 'Player is making progress in recovery and may participate in limited training.'}
                      </p>
                      <div className="mt-3">
                        <h4 className="font-medium text-gray-700 mb-1">Fitness Progress</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              player.fitnessLevel >= 90 ? 'bg-green-500' :
                              player.fitnessLevel >= 70 ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`} 
                            style={{ width: `${player.fitnessLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthReports;