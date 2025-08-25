import React, { useState } from "react";

interface JobUploadModalProps {
  job?: {
    id?: number;
    title?: string;
    description?: string;
    customerId?: number;
    customerName?: string;
    technicianId?: number;
    technicianFirstName?: string;
    technicianLastName?: string;
    categoryId?: number;
    categoryName?: string;
    priority?: string;
    status?: string;
    scheduledStart?: string;
    scheduledEnd?: string;
    actualStart?: string;
    actualEnd?: string;
    estimatedDuration?: number;
    locationAddress?: string;
    locationLatitude?: number;
    locationLongitude?: number;
    notes?: string;
    createdById?: number;
    createdByFirstName?: string;
    createdByLastName?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const JobUploadModal: React.FC<JobUploadModalProps> = ({ job, onClose, onSubmit }) => {
  const [title, setTitle] = useState(job?.title || "");
  const [description, setDescription] = useState(job?.description || "");
  const [customerName, setCustomerName] = useState(job?.customerName || "");
  const [technicianName, setTechnicianName] = useState(`${job?.technicianFirstName || ""} ${job?.technicianLastName || ""}`);
  const [categoryName, setCategoryName] = useState(job?.categoryName || "");
  const [priority, setPriority] = useState(job?.priority || "LOW");
  const [status, setStatus] = useState(job?.status || "PENDING");
  const [scheduledStart, setScheduledStart] = useState(job?.scheduledStart || "");
  const [scheduledEnd, setScheduledEnd] = useState(job?.scheduledEnd || "");
  const [locationAddress, setLocationAddress] = useState(job?.locationAddress || "");
  const [notes, setNotes] = useState(job?.notes || "");
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const fileData = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    }));

    const jobData = {
      id: job?.id,
      title,
      description,
      customerName,
      technicianName,
      categoryName,
      priority,
      status,
      scheduledStart,
      scheduledEnd,
      locationAddress,
      notes,
      files,
      totalSize,
      fileData,
    };

    onSubmit(jobData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold">Job Upload / Edit</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Technician Name"
            value={technicianName}
            onChange={(e) => setTechnicianName(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border rounded p-2"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded p-2">
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded p-2">
            <option>PENDING</option>
            <option>IN_PROGRESS</option>
            <option>COMPLETED</option>
          </select>
          <input
            type="datetime-local"
            placeholder="Scheduled Start"
            value={scheduledStart}
            onChange={(e) => setScheduledStart(e.target.value)}
            className="border rounded p-2 col-span-1"
          />
          <input
            type="datetime-local"
            placeholder="Scheduled End"
            value={scheduledEnd}
            onChange={(e) => setScheduledEnd(e.target.value)}
            className="border rounded p-2 col-span-1"
          />
          <input
            type="text"
            placeholder="Location Address"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
            className="border rounded p-2 col-span-2"
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded p-2 col-span-2"
            rows={2}
          />
        </div>

        {/* Drag & Drop */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 p-4 text-center rounded cursor-pointer transition ${dragging ? 'bg-blue-50 border-blue-400' : 'border-dashed'}`}
        >
          Drag & Drop files here or click to select
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full mt-2"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 text-sm text-gray-700">
            <strong>Total Files:</strong> {files.length}<br />
            <strong>Total Size:</strong> {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
            <ul className="mt-2 list-disc ml-5">
              {files.map((file, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {file.name} <button className="text-red-500 ml-2" onClick={() => handleRemoveFile(idx)}>✕</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleUpload}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default JobUploadModal;
