import { SupervisorApprovalRecord } from "../types/supervisor";

export const dummyApprovals: SupervisorApprovalRecord[] = [
  {
    id: 1,
    technician: "John Doe",
    date: "2025-07-24",
    type: "Leave Request",
    reason: "Medical appointment",
    status: "Pending",
  },
  {
    id: 2,
    technician: "Jane Smith",
    date: "2025-07-22",
    type: "Shift Change",
    reason: "Family commitment",
    status: "Pending",
  },
  {
    id: 3,
    technician: "Alex Johnson",
    date: "2025-07-20",
    type: "Leave Request",
    reason: "Personal leave",
    status: "Pending",
  },
];
