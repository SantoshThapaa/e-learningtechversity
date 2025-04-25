"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SubmissionPage() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:4000/api/assignment/submissions/${assignmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setSubmissions(data.submissions || []);
        } else {
          alert(data.message || "Failed to fetch submissions");
        }
      } catch (err) {
        console.error("Error fetching submissions:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchSubmissions();
    }
  }, [assignmentId]);

  const handleViewMore = (submissionId) => {
    router.push(`/teacher/assignmentstudentstatus/${submissionId}`);
  };

  return (
    <div className="p-8 mt-15">
      <div className="text-sm text-muted-foreground mb-4">
        <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Students</span>{'>'} <span className="text-blue-500">Tasks</span>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border">#</th>
                <th className="p-4 border">Student</th>
                <th className="p-4 border">Email</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={submission._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 border">{index + 1}</td>
                  <td className="p-4 border">{submission.student?.name || "N/A"}</td>
                  <td className="p-4 border">{submission.student?.email || "N/A"}</td>
                  <td className="p-4 border">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        submission.fileUrl
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {submission.fileUrl ? "Completed" : "In Progress"}
                    </span>
                  </td>
                  <td className="p-4 border">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleViewMore(submission._id)} // Navigate to the AssignmentStudentStatus page
                      disabled={!submission.fileUrl}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
