import db from "../db/mysql.js";

export const submitFeedback = (req, res) => {
  const { feedback, rating } = req.body;

  if (!feedback || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "INSERT INTO feedbacks (feedback, rating) VALUES (?, ?)";
  db.query(query, [feedback, rating], (err, result) => {
    if (err) {
      console.error("Error inserting feedback:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Feedback submitted successfully!" });
  });
};
