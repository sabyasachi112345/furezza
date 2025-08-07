// backend/routes/feedback.js
import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/feedback", (req, res) => {
  const { feedback, rating } = req.body;

  if (!feedback || !rating) {
    return res.status(400).json({ error: "Missing feedback or rating" });
  }

  const query = "INSERT INTO feedbacks (feedback, rating) VALUES (?, ?)";
  db.query(query, [feedback, rating], (err, results) => {
    if (err) {
      console.error("❌ Feedback insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({ message: "✅ Feedback saved" });
  });
});

export default router;
