import React, { useEffect, useState } from "react";
import { AttendanceLog } from "../../types/attendance";
import { dummyAttendanceLogs } from "../../data/attendance";
import { Loader2, CircleCheckBig, CircleX, Clock3 } from "lucide-react";

const AttendanceLogs: React.FC = () => {
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogs(dummyAttendanceLogs);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center drop-shadow">
          Technician Attendance Logs
        </h2>

        {loading ? (
          <div className="flex items-center justify-center text-gray-500 text-lg mt-12">
            <Loader2 className="animate-spin mr-3 w-6 h-6" />
            Loading attendance logs...
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-12">
            No attendance logs found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="sticky top-0 bg-blue-100 text-blue-900 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4 font-semibold">Technician</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Check-In</th>
                  <th className="px-6 py-4 font-semibold">Check-Out</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50"
                    } border-b hover:bg-blue-100 transition duration-150`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {log.technician}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{log.date}</td>
                    <td className="px-6 py-4 text-gray-600">{log.checkIn}</td>
                    <td className="px-6 py-4 text-gray-600">{log.checkOut}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          log.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : log.status === "Absent"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {log.status === "Present" && (
                          <CircleCheckBig className="w-4 h-4" />
                        )}
                        {log.status === "Absent" && (
                          <CircleX className="w-4 h-4" />
                        )}
                        {log.status === "Late" && (
                          <Clock3 className="w-4 h-4" />
                        )}
                        {log.status}
                      </span>
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

export default AttendanceLogs;
