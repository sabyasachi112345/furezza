// import React, { useRef, useState } from "react";
// import { UploadCloud, DownloadCloud, X, Info } from "lucide-react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   IconButton,
//   LinearProgress,
//   Stack,
//   Chip,
//   TextField,
// } from "@mui/material";
// import axios from "axios";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// const MAX_FILE_SIZE_MB = 5;

// const FileUploadPage: React.FC<Props> = ({ open, onClose }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);
//   const [jobTitle, setJobTitle] = useState<string>("");
//   const [description, setDescription] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const fileSizeMb = file.size / (1024 * 1024);
//     if (fileSizeMb > MAX_FILE_SIZE_MB) {
//       setError(`❌ File size exceeds ${MAX_FILE_SIZE_MB} MB`);
//       setSelectedFile(null);
//       return;
//     }

//     setSelectedFile(file);
//     setError(null);
//     setProgress(0);
//   };

//   const uploadFile = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }
//     if (!jobTitle.trim()) {
//       setError("Please enter a job title.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("title", jobTitle);
//     formData.append("description", description);

//     try {
//       await axios.post("http://localhost:5000/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       alert("✅ Job uploaded successfully!");
//       setSelectedFile(null);
//       setJobTitle("");
//       setDescription("");
//       setProgress(0);
//       setError(null);
//       onClose();
//     } catch (err) {
//       console.error("❌ Upload error", err);
//       setError("❌ Upload failed. Please try again.");
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       handleFileChange({ target: { files: [file] } } as any);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         Job File Upload
//         <IconButton onClick={onClose} style={{ float: "right" }}>
//           <X />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent>
//         <TextField
//           label="Job Title"
//           fullWidth
//           margin="dense"
//           value={jobTitle}
//           onChange={(e) => setJobTitle(e.target.value)}
//         />
//         <TextField
//           label="Description"
//           fullWidth
//           margin="dense"
//           multiline
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <Box
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           sx={{
//             border: "2px dashed #999",
//             borderRadius: "10px",
//             padding: 3,
//             textAlign: "center",
//             cursor: "pointer",
//             mb: 2,
//             bgcolor: "#f9f9f9",
//           }}
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <UploadCloud size={40} />
//           <Typography variant="subtitle1">
//             Drag & Drop or Click to Upload
//           </Typography>
//           <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
//         </Box>

//         {selectedFile && (
//           <Stack spacing={2}>
//             <Typography>
//               <strong>File:</strong> {selectedFile.name}
//             </Typography>
//             <Typography>
//               <strong>Size:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
//             </Typography>
//             <LinearProgress variant="determinate" value={progress} />
//           </Stack>
//         )}

//         {error && <Chip label={error} color="error" icon={<Info />} />}
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={uploadFile} variant="contained" color="primary">
//           Upload
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FileUploadPage;



import React, { useState } from "react";
import axios from "axios";

const JobFileUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]); // Store submitted jobs for table

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("job_title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      // Save to backend (adjust API URL to your backend)
      const res = await axios.post("http://localhost:5000/upload-job", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Add to table dynamically
      setJobs((prev) => [
        {
          id: Date.now(),
          title,
          description,
          fileName: file ? file.name : "No file",
        },
        ...prev,
      ]);

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);

      alert("✅ Job uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
      {/* Upload Form */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Job File Upload</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center">
            <p className="text-gray-500 mb-2">
              Drag & Drop files here or click below
            </p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500"
            />
            {file && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setFile(null);
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>

      {/* Jobs Table */}
      {jobs.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Jobs</h3>
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Job Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">File</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{job.title}</td>
                  <td className="px-4 py-2 border">{job.description}</td>
                  <td className="px-4 py-2 border text-blue-600">
                    {job.fileName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobFileUpload;
