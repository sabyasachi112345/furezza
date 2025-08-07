import { AttendanceLog, LeaveRequest } from "../types/attendance";

export const dummyAttendanceLogs: AttendanceLog[] = [
  {
    id: 1,
    technician: "John Doe",
    date: "2025-07-24",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "Present",
  },
  {
    id: 2,
    technician: "Jane Smith",
    date: "2025-07-24",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
  },
  {
    id: 3,
    technician: "Alan Walker",
    date: "2025-07-24",
    checkIn: "10:00 AM",
    checkOut: "05:30 PM",
    status: "Leave",
  },
];

export const dummyLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    technician: "John Doe",
    fromDate: "2025-07-26",
    toDate: "2025-07-28",
    reason: "Medical",
    status: "Pending",
  },
  {
    id: 2,
    technician: "Jane Smith",
    fromDate: "2025-08-01",
    toDate: "2025-08-05",
    reason: "Vacation",
    status: "Approved",
  },
  {
    id: 3,
    technician: "Alan Walker",
    fromDate: "2025-07-20",
    toDate: "2025-07-22",
    reason: "Personal",
    status: "Rejected",
  },
];
