export type Status = "Online" | "Offline" | "Idle";

export interface Patroller {
  id: number;
  name: string;
  status: Status;
  lastSeen: string;
  shift: "Day" | "Night";
  location: string;
  phone: string;
  gps: {
    lat: number;
    lng: number;
  };
  battery: number;
  dutyArea: string;
  email?: string;
}
