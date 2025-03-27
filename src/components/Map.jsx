import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Fix for default marker icons in Leaflet with React
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

// Component to add the GeoSearch control
const AddSearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: false,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

// Demo event data with coordinates
const demoEvents = [
  {
    id: 1,
    title: "Sustainable Business Conference",
    location: {
      venue: "Sorbonne Business School",
      city: "Paris",
      coordinates: [48.8462, 2.3469]
    },
    startDate: "2023-11-15",
    endDate: "2023-11-17",
    format: "Hybrid",
    organizer: "European Business Association",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "AI in Marketing Workshop",
    location: {
      venue: "Tech Innovation Center",
      city: "Toulouse",
      coordinates: [43.6047, 1.4442]
    },
    startDate: "2023-10-05",
    endDate: "2023-10-05",
    format: "Online",
    organizer: "Digital Marketing Institute",
    status: "Closing soon"
  },
  {
    id: 3,
    title: "Winter Entrepreneurship School",
    location: {
      venue: "Berlin Innovation Hub",
      city: "Berlin",
      coordinates: [52.5200, 13.4050]
    },
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    format: "Face-to-face",
    organizer: "Startup Europe Network",
    status: "New"
  },
  {
    id: 4,
    title: "Diversity in Tech Seminar",
    location: {
      venue: "London Tech Campus",
      city: "London",
      coordinates: [51.5074, -0.1278]
    },
    startDate: "2023-10-10",
    endDate: "2023-10-10",
    format: "Hybrid",
    organizer: "Tech Inclusion Initiative",
    status: "Upcoming"
  }
];

const EventMarker = ({ event }) => {
  return (
    <Marker position={event.location.coordinates}>
      <Popup>
        <div className="space-y-1">
          <h3 className="font-bold text-lg">{event.title}</h3>
          <p><strong>Location:</strong> {event.location.venue}, {event.location.city}</p>
          <p><strong>Dates:</strong> {event.startDate} to {event.endDate}</p>
          <p><strong>Format:</strong> {event.format}</p>
          <p><strong>Organizer:</strong> {event.organizer}</p>
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
            event.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
            event.status === "New" ? "bg-green-100 text-green-800" :
            "bg-yellow-100 text-yellow-800"
          }`}>
            {event.status}
          </span>
        </div>
      </Popup>
    </Marker>
  );
};

const Map = () => {
  const center = [52.5200, 13.4050]; // Default center (Paris)

  return (
    <MapContainer 
      center={center} 
      zoom={15} 
      className='min-h-96' 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
      />

      <AddSearchControl />

      {/* Render markers for each event */}
      {demoEvents.map(event => (
        <EventMarker key={event.id} event={event} />
      ))}
    </MapContainer>
  );
};

export default Map;