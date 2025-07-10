import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiActivity, 
  FiAlertTriangle, 
  FiHeart, 
  FiPlus, 
  FiChevronDown, 
  FiChevronUp,
  FiFileText,
  FiMessageSquare
} from 'react-icons/fi';

const TABS = [
  { key: 'overview', label: 'Health Overview', icon: FiHeart },
  { key: 'injuries', label: 'Injury Log', icon: FiAlertTriangle },
  { key: 'reports', label: 'Medical Reports', icon: FiFileText },
  { key: 'tips', label: 'Medical Tips', icon: FiMessageSquare },
];

// Helper functions for colors
const severityColor = (severity) => {
  switch (severity) {
    case 'mild': return 'bg-blue-100 text-blue-800';
    case 'moderate': return 'bg-yellow-100 text-yellow-800';
    case 'severe': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const statusColor = (status) => {
  switch (status) {
    case 'recovered': return 'bg-green-100 text-green-800';
    case 'recovering': return 'bg-purple-100 text-purple-800';
    case 'acute': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const priorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

// Reusable collapsible item component
const CollapsibleItem = ({ id, headerContent, expanded, onToggle, children }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
        onClick={() => onToggle(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onToggle(id);
        }}
        aria-expanded={expanded}
      >
        {headerContent}
        <div>{expanded ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}</div>
      </div>
      {expanded && <div className="p-3 border-t bg-gray-50">{children}</div>}
    </div>
  );
};

const MyHealth = ({ playerId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedItem, setExpandedItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInjury, setNewInjury] = useState({
    type: '',
    date: '',
    severity: 'mild',
    notes: '',
    status: 'recovering'
  });

  const [healthData, setHealthData] = useState({
    metrics: {},
    injuries: [],
    medicalTips: [],
    medicalReports: []
  });

  // Fetch mock data (simulate API call)
  useEffect(() => {
    const fetchHealthData = async () => {
      const mockData = {
        metrics: {
          heartRate: '72 bpm',
          bloodPressure: '120/80 mmHg',
          lastCheckup: '2023-05-15',
          fitnessLevel: 'Excellent',
          hydration: 'Good',
          sleepQuality: '8.2/10',
          bmi: '22.3'
        },
        injuries: [
          {
            id: 1,
            type: 'Ankle Sprain',
            date: '2023-04-10',
            severity: 'moderate',
            notes: 'Right ankle, RICE protocol followed. Avoid high-impact activities for 2 more weeks.',
            status: 'recovering',
            recoveryTime: '3 weeks',
            prescribedBy: 'Dr. Smith',
            prescribedOn: '2023-04-10',
            treatments: ['Ice therapy', 'Compression bandage', 'Elevation']
          },
          {
            id: 2,
            type: 'Hamstring Strain',
            date: '2023-06-22',
            severity: 'mild',
            notes: 'Grade 1 strain, light stretching recommended. No sprinting until cleared.',
            status: 'recovering',
            recoveryTime: '2 weeks',
            prescribedBy: 'Dr. Johnson',
            prescribedOn: '2023-06-22',
            treatments: ['Foam rolling', 'Gentle stretching', 'NSAIDs as needed']
          }
        ],
        medicalTips: [
          {
            id: 1,
            tip: 'Increase hydration to 3L daily during training. Monitor urine color.',
            from: 'Dr. Smith',
            date: '2023-06-15',
            priority: 'high'
          },
          {
            id: 2,
            tip: 'Incorporate dynamic stretching routine before practice sessions.',
            from: 'Physio Team',
            date: '2023-06-10',
            priority: 'medium'
          }
        ],
        medicalReports: [
          {
            id: 1,
            title: 'Quarterly Physical Assessment',
            date: '2023-05-15',
            from: 'Dr. Smith',
            summary: 'Overall excellent condition. Slight imbalance in left quad strength noted. Recommend targeted strength exercises.',
            details: 'Full assessment shows cardiovascular fitness at 92nd percentile. Muscular strength well balanced except for slight left quad deficiency (8% difference). Flexibility within normal ranges.'
          }
        ]
      };
      setHealthData(mockData);
    };

    fetchHealthData();
  }, [playerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInjury(prev => ({ ...prev, [name]: value }));
  };

  const handleAddInjury = () => {
    const newInjuryEntry = {
      id: Date.now(),
      ...newInjury,
      prescribedBy: 'Self-reported',
      prescribedOn: new Date().toISOString().split('T')[0],
      treatments: []
    };
    setHealthData(prev => ({
      ...prev,
      injuries: [...prev.injuries, newInjuryEntry]
    }));
    setShowAddForm(false);
    setNewInjury({
      type: '',
      date: '',
      severity: 'mild',
      notes: '',
      status: 'recovering'
    });
  };

  // Reset expanded item on tab change
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setExpandedItem(null);
  }, []);

  const toggleItemDetails = useCallback((id) => {
    setExpandedItem(prev => (prev === id ? null : id));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <FiActivity className="text-2xl mr-2 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">My Health Dashboard</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FiHeart className="mr-2 text-red-500" /> Health Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(healthData.metrics).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FiAlertTriangle className="mr-2 text-yellow-500" /> Recent Injuries
          </h3>
          {healthData.injuries.slice(0, 2).map(injury => (
            <div key={injury.id} className="border rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{injury.type}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${severityColor(injury.severity)}`}>
                    {injury.severity}
                  </span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${statusColor(injury.status)}`}>
                    {injury.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">{formatDate(injury.date)}</span>
                  <span className="text-xs text-gray-400">By: {injury.prescribedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {activeTab === 'injuries' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <FiAlertTriangle className="mr-2 text-yellow-500" /> Injury History
            </h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              <FiPlus className="mr-1" /> Report Injury
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-3">Report New Injury</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Injury Type*</label>
                  <input
                    type="text"
                    name="type"
                    value={newInjury.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Hamstring Strain"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date*</label>
                  <input
                    type="date"
                    name="date"
                    value={newInjury.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Severity*</label>
                  <select
                    name="severity"
                    value={newInjury.severity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status*</label>
                  <select
                    name="status"
                    value={newInjury.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="acute">Acute</option>
                    <option value="recovering">Recovering</option>
                    <option value="recovered">Recovered</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Notes*</label>
                <textarea
                  name="notes"
                  value={newInjury.notes}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Describe the injury, symptoms, and any immediate care taken"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInjury}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  disabled={!newInjury.type || !newInjury.date || !newInjury.notes}
                >
                  Submit Report
                </button>
              </div>
            </div>
          )}

          {healthData.injuries.length === 0 ? (
            <p className="text-gray-500 italic">No injuries recorded</p>
          ) : (
            <div className="space-y-3">
              {healthData.injuries.map(injury => (
                <CollapsibleItem
                  key={injury.id}
                  id={injury.id}
                  expanded={expandedItem === injury.id}
                  onToggle={toggleItemDetails}
                  headerContent={
                    <>
                      <div className="flex items-center">
                        <span className="font-medium">{injury.type}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${severityColor(injury.severity)}`}>
                          {injury.severity}
                        </span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${statusColor(injury.status)}`}>
                          {injury.status}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">
                          {formatDate(injury.date)} • {injury.prescribedBy}
                        </span>
                      </div>
                    </>
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date Occurred</h4>
                      <p>{formatDate(injury.date)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Reported By</h4>
                      <p>{injury.prescribedBy} on {formatDate(injury.prescribedOn)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Recovery Time</h4>
                      <p>{injury.recoveryTime || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <p className="capitalize">{injury.status}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                    <p className="whitespace-pre-line">{injury.notes}</p>
                  </div>
                  {injury.treatments && injury.treatments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Prescribed Treatments</h4>
                      <ul className="list-disc pl-5 mt-1">
                        {injury.treatments.map((treatment, index) => (
                          <li key={index}>{treatment}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CollapsibleItem>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'reports' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FiFileText className="mr-2 text-blue-500" /> Medical Reports
          </h3>
          
          {healthData.medicalReports.length === 0 ? (
            <p className="text-gray-500 italic">No medical reports available</p>
          ) : (
            <div className="space-y-4">
              {healthData.medicalReports.map(report => (
                <CollapsibleItem
                  key={report.id}
                  id={report.id}
                  expanded={expandedItem === report.id}
                  onToggle={toggleItemDetails}
                  headerContent={
                    <>
                      <h4 className="font-medium">{report.title}</h4>
                      <span className="text-sm text-gray-500">{formatDate(report.date)} • {report.from}</span>
                    </>
                  }
                >
                  <p className="mb-2">{report.summary}</p>
                  <p className="whitespace-pre-line text-gray-700">{report.details}</p>
                </CollapsibleItem>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'tips' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FiMessageSquare className="mr-2 text-green-500" /> Medical Tips
          </h3>
          {healthData.medicalTips.length === 0 ? (
            <p className="text-gray-500 italic">No medical tips available</p>
          ) : (
            <div className="space-y-3">
              {healthData.medicalTips.map(tip => (
                <CollapsibleItem
                  key={tip.id}
                  id={tip.id}
                  expanded={expandedItem === tip.id}
                  onToggle={toggleItemDetails}
                  headerContent={
                    <>
                      <span>{tip.tip}</span>
                      <span className={`ml-3 font-semibold ${priorityColor(tip.priority)}`}>
                        {tip.priority}
                      </span>
                    </>
                  }
                >
                  <div className="text-sm text-gray-600">
                    <p>From: {tip.from}</p>
                    <p>Date: {formatDate(tip.date)}</p>
                  </div>
                </CollapsibleItem>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyHealth;
