import React from "react";

const MyProfile = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
      <div className="space-y-4 text-gray-700">
        <p>Welcome to your profile page. Here you can view and edit your personal details.</p>
        {/* Example profile details */}
        <div>
          <h3 className="font-semibold">Name</h3>
          <p>John Doe</p>
        </div>
        <div>
          <h3 className="font-semibold">Email</h3>
          <p>john.doe@example.com</p>
        </div>
        <div>
          <h3 className="font-semibold">Role</h3>
          <p>Coach</p>
        </div>
        {/* Add more fields or editable inputs here */}
      </div>
    </div>
  );
};

export default MyProfile;
