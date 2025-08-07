// FileUploadPage.tsx
import React, { useRef, useState } from "react";
import { UploadCloud, DownloadCloud, X, Info } from "lucide-react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  LinearProgress,
  Stack,
  Chip,
} from "@mui/material";
import axios from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE_MB = 5;

const FileUploadPage: React.FC<Props> = ({ open, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMb = file.size / (1024 * 1024);
    if (fileSizeMb > MAX_FILE_SIZE_MB) {
      setError(`❌ File size exceeds ${MAX_FILE_SIZE_MB} MB`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError(null);
    setProgress(0);
    setDownloadUrl(null);

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percent);
        },
      });

      const uploadedPath = res.data.path;
      setDownloadUrl(`http://localhost:5000${uploadedPath}`);
    } catch (err) {
      console.error("❌ Upload error", err);
      setError("❌ Upload failed. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange({ target: { files: [file] } } as any);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        File Upload
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <X />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={{
            border: "2px dashed #999",
            borderRadius: "10px",
            padding: 3,
            textAlign: "center",
            cursor: "pointer",
            mb: 2,
            bgcolor: "#f9f9f9",
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud size={40} />
          <Typography variant="subtitle1">Drag & Drop or Click to Upload</Typography>
          <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
        </Box>

        {selectedFile && (
          <Stack spacing={2}>
            <Typography>
              <strong>File:</strong> {selectedFile.name}
            </Typography>
            <Typography>
              <strong>Size:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </Typography>
            <LinearProgress variant="determinate" value={progress} />

            {downloadUrl && (
              <Button
                variant="outlined"
                startIcon={<DownloadCloud />}
                href={downloadUrl}
                download={selectedFile.name}
              >
                Download Uploaded File
              </Button>
            )}
          </Stack>
        )}

        {error && <Chip label={error} color="error" icon={<Info />} />}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadPage;
