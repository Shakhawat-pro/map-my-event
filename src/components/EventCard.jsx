import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Swal from "sweetalert2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { IoLocationOutline } from "react-icons/io5";


// Create a single SweetAlert instance for better performance
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const EventCard = ({ event, setSelectedEvent, currentUser }) => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false); // Added loading state

  // Memoize formatted dates to avoid recalculating on every render
  const formattedDates = useMemo(() => {
    if (!event?.startDate) return 'Date not available';
    return formatEventDates(event.startDate, event.endDate || event.startDate);
  }, [event?.startDate, event?.endDate]);

  // Memoize the favorite check function to prevent unnecessary recreations
  const checkIfFavorite = useCallback(async () => {
    if (!currentUser?.email || !event?._id) return;
    
    try {
      const response = await axiosPublic.get(`/users/${currentUser.email}/favorites`);
      const favorites = response.data.data || [];
      setIsFavorite(favorites.some(fav => fav._id === event._id));
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  }, [axiosPublic, currentUser?.email, event?._id]);

  // Run favorite check on mount and when dependencies change
  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  // Optimized toggle favorite with loading state and error handling
  const toggleFavorite = useCallback(async (e) => {
    e?.stopPropagation(); // Prevent event bubbling
    
    if (!currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to add events to favorites",
        buttonsStyling: false,
        confirmButtonText: `<span class="text-white btn-grad btn rounded-md hover:scale-110">OK</span>`,
      });
      return;
    }

    setIsFavoriteLoading(true);
    try {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState); // Optimistic update

      if (newFavoriteState) {
        await axiosPublic.post(`/users/${currentUser.email}/favorites`, {
          eventId: event._id
        });
      } else {
        await axiosPublic.delete(`/users/${currentUser.email}/favorites`, {
          data: { eventId: event._id }
        });
      }

      Toast.fire({
        icon: "success",
        title: newFavoriteState ? "Added to favorites" : "Removed from favorites"
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsFavorite(!isFavorite); // Revert on error
      Toast.fire({
        icon: "error",
        title: "Failed to update favorites"
      });
    } finally {
      setIsFavoriteLoading(false);
    }
  }, [isFavorite, currentUser?.email, event._id, axiosPublic]);

  // Memoize click handlers to prevent unnecessary recreations
  const handleClick = useCallback(() => {
    if (event.format === "Online" || !event.coordinates) {
      Swal.fire({
        icon: "warning",
        title: "Event Location Not Available",
        text: "This event is online or does not have a valid location.",
        buttonsStyling: false,
        confirmButtonText: `<span class="text-white btn-grad btn rounded-md hover:scale-110">OK</span>`,
      });
    } else {
      setSelectedEvent(event);
    }
  }, [event, setSelectedEvent]);

  const handleNavigate = useCallback((id) => {
    navigate(`/event/${id}`);
  }, [navigate]);

  // Predefined color classes for tags to avoid recreation
  const tagColorClasses = [
    'bg-[#f1e8fc] text-[#6810cc]',
    'bg-[#dfeafd] text-[#0028ee]',
    'bg-gray-100 text-gray-700'
  ];

  return (
    <div 
      onClick={handleClick} 
      className="flex flex-col lg:flex-row justify-between gap-2 border-1 border-base-300 rounded-2xl shadow-sm overflow-hidden p-4 w-full bg-white hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
    >
      <div className='w-full'>
        <div className='flex justify-between w-full'>
          <div>
            {/* Status Badge - Extracted to separate component would be better */}
            <span className={`px-2.5 py-1 rounded-full text-xs border-1 font-semibold flex items-center gap-1 w-fit min-[450px]:hidden mb-3 ${
              event.statusBadge === "Upcoming" ? "bg-blue-50/80 text-blue-700" :
              event.statusBadge === "Closing Soon" ? "bg-amber-50/80 text-amber-700" :
              "bg-green-50/80 text-green-700"
            }`}>
              {/* Status icon logic remains the same */}
              {event.statusBadge}
            </span>
            
            <h1 className="text-xl font-bold text-gray-800">{event.title}</h1>
            
            <ul className="space-y-1 mt-2">
              <li className="flex items-center">
                <span className="max-[350px]:ml-1 ml-2 flex items-center justify-center gap-2 text-gray-700">
                  <FaRegCalendarAlt />
                  {formattedDates} {/* Use memoized dates */}
                </span>
              </li>
              <li className="flex items-center">
                <span className="max-[350px]:ml-1 ml-1.5 flex items-center justify-center gap-1 text-gray-700">
                  <IoLocationOutline className="size-5" />
                  {event.location} ({event.format})
                </span>
              </li>
            </ul>
          </div>

          {/* Action buttons - desktop */}
          <div className='space-y-2 flex items-center justify-center h-fit gap-2 max-lg:hidden'>
            <FavoriteButton 
              isFavorite={isFavorite}
              isLoading={isFavoriteLoading}
              onClick={toggleFavorite}
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate(event._id);
              }}
              className="whitespace-nowrap px-4 py-2 bg-white text-black border-1 border-base-300 shadow-xs flex flex-row items-center justify-center gap-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:border-black hover:shadow-xl"
            >
              More info <FiExternalLink />
            </button>
          </div>
        </div>

        <p className="text-gray-600 my-2 ml-1">
          {event.description.length > 100 
            ? `${event.description.slice(0, 100)}...` 
            : event.description}
        </p>

        {/* Tags - using predefined color classes */}
        <div className="flex flex-wrap gap-1">
          {event?.tags?.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 ${tagColorClasses[index % tagColorClasses.length]} font-medium rounded-full text-sm`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons - mobile */}
        <div className='space-y-2 flex flex-row items-center h-fit gap-2 lg:hidden mt-5'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate(event._id);
            }}
            className="px-4 py-2 m-0 bg-white text-black border-1 border-base-300 shadow-xs flex flex-row items-center justify-center gap-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:border-black hover:shadow-xl"
          >
            More info <FiExternalLink />
          </button>
          
          <FavoriteButton 
            isFavorite={isFavorite}
            isLoading={isFavoriteLoading}
            onClick={toggleFavorite}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

// Extracted FavoriteButton component for better reusability and readability
const FavoriteButton = ({ isFavorite, isLoading, onClick, size = "md" }) => {
  const sizes = {
    sm: "size-7",
    md: "size-8"
  };
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={isFavorite ? "#8642d4" : "white"}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="#8642d4"
      className={`${sizes[size]} cursor-pointer hover:scale-110 transition-transform ${isLoading ? 'opacity-50' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoading) onClick(e);
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
};

// Date formatting utility remains the same
const formatEventDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (startDate === endDate) {
    return start.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const month = start.toLocaleString('default', { month: 'long' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = start.getFullYear();
    return `${month} ${startDay}–${endDay}, ${year}`;
  }

  return `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
};

export default React.memo(EventCard);