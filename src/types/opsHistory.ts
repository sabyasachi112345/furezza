// src/types/opsHistory.ts
export interface OpsHistoryRecord {
  id: number;
  technician: string;
  operation: string;
  timestamp: string;
  result: "Success" | "Failure";
}
