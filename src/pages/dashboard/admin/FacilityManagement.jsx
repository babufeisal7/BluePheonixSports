import React, { useState, useEffect } from "react";

// Constants for status types to avoid magic strings
const STATUS_TYPES = {
  ACTIVE: 'Active',
  MAINTENANCE: 'Maintenance',
  CLOSED: 'Closed'
};

// Enhanced facilities data with more details
const initialFacilitiesData = [
  {
    id: "main-rugby-field",
    name: "Main Rugby Field",
    location: "North Campus",
    status: STATUS_TYPES.ACTIVE,
    capacity: 5000,
    bookings: 15,
    type: "Rugby",
    description: "Premier rugby field with professional-grade turf",
    image: "https://example.com/rugby-field.jpg",
    lastMaintenance: "2023-05-15",
    nextMaintenance: "2023-11-15"
  },
  {
    id: "olympic-pool",
    name: "Olympic Swimming Pool",
    location: "Aquatic Center",
    status: STATUS_TYPES.ACTIVE,
    capacity: 200,
    bookings: 28,
    type: "Swimming",
    description: "50m Olympic standard pool with diving platforms",
    image: "https://example.com/olympic-pool.jpg",
    lastMaintenance: "2023-06-20",
    nextMaintenance: "2023-12-20"
  },
  {
    id: "basketball-court-a",
    name: "Basketball Court A",
    location: "Sports Complex",
    status: STATUS_TYPES.ACTIVE,
    capacity: 800,
    bookings: 22,
    type: "Basketball",
    description: "Indoor court with NBA-standard flooring",
    image: "https://example.com/basketball-court.jpg",
    lastMaintenance: "2023-04-10",
    nextMaintenance: "2023-10-10"
  },
  {
    id: "football-training-ground",
    name: "Football Training Ground",
    location: "South Campus",
    status: STATUS_TYPES.MAINTENANCE,
    capacity: 2000,
    bookings: 8,
    type: "Football",
    description: "Training ground with 5 practice pitches",
    image: "https://example.com/football-ground.jpg",
    lastMaintenance: "2023-07-01",
    nextMaintenance: "2023-08-15"
  }
];

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState(initialFacilitiesData);
  const [selectedFacilityId, setSelectedFacilityId] = useState("");
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [newFacility, setNewFacility] = useState({
    name: "",
    location: "",
    status: STATUS_TYPES.ACTIVE,
    capacity: 0,
    bookings: 0,
    type: "",
    description: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  // Calculate summary stats dynamically
  const summaryStats = {
    totalFacilities: facilities.length,
    active: facilities.filter(f => f.status === STATUS_TYPES.ACTIVE).length,
    maintenance: facilities.filter(f => f.status === STATUS_TYPES.MAINTENANCE).length,
    closed: facilities.filter(f => f.status === STATUS_TYPES.CLOSED).length,
    totalBookings: facilities.reduce((sum, f) => sum + f.bookings, 0)
  };

  // Get selected facility details
  const selectedFacility = facilities.find(f => f.id === selectedFacilityId);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting, filtering and searching
  const getFilteredFacilities = () => {
    let filtered = [...facilities];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(facility => 
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(facility => facility.status === filterStatus);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  };

  // Handle adding a new facility
  const handleAddFacility = () => {
    const newId = `facility-${Date.now()}`;
    const facilityToAdd = {
      ...newFacility,
      id: newId,
      bookings: parseInt(newFacility.bookings) || 0,
      capacity: parseInt(newFacility.capacity) || 0
    };
    
    setFacilities([...facilities, facilityToAdd]);
    setSelectedFacilityId(newId);
    setIsAddingFacility(false);
    setNewFacility({
      name: "",
      location: "",
      status: STATUS_TYPES.ACTIVE,
      capacity: 0,
      bookings: 0,
      type: "",
      description: ""
    });
  };

  // Handle updating a facility
  const handleUpdateFacility = (updatedFields) => {
    setFacilities(facilities.map(facility => 
      facility.id === selectedFacilityId ? { ...facility, ...updatedFields } : facility
    ));
  };

  // Handle deleting a facility
  const handleDeleteFacility = (id) => {
    setFacilities(facilities.filter(facility => facility.id !== id));
    if (selectedFacilityId === id) {
      setSelectedFacilityId("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-black mb-2">Facility Management</h2>
        <p className="text-lg text-gray-600 dark:text-black-300">
          Manage sports facilities, capacity, and bookings
        </p>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard 
          value={summaryStats.totalFacilities} 
          label="Total Facilities" 
          bgColor="bg-gray-100 dark:bg-gray-700" 
          textColor="text-gray-600 dark:text-gray-300"
        />
        <StatCard 
          value={summaryStats.active} 
          label="Active" 
          bgColor="bg-green-100 dark:bg-green-700" 
          textColor="text-green-800 dark:text-green-200"
        />
        <StatCard 
          value={summaryStats.maintenance} 
          label="Under Maintenance" 
          bgColor="bg-yellow-100 dark:bg-yellow-700" 
          textColor="text-yellow-800 dark:text-yellow-200"
        />
        <StatCard 
          value={summaryStats.closed} 
          label="Closed" 
          bgColor="bg-red-100 dark:bg-red-700" 
          textColor="text-red-800 dark:text-red-200"
        />
        <StatCard 
          value={summaryStats.totalBookings} 
          label="Total Bookings" 
          bgColor="bg-blue-100 dark:bg-blue-700" 
          textColor="text-blue-800 dark:text-blue-200"
        />
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
            onClick={() => setIsAddingFacility(true)}
          >
            <span>+</span> Add New Facility
          </button>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search facilities..."
              className="border rounded px-4 py-2 w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            className="border rounded px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {Object.values(STATUS_TYPES).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select
            className="border rounded px-3 py-2"
            value={selectedFacilityId}
            onChange={(e) => setSelectedFacilityId(e.target.value)}
          >
            <option value="">Quick Select Facility</option>
            {facilities.map(facility => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Facility Modal */}
      {isAddingFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">Add New Facility</h3>
            
            <div className="space-y-4">
              <InputField
                label="Name"
                value={newFacility.name}
                onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                required
              />
              
              <InputField
                label="Location"
                value={newFacility.location}
                onChange={(e) => setNewFacility({...newFacility, location: e.target.value})}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Capacity"
                  type="number"
                  value={newFacility.capacity}
                  onChange={(e) => setNewFacility({...newFacility, capacity: e.target.value})}
                />
                
                <InputField
                  label="Current Bookings"
                  type="number"
                  value={newFacility.bookings}
                  onChange={(e) => setNewFacility({...newFacility, bookings: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={newFacility.status}
                  onChange={(e) => setNewFacility({...newFacility, status: e.target.value})}
                >
                  {Object.values(STATUS_TYPES).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <InputField
                label="Type"
                value={newFacility.type}
                onChange={(e) => setNewFacility({...newFacility, type: e.target.value})}
              />
              
              <InputField
                label="Description"
                value={newFacility.description}
                onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                textarea
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                onClick={() => setIsAddingFacility(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={handleAddFacility}
                disabled={!newFacility.name || !newFacility.location}
              >
                Add Facility
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facilities Table */}
      <div className="overflow-x-auto mb-8 rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <TableHeader 
                title="Name" 
                sortKey="name" 
                sortConfig={sortConfig} 
                onSort={requestSort} 
              />
              <TableHeader 
                title="Location" 
                sortKey="location" 
                sortConfig={sortConfig} 
                onSort={requestSort} 
              />
              <TableHeader 
                title="Type" 
                sortKey="type" 
                sortConfig={sortConfig} 
                onSort={requestSort} 
              />
              <TableHeader 
                title="Status" 
                sortKey="status" 
                sortConfig={sortConfig} 
                onSort={requestSort} 
              />
              <TableHeader 
                title="Capacity" 
                sortKey="capacity" 
                sortConfig={sortConfig} 
                onSort={requestSort} 
                numeric
              />
              <TableHeader 
                title="Bookings" 
                sortKey="bookings" 
                sortConfig={sortConfig} 
                onSort={requestSort} 
                numeric
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {getFilteredFacilities().length > 0 ? (
              getFilteredFacilities().map(facility => (
                <tr 
                  key={facility.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                    selectedFacilityId === facility.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                  }`}
                  onClick={() => setSelectedFacilityId(facility.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{facility.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{facility.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{facility.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={facility.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {facility.capacity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {facility.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-red-600 hover:text-red-900 mr-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFacility(facility.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No facilities found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Facility Details */}
      {selectedFacility && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800 shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{selectedFacility.name}</h3>
              <StatusBadge status={selectedFacility.status} large />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <DetailItem label="Location" value={selectedFacility.location} />
              <DetailItem label="Type" value={selectedFacility.type} />
              <DetailItem label="Capacity" value={selectedFacility.capacity.toLocaleString()} />
              <DetailItem label="Current Bookings" value={selectedFacility.bookings} />
              {selectedFacility.lastMaintenance && (
                <DetailItem label="Last Maintenance" value={selectedFacility.lastMaintenance} />
              )}
              {selectedFacility.nextMaintenance && (
                <DetailItem label="Next Maintenance" value={selectedFacility.nextMaintenance} />
              )}
            </div>
            
            {selectedFacility.description && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700 dark:text-gray-300">{selectedFacility.description}</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => {
                  const newStatus = selectedFacility.status === STATUS_TYPES.ACTIVE 
                    ? STATUS_TYPES.MAINTENANCE 
                    : STATUS_TYPES.ACTIVE;
                  handleUpdateFacility({ status: newStatus });
                }}
              >
                {selectedFacility.status === STATUS_TYPES.ACTIVE ? 'Put Under Maintenance' : 'Mark as Active'}
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                onClick={() => setSelectedFacilityId("")}
              >
                Close
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800 shadow">
            <h3 className="text-xl font-bold mb-4">Edit Facility Details</h3>
            
            <div className="space-y-4">
              <InputField
                label="Name"
                value={selectedFacility.name}
                onChange={(e) => handleUpdateFacility({ name: e.target.value })}
              />
              
              <InputField
                label="Location"
                value={selectedFacility.location}
                onChange={(e) => handleUpdateFacility({ location: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Capacity"
                  type="number"
                  value={selectedFacility.capacity}
                  onChange={(e) => handleUpdateFacility({ capacity: parseInt(e.target.value) || 0 })}
                />
                
                <InputField
                  label="Current Bookings"
                  type="number"
                  value={selectedFacility.bookings}
                  onChange={(e) => handleUpdateFacility({ bookings: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={selectedFacility.status}
                  onChange={(e) => handleUpdateFacility({ status: e.target.value })}
                >
                  {Object.values(STATUS_TYPES).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <InputField
                label="Type"
                value={selectedFacility.type}
                onChange={(e) => handleUpdateFacility({ type: e.target.value })}
              />
              
              <InputField
                label="Description"
                value={selectedFacility.description || ''}
                onChange={(e) => handleUpdateFacility({ description: e.target.value })}
                textarea
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components

const StatCard = ({ value, label, bgColor, textColor }) => (
  <div className={`rounded p-4 shadow ${bgColor}`}>
    <div className="text-3xl font-bold">{value}</div>
    <div className={`text-sm ${textColor}`}>{label}</div>
  </div>
);

const StatusBadge = ({ status, large = false }) => {
  let badgeClass = "";
  switch (status) {
    case STATUS_TYPES.ACTIVE:
      badgeClass = "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200";
      break;
    case STATUS_TYPES.MAINTENANCE:
      badgeClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200";
      break;
    case STATUS_TYPES.CLOSED:
      badgeClass = "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200";
      break;
    default:
      badgeClass = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeClass} ${
      large ? 'text-sm px-4 py-1.5' : ''
    }`}>
      {status}
    </span>
  );
};

const TableHeader = ({ title, sortKey, sortConfig, onSort, numeric = false }) => {
  const isActive = sortConfig.key === sortKey;
  const direction = isActive ? sortConfig.direction : null;
  
  return (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
        numeric ? 'text-right' : ''
      } cursor-pointer`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center">
        {title}
        {isActive && (
          <span className="ml-1">
            {direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">{label}</h4>
    <p className="text-gray-800 dark:text-gray-200">{value}</p>
  </div>
);

const InputField = ({ label, value, onChange, type = "text", textarea = false, required = false }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {textarea ? (
      <textarea
        className="border rounded px-3 py-2 w-full"
        value={value}
        onChange={onChange}
        rows={3}
      />
    ) : (
      <input
        type={type}
        className="border rounded px-3 py-2 w-full"
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export default FacilityManagement;