export const simulateUpload = (
  file: File,
  onProgress: (progress: number) => void,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  let progress = 0;

  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      onSuccess();
    } else {
      progress += 10 + Math.random() * 10;
      onProgress(Math.min(100, Math.round(progress)));
    }
  }, 300);

  // You can simulate error like this if needed
  // setTimeout(() => onError("Upload failed due to network issue."), 3000);
};
