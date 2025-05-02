"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Search, GraduationCap } from "lucide-react";
import { Card } from "../ui/card";
import { Calendar } from "../ui/calendar";
import axios from "axios";
import { getUserIdFromToken } from "@/utils/authUtils";

const TeacherDashboard = () => {
  const router = useRouter();
  const [teacherId, setTeacherId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseStatus, setCourseStatus] = useState({ completedCourses: 0, inProgressCourses: 0 });

  const fetchAssignedCourses = async (id) => {
    if (!id) return console.warn("Missing teacher ID for fetchAssignedCourses");
    try {
      const response = await axios.get(`http://localhost:4000/api/assigned-courses/${id}`);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching assigned courses:", error);
    }
  };

  const fetchCoursesStatus = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/courses/status");
      setCourseStatus(response.data); 
    } catch (error) {
      console.error("Error fetching course status:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = getUserIdFromToken();
      if (!id) {
        router.push("/student/enrollnow");
      } else {
        setTeacherId(id);
        fetchAssignedCourses(id);
        fetchCoursesStatus(); 
      }
    }
  }, [router]);

  const handleEditCourse = (courseId) => {
    localStorage.setItem("courseId", courseId);
    router.push("/teacher/editcourse");
  };

  const handleManageCourse = (courseId) => {
    localStorage.setItem("courseId", courseId);
    router.push("/teacher/coursemanagement");
  };
  const handleAttendance = (courseId) => {
    localStorage.setItem("courseId", courseId);
    router.push("/teacher/attendance");
  };


  return (
    <div className="px-4 py-2 sm:px-6 md:px-10 lg:px-20 mt-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Assigned Courses */}
        <div className="flex flex-col gap-6">
          {courses.length > 0 ? (
            courses.map((course, index) => {
              const currentDate = new Date();
              const endDate = new Date(course.endDate);
              let courseStatus = "";
              if (endDate && endDate < currentDate) {
                courseStatus = "Completed";
              } else {
                courseStatus = "In Progress";
              }

              return (
                <Card
                  key={index}
                  className="w-full bg-green-50 border border-blue-100 rounded-xl shadow-sm h-[300px]"
                >
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    {/* Left Section */}
                    <div className="bg-white rounded-lg p-4 w-full md:w-1/2 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`${
                            courseStatus === "Completed" ? "bg-blue-900" : "bg-yellow-400"
                          } text-white text-xs px-3 py-1 rounded-md`}
                        >
                          {courseStatus}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-1">{course.duration || "Duration N/A"}</div>
                      <h3 className="text-lg font-semibold break-words">{course.title}</h3>
                      <div className="text-sm text-gray-500">Batch {course.batchNo || "N/A"}</div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                      <div
                        className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer"
                        onClick={() => handleEditCourse(course._id)}
                      >
                        <div className="bg-green-200 p-2 rounded-md">
                          <Pencil className="h-4 w-4 text-green-700" />
                        </div>
                        <span className="text-sm font-medium">Edit Course</span>
                      </div>

                      <div
                        className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer"
                        onClick={() => handleManageCourse(course._id)}
                      >
                        <div className="bg-green-200 p-2 rounded-md">
                          <Search className="h-4 w-4 text-green-700" />
                        </div>
                        <span className="text-sm font-medium">Manage Course</span>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                      onClick={() => handleAttendance(course._id)}>
                        <div className="bg-green-200 p-2 rounded-md">
                          <GraduationCap className="h-4 w-4 text-green-700" />
                        </div>
                        <span className="text-sm font-medium">Attendance</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl">No courses assigned yet.</h3>
              <p className="text-gray-500">Check back later or contact your admin.</p>
            </div>
          )}
        </div>

        {/* Calendar Section */}
        <div className="w-[380px] bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[300px]">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
