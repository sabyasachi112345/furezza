// backend/routes/feedbackRoutes.js
import express from "express";

export default function feedbackRoutes(db, upload) {
  const router = express.Router();

  // 📌 GET all feedback
  router.get("/", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM feedback ORDER BY created_at DESC");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  // 📌 POST new feedback
  router.post("/", upload.none(), async (req, res) => {
    const { job_id, user_id, technician_name, comments, rating } = req.body;

    if (!technician_name || !comments || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      await db.query(
        "INSERT INTO feedback (job_id, user_id, technician_name, comments, rating) VALUES (?, ?, ?, ?, ?)",
        [job_id, user_id, technician_name, comments, rating]
      );

      res.json({ message: "✅ Feedback submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database insert error" });
    }
  });

  return router;
}
