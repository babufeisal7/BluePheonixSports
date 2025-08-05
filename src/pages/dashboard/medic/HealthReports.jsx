import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiHeart, FiAlertTriangle, FiCheckCircle, FiCalendar, 
  FiPlus, FiEdit2, FiFileText, FiDownload, FiPrinter, FiSearch 
} from 'react-icons/fi';

const HealthReports = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [userType, setUserType] = useState('players');
  const [expandedUser, setExpandedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    userId: '',
    type: 'checkup',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    diagnosis: '',
    treatment: '',
    medication: '',
    nextAppointment: ''
  });

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        // Simulate API calls with mock data
        const mockPlayers = [
          {
            id: 1,
            name: 'John Doe',
            position: 'Forward',
            status: 'healthy',
            lastCheckup: '2023-05-15',
            injuries: [],
            fitnessLevel: 92,
            imageUrl: '/pro11.jpg',
            medicalHistory: [
              {
                id: 101,
                date: '2023-05-15',
                type: 'routine',
                notes: 'Annual physical examination',
                diagnosis: 'Healthy',
                treatment: 'None',
                medication: 'None',
                physician: 'Dr. Smith'
              }
            ],
            vitals: {
              heartRate: 62,
              bloodPressure: '120/80',
              oxygenLevel: 98,
              temperature: 36.6
            },
            biometrics: {
              height: '185cm',
              weight: '82kg',
              bmi: 23.9
            }
          },
          {
            id: 2,
            name: 'Jane Smith',
            position: 'Midfielder',
            status: 'injured',
            lastCheckup: '2023-06-20',
            injuries: ['Sprained ankle (Grade 2)'],
            fitnessLevel: 65,
            imageUrl: '/image3.jpg',
            medicalHistory: [
              {
                id: 102,
                date: '2023-06-20',
                type: 'injury',
                notes: 'Sustained during match against City FC',
                diagnosis: 'Grade 2 ankle sprain',
                treatment: 'RICE protocol, physiotherapy',
                medication: 'Ibuprofen 400mg every 8 hours as needed',
                physician: 'Dr. Johnson'
              }
            ],
            vitals: {
              heartRate: 68,
              bloodPressure: '118/76',
              oxygenLevel: 97,
              temperature: 36.8
            },
            biometrics: {
              height: '170cm',
              weight: '65kg',
              bmi: 22.5
            }
          }
        ];

        const mockCoaches = [
          {
            id: 101,
            name: 'Coach Williams',
            role: 'Head Coach',
            status: 'healthy',
            lastCheckup: '2023-04-10',
            medicalHistory: [
              {
                id: 201,
                date: '2023-04-10',
                type: 'routine',
                notes: 'Annual health screening',
                diagnosis: 'Elevated cholesterol',
                treatment: 'Dietary changes recommended',
                medication: 'None',
                physician: 'Dr. Lee'
              }
            ],
            vitals: {
              heartRate: 70,
              bloodPressure: '130/85',
              oxygenLevel: 96,
              temperature: 36.7
            }
          }
        ];

        const mockStaff = [
          {
            id: 201,
            name: 'Alex Taylor',
            role: 'Physiotherapist',
            status: 'recovering',
            lastCheckup: '2023-06-15',
            medicalHistory: [
              {
                id: 301,
                date: '2023-06-15',
                type: 'illness',
                notes: 'Persistent back pain',
                diagnosis: 'Herniated disc L4-L5',
                treatment: 'Physical therapy, limited lifting',
                medication: 'Naproxen 500mg twice daily',
                physician: 'Dr. Chen'
              }
            ],
            vitals: {
              heartRate: 72,
              bloodPressure: '125/82',
              oxygenLevel: 97,
              temperature: 36.9
            }
          }
        ];

        setPlayers(mockPlayers);
        setCoaches(mockCoaches);
        setStaff(mockStaff);
        setLoading(false);
      } catch (err) {
        setError('Failed to load health data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchHealthData();
  }, [teamId]);

  const toggleUserDetails = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const handleAddReport = () => {
    // In a real app, this would submit to an API
    const currentUsers = userType === 'players' ? players : 
                       userType === 'coaches' ? coaches : staff;
    
    const updatedUsers = currentUsers.map(user => {
      if (user.id.toString() === newReport.userId) {
        const newMedicalRecord = {
          id: Math.floor(Math.random() * 1000),
          date: newReport.date,
          type: newReport.type,
          notes: newReport.notes,
          diagnosis: newReport.diagnosis,
          treatment: newReport.treatment,
          medication: newReport.medication,
          physician: 'Dr. Current' // Would be current user in real app
        };
        
        return {
          ...user,
          medicalHistory: [...user.medicalHistory, newMedicalRecord],
          lastCheckup: newReport.date,
          status: newReport.type === 'injury' ? 'injured' : 
                 newReport.type === 'recovery' ? 'recovering' : 'healthy'
        };
      }
      return user;
    });

    if (userType === 'players') setPlayers(updatedUsers);
    else if (userType === 'coaches') setCoaches(updatedUsers);
    else setStaff(updatedUsers);

    setShowAddReportModal(false);
    setNewReport({
      userId: '',
      type: 'checkup',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      diagnosis: '',
      treatment: '',
      medication: '',
      nextAppointment: ''
    });
  };

  const getCurrentUsers = () => {
    let currentUsers = [];
    if (userType === 'players') currentUsers = players;
    else if (userType === 'coaches') currentUsers = coaches;
    else currentUsers = staff;

    return currentUsers.filter(user => {
      // Filter by status
      if (filter !== 'all' && user.status !== filter) return false;
      
      // Filter by search term
      if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'injured':
        return 'bg-red-100 text-red-800';
      case 'recovering':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const currentUsers = getCurrentUsers();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Add Report Modal */}
      {showAddReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Add Medical Report</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={newReport.userId}
                  onChange={(e) => setNewReport({...newReport, userId: e.target.value})}
                >
                  <option value="">Select user</option>
                  {(userType === 'players' ? players : 
                    userType === 'coaches' ? coaches : staff).map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={newReport.type}
                  onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                >
                  <option value="checkup">Routine Checkup</option>
                  <option value="injury">Injury Assessment</option>
                  <option value="illness">Illness</option>
                  <option value="recovery">Recovery Update</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2"
                  value={newReport.date}
                  onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment</label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2"
                  value={newReport.nextAppointment}
                  onChange={(e) => setNewReport({...newReport, nextAppointment: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter diagnosis"
                value={newReport.diagnosis}
                onChange={(e) => setNewReport({...newReport, diagnosis: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows="2"
                placeholder="Enter treatment plan"
                value={newReport.treatment}
                onChange={(e) => setNewReport({...newReport, treatment: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows="2"
                placeholder="Enter prescribed medication"
                value={newReport.medication}
                onChange={(e) => setNewReport({...newReport, medication: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows="3"
                placeholder="Additional notes"
                value={newReport.notes}
                onChange={(e) => setNewReport({...newReport, notes: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setShowAddReportModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddReport}
                disabled={!newReport.userId}
              >
                Save Report
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Medical Health Reports</h2>
        <div className="flex space-x-3">
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowAddReportModal(true)}
          >
            <FiPlus className="mr-2" />
            Add Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded-md ${userType === 'players' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setUserType('players')}
            >
              Players
            </button>
            <button
              className={`px-4 py-2 rounded-md ${userType === 'coaches' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setUserType('coaches')}
            >
              Coaches
            </button>
            <button
              className={`px-4 py-2 rounded-md ${userType === 'staff' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setUserType('staff')}
            >
              Staff
            </button>
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="border rounded-md px-3 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="healthy">Healthy</option>
              <option value="injured">Injured</option>
              <option value="recovering">Recovering</option>
            </select>
          </div>
        </div>
      </div>

      {currentUsers.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p>No {userType} match the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleUserDetails(user.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {user.imageUrl ? (
                      <img 
                        src={user.imageUrl} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/48?text=User';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-500" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getStatusIcon(user.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {user.position || user.role}
                      {userType === 'players' && user.fitnessLevel && (
                        <span className="ml-2">• Fitness: {user.fitnessLevel}%</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1" />
                    {new Date(user.lastCheckup).toLocaleDateString()}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedUser === user.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expandedUser === user.id && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      {user.imageUrl ? (
                        <img 
                          src={user.imageUrl} 
                          alt={user.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/96?text=User';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                          <FiUser className="text-gray-500 text-3xl" />
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <h4 className="font-bold text-gray-800">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.position || user.role}</p>
                      </div>
                      
                      {userType === 'players' && user.biometrics && (
                        <div className="w-full bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-3">Biometrics</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-gray-500">Height</p>
                              <p className="font-medium">{user.biometrics.height}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Weight</p>
                              <p className="font-medium">{user.biometrics.weight}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">BMI</p>
                              <p className="font-medium">{user.biometrics.bmi}</p>
                            </div>
                            {user.fitnessLevel && (
                              <div>
                                <p className="text-xs text-gray-500">Fitness</p>
                                <p className="font-medium">{user.fitnessLevel}%</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="w-full bg-white p-4 rounded-lg shadow-sm mt-3">
                        <h4 className="font-medium text-gray-700 mb-3">Vitals</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Heart Rate</p>
                            <p className="font-medium">{user.vitals.heartRate} bpm</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Blood Pressure</p>
                            <p className="font-medium">{user.vitals.bloodPressure}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Oxygen Level</p>
                            <p className="font-medium">{user.vitals.oxygenLevel}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Temperature</p>
                            <p className="font-medium">{user.vitals.temperature}°C</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-700">Medical History</h4>
                          <button 
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              setNewReport({
                                ...newReport,
                                userId: user.id.toString(),
                                type: 'checkup',
                                date: new Date().toISOString().split('T')[0]
                              });
                              setShowAddReportModal(true);
                            }}
                          >
                            <FiPlus className="mr-1" /> Add Record
                          </button>
                        </div>
                        
                        {user.medicalHistory.length > 0 ? (
                          <div className="space-y-3">
                            {user.medicalHistory.map((record, index) => (
                              <div key={record.id} className="border-l-4 border-blue-200 pl-3 py-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {record.type.charAt(0).toUpperCase() + record.type.slice(1)} - {record.diagnosis}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(record.date).toLocaleDateString()} • {record.physician}
                                    </p>
                                  </div>
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <FiEdit2 size={14} />
                                  </button>
                                </div>
                                {record.notes && (
                                  <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                                )}
                                {(record.treatment || record.medication) && (
                                  <div className="mt-2 text-sm">
                                    {record.treatment && (
                                      <p className="text-gray-700">
                                        <span className="font-medium">Treatment:</span> {record.treatment}
                                      </p>
                                    )}
                                    {record.medication && (
                                      <p className="text-gray-700">
                                        <span className="font-medium">Medication:</span> {record.medication}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No medical records found</p>
                        )}
                      </div>
                      
                      {userType === 'players' && user.injuries && user.injuries.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-2">Current Injuries</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {user.injuries.map((injury, index) => (
                              <li key={index} className="text-sm text-gray-600">{injury}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-gray-700 mb-3">Current Status</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {user.status === 'healthy' 
                            ? 'No current medical concerns. User is cleared for all activities.'
                            : user.status === 'injured'
                            ? 'User has active medical issues and is not cleared for full activities.'
                            : 'User is making progress in recovery and may participate in limited activities.'}
                        </p>
                        
                        {userType === 'players' && user.fitnessLevel && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Fitness Level</span>
                              <span>{user.fitnessLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  user.fitnessLevel >= 90 ? 'bg-green-500' :
                                  user.fitnessLevel >= 70 ? 'bg-blue-500' :
                                  'bg-yellow-500'
                                }`} 
                                style={{ width: `${user.fitnessLevel}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-center space-x-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50">
                            <FiFileText size={16} />
                            <span>Generate Report</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50">
                            <FiDownload size={16} />
                            <span>Export Data</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50">
                            <FiPrinter size={16} />
                            <span>Print Summary</span>
                          </button>
                          <button 
                            className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            onClick={() => {
                              setNewReport({
                                ...newReport,
                                userId: user.id.toString(),
                                type: 'checkup',
                                date: new Date().toISOString().split('T')[0]
                              });
                              setShowAddReportModal(true);
                            }}
                          >
                            <FiPlus size={16} />
                            <span>Add Note</span>
                          </button>
                        </div>
                      </div>
                      
                      {user.medicalHistory.some(r => r.nextAppointment) && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-2">Upcoming Appointments</h4>
                          <div className="space-y-2">
                            {user.medicalHistory
                              .filter(r => r.nextAppointment)
                              .sort((a, b) => new Date(a.nextAppointment) - new Date(b.nextAppointment))
                              .map((record, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <FiCalendar className="mr-2 text-gray-500" />
                                  <span className="font-medium">
                                    {new Date(record.nextAppointment).toLocaleDateString()}:
                                  </span>
                                  <span className="ml-1 text-gray-600">{record.physician || 'Follow-up'}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
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