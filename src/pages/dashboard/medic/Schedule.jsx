import React, { useState, useEffect } from 'react';
import { addDays, format, startOfWeek, endOfWeek, isSameDay } from 'date-fns';

// Mock API functions (replace with real API calls)
const fetchAppointments = async (startDate, endDate) => {
  // In a real app, this would be an actual API call
  return [
    { id: 1, patientName: "John Doe", date: new Date(), time: "9:00 - 10:00", reason: "Checkup" },
    { id: 2, patientName: "Jane Smith", date: addDays(new Date(), 1), time: "10:00 - 11:00", reason: "Follow-up" }
  ];
};

const createAppointment = async (appointmentData) => {
  // In a real app, this would be an actual API call
  return { ...appointmentData, id: Math.floor(Math.random() * 1000) };
};

// CalendarHeader component
const CalendarHeader = ({ currentDate, onPrevious, onNext, onToday }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button 
        onClick={onPrevious}
        className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
      >
        Previous
      </button>
      <div className="text-lg font-semibold">
        {format(currentDate, 'MMMM yyyy')}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onToday}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
        >
          Today
        </button>
        <button 
          onClick={onNext}
          className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// CalendarDay component
const CalendarDay = ({ time, day, appointments, onSlotClick }) => {
  const dayAppointments = appointments.filter(apt => 
    isSameDay(new Date(apt.date), day) && apt.time === time
  );

  return (
    <td 
      className={`p-2 border h-16 ${isSameDay(day, new Date()) ? 'bg-blue-50' : ''}`}
      onClick={() => onSlotClick(time, day)}
    >
      {dayAppointments.length > 0 ? (
        <div className="bg-blue-100 rounded p-1 text-xs cursor-pointer hover:bg-blue-200 transition-colors">
          <div className="font-medium truncate">{dayAppointments[0].patientName}</div>
          <div className="text-xs truncate">{dayAppointments[0].reason}</div>
        </div>
      ) : (
        <div className="h-full cursor-pointer hover:bg-gray-50 transition-colors"></div>
      )}
    </td>
  );
};

// AppointmentModal component
const AppointmentModal = ({ isOpen, onClose, onSubmit, selectedSlot }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    reason: '',
    date: selectedSlot?.day || new Date(),
    time: selectedSlot?.time || ''
  });

  useEffect(() => {
    if (selectedSlot) {
      setFormData(prev => ({
        ...prev,
        date: selectedSlot.day,
        time: selectedSlot.time
      }));
    }
  }, [selectedSlot]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">New Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="text"
              value={format(formData.date, 'PPP')}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="text"
              value={formData.time}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Schedule component
const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
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
    };

    loadAppointments();
  }, [currentDate]);

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

  const weekStart = startOfWeek(currentDate);
  const weekDays = [];
  
  for (let i = 0; i < 7; i++) {
    weekDays.push(addDays(weekStart, i));
  }

  const timeSlots = [];
  for (let hour = 8; hour < 18; hour++) {
    timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Medical Schedule</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <CalendarHeader 
          currentDate={currentDate}
          onPrevious={handlePreviousWeek}
          onNext={handleNextWeek}
          onToday={handleToday}
        />

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
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
                  <th className="w-32 p-2 border">Time</th>
                  {weekDays.map((day, i) => (
                    <th key={i} className={`p-2 border ${isSameDay(day, new Date()) ? 'bg-blue-50' : ''}`}>
                      <div className="font-semibold">{format(day, 'EEE')}</div>
                      <div className={`text-sm ${isSameDay(day, new Date()) ? 'text-blue-600 font-bold' : ''}`}>
                        {format(day, 'd')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={timeIndex}>
                    <td className="p-2 border text-sm font-medium">{time}</td>
                    {weekDays.map((day, dayIndex) => (
                      <CalendarDay
                        key={dayIndex}
                        time={time}
                        day={day}
                        appointments={appointments}
                        onSlotClick={handleSlotClick}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAppointment}
        selectedSlot={selectedSlot}
      />
    </div>
  );
};

export default Schedule;