import React, { useState, useMemo } from "react";
import {
  Plus,
  Check,
  X,
  Search,
  Filter,
} from "lucide-react";

// --- Types ---
interface LeaveRequest {
  id: string;
  employeeCode: string;
  employeeName: string;
  leaveType: string;
  dateFrom: string;
  dateTo: string;
  code: string;
  timeFrom: string;
  timeTo: string;
  remarks: string;
  authoriserRemarks: string;
  status: "pending" | "approved" | "rejected";
}

const LeaveApprovalSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"My Approvals" | "All Approvals">("My Approvals");
  const [filters, setFilters] = useState({ pending: true, approved: true, rejected: true });
  const [searchTerm, setSearchTerm] = useState("");

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      employeeCode: "0089",
      employeeName: "Bridgette Mizzi",
      leaveType: "Out_Of_Office",
      dateFrom: "2016-05-02",
      dateTo: "2016-05-06",
      code: "0000",
      timeFrom: "08:00",
      timeTo: "17:00",
      remarks: "Meeting abroad",
      authoriserRemarks: "",
      status: "pending",
    },
    {
      id: "2",
      employeeCode: "0090",
      employeeName: "David Warner",
      leaveType: "Vacation",
      dateFrom: "2016-05-09",
      dateTo: "2016-05-12",
      code: "0001",
      timeFrom: "08:00",
      timeTo: "17:00",
      remarks: "Family trip",
      authoriserRemarks: "",
      status: "approved",
    },
  ]);

  // --- Calendar Setup ---
  const months = [
    { name: "January 2016", days: 31, startDay: 5, month: 0 },
    { name: "February 2016", days: 29, startDay: 1, month: 1 },
    { name: "March 2016", days: 31, startDay: 2, month: 2 },
  ];

  const getCalendarDays = (month: { days: number; startDay: number }) => {
    const days = [];
    for (let i = 0; i < month.startDay; i++) days.push(null);
    for (let day = 1; day <= month.days; day++) days.push(day);
    return days;
  };

  const getHighlightDates = (monthIndex: number) => {
    const highlights: Record<number, string> = {};
    leaveRequests
      .filter((req) => req.status === "approved")
      .forEach((req) => {
        const start = new Date(req.dateFrom);
        const end = new Date(req.dateTo);

        if (start.getMonth() === monthIndex || end.getMonth() === monthIndex) {
          let d = new Date(start);
          while (d <= end) {
            if (d.getMonth() === monthIndex) {
              highlights[d.getDate()] = "bg-purple-500 text-white rounded-full";
            }
            d.setDate(d.getDate() + 1);
          }
        }
      });
    return highlights;
  };

  // --- Actions ---
  const handleApprove = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleReject = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  const handleNewRequest = () => {
    const newReq: LeaveRequest = {
      id: (leaveRequests.length + 1).toString(),
      employeeCode: "0099",
      employeeName: "New Employee",
      leaveType: "Sick Leave",
      dateFrom: "2016-06-01",
      dateTo: "2016-06-03",
      code: "NEW",
      timeFrom: "09:00",
      timeTo: "18:00",
      remarks: "Medical leave",
      authoriserRemarks: "",
      status: "pending",
    };
    setLeaveRequests((prev) => [...prev, newReq]);
  };

  // --- Filter + Search ---
  const filteredRequests = useMemo(() => {
    return leaveRequests.filter((req) => {
      if (!filters[req.status]) return false;
      if (
        searchTerm &&
        !(
          req.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
        return false;
      return true;
    });
  }, [leaveRequests, filters, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Leave Approval System</h1>
        <button className="hover:text-gray-200">
          <X size={22} />
        </button>
      </header>

      <main className="flex flex-1">
        {/* Content */}
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex mb-6 gap-2">
            {["My Approvals", "All Approvals"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium rounded-lg ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab(tab as "My Approvals" | "All Approvals")}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={handleNewRequest}
                className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 flex items-center gap-1 text-sm"
              >
                <Plus size={16} /> New
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by name or leave type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-3 py-1 text-sm focus:ring-2 focus:ring-purple-400"
              />
              <button className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Action</th>
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Leave</th>
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">To</th>
                  <th className="p-3 text-left">Remarks</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      className={`border-t ${
                        req.status === "pending"
                          ? "bg-orange-50"
                          : req.status === "approved"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      <td className="p-3 flex gap-2">
                        {req.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="bg-green-600 text-white p-1 rounded hover:bg-green-700"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                      </td>
                      <td className="p-3">{req.employeeCode}</td>
                      <td className="p-3">{req.employeeName}</td>
                      <td className="p-3">{req.leaveType}</td>
                      <td className="p-3">{req.dateFrom}</td>
                      <td className="p-3">{req.dateTo}</td>
                      <td className="p-3">{req.remarks}</td>
                      <td className="p-3 capitalize">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            req.status === "approved"
                              ? "bg-green-200 text-green-800"
                              : req.status === "rejected"
                              ? "bg-red-200 text-red-800"
                              : "bg-orange-200 text-orange-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 p-6 text-sm">
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Filters */}
          <div className="flex gap-6 mb-4">
            {(["pending", "approved", "rejected"] as const).map((status) => (
              <label key={status} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters[status]}
                  onChange={(e) =>
                    setFilters({ ...filters, [status]: e.target.checked })
                  }
                />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {months.map((month, idx) => {
              const highlights = getHighlightDates(idx);
              return (
                <div key={idx} className="bg-white rounded-lg shadow p-4 text-xs">
                  <h3 className="font-medium text-center mb-2">{month.name}</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="text-center font-semibold">
                        {d}
                      </div>
                    ))}
                    {getCalendarDays(month).map((day, i) => (
                      <div
                        key={i}
                        className={`h-7 flex items-center justify-center rounded ${
                          day ? highlights[day] || "hover:bg-gray-100" : ""
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden md:block w-72 bg-white shadow-lg p-4 border-l">
          <h3 className="font-medium mb-3">Approved Entries</h3>
          <div className="space-y-3 text-sm max-h-[70vh] overflow-y-auto">
            {leaveRequests.filter((r) => r.status === "approved").length > 0 ? (
              leaveRequests
                .filter((r) => r.status === "approved")
                .map((r) => (
                  <div
                    key={r.id}
                    className="border rounded p-2 bg-purple-50 text-gray-700"
                  >
                    <div className="font-medium">{r.employeeName}</div>
                    <div>{r.leaveType}</div>
                    <div>
                      {r.dateFrom} → {r.dateTo}
                    </div>
                    <div className="text-xs">{r.remarks}</div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-sm">No approved entries yet.</p>
            )}
          </div>
        </aside>
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default LeaveApprovalSystem;
