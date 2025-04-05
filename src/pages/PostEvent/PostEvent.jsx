import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, MapPin, Users, Globe, Tag, Clock, BookOpen, GraduationCap } from 'lucide-react';

const postEvent = async (eventData) => {
  // In a real app, this would POST to your API
  console.log('Submitting event:', eventData);
  return { success: true, event: eventData };
};

const PostEvent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    detailDescription: '',
    eventType: 'Conference',
    scientificField: '',
    theme: '',
    targetAudience: [],
    format: 'Face-to-face',
    location: '',
    city: '',
    coordinates: { latitude: null, longitude: null },
    startDate: '',
    endDate: '',
    submissionDeadline: '',
    registrationDeadline: '',
    link: '',
    language: 'English',
    organizer: '',
    tags: [],
    isFeatured: false
  });

  const mutation = useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      navigate('/');
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(eventData);
  };

  const audienceOptions = [
    'Master\'s students',
    'PhD students',
    'Professionals/practitioners',
    'Researchers/academics'
  ];

  const formatOptions = [
    'Face-to-face',
    'Online',
    'Hybrid'
  ];

  const languageOptions = [
    'English',
    'French',
    'Spanish',
    'Bilingual'
  ];

  return (
    <div className="container max-w-[850px] mx-auto px-4 py-8">
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h1 className="text-3xl font-bold text-white">Post a New Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <BookOpen className="text-primary" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="form-control flex flex-col gap-1 ">
                  <label className="label ">
                    <span className="label-text">Event Title:</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
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
                    className="textarea textarea-bordered"
                    required
                  />
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
                    selected={eventData.startDate ? new Date(eventData.startDate) : null}
                    onChange={(date) => setEventData(prev => ({...prev, startDate: date}))}
                    className="input input-bordered w-full"
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">End Date:</span>
                  </label>
                  <DatePicker
                    selected={eventData.endDate ? new Date(eventData.endDate) : null}
                    onChange={(date) => setEventData(prev => ({...prev, endDate: date}))}
                    className="input input-bordered w-full"
                    dateFormat="MMMM d, yyyy"
                    minDate={eventData.startDate ? new Date(eventData.startDate) : null}
                    required
                  />
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Submission Deadline: </span>
                  </label>
                  <DatePicker
                    selected={eventData.submissionDeadline ? new Date(eventData.submissionDeadline) : null}
                    onChange={(date) => setEventData(prev => ({...prev, submissionDeadline: date}))}
                    className="input input-bordered w-full"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Registration Deadline</span>
                  </label>
                  <DatePicker
                    selected={eventData.registrationDeadline ? new Date(eventData.registrationDeadline) : null}
                    onChange={(date) => setEventData(prev => ({...prev, registrationDeadline: date}))}
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
                    className="select select-bordered"
                    required
                  >
                    {formatOptions.map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
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
                        className="input input-bordered"
                        required={eventData.format !== 'Online'}
                      />
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
                        className="input input-bordered"
                        required={eventData.format !== 'Online'}
                      />
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
                    type="url"
                    name="link"
                    value={eventData.link}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
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
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select a field</option>
                    <option value="Strategic management">Strategic management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Finance">Finance</option>
                  </select>
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
                    className="input input-bordered"
                    required
                  />
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
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">Tags</span>
                  </label>
                  <select
                    name="tags"
                    value={eventData.tags}
                    onChange={(e) => {
                      const options = [...e.target.selectedOptions];
                      const values = options.map(option => option.value);
                      setEventData(prev => ({...prev, tags: values}));
                    }}
                    multiple
                    className="select select-bordered h-auto"
                  >
                    <option value="Sustainability">Sustainability</option>
                    <option value="CSR">CSR</option>
                    <option value="Green Business">Green Business</option>
                    <option value="AI">AI</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Startups">Startups</option>
                    <option value="Venture Capital">Venture Capital</option>
                  </select>
                </div>

                {/* <div className="form-control flex flex-col gap-1">
                  <label className="label cursor-pointer gap-4">
                    <span className="label-text">Featured Event</span>
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={eventData.isFeatured}
                      onChange={handleChange}
                      className="toggle toggle-primary"
                    />
                  </label>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Submitting...' : 'Submit Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
