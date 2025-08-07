import { DateRangeConfig } from '../types';

export const generateTimeline = (baseDate: string = '2025-06-08', daysBefore: number = 2, daysAfter: number = 10): string[] => {
  const dates: string[] = [];
  const today = new Date(baseDate);
  
  for (let i = -daysBefore; i < daysAfter; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatDateLong = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const calculateDateDifference = (startDate: string, endDate: string): number => {
  return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
};

export function getDateRange(config: DateRangeConfig): { start: Date; end: Date } {
  return {
    start: new Date(config.startDate),
    end: new Date(config.endDate),
  };
}