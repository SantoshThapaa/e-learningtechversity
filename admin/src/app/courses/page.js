'use client';

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
    <div className="p-6 mt-20 ml-60">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course</h2>
        <Button onClick={() => setShowAddModal(true)} className="bg-[#1D1E40] text-white">
          Create Course
        </Button>
      </div>

      {/* Tabs Placeholder */}
      <div className="flex gap-4 mb-6">
        <Button variant="outline" className="rounded-full px-4">Ongoing (08)</Button>
        <Button variant="outline" className="rounded-full px-4">Completed (10)</Button>
        <Button variant="outline" className="rounded-full px-4">Saved (12)</Button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course, index) => (
          <Card key={index} className="p-4 space-y-3 border rounded-xl">
            <img
              src={`http://localhost:4000/${course.image}`}
              alt="course thumbnail"
              className="w-full h-32 object-cover rounded"
            />
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
              Mentor{" "}
              <span className="font-medium text-black">
                {course.assignedTo?.length > 0
                  ? course.assignedTo.map((teacher) => teacher.name).join(', ')
                  : 'N/A'}
              </span>
              <div className="text-xs text-yellow-600 flex items-center ">
              ⭐ 4.9 (12k)
            </div>
            </div>
            
            <Button variant="outline" className="w-full mt-2">
              View Progress
            </Button>
          </Card>
        ))}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow">
            <AddCourseForm onClose={handleModalClose} />
          </div>
        </div>
      )}
    </div>
  );
}
