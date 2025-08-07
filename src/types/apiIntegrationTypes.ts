export interface ApiIntegration {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  status: "active" | "inactive";
}
