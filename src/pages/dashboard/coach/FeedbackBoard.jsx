import React, { useState } from "react";

const FeedbackBoard = () => {
  const [player, setPlayer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  const isSubmitDisabled = !player.trim() || !feedback.trim() || feedback.length > 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const newFeedback = {
      id: Date.now(),
      player: player.trim(),
      feedback: feedback.trim(),
      date: new Date().toLocaleString(),
    };

    setSubmittedFeedback([newFeedback, ...submittedFeedback]);
    setPlayer("");
    setFeedback("");
    setMessage(`✅ Feedback submitted for ${newFeedback.player}`);

    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this feedback?");
    if (confirmed) {
      setSubmittedFeedback(submittedFeedback.filter((fb) => fb.id !== id));
    }
  };

  const filteredFeedback = submittedFeedback.filter((fb) =>
    fb.player.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Player Feedback</h2>

      {message && (
        <div className="mb-4 text-green-600 font-medium transition-opacity duration-500">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded space-y-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Player Name</label>
          <input
            type="text"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="e.g. John Doe"
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your observations..."
            className="w-full p-3 border rounded"
            rows={4}
            maxLength={500}
            required
          />
          <div className="text-sm text-gray-500 text-right">
            {feedback.length} / 500 characters
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`py-2 px-6 rounded text-white ${
            isSubmitDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit Feedback
        </button>
      </form>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by player name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {filter && (
          <button
            onClick={() => setFilter("")}
            aria-label="Clear search"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>

      {filteredFeedback.length > 0 ? (
        <ul className="space-y-4">
          {filteredFeedback.map(({ id, player, feedback, date }) => (
            <li key={id} className="p-4 bg-gray-50 border-l-4 border-blue-600 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{player}</p>
                  <p className="text-sm text-gray-600 mb-2">{date}</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{feedback}</p>
                </div>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-500 text-sm hover:underline ml-4"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackBoard;
