import React, { useState } from "react";

const JobUploadModal = ({ onSubmit, onClose }: { onSubmit: (data: any) => void, onClose: () => void }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    customerName: "",
    technicianFirstName: "",
    technicianLastName: "",
    categoryName: "",
    priority: "LOW",
    status: "PENDING",
    scheduledStart: "",
    scheduledEnd: "",
    locationAddress: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full space-y-3">
        <h2 className="text-lg font-semibold">Create Job</h2>

        {["title","description","customerName","technicianFirstName","technicianLastName","categoryName","locationAddress"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={(form as any)[field]}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        ))}

        <div className="flex gap-2">
          <select name="priority" value={form.priority} onChange={handleChange} className="flex-1 border p-2 rounded">
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <select name="status" value={form.status} onChange={handleChange} className="flex-1 border p-2 rounded">
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <input type="datetime-local" name="scheduledStart" value={form.scheduledStart} onChange={handleChange} className="w-full border rounded p-2"/>
        <input type="datetime-local" name="scheduledEnd" value={form.scheduledEnd} onChange={handleChange} className="w-full border rounded p-2"/>

        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleUpload}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default JobUploadModal;
