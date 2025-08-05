import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaUserShield, FaUserTie, FaSearch, FaEllipsisV, FaPaperclip } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const MedicMessaging = () => {
  // Sample data
  const users = [
    { id: 1, name: 'Admin Team', role: 'admin', image: '/pro11.jpg', online: true },
    { id: 2, name: 'John Player', role: 'player', image: '/keeper.jpg', online: true },
    { id: 3, name: 'Sarah Coach', role: 'coach', image: '/coach2.jpg', online: false },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: 1, text: 'Please review the latest injury reports', timestamp: '10:30 AM', read: true },
    { id: 2, sender: 2, text: 'I need to schedule a check-up', timestamp: '11:45 AM', read: false },
  ]);

  const [activeUser, setActiveUser] = useState(users[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter messages for active user
  const userMessages = messages.filter(msg => msg.sender === activeUser.id);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 0, // 0 represents the medic (current user)
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <FaUser className="mr-2 text-blue-500" />
            Messages
          </h2>
          <div className="relative mt-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeUser.id === user.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveUser(user)}
            >
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{user.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  {user.role === 'admin' && <FaUserShield className="mr-1" />}
                  {user.role === 'coach' && <FaUserTie className="mr-1" />}
                  {user.role === 'player' && <FaUser className="mr-1" />}
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={activeUser.image}
              alt={activeUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="font-bold">{activeUser.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                {activeUser.online ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    <span>Online</span>
                  </>
                ) : (
                  <span>Offline</span>
                )}
              </div>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEllipsisV />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {userMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No messages yet. Start a conversation!
            </div>
          ) : (
            userMessages.map((message, index) => {
              const isMedic = message.sender === 0;
              
              return (
                <div
                  key={index}
                  className={`flex mb-4 ${isMedic ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMedic && (
                    <img
                      src={activeUser.image}
                      alt={activeUser.name}
                      className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                    />
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isMedic ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
                  >
                    <div>{message.text}</div>
                    <div className={`text-xs mt-1 text-right ${isMedic ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div className="bg-white p-4 border-t border-gray-200">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 mr-2">
              <FaPaperclip />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`absolute right-2 bottom-2 ${newMessage.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400'}`}
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicMessaging;