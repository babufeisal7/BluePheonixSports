import React, { useState } from "react";

const Notifications = () => {
  const [notificationTypes, setNotificationTypes] = useState({
    newMember: true,
    payment: true,
    eventUpdates: true,
    emergency: false,
    maintenance: true,
  });

  const toggleNotification = (key) => {
    setNotificationTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Blue Phoenix Sports Limited</h2>
        <p className="text-gray-600 text-sm">Administrative Settings</p>
      </div>

      {/* Notification Overview */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">📣 Notification Settings</h3>
        <p className="text-gray-600 mb-3 text-sm">
          Configure how and when to send notifications
        </p>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-blue-100 p-3 rounded">
            <div className="text-lg font-bold">1,247</div>
            <div className="text-xs text-blue-800">Emails Sent</div>
          </div>
          <div className="bg-green-100 p-3 rounded">
            <div className="text-lg font-bold">89</div>
            <div className="text-xs text-green-800">SMS Sent</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <div className="text-lg font-bold">324</div>
            <div className="text-xs text-yellow-800">Push Notifications</div>
          </div>
          <div className="bg-purple-100 p-3 rounded">
            <div className="text-lg font-bold">98.2%</div>
            <div className="text-xs text-purple-800">Delivery Rate</div>
          </div>
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold mb-3">🔔 Notification Types</h4>
        <div className="space-y-3">
          {[
            ["New Member Registration", "newMember"],
            ["Payment Reminders", "payment"],
            ["Event Updates", "eventUpdates"],
            ["Emergency Alerts", "emergency"],
            ["System Maintenance", "maintenance"],
          ].map(([label, key]) => (
            <label key={key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notificationTypes[key]}
                onChange={() => toggleNotification(key)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Email Config */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold mb-3">📧 Email Configuration</h4>
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1 text-sm">SMTP Server</label>
            <input className="w-full border rounded px-3 py-2 text-sm" defaultValue="smtp.yourdomain.com" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Port</label>
            <input type="number" className="w-full border rounded px-3 py-2 text-sm" defaultValue={587} />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">From Email</label>
            <input className="w-full border rounded px-3 py-2 text-sm" defaultValue="noreply@bluephoenixsports.com" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">From Name</label>
            <input className="w-full border rounded px-3 py-2 text-sm" defaultValue="Blue Phoenix Sports Limited" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Template Style</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Professional</option>
              <option>Casual</option>
              <option>Minimal</option>
            </select>
          </div>
        </div>
      </div>

      {/* SMS Config */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold mb-3">📱 SMS Configuration</h4>
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1 text-sm">SMS Provider</label>
            <input className="w-full border rounded px-3 py-2 text-sm" defaultValue="Twilio" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Sender ID</label>
            <input className="w-full border rounded px-3 py-2 text-sm" defaultValue="BluePhoenix" maxLength={11} />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">API Key</label>
            <input type="password" className="w-full border rounded px-3 py-2 text-sm" placeholder="Enter API key" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Quiet Hours</label>
            <div className="flex gap-2 items-center">
              <input type="time" defaultValue="22:00" className="border rounded px-3 py-2 w-full text-sm" />
              <span className="text-sm">to</span>
              <input type="time" defaultValue="07:00" className="border rounded px-3 py-2 w-full text-sm" />
            </div>
            <div className="mt-1 text-xs text-gray-500">Don't send SMS during quiet hours</div>
          </div>
        </div>
      </div>

      {/* Custom Templates */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold mb-3">📝 Custom Templates</h4>
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1 text-sm">Template Type</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Welcome Email</option>
              <option>Payment Reminder</option>
              <option>Event Update</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Subject Line</label>
            <input className="w-full border rounded px-3 py-2 text-sm" defaultValue="Welcome to Blue Phoenix Sports!" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm">Message Content</label>
            <textarea
              rows={4}
              className="w-full border rounded px-3 py-2 text-sm"
              defaultValue="Dear {member_name}, welcome to Blue Phoenix Sports Limited..."
            />
            <div className="text-xs text-gray-500 mt-1">
              Available variables: {`{member_name}, {event_name}, {amount}, {due_date}`}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
          Save Notification Settings
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
          Send Test Message
        </button>
      </div>
    </div>
  );
};

export default Notifications;