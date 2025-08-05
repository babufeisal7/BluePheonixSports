import React, { useState } from 'react';
import { FaUserMd, FaFileMedical, FaCalendarAlt, FaUserInjured, FaPlus, FaPaperclip } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuickReport = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    patientImage: '/pro11.jpg',
    injuryType: '',
    severity: 'medium',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    treatmentPlan: '',
    followUpDate: '',
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = React.useRef(null);

  const patients = [
    { id: 'P001', name: 'John Doe', image: '/image9.jpg' },
    { id: 'P002', name: 'Sarah Smith', image: 'pro1.jpg' },
    { id: 'P003', name: 'Mike Johnson', image: '/photo9.jpg' }
  ];

  const injuries = [
    'Sprained Ankle',
    'ACL Tear',
    'Concussion',
    'Hamstring Strain',
    'Shoulder Dislocation',
    'Fracture',
    'Contusion'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update patient image when patient is selected
    if (name === 'patientId') {
      const selectedPatient = patients.find(p => p.id === value);
      if (selectedPatient) {
        setFormData(prev => ({
          ...prev,
          patientName: selectedPatient.name,
          patientImage: selectedPatient.image
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        name: file.name,
        type: file.type.includes('image') ? 'image' : 'document',
        file
      }));
      
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments]
      }));

      // Preview first image if available
      const imageFile = files.find(f => f.type.includes('image'));
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(imageFile);
      }
    }
  };

  const removeAttachment = (index) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments.splice(index, 1);
    setFormData(prev => ({ ...prev, attachments: updatedAttachments }));
    
    // Clear preview if removing the image
    if (index === 0 && formData.attachments[0]?.type === 'image') {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Medical report submitted successfully!');
      setIsSubmitting(false);
      // Reset form
      setFormData({
        patientId: '',
        patientName: '',
        patientImage: 'https://randomuser.me/api/portraits/lego/5.jpg',
        injuryType: '',
        severity: 'medium',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        treatmentPlan: '',
        followUpDate: '',
        attachments: []
      });
      setPreviewImage(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <FaFileMedical className="text-3xl text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-blue-900">Quick Medical Report</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaUserInjured className="mr-2 text-blue-500" />
                Patient Information
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={formData.patientImage}
                      alt="Patient"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    {previewImage && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-100 rounded-full p-1">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                          {formData.attachments.filter(a => a.type === 'image').length}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Patient Photo</span>
                </div>

                <div className="flex-1 grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                    <select
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>{patient.id} - {patient.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaUserMd className="mr-2 text-blue-500" />
                Medical Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Injury/Illness Type</label>
                  <select
                    name="injuryType"
                    value={formData.injuryType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select injury type</option>
                    {injuries.map((injury, index) => (
                      <option key={index} value={injury}>{injury}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Assessment</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="date"
                      name="followUpDate"
                      value={formData.followUpDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Treatment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter examination findings and observations..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan</label>
              <textarea
                name="treatmentPlan"
                value={formData.treatmentPlan}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter prescribed treatment and recommendations..."
              ></textarea>
            </div>

            {/* Attachments */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div className="flex items-center">
                          <FaPaperclip className="text-gray-500 mr-2" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No attachments added
                  </div>
                )}
                
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Add Files
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <IoMdSend className="mr-2" />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Image Preview</h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <img src={previewImage} alt="Preview" className="max-h-[70vh] mx-auto" />
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default QuickReport;