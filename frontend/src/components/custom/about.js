'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="w-[90%] mx-auto mt-[60px] py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full lg:w-[55%]"
      >
        <h2 className="text-[32px] font-semibold text-black leading-[48px] font-sans">
          WHO WE ARE: SHAPING THE <br /> FUTURE OF TECH EDUCATION
        </h2>
        <p className="mt-4 text-[#555555] text-[16px] leading-[28.8px] font-sans">
          We’re here to help you learn the tech skills you need to grow, create, and <br />
          succeed. With passionate instructors and hands-on courses, we make <br />
          learning easy, fun, and future-focused.
        </p>

        <div className="mt-6 text-[48px] font-bold text-black">
          250<span className="text-[#00C853]">+</span>
        </div>
        <p className="text-gray-600 text-[28px] font-normal">Trusted partners</p>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full lg:w-[45%] flex flex-col space-y-5"
      >
        {/* Students Feedback */}
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2 overflow-hidden">
            {[6, 7, 8, 9].map((num) => (
              <Image
                key={num}
                src={`/user${num}.jpg.png`}
                alt={`Student ${num}`}
                width={50}
                height={50}
                className="rounded-full border border-white hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[20px] font-bold text-black">1000+</p>
          <p className="text-gray-600 text-[16px] leading-[28.8px] font-sans">
            Positive feedback by our students
          </p>
        </div>

        {/* Video Section */}
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
          <Image
            src="/about3.jpg.png"
            alt="Students watching video"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button className="w-[50px] h-[50px] p-0 bg-white rounded-full shadow-md hover:scale-105 transition">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7L8 5z" fill="#00C853" />
              </svg>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;