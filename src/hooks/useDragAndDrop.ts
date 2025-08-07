import { useState, useCallback } from 'react';
import { Job } from '../types';

interface UseDragAndDropProps {
  updateJobDates: (jobId: number, startDate: string) => void;
}

export const useDragAndDrop = ({ updateJobDates }: UseDragAndDropProps) => {
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, job: Job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetDate: string) => {
    e.preventDefault();
    if (draggedJob) {
      updateJobDates(draggedJob.id, targetDate);
      setDraggedJob(null);
    }
  }, [draggedJob, updateJobDates]);

  return {
    draggedJob,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
};