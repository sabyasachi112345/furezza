// import React from 'react';
// import type { Job, Technician } from '../../../types';
// import Tooltip from '../../Tooltip';
// import { formatDate } from '../../../utils/helpers';

// interface TimelineSlot {
//   datetime: string;
//   day: string;
//   hour: number;
//   minute: number;
// }

// interface GanttRowProps {
//   technician: Technician;
//   jobs: Job[];
//   timeline: TimelineSlot[];
//   columnWidth: number;
//   onJobDrop: (jobId: number, targetDate: string) => void;
//   onJobClick: (job: Job) => void;
//   onJobUpdate: (jobId: number, updates: Partial<Job>) => void;
// }

// const GanttRow: React.FC<GanttRowProps> = ({
//   technician,
//   jobs,
//   timeline,
//   columnWidth,
//   onJobDrop,
//   onJobClick,
//   onJobUpdate
// }) => {
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'COMPLETED': return 'bg-green-500';
//       case 'IN_PROGRESS': return 'bg-blue-500';
//       case 'SCHEDULED': return 'bg-yellow-500';
//       default: return 'bg-gray-500';
//     }
//   };



//   const handleDragStart = (e: React.DragEvent, job: Job) => {
//     e.dataTransfer.setData('jobId', job.id.toString());
//   };

//   const handleDragOver = (e: React.DragEvent) => e.preventDefault();

//   const handleDrop = (e: React.DragEvent, targetDatetime: string) => {
//     e.preventDefault();
//     const jobId = parseInt(e.dataTransfer.getData('jobId'), 10);
//     console.log('GanttRow drop:', jobId, targetDatetime); 
//     if (jobId) {
//       onJobDrop(jobId, targetDatetime);
//     }
//   };

//   return (
//     <div className="flex border-b border-gray-100 hover:bg-gray-50 h-12">
//       {/* Technician Name */}
//       <div className="w-64 p-3 border-r font-semibold text-sm shrink-0 sticky left-0 z-10 bg-white">
//           <div className="flex items-start space-x-2">
//             <div
//               className={`h-3 w-3 rounded-full mt-1 ${
//                 technician.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
//               }`}
//             />
//             <div className="flex flex-col text-sm leading-tight">
//               <div className="font-medium">
//                 {technician.firstName} {technician.lastName} <span>{technician.role}</span>
//               </div>
//               <div className="text-xs text-blue-600 font-semibold">
//                 Jobs for the view: {jobs.length || 0}
//               </div>
//             </div>
//           </div>
//         </div>

//       {/* Timeline Grid */}
//       <div className="relative overflow-x-auto w-full">
//          <div className="flex w-max">
//         {timeline.map(slot => (
//           <div
//             key={slot.datetime}
//             className="h-11 border-l border-gray-200"
//             style={{
//               width: `${columnWidth}px`,
//               minWidth: `${columnWidth}px`,
//               boxSizing: 'border-box'
//             }}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, slot.datetime)}
//           />
//         ))}

//         {/* Job Blocks */}
//         {jobs.map(job => {
//           const startIndex = timeline.findIndex(slot => 
//             new Date(slot.datetime).getTime() >= new Date(job.scheduledStart).getTime()
//           );
          
//           const endIndex = timeline.findIndex(slot => 
//             new Date(slot.datetime).getTime() >= new Date(job.scheduledEnd).getTime()
//           );
//           // console.log('Rendering job:', job.id, job.scheduledStart, job.scheduledEnd, startIndex, endIndex);

//           if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) return null;

//           const span = endIndex - startIndex;

//           return (
//             <Tooltip
//               key={job.id}
//               triggerClassName={`absolute top-2 h-8 ${getStatusColor(job.status)} border-black border-2 rounded cursor-move transition-opacity duration-200`}
//               triggerStyle={{
//                 left: `${startIndex * columnWidth}px`,
//                 width: `${(span * columnWidth) / 2}px`,
//                 boxSizing: 'border-box'
//               }}
//               content={
//                 <div className="p-2 bg-gray-800 text-white rounded-lg shadow-lg">
//                   <div className="font-bold text-sm mb-1">{job.title}</div>
//                   <div className="text-xs">Start: {formatDate(job.scheduledStart)}</div>
//                   <div className="text-xs">End: {formatDate(job.scheduledEnd)}</div>
//                   <div className="text-xs">Status: {job.status}</div>
//                   <div className="text-xs">Technician: {technician.firstName} {technician.lastName}</div>
//                   {job.status === 'SCHEDULED' && job.technicianId && (
//                     <div className="mt-2">
//                       <button onClick={() => onJobUpdate(job.id, { status: 'IN_PROGRESS' })} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded">Dispatch</button>
//                     </div>
//                   )}
//                 </div>
//               }
//             >
//               <div
//                 className="w-full h-full"
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, job)}
//                 onClick={() => onJobClick(job)}
//                 onDragOver={handleDragOver}
//                 onDrop={(e) => handleDrop(e, job.scheduledStart)}
//               >
//                 <div className="text-xs text-white p-1 truncate">
//                   {job.title}
//                 </div>
//               </div>
//             </Tooltip>
//           );
//         })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GanttRow;






import React from 'react';
import type { Job, Technician } from '../../../types';
import Tooltip from '../../Tooltip';
import { formatDate } from '../../../utils/helpers';

interface TimelineSlot {
  datetime: string;
  day: string;
  hour: number;
  minute: number;
}

interface GanttRowProps {
  technician: Technician;
  jobs: Job[];
  timeline: TimelineSlot[];
  columnWidth: number;
  onJobDrop: (jobId: number, targetDate: string) => void;
  onJobClick: (job: Job) => void;
  onJobUpdate: (jobId: number, updates: Partial<Job>) => void;
  onJobUnassign: (jobId: number) => void; // NEW: Unassign job to footer
}

const GanttRow: React.FC<GanttRowProps> = ({
  technician,
  jobs,
  timeline,
  columnWidth,
  onJobDrop,
  onJobClick,
  onJobUpdate,
  onJobUnassign
}) => {
  const getStatusColor = (status: string): string => {
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

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    e.dataTransfer.setData('jobId', job.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, targetDatetime: string) => {
    e.preventDefault();
    const jobId = parseInt(e.dataTransfer.getData('jobId'), 10);
    console.log('GanttRow drop:', jobId, targetDatetime);
    if (jobId) {
      onJobDrop(jobId, targetDatetime);
    }
  };

  return (
    <div className="flex border-b border-gray-100 hover:bg-gray-50 h-12">
      {/* Technician Name */}
      <div className="w-64 p-3 border-r font-semibold text-sm shrink-0 sticky left-0 z-10 bg-white">
        <div className="flex items-start space-x-2">
          <div
            className={`h-3 w-3 rounded-full mt-1 ${
              technician.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          <div className="flex flex-col text-sm leading-tight">
            <div className="font-medium">
              {technician.firstName} {technician.lastName}{' '}
              <span>{technician.role}</span>
            </div>
            <div className="text-xs text-blue-600 font-semibold">
              Jobs for the view: {jobs.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="relative overflow-x-auto w-full">
        <div className="flex w-max">
          {timeline.map((slot) => (
            <div
              key={slot.datetime}
              className="h-11 border-l border-gray-200"
              style={{
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                boxSizing: 'border-box'
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slot.datetime)}
            />
          ))}

          {/* Job Blocks */}
          {jobs.map((job) => {
            const startIndex = timeline.findIndex(
              (slot) =>
                new Date(slot.datetime).getTime() >=
                new Date(job.scheduledStart).getTime()
            );

            const endIndex = timeline.findIndex(
              (slot) =>
                new Date(slot.datetime).getTime() >=
                new Date(job.scheduledEnd).getTime()
            );

            if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex)
              return null;

            const span = endIndex - startIndex;

            return (
              <Tooltip
                key={job.id}
                triggerClassName={`absolute top-2 h-8 ${getStatusColor(
                  job.status
                )} border-black border-2 rounded cursor-move transition-opacity duration-200`}
                triggerStyle={{
                  left: `${startIndex * columnWidth}px`,
                  width: `${(span * columnWidth) / 2}px`,
                  boxSizing: 'border-box'
                }}
                content={
                  <div className="p-2 bg-gray-800 text-white rounded-lg shadow-lg">
                    <div className="font-bold text-sm mb-1">{job.title}</div>
                    <div className="text-xs">
                      Start: {formatDate(job.scheduledStart)}
                    </div>
                    <div className="text-xs">
                      End: {formatDate(job.scheduledEnd)}
                    </div>
                    <div className="text-xs">Status: {job.status}</div>
                    <div className="text-xs">
                      Technician: {technician.firstName} {technician.lastName}
                    </div>

                    {/* Buttons */}
                    {job.status === 'SCHEDULED' && job.technicianId && (
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() =>
                            onJobUpdate(job.id, { status: 'IN_PROGRESS' })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        >
                          Dispatch
                        </button>
                        <button
                          onClick={() => onJobUnassign(job.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                        >
                          Unassign
                        </button>
                      </div>
                    )}
                  </div>
                }
              >
                <div
                  className="w-full h-full"
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onClick={() => onJobClick(job)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, job.scheduledStart)}
                >
                  <div className="text-xs text-white p-1 truncate">
                    {job.title}
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttRow;
