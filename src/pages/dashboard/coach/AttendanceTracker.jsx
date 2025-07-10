import React, { useState } from "react";

const initialTrainings = [
  { id: 1, title: "Strength Training", description: "Weight lifting & conditioning", status: "In Progress" },
  { id: 2, title: "Endurance Run", description: "5km run thrice a week", status: "Not Started" },
];

const statusOptions = ["Not Started", "In Progress", "Completed"];

const TrainingTracker = () => {
  const [trainings, setTrainings] = useState(initialTrainings);
  const [filter, setFilter] = useState("All");
  const [newTraining, setNewTraining] = useState({ title: "", description: "" });

  const addTraining = (e) => {
    e.preventDefault();
    if (!newTraining.title.trim()) return;
    setTrainings((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTraining.title.trim(),
        description: newTraining.description.trim(),
        status: "Not Started",
      },
    ]);
    setNewTraining({ title: "", description: "" });
  };

  const updateStatus = (id, status) => {
    setTrainings((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const filteredTrainings =
    filter === "All" ? trainings : trainings.filter((t) => t.status === filter);

  return (
    <section className="px-4 py-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Training Programs</h2>

      <form
        onSubmit={addTraining}
        className="mb-6 space-y-3 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Training Title"
          value={newTraining.title}
          onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
          className="border p-3 rounded w-full text-base"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={newTraining.description}
          onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
          className="border p-3 rounded w-full text-base resize-none"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 w-full text-lg font-medium"
        >
          Add Training
        </button>
      </form>

      <div className="mb-4 flex justify-center">
        <label className="font-medium flex items-center space-x-2">
          <span>Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2 text-base"
          >
            <option value="All">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredTrainings.length === 0 ? (
        <p className="text-gray-500 text-center">No training programs found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredTrainings.map(({ id, title, description, status }) => (
            <li
              key={id}
              className="border rounded p-4 bg-gray-50 shadow flex flex-col"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{title}</h3>
                {description && <p className="text-gray-700 mt-1">{description}</p>}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => updateStatus(id, option)}
                    className={`px-4 py-2 rounded min-w-[110px] text-center text-base font-medium transition ${
                      status === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-pressed={status === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TrainingTracker;
