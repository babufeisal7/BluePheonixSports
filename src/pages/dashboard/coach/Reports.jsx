import React, { useState } from "react";
import { 
  FiDownload, 
  FiEye, 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiChevronLeft, 
  FiChevronRight,
  FiX,
  FiCalendar,
  FiFileText,
  FiBarChart2,
  FiActivity,
  FiUsers,
  FiDollarSign
} from "react-icons/fi";

// SVG images as data URLs with more detailed visuals
const reportImages = {
  analytics: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f8fafc'/%3E%3Cpath d='M10,50 Q25,20 40,30 T70,20 T90,40' stroke='%233b82f6' stroke-width='2' fill='none' stroke-dasharray='5,2'/%3E%3Cpath d='M10,40 Q25,10 40,20 T70,10 T90,30' stroke='%2310b981' stroke-width='2' fill='none'/%3E%3Ccircle cx='10' cy='50' r='2.5' fill='%233b82f6'/%3E%3Ccircle cx='40' cy='30' r='2.5' fill='%233b82f6'/%3E%3Ccircle cx='70' cy='20' r='2.5' fill='%233b82f6'/%3E%3Ccircle cx='90' cy='40' r='2.5' fill='%233b82f6'/%3E%3Ccircle cx='10' cy='40' r='2.5' fill='%2310b981'/%3E%3Ccircle cx='40' cy='20' r='2.5' fill='%2310b981'/%3E%3Ccircle cx='70' cy='10' r='2.5' fill='%2310b981'/%3E%3Ccircle cx='90' cy='30' r='2.5' fill='%2310b981'/%3E%3C/svg%3E",
  medical: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f8fafc'/%3E%3Cpath d='M30,10 L70,10 L70,25 L85,25 L85,45 L70,45 L70,60 L30,60 L30,45 L15,45 L15,25 L30,25 Z' fill='none' stroke='%23ef4444' stroke-width='2'/%3E%3Cpath d='M50,25 L50,45 M40,35 L60,35' stroke='%23ef4444' stroke-width='2'/%3E%3Ccircle cx='20' cy='15' r='3' fill='%23f87171'/%3E%3Ccircle cx='80' cy='15' r='3' fill='%23f87171'/%3E%3C/svg%3E",
  administrative: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f8fafc'/%3E%3Crect x='15' y='10' width='70' height='40' rx='2' fill='white' stroke='%2394a3b8' stroke-width='1'/%3E%3Crect x='20' y='15' width='60' height='5' fill='%23e2e8f0'/%3E%3Crect x='20' y='25' width='40' height='5' fill='%23e2e8f0'/%3E%3Crect x='20' y='35' width='50' height='5' fill='%23e2e8f0'/%3E%3Crect x='20' y='45' width='30' height='5' fill='%23e2e8f0'/%3E%3Ccircle cx='75' cy='27' r='3' fill='%233b82f6'/%3E%3Ccircle cx='75' cy='37' r='3' fill='%2310b981'/%3E%3Ccircle cx='75' cy='47' r='3' fill='%23f59e0b'/%3E%3C/svg%3E",
  financial: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f8fafc'/%3E%3Cpath d='M10,50 L20,35 L30,45 L40,25 L50,40 L60,30 L70,50 L80,20 L90,40' stroke='%2310b981' stroke-width='2' fill='none'/%3E%3Cpath d='M10,45 L20,30 L30,40 L40,20 L50,35 L60,25 L70,45 L80,15 L90,35' stroke='%233b82f6' stroke-width='1' fill='none' stroke-dasharray='3,2'/%3E%3Ccircle cx='50' cy='40' r='3' fill='%2310b981'/%3E%3C/svg%3E",
  scouting: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f8fafc'/%3E%3Ccircle cx='30' cy='30' r='15' fill='white' stroke='%23f59e0b' stroke-width='2'/%3E%3Cpath d='M30,15 L30,45 M15,30 L45,30' stroke='%23f59e0b' stroke-width='2'/%3E%3Ccircle cx='70' cy='30' r='10' fill='white' stroke='%23f59e0b' stroke-width='2'/%3E%3Cpath d='M70,20 L70,40 M60,30 L80,30' stroke='%23f59e0b' stroke-width='2'/%3E%3Cpath d='M30,30 L70,30' stroke='%2394a3b8' stroke-width='1' stroke-dasharray='3,2'/%3E%3C/svg%3E"
};

const sampleReports = [
  { 
    id: 1, 
    title: "Monthly Performance Analytics", 
    date: "2025-06-30", 
    status: "Completed",
    type: "Analytics",
    image: reportImages.analytics,
    description: "Comprehensive overview of team performance metrics including goals, assists, passes completed, distance covered, and player ratings. This report compares current performance with previous months and identifies key trends.",
    author: "Sports Analytics Team",
    pages: 24,
    fileSize: "4.2 MB",
    format: "PDF",
    tags: ["performance", "monthly", "metrics"],
    relatedReports: [2, 3],
    downloadCount: 142,
    lastAccessed: "2025-07-15"
  },
  { 
    id: 2, 
    title: "Injury Report Q2 2025", 
    date: "2025-07-01", 
    status: "Pending Review",
    type: "Medical",
    image: reportImages.medical,
    description: "Detailed report on current player injuries, recovery timelines, rehabilitation progress, and medical recommendations. Includes severity assessments and estimated return-to-play dates for all affected players.",
    author: "Medical Department",
    pages: 18,
    fileSize: "3.8 MB",
    format: "PDF",
    tags: ["injuries", "medical", "recovery"],
    relatedReports: [1, 5],
    downloadCount: 87,
    lastAccessed: "2025-07-10"
  },
  { 
    id: 3, 
    title: "Training Attendance & Performance", 
    date: "2025-06-28", 
    status: "Completed",
    type: "Administrative",
    image: reportImages.administrative,
    description: "Record of player attendance at training sessions with detailed participation statistics, performance benchmarks achieved, and coach evaluations for each session in the current month.",
    author: "Training Staff",
    pages: 32,
    fileSize: "5.1 MB",
    format: "PDF",
    tags: ["training", "attendance", "performance"],
    relatedReports: [1, 4],
    downloadCount: 95,
    lastAccessed: "2025-07-05"
  },
  { 
    id: 4, 
    title: "Financial Quarterly Report Q2", 
    date: "2025-06-25", 
    status: "Approved",
    type: "Financial",
    image: reportImages.financial,
    description: "Quarterly financial report including detailed expense breakdowns, revenue streams, budget allocations, and financial projections for the remainder of the fiscal year.",
    author: "Finance Department",
    pages: 45,
    fileSize: "6.7 MB",
    format: "PDF",
    tags: ["finance", "quarterly", "budget"],
    relatedReports: [3, 5],
    downloadCount: 63,
    lastAccessed: "2025-07-01"
  },
  { 
    id: 5, 
    title: "Scouting Analysis: Summer Transfer Targets", 
    date: "2025-07-05", 
    status: "In Progress",
    type: "Scouting",
    image: reportImages.scouting,
    description: "Evaluation of potential transfer targets with comprehensive performance analysis, video highlights, statistical comparisons, and scouting team recommendations for the upcoming transfer window.",
    author: "Scouting Network",
    pages: 52,
    fileSize: "8.3 MB",
    format: "PDF + Video",
    tags: ["scouting", "transfers", "targets"],
    relatedReports: [2, 4],
    downloadCount: 28,
    lastAccessed: "2025-07-12"
  },
];

const statusOptions = ["All", "Completed", "Pending Review", "Approved", "In Progress", "Archived"];
const typeOptions = ["All", "Analytics", "Medical", "Administrative", "Financial", "Scouting"];

const statusColors = {
  "Completed": "bg-green-100 text-green-800",
  "Pending Review": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Approved": "bg-purple-100 text-purple-800",
  "Archived": "bg-gray-100 text-gray-800"
};

const typeColors = {
  "Analytics": "bg-indigo-100 text-indigo-800",
  "Medical": "bg-red-100 text-red-800",
  "Administrative": "bg-gray-100 text-gray-800",
  "Financial": "bg-emerald-100 text-emerald-800",
  "Scouting": "bg-amber-100 text-amber-800"
};

const typeIcons = {
  "Analytics": <FiBarChart2 className="inline mr-1" />,
  "Medical": <FiActivity className="inline mr-1" />,
  "Administrative": <FiFileText className="inline mr-1" />,
  "Financial": <FiDollarSign className="inline mr-1" />,
  "Scouting": <FiUsers className="inline mr-1" />
};

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(4);
  const [sortOption, setSortOption] = useState("date-desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter, sort and paginate reports
  const filteredReports = sampleReports.filter(report => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      report.title.toLowerCase().includes(search) || 
      report.description.toLowerCase().includes(search) ||
      report.tags.some(tag => tag.toLowerCase().includes(search));

    const matchesStatus = filterStatus === "All" || report.status === filterStatus;
    const matchesType = filterType === "All" || report.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    if (sortOption === "downloads-desc") return b.downloadCount - a.downloadCount;
    return 0;
  });

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Page change handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Download handler
  const handleDownload = (id) => {
    const report = sampleReports.find(r => r.id === id);
    console.log(`Downloading: ${report.title}`);
    // Real download logic here
  };

  // View report detail
  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("All");
    setFilterType("All");
    setCurrentPage(1);
  };

  // Date formatter
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Fixed formatFileSize function to avoid errors
  const formatFileSize = (sizeString) => {
    // Your sampleReports have sizes as strings like "4.2 MB"
    // So we just return them as-is.
    return sizeString;
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Team Reports Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Access, analyze and manage all team reports in one centralized location
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors shadow-sm">
            <FiPlus size={18} /> Generate Report
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports by title, description or tags..."
              className="pl-10 pr-4 py-2.5 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Status */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
            >
              {typeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort & Reset */}
        <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort By:</label>
            <select
              id="sort"
              className="p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="downloads-desc">Most Downloads</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="text-sm text-red-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentReports.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No reports found.</p>
        ) : (
          currentReports.map(report => (
            <div 
              key={report.id} 
              onClick={() => handleViewReport(report)}
              className="cursor-pointer border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
            >
              <div className="relative h-36 rounded-t-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={report.image} 
                  alt={`${report.type} report icon`} 
                  className="h-24 w-auto select-none pointer-events-none"
                  draggable={false}
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded ${statusColors[report.status] || "bg-gray-100 text-gray-800"}`}>
                  {report.status}
                </span>
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded flex items-center ${typeColors[report.type] || "bg-gray-100 text-gray-800"}`}>
                  {typeIcons[report.type]}{report.type}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                <p className="text-sm text-gray-600 flex-grow">{report.description.length > 70 ? report.description.slice(0, 70) + "…" : report.description}</p>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span><strong>Pages:</strong> {report.pages}</span>
                  <span><strong>Size:</strong> {formatFileSize(report.fileSize)}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span><strong>Author:</strong> {report.author}</span>
                  <span><strong>Date:</strong> {formatDate(report.date)}</span>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  <button 
                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm" 
                    onClick={e => {
                      e.stopPropagation();
                      handleDownload(report.id);
                    }}
                  >
                    <FiDownload /> Download
                  </button>
                  <button 
                    className="flex items-center gap-1 text-green-600 hover:underline text-sm" 
                    onClick={e => {
                      e.stopPropagation();
                      handleViewReport(report);
                    }}
                  >
                    <FiEye /> View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4 select-none">
          <button 
            onClick={() => currentPage > 1 && paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40`}
          >
            <FiChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-600 hover:text-white
                ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40`}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedReport(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close details modal"
            >
              <FiX size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img 
                src={selectedReport.image} 
                alt={`${selectedReport.type} report icon`} 
                className="h-32 w-auto"
                draggable={false}
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedReport.title}</h2>
                <p className="text-gray-700 mb-4">{selectedReport.description}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Status:</strong> <span className={`${statusColors[selectedReport.status] || "text-gray-800"}`}>{selectedReport.status}</span></p>
                  <p><strong>Type:</strong> <span className={`${typeColors[selectedReport.type] || "text-gray-800"}`}>{selectedReport.type}</span></p>
                  <p><strong>Author:</strong> {selectedReport.author}</p>
                  <p><strong>Date:</strong> {formatDate(selectedReport.date)}</p>
                  <p><strong>Pages:</strong> {selectedReport.pages}</p>
                  <p><strong>File Size:</strong> {formatFileSize(selectedReport.fileSize)}</p>
                  <p><strong>Tags:</strong> {selectedReport.tags.join(", ")}</p>
                  <p><strong>Downloads:</strong> {selectedReport.downloadCount}</p>
                  <p><strong>Last Accessed:</strong> {formatDate(selectedReport.lastAccessed)}</p>
                </div>

                <div className="mt-6 flex gap-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleDownload(selectedReport.id)}
                  >
                    <FiDownload /> Download
                  </button>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setSelectedReport(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reports;
