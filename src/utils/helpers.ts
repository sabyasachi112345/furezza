import { Job, DateRangeConfig } from '../types';
import { getDateRange } from './dateUtils';

export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  
  export  const capitalizeStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  export const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'ACTIVE': return '✅';
      case 'INACTIVE': return '⚪';
      case 'BUSY': return '⛔';
      case 'ON_LEAVE': return '🏖️';
      default: return '❓';
    }
  };

  export function filterJobsByDateRange(jobs: Job[], config: DateRangeConfig): Job[] {
    const { start, end } = getDateRange(config);
    return jobs.filter(job => {
      const jobStart = new Date(job.scheduledStart);
      return jobStart >= start && jobStart <= end;
    });
  }