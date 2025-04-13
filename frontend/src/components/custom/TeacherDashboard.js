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
    const [showAddModal, setShowAddModal] = useState(false);


    const fetchAssignedCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/assigned-courses/${teacherId}`);
            setCourses(response.data.courses || []);
        } catch (error) {
            console.error("Error fetching assigned courses:", error);
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const id = getUserIdFromToken()
          if (!id) {
            router.push('/student/enrollnow')
          } else {
            setTeacherId(id)
            fetchAssignedCourses(id)
          }
        }
      }, [router])
    

    const handleEditCourse = (courseId) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("courseId", courseId);
          router.push('/teacher/editcourse');
        }
      };
      
      const handleManageCourse = (courseId) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("courseId", courseId);
          router.push('/teacher/managecourse');
        }
      };
      

    return (
        <div className="bg-gray-100 lg:p-20">
            <div className="flex flex-wrap justify-between gap-10 mb-6">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <Card key={index} className="w-full md:w-[45%] bg-green-50 border border-blue-100 rounded-xl shadow-sm">
                            <div className="flex gap-4">
                                {/* Left Section */}
                                <div className="bg-white rounded-lg p-4 w-1/2 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-md">Completed</span>
                                        <span className="text-xs text-gray-400">04/06/2025</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mb-1">6 weeks</div>
                                    <h3 className="text-lg font-semibold">{course.title}</h3>
                                    <div className="text-sm text-gray-500">Batch {course.batchNo}</div>
                                </div>

                                {/* Right Section */}
                                <div className="flex flex-col gap-4 w-1/2 px-4">
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer" onClick={() => handleEditCourse(course._id)}>
                                        <div className="bg-green-200 p-2 rounded-md">
                                            <Pencil className="h-4 w-4 text-green-700" />
                                        </div>
                                        <span className="text-sm font-medium">Edit Course</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer" onClick={() => handleManageCourse(course._id)}>
                                        <div className="bg-green-200 p-2 rounded-md">
                                            <Search className="h-4 w-4 text-green-700" />
                                        </div>
                                        <span className="text-sm font-medium">Manage Course</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                        <div className="bg-green-200 p-2 rounded-md">
                                            <GraduationCap className="h-4 w-4 text-green-700" />
                                        </div>
                                        <span className="text-sm font-medium">Attendance</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-xl text-center">No courses assigned yet.</h3>
                        <p className="text-center text-gray-500">You have not been assigned any courses yet. Please check back later or contact your admin.</p>
                    </div>
                )}

                <div className="w-full md:w-[45%] p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
