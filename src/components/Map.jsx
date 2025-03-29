import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

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

const AddSearchControl = ({ onAddressSelect }) => {
  const map = useMap();

  React.useEffect(() => {
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
      keepResult: true,

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
// Component to update map view when an event is selected
const MapUpdater = ({ selectedEvent }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedEvent && selectedEvent.coordinates) {
      const { latitude, longitude } = selectedEvent.coordinates;
      map.flyTo([latitude, longitude], 10, { animate: true }); // 🔹 Smooth map transition
    }
  }, [selectedEvent, map]);

  return null;
};

const EventMarker = ({ event }) => {
  // Skip virtual events
  if (event.city === 'Virtual' || !event.coordinates) return null;

  // Get coordinates - handle both object and array formats
  let coordinates = [];
  if (Array.isArray(event.coordinates)) {
    coordinates = event.coordinates;
  } else if (event.coordinates?.latitude && event.coordinates?.longitude) {
    coordinates = [event.coordinates.latitude, event.coordinates.longitude];
  }

  // Skip if no valid coordinates
  if (coordinates.length !== 2) return null;

  return (
    <Marker position={coordinates}>
      <Popup>
        <div className="space-y-1">
          <h3 className="font-bold text-lg">{event.title}</h3>
          <p><strong>Location:</strong> {event.location || 'N/A'}, {event.city || 'N/A'}</p>
          <p><strong>Dates:</strong> {event.startDate || 'N/A'} to {event.endDate || 'N/A'}</p>
          <p><strong>Format:</strong> {event.format || 'N/A'}</p>
          <p><strong>Organizer:</strong> {event.organizer || 'N/A'}</p>
          <span className={`px-2.5 py-1 in rounded-full text-xs border-1 font-semibold flex items-center gap-1 w-fit ${event.statusBadge === "Upcoming"
            ? "bg-blue-50/80 text-blue-700"
            : event.statusBadge === "Closing Soon"
              ? "bg-amber-50/80 text-amber-700"
              : "bg-green-50/80 text-green-700"
            }`}>
            {event.statusBadge === "Upcoming" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            )}
            {event.statusBadge === "Closing Soon" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
            {event.statusBadge === "New" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
            {event.statusBadge || 'Unknown'}
          </span>
        </div>
      </Popup>
    </Marker>
  );
};

const Map = ({ events = [], selectedEvent }) => {
  const defaultCenter = [52.5200, 13.4050]; // Berlin coordinates
  const defaultZoom = 5; // Wider zoom to show multiple European locations

  // Filter events with valid coordinates
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
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
      />

      <AddSearchControl onAddressSelect={(coords) => console.log('Search selected:', coords)} />
      <MapUpdater selectedEvent={selectedEvent} />

      {eventsWithCoords.map(event => (
        <EventMarker
          key={`${event.title}-${event.city}`}
          event={event}
        />
      ))}
    </MapContainer>
  );
};

export default Map;