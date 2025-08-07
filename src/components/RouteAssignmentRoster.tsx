import React, { useState, useEffect } from "react";

interface RouteAssignment {
  id: string;
  routeName: string;
  assignedTechnician: string;
  startDate: string;
  endDate: string;
  status: "Pending" | "In Progress" | "Completed";
}

const mockData: RouteAssignment[] = [
  {
    id: "RA-001",
    routeName: "Route Alpha",
    assignedTechnician: "John Doe",
    startDate: "2025-07-01",
    endDate: "2025-07-05",
    status: "In Progress",
  },
  {
    id: "RA-002",
    routeName: "Route Beta",
    assignedTechnician: "Jane Smith",
    startDate: "2025-07-03",
    endDate: "2025-07-07",
    status: "Pending",
  },
  {
    id: "RA-003",
    routeName: "Route Gamma",
    assignedTechnician: "Michael Johnson",
    startDate: "2025-06-28",
    endDate: "2025-07-02",
    status: "Completed",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};

const RouteAssignmentRoster: React.FC = () => {
  const [assignments, setAssignments] = useState<RouteAssignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RouteAssignment>({
    id: "",
    routeName: "",
    assignedTechnician: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  useEffect(() => {
    setAssignments(mockData);
  }, []);

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.assignedTechnician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openNewAssignmentModal = () => {
    setForm({
      id: `RA-${String(assignments.length + 1).padStart(3, "0")}`,
      routeName: "",
      assignedTechnician: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditAssignmentModal = (assignment: RouteAssignment) => {
    setForm(assignment);
    setEditingId(assignment.id);
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.routeName.trim() || !form.assignedTechnician.trim() || !form.startDate || !form.endDate) {
      alert("Please fill in all fields.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert("End Date cannot be before Start Date.");
      return;
    }

    if (editingId) {
      setAssignments((prev) => prev.map((item) => (item.id === editingId ? form : item)));
    } else {
      setAssignments((prev) => [...prev, form]);
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <main className="p-6 w-full max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Route Assignment Roster</h1>
        <button
          type="button"
          onClick={openNewAssignmentModal}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-md shadow"
        >
          + New Assignment
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by route, technician, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-auto bg-white rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              {['Assignment ID', 'Route Name', 'Technician', 'Start Date', 'End Date', 'Status', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAssignments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No assignments found.
                </td>
              </tr>
            ) : (
              filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-800">{assignment.id}</td>
                  <td className="px-6 py-4 text-gray-900">{assignment.routeName}</td>
                  <td className="px-6 py-4 text-gray-800">{assignment.assignedTechnician}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(assignment.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(assignment.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full font-medium ${statusColors[assignment.status]}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEditAssignmentModal(assignment)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Route Assignment" : "New Route Assignment"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Assignment ID", name: "id", type: "text", disabled: true },
                { label: "Route Name", name: "routeName", type: "text" },
                { label: "Assigned Technician", name: "assignedTechnician", type: "text" },
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" },
              ].map(({ label, name, type, disabled }) => (
                <div key={name}>
                  <label htmlFor={name} className="block font-medium mb-1">{label}</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleFormChange}
                    disabled={disabled}
                    className={`w-full border px-3 py-2 rounded ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="status" className="block font-medium mb-1">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold"
                >
                  {editingId ? "Save Changes" : "Add Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default RouteAssignmentRoster;
