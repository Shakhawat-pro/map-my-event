import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Map from "../../components/Map";
import LoadingModal from "../../components/LoadingModel";
import Loading from "../../components/loading";
import EventCard from "../../components/EventCard";
import Filter from "../../components/filter/Filter";

function MapPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/dummy.json"); // Using axios instead of fetch
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        alert(err.message)
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-2 sm:p-6 flex flex-col md:flex-row gap-10 w-full mx-auto">
      {/* Left Section - Event Listings */}
      <div className="w-full mx-auto md:w-9/12 bg-white md:p-4 rounded-lg">
        {/* Search Bar */}
        <Filter></Filter>
        <Loading isLoading={loading}></Loading>
        <div className="shadow-lg rounded-2xl overflow-hidden min-md:hidden mt-2">
        <Map events={events} selectedEvent={selectedEvent} />
        </div>
        {!loading && (
          <div>
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 my-3">
              Events <span className="text-textGray">({events.length} results)</span>
            </h2>
            {/* Event Listings */}
            <div className="space-y-7 md:h-[calc(900px-200px)] overflow-y-auto sb-color md:pr-3">
              {events.map((event, index) => (
                <EventCard key={index} event={event} setSelectedEvent={setSelectedEvent}  />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Static Map */}
      <div className="md:w-1/2 min-h-96 shadow-lg rounded-2xl overflow-hidden max-md::hidden">
        <Map events={events} selectedEvent={selectedEvent}></Map>
      </div>
    </div>
  );
}

export default MapPage;