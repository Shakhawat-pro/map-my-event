import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Calendar, MapPin, Users, Globe, Tag, Clock } from 'lucide-react';

// Fix for default marker icons
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

const EventDetails = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();

  const { data: event, isLoading, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/${id}`);
      return res.data.data;
    },
  });
  // console.log(event);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) return <Loading isLoading={true} />;

  if (isError || !event) return <div className="text-center py-8 text-error">Error loading event</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
        {/* Header with title and status */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">{event?.title}</h1>
            <span className="badge badge-lg badge-accent">{event?.statusBadge}</span>
          </div>
          <p className="text-white mt-2">{event?.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <p className="mb-6">{event?.detailDescription}</p>

            {/* Event metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" />
                <div>
                  <p className="font-medium">Date</p>
                  <p>{new Date(event?.startDate).toLocaleDateString()} - {new Date(event?.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>{event?.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="text-primary" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p>{event?.organizer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="text-primary" />
                <div>
                  <p className="font-medium">Language</p>
                  <p>{event?.language}</p>
                </div>
              </div>
            </div>

            {/* Map for physical events */}
            {event?.coordinates?.latitude && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Location Map</h3>
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
                <span key={index} className="badge badge-outline">{tag}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Submission</h3>
                <p className="flex items-center gap-2">
                  <Clock className="text-primary" />
                  Deadline: {new Date(event?.submissionDeadline).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">Register Now</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Event Type</h3>
                <p>{event?.eventType}</p>
                <h3 className="card-title mt-4">Scientific Field</h3>
                <p>{event?.scientificField}</p>
                <h3 className="card-title mt-4">Theme</h3>
                <p>{event?.theme}</p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">More Information</h3>
                <a href={event?.link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                  Visit Event Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
