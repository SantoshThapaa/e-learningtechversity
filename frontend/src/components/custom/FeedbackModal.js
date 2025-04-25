"use client";
import { useState } from "react";

export default function FeedbackModal({ isOpen, onClose, onSubmit }) {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback) {
      alert("Please provide feedback");
      return;
    }

    try {
      await onSubmit(feedback); // Call the onSubmit function passed from parent
      setFeedback(''); // Reset feedback after submission
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback");
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
