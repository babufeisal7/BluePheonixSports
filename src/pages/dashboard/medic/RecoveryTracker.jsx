import React, { useState, useEffect } from 'react';
import { 
  FaUserInjured, FaRunning, FaCalendarAlt, FaChartLine, FaPlus, 
  FaNotesMedical, FaFileMedical, FaFileDownload, FaFilePdf, 
  FaUserMd, FaClinicMedical, FaProcedures, FaEdit  // Added FaEdit here
} from 'react-icons/fa';
import { 
  IoMdFitness, IoMdAlert, IoMdCheckmarkCircle 
} from 'react-icons/io';
import { 
  GiMedicines, GiHealthNormal, GiHealing 
} from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecoveryTracker = () => {
  // Sample initial data with expanded fields
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      injury: 'ACL Tear (Grade 3)',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      position: 'Forward',
      team: 'First Team',
      startDate: '2023-06-15',
      injuryDate: '2023-06-10',
      expectedRecovery: '2023-12-01',
      progress: 65,
      status: 'Rehab',
      riskAssessment: 'Medium',
      physician: 'Dr. Sarah Johnson',
      physiotherapist: 'Mark Williams',
      milestones: [
        { 
          id: 1, 
          name: 'Initial Surgery', 
          date: '2023-06-20', 
          completed: true,
          notes: 'Successful reconstruction surgery. No complications.',
          provider: 'Dr. Sarah Johnson'
        },
        { 
          id: 2, 
          name: 'Weight Bearing', 
          date: '2023-08-01', 
          completed: true,
          notes: 'Began partial weight bearing. Responding well.',
          provider: 'Mark Williams'
        },
        { 
          id: 3, 
          name: 'Strength Training', 
          date: '2023-09-15', 
          completed: false,
          notes: 'Planned quad and hamstring strengthening',
          provider: 'Mark Williams'
        },
        { 
          id: 4, 
          name: 'Sport-Specific Drills', 
          date: '2023-11-01', 
          completed: false,
          notes: 'Anticipated start of cutting drills',
          provider: 'Dr. Sarah Johnson'
        }
      ],
      notes: [
        {
          id: 1,
          date: '2023-06-25',
          content: 'Post-op checkup. Incision healing well. Minimal swelling.',
          author: 'Dr. Sarah Johnson'
        },
        {
          id: 2,
          date: '2023-07-15',
          content: 'Began passive ROM exercises. Patient motivated and compliant.',
          author: 'Mark Williams'
        }
      ],
      medications: [
        {
          id: 1,
          name: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 8 hours as needed',
          startDate: '2023-06-20',
          endDate: '2023-07-05',
          prescribedBy: 'Dr. Sarah Johnson'
        }
      ],
      vitals: {
        lastChecked: '2023-08-10',
        heartRate: 62,
        bloodPressure: '118/76',
        painLevel: 2
      },
      rehabPlan: 'Phase 3: Progressive strength training and proprioception exercises'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      injury: 'Recurrent Shoulder Dislocation',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      position: 'Goalkeeper',
      team: 'First Team',
      startDate: '2023-07-10',
      injuryDate: '2023-07-08',
      expectedRecovery: '2023-10-25',
      progress: 85,
      status: 'Final Stage',
      riskAssessment: 'Low',
      physician: 'Dr. Michael Chen',
      physiotherapist: 'Lisa Rodriguez',
      milestones: [
        { 
          id: 1, 
          name: 'Immobilization', 
          date: '2023-07-10', 
          completed: true,
          notes: 'Shoulder sling for 2 weeks',
          provider: 'Dr. Michael Chen'
        },
        { 
          id: 2, 
          name: 'ROM Exercises', 
          date: '2023-08-01', 
          completed: true,
          notes: 'Passive then active ROM exercises',
          provider: 'Lisa Rodriguez'
        },
        { 
          id: 3, 
          name: 'Strength Training', 
          date: '2023-09-01', 
          completed: true,
          notes: 'Rotator cuff and scapular stabilization',
          provider: 'Lisa Rodriguez'
        },
        { 
          id: 4, 
          name: 'Return to Play', 
          date: '2023-10-15', 
          completed: false,
          notes: 'Gradual return to goalkeeping drills',
          provider: 'Dr. Michael Chen'
        }
      ],
      notes: [
        {
          id: 1,
          date: '2023-07-12',
          content: 'Patient reports minimal pain. Sling being worn as prescribed.',
          author: 'Dr. Michael Chen'
        },
        {
          id: 2,
          date: '2023-08-05',
          content: 'Excellent progress with ROM. Beginning light resistance exercises.',
          author: 'Lisa Rodriguez'
        }
      ],
      medications: [
        {
          id: 1,
          name: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'As needed for pain',
          startDate: '2023-07-10',
          endDate: '2023-07-17',
          prescribedBy: 'Dr. Michael Chen'
        }
      ],
      vitals: {
        lastChecked: '2023-08-12',
        heartRate: 58,
        bloodPressure: '112/74',
        painLevel: 1
      },
      rehabPlan: 'Final phase: Sport-specific drills and return to play protocol'
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMilestone, setNewMilestone] = useState({
    name: '',
    date: '',
    notes: '',
    provider: ''
  });
  const [newNote, setNewNote] = useState({
    content: '',
    author: ''
  });
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    prescribedBy: ''
  });
  const [filter, setFilter] = useState('all');
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    injury: '',
    position: '',
    team: '',
    injuryDate: new Date().toISOString().split('T')[0],
    expectedRecovery: '',
    physician: '',
    physiotherapist: ''
  });
  const [editingMilestone, setEditingMilestone] = useState(null);

  useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

  const toggleMilestone = (patientId, milestoneId) => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        const updatedMilestones = patient.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        let newStatus = patient.status;
        if (newProgress >= 90) newStatus = 'Final Stage';
        else if (newProgress >= 50) newStatus = 'Rehab';
        else newStatus = 'Initial Recovery';
        
        return { 
          ...patient, 
          milestones: updatedMilestones,
          progress: newProgress,
          status: newStatus
        };
      }
      return patient;
    }));
  };

  const addMilestone = () => {
    if (!newMilestone.name || !newMilestone.date || !selectedPatient) return;
    
    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const newMilestoneObj = {
          id: patient.milestones.length + 1,
          ...newMilestone,
          completed: false
        };
        
        return {
          ...patient,
          milestones: [...patient.milestones, newMilestoneObj]
        };
      }
      return patient;
    }));
    
    setNewMilestone({
      name: '',
      date: '',
      notes: '',
      provider: ''
    });
    toast.success('Milestone added successfully!');
  };

  const updateMilestone = () => {
    if (!editingMilestone || !selectedPatient) return;
    
    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const updatedMilestones = patient.milestones.map(milestone => {
          if (milestone.id === editingMilestone.id) {
            return { ...milestone, ...editingMilestone };
          }
          return milestone;
        });
        
        return {
          ...patient,
          milestones: updatedMilestones
        };
      }
      return patient;
    }));
    
    setEditingMilestone(null);
    toast.success('Milestone updated successfully!');
  };

  const addNote = () => {
    if (!newNote.content || !selectedPatient) return;
    
    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const newNoteObj = {
          id: patient.notes.length + 1,
          date: new Date().toISOString().split('T')[0],
          content: newNote.content,
          author: newNote.author || 'Medical Staff'
        };
        
        return {
          ...patient,
          notes: [...patient.notes, newNoteObj]
        };
      }
      return patient;
    }));
    
    setNewNote({
      content: '',
      author: ''
    });
    toast.success('Note added successfully!');
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !selectedPatient) return;
    
    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const newMedicationObj = {
          id: patient.medications.length + 1,
          ...newMedication
        };
        
        return {
          ...patient,
          medications: [...patient.medications, newMedicationObj]
        };
      }
      return patient;
    }));
    
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      prescribedBy: ''
    });
    toast.success('Medication added successfully!');
  };

  const addNewPatient = () => {
    if (!newPatient.name || !newPatient.injury || !newPatient.expectedRecovery) return;
    
    const patientId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    
    const newPatientObj = {
      id: patientId,
      ...newPatient,
      image: 'https://randomuser.me/api/portraits/' + (patientId % 2 === 0 ? 'women' : 'men') + `/${patientId % 100}.jpg`,
      startDate: new Date().toISOString().split('T')[0],
      progress: 0,
      status: 'Initial Recovery',
      riskAssessment: 'To be determined',
      milestones: [],
      notes: [],
      medications: [],
      vitals: {
        lastChecked: new Date().toISOString().split('T')[0],
        heartRate: 0,
        bloodPressure: '0/0',
        painLevel: 0
      },
      rehabPlan: 'To be developed'
    };
    
    setPatients([...patients, newPatientObj]);
    setShowNewPatientModal(false);
    setNewPatient({
      name: '',
      injury: '',
      position: '',
      team: '',
      injuryDate: new Date().toISOString().split('T')[0],
      expectedRecovery: '',
      physician: '',
      physiotherapist: ''
    });
    toast.success('Patient added successfully!');
  };

  const filteredPatients = patients.filter(patient => {
    if (filter === 'all') return true;
    if (filter === 'rehab') return patient.status === 'Rehab';
    if (filter === 'final') return patient.status === 'Final Stage';
    if (filter === 'initial') return patient.status === 'Initial Recovery';
    if (filter === 'behind') {
      const today = new Date();
      const recoveryDate = new Date(patient.expectedRecovery);
      return patient.progress < 50 && recoveryDate < today;
    }
    if (filter === 'highrisk') return patient.riskAssessment === 'High';
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Initial Recovery': return 'bg-red-100 text-red-800';
      case 'Rehab': return 'bg-yellow-100 text-yellow-800';
      case 'Final Stage': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDaysRemaining = (recoveryDate) => {
    const today = new Date();
    const recovery = new Date(recoveryDate);
    const diffTime = recovery - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const generateReport = () => {
    if (!selectedPatient) return;
    toast.info(`Generating report for ${selectedPatient.name}...`);
    // In a real app, this would generate a PDF or other document
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* New Patient Modal */}
      {showNewPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Injury</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.injury}
                    onChange={(e) => setNewPatient({...newPatient, injury: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.position}
                    onChange={(e) => setNewPatient({...newPatient, position: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.team}
                    onChange={(e) => setNewPatient({...newPatient, team: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Injury Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.injuryDate}
                    onChange={(e) => setNewPatient({...newPatient, injuryDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Recovery</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.expectedRecovery}
                    onChange={(e) => setNewPatient({...newPatient, expectedRecovery: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Physician</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.physician}
                    onChange={(e) => setNewPatient({...newPatient, physician: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Physiotherapist</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={newPatient.physiotherapist}
                    onChange={(e) => setNewPatient({...newPatient, physiotherapist: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowNewPatientModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={addNewPatient}
                  disabled={!newPatient.name || !newPatient.injury || !newPatient.expectedRecovery}
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Milestone Modal */}
      {editingMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Edit Milestone</h3>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={editingMilestone.name}
                    onChange={(e) => setEditingMilestone({...editingMilestone, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={editingMilestone.date}
                    onChange={(e) => setEditingMilestone({...editingMilestone, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={editingMilestone.provider}
                    onChange={(e) => setEditingMilestone({...editingMilestone, provider: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="w-full border rounded-md px-3 py-2"
                    rows="3"
                    value={editingMilestone.notes}
                    onChange={(e) => setEditingMilestone({...editingMilestone, notes: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setEditingMilestone(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={updateMilestone}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <FaUserInjured className="text-3xl text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Athlete Recovery Tracker</h1>
        </div>
        
        <div className="flex space-x-4">
          <select
            className="border rounded-md px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Patients</option>
            <option value="initial">Initial Recovery</option>
            <option value="rehab">In Rehab</option>
            <option value="final">Final Stage</option>
            <option value="behind">Behind Schedule</option>
            <option value="highrisk">High Risk</option>
          </select>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => setShowNewPatientModal(true)}
          >
            <FaPlus className="mr-2" /> New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Patients ({filteredPatients.length})</h2>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {filteredPatients.map(patient => (
              <div
                key={patient.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedPatient?.id === patient.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-center">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/48?text=Player';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{patient.name}</h3>
                      <div className="flex space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                        {patient.riskAssessment === 'High' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                            High Risk
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{patient.injury}</p>
                    <div className="flex items-center mt-2">
                      <FaChartLine className="text-blue-500 mr-2" />
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${patient.progress < 50 ? 'bg-red-500' : patient.progress < 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${patient.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium ml-2">{patient.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Details */}
        {selectedPatient && (
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <img
                  src={selectedPatient.image}
                  alt={selectedPatient.name}
                  className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/80?text=Player';
                  }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-gray-600">{selectedPatient.position}</span>
                        <span className="text-gray-600">• {selectedPatient.team}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Recovery Progress</div>
                      <div className="text-3xl font-bold" style={{ color: selectedPatient.progress < 50 ? '#ef4444' : selectedPatient.progress < 80 ? '#eab308' : '#22c55e' }}>
                        {selectedPatient.progress}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        <span className="text-sm">Injury Date</span>
                      </div>
                      <div className="font-medium">{new Date(selectedPatient.injuryDate).toLocaleDateString()}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500">
                        <FaRunning className="mr-2" />
                        <span className="text-sm">Expected Return</span>
                      </div>
                      <div className="font-medium">{new Date(selectedPatient.expectedRecovery).toLocaleDateString()}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500">
                        <IoMdFitness className="mr-2" />
                        <span className="text-sm">Days Remaining</span>
                      </div>
                      <div className="font-medium">
                        {calculateDaysRemaining(selectedPatient.expectedRecovery)}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500">
                        <GiHealthNormal className="mr-2" />
                        <span className="text-sm">Risk Assessment</span>
                      </div>
                      <div className={`font-medium px-2 py-1 rounded-full text-xs ${getRiskColor(selectedPatient.riskAssessment)}`}>
                        {selectedPatient.riskAssessment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  Recovery Milestones
                </h3>
                <button
                  onClick={generateReport}
                  className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  <FaFilePdf className="mr-2" />
                  Generate Report
                </button>
              </div>
              
              <div className="space-y-3 mb-4">
                {selectedPatient.milestones.map(milestone => (
                  <div
                    key={milestone.id}
                    className={`p-3 border rounded-lg ${milestone.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={milestone.completed}
                          onChange={() => toggleMilestone(selectedPatient.id, milestone.id)}
                          className="h-5 w-5 text-blue-600 rounded mr-3 mt-1"
                        />
                        <div className="flex-1">
                          <div className={`font-medium ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                            {milestone.name}
                          </div>
                          <div className="text-sm text-gray-500 mb-1">
                            {new Date(milestone.date).toLocaleDateString()} • {milestone.provider}
                          </div>
                          {milestone.notes && (
                            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-1">
                              {milestone.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-blue-600 ml-2"
                        onClick={() => setEditingMilestone(milestone)}
                      >
                        <FaEdit size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Add New Milestone</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Milestone Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Begin Running Program"
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={newMilestone.name}
                      onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={newMilestone.date}
                      onChange={(e) => setNewMilestone({...newMilestone, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Provider</label>
                    <input
                      type="text"
                      placeholder="e.g., Dr. Smith"
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={newMilestone.provider}
                      onChange={(e) => setNewMilestone({...newMilestone, provider: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Notes</label>
                    <input
                      type="text"
                      placeholder="Optional notes"
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={newMilestone.notes}
                      onChange={(e) => setNewMilestone({...newMilestone, notes: e.target.value})}
                    />
                  </div>
                </div>
                <button
                  onClick={addMilestone}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  disabled={!newMilestone.name || !newMilestone.date}
                >
                  Add Milestone
                </button>
              </div>
            </div>

            {/* Medical Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medical Notes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold flex items-center mb-4">
                  <FaNotesMedical className="mr-2 text-blue-500" />
                  Medical Notes
                </h3>
                
                <div className="space-y-3 mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {selectedPatient.notes.length > 0 ? (
                    selectedPatient.notes.map(note => (
                      <div key={note.id} className="border-l-4 border-blue-200 pl-3 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600">{note.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(note.date).toLocaleDateString()} • {note.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 italic">No notes yet.</div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Add New Note</h4>
                  <textarea
                    placeholder="Enter your clinical notes..."
                    className="w-full border rounded-md p-3 mb-2 text-sm"
                    rows="3"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      className="border rounded-md px-3 py-2 text-sm flex-1 mr-2"
                      value={newNote.author}
                      onChange={(e) => setNewNote({...newNote, author: e.target.value})}
                    />
                    <button
                      onClick={addNote}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                      disabled={!newNote.content}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold flex items-center mb-4">
                  <GiMedicines className="mr-2 text-blue-500" />
                  Medications
                </h3>
                
                <div className="space-y-3 mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {selectedPatient.medications.length > 0 ? (
                    selectedPatient.medications.map(med => (
                      <div key={med.id} className="border-l-4 border-blue-200 pl-3 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {med.name} {med.dosage} • {med.frequency}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(med.startDate).toLocaleDateString()} -{' '}
                              {med.endDate ? new Date(med.endDate).toLocaleDateString() : 'Ongoing'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Prescribed by: {med.prescribedBy}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 italic">No current medications.</div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Add New Medication</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Medication</label>
                      <input
                        type="text"
                        placeholder="e.g., Ibuprofen"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Dosage</label>
                      <input
                        type="text"
                        placeholder="e.g., 400mg"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Frequency</label>
                      <input
                        type="text"
                        placeholder="e.g., Every 8 hours"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={newMedication.frequency}
                        onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Prescribed By</label>
                      <input
                        type="text"
                        placeholder="e.g., Dr. Smith"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={newMedication.prescribedBy}
                        onChange={(e) => setNewMedication({...newMedication, prescribedBy: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={newMedication.startDate}
                        onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">End Date</label>
                      <input
                        type="date"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={newMedication.endDate}
                        onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <button
                    onClick={addMedication}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                    disabled={!newMedication.name || !newMedication.dosage}
                  >
                    Add Medication
                  </button>
                </div>
              </div>
            </div>

            {/* Rehab Plan and Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rehab Plan */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold flex items-center mb-4">
                  <FaProcedures className="mr-2 text-blue-500" />
                  Rehabilitation Plan
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                  {selectedPatient.rehabPlan || 'Rehabilitation plan to be developed.'}
                </div>
              </div>

              {/* Vitals */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold flex items-center mb-4">
                  <FaClinicMedical className="mr-2 text-blue-500" />
                  Latest Vitals
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Last Checked</p>
                      <p className="font-medium">
                        {new Date(selectedPatient.vitals.lastChecked).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Heart Rate</p>
                      <p className="font-medium">
                        {selectedPatient.vitals.heartRate} bpm
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Blood Pressure</p>
                      <p className="font-medium">
                        {selectedPatient.vitals.bloodPressure}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pain Level</p>
                      <p className="font-medium">
                        {selectedPatient.vitals.painLevel}/10
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Team */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <FaUserMd className="mr-2 text-blue-500" />
                Care Team
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Physician</p>
                  <p className="font-medium">
                    {selectedPatient.physician || 'Not assigned'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Physiotherapist</p>
                  <p className="font-medium">
                    {selectedPatient.physiotherapist || 'Not assigned'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default RecoveryTracker;