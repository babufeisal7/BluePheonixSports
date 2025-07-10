import React, { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between">
        <label htmlFor="darkMode" className="font-medium">
          Dark Mode
        </label>
        <input
          id="darkMode"
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between">
        <label htmlFor="notifications" className="font-medium">
          Enable Notifications
        </label>
        <input
          id="notifications"
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>

      {/* Language Selector */}
      <div className="flex flex-col">
        <label htmlFor="language" className="font-medium mb-1">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          {/* Add more languages as needed */}
        </select>
      </div>
    </div>
  );
};

export default Settings;
