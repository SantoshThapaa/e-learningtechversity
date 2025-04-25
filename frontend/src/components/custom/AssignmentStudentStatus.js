"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AssignmentStudentStatus({ taskId }) {
  const [statusData, setStatusData] = useState({
    status: '',
    dueDate: '',
    lastChange: '',
    feedback: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          `http://localhost:4000/api/assignment/status/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatusData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching status:", error);
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [taskId]);

  const handleUpdateFeedback = async () => {
    const token = localStorage.getItem('token');
    const feedback = prompt("Enter feedback:");

    if (!feedback) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/assignment/status/update/${taskId}`,
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatusData(response.data.submission);
      alert("Feedback updated!");
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 mb-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{statusData.status} - {taskId}</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Submission Status</h3>
          <p><strong>Status:</strong> {statusData.status}</p>
          <p><strong>Due:</strong> {statusData.dueDate}</p>
          <p><strong>Last Change:</strong> {statusData.lastChange}</p>
          <p><strong>Feedback:</strong> {statusData.feedback}</p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleUpdateFeedback}
        >
          Update Feedback
        </button>
      </div>
    </div>
  );
}
