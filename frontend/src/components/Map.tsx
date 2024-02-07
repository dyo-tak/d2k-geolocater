import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coordinates: { latitude: number; longitude: number };
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Update the key to re-create MapContainer when coordinates change
    setKey((prevKey) => prevKey + 1);
  }, [coordinates]);

  return (
    <div key={key} className="sm:mt-20 overflow-hidden flex items-center">
      <MapContainer
        center={[coordinates.latitude, coordinates.longitude]}
        zoom={5}
        style={{ height: "500px", width: "650px", borderRadius: "10px" }}
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
