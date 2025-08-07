export type Status = 'Active' | 'Unavailable';

export interface Technician {
  id: number;
  name: string;
  status: Status;
  tasksAssigned: number;
  lastShift?: 'Day' | 'Night' | '';
}
