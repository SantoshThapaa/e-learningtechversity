'use client';
import { useEffect, useState } from 'react';
import CourseCard from "@/components/custom/CourseCard";
import CourseFilter from "@/components/custom/CourseFilter";
import axios from 'axios';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allcourses');
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="py-20 px-2 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Left: Filter Section */}
        <CourseFilter />

        {/* Right: Course Grid */}
        <div className="w-full px-4 lg:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
