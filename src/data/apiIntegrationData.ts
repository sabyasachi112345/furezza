import { ApiIntegration } from "../types/apiIntegrationTypes";

export const getApis = async (): Promise<ApiIntegration[]> => {
  // Mock API call - Replace with actual API logic
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "OSS System",
          description: "Operations Support System integration.",
          endpoint: "https://api.example.com/oss",
          status: "active",
        },
        {
          id: "2",
          name: "BSS Platform",
          description: "Billing Support System.",
          endpoint: "https://api.example.com/bss",
          status: "inactive",
        },
        {
          id: "3",
          name: "GIS Connector",
          description: "Geographic Information System integration.",
          endpoint: "https://api.example.com/gis",
          status: "active",
        },
        {
          id: "4",
          name: "ERP Module",
          description: "Enterprise Resource Planning API.",
          endpoint: "https://api.example.com/erp",
          status: "active",
        },
      ]);
    }, 1000)
  );
};
