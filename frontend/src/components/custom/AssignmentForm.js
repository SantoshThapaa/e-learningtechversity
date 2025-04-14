"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getUserIdFromToken } from "@/utils/authUtils";

export default function AssignmentForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [brief, setBrief] = useState("");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("token");
      const uid = getUserIdFromToken();

      if (!localToken || !uid) {
        console.error("Token or user ID missing");
        return;
      }

      setToken(localToken);
      setUserId(uid);

      // Fetch assigned courses
      fetch(`http://localhost:4000/api/teacher/assigned-courses/${uid}`, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCourses(data);
            if (data.length > 0) setCourseId(data[0]._id); // default to first
          } else {
            console.error("Unexpected course response:", data);
          }
        });
    } catch (err) {
      console.error("Error initializing form:", err);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !courseId) {
      alert("Missing token or course ID");
      return;
    }

    const payload = {
      title,
      deadline: dueDate,
      description: brief,
    };

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/assignment/create/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert("✅ Assignment created successfully!");
      setTitle("");
      setDueDate("");
      setBrief("");
      router.push("/teacher/coursemanagement");
    } catch (err) {
      console.error("Assignment creation failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      {/* Course Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="courseId" className="text-lg font-medium">Course</Label>
        <select
          id="courseId"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
        >
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
          {courses.length === 0 && <option disabled>No courses assigned</option>}
        </select>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg font-medium">Title</Label>
        <Input
          id="title"
          placeholder="New project of UI/UX"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label htmlFor="dueDate" className="text-lg font-medium">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* Brief */}
      <div className="space-y-2">
        <Label htmlFor="brief" className="text-lg font-medium">Brief</Label>
        <Textarea
          id="brief"
          placeholder="Write the assignment brief here..."
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#0E1A47] hover:bg-[#1a2b6a] text-white w-full text-base font-medium rounded-md"
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
