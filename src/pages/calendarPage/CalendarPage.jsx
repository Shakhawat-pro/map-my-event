import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendar.css";
import axios from "axios";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/dummy.json");
        const formattedEvents = response.data.map(event => ({
          title: event.title,
          start: event.startDate,
          end: event.endDate || event.startDate,
          extendedProps: {
            description: event.description,
            location: event.location,
            statusBadge: event.statusBadge
          },
          backgroundColor: getEventColor(event.statusBadge),
          borderColor: getEventColor(event.statusBadge),
          textColor: '#ffffff'
        }));
        setEvents(formattedEvents);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventColor = (status) => {
    switch(status) {
      case 'New': return '#10B981'; // green-500
      case 'Upcoming': return '#3B82F6'; // blue-500
      case 'Closing Soon': return '#F59E0B'; // amber-500
      default: return '#6B7280'; // gray-500
    }
  };

  const handleEventClick = (info) => {
    setModal({
      visible: true,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
      location: info.event.extendedProps.location,
      statusBadge: info.event.extendedProps.statusBadge
    });
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading events...</div>;
  }

  return (
    <div className="mt-10">
      <div className="calendar-container">
        <h2 className="calendar-title text-2xl">Event Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height="auto"
          contentHeight="auto"
        />

        {/* Modal for event details */}
        {modal.visible && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000080] z-50 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-72 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">{modal.title}</h3>
              <div className="flex justify-center mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  modal.statusBadge === "Upcoming" 
                    ? "bg-blue-100 text-blue-800" 
                    : modal.statusBadge === "Closing Soon" 
                      ? "bg-amber-100 text-amber-800" 
                      : "bg-green-100 text-green-800"
                }`}>
                  {modal.statusBadge}
                </span>
              </div>
              <p className="mb-2">{`Start: ${modal.start.toLocaleDateString()}`}</p>
              {modal.end && <p className="mb-2">{`End: ${modal.end.toLocaleDateString()}`}</p>}
              <p className="mb-2">{`Location: ${modal.location}`}</p>
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
    </div>
  );
};

export default EventCalendar;