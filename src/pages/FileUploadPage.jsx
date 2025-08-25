import { useEffect, useState } from "react";

// ✅ Modal Component
const JobUploadModal = ({ job, onSubmit, onClose }) => {
  const [form, setForm] = useState(
    job || {
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
      locationAddress: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const method = job ? "PUT" : "POST";
    const url = job
      ? `http://localhost:5000/api/jobs/${job.id}`
      : "http://localhost:5000/api/jobs";

    const res = await fetch(url, {
      method,
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
        <h2 className="text-lg font-semibold">
          {job ? "Edit Job" : "Create Job"}
        </h2>

        {[
          "title",
          "description",
          "customerName",
          "technicianFirstName",
          "technicianLastName",
          "categoryName",
          "locationAddress",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        ))}

        <div className="flex gap-2">
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="flex-1 border p-2 rounded"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="flex-1 border p-2 rounded"
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <input
          type="datetime-local"
          name="scheduledStart"
          value={form.scheduledStart}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="datetime-local"
          name="scheduledEnd"
          value={form.scheduledEnd}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={handleSubmit}
          >
            {job ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Main Page
export default function FileUploadPage() {
  const [jobs, setJobs] = useState([]);
  const [modalJob, setModalJob] = useState(null);

  // Fetch jobs
  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📋 Job Management</h1>

      <button
        onClick={() => setModalJob(null)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Create Job
      </button>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Technician</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border">
              <td className="p-2">{job.id}</td>
              <td className="p-2">{job.title}</td>
              <td className="p-2">{job.customerName}</td>
              <td className="p-2">
                {job.technicianFirstName} {job.technicianLastName}
              </td>
              <td className="p-2">{job.priority}</td>
              <td className="p-2">{job.status}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => setModalJob(job)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalJob !== undefined && (
        <JobUploadModal
          job={modalJob}
          onSubmit={fetchJobs}
          onClose={() => setModalJob(undefined)}
        />
      )}
    </div>
  );
}
