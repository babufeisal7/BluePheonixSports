import React, { useState, useEffect, useCallback } from 'react';
import { addDays, format, startOfWeek, endOfWeek, isSameDay, parseISO } from 'date-fns';

// Mock API functions (replace with real API calls)
const fetchAppointments = async (startDate, endDate) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be an actual API call
  const baseDate = new Date();
  return [
    { 
      id: '1', 
      patientName: "John Doe", 
      date: baseDate.toISOString(), 
      time: "9:00 - 10:00", 
      reason: "Annual Checkup", 
      status: "confirmed",
      patientId: "p1001",
      doctor: "Dr. Smith"
    },
    { 
      id: '2', 
      patientName: "Jane Smith", 
      date: addDays(baseDate, 1).toISOString(), 
      time: "10:00 - 11:00", 
      reason: "Follow-up", 
      status: "confirmed",
      patientId: "p1002",
      doctor: "Dr. Johnson"
    },
    { 
      id: '3', 
      patientName: "Robert Brown", 
      date: addDays(baseDate, -1).toISOString(), 
      time: "14:00 - 15:00", 
      reason: "Vaccination", 
      status: "completed",
      patientId: "p1003",
      doctor: "Dr. Smith"
    }
  ];
};

const createAppointment = async (appointmentData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { 
    ...appointmentData, 
    id: Math.floor(Math.random() * 1000).toString(),
    status: "confirmed"
  };
};

const updateAppointment = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id, ...updates };
};

const deleteAppointment = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};

// CalendarHeader component with improved UI
const CalendarHeader = ({ currentDate, onPrevious, onNext, onToday, viewMode, setViewMode }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
      <div className="flex items-center gap-2">
        <button 
          onClick={onPrevious}
          className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          onClick={onToday}
          className="px-3 py-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-sm"
        >
          Today
        </button>
        <button 
          onClick={onNext}
          className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800 ml-2">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['Week', 'Day', 'Month'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode.toLowerCase())}
              className={`px-3 py-1 text-sm rounded-md ${viewMode === mode.toLowerCase() ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// CalendarDay component without drag-and-drop
const CalendarDay = React.memo(({ time, day, appointments, onSlotClick, onAppointmentClick }) => {
  const dayAppointments = appointments.filter(apt => 
    isSameDay(parseISO(apt.date), day) && apt.time === time
  );

  return (
    <td 
      className={`p-1 border h-20 ${isSameDay(day, new Date()) ? 'bg-blue-50' : 'bg-white'}`}
      onClick={() => onSlotClick(time, day)}
    >
      {dayAppointments.map(appointment => (
        <div 
          key={appointment.id}
          onClick={(e) => {
            e.stopPropagation();
            onAppointmentClick(appointment);
          }}
          className={`rounded p-2 mb-1 text-xs cursor-pointer transition-all ${getStatusColor(appointment.status)}`}
        >
          <div className="font-medium truncate">{appointment.patientName}</div>
          <div className="text-xs truncate">{appointment.reason}</div>
          <div className="text-xs opacity-75 mt-1">{appointment.doctor}</div>
        </div>
      ))}
      {dayAppointments.length === 0 && (
        <div className="h-full cursor-pointer hover:bg-gray-50 transition-colors rounded"></div>
      )}
    </td>
  );
});

// AppointmentDetails component
const AppointmentDetails = ({ appointment, onClose, onEdit, onDelete }) => {
  if (!appointment) return null;

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">Appointment Details</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700">Patient Information</h4>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-medium">{appointment.patientName}</p>
            <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{format(parseISO(appointment.date), 'PPP')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Time</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{appointment.time}</p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Reason</label>
          <p className="mt-1 p-2 bg-gray-50 rounded">{appointment.reason}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status, true)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">Doctor</label>
          <p className="mt-1 p-2 bg-gray-50 rounded">{appointment.doctor}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => onDelete(appointment.id)}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(appointment)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

// AppointmentModal component with improved form
const AppointmentModal = ({ isOpen, onClose, onSubmit, initialData, doctors }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    reason: '',
    date: initialData?.day || new Date(),
    time: initialData?.time || '',
    doctor: doctors.length > 0 ? doctors[0].id : '',
    status: 'confirmed'
  });

  useEffect(() => {
    if (initialData?.appointment) {
      setFormData({
        patientName: initialData.appointment.patientName,
        patientId: initialData.appointment.patientId,
        reason: initialData.appointment.reason,
        date: initialData.appointment.date,
        time: initialData.appointment.time,
        doctor: initialData.appointment.doctor,
        status: initialData.appointment.status
      });
    } else if (initialData) {
      setFormData(prev => ({
        ...prev,
        date: initialData.day,
        time: initialData.time
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {initialData?.appointment ? 'Edit Appointment' : 'New Appointment'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name*</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason*</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="text"
                value={format(parseISO(formData.date), 'PPP')}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select time</option>
                {generateTimeSlots().map((slot, i) => (
                  <option key={i} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor*</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData?.appointment ? 'Update' : 'Create'} Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper functions
const generateTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 8; hour < 18; hour++) {
    timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
  }
  return timeSlots;
};

const getStatusColor = (status, isBadge = false) => {
  const colors = {
    confirmed: isBadge ? 'bg-blue-100 text-blue-800' : 'bg-blue-100 hover:bg-blue-200',
    completed: isBadge ? 'bg-green-100 text-green-800' : 'bg-green-100 hover:bg-green-200',
    cancelled: isBadge ? 'bg-red-100 text-red-800' : 'bg-red-100 hover:bg-red-200'
  };
  return colors[status] || (isBadge ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 hover:bg-gray-200');
};

// Main Schedule component
const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    { id: 'dr1', name: 'Dr. Smith' },
    { id: 'dr2', name: 'Dr. Johnson' },
    { id: 'dr3', name: 'Dr. Williams' }
  ];

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAppointments(startOfWeek(currentDate), endOfWeek(currentDate));
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load appointments. Please try again.');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSlotClick = (time, day) => {
    setSelectedSlot({ time, day });
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  const handleCreateAppointment = async (appointmentData) => {
    try {
      const newAppointment = await createAppointment(appointmentData);
      setAppointments([...appointments, newAppointment]);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to create appointment. Please try again.');
      console.error('Error creating appointment:', err);
    }
  };

  const handleUpdateAppointment = async (appointmentData) => {
    try {
      const updatedAppointment = await updateAppointment(selectedAppointment.id, appointmentData);
      setAppointments(appointments.map(apt => 
        apt.id === selectedAppointment.id ? updatedAppointment : apt
      ));
      setIsModalOpen(false);
      setIsDetailsOpen(false);
    } catch (err) {
      setError('Failed to update appointment. Please try again.');
      console.error('Error updating appointment:', err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter(apt => apt.id !== id));
      setIsDetailsOpen(false);
    } catch (err) {
      setError('Failed to delete appointment. Please try again.');
      console.error('Error deleting appointment:', err);
    }
  };

  const handleEditAppointment = () => {
    setSelectedSlot({
      appointment: selectedAppointment,
      day: parseISO(selectedAppointment.date),
      time: selectedAppointment.time
    });
    setIsDetailsOpen(false);
    setIsModalOpen(true);
  };

  const weekStart = startOfWeek(currentDate);
  const weekDays = [];
  
  for (let i = 0; i < 7; i++) {
    weekDays.push(addDays(weekStart, i));
  }

  const filteredAppointments = appointments.filter(apt => 
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Medical Appointment Schedule</h2>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <CalendarHeader 
            currentDate={currentDate}
            onPrevious={handlePreviousWeek}
            onNext={handleNextWeek}
            onToday={handleToday}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r-lg" role="alert">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-32 p-2 border-b text-left text-sm font-semibold text-gray-600">Time</th>
                    {weekDays.map((day, i) => (
                      <th key={i} className={`p-2 border-b text-sm font-semibold text-gray-600 ${isSameDay(day, new Date()) ? 'bg-blue-50' : 'bg-white'}`}>
                        <div>{format(day, 'EEE')}</div>
                        <div className={`text-sm ${isSameDay(day, new Date()) ? 'text-blue-600 font-bold' : ''}`}>
                          {format(day, 'd')}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {generateTimeSlots().map((time, timeIndex) => (
                    <tr key={timeIndex}>
                      <td className="p-2 border-b text-sm font-medium text-gray-600">{time}</td>
                      {weekDays.map((day, dayIndex) => (
                        <CalendarDay
                          key={dayIndex}
                          time={time}
                          day={day}
                          appointments={filteredAppointments}
                          onSlotClick={handleSlotClick}
                          onAppointmentClick={handleAppointmentClick}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedSlot?.appointment ? handleUpdateAppointment : handleCreateAppointment}
        initialData={selectedSlot}
        doctors={doctors}
      />

      {isDetailsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <AppointmentDetails
            appointment={selectedAppointment}
            onClose={() => setIsDetailsOpen(false)}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
          />
        </div>
      )}
    </div>
  );
};

export default Schedule;