import React, { useEffect, useState } from "react";
import Map from "../../components/Map";
import LoadingModal from "../../components/LoadingModel";
import Loading from "../../components/loading";

import EventCard from "./EventCard";



function MapPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  console.log(error, events);



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/event.json"); // Adjust path if needed
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);




  return (
    <div className="bg-background min-h-screen p-6 flex h-screen gap-10">
      {/* Left Section - Event Listings */}
      <div className="w-9/12 bg-white p-4 rounded-lg shadow-lg">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search Events..."
            className="input input-bordered w-full"
          />
          <button className="btn bg-primary text-white">Search</button>
        </div>
        <Loading isLoading={loading}></Loading>
        {!loading &&
          <div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Events <span className="text-textGray">(242 results)</span>
            </h2>
            {/* Event Listings */}
            <div className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto sb-color p-1">
              <EventCard></EventCard>
              <EventCard></EventCard>
              <EventCard></EventCard>
              <EventCard></EventCard>
              <EventCard></EventCard>
              <EventCard></EventCard>
            </div>
          </div>
        }

      </div>

      {/* Right Section - Static Map */}
      <div className="w-1/2 shadow-lg rounded-2xl overflow-clip">
        <Map></Map>
      </div>
    </div>
  );
}

export default MapPage;
