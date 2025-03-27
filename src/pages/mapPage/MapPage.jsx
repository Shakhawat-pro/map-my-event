import React, { useEffect, useState } from "react";
import Map from "../../components/Map";
import LoadingModal from "../../components/LoadingModel";
import Loading from "../../components/loading";

import EventCard from "../../components/EventCard";
import Filter from "../../components/filter/Filter";



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
    <div className="p-6 flex flex-col md:flex-row   gap-10 w-full mx-auto">
      {/* Left Section - Event Listings */}
      <div className="w-full mx-auto md:w-9/12 bg-white md:p-4 rounded-lg  ">
        {/* Search Bar */}
        <Filter></Filter>
        <Loading isLoading={loading}></Loading>
        {!loading &&
          <div>
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 my-3">
              Events <span className="text-textGray">(242 results)</span>
            </h2>
            {/* Event Listings */}
            <div className="space-y-4 md:h-[calc(900px-200px)] overflow-y-auto sb-color p-1">
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
      <div className="md:w-1/2 min-h-96 shadow-lg rounded-2xl overflow-hidden ">
        <Map></Map>
      </div>
    </div>
  );
}

export default MapPage;
