import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import "./filter.css";


const Filter = ({ onFilter, onReset }) => {
  const [formData, setFormData] = useState({
    searchQuery: "",
    location: "",
    eventType: [],
    field: [],
    startDate: null,
    endDate: null,
    format: [],
    tags: [],
  });
  // console.log(formData);


  const eventTypeOptions = [
    "Workshop", "Conference", "Seminar", "Webinar"
  ].map(type => ({ value: type, label: type }));


  const formatOptions = [
    "In-person", "Online", "Hybrid"
  ].map(format => ({ value: format, label: format }));



const scientificFieldOptions = [
  "Management", "Marketing", "Finance", "Accounting & Control",
  "Entrepreneurship", "Human Resources", "Information Systems",
  "Innovation & Technology Management", "Public Management",
  "International Management", "Supply Chain & Logistics"
].map(field => ({ value: field, label: field }));

const tagOptions = [
  "Networking", "Keynote", "Innovation", "Tech", "Business",
  "Health", "Education", "AI", "Research", "Leadership"
].map(tag => ({ value: tag, label: tag }));

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSelectChange = (selectedOption, { name }) => {
  setFormData(prev => ({ ...prev, [name]: selectedOption }));
};

const handleDateChange = (date, field) => {
  setFormData(prev => ({ ...prev, [field]: date }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  onFilter(formData);
};

const handleReset = () => {
  setFormData({
    searchQuery: "",
    location: "",
    eventType: [],
    field: [],
    startDate: null,
    endDate: null,
    format: [],
    tags: [],
  });
  onReset();
};

return (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
    <h1 className="text-2xl font-semibold ">
      Search for Events
    </h1>

    {/* Search Row */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full">
        <label htmlFor="searchQuery" className="block text-xs text-gray-500 mb-1">
          Search
        </label>
        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          placeholder="Event name or keywords"
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.searchQuery}
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

    {/* Filter Row */}
    <div className="flex flex-wrap gap-4">
      {/* Event Type */}
      <div className="flex-1 min-w-[120px]">
        <label htmlFor="eventType" className="block text-xs text-gray-500 mb-1">
          Event Type
        </label>
        <Select
          isMulti
          name="eventType"
          id="eventType"
          options={eventTypeOptions}
          value={formData.eventType}
          onChange={(selected) => handleSelectChange(selected || [], { name: "eventType" })}
          className="basic-multi-select"
          classNamePrefix="select"
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      {/* Scientific Field */}
      <div className="flex-1 min-w-[120px]">
        <label htmlFor="field" className="block text-xs text-gray-500 mb-1">
          Field
        </label>
        <Select
          isMulti
          name="field"
          id="field"
          options={scientificFieldOptions}
          value={formData.field}
          onChange={(selected) => handleSelectChange(selected, { name: "field" })}
          isClearable
          className="basic-single"
          classNamePrefix="select"
        />
      </div>
      {/* Format */}
      <div className="flex-1 min-w-[120px]">
        <label htmlFor="format" className="block text-xs text-gray-500 mb-1">
          Format
        </label>
        <Select
          isMulti
          name="format"
          id="format"
          options={formatOptions}
          value={formData.format}
          onChange={(selected) => handleSelectChange(selected || [], { name: "format" })}
          className="basic-multi-select"
          classNamePrefix="select"
          c
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
      </div>
      {/* Start Date */}
      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs text-gray-500 mb-1">
          Start Date
        </label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => handleDateChange(date, "startDate")}
          selectsStart
          startDate={formData.startDate}
          endDate={formData.endDate}
          placeholderText="Start date"
          className="w-full p-2 text-sm border border-gray-300 rounded-md"
        />
      </div>

      {/* End Date */}
      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs text-gray-500 mb-1">
          End Date
        </label>
        <DatePicker
          selected={formData.endDate}
          onChange={(date) => handleDateChange(date, "endDate")}
          selectsEnd
          startDate={formData.startDate}
          endDate={formData.endDate}
          minDate={formData.startDate}
          placeholderText="End date"
          className="w-full p-2 text-sm border border-gray-300 rounded-md"
        />
      </div>

      {/* Tags */}
      <div className="flex-1 min-w-[120px]">
        <label htmlFor="tags" className="block text-xs text-gray-500 mb-1">
          Tags
        </label>
        <CreatableSelect
          isMulti
          name="tags"
          id="tags"
          options={tagOptions}
          value={formData.tags}
          onChange={(selected) => handleSelectChange(selected || [], { name: "tags" })}
          className="basic-multi-select"
          classNamePrefix="select"
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-end gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-pointer"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white btn-grad rounded-md hover:cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  </form>
);
};

export default Filter;