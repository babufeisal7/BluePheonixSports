import React, { useState } from "react";

const SettingsMobile = () => {
  // State for form fields
  const [theme, setTheme] = useState("Light");
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("Daily");
  const [maxUploadSize, setMaxUploadSize] = useState(10);
  const [dataRetention, setDataRetention] = useState(365);
  const [backupLocation, setBackupLocation] = useState("Local Storage");

  // Save preferences handler
  const handleSave = (e) => {
    e.preventDefault();
    alert("Preferences saved!");
  };

  // Reset form
  const handleReset = () => {
    setTheme("Light");
    setSessionTimeout(30);
    setMaintenanceMode(false);
    setDebugMode(false);
    setAutoBackup(true);
    setBackupFrequency("Daily");
    setMaxUploadSize(10);
    setDataRetention(365);
    setBackupLocation("Local Storage");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Blue Phoenix Sports Limited</h2>
      <h3 className="text-lg font-semibold mb-4">Administrative Settings</h3>

      {/* System Status */}
      <section className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-md font-semibold mb-3">System Status</h4>
        <div className="grid grid-cols-2 gap-3 text-gray-700">
          <div>
            <p className="font-semibold text-sm">System Uptime</p>
            <p className="text-sm">99.8%</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Storage Used</p>
            <p className="text-sm">2.4 GB</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Active Sessions</p>
            <p className="text-sm">147</p>
          </div>
          <div>
            <p className="font-semibold text-sm">System Version</p>
            <p className="text-sm">v2.1.4</p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSave} className="space-y-6">
        {/* System Preferences */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold mb-3">System Preferences</h4>

          {/* Regional Settings */}
          <div className="mb-5">
            <h5 className="font-semibold mb-2 text-sm">Regional Settings</h5>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium text-sm" htmlFor="timezone">
                  Timezone
                </label>
                <select
                  id="timezone"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  defaultValue="Eastern Time (ET)"
                >
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Pacific Time (PT)</option>
                  <option>GMT</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm" htmlFor="dateFormat">
                  Date Format
                </label>
                <select
                  id="dateFormat"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  defaultValue="MM/DD/YYYY"
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
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                  defaultValue="12 Hour"
                >
                  <option>12 Hour</option>
                  <option>24 Hour</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interface Settings */}
          <div className="mb-5">
            <h5 className="font-semibold mb-2 text-sm">Interface Settings</h5>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium text-sm" htmlFor="theme">
                  Theme
                </label>
                <select
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
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
                  min="1"
                  max="120"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="maintenanceMode" className="font-medium text-sm">
                  Maintenance Mode
                </label>
              </div>
            </div>
          </div>

          {/* Debug Mode */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="debugMode"
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="debugMode" className="font-medium text-sm">
              Debug Mode
            </label>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold mb-3">Data Management</h4>

          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="autoBackup"
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="autoBackup" className="font-medium text-sm">
              Auto Backup
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-medium text-sm" htmlFor="backupFrequency">
                Backup Frequency
              </label>
              <select
                id="backupFrequency"
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
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
                min="1"
                max="100"
                value={maxUploadSize}
                onChange={(e) => setMaxUploadSize(Number(e.target.value))}
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
                min="1"
                max="3650"
                value={dataRetention}
                onChange={(e) => setDataRetention(Number(e.target.value))}
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
              value={backupLocation}
              onChange={(e) => setBackupLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option>Local Storage</option>
              <option>Cloud Storage</option>
            </select>
          </div>
        </section>

        {/* System Maintenance */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold mb-3">System Maintenance</h4>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md shadow-sm text-sm"
            >
              System Check
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md shadow-sm text-sm"
            >
              Clear Cache
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md shadow-sm text-sm"
            >
              Export Logs
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md shadow-sm text-sm"
            >
              Update System
            </button>
          </div>

          <div className="text-gray-600 text-sm">
            <p className="mb-1">
              <span className="font-semibold">Last Backup:</span> Dec 3, 2024
            </p>
            <p>
              <span className="font-semibold">Next Maintenance:</span> Dec 15, 2024
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm flex-1"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition text-sm flex-1"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsMobile;