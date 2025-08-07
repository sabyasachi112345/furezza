import axios from 'axios';
import { Job, Technician, JobUpdateRequest } from '../types';
import React, { useEffect  } from 'react';
import { Stomp, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const BASE_URL = 'http://localhost:8080/api';
const BASE_WS_URL = 'http://localhost:8080';

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get<Job[]>(`${BASE_URL}/jobs`);
  return response.data;
};

export const fetchTechnicians = async (): Promise<Technician[]> => {
    try {
      const response = await fetch(`${BASE_URL}/users/technicians`);
      if (!response.ok) throw new Error('Failed to fetch technicians');
  
      const data = await response.json();
  
      // Add `name` field on UI side
      return data.map((tech: any) => ({
        ...tech,
        name: `${tech.firstName} ${tech.lastName}`,
      }));
    } catch (error) {
      console.error('Error fetching technicians:', error);
      return [];
    }
  };


  export const updateJob = async (
    jobId: number,
    update: JobUpdateRequest
  ): Promise<Job> => {
    const response = await axios.put<Job>(`${BASE_URL}/jobs/${jobId}`, update);
    return response.data;
  };



  export function useJobUpdates(setJobs: React.Dispatch<React.SetStateAction<Job[]>>) {
    useEffect(() => {
      const socket = new SockJS(`${BASE_WS_URL}/ws`);
      const stompClient = Stomp.over(socket);
  
      stompClient.connect({}, () => {
        stompClient.subscribe('/topic/jobUpdates', (message: IMessage) => {
          const updatedJob: Job = JSON.parse(message.body);
          // console.log(message.body);
          setJobs(prev => {
            const index = prev.findIndex(j => j.id === updatedJob.id);
            if (index !== -1) {
              const copy = [...prev];
              copy[index] = updatedJob;
              return copy;
            }
            return [...prev, updatedJob];
          });
        });
      });
  
      return () => stompClient.disconnect();
    }, [setJobs]);
  }
  