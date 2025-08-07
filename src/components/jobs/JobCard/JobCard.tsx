import React from 'react';
import { User, MapPin, Calendar } from 'lucide-react';
import type { Job } from '../../../types';
import { getPriorityColor, getStatusColor } from '../../../utils/jobUtils';

interface JobCardProps {
  job: Job;
  // onToggleTimer: (jobId: number) => void;
  onJobClick?: (job: Job) => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  // onToggleTimer,
  onJobClick,
  className = ''
}) => {
  const handleCardClick = () => {
    if (onJobClick) {
      onJobClick(job);
    }
  };

  return (
    <div 
      className={`border-l-4 ${getPriorityColor(job.priority)} bg-gray-50 p-4 rounded-r-lg cursor-pointer hover:bg-gray-100 transition-colors ${className}`}
      onClick={handleCardClick}
      // Added logic for drag and drop
      draggable={true}
      onDragStart={e => e.dataTransfer.setData('jobId', job.id.toString())}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              `${job.technicianFirstName} ${job.technicianLastName}`
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.customerName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(job.scheduledStart).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)} text-white`}>
            {job.status.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;