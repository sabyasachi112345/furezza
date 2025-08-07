import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  UserCheck2,
  ClipboardList,
} from "lucide-react";
import { SupervisorApprovalRecord } from "../types/supervisor";
import { dummyApprovals } from "../data/approvals";

const SupervisorApproval: React.FC = () => {
  const [approvals, setApprovals] = useState<SupervisorApprovalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApprovals(dummyApprovals);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleApproval = (id: number, decision: "Approved" | "Rejected") => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: decision } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 flex justify-center items-center gap-2">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            Supervisor Approval Panel
          </h1>
          <p className="text-gray-500 mt-2">
            Manage technician approval requests efficiently
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center text-gray-500 text-lg mt-12">
            <Loader2 className="animate-spin mr-3 w-6 h-6" />
            Loading approval requests...
          </div>
        ) : approvals.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-12">
            🎉 All clear! No pending approvals.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-100 text-blue-900 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Technician</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Request Type</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50"
                    } border-t hover:bg-blue-100 transition duration-150`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                      <UserCheck2 className="text-blue-600 w-5 h-5" />
                      {item.technician}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.date}</td>
                    <td className="px-6 py-4 text-gray-700">{item.type}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">{item.reason}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status === "Approved" && <CheckCircle className="w-4 h-4" />}
                        {item.status === "Rejected" && <XCircle className="w-4 h-4" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.status === "Pending" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleApproval(item.id, "Approved")}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproval(item.id, "Rejected")}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorApproval;
