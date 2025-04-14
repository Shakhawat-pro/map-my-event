import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
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

// Search control component
const SearchControl = ({ onLocationSelect }) => {
  const map = useMap();

  React.useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      autoComplete: true,
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
        onLocationSelect({ lat, lng });
      }
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onLocationSelect]);

  return null;
};

// Click handler component
const LocationClickHandler = ({ onLocationSelect, clearSearchMarker }) => {
  useMapEvent('click', (e) => {
    onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    clearSearchMarker(); // Clear search marker when clicking new location
  });

  return null;
};

// Main LocationMap component
const LocationMap = ({ onLocationSelect, position }) => {
  const defaultCenter = [0, 0];
  const defaultZoom = 2;
  const [searchedLocation, setSearchedLocation] = useState(null);

  const handleSearchSelect = (location) => {
    setSearchedLocation(location);
    onLocationSelect(location);
  };

  const clearSearchMarker = () => {
    setSearchedLocation(null);
  };

  return (
    <MapContainer
      center={position || searchedLocation || defaultCenter}
      zoom={position || searchedLocation ? 13 : defaultZoom}
      className="h-64 w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <SearchControl onLocationSelect={handleSearchSelect} />
      <LocationClickHandler onLocationSelect={onLocationSelect} clearSearchMarker={clearSearchMarker} />

      {searchedLocation && (
        <Marker
          position={[searchedLocation.lat, searchedLocation.lng]}
          icon={L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
          })}
        />
      )}

      {position && (
        <Marker position={[position.lat, position.lng]} />
      )}
    </MapContainer>
  );
};

export default LocationMap;
