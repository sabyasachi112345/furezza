// src/pages/JobTrackingPage.tsx
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Loader2,
  User2,
  Clock,
  CheckCircle,
  Clock3,
  ListChecks,
  AlertCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import { Job } from "../types/job";
import { mockJobs } from "../data/mockJobs";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-300",
  Completed: "bg-green-100 text-green-800 border-green-300",
};

const statusIcons: Record<string, JSX.Element> = {
  Pending: <Clock3 size={16} className="mr-1" />,
  "In Progress": <ListChecks size={16} className="mr-1" />,
  Completed: <CheckCircle size={16} className="mr-1" />,
};

const JobTrackingPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setTimeout(() => {
      setJobs(mockJobs); // Replace with API call in production
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (text: string) => {
    setSearch(text.toLowerCase());
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = selectedStatus === "All" || job.status === selectedStatus;
    const matchesSearch =
      job.title.toLowerCase().includes(search) ||
      job.assignedTo.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="px-6 py-8 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          📍 Job Tracking Dashboard
        </h1>
        <button
          onClick={fetchJobs}
          disabled={loading}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Jobs
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative col-span-2">
          <input
            type="text"
            placeholder="Search by job title, technician, or location..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {["All", "Pending", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition duration-200 ${
                selectedStatus === status
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex gap-6 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock3 size={14} className="text-yellow-500" /> Pending
        </div>
        <div className="flex items-center gap-1">
          <ListChecks size={14} className="text-blue-500" /> In Progress
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={14} className="text-green-500" /> Completed
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500">
          <AlertCircle size={48} className="mb-3 text-red-400" />
          <p className="text-lg">No jobs match your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-blue-500"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h2>
                <span
                  className={`text-xs font-medium flex items-center px-3 py-1 rounded-full border ${statusColors[job.status]}`}
                >
                  {statusIcons[job.status]} {job.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center">
                  <User2 className="mr-2 text-blue-500" size={16} />
                  <strong>Technician:</strong>
                  <span className="ml-1">{job.assignedTo}</span>
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 text-red-500" size={16} />
                  <strong>Location:</strong>
                  <span className="ml-1">{job.location}</span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 text-gray-500" size={16} />
                  <strong>Updated:</strong>
                  <span className="ml-1">{job.updatedAt}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobTrackingPage;
