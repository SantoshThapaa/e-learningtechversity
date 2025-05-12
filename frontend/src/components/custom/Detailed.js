'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { getCourseIdFromLocalStorage } from '@/utils/authUtils' 
import axios from 'axios' 

export default function Details() {
  const [course, setCourse] = useState(null)
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)

  const courseId = getCourseIdFromLocalStorage()

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://back.bishalpantha.com.np/api/course/${courseId}`)
        setCourse(response.data.course)
        if (response.data.course.assignedTo && response.data.course.assignedTo.length > 0) {
          const teacherId = response.data.course.assignedTo[0]
          const teacherResponse = await axios.get(`https://back.bishalpantha.com.np/api/teachers/${teacherId}`)
          setTeacher(teacherResponse.data.teacher)
        }
      } catch (error) {
        console.error('Error fetching course details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>
  }

  if (!course) {
    return <p className="text-center mt-10 text-red-500">Course not found.</p>
  }

  return (
    <div className="flex-1">
      <Image
        src={`https://back.bishalpantha.com.np/${course.image}`} 
        alt="Course Visual"
        width={400}
        height={150}
        className="rounded-xl mb-6"
      />
      <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
      <p className="text-gray-700 mb-6">{course.description}</p>

      <h3 className="text-lg font-semibold mb-2">Course Duration:</h3>
      <ul className="list-disc list-inside mb-6 text-gray-600">
        <li>{course.duration}</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">Course Category:</h3>
      <p className="text-gray-600">{course.category}</p>

      <h3 className="text-lg font-semibold mb-2">Price:</h3>
      <p className="text-gray-600">${course.price}</p>

      <div className="mt-6">
        {teacher ? (
          <>
            {teacher.profile?.profilePicture && (
              <Image
                src={`https://back.bishalpantha.com.np${teacher.profile.profilePicture}`} 
                alt="Instructor"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            )}
            <p className="font-semibold">{teacher.name || 'Instructor Name'}</p>
            <p className="text-sm text-gray-500">{teacher.role || 'Instructor Role'}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">Instructor details not available.</p>
        )}
      </div>
    </div>
  )
}
