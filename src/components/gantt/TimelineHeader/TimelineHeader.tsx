import React from 'react';
import { formatDate } from '../../../utils/dateUtils';

interface TimelineHeaderProps {
  timeline: string[];
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({ timeline }) => {
  return (
    <div className="flex border-b-2 border-gray-200">
      <div className="w-64 p-3 font-semibold bg-gray-50">Job Details</div>
      {timeline.map(date => (
        <div key={date} className="w-24 p-3 text-center font-semibold bg-gray-50 border-l">
          {formatDate(date)}
        </div>
      ))}
    </div>
  );
};

export default TimelineHeader;