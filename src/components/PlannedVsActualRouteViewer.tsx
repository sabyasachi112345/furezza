import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons in Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const PlannedVsActualRouteViewer: React.FC = () => {
  // Dummy coordinates
  const coniavest: [number, number] = [57.1, -5.7];
  const pollyConnect: [number, number] = [57.2, -5.9];
  const point20Y: [number, number] = [57.05, -5.8];

  const plannedRoute: [number, number][] = [coniavest, point20Y, pollyConnect];
  const actualRoute: [number, number][] = [coniavest, [57.12, -5.8], pollyConnect];

  return (
    <div className="w-full h-[80vh] p-4">
      <h2 className="text-lg font-semibold mb-3">Planned vs Actual Route Viewer</h2>
      <MapContainer center={point20Y} zoom={11} scrollWheelZoom={true} className="w-full h-full rounded-lg shadow">
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Planned Route in Blue */}
        <Polyline positions={plannedRoute} pathOptions={{ color: "blue" }} />

        {/* Actual Route in Red */}
        <Polyline positions={actualRoute} pathOptions={{ color: "red" }} />

        {/* Markers */}
        <Marker position={pollyConnect}>
          <Popup>Polly Connect</Popup>
        </Marker>
        <Marker position={coniavest}>
          <Popup>Coniavest</Popup>
        </Marker>
        <Marker position={point20Y}>
          <Popup>20Y</Popup>
        </Marker>
      </MapContainer>

      {/* Legend */}
      <div className="mt-4 flex gap-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-600 inline-block rounded-full"></span>
          <span>Planned Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-600 inline-block rounded-full"></span>
          <span>Actual Route</span>
        </div>
      </div>
    </div>
  );
};

export default PlannedVsActualRouteViewer;
