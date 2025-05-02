'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import CircularProgress from '@/components/ui/circular-progress';

export default function OverviewTab() {
  const [lecture, setLecture] = useState(null);
  const [teacher, setTeacher] = useState(null); // Store teacher data
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState({
    attendance: 0,
    lessonsCompleted: 0,
    assignmentsCompleted: 0,
  });

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

    const fetchPerformanceData = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/assignment/assignments/completed`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const completedAssignments = res.data.completedAssignments.reduce(
          (acc, assignment) => acc + assignment.completedCount,
          0
        );
        const totalAssignments = res.data.completedAssignments.reduce(
          (acc, assignment) => acc + assignment.totalSubmissions,
          0
        );

        const assignmentsCompleted = (completedAssignments / totalAssignments) * 100;

        setPerformanceData(prevData => ({
          ...prevData,
          assignmentsCompleted,
        }));
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    const fetchAttendancePercentage = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/courses/${courseId}/attendance/percentage`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerformanceData(prevData => ({
          ...prevData,
          attendance: res.data.attendancePercentage,
        }));
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    const fetchLectureCompletionPercentage = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/courses/${courseId}/lecture-completion`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const completionPercentage = parseFloat(res.data.completionPercentage);

        setPerformanceData(prevData => ({
          ...prevData,
          lessonsCompleted: completionPercentage, 
        }));
      } catch (error) {
        console.error('Error fetching lecture completion data:', error);
      }
    };

    const fetchTeacherData = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) return;

      try {
        const courseRes = await axios.get(`http://localhost:4000/api/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const assignedTo = courseRes.data.course?.assignedTo;

        if (Array.isArray(assignedTo)) {
          const teacherDetails = await Promise.all(
            assignedTo.map(async (teacherId) => {
              const resTeacher = await fetch(`http://localhost:4000/api/teachers/${teacherId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await resTeacher.json();
              return data.teacher;
            })
          );
          setTeacher(teacherDetails[0]); 
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchLecture();
    fetchPerformanceData();
    fetchAttendancePercentage();
    fetchLectureCompletionPercentage();
    fetchTeacherData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
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

          <div className="flex items-center gap-4 mt-6">
            {teacher && teacher.profile && teacher.profile.profilePicture && (
              <Image
                src={`http://localhost:4000${teacher?.profile?.profilePicture || '/uploads/default-bg.jpg'}`}
                alt="Instructor"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold mt-2">
              {teacher.name}
              </h3>
              <p className="text-sm text-gray-500">{teacher.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Performance Section */}
      <div className="lg:w-1/3 w-full">
        <h3 className="text-xl font-bold mb-6 ml-30">Performance</h3>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <CircularProgress percent={performanceData.attendance} color="green" />
            <p className="mt-2 text-sm text-gray-600">Attendance</p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress percent={performanceData.lessonsCompleted} color="blue" />
            <p className="mt-2 text-sm text-gray-600">Lessons Completed</p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress percent={performanceData.assignmentsCompleted} color="orange" />
            <p className="mt-2 text-sm text-gray-600">Assignments Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
