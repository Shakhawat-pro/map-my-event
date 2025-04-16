import React from 'react';

const UserEvents = () => {
  const events = [
    {
      _id: "1",
      title: "Tech Conference 2023",
      date: "2023-10-15",
      location: "Virtual",
      description: "Annual technology conference",
      category: "Technology"
    },
    {
      _id: "2",
      title: "Developer Meetup",
      date: "2023-11-20",
      location: "Conference Center",
      description: "Monthly developer gathering",
      category: "Networking"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-4">Submitted Events ({events.length})</h2>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event._id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <p><strong className="font-medium">Date:</strong> {event.date}</p>
              <p><strong className="font-medium">Location:</strong> {event.location}</p>
              <p><strong className="font-medium">Category:</strong> {event.category}</p>
            </div>
            <p className="mt-2 text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEvents;