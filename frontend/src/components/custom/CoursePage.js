'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AddCourseForm from '@/components/custom/AddCourseForm';

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/allcourses');
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleModalClose = () => {
    setShowAddModal(false);
    fetchCourses();
  };

  return (
    <div className="p-6 bg-[#f4f7ff] min-h-screen">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <div className="text-sm text-muted-foreground">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Course</span>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-[#1D1E40] text-white">
          Create Course
        </Button>
      </div>

      <div className="flex gap-4 mb-6 max-w-7xl mx-auto">
        <Button variant="outline" className="rounded-full px-4">Ongoing (08)</Button>
        <Button variant="outline" className="rounded-full px-4">Completed (10)</Button>
        <Button variant="outline" className="rounded-full px-4">Saved (12)</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <Card key={index} className="p-4 space-y-3 border rounded-xl relative">
            <Image
              src={`http://localhost:4000/${course.image}`}
              alt={course.title}
              width={500}
              height={300}
              className="object-cover w-full h-[200px]"
            />
            <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
              ${course.price}
            </div>
            <span className="text-xs font-medium text-gray-700 px-2 py-1 rounded">
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
              <div className="text-xs text-yellow-600 flex items-center">
                ⭐ 4.9 (12k)
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2">
              View Progress
            </Button>
          </Card>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow">
            <AddCourseForm onClose={handleModalClose} />
          </div>
        </div>
      )}

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
