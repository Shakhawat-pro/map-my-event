import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Component to add the GeoSearch control
const AddSearchControl = () => {
    const map = useMap(); // Access the Leaflet map instance
  
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        autoComplete: true,
      });
  
      map.addControl(searchControl); // Add the search control to the map
  
      // Cleanup function to remove the control when the component unmounts
      return () => {
        map.removeControl(searchControl);
      };
    }, [map]);
  
    return null; // This component doesn't render anything
  };
  
  const Map = () => {
    const center = [48.8566, 2.3522]; // Center of the map (France)
  
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
          {/* Add CartoDB tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
          />
  
          {/* Add the GeoSearch control */}
          <AddSearchControl />
  
          {/* Add a marker for Paris */}
          <Marker position={[48.8566, 2.3522]}>
            <Popup>Event in Paris</Popup>
          </Marker>
  
          {/* Add a marker for Toulouse */}
          <Marker position={[43.6047, 1.4442]}>
            <Popup>Event in Toulouse</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };
export default Map;