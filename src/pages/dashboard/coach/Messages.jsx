import React, { useState } from "react";

const initialMessages = [
  {
    id: 1,
    sender: "Coach Daniel",
    recipient: "Team",
    content: "Practice is moved to 5 PM tomorrow.",
    timestamp: "2025-07-06 14:30",
  },
  {
    id: 2,
    sender: "Medic Alex",
    recipient: "Sarah Kim",
    content: "Please update me on your injury status.",
    timestamp: "2025-07-05 09:15",
  },
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    content: "",
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.recipient.trim() || !newMessage.content.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        recipient: newMessage.recipient.trim(),
        content: newMessage.content.trim(),
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      },
    ]);

    setNewMessage({ recipient: "", content: "" });
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      <p className="mb-6 text-gray-700">
        Check announcements and communicate privately with players and staff.
      </p>

      {/* Messages List */}
      <div className="mb-6 max-h-64 overflow-y-auto border rounded p-4 bg-gray-50 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          messages
            .slice()
            .reverse()
            .map(({ id, sender, recipient, content, timestamp }) => (
              <div key={id} className="bg-white p-3 rounded shadow-sm">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>
                    <strong>{sender}</strong> to <strong>{recipient}</strong>
                  </span>
                  <span>{timestamp}</span>
                </div>
                <p className="text-gray-800">{content}</p>
              </div>
            ))
        )}
      </div>

      {/* Compose Message */}
      <form onSubmit={handleSend} className="space-y-3">
        <input
          type="text"
          placeholder="Recipient"
          value={newMessage.recipient}
          onChange={(e) =>
            setNewMessage((prev) => ({ ...prev, recipient: e.target.value }))
          }
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <textarea
          placeholder="Write your message..."
          value={newMessage.content}
          onChange={(e) =>
            setNewMessage((prev) => ({ ...prev, content: e.target.value }))
          }
          rows={3}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Messages;
