import React from 'react';
import { MapPin } from 'lucide-react';
import type { Job, JobStatus, DateRangeConfig } from '../../../types';
import LocationList from '../LocationList/LocationList';
import Tooltip from '../../Tooltip';
import { formatDate } from '../../../utils/helpers';

interface MapViewProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  globalSearchTerm?: string;
  dateRangeConfig: DateRangeConfig; 
}

export const MapView: React.FC<MapViewProps> = ({
  jobs,
  onJobSelect,
  globalSearchTerm,
  dateRangeConfig, 
}) => {
  const getStatusColor = (status: JobStatus): string => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500';
      case 'IN_PROGRESS': return 'bg-blue-500';
      case 'SCHEDULED': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleGetDirections = () => {
    if (jobs.length < 2) return alert("Not enough jobs for routing");
    const origin = encodeURIComponent(jobs[0].locationAddress);
    const destination = encodeURIComponent(jobs[jobs.length - 1].locationAddress);
    const waypoints = jobs.slice(1, -1).map(job => encodeURIComponent(job.locationAddress)).join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
    window.open(url, '_blank');
  };

  const handleMarkerClick = (job: Job): void => {
    onJobSelect(job);
  };

  const safeSearchTerm = globalSearchTerm?.toLowerCase() ?? '';

  const { startDate, endDate, timeWindow } = dateRangeConfig;

  function buildDateTimeFromISO(isoDateString: string, hour: number): Date {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = date.getMonth(); // already 0-based
    const day = date.getDate();
    return new Date(year, month, day, hour, 0, 0);
  }

  const startDateTime = buildDateTimeFromISO(startDate, timeWindow.startHour);
  const endDateTime = buildDateTimeFromISO(endDate, timeWindow.endHour);

  const filteredJobs = jobs
  .filter(job => {
    const jobStart = new Date(job.scheduledStart);
    const jobEnd = new Date(job.scheduledEnd);
    return jobEnd >= startDateTime && jobStart <= endDateTime;
  })
  .filter(job =>
    job.title.toLowerCase().includes(safeSearchTerm) ||
    `${job.technicianFirstName} ${job.technicianLastName}`.toLowerCase().includes(safeSearchTerm) ||
    job.customerName.toLowerCase().includes(safeSearchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleGetDirections}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <MapPin className="h-4 w-4" />
          Get Directions
        </button>
      </div>

      {/* Map Container */}
      <div className="map-container bg-gray-100 h-96 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, index) => (
                <div key={index} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Streets */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 opacity-30"></div>
            <div className="absolute top-2/4 left-0 right-0 h-1 bg-gray-300 opacity-30"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300 opacity-30"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300 opacity-30"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-1 bg-gray-300 opacity-30"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300 opacity-30"></div>
          </div>

          {/* Markers */}
          {filteredJobs.map((job, index) => (
            <Tooltip
              key={job.id}
              content={
                <div className="text-sm">
                  <div><strong>{job.title}</strong></div>
                  <div>Start: {formatDate(job.scheduledStart)}</div>
                  <div>End: {formatDate(job.scheduledEnd)}</div>
                  <div>Status: {job.status}</div>
                </div>
              }
            >
              <div
                className={`map-marker absolute w-4 h-4 ${getStatusColor(job.status)} rounded-full border-2 border-white cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform shadow-md`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                  zIndex: 10
                }}
                onClick={() => handleMarkerClick(job)}
              >
                {job.status === 'IN_PROGRESS' && (
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                )}
              </div>
            </Tooltip>
          ))}

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
            <h4 className="text-sm font-semibold mb-2">Status Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div>Completed</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>In Progress</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div>Scheduled</div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="text-center z-10 bg-white p-6 rounded-lg shadow-md max-w-sm">
          <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Map View</h3>
          <p className="text-sm text-gray-600 mb-2">Click on markers to view job details</p>
          <div className="text-xs text-gray-500">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} displayed
          </div>
        </div>
      </div>

      {/* Location List */}
      <LocationList jobs={filteredJobs} onJobSelect={onJobSelect} />
    </div>
  );
};

export default MapView;