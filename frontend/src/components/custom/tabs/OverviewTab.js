'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import CircularProgress from '@/components/ui/circular-progress';

export default function OverviewTab() {
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to transform various YouTube URLs into an embed URL
  const getYoutubeEmbedUrl = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&?/]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  useEffect(() => {
    const fetchLecture = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/lectures/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.lectures && res.data.lectures.length > 0) {
          setLecture(res.data.lectures[0]);
        }
      } catch (error) {
        console.error('Error fetching lecture:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading lecture...</p>;
  }

  if (!lecture) {
    return <p className="text-center mt-10 text-red-500">Lecture not found.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-20">
      {/* Left Side: Video & Description */}
      <div className="lg:w-2/3 w-full">
        <div className="w-full mb-6">
          <iframe
            className="w-full h-[300px] rounded-lg shadow"
            src={getYoutubeEmbedUrl(lecture.videoLink)}
            title={lecture.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">{lecture.title}</h2>
          <p
            className="text-gray-600 mb-6"
            dangerouslySetInnerHTML={{ __html: lecture.description }}
          />

          <h3 className="font-semibold text-lg mb-2">Course Duration:</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>Duration: {lecture.courseDuration}</li>
            <li>Time: {lecture.courseTime}</li>
          </ul>

          <h3 className="font-semibold text-lg mb-2">Course Objectives:</h3>
          <ol className="list-decimal pl-5 text-gray-700 space-y-1">
            <li>Develop fluency in spoken English.</li>
            <li>Enhance pronunciation and articulation.</li>
            <li>Build a strong foundation in grammar and vocabulary.</li>
            <li>Improve listening and comprehension skills.</li>
            <li>Gain confidence in diverse communication scenarios.</li>
          </ol>

          <div className="flex items-center gap-4 mt-6">
            <Image
              src="/instructor.jpg"
              width={50}
              height={50}
              className="rounded-full object-cover"
              alt="Instructor"
            />
            <div>
              <p className="font-semibold">Jeffrey E. Walton</p>
              <p className="text-sm text-gray-500">Instructor, UI/UX Designer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Performance Section */}
      <div className="lg:w-1/3 w-full">
        <h3 className="text-xl font-bold mb-6 ml-30">Performance</h3>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <CircularProgress percent={60} color="green" />
            <p className="mt-2 text-sm text-gray-600">Attendance</p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress percent={75} color="blue" />
            <p className="mt-2 text-sm text-gray-600">Lessons Completed</p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress percent={90} color="orange" />
            <p className="mt-2 text-sm text-gray-600">Assignments Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
