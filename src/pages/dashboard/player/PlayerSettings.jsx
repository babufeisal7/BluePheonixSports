import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaPalette, FaLanguage } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    position: 'Forward',
    phone: '(555) 987-6543',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    theme: 'light',
    language: 'en'
  });

  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/22.jpg');
  const [tempImage, setTempImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    if (tempImage) {
      setProfileImage(tempImage);
      setTempImage(null);
    }
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <FaUser className="text-3xl text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">Player Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-56 bg-white rounded-lg shadow-md p-4 h-fit">
          <div 
            className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${activeTab === 'account' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveTab('account')}
          >
            <FaUser className="mr-3" />
            <span>Account</span>
          </div>
          <div 
            className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveTab('security')}
          >
            <FaLock className="mr-3" />
            <span>Security</span>
          </div>
          <div 
            className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell className="mr-3" />
            <span>Notifications</span>
          </div>
          <div 
            className={`flex items-center p-3 rounded-lg cursor-pointer ${activeTab === 'appearance' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveTab('appearance')}
          >
            <FaPalette className="mr-3" />
            <span>Appearance</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaUser className="mr-2" />
                Account Settings
              </h2>
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={tempImage || profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button
                      onClick={() => document.getElementById('playerImageUpload').click()}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                      <FaUser size={14} />
                    </button>
                    <input
                      id="playerImageUpload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <span className="text-sm text-gray-500">Profile Photo</span>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaLock className="mr-2" />
                Security Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="pt-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaBell className="mr-2" />
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FaBell className="mr-3 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Training Reminders</h3>
                      <p className="text-sm text-gray-500">Get notified about upcoming training sessions</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FaBell className="mr-3 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Match Alerts</h3>
                      <p className="text-sm text-gray-500">Receive notifications about upcoming matches</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FaBell className="mr-3 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Health Updates</h3>
                      <p className="text-sm text-gray-500">Get notifications about medical appointments</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaPalette className="mr-2" />
                Appearance
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.theme === 'light' ? 'border-blue-500 ring-2 ring-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
                    >
                      <div className="bg-white p-3 rounded shadow-inner mb-2">
                        <div className="h-4 bg-gray-200 mb-1"></div>
                        <div className="h-4 bg-gray-200 w-3/4"></div>
                      </div>
                      <div className="text-center">Light</div>
                    </div>
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.theme === 'dark' ? 'border-blue-500 ring-2 ring-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
                    >
                      <div className="bg-gray-800 p-3 rounded shadow-inner mb-2">
                        <div className="h-4 bg-gray-700 mb-1"></div>
                        <div className="h-4 bg-gray-700 w-3/4"></div>
                      </div>
                      <div className="text-center">Dark</div>
                    </div>
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.theme === 'system' ? 'border-blue-500 ring-2 ring-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'system' }))}
                    >
                      <div className="bg-gradient-to-r from-white to-gray-800 p-3 rounded shadow-inner mb-2">
                        <div className="h-4 bg-gray-300 mb-1"></div>
                        <div className="h-4 bg-gray-600 w-3/4"></div>
                      </div>
                      <div className="text-center">System</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Language</h3>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={saveChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default PlayerSettings;