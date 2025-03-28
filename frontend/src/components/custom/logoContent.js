"use client"
import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"

export default function LogoContent() {
  const logos = [
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ]

  // Duplicate logos for seamless looping
  const scrollingLogos = [...logos, ...logos]

  return (
    <div className="mt-[30px] overflow-hidden bg-[#f1fffb] py-6">
      <motion.div
        className="flex gap-16 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {scrollingLogos.map((src, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[200px]"
          >
            <Image
              src={src}
              alt={`Logo ${index + 1}`}
              width={200}
              height={140}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
