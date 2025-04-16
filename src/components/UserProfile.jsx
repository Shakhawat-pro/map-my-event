import React from 'react';

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    profilePicture: "https://example.com/avatar.jpg",
    role: "user",
    mobileNumber: "+1234567890",
    address: "123 Main St, City",
    occupation: "Software Developer",
    favorites: []
  };

  return (
    <div className="space-y-4">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">User Profile</h2>
      </div>
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2">
          <p><strong className="font-medium">Name:</strong> {user.name}</p>
          <p><strong className="font-medium">Email:</strong> {user.email}</p>
          <p><strong className="font-medium">Role:</strong> {user.role}</p>
          <p><strong className="font-medium">Mobile:</strong> {user.mobileNumber}</p>
          <p><strong className="font-medium">Address:</strong> {user.address}</p>
          <p><strong className="font-medium">Occupation:</strong> {user.occupation}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;