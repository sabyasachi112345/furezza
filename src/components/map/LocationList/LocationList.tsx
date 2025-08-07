import React from 'react';
import { MapPin, Clock, User, Navigation } from 'lucide-react';
import type { Job, JobStatus } from '../../../types';

interface LocationListProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
}

export const LocationList: React.FC<LocationListProps> = ({ jobs, onJobSelect }) => {
  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'SCHEDULED':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: JobStatus): string => {
    switch (status) {
      case 'COMPLETED':
        return 'Completed';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'SCHEDULED':
        return 'Scheduled';
      default:
        return 'Unknown';
    }
  };

  const handleGetDirections = (job: Job): void => {
    // In a real app, this would open the device's default maps app or Google Maps
    const encodedAddress = encodeURIComponent(job.locationAddress);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    
    // For demo purposes, we'll show an alert. In production, use:
    // window.open(mapsUrl, '_blank');
    alert(`Getting directions to: ${job.locationAddress}`);
  };

  const handleJobClick = (job: Job): void => {
    onJobSelect(job);
  };

  const formatTimeTracked = (hours: number): string => {
    if (hours === 0) return '0h';
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours % 1 === 0) return `${hours}h`;
    return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    // Sort by status priority: in-progress > scheduled > completed
    const statusPriority = {
      'IN_PROGRESS': 3,
      'SCHEDULED': 2,
      'COMPLETED': 1
    };
    
    const aPriority = statusPriority[a.status] || 0;
    const bPriority = statusPriority[b.status] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // If same status, sort by start date
    return new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime();
  });

  if (jobs.length === 0) {
    return (
      <div className="mt-6 p-8 text-center bg-gray-50 rounded-lg">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Jobs Found</h3>
        <p className="text-gray-500">No jobs match your current filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Job Locations ({jobs.length})
        </h3>
        <div className="text-sm text-gray-500">
          Click on any job to view details
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedJobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer border border-transparent hover:border-gray-200"
            onClick={() => handleJobClick(job)}
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Status Indicator */}
              <div className="flex-shrink-0">
                <div 
                  className={`w-4 h-4 ${getStatusColor(job.status)} rounded-full ring-2 ring-white shadow-sm`}
                  title={getStatusText(job.status)}
                />
                {job.status === 'IN_PROGRESS' && (
                  <div className="w-4 h-4 bg-blue-400 rounded-full absolute animate-ping opacity-75 -ml-4" />
                )}
              </div>

              {/* Job Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{job.locationAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>`${job.technicianFirstName} ${job.technicianLastName}`</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              {/* Status Badge */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)} text-white`}>
                {getStatusText(job.status)}
              </div>

              {/* Get Directions Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetDirections(job);
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Get directions"
              >
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Total: <span className="font-semibold">{jobs.length} jobs</span>
            </span>

          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{jobs.filter(j => j.status === 'IN_PROGRESS').length} active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>{jobs.filter(j => j.status === 'SCHEDULED').length} scheduled</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{jobs.filter(j => j.status === 'COMPLETED').length} completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;