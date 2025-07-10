import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FiUpload,
  FiCalendar,
  FiUsers,
  FiTrash2,
  FiPlus,
  FiDownload,
} from "react-icons/fi";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";


const AssignTraining = () => {
  // Form states
  const [program, setProgram] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [priority, setPriority] = useState("medium");
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState("assign");
  const [newPlayer, setNewPlayer] = useState({ name: "", position: "" });

  // Data states
  const [players, setPlayers] = useState([
    { id: 1, name: "John Doe", position: "Forward" },
    { id: 2, name: "Alice Smith", position: "Midfielder" },
    { id: 3, name: "Bob Johnson", position: "Defender" },
    { id: 4, name: "Emma Wilson", position: "Goalkeeper" },
  ]);

  const [trainingPrograms, setTrainingPrograms] = useState([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedPlayers = localStorage.getItem("training-players");
    const savedPrograms = localStorage.getItem("training-programs");

    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    if (savedPrograms) setTrainingPrograms(JSON.parse(savedPrograms));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("training-players", JSON.stringify(players));
    localStorage.setItem("training-programs", JSON.stringify(trainingPrograms));
  }, [players, trainingPrograms]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const addNewPlayer = () => {
    if (newPlayer.name && newPlayer.position) {
      const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
      setPlayers([...players, { ...newPlayer, id: newId }]);
      setNewPlayer({ name: "", position: "" });
      setFeedback({ type: "success", message: "Player added successfully!" });
    }
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
    setFeedback({ type: "success", message: "Player removed successfully!" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const trainingData = {
        id: trainingPrograms.length + 1,
        program,
        startDate,
        endDate,
        playerIds: selectedPlayers,
        assignedPlayers: players.filter(p => selectedPlayers.includes(p.id)),
        priority,
        attachments: attachments.map(file => file.name),
        createdAt: new Date().toISOString()
      };

      setTrainingPrograms([...trainingPrograms, trainingData]);
      setFeedback({
        type: "success",
        message: "Training program assigned successfully!"
      });
      
      // Reset form
      setProgram("");
      setSelectedPlayers([]);
      setAttachments([]);
      setPriority("medium");
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to assign training. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportToPDF = (program) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text(`Training Program: ${program.program}`, 14, 20);
    
    // Details
    doc.setFontSize(12);
    doc.text(`Start Date: ${new Date(program.startDate).toLocaleDateString()}`, 14, 30);
    doc.text(`End Date: ${new Date(program.endDate).toLocaleDateString()}`, 14, 38);
    doc.text(`Priority: ${program.priority}`, 14, 46);
    
    // Players table
    doc.autoTable({
      startY: 55,
      head: [['Name', 'Position']],
      body: program.assignedPlayers.map(p => [p.name, p.position]),
    });
    
    // Program description
    doc.text('Program Details:', 14, doc.lastAutoTable.finalY + 15);
    doc.text(program.program, 14, doc.lastAutoTable.finalY + 25, { maxWidth: 180 });
    
    doc.save(`training-program-${program.id}.pdf`);
  };

  const exportToCSV = (program) => {
    const csvData = [
      ["Training Program", program.program],
      ["Start Date", new Date(program.startDate).toLocaleDateString()],
      ["End Date", new Date(program.endDate).toLocaleDateString()],
      ["Priority", program.priority],
      [],
      ["Assigned Players", "Position"],
      ...program.assignedPlayers.map(p => [p.name, p.position]),
      [],
      ["Program Details"],
      [program.program]
    ];

    return csvData;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center md:text-left">
        Training Program Management
      </h2>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b mb-6">
        {["assign", "players", "programs"].map((tab) => (
          <button
            key={tab}
            className={`flex-shrink-0 py-2 px-6 font-medium whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "assign"
              ? "Assign Training"
              : tab === "players"
              ? "Manage Players"
              : "View Programs"}
          </button>
        ))}
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-md text-center ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Assign Training Tab */}
      {activeTab === "assign" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Training Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Training Description
            </label>
            <textarea
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="e.g. Cardio drills, resistance training, tactical awareness"
              rows={4}
              required
            />
          </div>

          {/* Date pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2" /> Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2" /> End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
            </div>
          </div>

          {/* Player Selection */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FiUsers className="mr-2" /> Assign to Players
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-auto border rounded p-2">
              {players.map((player) => (
                <div key={player.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`player-${player.id}`}
                    checked={selectedPlayers.includes(player.id)}
                    onChange={() => togglePlayerSelection(player.id)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <label
                    htmlFor={`player-${player.id}`}
                    className="ml-2 text-gray-700 truncate"
                    title={`${player.name} (${player.position})`}
                  >
                    {player.name} ({player.position})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Priority Level
            </label>
            <div className="flex space-x-6">
              {["low", "medium", "high"].map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="radio"
                    id={`priority-${level}`}
                    name="priority"
                    checked={priority === level}
                    onChange={() => setPriority(level)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <label htmlFor={`priority-${level}`} className="ml-2 capitalize">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 flex items-center">
              <FiUpload className="mr-2" /> Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                multiple
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600"
              >
                <FiUpload className="text-3xl mb-2" />
                <span>Click to upload files or drag and drop</span>
                <span className="text-sm text-gray-400 mt-1">
                  PDF, JPG, PNG up to 10MB
                </span>
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="mt-3 space-y-2 max-h-32 overflow-auto border rounded p-2 bg-gray-50">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm truncate"
                    title={file.name}
                  >
                    <span className="truncate max-w-xs">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 ml-4"
                      aria-label={`Remove attachment ${file.name}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              onClick={() => {
                setProgram("");
                setSelectedPlayers([]);
                setAttachments([]);
                setPriority("medium");
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-6 py-3 rounded-md text-white transition ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Assigning..." : "Assign Training"}
            </button>
          </div>
        </form>
      )}

      {/* Manage Players Tab */}
      {activeTab === "players" && (
        <div>
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-lg mb-3">Add New Player</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, name: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Player name"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  value={newPlayer.position}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, position: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Player position"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addNewPlayer}
                  className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <FiPlus className="mr-1" /> Add Player
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-auto max-w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.id}
                    className="border-b hover:bg-gray-50"
                    tabIndex={0}
                  >
                    <td className="py-3 px-4">{player.name}</td>
                    <td className="py-3 px-4">{player.position}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => removePlayer(player.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                        aria-label={`Remove player ${player.name}`}
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Programs Tab */}
      {activeTab === "programs" && (
        <div>
          {trainingPrograms.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No training programs assigned yet.
            </div>
          ) : (
            <div className="space-y-6">
              {trainingPrograms.map((program) => (
                <div
                  key={program.id}
                  className="border rounded-md p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{program.program}</h3>
                      <p className="text-gray-600">
                        {new Date(program.startDate).toLocaleDateString()} -{" "}
                        {new Date(program.endDate).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                          program.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : program.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {program.priority} priority
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => exportToPDF(program)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                        title="Export to PDF"
                      >
                        <FiDownload />
                      </button>
                      <CSVLink
                        data={exportToCSV(program)}
                        filename={`training-program-${program.id}.csv`}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                        title="Export to CSV"
                      >
                        <FiDownload />
                      </CSVLink>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Assigned Players ({program.assignedPlayers.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {program.assignedPlayers.map((player) => (
                        <div
                          key={player.id}
                          className="bg-gray-50 p-2 rounded truncate"
                          title={`${player.name} (${player.position})`}
                        >
                          {player.name} ({player.position})
                        </div>
                      ))}
                    </div>
                  </div>

                  {program.attachments && program.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Attachments</h4>
                      <div className="space-y-1">
                        {program.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600 truncate"
                            title={file}
                          >
                            <FiUpload className="mr-2" />
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignTraining;