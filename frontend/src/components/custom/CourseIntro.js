'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Login from './Login'
import Register from './Register'
import Details from './Details'

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
              className={`rounded-none w-1/2 ${!isLogin ? 'bg-[#00C853] text-white' : 'bg-white text-black'}`}
            >
              REGISTER
            </Button>
            <Button
              onClick={() => setIsLogin(true)}
              className={`rounded-none w-1/2 ${isLogin ? 'bg-[#00C853] text-white' : 'bg-white text-black'}`}
            >
              LOG IN
            </Button>
          </div>

          {/* Animated Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? <Login variants={variants} /> : <Register variants={variants} />}
          </AnimatePresence>
        </div>

        {/* Right: Course Info */}
        <Details/>
      </div>
    </section>
  )
}
