export interface ActivityData {
  id: number;
  name: string;
  lastActive: string;
  job: string;
  status: "Active" | "Idle" | "Off Duty";
}
