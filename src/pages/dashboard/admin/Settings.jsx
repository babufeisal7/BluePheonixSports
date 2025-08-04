import React, { useState } from "react";
import {
  FiSun,
  FiMoon,
  FiSettings,
  FiDatabase,
  FiHardDrive,
  FiClock,
  FiCalendar,
  FiRefreshCw,
  FiUpload,
  FiDownload,
  FiTrash2,
  FiAlertCircle,
  FiCheckCircle,
  FiSave,
  FiRotateCcw
} from "react-icons/fi";

const SettingsMobile = () => {
  // State for form fields
  const [settings, setSettings] = useState({
    theme: "Light",
    sessionTimeout: 30,
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: "Daily",
    maxUploadSize: 10,
    dataRetention: 365,
    backupLocation: "Local Storage",
    timezone: "Eastern Time (ET)",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12 Hour"
  });

  // System status data
  const [systemStatus, setSystemStatus] = useState({
    uptime: "99.8%",
    storageUsed: "2.4 GB",
    activeSessions: 147,
    version: "v2.1.4",
    lastBackup: "Dec 3, 2024",
    nextMaintenance: "Dec 15, 2024"
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle all form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Save preferences handler
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert("Preferences saved successfully!");
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all settings?")) {
      setSettings({
        theme: "Light",
        sessionTimeout: 30,
        maintenanceMode: false,
        debugMode: false,
        autoBackup: true,
        backupFrequency: "Daily",
        maxUploadSize: 10,
        dataRetention: 365,
        backupLocation: "Local Storage",
        timezone: "Eastern Time (ET)",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12 Hour"
      });
    }
  };

  // System maintenance actions
  const handleSystemAction = (action) => {
    alert(`Initiating ${action}...`);
    // In a real app, this would trigger the appropriate API call
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiSettings className="mr-2" />
          Blue Phoenix Sports
        </h2>
        <p className="text-sm text-gray-500 mt-1">Administrative Settings</p>
      </header>

      {/* System Status Cards */}
      <section className="mb-6 grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center">
            <FiClock className="text-blue-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Uptime</p>
              <p className="font-semibold">{systemStatus.uptime}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex items-center">
            <FiHardDrive className="text-green-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Storage</p>
              <p className="font-semibold">{systemStatus.storageUsed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center">
            <FiDatabase className="text-purple-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Sessions</p>
              <p className="font-semibold">{systemStatus.activeSessions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <div className="flex items-center">
            <FiAlertCircle className="text-yellow-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Version</p>
              <p className="font-semibold">{systemStatus.version}</p>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSave} className="space-y-4">
        {/* System Preferences */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold mb-3 flex items-center">
            <FiSettings className="mr-2" />
            System Preferences
          </h4>

          {/* Regional Settings */}
          <div className="mb-5">
            <h5 className="font-semibold mb-2 text-sm text-gray-700">Regional Settings</h5>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium text-sm" htmlFor="timezone">
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Pacific Time (PT)</option>
                  <option>GMT</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium text-sm" htmlFor="dateFormat">
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium text-sm" htmlFor="timeFormat">
                    Time Format
                  </label>
                  <select
                    id="timeFormat"
                    name="timeFormat"
                    value={settings.timeFormat}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option>12 Hour</option>
                    <option>24 Hour</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Interface Settings */}
          <div className="mb-5">
            <h5 className="font-semibold mb-2 text-sm text-gray-700">Interface Settings</h5>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium text-sm" htmlFor="theme">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System Default</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm" htmlFor="sessionTimeout">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  min="1"
                  max="120"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="maintenanceMode" className="font-medium text-sm">
                    Maintenance Mode
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="debugMode"
                    name="debugMode"
                    checked={settings.debugMode}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="debugMode" className="font-medium text-sm">
                    Debug Mode
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold mb-3 flex items-center">
            <FiDatabase className="mr-2" />
            Data Management
          </h4>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="autoBackup"
                name="autoBackup"
                checked={settings.autoBackup}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="autoBackup" className="font-medium text-sm">
                Auto Backup
              </label>
            </div>
            
            <span className="text-xs text-gray-500">
              Last: {systemStatus.lastBackup}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="backupFrequency">
                Backup Frequency
              </label>
              <select
                id="backupFrequency"
                name="backupFrequency"
                value={settings.backupFrequency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                disabled={!settings.autoBackup}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="maxUploadSize">
                Max File Upload Size (MB)
              </label>
              <input
                type="number"
                id="maxUploadSize"
                name="maxUploadSize"
                min="1"
                max="100"
                value={settings.maxUploadSize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="dataRetention">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                id="dataRetention"
                name="dataRetention"
                min="1"
                max="3650"
                value={settings.dataRetention}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1 font-medium text-sm" htmlFor="backupLocation">
              Backup Storage Location
            </label>
            <select
              id="backupLocation"
              name="backupLocation"
              value={settings.backupLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option>Local Storage</option>
              <option>Cloud Storage</option>
              <option>External Drive</option>
            </select>
          </div>
        </section>

        {/* System Maintenance */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold mb-3 flex items-center">
            <FiRefreshCw className="mr-2" />
            System Maintenance
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleSystemAction("System Check")}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md shadow-sm text-sm flex items-center justify-center"
            >
              <FiCheckCircle className="mr-1" /> Check
            </button>
            
            <button
              type="button"
              onClick={() => handleSystemAction("Clear Cache")}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md shadow-sm text-sm flex items-center justify-center"
            >
              <FiTrash2 className="mr-1" /> Clear Cache
            </button>
            
            <button
              type="button"
              onClick={() => handleSystemAction("Export Logs")}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md shadow-sm text-sm flex items-center justify-center"
            >
              <FiDownload className="mr-1" /> Export Logs
            </button>
            
            <button
              type="button"
              onClick={() => handleSystemAction("System Update")}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md shadow-sm text-sm flex items-center justify-center"
            >
              <FiUpload className="mr-1" /> Update
            </button>
          </div>

          <div className="text-gray-600 text-sm p-2 bg-gray-50 rounded">
            <p className="flex items-center">
              <FiCalendar className="mr-2" />
              <span className="font-semibold">Next Maintenance:</span> {systemStatus.nextMaintenance}
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex space-x-3 sticky bottom-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition text-sm flex-1 flex items-center justify-center ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FiSave className="mr-2" />
            )}
            Save Settings
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-md transition text-sm flex-1 flex items-center justify-center"
          >
            <FiRotateCcw className="mr-2" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsMobile;