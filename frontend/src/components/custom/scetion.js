"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Section() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-4 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left image */}
        <div className="w-full lg:w-[45%]">
          <Image
            src="/about1.jpg.png"
            alt="Students with flags"
            width={600}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Right content */}
        <div className="w-full lg:w-[55%]">
          <div className="relative mb-6">
            <Image
              src="/about2.jpg.png"
              alt="Play Video"
              width={680}
              height={200}
              className="rounded-br-[100px]"
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            DELVING INTO OUR <br className="hidden md:block" /> LINGUISTIC ODYSSEY
          </h2>
          <p className="text-gray-600 mb-4">
            We are dedicated to fostering a vibrant community of language learners committed to linguistic proficiency and cultural appreciation. Established in 2002.
          </p>
          <p className="text-gray-600 mb-6">
            Our journey began with a vision to provide an immersive and comprehensive language education experience guided by.
          </p>
          <Button className="bg-green-500 text-white hover:bg-green-600">Enroll Now</Button>
        </div>
      </div>
    </section>
  )
}
