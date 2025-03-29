import { useState } from "react";

function Filter() {
  const [formData, setFormData] = useState({
    event: "",
    location: "",
    eventType: "",
    field: "",
    startDate: "",
    endDate: "",
    format: "",
  });
  console.log(formData);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    // onFilterChange(updatedData);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-light">
        Search events in <span className="font-semibold">France</span>
      </h1>
      <div className="flex items-end justify-between gap-4">
        {/* Event */}
        <div className="w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="event" className="text-xs text-gray-500">Event</label>
            <input type="text" id="event" name="event" placeholder="Event"
              className="w-full p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={formData.event} onChange={handleChange} />
          </div>
        </div>
        {/* City */}
        <div className="w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="text-xs text-gray-500">Location</label>
            <input type="text" id="location" name="location" placeholder="City or venue"
              className="w-full p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={formData.location} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-end  justify-between gap-4 ">
        {/* Event Type */}
        <div className="flex flex-col gap-1 ">
          <label htmlFor="eventType" className="text-xs text-gray-500">Event Type</label>
          <select name="eventType" id="eventType" className=" p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.eventType} onChange={handleChange}>
            <option value="">All types</option>
            <option value="conference">Conference</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>
        {/* Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="field" className="text-xs text-gray-500">Field</label>
          <select name="field" id="field" className="w-32 p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.field} onChange={handleChange}>
            <option value="">All fields</option>
            <option value="management">Management</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        {/* date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="startDate" className="text-xs text-gray-500">Start Date</label>
          <input type="date" id="startDate" name="startDate"
            className="w-32 p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.startDate} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="endDate" className="text-xs text-gray-500">End Date</label>
          <input type="date" id="endDate" name="endDate"
            className="w-32 p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.endDate} onChange={handleChange} />
        </div>
        {/* Format */}
        <div className="flex flex-col gap-1">
          <label htmlFor="format" className="text-xs text-gray-500">Format</label>
          <select name="format" id="format"
            className="w-32 p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.format} onChange={handleChange}>
            <option value="">Any format</option>
            <option value="in-person">In-person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <button className="flex items-center justify-center w-10 h-10 p-2 btn-grad rounded-md  hover:scale-115 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Filter;