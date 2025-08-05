import React, { useState, useEffect } from 'react';
import { FaUserInjured, FaCalendarAlt, FaSearch, FaPlus, FaFilter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const InjuryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInjury, setNewInjury] = useState({
    name: '',
    injury: '',
    date: new Date().toISOString().split('T')[0],
    severity: 'medium',
    status: 'active',
    imageUrl: ''
  });

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchInjuryLogs = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = [
          { 
            id: 1, 
            name: "John Doe", 
            injury: "Knee sprain", 
            date: "2025-06-25", 
            severity: "high", 
            status: "active", 
            recoveryTime: "4-6 weeks",
            imageUrl: "/pro11.jpg"
          },
          { 
            id: 2, 
            name: "Sarah Lee", 
            injury: "Ankle twist", 
            date: "2025-06-20", 
            severity: "medium", 
            status: "recovering", 
            recoveryTime: "2-3 weeks",
            imageUrl: "/pro1.jpg"
          },
          { 
            id: 3, 
            name: "Mike Johnson", 
            injury: "Hamstring strain", 
            date: "2025-06-18", 
            severity: "high", 
            status: "active", 
            recoveryTime: "6-8 weeks",
            imageUrl: "/image2.jpg"
          },
          { 
            id: 4, 
            name: "Emma Wilson", 
            injury: "Shoulder dislocation", 
            date: "2025-06-10", 
            severity: "critical", 
            status: "recovering", 
            recoveryTime: "8-10 weeks",
            imageUrl: "/pro11.jpg"
          },
          { 
            id: 5, 
            name: "David Kim", 
            injury: "Concussion", 
            date: "2025-05-28", 
            severity: "high", 
            status: "recovered", 
            recoveryTime: "3-4 weeks",
            imageUrl: "/photo9.jpg"
          },
        ];
        
        setLogs(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load injury logs');
        setLoading(false);
        console.error(err);
      }
    };

    fetchInjuryLogs();
  }, []);

  const handleAddInjury = (e) => {
    e.preventDefault();
    const newId = Math.max(...logs.map(log => log.id), 0) + 1;
    setLogs([...logs, { 
      id: newId, 
      ...newInjury, 
      recoveryTime: getRecoveryTime(newInjury.severity),
      imageUrl: newInjury.imageUrl || 'https://via.placeholder.com/150?text=Player'
    }]);
    setShowAddForm(false);
    setNewInjury({
      name: '',
      injury: '',
      date: new Date().toISOString().split('T')[0],
      severity: 'medium',
      status: 'active',
      imageUrl: ''
    });
  };

  const getRecoveryTime = (severity) => {
    switch(severity) {
      case 'low': return '1-2 weeks';
      case 'medium': return '2-4 weeks';
      case 'high': return '4-6 weeks';
      case 'critical': return '6-12 weeks';
      default: return 'Unknown';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-red-500';
      case 'recovering': return 'text-yellow-500';
      case 'recovered': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredLogs = logs.filter(log => {
    // Search filter
    const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.injury.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filter
    const logDate = new Date(log.date);
    const now = new Date();
    const daysDiff = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));
    
    let matchesDate = true;
    if (dateFilter === 'week') matchesDate = daysDiff <= 7;
    else if (dateFilter === 'month') matchesDate = daysDiff <= 30;
    else if (dateFilter === 'older') matchesDate = daysDiff > 30;
    
    return matchesSearch && matchesDate;
  });

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaUserInjured className="mr-2" /> Injury Logs
        </h2>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search injuries..."
              className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              className="border rounded-md px-3 py-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="older">Older</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Add Injury
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Injury</h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <IoMdClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddInjury}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newInjury.name}
                    onChange={(e) => setNewInjury({...newInjury, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player Image URL</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newInjury.imageUrl}
                    onChange={(e) => setNewInjury({...newInjury, imageUrl: e.target.value})}
                    placeholder="Leave blank for default"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Injury Description</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newInjury.injury}
                    onChange={(e) => setNewInjury({...newInjury, injury: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={newInjury.date}
                    onChange={(e) => setNewInjury({...newInjury, date: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={newInjury.severity}
                    onChange={(e) => setNewInjury({...newInjury, severity: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={newInjury.status}
                    onChange={(e) => setNewInjury({...newInjury, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="recovering">Recovering</option>
                    <option value="recovered">Recovered</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Injury
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No injury logs found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Injury</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover"
                            src={log.imageUrl} 
                            alt={log.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150?text=Player';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{log.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{log.injury}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        {new Date(log.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getStatusColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {log.recoveryTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InjuryLogs;