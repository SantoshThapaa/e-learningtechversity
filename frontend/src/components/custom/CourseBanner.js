'use client'
import Image from 'next/image'

export default function CourseBanner() {
  return (
    <div className="relative w-full h-[550px]">
      <Image
        src="/Background-10.png"
        alt="Course Details Banner"
        layout="fill" // Correctly apply the layout "fill"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">COURSE DETAILS</h1>
      </div>
    </div>
  )
}
