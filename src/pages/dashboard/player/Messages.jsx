import React, { useState, useEffect, useRef } from "react";
import { 
  FaPaperPlane, 
  FaSearch, 
  FaFilter, 
  FaUser, 
  FaUserMd, 
  FaUserTie, 
  FaUsers, 
  FaBell, 
  FaBellSlash,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sample data with avatars and message types
const initialMessages = [
  {
    id: 1,
    sender: "Coach Daniel",
    senderType: "coach",
    recipient: "Team",
    recipientType: "team",
    content: "Practice is moved to 5 PM tomorrow. Bring your training gear.",
    timestamp: "2025-07-06 14:30",
    read: true,
    priority: "normal"
  },
  {
    id: 2,
    sender: "Medic Alex",
    senderType: "medic",
    recipient: "Sarah Kim",
    recipientType: "player",
    content: "Please update me on your injury status. We need to adjust your recovery plan.",
    timestamp: "2025-07-05 09:15",
    read: false,
    priority: "high"
  },
  {
    id: 3,
    sender: "Admin",
    senderType: "admin",
    recipient: "All Staff",
    recipientType: "staff",
    content: "Monthly staff meeting scheduled for Friday at 10 AM in the conference room.",
    timestamp: "2025-07-04 16:45",
    read: true,
    priority: "normal"
  },
  {
    id: 4,
    sender: "Player Marcus",
    senderType: "player",
    recipient: "Coach Daniel",
    recipientType: "coach",
    content: "Can we review my performance metrics from last game?",
    timestamp: "2025-07-03 11:20",
    read: false,
    priority: "normal"
  }
];

// Avatar mapping
const avatarMap = {
  coach: "/coach1.jpg",
  medic: "/coach2.jpg",
  admin: "/coach3.jpg",
  player: "/image1.jpg",
  team: "https://cdn-icons-png.flaticon.com/512/1830/1830839.png",
  staff: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
};

// User types for filtering
const userTypes = [
  { id: "all", name: "All", icon: <FaUsers /> },
  { id: "coach", name: "Coaches", icon: <FaUserTie /> },
  { id: "medic", name: "Medics", icon: <FaUserMd /> },
  { id: "admin", name: "Admins", icon: <FaUser /> },
  { id: "player", name: "Players", icon: <FaUser /> }
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    recipientType: "player",
    content: "",
    priority: "normal"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // Calculate unread messages
  useEffect(() => {
    const count = messages.filter(msg => !msg.read).length;
    setUnreadCount(count);
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.recipient.trim() || !newMessage.content.trim()) {
      toast.error("Please enter both recipient and message content");
      return;
    }

    const message = {
      id: Date.now(),
      sender: "You",
      senderType: "user",
      recipient: newMessage.recipient.trim(),
      recipientType: newMessage.recipientType,
      content: newMessage.content.trim(),
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      read: true,
      priority: newMessage.priority
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage({ recipient: "", recipientType: "player", content: "", priority: "normal" });
    toast.success("Message sent successfully!");
  };

  const markAsRead = (id) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    toast.info("Message deleted");
  };

  const toggleExpandMessage = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
    markAsRead(id);
  };

  const filteredMessages = messages
    .filter(msg => {
      // Filter by user type
      if (activeFilter !== "all" && msg.senderType !== activeFilter && msg.recipientType !== activeFilter) {
        return false;
      }
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          msg.content.toLowerCase().includes(searchLower) ||
          msg.sender.toLowerCase().includes(searchLower) ||
          msg.recipient.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-50 border-l-4 border-red-500";
      case "medium": return "bg-yellow-50 border-l-4 border-yellow-500";
      default: return "bg-white";
    }
  };

  const getSenderIcon = (senderType) => {
    switch (senderType) {
      case "coach": return <FaUserTie className="text-blue-600" />;
      case "medic": return <FaUserMd className="text-green-600" />;
      case "admin": return <FaUserTie className="text-purple-600" />;
      case "player": return <FaUser className="text-gray-600" />;
      default: return <FaUser className="text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
          <p className="text-gray-600">Communicate with your team and staff</p>
        </div>
        <div className="flex items-center">
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
              {unreadCount} unread
            </span>
          )}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="md:hidden bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={20} />
            </button>
          </div>
          
          <div className="space-y-2 mb-6">
            <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Message Types</h3>
            {userTypes.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setActiveFilter(type.id);
                  setShowMobileFilters(false);
                }}
                className={`flex items-center w-full p-2 rounded-lg text-left ${activeFilter === type.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
              >
                <span className="mr-2">{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        {/* Desktop Filters */}
        <div className="hidden md:block md:w-64 bg-gray-50 rounded-lg p-4">
          <div className="space-y-2 mb-6">
            <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Message Types</h3>
            {userTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className={`flex items-center w-full p-2 rounded-lg text-left ${activeFilter === type.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
              >
                <span className="mr-2">{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Quick Actions</h3>
            <button 
              onClick={() => {
                setMessages(prev => prev.map(msg => ({ ...msg, read: true })));
                toast.info("All messages marked as read");
              }}
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 text-left"
            >
              <FaBellSlash className="mr-2 text-gray-600" />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Search bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <IoMdClose className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Messages List */}
          <div className="flex-1 mb-6 overflow-y-auto border rounded-lg divide-y">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No messages found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 transition cursor-pointer ${!message.read ? "bg-blue-50" : ""} ${getPriorityColor(message.priority)}`}
                >
                  <div 
                    className="flex justify-between items-start"
                    onClick={() => toggleExpandMessage(message.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={avatarMap[message.senderType] || avatarMap.player}
                        alt={message.sender}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{message.sender}</h3>
                          {getSenderIcon(message.senderType)}
                          {message.priority === "high" && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">High Priority</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          To: <span className="font-medium">{message.recipient}</span>
                        </p>
                        {expandedMessage === message.id && (
                          <p className="mt-2 text-gray-700">{message.content}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {message.timestamp.split(" ")[1].substring(0, 5)}
                      </span>
                      {!message.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <IoMdClose />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpandMessage(message.id);
                        }}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        {expandedMessage === message.id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  </div>
                  {expandedMessage !== message.id && (
                    <p className="mt-2 text-gray-700 line-clamp-1 pl-13">{message.content}</p>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Compose Message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <FaPaperPlane className="mr-2 text-blue-600" />
              New Message
            </h3>
            <form onSubmit={handleSend} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                  <input
                    type="text"
                    placeholder="Name or group"
                    value={newMessage.recipient}
                    onChange={(e) =>
                      setNewMessage((prev) => ({ ...prev, recipient: e.target.value }))
                    }
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Type</label>
                  <select
                    value={newMessage.recipientType}
                    onChange={(e) =>
                      setNewMessage((prev) => ({ ...prev, recipientType: e.target.value }))
                    }
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="player">Player</option>
                    <option value="team">Team</option>
                    <option value="coach">Coach</option>
                    <option value="medic">Medic</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex space-x-2">
                  {["normal", "medium", "high"].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setNewMessage(prev => ({ ...prev, priority }))}
                      className={`px-3 py-1 rounded-full text-xs ${
                        newMessage.priority === priority
                          ? priority === "high"
                            ? "bg-red-100 text-red-800"
                            : priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
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
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;