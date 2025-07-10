import React from "react";

const sampleResources = [
  {
    id: 1,
    title: "Training Schedule Overview",
    type: "Guide",
    date: "2025-07-05",
  },
  {
    id: 2,
    title: "Nutrition Plan - Summer 2025",
    type: "Plan",
    date: "2025-06-28",
  },
  {
    id: 3,
    title: "Coaching Strategies Handbook",
    type: "Material",
    date: "2025-07-01",
  },
];

const Resources = () => {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Resources</h2>
      <p className="text-gray-700 mb-6">
        Access training guides, nutrition plans, and coaching materials.
      </p>

      <div className="space-y-4">
        {sampleResources.map(({ id, title, type, date }) => (
          <div
            key={id}
            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500">{type}</p>
            </div>
            <div className="mt-2 sm:mt-0 text-sm text-gray-500">
              Added on {new Date(date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
