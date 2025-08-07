export interface UploadFileState {
  selectedFile: File | null;
  uploadSuccess: boolean;
  uploadProgress: number;
  error: string | null;
}
