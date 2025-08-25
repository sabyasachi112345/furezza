// server.js or routes/jobs.js     
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // store uploaded files

router.post("/api/jobs/upload", upload.single("file"), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description || !file) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Save to DB
  console.log("Job Uploaded:", { title, description, file });

  res.status(200).json({ message: "Job uploaded successfully" });
});

export default router;



