import React, { useState } from "react";
import { Patroller, Status } from "../types/patroller";
import { initialPatrollers } from "../data/patrollers";

const PatrollerStatusPage: React.FC = () => {
  const [patrollers, setPatrollers] = useState<Patroller[]>(initialPatrollers);
  const [filterStatus, setFilterStatus] = useState<"All" | Status>("All");
  const [date, setDate] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Patroller>>({});

  const filtered = patrollers.filter(
    (p) => filterStatus === "All" || p.status === filterStatus
  );

  const getStatusDot = (status: Status) => {
    const color =
      status === "Online"
        ? "bg-green-500"
        : status === "Offline"
        ? "bg-red-500"
        : "bg-yellow-500";
    return <span className={`inline-block w-2 h-2 mr-2 rounded-full ${color}`} />;
  };

  const handleEditClick = (p: Patroller) => {
    setEditingId(p.id);
    setEditFormData({ ...p });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name.includes("gps") ? prev[name] : value,
    }));
  };

  const handleGpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      gps: {
        ...prev.gps,
        [name]: Number(value),
      },
    }));
  };

  const handleSaveClick = () => {
    if (editingId === null) return;

    setPatrollers((prev) =>
      prev.map((p) => {
        if (p.id === editingId) {
          return {
            ...p,
            ...editFormData,
            gps: {
              lat: editFormData.gps?.lat ?? p.gps.lat,
              lng: editFormData.gps?.lng ?? p.gps.lng,
            },
          } as Patroller;
        }
        return p;
      })
    );
    setEditingId(null);
    setEditFormData({});
  };

  return (
    <div className="w-full px-4 py-10 sm:px-10 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-8 border-b pb-2">
        📋 Patroller Status Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-lg w-full max-w-sm shadow-sm focus:ring focus:ring-blue-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {["All", "Online", "Offline", "Idle"].map((s) => (
            <button
              key={s}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition duration-200 border shadow-sm ${
                filterStatus === s
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => setFilterStatus(s as any)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-blue-200 text-blue-900 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Seen</th>
              <th className="px-6 py-4">Shift</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">GPS</th>
              <th className="px-6 py-4">Battery</th>
              <th className="px-6 py-4">Duty Area</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50 transition">
                {editingId === p.id ? (
                  <>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <select
                        name="status"
                        value={editFormData.status ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Idle">Idle</option>
                      </select>
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        name="lastSeen"
                        value={editFormData.lastSeen ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <select
                        name="shift"
                        value={editFormData.shift ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                      </select>
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        name="location"
                        value={editFormData.location ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        name="phone"
                        value={editFormData.phone ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-3 flex gap-1">
                      <input
                        type="number"
                        step="0.0001"
                        name="lat"
                        value={editFormData.gps?.lat ?? ""}
                        onChange={handleGpsChange}
                        className="border rounded px-2 py-1 w-1/2"
                        placeholder="Lat"
                      />
                      <input
                        type="number"
                        step="0.0001"
                        name="lng"
                        value={editFormData.gps?.lng ?? ""}
                        onChange={handleGpsChange}
                        className="border rounded px-2 py-1 w-1/2"
                        placeholder="Lng"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        name="battery"
                        value={editFormData.battery ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                        min={0}
                        max={100}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        name="dutyArea"
                        value={editFormData.dutyArea ?? ""}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={handleSaveClick}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-3 font-semibold">{p.name}</td>
                    <td className="px-6 py-3 flex items-center">
                      {getStatusDot(p.status)} {p.status}
                    </td>
                    <td className="px-6 py-3">{p.lastSeen}</td>
                    <td className="px-6 py-3">{p.shift}</td>
                    <td className="px-6 py-3">{p.location}</td>
                    <td className="px-6 py-3">{p.phone}</td>
                    <td className="px-6 py-3">
                      {p.gps.lat.toFixed(4)}, {p.gps.lng.toFixed(4)}
                    </td>
                    <td className="px-6 py-3">{p.battery}%</td>
                    <td className="px-6 py-3">{p.dutyArea}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          No patrollers found for selected filters.
        </p>
      )}
    </div>
  );
};

export default PatrollerStatusPage;
