// src/pages/WorkforceActivityMonitor.tsx
import React, { useEffect, useState } from "react";
import {
  Loader2,
  UserCircle,
  Briefcase,
  Clock,
  Activity,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { ActivityData } from "../types/activity";

const dummyData: ActivityData[] = [
  {
    id: 1,
    name: "John Smith",
    lastActive: "10:30 AM",
    job: "Repair Transformer",
    status: "Active",
  },
  {
    id: 2,
    name: "Mike Davis",
    lastActive: "9:45 AM",
    job: "Install Meter",
    status: "Idle",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    lastActive: "8:15 AM",
    job: "Site Inspection",
    status: "Off Duty",
  },
  {
    id: 4,
    name: "Emma Brown",
    lastActive: "11:20 AM",
    job: "Cable Maintenance",
    status: "Active",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Idle":
      return "bg-yellow-100 text-yellow-700";
    case "Off Duty":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const WorkforceActivityMonitor: React.FC = () => {
  const [activityList, setActivityList] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setActivityList(dummyData);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTechnicians = activityList.filter((tech) => {
    const matchesStatus =
      filterStatus === "All" || tech.status === filterStatus;
    const matchesSearch = tech.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          👷 Workforce Activity Monitor
        </h1>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by technician name..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Idle", "Off Duty"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Filter size={14} />
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Technician Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : filteredTechnicians.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No technicians found.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredTechnicians.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <UserCircle className="w-12 h-12 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">Technician</p>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">Job:</span>
                  <span className="ml-1">{item.job}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="font-medium">Last Active:</span>
                  <span className="ml-1">{item.lastActive}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkforceActivityMonitor;
