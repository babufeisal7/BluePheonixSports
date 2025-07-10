import React from "react";

const sampleReports = [
  { id: 1, title: "Monthly Performance", date: "2025-06-30", status: "Completed" },
  { id: 2, title: "Injury Summary", date: "2025-07-01", status: "Pending" },
  { id: 3, title: "Training Attendance", date: "2025-06-28", status: "Completed" },
];

const Reports = () => {
  return (
    <div className="p-4 sm:p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Reports</h2>
      <p className="text-gray-600 mb-6">
        This is the Reports page content. Below are some recent reports:
      </p>

      <div className="space-y-4">
        {sampleReports.map(({ id, title, date, status }) => (
          <div
            key={id}
            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50"
          >
            <div className="mb-2 sm:mb-0">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">Date: {new Date(date).toLocaleDateString()}</p>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
