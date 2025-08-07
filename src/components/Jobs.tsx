// Jobs.tsx
import React, { useState } from 'react';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Network Repair', status: 'In Progress' },
    { id: 2, title: 'Cable Installation', status: 'Completed' },
    { id: 3, title: 'Maintenance Check', status: 'Scheduled' },
  ]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Jobs Overview</h2>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="p-3 border border-gray-200 rounded hover:bg-gray-50 transition"
          >
            <div className="font-medium">{job.title}</div>
            <div className="text-sm text-gray-500">Status: {job.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
