import React from "react";

const SecuritySettings = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Blue Phoenix Sports</h2>
        <p className="text-sm text-gray-600">Security Settings</p>
      </div>

      {/* Security Overview */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3">🔐 Security Overview</h3>
        <div className="grid grid-cols-2 gap-2 text-center mb-2">
          <div className="bg-green-100 p-3 rounded">
            <div className="text-lg font-bold">Secure</div>
            <div className="text-xs text-green-800">Security Scan</div>
          </div>
          <div className="bg-blue-100 p-3 rounded">
            <div className="text-lg font-bold">15</div>
            <div className="text-xs text-blue-800">Active Sessions</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <div className="text-lg font-bold">3</div>
            <div className="text-xs text-yellow-800">Alerts</div>
          </div>
          <div className="bg-red-100 p-3 rounded">
            <div className="text-lg font-bold">847</div>
            <div className="text-xs text-red-800">Audit Logs</div>
          </div>
        </div>
      </div>

      {/* Password Policy */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-3">🔑 Password Policy</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Minimum Length</label>
            <input 
              type="number" 
              defaultValue={8} 
              className="w-full border rounded px-3 py-2 text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expiry (days)</label>
            <input 
              type="number" 
              defaultValue={90} 
              className="w-full border rounded px-3 py-2 text-sm" 
            />
          </div>
          <div className="mt-2 space-y-2">
            <label className="text-sm font-medium">Requirements</label>
            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm">Uppercase letters</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm">Lowercase letters</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm">Numbers</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm">Symbols</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-3">🔐 Authentication</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Two-Factor Auth</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Require 2FA for admins</option>
              <option>Optional 2FA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Login Attempts</label>
            <input 
              type="number" 
              defaultValue={5} 
              className="w-full border rounded px-3 py-2 text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lockout Duration (min)</label>
            <input 
              type="number" 
              defaultValue={30} 
              className="w-full border rounded px-3 py-2 text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Default Auth Method</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Password Only</option>
              <option>2FA with OTP</option>
              <option>Biometric</option>
            </select>
          </div>
        </div>
      </div>

      {/* Session & Access Control */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-3">🛡️ Session Security</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Session Protection</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Enhanced protection</option>
              <option>Standard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">IP Whitelist</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              rows="2"
              defaultValue={`192.168.1.0/24\n10.0.0.0/8`}
            />
          </div>
          <button className="w-full sm:w-auto px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
            Add IP Range
          </button>
          <div>
            <label className="block text-sm font-medium mb-1">Default Permissions</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Standard Access</option>
              <option>Admin Only</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            <span className="text-sm">Log all user activities</span>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-3">📋 Security Logs</h4>
        <div className="space-y-3 text-sm">
          <div className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">Failed login</span>
              <span className="text-yellow-600">medium</span>
            </div>
            <p className="text-xs">admin@bluephoenix.com</p>
            <p className="text-xs text-gray-500">2024-12-03 14:32:15</p>
          </div>
          <div className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">Password changed</span>
              <span className="text-green-600">low</span>
            </div>
            <p className="text-xs">john.smith@email.com</p>
            <p className="text-xs text-gray-500">2024-12-03 13:45:22</p>
          </div>
          <div className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">Unauthorized access</span>
              <span className="text-red-600">high</span>
            </div>
            <p className="text-xs">unknown</p>
            <p className="text-xs text-gray-500">2024-12-03 12:18:45</p>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-medium">User created</span>
              <span className="text-green-600">low</span>
            </div>
            <p className="text-xs">sarah.johnson@email.com</p>
            <p className="text-xs text-gray-500">2024-12-03 11:30:12</p>
          </div>
        </div>
        <button className="mt-3 text-blue-600 hover:underline text-sm">
          View All Logs
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
          Save Settings
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm">
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;