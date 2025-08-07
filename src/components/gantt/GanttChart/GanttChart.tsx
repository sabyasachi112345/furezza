import React, { useRef, useMemo } from 'react';
import type { Job, Technician, DateRangeConfig } from '../../../types';
import GanttRow from '../GanttRow';
import { generateTimeline } from '../../../utils/jobUtils';


interface GanttChartProps {
  jobs: Job[];
  technicians: Technician[];
  onJobDrop: (jobId: number, targetDate: string) => void;
  onJobSelect: (job: Job) => void;
  onJobUpdate: (jobId: number, updates: Partial<Job>) => void;
  filter: string;
  globalSearchTerm?: string;
  dateRangeConfig: DateRangeConfig;
}

const GanttChart: React.FC<GanttChartProps> = ({
  jobs,
  technicians,
  onJobDrop,
  onJobSelect,
  onJobUpdate,
  filter,
  globalSearchTerm,
  dateRangeConfig
}) => {
  const ganttRef = useRef<HTMLDivElement>(null);

  const timeline = generateTimeline(
    dateRangeConfig.startDate,
    dateRangeConfig.endDate,
    dateRangeConfig.timeWindow.startHour,
    dateRangeConfig.timeWindow.endHour,
    60
  );

    const columnWidth = Math.max(30, Math.min(1400 / timeline.length, 60));
  const totalTimelineWidth = columnWidth * timeline.length;

  const groupedByDate = useMemo(() => {
    const map = new Map<string, Date[]>();
    timeline.forEach(slot => {
      const dateKey = new Date(slot.datetime).toDateString();
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(new Date(slot.datetime));
    });
    return Array.from(map.entries()).map(([date, slots]) => ({ date, slots }));
  }, [timeline]);

  const jobsByTechnician = jobs.reduce((acc, job) => {
    const techId = job.technicianId;
    if (!acc[techId]) acc[techId] = [];
    acc[techId].push(job);
    return acc;
  }, {} as Record<number, Job[]>);

  const filteredTechnicians = technicians.filter(technician => {
    const technicianJobs = jobsByTechnician[technician.id] || [];

    const matchesStatus =
      filter === 'all' ||
      (filter === 'ACTIVE' && technician.status === 'ACTIVE') ||
      (filter === 'INACTIVE' && technician.status === 'INACTIVE') ||
      (['SCHEDULED', 'IN_PROGRESS', 'COMPLETED'].includes(filter) &&
        technicianJobs.some(job => job.status === filter));

    const matchesSearch =
      `${technician.firstName} ${technician.lastName}`.toLowerCase().includes(globalSearchTerm?.toLowerCase() || '') ||
      technicianJobs.some(job =>
        job.title.toLowerCase().includes(globalSearchTerm?.toLowerCase() || '') ||
        job.customerName.toLowerCase().includes(globalSearchTerm?.toLowerCase() || '')
      );

    return matchesStatus && matchesSearch;
  });

  const handleJobDrop = (
    jobId: number,
    targetDatetime: string,
    newTechnicianId: number
  ) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
  
    const jobDuration =
      new Date(job.scheduledEnd).getTime() -
      new Date(job.scheduledStart).getTime();
  
    const newStart = new Date(targetDatetime);
    const newEnd = new Date(newStart.getTime() + jobDuration);
  
    const updates: Partial<Job> = {};
  
    if (job.technicianId !== newTechnicianId) {
      updates.technicianId = newTechnicianId;
    }
  
    if (new Date(job.scheduledStart).getTime() !== newStart.getTime()) {
      updates.scheduledStart = newStart.toISOString();
      updates.scheduledEnd = newEnd.toISOString();
    }
  
    if (Object.keys(updates).length > 0) {
      onJobUpdate(jobId, updates);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-0 h-full overflow-hidden">
      <div className="h-full overflow-auto" ref={ganttRef}>
        <div className="min-w-max" style={{ minWidth: `${totalTimelineWidth + 256}px` }}>
          {/* Sticky Header Container */}
          <div className="sticky top-0 z-30 bg-white">
            {/* Top Row: Technician label and Date groups */}
            <div className="flex border-b border-gray-300">
              <div className="w-64 min-w-[256px] bg-gray-100 border-r font-semibold text-sm p-2 sticky top-0 left-0 z-40">
                Technician
              </div>
              {groupedByDate.map(({ date, slots }) => (
                <div
                  key={date}
                  className="text-sm text-center font-bold border-r border-gray-300 bg-gray-100"
                  style={{ width: `${slots.length * columnWidth}px` }}
                >
                  {date}
                </div>
              ))}
            </div>

            {/* Second Row: Time slots */}
            <div className="flex border-b-2 border-gray-200 bg-white">
              <div className="w-64 min-w-[256px] p-3 bg-gray-50 border-r sticky top-[40px] left-0 z-30" />
              {timeline.map((slot, index) => {
                const isStartOfDay =
                  index === 0 || new Date(slot.datetime).getHours() === dateRangeConfig.timeWindow.startHour;
                return (
                  <div
                    key={slot.datetime}
                    className={`text-xs text-center font-medium border-l ${
                      isStartOfDay ? 'border-gray-400' : 'border-gray-200'
                    } flex items-center justify-center bg-white`}
                    style={{
                      width: `${columnWidth}px`,
                      minWidth: `${columnWidth}px`
                    }}
                  >
                    {new Date(slot.datetime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true
                    }).replace(' ', '')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technician Rows */}
          {filteredTechnicians.map(technician => (
            <GanttRow
            key={technician.id}
            technician={technician}
            jobs={jobsByTechnician[technician.id] || []}
            timeline={timeline}
            columnWidth={columnWidth}
            onJobDrop={(jobId, datetime) => handleJobDrop(jobId, datetime, technician.id)}
            onJobClick={onJobSelect}
            onJobUpdate={onJobUpdate}
          />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
