"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignmentStatusTab({ assignmentId }) {
  const [statusData, setStatusData] = useState(null);

  useEffect(() => {
    if (!assignmentId) return;

    const fetchStatus = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `https://back.bishalpantha.com.np/api/assignment/student/submission-status/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatusData(response.data.submission || {});
      } catch (error) {
        console.error("Error fetching status:", error);
      }

    };

    fetchStatus();
  }, [assignmentId]);

  if (!statusData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-blue-200">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{statusData.taskNumber}-{statusData.assignmentTitle}</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <p className="text-lg text-gray-600"><strong>Status:</strong> <span className="text-green-600">{statusData.submittedAt ? "Submitted" : "Not Submitted"}</span></p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-600"><strong>Due:</strong> {statusData.dueDate || "N/A"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-600"><strong>Last Change:</strong> {new Date(statusData.submittedAt).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-600"><strong>Feedback:</strong> <span className="text-green-600">{statusData.feedback || "No Feedback yet"}</span></p>
        </div>
      </div>

      {statusData.fileUrl && (
        <div className="mt-4">
          <a
            href={`https://back.bishalpantha.com.np${statusData.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Submitted File
          </a>

        </div>
      )}
    </div>
  );
}
