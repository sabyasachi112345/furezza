// // backend/server.js
// import express from "express";
// import cors from "cors";
// import mysql from "mysql2";
// import bodyParser from "body-parser";

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Create MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",        // ✅ Change if needed
//   password: "Sabya@143",        // ✅ Your MySQL password
//   database: "fureza",  // ✅ Make sure DB and table exist
// });

// db.connect((err) => {
//   if (err) {
//     console.error("MySQL connection error:", err);
//     return;
//   }
//   console.log("✅ Connected to MySQL.");
// });

// // API route
// app.post("/api/feedback", (req, res) => {
//   const { feedback, rating } = req.body;

//   if (!feedback || !rating) {
//     return res.status(400).json({ error: "Missing feedback or rating" });
//   }

//   const query = "INSERT INTO feedbacks (feedback, rating) VALUES (?, ?)";
//   db.query(query, [feedback, rating], (err, results) => {
//     if (err) {
//       console.error("Error inserting into DB:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(200).json({ message: "Feedback saved" });
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });






// // server.js (Node.js backend using Express and MySQL)
// import express from 'express';
// import cors from 'cors';
// import mysql from 'mysql2';

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // your MySQL username
//   password: '', // your MySQL password
//   database: 'job_data_db', // your database name
// });

// db.connect(err => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     return;
//   }
//   console.log('Connected to MySQL database.');
// });

// app.post('/api/submit-job', (req, res) => {
//   const { id, title, description, scheduledStart, scheduledEnd, estimatedDuration, customerName, locationAddress, technicianFirstName, technicianLastName, notes, steps, elapsedTime, comments } = req.body;

//   const jobQuery = `INSERT INTO jobs (id, title, description, scheduledStart, scheduledEnd, estimatedDuration, customerName, locationAddress, technicianFirstName, technicianLastName, notes, steps, elapsedTime, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const jobValues = [
//     id,
//     title,
//     description,
//     scheduledStart,
//     scheduledEnd,
//     estimatedDuration,
//     customerName,
//     locationAddress,
//     technicianFirstName,
//     technicianLastName,
//     notes,
//     JSON.stringify(steps),
//     elapsedTime,
//     JSON.stringify(comments),
//   ];

//   db.query(jobQuery, jobValues, (err, result) => {
//     if (err) {
//       console.error('Error inserting job:', err);
//       res.status(500).json({ error: 'Database error' });
//       return;
//     }
//     res.json({ message: 'Job saved successfully!' });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// server.js
// backend/index.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ✅ MySQL DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sabya@143',
  database: 'fureza',
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL.');
});

//
// ✅ File Upload Endpoint
//
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(200).json({
    message: '✅ File uploaded successfully',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

//
// ✅ Feedback Endpoint
//
app.post('/api/feedback', (req, res) => {
  const { feedback, rating } = req.body;

  if (!feedback || !rating) {
    return res.status(400).json({ error: 'Missing feedback or rating' });
  }

  const query = 'INSERT INTO feedbacks (feedback, rating) VALUES (?, ?)';
  db.query(query, [feedback, rating], (err) => {
    if (err) {
      console.error('❌ Error inserting feedback:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: '✅ Feedback saved' });
  });
});

//
// ✅ Job Submission Endpoint
//
app.post('/api/submit-job', (req, res) => {
  const {
    id,
    title,
    description,
    scheduledStart,
    scheduledEnd,
    estimatedDuration,
    customerName,
    locationAddress,
    technicianFirstName,
    technicianLastName,
    notes,
    steps,
    elapsedTime,
    comments,
  } = req.body;

  const jobQuery = `
    INSERT INTO jobs (
      id, title, description, scheduledStart, scheduledEnd, estimatedDuration,
      customerName, locationAddress, technicianFirstName, technicianLastName,
      notes, steps, elapsedTime, comments
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const jobValues = [
    id,
    title,
    description,
    scheduledStart,
    scheduledEnd,
    estimatedDuration,
    customerName,
    locationAddress,
    technicianFirstName,
    technicianLastName,
    notes,
    JSON.stringify(steps),
    elapsedTime,
    JSON.stringify(comments),
  ];

  db.query(jobQuery, jobValues, (err) => {
    if (err) {
      console.error('❌ Error inserting job:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: '✅ Job saved successfully!' });
  });
});

//
// ✅ Start Server
//
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
