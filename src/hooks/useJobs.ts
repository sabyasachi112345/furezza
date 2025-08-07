import { useState, useCallback } from 'react';
import { Job, JobFilters } from '../types';
import { MOCK_JOBS } from '../data/mockData';
import { filterJobs } from '../utils/jobUtils';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [filters, setFilters] = useState<JobFilters>({
    status: 'all',
    searchTerm: ''
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = filterJobs(jobs, filters);

  const updateJob = useCallback((jobId: number, updates: Partial<Job>) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, ...updates } : job
      )
    );
  }, []);

  const updateJobDates = useCallback((jobId: number, startDate: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === jobId) {
          const newEndDate = new Date(new Date(startDate).getTime() + (job.duration * 24 * 60 * 60 * 1000));
          return {
            ...job,
            startDate,
            endDate: newEndDate.toISOString().split('T')[0]
          };
        }
        return job;
      })
    );
  }, []);

  const updateFilters = useCallback((newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    jobs,
    filteredJobs,
    filters,
    selectedJob,
    setSelectedJob,
    updateJob,
    updateJobDates,
    updateFilters
  };
};