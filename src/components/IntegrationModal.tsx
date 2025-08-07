// IntegrationConfigForm.tsx
import React, { useState } from "react";

export interface IntegrationConfigData {
  name: string;
  type: string;
  config: string;
  attachments: File[];
}

interface IntegrationConfigFormProps {
  onSubmit: (data: IntegrationConfigData) => void;
  onClose: () => void;
}

const IntegrationModal: React.FC<IntegrationConfigFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [config, setConfig] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || !config) {
      alert("All fields are required.");
      return;
    }
    onSubmit({ name, type, config, attachments });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="integration-form-title"
    >
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 id="integration-form-title" className="text-xl font-semibold mb-4">
          Integration Configuration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium block mb-1">Integration Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Integration Type *</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g., ERP, OSS, BSS"
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Configuration JSON *</label>
            <textarea
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={6}
              placeholder='e.g., {"apiKey": "xyz", "endpoint": "https://api.example.com"}'
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Attachments (Optional)</label>
            <input type="file" multiple onChange={handleFileChange} />
            {attachments.length > 0 && (
              <div className="mt-2">
                <ul className="text-sm list-disc list-inside">
                  {attachments.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-2 text-sm text-red-500 hover:underline"
                  onClick={() => setAttachments([])}
                >
                  Clear Attachments
                </button>
              </div>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Submit Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntegrationModal;
