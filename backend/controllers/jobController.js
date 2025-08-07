// backend/controllers/jobController.js
import db from '../db.js';

export const submitJobForm = async (req, res) => {
  const { name, email, phone, role, location, status } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO job_forms (name, email, phone, role, location, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, role, location, status]
    );
    res.status(201).json({ message: 'Job form submitted successfully!', id: result.insertId });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to submit job form' });
  }
};
