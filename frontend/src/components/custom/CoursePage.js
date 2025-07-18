'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HiOutlinePlus } from 'react-icons/hi';

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [inProgressCourses, setInProgressCourses] = useState(0);
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const res = await axios.get('https://back.bishalpantha.com.np/api/allcourses');
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCoursesStatus = async () => {
      try {
        const response = await fetch('https://back.bishalpantha.com.np/api/courses/status');
        const data = await response.json();
        setCompletedCourses(data.completedCourses);
        setInProgressCourses(data.inProgressCourses);
      } catch (error) {
        console.error("Error fetching course status:", error);
      }
    };

    fetchCoursesStatus();
  }, []);

  return (
    <div className="p-6 bg-[#f4f7ff] min-h-screen">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <div className="text-sm text-muted-foreground">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Course</span>
        </div>
        <button
          className="bg-[#1A2D62] text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors"
          onClick={() => {
            console.log("Redirecting to /admin/courseform...");
            router.push("/admin/courseform");
          }}
        >
          <HiOutlinePlus className="text-xl" />
          Create Course
        </button>

      </div>

      <div className="flex gap-4 mb-6 max-w-7xl mx-auto">
        <Button variant="outline" className="rounded-full px-4">
          Ongoing ({inProgressCourses})
        </Button>
        <Button variant="outline" className="rounded-full px-4">
          Completed ({completedCourses})
        </Button>
        <Button variant="outline" className="rounded-full px-4">
          Saved ({completedCourses + inProgressCourses})
        </Button>
      </div>

      <div className=" flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <Card key={index} className="p-4 border rounded-xl relative">
            <Image
              src={`https://back.bishalpantha.com.np/${course.image}`}
              alt={course.title}
              width={500}
              height={300}
              className="object-cover w-full h-[200px]"
            />
            <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
              ${course.price}
            </div>
            <span className="text-xs font-medium text-gray-700 px-2 rounded">
              <span className="bg-[#16A34A] px-1 text-white rounded">
                {course.category}
              </span>
            </span>
            <h3 className="font-semibold text-sm">{course.title}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress || 0}%` }}></div>
            </div>
            <div className="text-xs text-gray-600">
              Mentor{' '}
              <span className="font-medium text-black">
                {course.assignedTo?.length > 0
                  ? course.assignedTo.map((teacher) => teacher.name).join(', ')
                  : 'N/A'}
              </span>
            </div>
            <Button variant="outline" className="w-full mt-1">
              View Progress
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center mt-16">
        © Copyright Techyversity 2025, All Right Reserved
        <div className="flex justify-center gap-4 mt-1">
          <a href="#" className="hover:underline">License</a>
          <a href="#" className="hover:underline">More Themes</a>
          <a href="#" className="hover:underline">Documentation</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </div>
  );
}
