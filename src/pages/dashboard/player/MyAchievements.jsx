import React from 'react';
import {
  FiAward,
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiCalendar,
  FiBookOpen,
} from 'react-icons/fi';

const STATS_DATA = [
  {
    icon: FiAward,
    color: 'text-yellow-500',
    label: 'Trophies Won',
    value: 5,
    details: ['Regional Cup (2023)', 'District Champions (2024)', 'U18 League (2022)'],
  },
  {
    icon: FiTarget,
    color: 'text-green-500',
    label: 'Goals Scored',
    value: 31,
    details: ['Season High: 12 Goals (2024)', 'Hat-trick vs City FC'],
  },
  {
    icon: FiUsers,
    color: 'text-blue-500',
    label: 'MVP Awards',
    value: 4,
    details: ['Best Player - Feb 2024', 'Player of the Tournament - 2023'],
  },
  {
    icon: FiTrendingUp,
    color: 'text-purple-500',
    label: 'Training Milestones',
    value: 8,
    details: ['Completed Advanced Fitness', 'Top 5 in Sprint Drills'],
  },
  {
    icon: FiCalendar,
    color: 'text-red-400',
    label: 'Major Events Played',
    value: 12,
    details: ['Nationals 2023', 'Youth Cup 2024', 'Blue Phoenix Derby'],
  },
  {
    icon: FiBookOpen,
    color: 'text-indigo-600',
    label: 'Leadership & Academic',
    value: 3,
    details: ['Team Captain (2024)', 'Sports Scholar Award'],
  },
];

const MyAchievements = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        My Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS_DATA.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`achievement-${index}`}
              className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="flex items-center mb-4 gap-3">
                <Icon className={`${item.color} text-3xl flex-shrink-0`} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.label}</h3>
                  <p className="text-2xl font-bold text-primary">{item.value}</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 flex-grow">
                {item.details.map((detail, i) => (
                  <li key={`detail-${index}-${i}`}>{detail}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(MyAchievements);
