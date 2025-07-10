import React, { useState, useEffect } from "react";

const Performance = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white rounded shadow">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Performance Analysis
      </h2>

      {loading ? (
        // Loading skeleton placeholder
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-40 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-40 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ) : (
        // Actual content placeholder (replace with real charts or reports)
        <div className="space-y-6">
          <p className="text-gray-700 text-center text-sm sm:text-base">
            Here you will find detailed charts and insights about player and team performance.
          </p>

          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <p className="font-semibold mb-2">Player Performance Chart</p>
            {/* Replace this div with an actual chart component */}
            <div className="h-40 bg-blue-300 rounded"></div>
          </div>

          <div className="bg-green-100 p-4 rounded shadow text-center">
            <p className="font-semibold mb-2">Team Analytics</p>
            {/* Replace this div with another chart or report */}
            <div className="h-40 bg-green-300 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
