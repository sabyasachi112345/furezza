// src/pages/ApiIntegrationPage.tsx
import React, { useState } from "react";
import IntegrationConfigurationModal from "../components/IntegrationConfigurationModal";

const ApiIntegrationPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">API Integration</h1>
      <p className="text-gray-600 mb-6">
        Configure your OSS, BSS, ERP, GIS, and other system integrations.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
      >
        Configure Integration
      </button>

      <IntegrationConfigurationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApiIntegrationPage;
