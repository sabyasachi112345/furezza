// LiveGPSTrackingView.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue with Leaflet + Webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const LiveGPSTrackingView: React.FC = () => {
  // Default position set to Kuala Lumpur, Malaysia
  const position: [number, number] = [3.1390, 101.6869];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Live GPS Tracking View</h1>
      <div className="h-[500px] rounded overflow-hidden shadow">
        <MapContainer center={position} zoom={13} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Default Location: Kuala Lumpur, Malaysia<br />
              Lat: {position[0]}<br />
              Lon: {position[1]}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveGPSTrackingView;
