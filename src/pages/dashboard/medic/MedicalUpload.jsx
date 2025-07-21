import React, { useState, useRef } from 'react';
import { FaUpload, FaUser, FaFileMedical, FaSpinner, FaCheckCircle, FaCamera, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicalUpload = () => {
  const [formData, setFormData] = useState({
    playerName: '',
    playerImage: null,
    file: null,
    reportType: 'injury',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [playerImageUrl, setPlayerImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const playerImageInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlayerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, and GIF images are allowed for player photos');
        return;
      }

      // Validate image size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Player image must be less than 2MB');
        return;
      }

      setFormData(prev => ({ ...prev, playerImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => setPlayerImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only PDF, JPEG, and PNG files are allowed');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, file }));
      
      // Create preview for images
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.playerName || !formData.file) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(interval);
      setUploadProgress(100);
      
      toast.success('Medical report uploaded successfully!');
      
      // Reset form after successful upload
      setFormData({
        playerName: '',
        playerImage: null,
        file: null,
        reportType: 'injury',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      setPreviewUrl(null);
      setPlayerImageUrl(null);
    } catch (error) {
      toast.error('Failed to upload report. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const removePlayerImage = () => {
    setFormData(prev => ({ ...prev, playerImage: null }));
    setPlayerImageUrl(null);
    if (playerImageInputRef.current) {
      playerImageInputRef.current.value = '';
    }
  };

  const removeDocument = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaFileMedical className="mr-2 text-blue-600" />
          Upload Medical Reports
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          {/* Player Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {playerImageUrl ? (
                <>
                  <img 
                    src={playerImageUrl} 
                    alt="Player" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removePlayerImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTimes size={12} />
                  </button>
                </>
              ) : (
                <div 
                  className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
                  onClick={() => playerImageInputRef.current.click()}
                >
                  <FaCamera className="text-gray-500 text-3xl" />
                </div>
              )}
              <input
                type="file"
                ref={playerImageInputRef}
                className="hidden"
                accept="image/*"
                onChange={handlePlayerImageChange}
              />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Click to {playerImageUrl ? 'change' : 'upload'} player photo
            </p>
          </div>

          {/* Player Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUser className="mr-2" />
              Player Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="playerName"
              placeholder="Enter player name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.playerName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Report Type and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type <span className="text-red-500">*</span>
              </label>
              <select
                name="reportType"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.reportType}
                onChange={handleInputChange}
                required
              >
                <option value="injury">Injury Report</option>
                <option value="physical">Physical Exam</option>
                <option value="lab">Lab Results</option>
                <option value="imaging">Imaging (X-ray/MRI)</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Additional notes about the report"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUpload className="mr-2" />
              Medical Report <span className="text-red-500">*</span>
              <span className="ml-2 text-xs text-gray-500">(PDF, JPEG, PNG - Max 5MB)</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="mt-2 relative">
                    {formData.file.type.includes('image') ? (
                      <img src={previewUrl} alt="Preview" className="mx-auto h-32 object-contain" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded">
                        <FaFileMedical className="text-4xl text-blue-500" />
                        <p className="mt-2 text-sm">{formData.file.name}</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={removeDocument}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          className="sr-only"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                      </label>
                      <p className="mt-2">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, JPG, PNG up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isUploading && (
              <div className="w-full mr-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Uploading... {uploadProgress}%
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`flex items-center px-6 py-3 rounded-md text-white font-medium ${
              isUploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <FaUpload className="mr-2" />
                Upload Report
              </>
            )}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default MedicalUpload;