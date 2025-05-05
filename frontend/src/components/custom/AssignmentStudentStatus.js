'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeedbackModal from "./FeedbackModal";

export default function AssignmentStudentStatus() {
  const { assignmentId, studentId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssignmentSubmission = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://back.bishalpantha.com.np/api/assignment/submission/${assignmentId}/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
        setSubmission(res.data.submission || null);
      } catch (error) {
        console.error("Failed to fetch assignment submission", error);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId && studentId) {
      fetchAssignmentSubmission();
    }
  }, [assignmentId, studentId]);

  if (loading) return <p className="p-4">Loading submission...</p>;

  if (!submission) return <p>No submission found for this assignment and student.</p>;

  return (
    <div className="p-8 mt-20">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Students</span>{'>'} <span className="text-blue-500">Submission</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#1A2D62] text-white rounded hover:bg-blue-700 transition"
        >
          Feedback
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card key={submission._id}>
          <CardHeader>
            <CardTitle>{submission.student?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Email:</strong> {submission.student?.email}</p>
            <p><strong>Assignment:</strong> {submission.assignment?.title}</p>
            <p><strong>Task Number:</strong> {submission.assignment?.taskNumber}</p>
            <p><strong>Submitted On:</strong> {new Date(submission.submittedAt).toLocaleDateString()}</p>
            <p>
              <strong>File:</strong>{" "}
              <a
                href={`https://back.bishalpantha.com.np${submission.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Submission
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
      {isModalOpen && (
        <FeedbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          assignmentId={assignmentId}
          studentId={studentId}
          existingFeedback={submission?.feedback || ''}
        />
      )}

    </div>
  );
}
