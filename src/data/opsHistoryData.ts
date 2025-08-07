// src/data/opsHistoryData.ts
import { OpsHistoryRecord } from "../types/opsHistory";

export const mockOpsHistoryData: OpsHistoryRecord[] = [
  {
    id: 1,
    technician: "Alice",
    operation: "Meter Install",
    timestamp: "2025-07-25 10:00",
    result: "Success",
  },
  {
    id: 2,
    technician: "Bob",
    operation: "Transformer Check",
    timestamp: "2025-07-25 09:30",
    result: "Failure",
  },
  {
    id: 3,
    technician: "Carol",
    operation: "Grid Inspection",
    timestamp: "2025-07-25 08:45",
    result: "Success",
  },
  {
    id: 4,
    technician: "Dave",
    operation: "Fuse Replacement",
    timestamp: "2025-07-25 08:00",
    result: "Success",
  },
];
