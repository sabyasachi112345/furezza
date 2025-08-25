import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const MAX_CHARACTERS = 500;

const JobFeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [technicianName, setTechnicianName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  // ✅ Fetch feedback from DB
  useEffect(() => {
    axios.get("http://localhost:5000/feedback").then((res) => {
      setFeedbackList(res.data);
    });
  }, []);

  const handleSubmit = async () => {
    if (!feedback || rating < 1 || !technicianName.trim()) return;

    setSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/feedback", {
        job_id: 101,
        user_id: 1,
        technician_name: technicianName,
        comments: feedback,
        rating,
      });

      // Prepend new feedback to the list
      setFeedbackList((prev) => [res.data.feedback, ...prev]);

      // Reset form
      setFeedback("");
      setRating(5);
      setTechnicianName("");
      alert("✅ Feedback submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Job Completion Feedback
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Technician Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Technician Name
            </label>
            <input
              type="text"
              value={technicianName}
              onChange={(e) => setTechnicianName(e.target.value)}
              placeholder="Enter technician's name"
              required
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-4 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={6}
              maxLength={MAX_CHARACTERS}
              placeholder="Share your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
            <div className="text-sm text-right text-gray-500 mt-1">
              {feedback.length}/{MAX_CHARACTERS}
            </div>
          </div>

          {/* Rating Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating (1–10)
            </label>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="text-yellow-400"
                >
                  <Star
                    size={24}
                    fill={(hoverRating ?? rating) >= star ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-blue-600 mt-2">
              Selected Rating: <b>{rating}/10</b>
            </p>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={submitting || !feedback || !technicianName.trim()}
              className={`w-full md:w-auto px-6 py-3 rounded-md font-semibold transition ${
                submitting || !feedback || !technicianName.trim()
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Feedback */}
      {feedbackList.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Feedback</h2>
          <ul className="space-y-4">
            {feedbackList.map((fb) => (
              <li key={fb.id} className="border-b pb-3">
                <p className="text-sm text-gray-600 mb-1">
                  👨‍🔧 <b>{fb.technician_name}</b> | ⭐ {fb.rating}/10
                </p>
                <p className="text-gray-700">{fb.comments}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(fb.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobFeedbackPage;
