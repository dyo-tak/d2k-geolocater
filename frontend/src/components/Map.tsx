import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coordinates: { latitude: number; longitude: number };
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    // Update marker position when coordinates change
    if (map && coordinates) {
      map.setView([coordinates.latitude, coordinates.longitude], 13);
    }
  }, [map, coordinates]);

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={5}
        style={{ height: "500px", width: "650px", borderRadius: "10px" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates && (
          <Marker position={[coordinates.latitude, coordinates.longitude]}>
            <Popup>Your Marker</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
