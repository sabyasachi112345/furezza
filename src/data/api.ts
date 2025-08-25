import axios from 'axios';
import { Job, Technician, JobUpdateRequest } from '../types';
import React, { useEffect } from 'react';
import { Stomp, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const BASE_URL = 'http://localhost:8080/api';
const BASE_WS_URL = 'http://localhost:8080';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    throw error;
  }
);

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get<Job[]>('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchTechnicians = async (): Promise<Technician[]> => {
  try {
    const response = await api.get<any[]>('/users/technicians');
    const data = response.data;

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
  try {
    const response = await api.put<Job>(`/jobs/${jobId}`, update);
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export function useJobUpdates(setJobs: React.Dispatch<React.SetStateAction<Job[]>>) {
  useEffect(() => {
    let stompClient: any = null;

    const connectWebSocket = () => {
      try {
        const socket = new SockJS(`${BASE_WS_URL}/ws`);
        stompClient = Stomp.over(socket);
        
        stompClient.connect({}, () => {
          stompClient.subscribe('/topic/jobUpdates', (message: IMessage) => {
            try {
              const updatedJob: Job = JSON.parse(message.body);
              setJobs(prev => {
                const index = prev.findIndex(j => j.id === updatedJob.id);
                if (index !== -1) {
                  const copy = [...prev];
                  copy[index] = updatedJob;
                  return copy;
                }
                return [...prev, updatedJob];
              });
            } catch (parseError) {
              console.error('Error parsing WebSocket message:', parseError);
            }
          });
        }, (error: any) => {
          console.error('WebSocket connection error:', error);
        });
      } catch (error) {
        console.error('WebSocket initialization error:', error);
      }
    };

    connectWebSocket();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [setJobs]);
}