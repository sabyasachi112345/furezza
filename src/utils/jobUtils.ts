import { Job, JobStatus, JobPriority, JobFilters, TechnicianJobGroup } from '../types';
import { STATUS_COLORS, PRIORITY_COLORS } from './constants';

export const getStatusColor = (status: JobStatus): string => {
  return STATUS_COLORS[status] || STATUS_COLORS.default;
};

export const getPriorityColor = (priority: JobPriority): string => {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS.default;
};

export const filterJobs = (jobs: Job[], filters: JobFilters): Job[] => {
  return jobs.filter(job => {
    const matchesFilter = filters.status === 'all' || job.status === filters.status;
    const matchesSearch = 
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      `${job.technicianFirstName} ${job.technicianLastName}`.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
};

export const getJobsByStatus = (jobs: Job[], status: JobStatus): Job[] => {
  return jobs.filter(job => job.status === status);
};


/**
 * Calculates the number of days a job spans over the provided timeline.
 * 
 * @param startDate - Job's start date in 'YYYY-MM-DD' format
 * @param endDate - Job's end date in 'YYYY-MM-DD' format
 * @param timeline - Array of dates in 'YYYY-MM-DD' format
 * @returns The number of timeline days the job covers
 */
export const calculateJobSpan = (startDate: string, endDate: string, timeline: string[]): number => {
  const startIndex = timeline.findIndex(date => date === startDate);
  const endIndex = timeline.findIndex(date => date === endDate);

  if (startIndex === -1 || endIndex === -1) {
    return 1; // fallback to span of 1 if dates not found
  }

  return endIndex - startIndex + 1;
};


export const addDays = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};


interface TimeWindow {
  startHour: number; // e.g., 8 for 8 AM
  endHour: number;   // e.g., 17 for 5 PM
}

interface TimelineSlot {
  datetime: string; // ISO timestamp
  day: string;      // 'YYYY-MM-DD'
  hour: number;     // 0–23
  minute: number;   // 0–59
}

export const generateTimeline = (
  startDate: string,
  endDate: string,
  startHour: number,
  endHour: number,
  intervalMinutes: number
): TimelineSlot[] => {
  const timeline: TimelineSlot[] = [];

  const current = new Date(startDate);
  const last = new Date(endDate);

  // normalize both to midnight for accurate date iteration
  current.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  while (current < last || current.toDateString() === last.toDateString()) {
    const dateStr = current.toISOString().slice(0, 10); // 'YYYY-MM-DD'

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const slotDate = new Date(current);
        slotDate.setHours(hour, minute, 0, 0);

        timeline.push({
          datetime: slotDate.toISOString(),
          day: dateStr,
          hour,
          minute
        });
      }
    }

    // move to next day
    current.setDate(current.getDate() + 1);
  }

  return timeline;
};

export const groupJobsByTechnician = (jobs: Job[]): TechnicianJobGroup[] => {
  const groups: { [key: string]: Job[] } = {};

  jobs.forEach(job => {
    if (!groups[job.technicianId]) {
      groups[job.technicianId] = [];
    }
    groups[job.technicianId].push(job);
  });

  return Object.keys(groups).map(technician => ({
    technician,
    jobs: groups[technician]
  }));
};