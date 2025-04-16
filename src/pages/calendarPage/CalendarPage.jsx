import { useContext, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendar.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EventCalendar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("calendar");
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    start: "",
    end: "",
    description: "",
    location: "",
    statusBadge: ""
  });

  // Fetch events using React Query
  const { data: events = [], isLoading, } = useQuery({
    queryKey: ['favoriteEvents', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const response = await axiosPublic.get(`/users/${user.email}/favorites`);
      return response?.data?.data?.map(event => ({
        _id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate || event.startDate,
        submissionDeadline: event.submissionDeadline,
        subThemeDeadline: event.subThemeDeadline,
        extendedProps: {
          description: event.description,
          location: event.location,
          statusBadge: event.statusBadge,
        },
        backgroundColor: getEventColor(event.statusBadge),
        borderColor: getEventColor(event.statusBadge),
        textColor: "#ffffff"
      })) || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!user?.email // Only fetch when user is available
  });


  const getEventColor = (status) => {
    switch (status) {
      case "New": return "#10B981";
      case "Upcoming": return "#3B82F6";
      case "Closing Soon": return "#F59E0B";
      default: return "#6B7280";
    }
  };

  const handleEventClick = (info) => {
    const { title, start, end, extendedProps } = info.event;
    setModal({
      visible: true,
      title,
      start,
      end,
      description: extendedProps.description,
      location: extendedProps.location,
      statusBadge: extendedProps.statusBadge
    });
  };

  const closeModal = () => setModal({ ...modal, visible: false });

  const viewEvent = (id) => {
    // console.log(`Viewing event ${id}`);
    navigate(`/event/${id}`)
    // TODO: Implement view functionality
};

  return (
    <div className="mt-10">
      <div className="">
        {/* Custom Tabs */}
        <div className="flex justify-center border-b max-w-xl mx-auto border-gray-200">
          <button
            className={`py-3 px-6 font-semibold text-lg focus:outline-none ${activeTab === "calendar"
              ? "text-purple-700 border-b-2 border-purple-700"
              : "text-gray-500 hover:text-purple-600"}`}
            onClick={() => setActiveTab("calendar")}
          >
            📅 Calendar
          </button>
          <button
            className={`py-3 px-6 font-semibold text-lg focus:outline-none ${activeTab === "favorites"
              ? "text-purple-700 border-b-2 border-purple-700"
              : "text-gray-500 hover:text-purple-600"}`}
            onClick={() => setActiveTab("favorites")}
          >
            ❤️ Favorites ({events.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-4 rounded-b-lg">
          {/* Calendar Tab */}
          {activeTab === "calendar" && (
            <div className="calendar-container">
              <h2 className="calendar-title text-2xl">Event Calendar</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">Loading events...</div>
              ) : (
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  eventClick={handleEventClick}
                  displayEventTime={false}
                  height="auto"
                />
              )}

              {modal.visible && (
                <div
                  className="fixed inset-0 bg-[#00000080] z-50 flex justify-center items-center"
                  onClick={closeModal}
                >
                  <div
                    className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-xl font-semibold mb-4">{modal.title}</h3>
                    <div className="flex justify-center mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${modal.statusBadge === "Upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : modal.statusBadge === "Closing Soon"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                        }`}>
                        {modal.statusBadge}
                      </span>
                    </div>
                    <p className="mb-2">Start: {modal.start.toLocaleDateString()}</p>
                    {modal.end && <p className="mb-2">End: {modal.end.toLocaleDateString()}</p>}
                    <p className="mb-2">Location: {modal.location}</p>
                    <p className="mb-4 text-sm text-gray-600">{modal.description}</p>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="overflow-x-auto rounded-lg max-w-7xl mx-auto shadow-xl">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-purple-500 to-purple-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Deadline</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status Badge</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {events.map((event, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{event.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.extendedProps?.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">{new Date(event.start).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            <div><span className="font-semibold">Sub-theme:</span> {event.subThemeDeadline ? new Date(event.subThemeDeadline).toLocaleDateString() : "N/A"}</div>
                            <div><span className="font-semibold">Article:</span> {event.submissionDeadline ? new Date(event.submissionDeadline).toLocaleDateString() : "N/A"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-3 py-1.5 rounded-md text-sm font-semibold ${event.extendedProps?.statusBadge === "New" ? "bg-blue-100 text-blue-800" :
                              event.extendedProps?.statusBadge === "Upcoming" ? "bg-yellow-100 text-yellow-800" :
                                event.extendedProps?.statusBadge === "Closing Soon" ? "bg-orange-100 text-orange-800" :
                                  event.extendedProps?.statusBadge === "Ended" ? "bg-red-100 text-red-800" : ""
                              }`}>
                              {event.extendedProps?.statusBadge}
                            </span>
                          </td>
                          <td className="flex items-center gap-2 h-full px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => viewEvent(event._id)}
                              className="p-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors hover:cursor-pointer"
                              title="View"
                            >
                              <FaEye />
                            </button>
                            <button
                              className="p-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors hover:cursor-pointer"
                              title="Delete"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;