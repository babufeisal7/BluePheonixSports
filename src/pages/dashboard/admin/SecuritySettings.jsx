import React, { useState } from 'react';
import { 
  FiLock, 
  FiShield, 
  FiKey, 
  FiUser, 
  FiLogIn, 
  FiList, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiXCircle,
  FiDownload,
  FiSave,
  FiPlus
} from 'react-icons/fi';

const SecuritySettings = () => {
  // State for password policy
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    expiryDays: 90,
    requirements: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true
    }
  });

  // State for authentication settings
  const [authSettings, setAuthSettings] = useState({
    twoFactor: 'Require 2FA for admins',
    maxAttempts: 5,
    lockoutDuration: 30,
    defaultMethod: 'Password Only'
  });

  // State for session security
  const [sessionSettings, setSessionSettings] = useState({
    protectionLevel: 'Enhanced protection',
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    defaultPermissions: 'Standard Access',
    logActivities: true
  });

  // State for new IP range input
  const [newIpRange, setNewIpRange] = useState('');

  // Sample security logs data
  const [securityLogs, setSecurityLogs] = useState([
    {
      id: 1,
      type: 'Failed login',
      severity: 'medium',
      user: 'admin@bluephoenix.com',
      timestamp: '2024-12-03 14:32:15'
    },
    {
      id: 2,
      type: 'Password changed',
      severity: 'low',
      user: 'john.smith@email.com',
      timestamp: '2024-12-03 13:45:22'
    },
    {
      id: 3,
      type: 'Unauthorized access',
      severity: 'high',
      user: 'unknown',
      timestamp: '2024-12-03 12:18:45'
    },
    {
      id: 4,
      type: 'User created',
      severity: 'low',
      user: 'sarah.johnson@email.com',
      timestamp: '2024-12-03 11:30:12'
    }
  ]);

  // Handle password policy changes
  const handlePasswordPolicyChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setPasswordPolicy(prev => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          [name]: checked
        }
      }));
    } else {
      setPasswordPolicy(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle authentication settings changes
  const handleAuthSettingsChange = (e) => {
    const { name, value } = e.target;
    setAuthSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle session settings changes
  const handleSessionSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setSessionSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add new IP range to whitelist
  const addIpRange = () => {
    if (newIpRange.trim() && !sessionSettings.ipWhitelist.includes(newIpRange.trim())) {
      setSessionSettings(prev => ({
        ...prev,
        ipWhitelist: [...prev.ipWhitelist, newIpRange.trim()]
      }));
      setNewIpRange('');
    }
  };

  // Remove IP range from whitelist
  const removeIpRange = (ip) => {
    setSessionSettings(prev => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter(range => range !== ip)
    }));
  };

  // Save all settings
  const saveSettings = () => {
    // In a real app, you would send this to your backend
    console.log('Saving settings:', {
      passwordPolicy,
      authSettings,
      sessionSettings
    });
    alert('Settings saved successfully!');
  };

  // Export logs
  const exportLogs = () => {
    // In a real app, this would generate a downloadable file
    console.log('Exporting logs:', securityLogs);
    alert('Logs exported successfully!');
  };

  // Get severity icon and color
  const getSeverityInfo = (severity) => {
    switch (severity) {
      case 'high':
        return { icon: <FiAlertCircle className="text-red-500" />, color: 'text-red-600' };
      case 'medium':
        return { icon: <FiAlertCircle className="text-yellow-500" />, color: 'text-yellow-600' };
      case 'low':
        return { icon: <FiCheckCircle className="text-green-500" />, color: 'text-green-600' };
      default:
        return { icon: null, color: 'text-gray-600' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center">
          <FiShield className="mr-2" /> Blue Phoenix Sports Security
        </h2>
        <p className="text-sm text-gray-500">Manage your organization's security settings</p>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 mr-3">
              <FiCheckCircle className="text-green-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Security Status</p>
              <h3 className="font-bold text-gray-800">Secure</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <FiUser className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Sessions</p>
              <h3 className="font-bold text-gray-800">15</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100 mr-3">
              <FiAlertCircle className="text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Alerts</p>
              <h3 className="font-bold text-gray-800">3</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-red-100 mr-3">
              <FiList className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Audit Logs</p>
              <h3 className="font-bold text-gray-800">847</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Password Policy Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiKey className="mr-2" /> Password Policy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
            <input 
              type="number" 
              name="minLength"
              value={passwordPolicy.minLength}
              onChange={handlePasswordPolicyChange}
              min="6"
              max="32"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (days)</label>
            <input 
              type="number" 
              name="expiryDays"
              value={passwordPolicy.expiryDays}
              onChange={handlePasswordPolicyChange}
              min="30"
              max="365"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Requirements</label>
          <div className="space-y-2">
            {Object.entries(passwordPolicy.requirements).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`req-${key}`}
                  name={key}
                  checked={value}
                  onChange={handlePasswordPolicyChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`req-${key}`} className="ml-2 block text-sm text-gray-700 capitalize">
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiLock className="mr-2" /> Authentication Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
            <select
              name="twoFactor"
              value={authSettings.twoFactor}
              onChange={handleAuthSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Require 2FA for admins</option>
              <option>Optional 2FA</option>
              <option>Require 2FA for all users</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Authentication Method</label>
            <select
              name="defaultMethod"
              value={authSettings.defaultMethod}
              onChange={handleAuthSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Password Only</option>
              <option>2FA with OTP</option>
              <option>Biometric</option>
              <option>Password + Security Key</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
            <input 
              type="number" 
              name="maxAttempts"
              value={authSettings.maxAttempts}
              onChange={handleAuthSettingsChange}
              min="1"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lockout Duration (minutes)</label>
            <input 
              type="number" 
              name="lockoutDuration"
              value={authSettings.lockoutDuration}
              onChange={handleAuthSettingsChange}
              min="1"
              max="1440"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Session Security Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiLogIn className="mr-2" /> Session Security
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Protection Level</label>
            <select
              name="protectionLevel"
              value={sessionSettings.protectionLevel}
              onChange={handleSessionSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Enhanced protection</option>
              <option>Standard</option>
              <option>Basic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Permissions</label>
            <select
              name="defaultPermissions"
              value={sessionSettings.defaultPermissions}
              onChange={handleSessionSettingsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Standard Access</option>
              <option>Admin Only</option>
              <option>Custom</option>
              <option>Read Only</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">IP Whitelist</label>
          <div className="space-y-2 mb-3">
            {sessionSettings.ipWhitelist.map((ip, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm font-mono">{ip}</span>
                <button 
                  onClick={() => removeIpRange(ip)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiXCircle />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={newIpRange}
              onChange={(e) => setNewIpRange(e.target.value)}
              placeholder="Enter IP range (e.g., 192.168.1.0/24)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={addIpRange}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="logActivities"
            name="logActivities"
            checked={sessionSettings.logActivities}
            onChange={handleSessionSettingsChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="logActivities" className="ml-2 block text-sm text-gray-700">
            Log all user activities
          </label>
        </div>
      </div>

      {/* Security Logs Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiList className="mr-2" /> Security Logs
          </h3>
          <button 
            onClick={exportLogs}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FiDownload className="mr-1" /> Export Logs
          </button>
        </div>
        
        <div className="space-y-4">
          {securityLogs.map(log => {
            const { icon, color } = getSeverityInfo(log.severity);
            return (
              <div key={log.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="mr-3">{icon}</div>
                    <div>
                      <p className="font-medium text-gray-800">{log.type}</p>
                      <p className="text-xs text-gray-500">{log.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${color}`}>{log.severity}</span>
                    <p className="text-xs text-gray-500">{log.timestamp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
          View All Logs
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <FiSave className="mr-2" /> Save Settings
        </button>
        <button
          onClick={exportLogs}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <FiDownload className="mr-2" /> Export Logs
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;