import React, { useState, useMemo, useCallback } from 'react';

// Constants
const ROLES = ['admin', 'coach', 'medic', 'player', 'staff'];
const SPORTS = ['Rugby', 'Football', 'Basketball', 'Swimming', 'Tennis', 'Volleyball'];
const AGE_GROUPS = ['U8-U10', 'U11-U15', 'U16-U18', 'U19+'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Other'];
const STATUSES = ['active', 'inactive', 'pending'];

// Default avatar images
const DEFAULT_AVATARS = {
  admin: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  coach: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
  medic: 'https://cdn-icons-png.flaticon.com/512/2785/2785402.png',
  player: 'https://cdn-icons-png.flaticon.com/512/236/236832.png',
  staff: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
  default: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
};

// Sport icons
const SPORT_ICONS = {
  Rugby: 'https://cdn-icons-png.flaticon.com/512/5024/5024049.png',
  Football: 'https://cdn-icons-png.flaticon.com/512/4498/4498016.png',
  Basketball: 'https://cdn-icons-png.flaticon.com/512/5024/5024034.png',
  Swimming: 'https://cdn-icons-png.flaticon.com/512/5024/5024051.png',
  Tennis: 'https://cdn-icons-png.flaticon.com/512/5024/5024063.png',
  Volleyball: 'https://cdn-icons-png.flaticon.com/512/5024/5024065.png'
};

// Initial data with avatar URLs
const initialUsers = [
  { 
    id: 1, 
    name: 'Alice Coach', 
    email: 'alice@coach.com', 
    role: 'coach', 
    sport: 'Rugby', 
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: 2, 
    name: 'Bob Medic', 
    email: 'bob@medic.com', 
    role: 'medic', 
    sport: 'Football', 
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: 3, 
    name: 'Charlie Player', 
    email: 'charlie@player.com', 
    role: 'player', 
    sport: 'Basketball', 
    ageGroup: 'U11-U15', 
    gender: 'Male', 
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
];

const UserManagement = () => {
  // State
  const [users, setUsers] = useState(initialUsers);
  const [filters, setFilters] = useState({
    role: '',
    sport: '',
    status: 'active',
    search: ''
  });
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    sport: '',
    ageGroup: '',
    gender: '',
    status: 'active',
    avatar: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [notification, setNotification] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  // Memoized filtered and sorted users
  const filteredUsers = useMemo(() => {
    let result = [...users];
    
    // Apply filters
    if (filters.role) result = result.filter(user => user.role === filters.role);
    if (filters.sport) result = result.filter(user => user.sport === filters.sport);
    if (filters.status) result = result.filter(user => user.status === filters.status);
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(user => (
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
      ));
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, filters, sortConfig]);

  // Handlers
  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const validateUser = (user) => {
    if (!user.name.trim()) {
      showNotification('Name is required', 'error');
      return false;
    }
    if (!user.email.trim() || !/^\S+@\S+\.\S+$/.test(user.email)) {
      showNotification('Valid email is required', 'error');
      return false;
    }
    if (!user.role) {
      showNotification('Role is required', 'error');
      return false;
    }
    return true;
  };

  const generateRandomAvatar = (gender) => {
    const randomId = Math.floor(Math.random() * 99) + 1;
    const genderPath = gender === 'Female' ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${genderPath}/${randomId}.jpg`;
  };

  const handleAddUser = useCallback(() => {
    if (!validateUser(newUser)) return;
    
    const avatar = newUser.avatar || 
      (newUser.gender ? generateRandomAvatar(newUser.gender) : DEFAULT_AVATARS[newUser.role] || DEFAULT_AVATARS.default);
    
    setUsers(prevUsers => [
      ...prevUsers, 
      { ...newUser, id: Date.now(), avatar }
    ]);
    
    setNewUser({ 
      name: '', 
      email: '', 
      role: '', 
      sport: '',
      ageGroup: '',
      gender: '',
      status: 'active',
      avatar: ''
    });
    
    showNotification('User added successfully');
    setActiveTab('users');
  }, [newUser]);

  const handleUpdateUser = useCallback(() => {
    if (!editingId || !validateUser(newUser)) return;
    
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === editingId ? { ...newUser, id: editingId } : user
      )
    );
    
    setEditingId(null);
    setNewUser({ 
      name: '', 
      email: '', 
      role: '', 
      sport: '',
      ageGroup: '',
      gender: '',
      status: 'active',
      avatar: ''
    });
    
    showNotification('User updated successfully');
    setActiveTab('users');
  }, [editingId, newUser]);

  const handleEdit = useCallback((user) => {
    setEditingId(user.id);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      sport: user.sport || '',
      ageGroup: user.ageGroup || '',
      gender: user.gender || '',
      status: user.status || 'active',
      avatar: user.avatar || ''
    });
    setActiveTab('addEdit');
  }, []);

  const handleDelete = useCallback((id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    showNotification('User deleted successfully');
  }, []);

  const handleStatusChange = useCallback((id, status) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, status } : user
      )
    );
    showNotification(`User status changed to ${status}`);
  }, []);

  const requestSort = useCallback((key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-full">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setActiveTab('users');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-md text-left ${activeTab === 'users' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              View Users
            </button>
            <button
              onClick={() => {
                setActiveTab('filters');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-md text-left ${activeTab === 'filters' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Filters
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setNewUser({
                  name: '', 
                  email: '', 
                  role: '', 
                  sport: '',
                  ageGroup: '',
                  gender: '',
                  status: 'active',
                  avatar: ''
                });
                setActiveTab('addEdit');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-md text-left ${activeTab === 'addEdit' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              Add New User
            </button>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
          notification.type === 'error' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Desktop Tabs */}
      <div className="hidden md:flex mb-6 border-b">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('filters')}
          className={`px-4 py-2 ${activeTab === 'filters' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
        >
          Filters
        </button>
        <button
          onClick={() => {
            setEditingId(null);
            setNewUser({
              name: '', 
              email: '', 
              role: '', 
              sport: '',
              ageGroup: '',
              gender: '',
              status: 'active',
              avatar: ''
            });
            setActiveTab('addEdit');
          }}
          className={`px-4 py-2 ${activeTab === 'addEdit' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
        >
          {editingId ? 'Edit User' : 'Add User'}
        </button>
      </div>

      {/* Filters Section */}
      {activeTab === 'filters' && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectFilter 
              label="Role"
              value={filters.role}
              onChange={(value) => handleFilterChange('role', value)}
              options={ROLES}
              placeholder="All Roles"
            />
            
            <SelectFilter 
              label="Sport"
              value={filters.sport}
              onChange={(value) => handleFilterChange('sport', value)}
              options={SPORTS}
              placeholder="All Sports"
            />

            <SelectFilter 
              label="Status"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              options={STATUSES}
              placeholder="All Statuses"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search by name or email"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => setActiveTab('users')}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* User Table Section */}
      {activeTab === 'users' && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Users ({filteredUsers.length})</h3>
            <div className="text-sm text-gray-500">
              {filteredUsers.length} of {users.length}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.avatar || DEFAULT_AVATARS[user.role] || DEFAULT_AVATARS.default} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{user.role}</div>
                        {user.ageGroup && <div className="text-sm text-gray-500">{user.ageGroup}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.sport && (
                          <div className="flex items-center">
                            <img src={SPORT_ICONS[user.sport]} alt={user.sport} className="h-5 w-5 mr-2" />
                            <span className="text-sm text-gray-900">{user.sport}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleStatusChange(
                              user.id, 
                              user.status === 'active' ? 'inactive' : 'active'
                            )}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <MobileUserList 
            users={filteredUsers} 
            onDelete={handleDelete}
            onEdit={(user) => {
              handleEdit(user);
              setActiveTab('addEdit');
            }}
            onStatusChange={handleStatusChange}
          />
        </div>
      )}

      {/* Add/Edit User Section */}
      {activeTab === 'addEdit' && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? `Edit User #${editingId}` : "Add New User"}
          </h3>
          
          <MobileAddEditUserForm 
            newUser={newUser}
            onInputChange={handleInputChange}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            editingId={editingId}
            roles={ROLES}
            sports={SPORTS}
            ageGroups={AGE_GROUPS}
            genders={GENDERS}
            statuses={STATUSES}
            onCancel={() => {
              setEditingId(null);
              setNewUser({
                name: '', 
                email: '', 
                role: '', 
                sport: '',
                ageGroup: '',
                gender: '',
                status: 'active',
                avatar: ''
              });
              setActiveTab('users');
            }}
          />
        </div>
      )}
    </div>
  );
};

// Reusable Components
const SelectFilter = React.memo(({ label, value, onChange, options, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  </div>
));

const MobileUserList = React.memo(({ users, onDelete, onEdit, onStatusChange }) => {
  return (
    <div className="space-y-3 md:hidden">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="border rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <img 
                src={user.avatar || DEFAULT_AVATARS[user.role] || DEFAULT_AVATARS.default} 
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
                
                <div className="mt-2 text-sm">
                  <p><span className="font-medium">Role:</span> {user.role}</p>
                  {user.sport && (
                    <p className="flex items-center">
                      <span className="font-medium">Sport:</span> 
                      <img src={SPORT_ICONS[user.sport]} alt={user.sport} className="h-4 w-4 ml-1 mr-1" />
                      {user.sport}
                    </p>
                  )}
                  {user.ageGroup && <p><span className="font-medium">Age Group:</span> {user.ageGroup}</p>}
                  {user.gender && <p><span className="font-medium">Gender:</span> {user.gender}</p>}
                </div>
                
                <div className="mt-3 flex justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onStatusChange(
                        user.id, 
                        user.status === 'active' ? 'inactive' : 'active'
                      )}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">
          No users found matching your criteria.
        </div>
      )}
    </div>
  );
});

const MobileAddEditUserForm = React.memo(({ 
  newUser, 
  onInputChange, 
  onAddUser, 
  onUpdateUser,
  editingId,
  roles,
  sports,
  ageGroups,
  genders,
  statuses,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      {editingId && newUser.avatar && (
        <div className="flex justify-center">
          <img 
            src={newUser.avatar} 
            alt="User Avatar" 
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <SelectFilter 
        label="Role*"
        value={newUser.role}
        onChange={(value) => onInputChange('role', value)}
        options={roles}
        placeholder="Select Role"
      />

      <SelectFilter 
        label="Sport"
        value={newUser.sport}
        onChange={(value) => onInputChange('sport', value)}
        options={sports}
        placeholder="Select Sport"
      />

      {newUser.role === 'player' && (
        <>
          <SelectFilter 
            label="Age Group"
            value={newUser.ageGroup}
            onChange={(value) => onInputChange('ageGroup', value)}
            options={ageGroups}
            placeholder="Select Age Group"
          />

          <SelectFilter 
            label="Gender"
            value={newUser.gender}
            onChange={(value) => onInputChange('gender', value)}
            options={genders}
            placeholder="Select Gender"
          />
        </>
      )}

      <SelectFilter 
        label="Status"
        value={newUser.status}
        onChange={(value) => onInputChange('status', value)}
        options={statuses}
        placeholder="Select Status"
      />

      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={editingId ? onUpdateUser : onAddUser}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium text-white ${
            editingId 
              ? 'bg-yellow-600 hover:bg-yellow-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
});

export default UserManagement;