'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssignmentSubmissions() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:4000/api/assignment/submissions/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmissions(res.data.submissions || []);
      } catch (error) {
        console.error("Failed to fetch assignment submissions", error);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchAssignmentSubmissions();
    }
  }, [assignmentId]);

  if (loading) return <p className="p-4">Loading submissions...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Assignment Submissions</h2>
      <div className="grid grid-cols-1 gap-6">
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <Card key={sub._id}>
              <CardHeader>
                <CardTitle>{sub.student.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Email:</strong> {sub.student.email}</p>
                <p><strong>Submitted On:</strong> {new Date(sub.submittedAt).toLocaleDateString()}</p>
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={sub.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Submission
                  </a>
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No submissions found.</p>
        )}
      </div>
    </div>
  );
}
