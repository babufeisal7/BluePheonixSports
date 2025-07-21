import React, { useState, useEffect } from 'react';
import { FaUserInjured, FaRunning, FaCalendarAlt, FaChartLine, FaPlus, FaNotesMedical } from 'react-icons/fa';
import { IoMdFitness } from 'react-icons/io';
import { GiMedicines } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecoveryTracker = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      injury: 'ACL Tear',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      startDate: '2023-06-15',
      expectedRecovery: '2023-12-01',
      progress: 65,
      status: 'Rehab',
      milestones: [
        { id: 1, name: 'Initial Surgery', date: '2023-06-20', completed: true },
        { id: 2, name: 'Weight Bearing', date: '2023-08-01', completed: true },
        { id: 3, name: 'Strength Training', date: '2023-09-15', completed: false },
        { id: 4, name: 'Sport-Specific Drills', date: '2023-11-01', completed: false }
      ],
      notes: 'Responding well to treatment. Focus on quad strengthening.'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      injury: 'Shoulder Dislocation',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      startDate: '2023-07-10',
      expectedRecovery: '2023-10-25',
      progress: 85,
      status: 'Final Stage',
      milestones: [
        { id: 1, name: 'Immobilization', date: '2023-07-10', completed: true },
        { id: 2, name: 'ROM Exercises', date: '2023-08-01', completed: true },
        { id: 3, name: 'Strength Training', date: '2023-09-01', completed: true },
        { id: 4, name: 'Return to Play', date: '2023-10-15', completed: false }
      ],
      notes: 'Excellent progress. Cleared for light throwing.'
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMilestone, setNewMilestone] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [filter, setFilter] = useState('all');

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
        
        // Calculate new progress
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return { 
          ...patient, 
          milestones: updatedMilestones,
          progress: newProgress
        };
      }
      return patient;
    }));
  };

  const addMilestone = () => {
    if (!newMilestone || !newMilestoneDate || !selectedPatient) return;
    
    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        const newMilestoneObj = {
          id: patient.milestones.length + 1,
          name: newMilestone,
          date: newMilestoneDate,
          completed: false
        };
        
        return {
          ...patient,
          milestones: [...patient.milestones, newMilestoneObj]
        };
      }
      return patient;
    }));
    
    setNewMilestone('');
    setNewMilestoneDate('');
    toast.success('Milestone added successfully!');
  };

  const addNote = () => {
    if (!newNote || !selectedPatient) return;
    
    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        return {
          ...patient,
          notes: patient.notes ? `${patient.notes}\n${new Date().toLocaleDateString()}: ${newNote}` : `${new Date().toLocaleDateString()}: ${newNote}`
        };
      }
      return patient;
    }));
    
    setNewNote('');
    toast.success('Note added successfully!');
  };

  const filteredPatients = patients.filter(patient => {
    if (filter === 'all') return true;
    if (filter === 'rehab') return patient.status === 'Rehab';
    if (filter === 'final') return patient.status === 'Final Stage';
    if (filter === 'behind') {
      const today = new Date();
      const recoveryDate = new Date(patient.expectedRecovery);
      return patient.progress < 50 && recoveryDate < today;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Rehab': return 'bg-yellow-100 text-yellow-800';
      case 'Final Stage': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <FaUserInjured className="text-3xl text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Recovery Tracker</h1>
        </div>
        
        <div className="flex space-x-4">
          <select
            className="border rounded-md px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Patients</option>
            <option value="rehab">In Rehab</option>
            <option value="final">Final Stage</option>
            <option value="behind">Behind Schedule</option>
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
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
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{patient.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
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
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.injury}</p>
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
                        <span className="text-sm">Start Date</span>
                      </div>
                      <div className="font-medium">{new Date(selectedPatient.startDate).toLocaleDateString()}</div>
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
                        <span className="text-sm">Status</span>
                      </div>
                      <div className="font-medium">{selectedPatient.status}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-500">
                        <GiMedicines className="mr-2" />
                        <span className="text-sm">Days Remaining</span>
                      </div>
                      <div className="font-medium">
                        {Math.ceil((new Date(selectedPatient.expectedRecovery) - new Date()) / (1000 * 60 * 60 * 24))}
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
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="New milestone"
                    className="border rounded-md px-3 py-1 text-sm"
                    value={newMilestone}
                    onChange={(e) => setNewMilestone(e.target.value)}
                  />
                  <input
                    type="date"
                    className="border rounded-md px-3 py-1 text-sm"
                    value={newMilestoneDate}
                    onChange={(e) => setNewMilestoneDate(e.target.value)}
                  />
                  <button
                    onClick={addMilestone}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {selectedPatient.milestones.map(milestone => (
                  <div
                    key={milestone.id}
                    className={`p-3 border rounded-lg flex items-center justify-between ${milestone.completed ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={milestone.completed}
                        onChange={() => toggleMilestone(selectedPatient.id, milestone.id)}
                        className="h-5 w-5 text-blue-600 rounded mr-3"
                      />
                      <div>
                        <div className={`font-medium ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                          {milestone.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(milestone.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {milestone.completed && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Notes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <FaNotesMedical className="mr-2 text-blue-500" />
                Medical Notes
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-line">
                {selectedPatient.notes || 'No notes yet.'}
              </div>
              
              <div className="flex">
                <textarea
                  placeholder="Add new note..."
                  className="flex-1 border rounded-md p-3 mr-2"
                  rows="3"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                ></textarea>
                <button
                  onClick={addNote}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md h-min"
                >
                  Add Note
                </button>
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