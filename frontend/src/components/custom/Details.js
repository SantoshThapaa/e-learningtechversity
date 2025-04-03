'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Login from './Login'
import Register from './Register'

export default function Details() {
  const [isLogin, setIsLogin] = useState(true)

  const variants = {
    hidden: { opacity: 0, x: isLogin ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? -100 : 100 },
  }

  return (
    <div className="flex-1">
          <Image
            src="/course-details.jpg.png"
            alt="Course Visual"
            width={600}
            height={400}
            className="rounded-xl mb-6"
          />
          <h2 className="text-2xl font-bold mb-3">UI/UX Design</h2>
          <p className="text-gray-700 mb-6">
            Embark on a transformative journey to enhance your UI/UX design skills...
          </p>

          <h3 className="text-lg font-semibold mb-2">Course Duration:</h3>
          <ul className="list-disc list-inside mb-6 text-gray-600">
            <li>Choose from flexible schedules</li>
            <li>Classes conducted twice a week...</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Course Objectives:</h3>
          <ul className="list-decimal list-inside text-gray-600">
            <li>Develop fluency in UI/UX principles.</li>
            <li>Enhance design thinking and user experience.</li>
            <li>Build a strong foundation in prototyping...</li>
          </ul>

          <div className="mt-6">
            <p className="font-semibold">Jeffrey E. Walton</p>
            <p className="text-sm text-gray-500">Instructor, UI/UX Designer</p>
          </div>
        </div>
  );
};
