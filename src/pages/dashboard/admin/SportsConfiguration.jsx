import React, { useState, useCallback, useEffect } from "react";

const sportsData = [
  {
    id: "rugby",
    emoji: "🏉",
    name: "Rugby",
    description: "Professional rugby training and competition programs",
    coaches: 8,
    athletes: 45,
    status: "Active",
    seasons: ["Spring", "Fall"],
  },
  {
    id: "football",
    emoji: "⚽",
    name: "Football",
    description: "Comprehensive football development programs",
    coaches: 12,
    athletes: 67,
    status: "Active",
    seasons: ["Summer", "Fall"],
  },
  {
    id: "basketball",
    emoji: "🏀",
    name: "Basketball",
    description: "Indoor basketball training and league play",
    coaches: 6,
    athletes: 38,
    status: "Active",
    seasons: ["Winter", "Spring"],
  },
  {
    id: "swimming",
    emoji: "🏊",
    name: "Swimming",
    description: "Competitive swimming and water safety programs",
    coaches: 4,
    athletes: 29,
    status: "Active",
    seasons: ["Year-round"],
  },
];

const SportCard = React.memo(({ sport, onSelect, isSelected }) => (
  <div
    onClick={() => onSelect(sport)}
    className={`border rounded-lg p-3 shadow transition cursor-pointer ${
      isSelected ? "border-blue-500 bg-blue-50" : "hover:shadow-md"
    }`}
  >
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-2xl">{sport.emoji}</span>
      <h3 className="text-lg font-semibold">{sport.name}</h3>
    </div>
    <p className="text-gray-700 text-sm mb-3">{sport.description}</p>
    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
      <div>
        <strong>{sport.coaches}</strong> Coaches
      </div>
      <div>
        <strong>{sport.athletes}</strong> Athletes
      </div>
      <div>
        <strong>Status:</strong> {sport.status}
      </div>
      <div>
        <strong>Seasons:</strong> {sport.seasons.join(", ")}
      </div>
    </div>
  </div>
));

const SportsConfigurationMobile = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [formData, setFormData] = useState({
    coaches: 0,
    athletes: 0,
    status: "Active",
    seasons: "",
  });
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'detail'

  // When selectedSport changes, sync form data
  useEffect(() => {
    if (selectedSport) {
      setFormData({
        coaches: selectedSport.coaches,
        athletes: selectedSport.athletes,
        status: selectedSport.status,
        seasons: selectedSport.seasons.join(", "),
      });
      setViewMode("detail");
    } else {
      setFormData({
        coaches: 0,
        athletes: 0,
        status: "Active",
        seasons: "",
      });
    }
  }, [selectedSport]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "coaches" || name === "athletes" ? Number(value) : value,
    }));
  }, []);

  const handleSave = () => {
    alert(`Saved changes for ${selectedSport.name}`);
  };

  const handleBackToList = () => {
    setSelectedSport(null);
    setViewMode("list");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sports Configuration</h2>
      
      {viewMode === "list" ? (
        <>
          <p className="mb-4 text-gray-600 text-sm">
            Manage sports programs, seasons, and divisions
          </p>

          <button className="mb-4 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm w-full">
            + Add New Sport
          </button>

          {/* Sports Overview Cards */}
          <div className="space-y-4 mb-6">
            {sportsData.map((sport) => (
              <SportCard
                key={sport.id}
                sport={sport}
                onSelect={setSelectedSport}
                isSelected={selectedSport?.id === sport.id}
              />
            ))}
          </div>

          {/* Select Sport Dropdown */}
          <div className="mb-6">
            <label htmlFor="sport-select" className="block font-semibold mb-1 text-sm">
              Or select a sport to configure:
            </label>
            <select
              id="sport-select"
              className="border rounded px-3 py-2 w-full text-sm"
              onChange={(e) => {
                const sportId = e.target.value;
                const sport = sportsData.find((s) => s.id === sportId);
                setSelectedSport(sport || null);
              }}
              value={selectedSport?.id || ""}
            >
              <option value="">-- Choose a sport --</option>
              {sportsData.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50 shadow">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToList}
              className="text-blue-600 font-medium text-sm"
            >
              ← Back to list
            </button>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="text-2xl">{selectedSport.emoji}</span>
            </h3>
          </div>

          <h3 className="text-lg font-bold mb-3">{selectedSport.name} Settings</h3>
          <p className="mb-4 text-sm">{selectedSport.description}</p>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block font-semibold mb-1 text-sm">Coaches</label>
              <input
                type="number"
                min={0}
                name="coaches"
                value={formData.coaches}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-sm">Athletes</label>
              <input
                type="number"
                min={0}
                name="athletes"
                value={formData.athletes}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Paused</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1 text-sm">Seasons Offered</label>
            <input
              type="text"
              name="seasons"
              value={formData.seasons}
              onChange={handleInputChange}
              placeholder="Separate by commas, e.g. Spring, Fall"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default SportsConfigurationMobile;