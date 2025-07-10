import React, { useState } from "react";
import {
  FiMail,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiSend,
  FiTag,
} from "react-icons/fi";

const initialMessages = [
  {
    id: 1,
    sender: "Coach Daniel",
    type: "Announcement",
    date: "2025-07-04",
    subject: "Upcoming Tournament",
    content:
      "There will be a tournament on July 15th. Make sure you're prepared with proper kits and arrive by 8:00 AM sharp. Training focus next week will be tactical preparation.",
    read: false,
  },
  {
    id: 2,
    sender: "Coach Sarah",
    type: "Private",
    date: "2025-07-02",
    subject: "One-on-One Review",
    content:
      "Let’s schedule a personal performance review for this Friday after practice. Please come with your self-evaluation ready.",
    read: false,
  },
  {
    id: 3,
    sender: "Coach Alex",
    type: "Announcement",
    date: "2025-06-30",
    subject: "Fitness Evaluation Results",
    content:
      "The recent fitness evaluation results are now posted. If you need individual feedback, please reach out privately.",
    read: true,
  },
];

const MessageTabs = ["All", "Announcement", "Private"];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [expanded, setExpanded] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [activeTab, setActiveTab] = useState("All");

  const toggleExpand = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
    setExpanded(expanded === id ? null : id);
  };

  const handleReplyChange = (id, value) => {
    setReplyText({ ...replyText, [id]: value });
  };

  const handleReplySubmit = (id) => {
    alert(`Reply to Message #${id}: ${replyText[id]}`);
    setReplyText({ ...replyText, [id]: "" });
  };

  const toggleReadStatus = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, read: !msg.read } : msg
      )
    );
  };

  const filteredMessages = messages.filter((msg) =>
    activeTab === "All" ? true : msg.type === activeTab
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <FiMail className="text-2xl text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {MessageTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <p className="text-gray-500 italic">No messages in this tab.</p>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-lg p-4 transition duration-150 ease-in-out ${
                msg.read ? "bg-gray-50" : "bg-yellow-50"
              }`}
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <FiUser />
                    <span>{msg.sender}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <FiTag />
                    <span>{msg.type}</span>
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-800 break-words max-w-full sm:max-w-[60%]">
                  {msg.subject}
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">{msg.date}</div>
                <div className="flex gap-2 items-center mt-2 sm:mt-0">
                  <button
                    onClick={() => toggleReadStatus(msg.id)}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded whitespace-nowrap"
                    type="button"
                  >
                    {msg.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => toggleExpand(msg.id)}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none"
                    aria-expanded={expanded === msg.id}
                    aria-controls={`msg-content-${msg.id}`}
                    type="button"
                  >
                    {expanded === msg.id ? (
                      <FiChevronUp size={20} />
                    ) : (
                      <FiChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expanded === msg.id && (
                <div
                  id={`msg-content-${msg.id}`}
                  className="mt-4 border-t pt-4 space-y-4"
                >
                  <p className="text-gray-700 leading-relaxed">{msg.content}</p>

                  {msg.type === "Private" && (
                    <div>
                      <label
                        htmlFor={`reply-${msg.id}`}
                        className="block mb-1 font-medium text-sm text-gray-700"
                      >
                        Reply:
                      </label>
                      <textarea
                        id={`reply-${msg.id}`}
                        rows={3}
                        value={replyText[msg.id] || ""}
                        onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring"
                        placeholder="Type your reply..."
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleReplySubmit(msg.id)}
                          disabled={!replyText[msg.id]}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                          type="button"
                        >
                          <FiSend />
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
