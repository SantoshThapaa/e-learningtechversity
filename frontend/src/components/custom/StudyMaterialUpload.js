"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getUserIdFromToken } from "@/utils/authUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudyMaterialUpload({ onClose, onUploadSuccess }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploaderId, setUploaderId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);

  // ✅ Get user ID from token
  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setUploaderId(userId);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Fetch assigned courses for this teacher
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        // Use template string to correctly inject uploaderId
        const res = await axios.get(`http://localhost:4000/api/assigned-courses/${uploaderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        toast.error("❌ Failed to fetch courses.");
      }
    };

    if (isLoggedIn && uploaderId) {
      fetchCourses();
    }
  }, [isLoggedIn, uploaderId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !file || !uploaderId || !courseId) {
      toast.error("Please fill all fields and make sure you're logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("document", file);
    formData.append("uploaderId", uploaderId);
    formData.append("courseId", courseId);

    try {
      await axios.post("http://localhost:4000/api/study-materials/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("📤 File uploaded successfully!");
      setTitle("");
      setFile(null);
      setCourseId("");
      onUploadSuccess?.();

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="fixed top-0 left-0 w-full bg-white h-full bg-opacity-60 z-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-xl">
            &times;
          </button>
          <h2 className="text-lg font-bold mb-4 text-blue-900">Upload Study Material</h2>

          {!isLoggedIn ? (
            <p className="text-red-600 font-medium mb-4">
              Please log in to upload files.
            </p>
          ) : (
            <form onSubmit={handleUpload}>
              <label className="block mb-1">Title</label>
              <Input
                placeholder="File Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4"
              />

              <label className="block mb-1">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>

              <label className="block mb-1">Document</label>
              <Input type="file" onChange={handleFileChange} className="mb-6" />

              <Button type="submit" className="bg-blue-900 text-white w-full">
                Upload
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
