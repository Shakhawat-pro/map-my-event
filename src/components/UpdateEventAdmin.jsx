import React, { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, MapPin, Users, Globe, Tag, Clock, BookOpen, GraduationCap } from 'lucide-react';
import Select from "react-select";
import Swal from 'sweetalert2';
import LocationMap from './LocationMap';
import { useTranslation } from 'react-i18next';

const tagOptions = [
  "Networking", "Keynote", "Innovation", "Tech", "Business",
  "Health", "Education", "AI", "Research", "Leadership"
].map(tag => ({ value: tag, label: tag }));

const UpdateEventAdmin = ({ event, onCancel, onSubmit }) => {
    const {i18n } = useTranslation();
  
  const language = i18n.language;  // To track current language

  const [eventData, setEventData] = useState({
    title: event?.title[language] || event?.title.en,
    description: event?.description[language] || '',
    detailDescription: event?.detailDescription[language] || '',
    eventType: event?.eventType || 'Conference',
    startDate: event?.startDate ? new Date(event.startDate) : null,
    endDate: event?.endDate ? new Date(event.endDate) : null,
    submissionDeadline: event?.submissionDeadline ? new Date(event.submissionDeadline) : null,
    subThemeDeadline: event?.subThemeDeadline ? new Date(event.subThemeDeadline) : null,
    registrationDeadline: event?.registrationDeadline ? new Date(event.registrationDeadline) : null,
    format: event?.format || 'Face-to-face',
    location: event?.location || '',
    city: event?.city || '',
    coordinates: event?.coordinates || { latitude: null, longitude: null },
    language: event?.language || 'English',
    link: event?.link || '',
    scientificField: event?.scientificField || '',
    theme: event?.theme || '',
    targetAudience: event?.targetAudience || [],
    organizer: event?.organizer || '',
    tags: event?.tags?.map(tag => ({ value: tag, label: tag })) || []
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audienceOptions = useMemo(() => [
    'Master\'s students',
    'PhD students',
    'Professionals/practitioners',
    'Researchers/academics'
  ], []);

  const formatOptions = useMemo(() => [
    'Face-to-face',
    'Online',
    'Hybrid'
  ], []);

  const languageOptions = useMemo(() => [
    'English',
    'French',
    'Spanish',
    'Bilingual'
  ], []);

  const scientificFieldOption = useMemo(() => [
    "Management",
    "Strategic Management",
    "Marketing",
    "Finance",
    "Accounting & Control",
    "Entrepreneurship",
    "Human Resources",
    "Organizational Theory",
    "Information Systems",
    "Innovation & Technology Management",
    "Public Management",
    "International Management",
    "Supply Chain & Logistics",
    "Corporate Social Responsibility (CSR)",
    "Sustainability & Environmental Management",
    "Health Management",
    "Education Management",
    "Tourism & Hospitality",
    "Digital Transformation",
    "Ethics & Governance",
    "Behavioral Sciences",
    "Economics of Organizations",
    "Family Business",
    "Business Law & Regulation"
  ], []);

  const validateForm = () => {
    const newErrors = {};

    if (!eventData.title.trim()) newErrors.title = 'Title is required';
    if (!eventData.description.trim()) newErrors.description = 'Description is required';
    if (!eventData.startDate) newErrors.startDate = 'Start date is required';
    if (!eventData.endDate) newErrors.endDate = 'End date is required';
    if (eventData.startDate && eventData.endDate && eventData.startDate > eventData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!eventData.format) newErrors.format = 'Format is required';
    if (!eventData.scientificField) newErrors.scientificField = 'Scientific field is required';
    if (!eventData.theme.trim()) newErrors.theme = 'Theme is required';
    if (!eventData.organizer.trim()) newErrors.organizer = 'Organizer is required';

    if (eventData.format !== 'Online') {
      if (!eventData.location.trim()) newErrors.location = 'Location is required';
      if (!eventData.city.trim()) newErrors.city = 'City is required';
      if (!eventData.coordinates.latitude || !eventData.coordinates.longitude) {
        newErrors.coordinates = 'Please select a location on the map';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'format' && value === 'Online') {
      setEventData(prev => ({
        ...prev,
        location: '',
        city: '',
        coordinates: { latitude: null, longitude: null }
      }));
    }
  };

  const handleArrayChange = (e) => {
    const { name, value, checked } = e.target;
    setEventData(prev => {
      const currentArray = prev[name] || [];
      return {
        ...prev,
        [name]: checked
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value)
      };
    });
  };

  const handleDateChange = (date, field) => {
    setEventData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const dataToSubmit = {
        ...eventData,
        startDate: eventData.startDate.toISOString(),
        endDate: eventData.endDate.toISOString(),
        submissionDeadline: eventData.submissionDeadline?.toISOString(),
        subThemeDeadline: eventData.subThemeDeadline?.toISOString(),
        registrationDeadline: eventData.registrationDeadline?.toISOString(),
        tags: eventData.tags.map(tag => tag.value),
        _id: event?._id
      };

      onSubmit(dataToSubmit);
    } catch (error) {
      setSubmitError(error.message || 'Failed to update event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-[850px] mx-auto px-4 py-8">
      {submitError && (
        <div className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <div className="bg-base-100 rounded-lg shadow-lg ">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h1 className="text-3xl font-bold text-white">Update Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <BookOpen className="text-primary" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Event Title:</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
                    required
                  />
                  {errors.title && <span className="text-error text-sm">{errors.title}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Event Type:</span>
                  </label>
                  <select
                    name="eventType"
                    value={eventData.eventType}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Summer/Winter School">Summer/Winter School</option>
                  </select>
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Short Description:</span>
                  </label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
                    required
                  />
                  {errors.description && <span className="text-error text-sm">{errors.description}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Detailed Description:</span>
                  </label>
                  <textarea
                    name="detailDescription"
                    value={eventData.detailDescription}
                    onChange={handleChange}
                    className="textarea textarea-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Calendar className="text-primary" />
                Dates
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Start Date:</span>
                  </label>
                  <DatePicker
                    selected={eventData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                  {errors.startDate && <span className="text-error text-sm">{errors.startDate}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">End Date:</span>
                  </label>
                  <DatePicker
                    selected={eventData.endDate}
                    onChange={(date) => handleDateChange(date, 'endDate')}
                    className={`input input-bordered w-full ${errors.endDate ? 'input-error' : ''}`}
                    dateFormat="MMMM d, yyyy"
                    minDate={eventData.startDate}
                    required
                  />
                  {errors.endDate && <span className="text-error text-sm">{errors.endDate}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Submission Deadline:</span>
                  </label>
                  <DatePicker
                    selected={eventData.submissionDeadline}
                    onChange={(date) => handleDateChange(date, 'submissionDeadline')}
                    className="input input-bordered w-full"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Sub-theme Deadline:</span>
                  </label>
                  <DatePicker
                    selected={eventData.subThemeDeadline}
                    onChange={(date) => handleDateChange(date, 'subThemeDeadline')}
                    className="input input-bordered w-full"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Registration Deadline:</span>
                  </label>
                  <DatePicker
                    selected={eventData.registrationDeadline}
                    onChange={(date) => handleDateChange(date, 'registrationDeadline')}
                    className="input input-bordered w-full"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <MapPin className="text-primary" />
                Location
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Format*</span>
                  </label>
                  <select
                    name="format"
                    value={eventData.format}
                    onChange={handleChange}
                    className={`select select-bordered ${errors.format ? 'select-error' : ''}`}
                    required
                  >
                    <option value="">Select a format</option>
                    {formatOptions.map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                  {errors.format && <span className="text-error text-sm">{errors.format}</span>}
                </div>

                {eventData.format !== 'Online' && (
                  <>
                    <div className="form-control flex flex-col gap-1">
                      <label className="label">
                        <span className="label-text">Location*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.location ? 'input-error' : ''}`}
                        required
                      />
                      {errors.location && <span className="text-error text-sm">{errors.location}</span>}
                    </div>

                    <div className="form-control flex flex-col gap-1">
                      <label className="label">
                        <span className="label-text">City*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={eventData.city}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.city ? 'input-error' : ''}`}
                        required
                      />
                      {errors.city && <span className="text-error text-sm">{errors.city}</span>}
                    </div>
                  </>
                )}

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Language*</span>
                  </label>
                  <select
                    name="language"
                    value={eventData.language}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    {languageOptions.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Event Website URL</span>
                  </label>
                  <input
                    type="string"
                    name="link"
                    value={eventData.link}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>

              {(eventData.format === 'Face-to-face' || eventData.format === 'Hybrid') && (
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Select Location on Map</span>
                  </label>
                  <LocationMap
                    onLocationSelect={({ lat, lng }) => {
                      setEventData(prev => ({
                        ...prev,
                        coordinates: { latitude: lat, longitude: lng }
                      }));
                    }}
                    position={eventData.coordinates.latitude ?
                      { lat: eventData.coordinates.latitude, lng: eventData.coordinates.longitude } :
                      null
                    }
                  />
                  {errors.coordinates && <span className="text-error text-sm">{errors.coordinates}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Academic Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <GraduationCap className="text-primary" />
                Academic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Scientific Field*</span>
                  </label>
                  <select
                    name="scientificField"
                    value={eventData.scientificField}
                    onChange={handleChange}
                    className={`select select-bordered ${errors.scientificField ? 'select-error' : ''}`}
                    required
                  >
                    <option value="">Select a field</option>
                    {scientificFieldOption.map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                  {errors.scientificField && <span className="text-error text-sm">{errors.scientificField}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Theme*</span>
                  </label>
                  <input
                    type="text"
                    name="theme"
                    value={eventData.theme}
                    onChange={handleChange}
                    className={`input input-bordered ${errors.theme ? 'input-error' : ''}`}
                    required
                  />
                  {errors.theme && <span className="text-error text-sm">{errors.theme}</span>}
                </div>

                <div className="form-control flex flex-col gap-1 col-span-1 md:col-span-2">
                  <label className="label">
                    <span className="label-text">Target Audience:</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {audienceOptions.map(audience => (
                      <label key={audience} className="label cursor-pointer gap-2">
                        <input
                          type="checkbox"
                          name="targetAudience"
                          value={audience}
                          checked={eventData.targetAudience.includes(audience)}
                          onChange={handleArrayChange}
                          className="checkbox checkbox-primary"
                        />
                        <span className="label-text">{audience}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Users className="text-primary" />
                Organizer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Organizer Name*</span>
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={eventData.organizer}
                    onChange={handleChange}
                    className={`input input-bordered ${errors.organizer ? 'input-error' : ''}`}
                    required
                  />
                  {errors.organizer && <span className="text-error text-sm">{errors.organizer}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tags</span>
                  </label>
                  <Select
                    isMulti
                    options={tagOptions}
                    value={eventData.tags}
                    onChange={(selectedOptions) =>
                      setEventData(prev => ({ ...prev, tags: selectedOptions }))
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventAdmin;