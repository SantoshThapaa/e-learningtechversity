'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaStar, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import { TbLanguage } from 'react-icons/tb';
import { GiLevelThreeAdvanced } from 'react-icons/gi';
import { MailIcon } from 'lucide-react';
import { getCourseIdFromLocalStorage } from '@/utils/authUtils';
import CourseTabs from './tabs/CourseTabs';

export default function AssignmentInstructorCard() {
  const [lecture, setLecture] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const courseId = getCourseIdFromLocalStorage();
      const token = localStorage.getItem("token");

      if (!courseId || !token) {
        setError("Missing courseId or token");
        return;
      }

      try {

        const resLecture = await fetch(`http://localhost:4000/api/lectures/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lectureData = await resLecture.json();
        if (resLecture.ok) {
          setLecture(lectureData.lectures[0]);
        }

        const resCourse = await fetch(`http://localhost:4000/api/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const courseData = await resCourse.json();
        const assignedTo = courseData.course?.assignedTo;

        if (Array.isArray(assignedTo)) {
          const teacherDetails = await Promise.all(
            assignedTo.map(async (teacherId) => {
              const resTeacher = await fetch(`http://localhost:4000/api/teachers/${teacherId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await resTeacher.json();
              console.log("IMAGE PATH:", data.teacher?.profile?.profilePicture);
              return data.teacher;
            })
          );
          setTeachers(teacherDetails);

        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="text-center text-red-600 font-semibold mt-10">{error}</div>;
  if (!lecture) return <div className="text-center text-gray-500 font-medium mt-10">Loading lecture details...</div>;


  return (
    <div className='w-full bg-white'>
      <div className="flex flex-col lg:flex-row gap-8 lg:mt-30 w-full">
        {/* Left Section */}
        <Card className="w-full lg:w-[70%] p-0 overflow-hidden">
          <Image
            src={`http://localhost:4000${lecture.thumbnail.replace('/thumbnail/', '/thumbnails/')}`}
            alt={lecture.title}
            className="w-full h-[300px] object-cover"
            width={600}
            height={300}
          />

          <CardContent className="p-6">
            <span className="inline-block bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              {lecture.hashtags}
            </span>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{lecture.title}</h2>
            <div className="flex items-center gap-2 text-green-600 font-medium text-sm mb-4">
              <FaStar className="text-yellow-500" />
              4.8
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                1 Lesson
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineClock className="text-green-600" />
                {lecture.courseDuration}
              </div>
              <div className="flex items-center gap-2">
                <TbLanguage className="text-green-600" />
                {lecture.language}
              </div>
              <div className="flex items-center gap-2">
                <GiLevelThreeAdvanced className="text-green-600" />
                {lecture.level}
              </div>
              <div className="flex items-center gap-2">
                <FaDownload className="text-green-600" />
                70 downloads
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Section */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <Card key={teacher._id || index} className="p-6 text-center shadow-lg">
                <div className="flex justify-center">
                  <Image
                    src={`http://localhost:4000/${teacher?.profile?.profilePicture || 'uploads/default-bg.jpg'}`}
                    alt="Instructor"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />

                </div>
                <h3 className="text-lg font-semibold mt-4">{teacher.fullName}</h3>
                <p className="text-sm text-gray-500">{teacher.role}</p>
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-600">
                  <MailIcon className="w-4 h-4" />
                  <a href={`mailto:${teacher.email}`} className="underline">
                    {teacher.email}
                  </a>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <span className="inline-block bg-green-100 px-2 py-1 rounded-full">
                    Exp. {teacher.experience || "N/A"}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">No teachers assigned.</p>
          )}

          {/* Join Section */}
          <Card className="p-6 text-center shadow-lg">
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg"
              onClick={() => window.open(lecture.meetLink, "_blank")} // Open meet link in a new tab
            >
              Join
            </Button>
            <p className="text-sm text-gray-500 mt-3">The class at {lecture.courseTime}</p>
            <a
              href={lecture.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 underline mt-1 inline-block"
            >
              {lecture.meetLink}
            </a>
          </Card>

        </div>
      </div>
    </div>
  );
}
