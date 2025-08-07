import { useCallback } from 'react';
import { Job } from '../types';

interface UseTimeTrackingProps {
  updateJob: (jobId: number, updates: Partial<Job>) => void;
}

export const useTimeTracking = ({ updateJob }: UseTimeTrackingProps) => {
  
  const toggleTimeTracking = useCallback((jobId: number, currentTracking: Job['timeTracking']) => {
    updateJob(jobId, {
      timeTracking: {
        ...currentTracking,
        started: !currentTracking.started
      }
    });
  }, [updateJob]);

  return {
    toggleTimeTracking
  };
};