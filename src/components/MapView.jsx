import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = ({ center = [51.505, -0.09], zoom = 2, markerLabel = 'World Center' }) => (
  <MapContainer center={center} zoom={zoom} style={{ height: '300px', width: '100%', borderRadius: '1rem', overflow: 'hidden', minHeight: '200px' }} scrollWheelZoom={true}>
    <TileLayer
      attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={center}>
      <Popup>{markerLabel}</Popup>
    </Marker>
  </MapContainer>
);

export default MapView;
