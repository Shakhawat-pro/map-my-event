import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import ResizeMap from '../utils/ResizeMap';
import useEventCoordinates from '../hooks/useEventCoordinates';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useTranslation } from 'react-i18next';

// Default marker icon setup
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Add search control to map
const AddSearchControl = ({ onAddressSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 10,
      showMarker: true,
      showPopup: false,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      if (result?.location) {
        const { x: lng, y: lat } = result.location;
        onAddressSelect({ lat, lng });
      }
    });

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, [map, onAddressSelect]);

  return null;
};

// Update map view when event is selected
const MapUpdater = ({ selectedEvent }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedEvent && selectedEvent.coordinates) {
      const { latitude, longitude } = selectedEvent.coordinates;
      map.flyTo([latitude, longitude], 10, { animate: true });
    }
  }, [selectedEvent, map]);

  return null;
};

// Modal component
// Modal component
const EventModal = ({ isOpen, onClose, data }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;  // To track current language

  if (!isOpen || !data) return null;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto border border-gray-100">
        <button
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {data.title[language] || data.title.en}
            </h2>
            <p className="text-gray-700 text-sm">
              {data.description[language] || data.description.en}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium  uppercase tracking-wider mb-2">Event Details</h3>
                <div className="space-y-2 text-gray-800">
                  <p><span className="font-semibold">Type:</span> {data.eventType || 'N/A'}</p>
                  <p><span className="font-semibold">Field:</span> {data.scientificField || 'N/A'}</p>
                  <p><span className="font-semibold">Theme:</span> {data.theme || 'N/A'}</p>
                  <p><span className="font-semibold">Audience:</span> {data.targetAudience?.join(', ') || 'N/A'}</p>
                  <p><span className="font-semibold">Format:</span> {data.format || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium  uppercase tracking-wider mb-2">Location</h3>
                <div className="space-y-2 text-gray-800 font-semibold">
                  <p>{data.location || 'N/A'}, {data.city || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-2">Dates</h3>
                <div className="space-y-2 text-gray-800">
                  <p><span className="font-semibold">Start:</span> {formatDate(data.startDate)}</p>
                  <p><span className="font-semibold">End:</span> {formatDate(data.endDate)}</p>
                  <p><span className="font-semibold">Submission:</span> {formatDate(data.submissionDeadline)}</p>
                  <p><span className="font-semibold">Registration:</span> {formatDate(data.registrationDeadline)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium  uppercase tracking-wider mb-2">Additional Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p><span className="font-semibold">Language:</span> {data.language || 'N/A'}</p>
              <p><span className="font-semibold">Organizer:</span> {data.organizer || 'N/A'}</p>
              <p className='capitalize'><span className="font-semibold">Tags:</span> {data.tags?.join(', ') || 'N/A'}</p>
              <p><span className="font-semibold">Status:</span> {data.statusBadge || data.status || 'N/A'}</p>
              {data.link && (
                <p>
                  <span className="font-semibold">Link:</span> {' '}
                  <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Visit website
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Marker component with modal
const EventMarker = ({ event }) => {
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  if (event.city === 'Virtual' || !event.coordinates) return null;

  let coordinates = [];
  if (Array.isArray(event.coordinates)) {
    coordinates = event.coordinates;
  } else if (event.coordinates?.latitude && event.coordinates?.longitude) {
    coordinates = [event.coordinates.latitude, event.coordinates.longitude];
  }

  if (coordinates.length !== 2) return null;

  const fetchPopupDetail = async () => {
    try {
      const res = await axiosPublic.get(`/events/${event.id}`);
      setPopupData(res.data.data);
    } catch (error) {
      console.error('Failed to fetch popup details:', error);
    }
  };

  const handleMarkerClick = () => {
    if (!popupData) fetchPopupDetail();
    setIsModalOpen(true);
  };

  return (
    <>
      <Marker position={coordinates} eventHandlers={{ click: handleMarkerClick }} />
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={popupData} />
    </>
  );
};

// Main map
const Map = ({ selectedEvent }) => {
  const defaultCenter = [48.8566, 2.3522]; // Paris
  const defaultZoom = 10;

  const { events } = useEventCoordinates();

  const eventsWithCoords = events.filter(event => {
    if (event.city === 'Virtual') return false;
    if (Array.isArray(event.coordinates)) return event.coordinates.length === 2;
    if (event.coordinates) return event.coordinates.latitude && event.coordinates.longitude;
    return false;
  });

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="min-h-96 h-full w-full"
      scrollWheelZoom={true}
    >
      <ResizeMap />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
      />

      <AddSearchControl onAddressSelect={(coords) => console.log('Search selected:', coords)} />
      <MapUpdater selectedEvent={selectedEvent} />

      {eventsWithCoords.map(event => (
        <EventMarker key={`${event.id}-${event.city}`} event={event} />
      ))}
    </MapContainer>
  );
};

export default Map;
