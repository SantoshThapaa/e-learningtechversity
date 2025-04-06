'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { FaStar, FaClock, FaChalkboardTeacher } from 'react-icons/fa';
import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full p-4"
    >
      <Card className="shadow-lg rounded-xl overflow-hidden relative">
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

        <Link href={`/student/payment`}>
          <CardContent className="p-4 cursor-pointer">
            <h3 className="text-lg font-semibold text-black">{course.title}</h3>

            {/* Category */}
            <p className="text-sm text-gray-600 mb-2">
              <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                {course.category}
              </span>
            </p>

            <div className="flex items-center space-x-4 mb-4">
              {/* Duration */}
              <div className="flex items-center text-sm text-gray-600">
                <FaClock className="text-green-500 mr-1" />
                {course.duration}
              </div>

              {/* Static Rating */}
              <div className="flex items-center text-sm text-gray-600">
                <FaStar className="text-yellow-500" size={16} />
                <span className="ml-2">4.9</span>
              </div>
            </div>

            {/* Optional: Display assigned mentor */}
            <p className="text-sm text-gray-600">
              Mentor:{" "}
              <span className="font-medium text-black">
                {course.assignedTo?.length > 0
                  ? course.assignedTo.map(t => t.name).join(", ")
                  : "N/A"}
              </span>
            </p>

            {/* Seats based on enrolled count */}
            <p className="text-sm text-gray-600 mt-1">
              Seats Available: {30 - (course.enrolledStudents?.length || 0)}
            </p>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
