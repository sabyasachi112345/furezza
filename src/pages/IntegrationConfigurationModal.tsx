import React from "react";

type IntegrationConfigurationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const IntegrationConfigurationModal: React.FC<IntegrationConfigurationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="integration-modal-title"
    >
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2
          id="integration-modal-title"
          className="text-lg font-semibold mb-2"
        >
          Integration Configuration
        </h2>
        <p className="text-gray-600 mb-6">
          This section is under development.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            autoFocus
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationConfigurationModal;
