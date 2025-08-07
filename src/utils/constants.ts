import { Calendar, MapPin, Wrench } from 'lucide-react';
import { TabItem } from '../types';

export const TABS: TabItem[] = [
  { id: 'gantt', label: 'Gantt Chart', icon: Calendar },
  { id: 'jobs', label: 'Job List', icon: Wrench },
  { id: 'map', label: 'Map View', icon: MapPin }
];

export const STATUS_COLORS = {
  COMPLETED: 'bg-green-500',
  IN_PROGRESS: 'bg-blue-500',
  SCHEDULED: 'bg-yellow-500',
  default: 'bg-gray-500'
} as const;

export const PRIORITY_COLORS = {
  HIGH: 'border-red-500',
  MEDIUM: 'border-yellow-500',
  LOW: 'border-green-500',
  default: 'border-gray-500'
} as const;