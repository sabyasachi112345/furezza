import React, { useState } from "react";
import { uploadJobFiles } from "@/api/api";

interface JobUploadModalProps {
  onClose: () => void;
}

const JobUploadModal: React.FC<JobUploadModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  // Remove selected file
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload handler
  const handleUpload = async () => {
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Job title is required.");
      return;
    }
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      files.forEach((file) => formData.append("files", file));

      await uploadJobFiles(formData);

      setSuccess("Files uploaded successfully!");
      setTitle("");
      setDescription("");
      setFiles([]);

      // Close after 1.5s
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full space-y-4 animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800">📂 Job File Upload</h2>

        {/* Error / Success messages */}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        {/* Job Title */}
        <input
          type="text"
          placeholder="Job Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Job Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
        />

        {/* File Upload */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border rounded cursor-pointer p-2"
        />

        {/* File Preview */}
        {files.length > 0 && (
          <ul className="text-sm text-gray-700 mt-2 border rounded p-2 max-h-32 overflow-y-auto">
            {files.map((f, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-1 border-b last:border-b-0"
              >
                <span>
                  {f.name} <span className="text-xs text-gray-500">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
                </span>
                <button
                  className="text-red-500 hover:text-red-700 text-xs"
                  onClick={() => handleRemoveFile(i)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobUploadModal;
