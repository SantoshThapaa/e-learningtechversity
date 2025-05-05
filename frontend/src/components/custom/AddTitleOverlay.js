
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getUserIdFromToken } from '@/utils/authUtils';

export default function AddTitleOverlay({ onClose, onTitleAdded }) {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const teacherId = getUserIdFromToken();

      if (!token || !teacherId) {
        toast.error('Login required.');
        return;
      }

      const res = await axios.get(`https://back.bishalpantha.com.np/api/assigned-courses/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.courses?.length > 0) {
        setCourses(res.data.courses);
        setCourseId(res.data.courses[0]._id);
      } else {
        toast.warning('No courses assigned to you.');
      }
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSave = async () => {
    if (!courseId || !title.trim()) {
      toast.error('Course and title are required');
      return;
    }

    const formData = new FormData();
    formData.append('sectionTitle', title);
    formData.append('subHeadingTitle', 'placeholder');
    const dummyBlob = new Blob(['dummy'], { type: 'video/mp4' });
    formData.append('video', dummyBlob, 'placeholder.mp4');

    try {
      await axios.post(`https://back.bishalpantha.com.np/api/resources/${courseId}/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Title "${title}" added successfully`);
      onTitleAdded();
      onClose();
    } catch (err) {
      toast.error('Failed to add title');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black-50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add New Title</h2>

        <label className="block text-sm font-medium mb-2">Select Course</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <Input
          placeholder="Enter title name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-900 text-white px-6">Save</Button>
        </div>
      </div>
    </div>
  );
}
