// import React, { useState } from "react";
// import { Star, FileText, X } from "lucide-react";

// const MAX_CHARACTERS = 500;

// const JobFeedbackPage: React.FC = () => {
//   const [feedback, setFeedback] = useState("");
//   const [rating, setRating] = useState(5);
//   const [hoverRating, setHoverRating] = useState<number | null>(null);
//   const [attachments, setAttachments] = useState<File[]>([]);
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!feedback || rating < 1) return;

//     setSubmitting(true);
//     console.log("Feedback submitted:", { feedback, rating, attachments });

//     setTimeout(() => {
//       alert("Feedback submitted successfully!");
//       setFeedback("");
//       setRating(5);
//       setAttachments([]);
//       setSubmitting(false);
//     }, 1500);
//   };

//   const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setAttachments((prev) => [...prev, ...files]);
//     }
//   };

//   const removeAttachment = (index: number) => {
//     setAttachments((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
//           Job Completion Feedback
//         </h1>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit();
//           }}
//           className="space-y-8"
//         >
//           {/* Feedback Textarea */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Your Feedback
//             </label>
//             <textarea
//               className="w-full border border-gray-300 rounded-md p-4 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               rows={6}
//               maxLength={MAX_CHARACTERS}
//               placeholder="Share your experience, suggestions, or any issues faced..."
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               required
//             />
//             <div className="text-sm text-right text-gray-500 mt-1">
//               {feedback.length}/{MAX_CHARACTERS}
//             </div>
//           </div>

//           {/* Rating Input */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Rating (1–10)
//             </label>
//             <div className="flex flex-wrap gap-1">
//               {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHoverRating(star)}
//                   onMouseLeave={() => setHoverRating(null)}
//                   className="text-yellow-400"
//                 >
//                   <Star 
//                     size={24}
//                     fill={(hoverRating ?? rating) >= star ? "currentColor" : "none"}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Attachments */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Attachments (optional)
//             </label>
//             <input
//               type="file"
//               multiple
//               onChange={handleAttachmentChange}
//               className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
//             />
//             {attachments.length > 0 && (
//               <ul className="mt-3 space-y-2 text-sm text-gray-700">
//                 {attachments.map((file, index) => (
//                   <li
//                     key={index}
//                     className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
//                   >
//                     <div className="flex items-center gap-2">
//                       <FileText size={16} className="text-gray-600" />
//                       <span className="truncate max-w-xs">{file.name}</span>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeAttachment(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X size={16} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Submit */}
//           <div>
//             <button
//               type="submit"
//               disabled={submitting || !feedback}
//               className={`w-full md:w-auto px-6 py-3 rounded-md font-semibold transition ${
//                 submitting || !feedback
//                   ? "bg-gray-400 cursor-not-allowed text-white"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//             >
//               {submitting ? "Submitting..." : "Submit Feedback"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobFeedbackPage;



import React, { useState } from "react";
import { Star, FileText, X } from "lucide-react";

const MAX_CHARACTERS = 500;

const JobFeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback || rating < 1) return;

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback, rating }),
      });

      if (response.ok) {
        alert("✅ Feedback submitted successfully!");
        setFeedback("");
        setRating(5);
        setAttachments([]);
      } else {
        const error = await response.json();
        alert("❌ Submission failed: " + (error?.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("❌ Network error. Please try again.");
    }

    setSubmitting(false);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
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
          {/* Feedback Textarea */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-4 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={6}
              maxLength={MAX_CHARACTERS}
              placeholder="Share your experience, suggestions, or any issues faced..."
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
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Attachments (optional)
            </label>
            <input
              type="file"
              multiple
              onChange={handleAttachmentChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {attachments.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {attachments.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-600" />
                      <span className="truncate max-w-xs">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={submitting || !feedback}
              className={`w-full md:w-auto px-6 py-3 rounded-md font-semibold transition ${
                submitting || !feedback
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFeedbackPage;
