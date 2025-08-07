export type JobPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type StatKey = 'total' | 'IN_PROGRESS' | 'COMPLETED';
export type JobStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
export type TechnicianStatus = 'ACTIVE' | 'INACTIVE';

export type StatCardKey = StatKey | JobStatus | TechnicianStatus;

export interface TimeTracking {
  started: boolean;
  elapsed: number;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  customerId: number;
  customerName: string;
  technicianId: number;
  technicianFirstName: string;
  technicianLastName: string;
  categoryId: number;
  categoryName: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  scheduledStart: string;
  scheduledEnd: string;
  actualStart: string | null;
  actualEnd: string | null;
  estimatedDuration: number;
  locationAddress: string;
  locationLatitude: number;
  locationLongitude: number;
  notes: string;
  createdById: number;
  createdByFirstName: string;
  createdByLastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  status: JobStatus | 'all';
  searchTerm: string;
}


export type FilterType = 'all' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';

export interface DragDropHandlers {
  onDragStart: (e: React.DragEvent, job: Job) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetDate: string) => void;
}

export interface TechnicianJobGroup {
  technician: string;
  jobs: Job[];
}

export type JobUpdateRequest = Partial<
  Pick<
    Job,
    | 'title'
    | 'description'
    | 'technicianId'
    | 'categoryId'
    | 'priority'
    | 'status'
    | 'scheduledStart'
    | 'scheduledEnd'
    | 'actualStart'
    | 'actualEnd'
    | 'estimatedDuration'
    | 'locationAddress'
    | 'locationLatitude'
    | 'locationLongitude'
    | 'notes'
  >
>;
