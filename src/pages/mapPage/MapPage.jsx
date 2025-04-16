import React, { useState, useEffect, useContext } from "react";
import Map from "../../components/Map";
import Loading from "../../components/loading";
import EventCard from "../../components/EventCard";
import Filter from "../../components/filter/Filter";
import useApprovedEvents from "../../hooks/useApprovedEvents";
import { AuthContext } from "../../context/AuthContext";

function MapPage() {
  const { user } = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, error, isLoading] = useApprovedEvents();
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const applyFilters = (filterData) => {
    const filtered = events.filter(event => {
      // Search query (title or description)
      if (filterData.searchQuery) {
        const searchLower = filterData.searchQuery.toLowerCase();
        if (!event.title.toLowerCase().includes(searchLower) &&
            !event.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Location
if (filterData.location) {
  const locationLower = filterData.location.toLowerCase();
  if (!(event.location?.toLowerCase()?.includes(locationLower) || event.city?.toLowerCase()?.includes(locationLower))) {
    return false;
  }
}


      // Event type
      if (filterData.eventType && event.eventType !== filterData.eventType) {
        return false;
      }

      // Scientific field
      if (filterData.field && event.scientificField !== filterData.field.value) {
        return false;
      }

      // Date range - convert all dates to Date objects and compare timestamps
      if (filterData.startDate) {
        const eventStart = new Date(event.startDate);
        const filterStart = new Date(filterData.startDate);
        if (eventStart.getTime() <= filterStart.getTime()) return false;
      }
      if (filterData.endDate) {
        const eventEnd = new Date(event.endDate || event.startDate);
        const filterEnd = new Date(filterData.endDate);
        if (eventEnd.getTime() >= filterEnd.getTime()) return false;
      }

      // Format
      if (filterData.format && event.format !== filterData.format) {
        return false;
      }

      // Tags
      if (filterData.tags.length > 0) {
        const selectedTags = filterData.tags.map(tag => tag.value);
        if (!selectedTags.some(tag => event.tags.includes(tag))) {
          return false;
        }
      }

      return true;
    });

    setFilteredEvents(filtered);
  };

  const resetFilters = () => {
    setFilteredEvents(events);
  };

  return (
    <div className="p-2 sm:p-6 flex flex-col md:flex-row gap-10 w-full mx-auto">
      {/* Left Section - Event Listings */}
      <div className="w-full mx-auto md:w-9/12 bg-white md:p-4 rounded-lg">
        <Filter onFilter={applyFilters} onReset={resetFilters} />
        
        {error && <p className="text-red-500 my-3">{error.message}</p>}

        <div className="shadow-lg rounded-2xl overflow-hidden min-md:hidden mt-2">
          <Map events={filteredEvents} selectedEvent={selectedEvent} />
        </div>

        <Loading isLoading={isLoading} />
        {!isLoading && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 my-3">
              Events <span className="text-textGray">({filteredEvents.length} results)</span>
            </h2>
            <div className="space-y-7 md:h-[calc(900px-200px)] overflow-y-auto sb-color md:pr-3">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event._id} 
                  event={event} 
                  currentUser={user}
                  setSelectedEvent={setSelectedEvent} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Static Map */}
      <div className="md:w-1/2 min-h-96 shadow-lg rounded-2xl overflow-hidden max-md:hidden">
        <Map events={filteredEvents} selectedEvent={selectedEvent} />
      </div>
    </div>
  );
}

export default MapPage;