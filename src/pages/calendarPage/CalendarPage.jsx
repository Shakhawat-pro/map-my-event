import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calendar.css"; // Import custom styles

const EventCalendar = () => {
  const [events] = useState([
    { title: "Single-Day Event", date: "2025-04-05" },
    { title: "Multi-Day Event", start: "2025-04-10", end: "2025-04-13" }, // 3-day event
    { title: "Multi-Day Event", start: "2025-04-10", end: "2025-04-13" }, // 3-day event
    { title: "Another Event", date: "2025-04-15" },
  ]);

  const [modal, setModal] = useState({
    visible: false,
    title: "",
    start: "",
    end: "",
  });

  const handleEventClick = (info) => {
    const event = info.event;
    setModal({
      visible: true,
      title: event.title,
      start: event.startStr,
      end: event.endStr || event.startStr,
    });
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

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
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
              <h3 className="text-xl font-semibold mb-4">{modal.title}</h3>
              <p className="mb-2">{`Start Date: ${modal.start}`}</p>
              <p className="mb-4">{`End Date: ${modal.end}`}</p>
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
