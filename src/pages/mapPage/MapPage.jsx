import React, { useState, useContext, lazy, Suspense } from "react";
import Loading from "../../components/loading";
import EventCard from "../../components/EventCard";
import Filter from "../../components/filter/Filter";
import useApprovedEvents from "../../hooks/useApprovedEvents";
import { AuthContext } from "../../context/AuthContext";
import Pagination from "../../components/Pagination";
import SkeletonEventCard from "../../components/SkeletonEventCard";
import useFavoritesId from "../../hooks/useFavoritesId";
import { useTranslation } from "react-i18next";

const Map = lazy(() => import("../../components/Map"));

function MapPage() {
    const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 10;

  console.log(filters);


  const { events, pagination, error, isLoading } = useApprovedEvents(filters, page, limit);
  const { favoritesId, favoritesId_refetch } = useFavoritesId(user?.email);

  const applyFilters = (filterData) => {
    const backendFilters = {
      searchQuery: filterData.searchQuery,
      location: filterData.location,
      eventType: filterData.eventType.map(event => event.value),
      field: filterData.field?.map(field => field.value),
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      format: filterData.format.map(format => format.value),
      tags: filterData.tags.map(tag => tag.value)
    };

    setFilters(backendFilters);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="p-2 sm:p-6 flex flex-col md:flex-row gap-10 w-full mx-auto">
      {/* Left Section */}
      <div className="w-full mx-auto md:w-9/12 bg-white md:p-4 rounded-lg">
        <Filter onFilter={applyFilters} onReset={resetFilters} />

        {error && <p className="text-red-500 my-3">{error.message}</p>}
        {/* Mobile */}
        <div className="sticky top-0 z-10 shadow-lg h-64 rounded-2xl overflow-hidden min-md:hidden mt-2">
          <Suspense fallback={<div className=" bg-gray-200 animate-pulse" />}>
            <Map selectedEvent={selectedEvent} />
          </Suspense>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 my-3">
          {t("common.event")} <span className="text-textGray">({pagination.total || 0} results)</span>
        </h2>

        <div className="space-y-7 md:h-[calc(900px-200px)] overflow-y-auto sb-color md:pr-3">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonEventCard key={i} />)
            : events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                currentUser={user}
                setSelectedEvent={setSelectedEvent}
                favoritesId={favoritesId}
                favoritesId_refetch={favoritesId_refetch}

              />
            ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Right Map Section */}
      <div className="md:w-1/2 min-h-96 shadow-lg rounded-2xl overflow-hidden max-md:hidden">
        <Suspense fallback={<div className="h-full w-full bg-gray-200 animate-pulse" />}>
          <Map selectedEvent={selectedEvent} />
        </Suspense>
      </div>
    </div>
  );
}

export default MapPage;
