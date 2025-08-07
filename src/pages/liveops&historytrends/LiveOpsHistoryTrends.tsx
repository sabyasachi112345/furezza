// src/pages/liveops&historytrends/LiveOpsHistoryTrends.tsx

import React, { useEffect, useState } from "react";
import {
  BarChart2,
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
  X,
} from "lucide-react";
import { OpsHistoryRecord } from "../../types/opsHistory";
import { mockOpsHistoryData } from "../../data/opsHistoryData";

const LiveOpsHistoryTrends: React.FC = () => {
  const [data, setData] = useState<OpsHistoryRecord[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockOpsHistoryData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.technician.toLowerCase().includes(search.toLowerCase()) ||
      item.operation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-8 min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <BarChart2 className="text-blue-600 w-8 h-8" />
        <h1 className="text-4xl font-extrabold text-gray-800">
          Live OPS & History Trends
        </h1>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mb-8">
        <Search className="absolute top-3.5 left-3 text-gray-400" size={20} />
        {search && (
          <X
            onClick={() => setSearch("")}
            className="absolute top-3.5 right-3 text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        )}
        <input
          type="text"
          placeholder="Search by technician or operation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex justify-center items-center p-16">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <table className="min-w-full text-sm font-medium text-left">
            <thead className="bg-blue-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 tracking-wider">Technician</th>
                <th className="px-6 py-4 tracking-wider">Operation</th>
                <th className="px-6 py-4 tracking-wider">Timestamp</th>
                <th className="px-6 py-4 tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition-all duration-200`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item.technician}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {item.operation}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.timestamp}
                    </td>
                    <td className="px-6 py-4">
                      {item.result === "Success" ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
                          <XCircle className="w-4 h-4" />
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LiveOpsHistoryTrends;
