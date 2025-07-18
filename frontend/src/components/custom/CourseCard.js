'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { FaStar, FaClock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CourseCard({ course }) {
  const router = useRouter();
  const handleRedirect = () => {
    localStorage.setItem('courseId', course._id);
    router.push('/student/payment');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex w-full p-4"
    >
      <Card
        onClick={handleRedirect}
        className="shadow-lg rounded-xl overflow-hidden relative cursor-pointer"
      >
        <Image
          src={`https://back.bishalpantha.com.np/${course.image}`}
          alt={course.title}
          width={500}
          height={300}
          className="object-cover w-full h-[200px]"
        />

        <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
          ${course.price}
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-black">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="inline-block bg-gray-100 px-2 py-1 rounded bg-green-200">
              {course.category}
            </span>
          </p>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaClock className="text-green-500 mr-1" />
              {course.duration}
            </div>
            {/* <div className="flex items-center text-sm text-gray-600">
              <FaStar className="text-yellow-500" size={16} />
              <span className="ml-2">4.9</span>
            </div> */}
          </div>

          <p className="text-sm text-gray-600">
            Mentor:{' '}
            <span className="font-medium text-black">
              {course.assignedTo?.length > 0
                ? course.assignedTo.map((t) => t.name).join(', ')
                : 'N/A'}
            </span>
          </p>

          {/* <p className="text-sm text-gray-600 mt-1">
            Seats Available: {30 - (course.enrolledStudents?.length || 0)}
          </p> */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
