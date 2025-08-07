// src/data/individualPerformanceData.ts
export interface TechnicianData {
  name: string;
  jobsCompleted: number[];
  efficiency: number[];
  dates: string[];
}

export const technicianPerformance: TechnicianData[] = [
  {
    name: "John Doe",
    jobsCompleted: [5, 7, 6, 9, 8],
    efficiency: [70, 75, 80, 85, 90],
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    name: "Alice Smith",
    jobsCompleted: [4, 6, 7, 8, 6],
    efficiency: [65, 70, 72, 78, 80],
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    name: "Michael Scott",
    jobsCompleted: [6, 5, 8, 7, 9],
    efficiency: [60, 68, 75, 77, 85],
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
];
