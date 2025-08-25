// backend/routes/upload.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mysql from "mysql2/promise";

const router = express.Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// MySQL connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobs_db",
});

router.post("/", upload.single("file"), async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const filePath = `/uploads/${req.file.filename}`;
    await pool.query(
      "INSERT INTO jobs (title, description, filePath) VALUES (?, ?, ?)",
      [title, description, filePath]
    );

    res.status(200).json({
      message: "✅ File uploaded and saved to database successfully",
      filename: req.file.filename,
      path: filePath,
    });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ error: "Failed to save file info to database" });
  }
});

export default router;
