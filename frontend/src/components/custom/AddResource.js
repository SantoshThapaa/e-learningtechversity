'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadCloud } from 'lucide-react';
import { getUserIdFromToken } from '@/utils/authUtils';

export default function AddResource() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [subHeadingTitle, setSubHeadingTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const maybeUserId = getUserIdFromToken();

      if (!token || !maybeUserId) {
        toast.error('You must be logged in as a teacher.');
        return;
      }

      const res = await axios.get(`http://localhost:4000/api/assigned-courses/${maybeUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data.courses) && res.data.courses.length > 0) {
        setCourses(res.data.courses);
        setCourseId(res.data.courses[0]._id); // auto-select first course
      } else {
        toast.warning('No assigned courses found.');
      }
    } catch (error) {
      console.error('Error fetching assigned courses:', error);
      toast.error('Failed to load courses.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleSubmit = async () => {
    if (!courseId || !sectionTitle || !subHeadingTitle || !video) {
      toast.error('Please fill all fields and upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('sectionTitle', sectionTitle);
    formData.append('subHeadingTitle', subHeadingTitle);
    formData.append('video', video);

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:4000/api/resources/${courseId}/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Resource uploaded successfully!');
      setSectionTitle('');
      setSubHeadingTitle('');
      setVideo(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resource.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f8ff] rounded-2xl mt-20 p-6 relative w-full mx-auto">
      {/* Top-right Save Button */}
      <div className="absolute top-4 right-4">
        <Button
          className="bg-blue-600 text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-1">Sub heading</h2>
      <p className="text-sm text-gray-600 mb-6">Enter a sub heading and upload a video</p>

      {/* Section Title Input */}
      <div className="mb-4">
        <Label htmlFor="sectionTitle" className="mb-1 block">Section Title</Label>
        <Input
          id="sectionTitle"
          value={sectionTitle}
          placeholder="e.g. UI Basics"
          onChange={(e) => setSectionTitle(e.target.value)}
        />
      </div>

      {/* Subheading Title Input */}
      <div className="mb-4">
        <Label htmlFor="subHeading" className="mb-1 block">Sub Heading Title</Label>
        <Input
          id="subHeading"
          value={subHeadingTitle}
          placeholder="e.g. Introduction to UI"
          onChange={(e) => setSubHeadingTitle(e.target.value)}
        />
      </div>

      {/* Video Upload Section */}
      <label
        htmlFor="video"
        className="flex flex-col items-center justify-center border border-dashed border-blue-300 bg-blue-50 py-10 rounded-xl cursor-pointer transition hover:bg-blue-100"
      >
        <UploadCloud size={32} className="text-blue-500 mb-2" />
        <p className="text-gray-500">Please upload a video</p>
        <p className="text-sm text-blue-600 mt-1">MP4, Aspect ratio 16:9</p>
        <input
          type="file"
          id="video"
          accept="video/mp4"
          className="hidden"
          onChange={handleVideoChange}
        />
        {video && (
          <p className="mt-2 text-sm text-green-600">{video.name}</p>
        )}
      </label>
    </div>
  );
}
