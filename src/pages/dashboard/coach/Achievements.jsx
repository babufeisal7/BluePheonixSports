import React, { useState, useEffect } from "react";
import { TrophyIcon, ChartBarIcon, CalendarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = [
          {
            id: 1,
            title: "Regional Champions",
            description: "Won the regional tournament with 5-0 record",
            date: "2023-05-15",
            type: "team",
            playersInvolved: ["John D.", "Mike S.", "Sarah L."]
          },
          {
            id: 2,
            title: "MVP Award",
            description: "Player of the tournament in Spring League",
            date: "2023-04-02",
            type: "individual",
            player: "Mike S."
          },
          {
            id: 3,
            title: "Best Defensive Record",
            description: "Conceded fewest goals in the league",
            date: "2023-06-10",
            type: "team"
          }
        ];
        
        setAchievements(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAchievements = selectedFilter === "all" 
    ? achievements 
    : achievements.filter(ach => ach.type === selectedFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Achievements</h1>
          <p className="mt-2 text-gray-600">Track and celebrate your team's successes</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-md ${selectedFilter === "all" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter("team")}
            className={`px-4 py-2 rounded-md ${selectedFilter === "team" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Team
          </button>
          <button
            onClick={() => setSelectedFilter("individual")}
            className={`px-4 py-2 rounded-md ${selectedFilter === "individual" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Individual
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <TrophyIcon className="h-6 w-6" />
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-gray-900">{achievement.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                  
                  {achievement.type === "team" && achievement.playersInvolved && (
                    <div className="flex items-center text-sm text-gray-500">
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      <span>Players: {achievement.playersInvolved.join(", ")}</span>
                    </div>
                  )}
                  
                  {achievement.type === "individual" && (
                    <div className="flex items-center text-sm text-gray-500">
                      <ChartBarIcon className="h-4 w-4 mr-1" />
                      <span>Player: {achievement.player}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No achievements found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Achievements;