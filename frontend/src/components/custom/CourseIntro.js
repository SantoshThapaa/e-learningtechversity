'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export default function CourseIntro() {
  const [isLogin, setIsLogin] = useState(true)

  const variants = {
    hidden: { opacity: 0, x: isLogin ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? -100 : 100 },
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Auth Box */}
        <div className="w-full lg:w-[40%] shadow-lg rounded-xl p-6 bg-white">
          {/* Toggle Tabs */}
          <div className="flex mb-6 overflow-hidden rounded-md border border-gray-200">
            <Button
              onClick={() => setIsLogin(false)}
              className={`rounded-none w-1/2 ${
                !isLogin ? 'bg-[#00C853] text-white' : 'bg-white text-black'
              }`}
            >
              REGISTER
            </Button>
            <Button
              onClick={() => setIsLogin(true)}
              className={`rounded-none w-1/2 ${
                isLogin ? 'bg-[#00C853] text-white' : 'bg-white text-black'
              }`}
            >
              LOG IN
            </Button>
          </div>

          {/* Animated Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-1">Hey,</h2>
                <p className="text-lg font-semibold mb-4">Please Log In</p>
                <p className="text-sm mb-6 text-gray-500">
                  We are very happy to see you back!
                </p>

                <Input placeholder="Email" className="mb-4" />
                <Input placeholder="Password" type="password" className="mb-2" />
                <Button className="w-full mt-4 bg-[#00C853]">Login</Button>

                <div className="my-4 text-center text-sm text-gray-500">OR</div>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">Signup with Google</Button>
                  <Button variant="outline">Signup with Microsoft</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-1">Hey,</h2>
                <p className="text-lg font-semibold mb-4">Please Register.</p>
                <p className="text-sm mb-6 text-gray-500">
                  We are very happy to see you!
                </p>

                <Input placeholder="Name" className="mb-4" />
                <Input placeholder="Email" className="mb-4" />
                <Input placeholder="Password" type="password" className="mb-4" />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="mb-4"
                />
                <Button className="w-full mt-2 bg-[#00C853]">Register</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Course Info */}
        <div className="flex-1">
          <Image
            src="/course-details.jpg.png"
            alt="Course Visual"
            width={600}
            height={400}
            className="rounded-xl mb-6"
          />
          <h2 className="text-2xl font-bold mb-3">UI/UX design</h2>
          <p className="text-gray-700 mb-6">
            Embark on a transformative journey to enhance your English communication skills...
          </p>

          <h3 className="text-lg font-semibold mb-2">Course Duration:</h3>
          <ul className="list-disc list-inside mb-6 text-gray-600">
            <li>Choose from flexible schedules</li>
            <li>Classes conducted twice a week...</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Course Objectives:</h3>
          <ul className="list-decimal list-inside text-gray-600">
            <li>Develop fluency in spoken English.</li>
            <li>Enhance pronunciation and articulation.</li>
            <li>Build strong foundation...</li>
          </ul>

          <div className="mt-6">
            <p className="font-semibold">Jeffrey E. Walton</p>
            <p className="text-sm text-gray-500">Instructor, UI/UX Designer</p>
          </div>
        </div>
      </div>
    </section>
  )
}
