"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "@/utils/authUtils";

export default function AssignmentForm() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const teacherId = getUserIdFromToken();

      if (!token || !teacherId) {
        toast.error('Login required to fetch courses.');
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
      console.error(error);
      toast.error('Failed to fetch courses.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSave = async () => {
    if (!title || !dueDate || !brief || !courseId) {
      toast.error("Please fill all fields before saving.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `https://back.bishalpantha.com.np/api/assignment/create/${courseId}`,
        { 
          title,
          description: brief,  
          deadline: dueDate,    
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Assignment created successfully!");
      setTitle('');
      setDueDate('');
      setBrief('');
    } catch (error) {
      console.error('Failed to create assignment:', error);
      toast.error('Failed to create assignment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg">
      <div className="space-y-6">
        
        {/* Course Selection */}
        <div className="space-y-2">
          <Label htmlFor="courseId" className="text-base">Select Course</Label>
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

        {/* Title Field */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New project of ui/ux"
            className="text-sm"
          />
        </div>

        {/* Due Date Field */}
        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-base">Due Date</Label>
          <Input
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Enter due date"
            className="text-sm"
            type="date"
          />
        </div>

        {/* Brief Field */}
        <div className="space-y-2">
          <Label htmlFor="brief" className="text-base">Breif</Label>
          <Textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Enter project brief"
            className="text-sm resize-none"
            rows={5}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#1A2D62] text-white w-32 hover:bg-[#152350]"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>

      </div>
    </div>
  );
}
