import React from 'react';
import { Search } from 'lucide-react';

interface JobSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

export const JobSearch: React.FC<JobSearchProps> = ({
  searchTerm,
  onSearchChange,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 border rounded-md w-full"
      />
    </div>
  );
};

export default JobSearch;