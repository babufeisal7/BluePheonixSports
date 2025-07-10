import React from "react";

const FinancialSettings = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold mb-1">Blue Phoenix Sports Limited</h2>
        <p className="text-gray-600 text-sm sm:text-base">Administrative Settings & Configuration</p>
      </div>

      {/* Financial Summary Card */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">💰 Financial Settings</h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Manage pricing, payments, and financial configurations
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-green-100 p-4 rounded">
            <div className="text-xl font-bold">UGX 478,000,000</div>
            <div className="text-sm text-green-800">Monthly Revenue</div>
          </div>
          <div className="bg-blue-100 p-4 rounded">
            <div className="text-xl font-bold">1,247</div>
            <div className="text-sm text-blue-800">Active Memberships</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <div className="text-xl font-bold">94.2%</div>
            <div className="text-sm text-yellow-800">Collection Rate</div>
          </div>
          <div className="bg-red-100 p-4 rounded">
            <div className="text-xl font-bold">UGX 57,200,000</div>
            <div className="text-sm text-red-800">Outstanding Dues</div>
          </div>
        </div>
      </div>

      {/* Membership Pricing */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4">📊 Membership Pricing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Currency", type: "text", defaultValue: "UGX (Ush)" },
            { label: "Monthly Membership", type: "number", defaultValue: "95000" },
            { label: "Quarterly Membership", type: "number", defaultValue: "265000" },
            { label: "Annual Membership", type: "number", defaultValue: "900000" },
            { label: "Tax Rate (%)", type: "number", defaultValue: "8.5" },
            { label: "Late Fee Rate (%)", type: "number", defaultValue: "5" },
          ].map((item, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{item.label}</label>
              <input
                type={item.type}
                defaultValue={item.defaultValue}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Discount Rates */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4">🎁 Discount Rates</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Student Discount (%)", defaultValue: "15" },
            { label: "Senior Discount (%)", defaultValue: "20" },
            { label: "Family Package Discount (%)", defaultValue: "25" },
          ].map((item, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">{item.label}</label>
              <input
                type="number"
                defaultValue={item.defaultValue}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4">💳 Payment Methods</h4>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm sm:text-base">
          <li><strong>Credit/Debit Cards:</strong> Accept Visa, MasterCard, American Express</li>
          <li><strong>PayPal:</strong> Accept PayPal payments</li>
          <li><strong>Bank Transfer:</strong> Direct bank transfers</li>
          <li><strong>Cash Payments:</strong> Accept cash at front desk</li>
          <li><strong>MTN Mobile Money:</strong> Pay via MTN Uganda mobile service</li>
          <li><strong>Airtel Money:</strong> Pay via Airtel Uganda mobile service</li>
        </ul>
      </div>

      {/* Billing Settings */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4">🧾 Billing Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Auto-Renewal</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Automatically renew memberships</option>
              <option>Manual renewal</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Default Billing Cycle</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Grace Period (Days)</label>
            <input
              type="number"
              defaultValue="7"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Invoice Template</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Standard Template</option>
              <option>Modern Template</option>
              <option>Classic Template</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mt-6">
        <button className="w-full sm:w-auto px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Save Financial Settings
        </button>
        <button className="w-full sm:w-auto px-5 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default FinancialSettings;
