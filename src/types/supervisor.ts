export interface SupervisorApprovalRecord {
  id: number;
  technician: string;
  date: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}
