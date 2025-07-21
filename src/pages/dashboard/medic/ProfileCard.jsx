import React from 'react';

const ProfileCard = ({ title, value, icon, color = 'bg-blue-100 text-blue-600' }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
    <div className={`p-3 ${color} rounded-full`}>{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

export default ProfileCard;