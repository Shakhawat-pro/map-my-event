import React, { useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, MapPin, Users, Globe, Tag, Clock, BookOpen, GraduationCap } from 'lucide-react';
import LocationMap from '../../components/LocationMap';
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const tagOptions = [
  "Networking", "Keynote", "Innovation", "Tech", "Business",
  "Health", "Education", "AI", "Research", "Leadership"
].map(tag => ({ value: tag, label: tag }));

const PostEvent = () => {
  const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
  
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    detailDescription: '',
    eventType: 'Conference',
    scientificField: '',
    theme: '',
    targetAudience: [],
    format: '',
    location: '',
    city: '',
    coordinates: { latitude: null, longitude: null },
    startDate: null,
    endDate: null,
    submissionDeadline: null,
    subThemeDeadline: null,
    registrationDeadline: null,
    link: '',
    language: 'English',
    organizer: '',
    tags: [],
    submittedBy: user?.email
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

    if (!eventData.title.trim()) newErrors.title = t('postEvent.validation.required');
    if (!eventData.description.trim()) newErrors.description = t('postEvent.validation.required');
    if (!eventData.startDate) newErrors.startDate = t('postEvent.validation.required');
    if (!eventData.endDate) newErrors.endDate = t('postEvent.validation.required');
    if (eventData.startDate && eventData.endDate && eventData.startDate > eventData.endDate) {
      newErrors.endDate = t('postEvent.validation.endDateAfterStart');
    }
    if (!eventData.format) newErrors.format = t('postEvent.validation.required');
    if (!eventData.scientificField) newErrors.scientificField = t('postEvent.validation.required');
    if (!eventData.theme.trim()) newErrors.theme = t('postEvent.validation.required');
    if (!eventData.organizer.trim()) newErrors.organizer = t('postEvent.validation.required');

    if (eventData.format !== 'Online') {
      if (!eventData.location.trim()) newErrors.location = t('postEvent.validation.required');
      if (!eventData.city.trim()) newErrors.city = t('postEvent.validation.required');
      if (!eventData.coordinates.latitude || !eventData.coordinates.longitude) {
        newErrors.coordinates = t('postEvent.validation.selectLocation');
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
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...eventData,
        tags: Array.isArray(eventData.tags)
          ? eventData.tags.map(tag => tag?.value || tag)
          : [],
        startDate: eventData.startDate?.toISOString(),
        endDate: eventData.endDate?.toISOString(),
        submissionDeadline: eventData.submissionDeadline?.toISOString(),
        registrationDeadline: eventData.registrationDeadline?.toISOString(),
        coordinates: eventData.format !== 'Online' ? eventData.coordinates : null
      };

      await axiosPublic.post('/events/', payload);
      await Swal.fire({
        title: t('postEvent.success.title'),
        text: t('postEvent.success.message'),
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting event:', error);
      const errorMsg = error.response?.data?.message || error.message || t('postEvent.error.message');
      setSubmitError(errorMsg);
      await Swal.fire({
        title: t('postEvent.error.title'),
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'OK'
      });
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

      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h1 className="text-3xl font-bold text-white">{t('postEvent.title')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <BookOpen className="text-primary" />
                {t('postEvent.basicInfo')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.eventTitle')}:</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
                    required
                  />
                  {errors.title && <span className="text-error text-sm">{t('postEvent.eventTitle')} {errors.title}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.eventType')}:</span>
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
                    <span className="label-text">{t('postEvent.shortDescription')}:</span>
                  </label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
                    required
                  />
                  {errors.description && <span className="text-error text-sm">{t('postEvent.shortDescription')} {errors.description}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.detailedDescription')}:</span>
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
                {t('postEvent.dates')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.startDate')}:</span>
                  </label>
                  <DatePicker
                    selected={eventData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                  {errors.startDate && <span className="text-error text-sm">{t('postEvent.startDate')} {errors.startDate}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.endDate')}:</span>
                  </label>
                  <DatePicker
                    selected={eventData.endDate}
                    onChange={(date) => handleDateChange(date, 'endDate')}
                    className={`input input-bordered w-full ${errors.endDate ? 'input-error' : ''}`}
                    dateFormat="MMMM d, yyyy"
                    minDate={eventData.startDate}
                    required
                  />
                  {errors.endDate && <span className="text-error text-sm">{t('postEvent.endDate')} {errors.endDate}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.submissionDeadline')}:</span>
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
                    <span className="label-text">{t('postEvent.subThemeDeadline')}:</span>
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
                    <span className="label-text">{t('postEvent.registrationDeadline')}:</span>
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
                {t('postEvent.location')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.format')}*</span>
                  </label>
                  <select
                    name="format"
                    value={eventData.format}
                    onChange={handleChange}
                    className={`select select-bordered ${errors.format ? 'select-error' : ''}`}
                    required
                  >
                    <option value="">{t('postEvent.selectFormat')}</option>
                    {formatOptions.map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                  {errors.format && <span className="text-error text-sm">{t('postEvent.format')} {errors.format}</span>}
                </div>

                {eventData.format !== 'Online' && (
                  <>
                    <div className="form-control flex flex-col gap-1">
                      <label className="label">
                        <span className="label-text">{t('postEvent.locationPlaceholder')}*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.location ? 'input-error' : ''}`}
                        required
                      />
                      {errors.location && <span className="text-error text-sm">{t('postEvent.locationPlaceholder')} {errors.location}</span>}
                    </div>

                    <div className="form-control flex flex-col gap-1">
                      <label className="label">
                        <span className="label-text">{t('postEvent.city')}*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={eventData.city}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.city ? 'input-error' : ''}`}
                        required
                      />
                      {errors.city && <span className="text-error text-sm">{t('postEvent.city')} {errors.city}</span>}
                    </div>
                  </>
                )}

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.language')}*</span>
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
                    <span className="label-text">{t('postEvent.eventWebsite')}</span>
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
                    <span className="label-text">{t('postEvent.selectLocation')}</span>
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
                {t('postEvent.academicInfo')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.scientificField')}*</span>
                  </label>
                  <select
                    name="scientificField"
                    value={eventData.scientificField}
                    onChange={handleChange}
                    className={`select select-bordered ${errors.scientificField ? 'select-error' : ''}`}
                    required
                  >
                    <option value="">{t('postEvent.selectField')}</option>
                    {scientificFieldOption.map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                  {errors.scientificField && <span className="text-error text-sm">{t('postEvent.scientificField')} {errors.scientificField}</span>}
                </div>

                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.theme')}*</span>
                  </label>
                  <input
                    type="text"
                    name="theme"
                    value={eventData.theme}
                    onChange={handleChange}
                    className={`input input-bordered ${errors.theme ? 'input-error' : ''}`}
                    required
                  />
                  {errors.theme && <span className="text-error text-sm">{t('postEvent.theme')} {errors.theme}</span>}
                </div>

                <div className="form-control flex flex-col gap-1 col-span-1 md:col-span-2">
                  <label className="label">
                    <span className="label-text">{t('postEvent.targetAudience')}:</span>
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
                {t('postEvent.organizerInfo')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control flex flex-col gap-1">
                  <label className="label">
                    <span className="label-text">{t('postEvent.organizerName')}*</span>
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={eventData.organizer}
                    onChange={handleChange}
                    className={`input input-bordered ${errors.organizer ? 'input-error' : ''}`}
                    required
                  />
                  {errors.organizer && <span className="text-error text-sm">{t('postEvent.organizerName')} {errors.organizer}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{t('postEvent.tags')}</span>
                  </label>
                  <CreatableSelect
                    isMulti
                    options={tagOptions}
                    value={eventData.tags}
                    onChange={(selectedOptions) =>
                      setEventData(prev => ({ ...prev, tags: selectedOptions }))
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                    formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                    onCreateOption={(inputValue) => {
                      const newOption = { value: inputValue, label: inputValue };
                      setEventData(prev => ({
                        ...prev,
                        tags: [...prev.tags, newOption]
                      }));
                    }}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-ghost"
            >
              {t('postEvent.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  {t('postEvent.submitting')}
                </>
              ) : t('postEvent.submitEvent')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;