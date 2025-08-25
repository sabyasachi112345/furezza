import express from "express";
import cors from "cors";
import mysql from "mysql2";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// ✅ Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ File storage setup with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sabya@143", // ⚠️ keep this safe
  database: "feedback_app",
});

// ✅ API endpoint: Save job feedback
app.post("/feedback", upload.single("attachment"), (req, res) => {
  const { job_id, user_id, comments, rating } = req.body;
  const filePath = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO job_feedback (job_id, user_id, comments, rating, attachment) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [job_id, user_id, comments, rating, filePath], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, feedback_id: result.insertId });
  });
});

// ✅ API endpoint: Save uploaded job details
app.post("/upload-job", upload.single("file"), (req, res) => {
  const { job_title, description } = req.body;
  const filePath = req.file ? req.file.filename : null;

  if (!job_title || !description) {
    return res.status(400).json({ error: "Job title and description are required" });
  }

  const sql =
    "INSERT INTO jobs (title, description, file) VALUES (?, ?, ?)";
  db.query(sql, [job_title, description, filePath], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      success: true,
      job_id: result.insertId,
      job_title,
      description,
      file: filePath,
    });
  });
});

// ✅ API endpoint: Get all jobs (to display in table)
app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM jobs ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
