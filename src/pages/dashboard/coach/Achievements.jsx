import React, { useState, useEffect, useMemo } from "react";
import {
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Mock images for achievements (in a real app, these would come from your backend)
const achievementImages = {
  1: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
  2: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1592&q=80",
  3: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
};

const mockData = [
  {
    id: 1,
    title: "Regional Champions",
    description: "Won the regional tournament with 5-0 record",
    date: "2023-05-15",
    type: "team",
    playersInvolved: ["John D.", "Mike S.", "Sarah L."],
    image: achievementImages[1],
  },
  {
    id: 2,
    title: "MVP Award",
    description: "Player of the tournament in Spring League",
    date: "2023-04-02",
    type: "individual",
    player: "Mike S.",
    image: achievementImages[2],
  },
  {
    id: 3,
    title: "Best Defensive Record",
    description: "Conceded fewest goals in the league",
    date: "2023-06-10",
    type: "team",
    image: achievementImages[3],
  },
];

const AchievementCard = ({ achievement }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="h-48 overflow-hidden">
        <img
          src={achievement.image}
          alt={achievement.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            {achievement.type === "team" ? (
              <UserGroupIcon className="h-5 w-5" />
            ) : (
              <ChartBarIcon className="h-5 w-5" />
            )}
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-900 line-clamp-1">
            {achievement.title}
          </h3>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{achievement.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span>{new Date(achievement.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {achievement.type === "team" && achievement.playersInvolved && (
          <div className="flex items-start text-sm text-gray-500 mt-3">
            <UserGroupIcon className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Team:</span>{" "}
              <span className="line-clamp-1">
                {achievement.playersInvolved.join(", ")}
              </span>
            </div>
          </div>
        )}

        {achievement.type === "individual" && (
          <div className="flex items-center text-sm text-gray-500 mt-3">
            <ChartBarIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Player:</span> {achievement.player}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-sm"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        setAchievements(mockData);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError("Failed to load achievements. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize filtered achievements to avoid unnecessary recalculations
  const filteredAchievements = useMemo(() => {
    return selectedFilter === "all"
      ? achievements
      : achievements.filter((ach) => ach.type === selectedFilter);
  }, [achievements, selectedFilter]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Team Achievements
          </h1>
          <p className="mt-2 text-gray-600">
            Celebrate your team's milestones and successes
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={selectedFilter === "all"}
            onClick={() => setSelectedFilter("all")}
          >
            All
          </FilterButton>
          <FilterButton
            active={selectedFilter === "team"}
            onClick={() => setSelectedFilter("team")}
          >
            Team
          </FilterButton>
          <FilterButton
            active={selectedFilter === "individual"}
            onClick={() => setSelectedFilter("individual")}
          >
            Individual
          </FilterButton>
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <div className="text-red-500 mb-4 text-center">
            <p className="font-medium">{error}</p>
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
          <TrophyIcon className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No achievements found
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            {selectedFilter === "all"
              ? "There are no achievements to display yet."
              : `There are no ${selectedFilter} achievements to display.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Achievements;