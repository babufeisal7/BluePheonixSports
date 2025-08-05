import React, { useState, useRef } from 'react';
import { FaUserMd, FaClinicMedical, FaCertificate, FaCalendarAlt, FaPhone, FaEnvelope, FaEdit, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    specialty: 'Sports Medicine',
    licenseNumber: 'MD12345678',
    yearsExperience: 8,
    clinic: 'Elite Sports Clinic',
    phone: '(555) 123-4567',
    email: 's.johnson@elitesports.com',
    bio: 'Board-certified sports medicine specialist with extensive experience in athlete care and injury prevention.',
    certifications: ['ACSM Certified', 'FIMS Diploma'],
    availability: ['Mon-Wed: 9am-5pm', 'Thu-Fri: 10am-4pm']
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/pro11.jpg');
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleCertificationChange = (index, value) => {
    const updatedCerts = [...profile.certifications];
    updatedCerts[index] = value;
    setProfile(prev => ({ ...prev, certifications: updatedCerts }));
  };

  const addCertification = () => {
    setProfile(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const removeCertification = (index) => {
    const updatedCerts = profile.certifications.filter((_, i) => i !== index);
    setProfile(prev => ({ ...prev, certifications: updatedCerts }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (tempImage) {
      setProfileImage(tempImage);
      setTempImage(null);
    }
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaUserMd className="mr-3 text-blue-600" />
          Medic Profile
        </h1>
        <div className="ml-auto">
          {isEditing ? (
            <button
              onClick={saveProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaSave className="mr-2" /> Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={tempImage || profileImage}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                  >
                    <FaUpload />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              )}
            </div>
            
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="text-xl font-bold text-center mb-1 p-2 border rounded"
              />
            ) : (
              <h2 className="text-xl font-bold text-center mb-1">{profile.name}</h2>
            )}
            
            {isEditing ? (
              <input
                type="text"
                name="specialty"
                value={profile.specialty}
                onChange={handleInputChange}
                className="text-blue-600 text-center mb-4 p-2 border rounded"
              />
            ) : (
              <p className="text-blue-600 text-center mb-4">{profile.specialty}</p>
            )}

            <div className="w-full space-y-3">
              <div className="flex items-center">
                <FaClinicMedical className="text-gray-500 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    name="clinic"
                    value={profile.clinic}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded"
                  />
                ) : (
                  <span>{profile.clinic}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <FaCertificate className="text-gray-500 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    name="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded"
                  />
                ) : (
                  <span>License: {profile.licenseNumber}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                {isEditing ? (
                  <input
                    type="number"
                    name="yearsExperience"
                    value={profile.yearsExperience}
                    onChange={handleInputChange}
                    className="w-16 p-2 border rounded"
                  />
                ) : (
                  <span>{profile.yearsExperience} years experience</span>
                )}
              </div>
              
              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border rounded"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Professional Bio</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border rounded"
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Certifications</h3>
              {isEditing ? (
                <div className="space-y-2">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => handleCertificationChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded mr-2"
                      />
                      <button
                        onClick={() => removeCertification(index)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addCertification}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Add Certification
                  </button>
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {profile.certifications.map((cert, index) => (
                    <li key={index} className="text-gray-700">{cert}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Availability</h3>
              {isEditing ? (
                <div className="space-y-2">
                  {profile.availability.map((slot, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={slot}
                        onChange={(e) => {
                          const updatedAvailability = [...profile.availability];
                          updatedAvailability[index] = e.target.value;
                          setProfile(prev => ({ ...prev, availability: updatedAvailability }));
                        }}
                        className="flex-1 p-2 border rounded mr-2"
                      />
                      <button
                        onClick={() => {
                          const updatedAvailability = profile.availability.filter((_, i) => i !== index);
                          setProfile(prev => ({ ...prev, availability: updatedAvailability }));
                        }}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        availability: [...prev.availability, '']
                      }));
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Add Time Slot
                  </button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {profile.availability.map((slot, index) => (
                    <li key={index} className="text-gray-700 flex items-center">
                      <FaCalendarAlt className="text-gray-500 mr-2" />
                      {slot}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MedicProfile;