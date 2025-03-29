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

  const handleEventClick = (info) => {
    const event = info.event;
    alert(`Event: ${event.title}\nDate: ${event.startStr} to ${event.endStr || event.startStr}`);
    // show a modal, navigate to another page
  };

  return (
    <div className="mt-10">
      <div className="calendar-container">
        <h2 className="calendar-title text-2xl">Event Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick} // Add eventClick handler
          height="auto"
          contentHeight="auto"
        />
      </div>
    </div>

  );
};

export default EventCalendar;
