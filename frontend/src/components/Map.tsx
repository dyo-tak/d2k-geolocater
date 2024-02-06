import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<[number, number]>([0, 0]); // Initial marker position

  useEffect(() => {
    // Initialize map
    if (map) {
      map.setView(marker, 13); // Set initial view
    }
  }, [map, marker]);

  const handleMapClick = (e: any) => {
    setMarker([e.latlng.lat, e.latlng.lng]);
  };

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={5}
        style={{ height: "500px", width: "650px", borderRadius: "10px"}}
        whenCreated={setMap}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={marker}>
          <Popup>Your Marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
