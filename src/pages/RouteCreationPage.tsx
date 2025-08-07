import React, { useState } from "react";
import type { Halt } from "../types";

const generateDummyHalts = (): Halt[] => [
  { id: 1, name: "Warehouse", lat: 12.971598, lng: 77.594566 },
  { id: 2, name: "Checkpoint A", lat: 12.935192, lng: 77.614532 },
  { id: 3, name: "Delivery Point", lat: 12.927923, lng: 77.627108 },
];

const RouteCreationPage: React.FC = () => {
  const [halts, setHalts] = useState<Halt[]>(generateDummyHalts());
  const [newHalt, setNewHalt] = useState<Omit<Halt, "id">>({
    lat: 0,
    lng: 0,
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const addHalt = () => {
    if (!newHalt.name.trim()) {
      setError("Please enter a valid halt name.");
      return;
    }

    if (!newHalt.lat || !newHalt.lng) {
      setError("Latitude and Longitude are required.");
      return;
    }

    const newId = halts.length > 0 ? Math.max(...halts.map((h) => h.id)) + 1 : 1;
    const newEntry: Halt = { ...newHalt, id: newId };

    setHalts([...halts, newEntry]);
    setNewHalt({ name: "", lat: 0, lng: 0 });
    setError(null);
  };

  const removeHalt = (id: number) => {
    setHalts(halts.filter((halt) => halt.id !== id));
  };

  const handleSubmit = () => {
    if (halts.length < 2) {
      alert("A route should have at least 2 halts.");
      return;
    }

    alert("✅ Route created successfully!");
    console.log("Created Route with Halts:", halts);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Route Creation</h1>
      <p className="text-gray-600 mb-6">Add halts (stops) to create a delivery route.</p>

      <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Add New Halt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Halt Name"
            value={newHalt.name}
            onChange={(e) => setNewHalt({ ...newHalt, name: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Latitude"
            value={newHalt.lat}
            step="0.000001"
            onChange={(e) => setNewHalt({ ...newHalt, lat: parseFloat(e.target.value) })}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Longitude"
            value={newHalt.lng}
            step="0.000001"
            onChange={(e) => setNewHalt({ ...newHalt, lng: parseFloat(e.target.value) })}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <button
          onClick={addHalt}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ Add Halt
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">🛑 Current Halts</h2>
        {halts.length > 0 ? (
          <ul className="space-y-3">
            {halts.map((halt) => (
              <li
                key={halt.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm"
              >
                <div>
                  <p className="font-semibold">{halt.name}</p>
                  <p className="text-sm text-gray-600">
                    Lat: {halt.lat} | Lng: {halt.lng}
                  </p>
                </div>
                <button
                  onClick={() => removeHalt(halt.id)}
                  className="text-red-600 text-lg hover:text-red-800"
                  title="Remove halt"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No halts added yet.</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          ✅ Save Route
        </button>
      </div>
    </div>
  );
};

export default RouteCreationPage;
