export interface  {
  id: number;
  title: string;
  assignedTo: string;
  location: string;
  updatedAt: string;
  status: "Pending" | "In Progress" | "Completed";
  latitude: number;
  longitude: number;
}
