'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";  // 🔥 Import toast

export default function FeedbackModal({ isOpen, onClose, assignmentId, studentId, existingFeedback = '' }) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFeedback(existingFeedback || '');
    }
  }, [isOpen, existingFeedback]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please provide feedback");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `https://back.bishalpantha.com.np/api/assignment/feedback/${assignmentId}/${studentId}`, 
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Feedback submitted successfully!");
      setFeedback('');
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/3">
        <h2 className="text-xl font-bold mb-4">Give Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter your feedback here"
          rows="4"
        />
        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            Close
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
