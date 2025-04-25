"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AssignmentStatusTab({ task }) {
  const [statusData, setStatusData] = useState({
    status: '',
    dueDate: '',
    lastChange: '',
    feedback: '',
  });

  useEffect(() => {
    if (!task || !task.taskId) return; 
    const fetchStatus = async () => {
      const token = localStorage.getItem('token');
      const studentId = localStorage.getItem('studentId');  
      try {
        const response = await axios.get(
          `http://localhost:4000/api/assignment/status/${task.taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatusData(response.data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [task]); 
  const handleUpdateFeedback = async () => {
    const token = localStorage.getItem('token');
    const feedback = prompt("Enter your feedback:");

    if (!feedback) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/assignment/status/update/${task.taskId}`,
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

  if (!task) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">{task.taskNumber} - {task.title}</h2>
        <div className="mt-6 text-sm">
          <div className="border p-4 rounded-lg bg-green-50">
            <h3 className="text-md font-semibold mb-2">Submission Status</h3>
            <p className="mb-1"><strong>Status:</strong> <span className="text-green-600">{statusData.status}</span></p>
            <p className="mb-1"><strong>Due:</strong> {statusData.dueDate}</p>
            <p className="mb-1"><strong>Last Change:</strong> {statusData.lastChange}</p>
            <p><strong>Feedback:</strong> <span className="text-green-600">{statusData.feedback}</span></p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button 
            className="px-6 py-2 bg-green-600 text-white rounded-md"
            onClick={handleUpdateFeedback}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
