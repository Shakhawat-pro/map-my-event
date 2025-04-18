import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import ResizeMap from '../utils/ResizeMap';
import useEventCoordinates from '../hooks/useEventCoordinates';
import useAxiosPublic from '../hooks/useAxiosPublic';

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
const EventModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-[#05050562]  z-[9999] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-xl mb-2">{data.title}</h3>
        <p><strong>Location:</strong> {data.location || 'N/A'}, {data.city || 'N/A'}</p>
        <p>
          <strong>Dates:</strong>{" "}
          {data.startDate ? new Date(data.startDate).toLocaleDateString() : 'N/A'} to{" "}
          {data.endDate ? new Date(data.endDate).toLocaleDateString() : 'N/A'}
        </p>
        <p><strong>Format:</strong> {data.format || 'N/A'}</p>
        <p><strong>Organizer:</strong> {data.organizer || 'N/A'}</p>
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
