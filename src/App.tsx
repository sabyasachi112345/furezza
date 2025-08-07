// App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

// Core Pages/Layouts
import DashboardLayout from "./components/layout/DashboardLayout";
import JobList from "./components/jobs/JobList";
import JobDetailPage from "./components/jobs/JobDetailPage";
import TechnicianList from "./pages/TechnicianList";
import CustomersPage from "./pages/CustomersPage";
import PatrollerStatusPage from "./pages/PatrollerStatusPage";
import ResourceAvailabilityPage from "./pages/ResourceAvailabilityPage";
import RouteAssignmentRoster from "./components/RouteAssignmentRoster";
import PlannedVsActualRouteViewer from "./components/PlannedVsActualRouteViewer";
import LiveGPSTrackingView from "./components/LiveGPSTrackingView";
import RouteCreationPage from "./pages/RouteCreationPage";
import IndividualPerformance from "./pages/IndividualPerformance";
import JobTrackingPage from "./pages/JobTrackingPage";
import WorkforceActivityMonitor from "./pages/WorkforceActivityMonitor";
import LiveOpsHistoryTrends from "./pages/liveops&historytrends/LiveOpsHistoryTrends";
import FileUploadPage from "./pages/FileUploadPage";
import JobFeedbackPage from "./pages/JobFeedbackPage";
import SupervisorApproval from "./pages/SupervisorApproval";
import AttendanceLogs from "./pages/attendance/AttendanceLogs";
import ApiIntegrationPage from "./pages/ApiIntegrationPage";
import UserRoleManagement from "./pages/UserRoleManagement";
import RoleManagement from "./pages/RoleManagement";

// API & Mock Data
import {
  fetchJobs,
  fetchTechnicians,
  updateJob,
  useJobUpdates,
} from "./data/api";
import { mockJobs, mockTechnicians } from "./data/mockData";

// Types
import type { Job, Technician, JobStatus, DateRangeConfig, StatCardKey } from "./types";

const JobDetailWrapper: React.FC<{
  jobs: Job[];
  technicians: Technician[];
}> = ({ jobs, technicians }) => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find((j) => j.id === Number(id));
  return job ? <JobDetailPage job={job} technicians={technicians} /> : <Navigate to="/" />;
};

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [useMockData, setUseMockData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<JobStatus | "all" | "ACTIVE" | "INACTIVE">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRangeConfig, setDateRangeConfig] = useState<DateRangeConfig>({
    view: "WEEK",
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 6)).toISOString(),
    intervalMinutes: 60,
    selectedDate: new Date().toISOString(),
    timeWindow: { startHour: 8, endHour: 20 },
  });

  useEffect(() => {
    (async function loadData() {
      try {
        const [fJ, fT] = await Promise.all([fetchJobs(), fetchTechnicians()]);
        setJobs(fJ);
        setTechnicians(fT);
      } catch {
        console.warn("Backend unreachable. Using mock data.");
        setJobs(mockJobs);
        setTechnicians(mockTechnicians);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useJobUpdates(setJobs);

  const updateJobState = (jobId: number, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, ...updates } : job));
  };

  const handleJobUpdate = async (jobIdOrJob: number | Job, updates?: Partial<Job>) => {
    let jobId: number;
    let jobUpdates: Partial<Job>;

    if (typeof jobIdOrJob === 'number') {
      jobId = jobIdOrJob;
      jobUpdates = updates!;
    } else {
      jobId = jobIdOrJob.id;
      const { id, ...rest } = jobIdOrJob;
      jobUpdates = rest;
    }

    updateJobState(jobId, jobUpdates);
    if (!useMockData) {
      const updated = await updateJob(jobId, jobUpdates);
      updateJobState(jobId, updated);
    }
  };

  const handleJobDrop = (jobId: number, targetDatetime: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const durationMs = new Date(job.scheduledEnd).getTime() - new Date(job.scheduledStart).getTime();
    const newStart = new Date(targetDatetime);
    const newEnd = new Date(newStart.getTime() + durationMs);

    handleJobUpdate(jobId, {
      scheduledStart: newStart.toISOString(),
      scheduledEnd: newEnd.toISOString(),
      status: "SCHEDULED"
    });

    setJobs(prevJobs => prevJobs.filter(j => j.id !== jobId));
  };

  const handleUnassignJob = (jobId: number) => {
    handleJobUpdate(jobId, {
      technicianId: null,
      status: "SCHEDULED",
    });
  };

  const isValidFilter = (status: any): status is JobStatus | "all" | "ACTIVE" | "INACTIVE" =>
    ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "all", "ACTIVE", "INACTIVE"].includes(status);

  const handleFilter = (status: StatCardKey | "ACTIVE" | "INACTIVE") =>
    isValidFilter(status) ? setFilter(status) : status === "total" && setFilter("all");

  const jobsInRange = jobs.filter((j) => {
    const [s, e] = [new Date(j.scheduledStart), new Date(j.scheduledEnd)];
    const [rs, re] = [new Date(dateRangeConfig.startDate), new Date(dateRangeConfig.endDate)];
    return e >= rs && s <= re;
  });

  const jobsForList = jobsInRange.filter((j) => {
    const tech = technicians.find((t) => t.id === j.technicianId);
    const matchStatus =
      filter === "all" ||
      filter === j.status ||
      (filter === "ACTIVE" && tech?.status === "ACTIVE") ||
      (filter === "INACTIVE" && tech?.status === "INACTIVE");
    const low = searchTerm.toLowerCase();
    const matchSearch =
      j.title?.toLowerCase().includes(low) ||
      j.customerName?.toLowerCase().includes(low) ||
      `${j.technicianFirstName} ${j.technicianLastName}`.toLowerCase().includes(low);
    return matchStatus && matchSearch;
  });

  const stats = {
    total: jobsInRange.length,
    IN_PROGRESS: jobsInRange.filter((j) => j.status === "IN_PROGRESS").length,
    COMPLETED: jobsInRange.filter((j) => j.status === "COMPLETED").length,
    SCHEDULED: jobsInRange.filter((j) => j.status === "SCHEDULED").length,
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 overflow-auto">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout
                useMockData={useMockData}
                stats={stats}
                jobsForGanttChart={jobsForList}
                jobsForJobList={jobsForList}
                technicians={technicians}
                filter={filter}
                searchTerm={searchTerm}
                onFilter={handleFilter}
                onSearchChange={setSearchTerm}
                dateRangeConfig={dateRangeConfig}
                onDateRangeChange={setDateRangeConfig}
                onJobUpdate={handleJobUpdate}
                onJobSelect={() => {}}
                selectedJob={null}
                onJobDrop={handleJobDrop}
                onUnassignJob={handleUnassignJob}
              />
            }
          />

          <Route path="/jobs" element={<JobList jobs={jobsForList} globalSearchTerm={searchTerm} onJobSelect={() => {}} dateRangeConfig={dateRangeConfig} onUnassignJob={handleUnassignJob} />} />
          <Route path="/jobs/:id" element={<JobDetailWrapper jobs={jobs} technicians={technicians} />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/patroller-status" element={<PatrollerStatusPage />} />
          <Route path="/resource-availability" element={<ResourceAvailabilityPage />} />
          <Route path="/route-assignment" element={<RouteAssignmentRoster />} />
          <Route path="/planned-vs-actual" element={<PlannedVsActualRouteViewer />} />
          <Route path="/gps-map" element={<LiveGPSTrackingView />} />
          <Route path="/route-creation" element={<RouteCreationPage />} />
          <Route path="/user-role-management" element={<RoleManagement />} />
          <Route path="/user-role-management/:id" element={<UserRoleManagement />} />
          <Route path="/individual-performance" element={<IndividualPerformance />} />
          <Route path="/job-tracking" element={<JobTrackingPage />} />
          <Route path="/workforce-activity" element={<WorkforceActivityMonitor />} />
          <Route path="/live-ops-history" element={<LiveOpsHistoryTrends />} />
          <Route path="/job-upload" element={<FileUploadPage open={true} onClose={() => {}} />} />
          <Route path="/supervisor-approval" element={<SupervisorApproval />} />
          <Route path="/attendance-logs" element={<AttendanceLogs />} />
          <Route path="/job-feedback" element={<JobFeedbackPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
