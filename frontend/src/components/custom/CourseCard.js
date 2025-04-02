'use client'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { FaClock, FaChalkboardTeacher } from 'react-icons/fa'
import Link from 'next/link' // Import Link from Next.js

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
                    src={course.image}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-[200px]"
                />

                <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                    ${course.price}
                </div>

                {/* Wrap CardContent with Link to navigate to the payment page */}
                <Link href={`/payment/${course.id}`}>
                    <CardContent className="p-4 cursor-pointer"> {/* Add cursor-pointer to indicate it's clickable */}
                        <h3 className="text-lg font-semibold text-black">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.category}</p>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <FaChalkboardTeacher className="text-green-500 mr-1" />
                                {course.lessons} Lessons
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                                <FaClock className="text-green-500 mr-1" />
                                {course.duration} weeks
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                                <FaStar className="text-yellow-500" size={16} />
                                <span className="ml-2">{course.rating}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">
                            {course.seats} Seats Available
                        </p>
                    </CardContent>
                </Link>
            </Card>
        </motion.div>
    )
}
