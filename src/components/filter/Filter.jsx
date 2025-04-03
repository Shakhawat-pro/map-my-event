import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Filter() {
  const [formData, setFormData] = useState({
    event: "",
    location: "",
    eventType: "",
    field: "",
    startDate: null,
    endDate: null,
    format: "",
  });

  console.log(formData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm ">
      <h1 className="text-2xl font-light">
        Search events in <span className="font-semibold">France</span>
      </h1>

      {/* Row 1: Event + Location */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full">
          <label htmlFor="event" className="block text-xs text-gray-500 mb-1">
            Event
          </label>
          <input
            type="text"
            id="event"
            name="event"
            placeholder="Event"
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.event}
            onChange={handleChange}
          />
        </div>

        <div className="w-full">
          <label htmlFor="location" className="block text-xs text-gray-500 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City or venue"
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2: Filters + Search Button */}
      <div className="flex flex-wrap gap-4">
        {/* Event Type */}
        <div className="flex-1 min-w-[120px]">
          <label htmlFor="eventType" className="block text-xs text-gray-500 mb-1">
            Event Type
          </label>
          <select
            name="eventType"
            id="eventType"
            className="select select-primary w-full p-2 text-sm border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.eventType}
            onChange={handleChange}
          >
            <option value="">All types</option>
            <option value="conference">Conference</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>

        {/* Field */}
        <div className="flex-1 min-w-[120px]">
          <label htmlFor="field" className="block text-xs text-gray-500 mb-1">
            Field
          </label>
          <select
            name="field"
            id="field"
            className="select select-primary w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.field}
            onChange={handleChange}
          >
            <option value="">All fields</option>
            <option value="management">Management</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs text-gray-500 mb-1">
            Start Date
          </label>
          <DatePicker
            withPortal
            selected={formData.startDate}
            onChange={(date) => handleDateChange(date, "startDate")}
            selectsStart
            startDate={formData.startDate}
            endDate={formData.endDate}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select start date"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* End Date */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs text-gray-500 mb-1">
            End Date
          </label>
          <DatePicker
            withPortal
            selected={formData.endDate}
            onChange={(date) => handleDateChange(date, "endDate")}
            selectsEnd
            startDate={formData.startDate}
            endDate={formData.endDate}
            minDate={formData.startDate}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select end date"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Format */}
        <div className="flex-1 min-w-[120px]">
          <label htmlFor="format" className="block text-xs text-gray-500 mb-1">
            Format
          </label>
          <select
            name="format"
            id="format"
            className="select select-primary w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.format}
            onChange={handleChange}
          >
            <option value="">Any format</option>
            <option value="in-person">In-person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
          aria-label="Search events"
            className="w-10 h-10 p-2 flex justify-center items-center btn-grad rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;