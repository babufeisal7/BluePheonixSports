import React, { useState } from "react";
import { FiMapPin, FiClock, FiStar } from "react-icons/fi";

const resultStyles = {
  Win: "bg-green-100 text-green-800",
  Loss: "bg-red-100 text-red-800",
  Draw: "bg-yellow-100 text-yellow-800",
};

const mockMatches = [
  {
    id: 1,
    date: "2025-06-15T19:30",
    opponent: "City FC",
    opponentLogo: "https://via.placeholder.com/48x48/3b82f6/ffffff?text=CFC",
    teamLogo: "https://via.placeholder.com/48x48/ef4444/ffffff?text=OUR",
    location: "Home Stadium",
    time: "7:30 PM",
    formation: "4-3-3",
    playerRole: "Starter",
    score: "3 - 1",
    result: "Win",
    performanceSummary:
      "Strong defensive play with great possession control. Scored 2 goals in last 10 minutes.",
    rating: 9.2,
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-06-22T17:00",
    opponent: "United SC",
    opponentLogo: "https://via.placeholder.com/48x48/10b981/ffffff?text=USC",
    teamLogo: "https://via.placeholder.com/48x48/ef4444/ffffff?text=OUR",
    location: "Away",
    time: "5:00 PM",
    formation: "4-4-2",
    playerRole: "Substitute",
    score: "1 - 2",
    result: "Loss",
    performanceSummary:
      "Struggled with midfield control. Need to improve transition defense.",
    rating: 6.8,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-07-05T20:00",
    opponent: "Rovers FC",
    opponentLogo: "https://via.placeholder.com/48x48/f59e0b/ffffff?text=RFC",
    teamLogo: "https://via.placeholder.com/48x48/ef4444/ffffff?text=OUR",
    location: "Home Stadium",
    time: "8:00 PM",
    formation: "3-5-2",
    playerRole: "Starter",
    score: null,
    result: null,
    performanceSummary: null,
    rating: null,
    status: "Scheduled",
  },
];

const renderStars = (rating) => {
  if (rating == null) return "No rating";
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++)
    stars.push(
      <FiStar key={i} className="text-yellow-400 inline-block" />
    );
  if (halfStar)
    stars.push(
      <FiStar key="half" className="text-yellow-300 inline-block" />
    );
  return stars;
};

const MatchTracker = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [tab, setTab] = useState("upcoming"); // 'upcoming' or 'past'

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredMatches = mockMatches.filter((m) =>
    tab === "upcoming" ? m.status === "Scheduled" : m.status === "Completed"
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Match Tracker</h2>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 rounded-md font-semibold text-center ${
            tab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Upcoming Matches
        </button>
        <button
          onClick={() => setTab("past")}
          className={`px-4 py-2 rounded-md font-semibold text-center ${
            tab === "past"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Past Matches
        </button>
      </div>

      {filteredMatches.length === 0 ? (
        <p className="text-gray-600 italic">No {tab} matches to show.</p>
      ) : (
        <ul className="space-y-4">
          {filteredMatches.map((match) => {
            const isExpanded = expandedId === match.id;
            const resultClass =
              resultStyles[match.result] || "bg-gray-200 text-gray-700";
            const ratingHighlight =
              match.rating >= 8 ? "border-yellow-400 shadow-lg" : "";

            return (
              <li
                key={match.id}
                className={`border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer ${ratingHighlight}`}
                onClick={() => toggleExpand(match.id)}
                aria-expanded={isExpanded}
                aria-controls={`match-summary-${match.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleExpand(match.id);
                }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <img
                      src={match.teamLogo}
                      alt="Team logo"
                      className="w-12 h-12 rounded"
                    />
                    <div className="text-gray-900 font-semibold whitespace-nowrap">
                      vs {match.opponent}
                    </div>
                    <img
                      src={match.opponentLogo}
                      alt={`${match.opponent} logo`}
                      className="w-12 h-12 rounded"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-700 text-sm flex-wrap">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <FiMapPin />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <FiClock />
                      <span>
                        {new Date(match.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="whitespace-nowrap">
                      Formation: <span className="font-semibold">{match.formation}</span>
                    </div>
                    <div className="whitespace-nowrap">
                      Role: <span className="font-semibold">{match.playerRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    {match.status === "Completed" ? (
                      <>
                        <span
                          className={`${resultClass} px-3 py-1 rounded-full font-semibold whitespace-nowrap`}
                          aria-label={`Match result: ${match.result}`}
                        >
                          {match.result}
                        </span>
                        <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">{match.score}</span>
                        <div
                          className="flex items-center gap-1"
                          title={`Performance rating: ${match.rating || "N/A"}`}
                        >
                          {renderStars(match.rating)}
                          <span className="ml-1 text-gray-600 font-semibold whitespace-nowrap">
                            {match.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="italic text-gray-500 whitespace-nowrap">Scheduled</span>
                    )}
                    <button
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none whitespace-nowrap"
                    >
                      {isExpanded ? "▲" : "▼"}
                    </button>
                  </div>
                </div>

                {isExpanded && match.status === "Completed" && (
                  <div
                    id={`match-summary-${match.id}`}
                    className="mt-4 text-gray-700 bg-gray-50 rounded p-3"
                  >
                    <h4 className="font-semibold mb-2">Performance Summary</h4>
                    <p>{match.performanceSummary}</p>
                  </div>
                )}

                {isExpanded && match.status === "Scheduled" && (
                  <div
                    id={`match-summary-${match.id}`}
                    className="mt-4 text-gray-700 bg-gray-50 rounded p-3 italic"
                  >
                    <p>This match is scheduled. Details will be available after the match.</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MatchTracker;
