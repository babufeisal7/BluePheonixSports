import React, { useState } from 'react';
import { FiMessageSquare, FiUserCheck, FiEdit2, FiSend } from 'react-icons/fi';

const initialFeedback = [
  {
    id: 1,
    coach: 'Coach Daniel',
    date: '2025-06-25',
    rating: 8,
    comment:
      'Excellent work rate during training. Improve decision-making under pressure.',
  },
  {
    id: 2,
    coach: 'Coach Sarah',
    date: '2025-06-18',
    rating: 7,
    comment:
      'Great teamwork and positioning. Work on shot accuracy during drills.',
  },
];

const CoachFeedback = () => {
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [selfEval, setSelfEval] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selfEval.trim()) {
      const newEntry = {
        id: Date.now(),
        coach: 'Self Evaluation',
        date: new Date().toISOString().split('T')[0],
        rating: null,
        comment: selfEval.trim(),
      };
      setFeedbackList([newEntry, ...feedbackList]);
      setSelfEval('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-1">
          <FiMessageSquare className="text-blue-500 text-xl sm:text-2xl" />
          Coach Feedback
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Review feedback and submit your own reflections.
        </p>
      </div>

      {/* Feedback List */}
      <div className="space-y-4 mb-8">
        {feedbackList.map((fb) => (
          <div key={fb.id} className="p-4 bg-gray-50 border rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
              <span className="text-sm font-semibold text-gray-700">{fb.coach}</span>
              <span className="text-xs text-gray-500">{fb.date}</span>
            </div>
            {fb.rating !== null && (
              <div className="text-sm text-yellow-600 mb-1">Rating: {fb.rating}/10</div>
            )}
            <p className="text-gray-700 text-sm">{fb.comment}</p>
          </div>
        ))}
      </div>

      {/* Self Evaluation Box */}
      <div className="p-4 bg-blue-50 border rounded-lg">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
          <FiEdit2 className="text-blue-500" />
          Submit Self-Evaluation
        </h3>
        <textarea
          value={selfEval}
          onChange={(e) => setSelfEval(e.target.value)}
          placeholder="Reflect on your performance this week..."
          rows={4}
          className="w-full border rounded p-3 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleSubmit}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 text-sm"
        >
          <FiSend /> Submit
        </button>
        {submitted && (
          <p className="text-green-600 text-sm mt-2">Self-evaluation submitted!</p>
        )}
      </div>
    </div>
  );
};

export default CoachFeedback;
