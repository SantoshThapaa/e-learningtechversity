"use client";
import { getUserIdFromToken } from "@/utils/authUtils";
import { useState, useEffect } from "react";
import { Eye, Download } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

export default function StudyMaterialTab() {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    const courseIdFromUtils = localStorage.getItem("courseId");
    if (courseIdFromUtils) {
      setCourseId(courseIdFromUtils);
      fetchStudyMaterials(courseIdFromUtils);
      fetchTeacherDetails();
    } else {
      toast.error("Course ID not found.");
    }
  }, []);

  const fetchStudyMaterials = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      if (!courseId) {
        toast.error("Course ID missing.");
        return;
      }

      const res = await axios.get(
        `https://back.bishalpantha.com.np/api/study-materials/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudyMaterials(res.data.materials);
    } catch (err) {
      console.error("Failed to fetch study materials:", err.response?.data);
      toast.error("Failed to load study materials.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherDetails = async () => {
    const userId = getUserIdFromToken(); 
    if (!userId) {
      toast.error("Failed to retrieve user details.");
      return;
    }

    try {
      const res = await axios.get(`https://back.bishalpantha.com.np/api/user/${userId}`);
      const teacher = res.data; 
      setTeacherName(teacher.name); 
    } catch (err) {
      console.error("Failed to fetch teacher details:", err.response?.data);
      toast.error("Failed to load teacher details.");
    }
  };

  const handleViewClick = (fileUrl) => {
    if (!fileUrl) {
      toast.error("File URL is not available.");
      return;
    }

    const fullUrl = `https://back.bishalpantha.com.np${fileUrl}`;
    console.log("Opening file at:", fullUrl); 
    window.open(fullUrl, "_blank");
  };

  const handleDownloadClick = (fileUrl, title) => {
    if (!fileUrl) {
      toast.error("File URL is not available.");
      return;
    }

    const fullUrl = `https://back.bishalpantha.com.np${fileUrl}`;
    const a = document.createElement("a");
    a.href = fullUrl;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 mb-20">
      <h2 className="text-2xl font-bold mb-6">Study Materials</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading study materials...</p>
      ) : studyMaterials.length === 0 ? (
        <p className="text-center text-gray-500">No study materials available for this course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {studyMaterials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={item.imageUrl || "/pdf file.png"}
                  alt="PDF Icon"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <h3 className="text-center text-lg font-semibold">{item.title}</h3>
              {/* <p className="text-center text-gray-500 text-sm mb-4">By {teacherName || "Unknown Teacher"}</p> */}

              <div className="flex justify-between mt-4">
              <button
                  onClick={() => handleViewClick(item.fileUrl)}
                  className="bg-green-50 p-2 rounded-full text-green-800 hover:bg-green-100"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => handleDownloadClick(item.fileUrl, item.title)}
                  className="bg-green-50 p-2 rounded-full text-green-800 hover:bg-green-100"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
