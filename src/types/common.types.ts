export type TabType = 'gantt' | 'jobs' | 'map';

export interface TabItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  isActive?: boolean;
  onClick?: () => void; 
}

export interface Technician {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  name: string; // Full name
  phone: string;
  role: 'TECHNICIAN';
  status: 'ACTIVE' | 'INACTIVE';
  assignedJobs: number[];
  icon?: string; // Optional: icon based on status
}


export type DateRangeView = 'DAY' | 'WEEK' | 'MONTH' | 'CUSTOM';

export interface TimeWindow {
  startHour: number; // e.g., 8
  endHour: number;   // e.g., 18
}

export interface DateRangeConfig {
  view: DateRangeView;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  timeWindow: TimeWindow;
  selectedDate: string;
  intervalMinutes:number;
}
