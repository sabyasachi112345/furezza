import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Job, DateRangeConfig } from '../../../types';
import JobCard from '../JobCard/JobCard';
import Tooltip from '../../Tooltip';
import { formatDate } from '../../../utils/helpers';

interface JobListProps {
  jobs: Job[];
  globalSearchTerm?: string;
  onJobClick?: (job: Job) => void;
  onJobSelect: (job: Job | null) => void;
  className?: string;
  dateRangeConfig: DateRangeConfig;
  onUnassignJob?: (jobId: number) => void; // <- add this
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  globalSearchTerm,
  onJobClick,
  onJobSelect,
  dateRangeConfig,
  className = '',
}) => {
  const navigate = useNavigate();
  const safeSearchTerm = globalSearchTerm?.toLowerCase() ?? '';
  const { startDate, endDate, timeWindow } = dateRangeConfig;

  const buildDateTimeFromISO = (isoDateString: string, hour: number): Date => {
    const date = new Date(isoDateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0, 0);
  };

  const startDateTime = buildDateTimeFromISO(startDate, timeWindow.startHour);
  const endDateTime = buildDateTimeFromISO(endDate, timeWindow.endHour);

  const filteredJobs = jobs
    .filter(job => {
      const jobStart = new Date(job.scheduledStart);
      const jobEnd = new Date(job.scheduledEnd);
      return jobEnd >= startDateTime && jobStart <= endDateTime;
    })
    .filter(job =>
      job.title.toLowerCase().includes(safeSearchTerm) ||
      `${job.technicianFirstName} ${job.technicianLastName}`.toLowerCase().includes(safeSearchTerm) ||
      job.customerName.toLowerCase().includes(safeSearchTerm)
    );

  const handleJobClick = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };
  console.log('Jobs in list:', jobs.map(j => j.id));
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    onDragOver={e => e.preventDefault()}
    onDrop={e => {
      const jobId = parseInt(e.dataTransfer.getData('jobId'), 10);
      if (!isNaN(jobId) && onUnassignJob) {
        onUnassignJob(jobId);
      }
    }}>
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className="w-full cursor-pointer"
            onClick={() => handleJobClick(job.id)}
          >
            <Tooltip
              content={
                <div className="text-sm">
                  <div><strong>{job.title}</strong></div>
                  <div>Start: {formatDate(job.scheduledStart)}</div>
                  <div>End: {formatDate(job.scheduledEnd)}</div>
                  <div>Status: {job.status}</div>
                </div>
              }
              triggerClassName="w-full h-full block"
            >
              <JobCard job={job} onJobClick={onJobClick} />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
