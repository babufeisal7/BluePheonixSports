import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiEdit2, FiCheck, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const TrainingSchedule = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, day: "Monday", activity: "Strength Training", time: "4:00 PM - 5:30 PM", completed: false },
    { id: 2, day: "Wednesday", activity: "Tactical Drills", time: "3:30 PM - 5:00 PM", completed: false },
    { id: 3, day: "Friday", activity: "Match Preparation", time: "4:00 PM - 6:00 PM", completed: false },
  ]);
  
  const [newSession, setNewSession] = useState({
    day: "Monday",
    activity: "",
    time: "",
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState("all"); // all, completed, pending

  useEffect(() => {
    const savedSchedule = localStorage.getItem('trainingSchedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trainingSchedule', JSON.stringify(schedule));
  }, [schedule]);

  const handleAddSession = () => {
    if (newSession.activity && newSession.time) {
      const session = {
        id: Date.now(),
        day: newSession.day,
        activity: newSession.activity,
        time: newSession.time,
        completed: false
      };
      setSchedule([...schedule, session]);
      setNewSession({ day: "Monday", activity: "", time: "" });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    setSchedule(schedule.filter(session => session.id !== id));
  };

  const startEditing = (session) => {
    setEditingId(session.id);
    setEditData({ ...session });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    setSchedule(schedule.map(session => 
      session.id === editingId ? { ...editData } : session
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const toggleComplete = (id) => {
    setSchedule(schedule.map(session => 
      session.id === id ? { ...session, completed: !session.completed } : session
    ));
  };

  const filteredSchedule = schedule.filter(session => {
    if (filter === "completed") return session.completed;
    if (filter === "pending") return !session.completed;
    return true;
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiCalendar className="mr-2" /> Weekly Training Schedule
        </h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded text-sm w-full sm:w-auto"
          >
            <option value="all">All Sessions</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
          >
            <FiPlus className="mr-1" /> Add Session
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-3 text-blue-800">Add New Training Session</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <select
              value={newSession.day}
              onChange={(e) => setNewSession({...newSession, day: e.target.value})}
              className="p-2 border rounded w-full"
            >
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Activity"
              value={newSession.activity}
              onChange={(e) => setNewSession({...newSession, activity: e.target.value})}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Time (e.g., 4:00 PM - 5:30 PM)"
              value={newSession.time}
              onChange={(e) => setNewSession({...newSession, time: e.target.value})}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-end mt-3 space-y-2 md:space-y-0 md:space-x-2">
            <button 
              onClick={() => setIsAdding(false)}
              className="w-full md:w-auto px-4 py-3 bg-gray-200 rounded text-center text-sm md:text-base"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddSession}
              className="w-full md:w-auto px-4 py-3 bg-blue-600 text-white rounded text-center text-sm md:text-base disabled:bg-blue-300"
              disabled={!newSession.activity || !newSession.time}
            >
              Save Session
            </button>
          </div>
        </div>
      )}

      {filteredSchedule.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No training sessions found. Add a new session to get started.
        </div>
      ) : (
        <ul className="space-y-3 max-h-[60vh] overflow-y-auto">
          {filteredSchedule.map((session) => (
            <li 
              key={session.id} 
              className={`p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 ${
                session.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              {editingId === session.id ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 w-full mb-3">
                  <select
                    name="day"
                    value={editData.day}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                  >
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <input
                    name="activity"
                    type="text"
                    value={editData.activity}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                  />
                  <input
                    name="time"
                    type="text"
                    value={editData.time}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 flex-1">
                  <div>
                    <div className="flex items-center">
                      <h3 className={`font-bold text-lg ${session.completed ? 'text-green-600 line-through' : 'text-gray-800'}`}>
                        {session.day}
                      </h3>
                      {session.completed && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completed</span>
                      )}
                    </div>
                    <p className={`${session.completed ? 'text-gray-500' : 'text-gray-700'} mt-1`}>
                      {session.activity}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <FiClock className="mr-1" /> {session.time}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2 justify-end items-center">
                {editingId === session.id ? (
                  <>
                    <button 
                      onClick={cancelEdit}
                      className="px-3 py-2 bg-gray-200 rounded text-sm w-24"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveEdit}
                      className="px-3 py-2 bg-blue-500 text-white rounded text-sm w-24"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => toggleComplete(session.id)}
                      className={`p-3 rounded ${session.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                      title={session.completed ? "Mark as pending" : "Mark as completed"}
                    >
                      <FiCheck size={20} />
                    </button>
                    <button 
                      onClick={() => startEditing(session)}
                      className="p-3 bg-blue-100 text-blue-600 rounded"
                      title="Edit"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(session.id)}
                      className="p-3 bg-red-100 text-red-600 rounded"
                      title="Delete"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainingSchedule;
