// src/components/layout/DashboardLayout.tsx
import React from 'react';
import Header from '../common/Header';
import GanttChart from '../gantt/GanttChart';
import JobList from '../jobs/JobList';
import MapView from '../map/MapView';
import JobDetailModal from '../jobs/JobDetailModal';
import { Job, Technician, JobStatus, StatCardKey, DateRangeConfig } from '../../types';

interface Props {
  useMockData: boolean;
  stats: {
    total: number;
    IN_PROGRESS: number;
    COMPLETED: number;
    SCHEDULED: number;
    onUnassignJob?: (jobId: number) => void; // <-- Added for unassignment
  };
  jobsForGanttChart: Job[];
  jobsForJobList: Job[];
  technicians: Technician[];
  filter: JobStatus | 'all' | 'ACTIVE' | 'INACTIVE';
  searchTerm: string;
  onFilter: (status: StatCardKey | 'ACTIVE' | 'INACTIVE') => void;
  onSearchChange: (term: string) => void;
  dateRangeConfig: DateRangeConfig;
  onDateRangeChange: (config: DateRangeConfig) => void;
  onJobUpdate: (jobIdOrJob: number | Job, updates?: Partial<Job>) => void;
  onJobSelect: (job: Job | null) => void;
  selectedJob: Job | null;
  onJobDrop: (jobId: number, targetDatetime: string) => void;
}

const DashboardLayout: React.FC<Props> = ({
  useMockData,
  stats,
  jobsForGanttChart,
  jobsForJobList,
  technicians,
  filter,
  searchTerm,
  onFilter,
  onSearchChange,
  dateRangeConfig,
  onDateRangeChange,
  onJobUpdate,
  onJobSelect,
  selectedJob,
  onJobDrop,
  onUnassignJob
}) => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-y-auto">
      {useMockData && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm text-center">
          ⚠️ Backend not reachable. Using mock data.
        </div>
      )}

      <Header 
        stats={{ ...stats, activeFilter: filter }}
        jobs={jobsForGanttChart}
        technicians={technicians}
        onFilter={onFilter}
        activeFilter={filter}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        dateRangeConfig={dateRangeConfig}
        onDateRangeChange={onDateRangeChange}
      />

      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-4 min-h-0">
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="bg-white rounded-lg shadow-sm border flex flex-col" style={{ height: '50%' }}>
            <div className="flex-1 p-0 overflow-auto min-h-0">
              <GanttChart
                jobs={jobsForGanttChart}
                technicians={technicians}
                filter={filter}
                onJobUpdate={onJobUpdate}
                onJobSelect={onJobSelect}
                onJobDrop={onJobDrop}
                globalSearchTerm={searchTerm}
                dateRangeConfig={dateRangeConfig}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0" style={{ height: '50%' }}>
            <div className="bg-white rounded-lg shadow-sm border flex flex-col min-h-0">
              <div className="flex-1 min-h-0 overflow-hidden">
                <MapView
                  jobs={jobsForJobList}
                  onJobSelect={onJobSelect}
                  globalSearchTerm={searchTerm}
                  dateRangeConfig={dateRangeConfig}
                  // onUnassignJob={onUnassignJob} // <-- Added for unassignment
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border flex flex-col min-h-0">
              <div className="flex-1 p-4 overflow-auto min-h-0">
                <JobList
                  jobs={jobsForJobList}
                  globalSearchTerm={searchTerm}
                  onJobSelect={onJobSelect}
                  dateRangeConfig={dateRangeConfig}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => onJobSelect(null)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;