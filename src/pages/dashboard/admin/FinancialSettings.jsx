import React, { useState } from "react";
import { 
  FiSave, 
  FiDownload, 
  FiDollarSign, 
  FiUsers, 
  FiPercent, 
  FiAlertCircle,
  FiCreditCard,
  FiPieChart,
  FiTag,
  FiFileText,
  FiChevronRight,
  FiUpload,
  FiX,
  FiCheck
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FinancialSettings = () => {
  const [settings, setSettings] = useState({
    currency: "UGX (Ush)",
    monthlyMembership: 95000,
    quarterlyMembership: 265000,
    annualMembership: 900000,
    taxRate: 8.5,
    lateFeeRate: 5,
    studentDiscount: 15,
    seniorDiscount: 20,
    familyDiscount: 25,
    autoRenewal: "Automatically renew memberships",
    billingCycle: "Monthly",
    gracePeriod: 7,
    invoiceTemplate: "Standard Template"
  });

  const [activeTab, setActiveTab] = useState("pricing");
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name.includes('Discount') || name.includes('Rate') ? parseFloat(value) : value
    }));
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showNotification('Settings saved successfully!');
    }, 1500);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'blue-phoenix-financial-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Report exported successfully!');
  };

  const statCards = [
    { 
      title: "Monthly Revenue", 
      value: "UGX 478,000,000", 
      icon: <FiDollarSign />,
      color: "from-emerald-500 to-teal-400",
      trend: "up"
    },
    { 
      title: "Active Memberships", 
      value: "1,247", 
      icon: <FiUsers />,
      color: "from-blue-500 to-cyan-400",
      trend: "up"
    },
    { 
      title: "Collection Rate", 
      value: "94.2%", 
      icon: <FiPercent />,
      color: "from-amber-500 to-yellow-400",
      trend: "steady"
    },
    { 
      title: "Outstanding Dues", 
      value: "UGX 57,200,000", 
      icon: <FiAlertCircle />,
      color: "from-rose-500 to-pink-400",
      trend: "down"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Settings</h1>
          <p className="text-gray-500 mt-1">Configure your organization's financial parameters</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <FiDownload className="mr-2" />
            Export
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded-lg text-white flex items-center transition-colors ${
              isSaving ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <FiSave className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center ${
              notification.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}
          >
            <FiCheck className="mr-2" />
            {notification.message}
            <button 
              onClick={() => setNotification(null)}
              className="ml-4"
            >
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-r ${card.color} text-white p-5 rounded-xl shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-90">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="inline-block mr-2">
                {card.trend === 'up' ? '↑' : card.trend === 'down' ? '↓' : '→'}
              </span>
              <span>Last 30 days</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pricing', name: 'Pricing', icon: <FiTag /> },
            { id: 'payments', name: 'Payments', icon: <FiCreditCard /> },
            { id: 'billing', name: 'Billing', icon: <FiFileText /> },
            { id: 'reports', name: 'Reports', icon: <FiPieChart /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiTag className="mr-2 text-emerald-500" />
              Membership Pricing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { label: "Currency", name: "currency", type: "text", value: settings.currency },
                { label: "Monthly Membership (UGX)", name: "monthlyMembership", type: "number", value: settings.monthlyMembership },
                { label: "Quarterly Membership (UGX)", name: "quarterlyMembership", type: "number", value: settings.quarterlyMembership },
                { label: "Annual Membership (UGX)", name: "annualMembership", type: "number", value: settings.annualMembership },
                { label: "Tax Rate (%)", name: "taxRate", type: "number", value: settings.taxRate, step: "0.1" },
                { label: "Late Fee Rate (%)", name: "lateFeeRate", type: "number", value: settings.lateFeeRate, step: "0.1" },
              ].map((item, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <input
                    name={item.name}
                    type={item.type}
                    value={item.value}
                    onChange={handleChange}
                    step={item.step}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              ))}
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <FiPercent className="mr-2 text-emerald-500" />
                Discount Rates
              </span>
              <button className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center">
                Add new discount <FiChevronRight className="ml-1" />
              </button>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Student Discount (%)", name: "studentDiscount", value: settings.studentDiscount },
                { label: "Senior Discount (%)", name: "seniorDiscount", value: settings.seniorDiscount },
                { label: "Family Package Discount (%)", name: "familyDiscount", value: settings.familyDiscount },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <input
                    name={item.name}
                    type="number"
                    value={item.value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiCreditCard className="mr-2 text-emerald-500" />
              Payment Methods
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Enabled Payment Methods</h3>
                <ul className="space-y-3">
                  {[
                    { method: "Credit/Debit Cards", enabled: true },
                    { method: "PayPal", enabled: true },
                    { method: "Bank Transfer", enabled: true },
                    { method: "Cash Payments", enabled: true },
                    { method: "MTN Mobile Money", enabled: true },
                    { method: "Airtel Money", enabled: false },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`method-${index}`}
                          checked={item.enabled}
                          className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                        />
                        <label htmlFor={`method-${index}`} className="ml-3 text-gray-700">
                          {item.method}
                        </label>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiChevronRight />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Processing</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Processor</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition">
                      <option>Stripe</option>
                      <option>PayPal</option>
                      <option>Flutterwave</option>
                      <option>Manual Processing</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Fee (%)</label>
                      <input
                        type="number"
                        defaultValue="2.9"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Fee (UGX)</label>
                      <input
                        type="number"
                        defaultValue="500"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Instructions</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      rows="3"
                      placeholder="Add any special payment instructions for members..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiFileText className="mr-2 text-emerald-500" />
              Billing Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Renewal</label>
                <select
                  name="autoRenewal"
                  value={settings.autoRenewal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                >
                  <option>Automatically renew memberships</option>
                  <option>Manual renewal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Billing Cycle</label>
                <select
                  name="billingCycle"
                  value={settings.billingCycle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                >
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Annually</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grace Period (Days)</label>
                <input
                  name="gracePeriod"
                  type="number"
                  value={settings.gracePeriod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Template</label>
                <select
                  name="invoiceTemplate"
                  value={settings.invoiceTemplate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                >
                  <option>Standard Template</option>
                  <option>Modern Template</option>
                  <option>Classic Template</option>
                </select>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <FiUpload className="mr-2 text-emerald-500" />
              Invoice Branding
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-gray-400 text-sm">Logo preview</span>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center">
                      <FiUpload className="mr-2" />
                      Upload New
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Recommended size: 200x200px</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Footer</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  rows="3"
                  placeholder="Thank you for your business!"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">This will appear at the bottom of all invoices</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiPieChart className="mr-2 text-emerald-500" />
              Financial Reports
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { 
                  title: "Revenue Report", 
                  description: "Monthly revenue breakdown",
                  icon: <FiDollarSign className="text-emerald-500" />
                },
                { 
                  title: "Membership Analytics", 
                  description: "Signups, renewals, churn",
                  icon: <FiUsers className="text-blue-500" />
                },
                { 
                  title: "Outstanding Payments", 
                  description: "List of unpaid invoices",
                  icon: <FiAlertCircle className="text-amber-500" />
                },
              ].map((report, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -2 }}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{report.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {report.icon}
                    </div>
                  </div>
                  <button className="mt-4 text-sm text-emerald-600 hover:text-emerald-800 flex items-center">
                    Generate report <FiChevronRight className="ml-1" />
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Custom Report Generator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition">
                    <option>Revenue Summary</option>
                    <option>Membership Status</option>
                    <option>Payment History</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" 
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center">
                  <FiPieChart className="mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FinancialSettings;