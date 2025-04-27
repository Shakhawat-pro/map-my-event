import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Calendar, MapPin, Users, Globe, Tag, Clock } from 'lucide-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

// Fix for default marker icons
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

const EventDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const language = i18n.language;  // To track current language


  const { data: event, isLoading, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/${id}`);
      return res.data.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkIfFavorite = useCallback(async () => {
    if (!currentUser?.email || !id) return;
    
    try {
      const response = await axiosPublic.get(`/users/${currentUser.email}/favorites`);
      const favorites = response.data.data || [];
      setIsFavorite(favorites.some(fav => fav._id === id));
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  }, [axiosPublic, currentUser?.email, id]);

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  const toggleFavorite = useCallback(async () => {
    if (!currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: t('event_details.login_required'),
        text: t('event_details.login_prompt'),
        confirmButtonText: "OK",
      });
      return;
    }

    setIsFavoriteLoading(true);
    try {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      if (newFavoriteState) {
        await axiosPublic.post(`/users/${currentUser.email}/favorites`, { eventId: id });
      } else {
        await axiosPublic.delete(`/users/${currentUser.email}/favorites`, { data: { eventId: id } });
      }

      Toast.fire({
        icon: "success",
        title: t(newFavoriteState ? 'event_details.added_to_favorites' : 'event_details.removed_from_favorites')
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsFavorite(!isFavorite);
      Toast.fire({
        icon: "error",
        title: t('event_details.update_failed')
      });
    } finally {
      setIsFavoriteLoading(false);
    }
  }, [isFavorite, currentUser?.email, id, axiosPublic, t]);

  if (isLoading) return <Loading isLoading={true} />;

  if (isError || !event) return <div className="text-center py-8 text-error">{t('event_details.load_error')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
        {/* Header with title and status */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <div className="flex justify-between items-center">
            <h1 className="min-[400px]:text-3xl font-bold text-white">{event?.title[language] || event?.title?.en}</h1>
            <span className="badge badge-lg badge-accent">
              {t(`event_details.status.${event?.statusBadge.toLowerCase().replace(' ', '_')}`)}
            </span>
          </div>
          <p className="text-white mt-2 max-[400px]:text-sm">{event?.description[language] || event?.description.en}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{t('event_details.details_title')}</h2>
            <p className="mb-6">{event?.detailDescription[language] || event?.detailDescription.en}</p>

            {/* Event metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" />
                <div>
                  <p className="font-medium">{t('event_details.date')}</p>
                  <p>{new Date(event?.startDate).toLocaleDateString()} - {new Date(event?.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="text-primary" />
                <div>
                  <p className="font-medium">{t('event_details.location')}</p>
                  <p>{event?.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="text-primary" />
                <div>
                  <p className="font-medium">{t('event_details.organizer')}</p>
                  <p>{event?.organizer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="text-primary" />
                <div>
                  <p className="font-medium">{t('event_details.language')}</p>
                  <p>{event?.language}</p>
                </div>
              </div>
            </div>

            {/* Map for physical events */}
            {event?.coordinates?.latitude && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{t('event_details.map_title')}</h3>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[event.coordinates.latitude, event.coordinates.longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[event.coordinates.latitude, event.coordinates.longitude]}>
                      <Popup>{event.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event?.tags?.map((tag, index) => (
                <span key={index} className="badge badge-outline border-black rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">{t('event_details.important_dates')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="text-primary" />
                    <div>
                      <p className="font-medium">{t('event_details.sub_theme_deadline')}</p>
                      <p>{new Date(event?.subThemeDeadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-primary" />
                    <div>
                      <p className="font-medium">{t('event_details.article_deadline')}</p>
                      <p>{new Date(event?.submissionDeadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {event?.registrationDeadline && (
                    <div className="flex items-center gap-2">
                      <Clock className="text-primary" />
                      <div>
                        <p className="font-medium">{t('event_details.registration_deadline')}</p>
                        <p>{new Date(event.registrationDeadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">{t('event_details.event_type')}</h3>
                <p>{event?.eventType}</p>
                <h3 className="card-title mt-4">{t('event_details.scientific_field')}</h3>
                <p>{event?.scientificField}</p>
                <h3 className="card-title mt-4">{t('event_details.theme')}</h3>
                <p>{event?.theme}</p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">{t('event_details.more_info')}</h3>
                <a href={event?.link} target="_blank" rel="noopener noreferrer" className="link link-primary block mb-4">
                  {t('event_details.visit_website')}
                </a>
                <button
                  className={`btn btn-primary w-full ${isFavoriteLoading ? 'loading-infinity' : ''}`}
                  onClick={toggleFavorite}
                  disabled={isFavoriteLoading}
                >
                  {isFavorite ? t('event_details.remove_favorite') : t('event_details.add_favorite')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;