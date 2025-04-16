import React from 'react';
import UserProfile from '../../components/UserProfile';
import UserEvents from '../../components/UserEvents';

const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto p-5 ">
      <div className="md:col-span-1 bg-white p-5 rounded-lg shadow">
        <UserProfile />
      </div>
      <div className="md:col-span-2 bg-white p-5 rounded-lg shadow mt-10">
        <UserEvents />
      </div>
    </div>
  );
};

export default Profile;