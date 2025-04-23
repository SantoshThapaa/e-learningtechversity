'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Testimonial = () => {
  return (
    <section className="w-full bg-white px-4 py-8 mt-[30px]">
      <div className="container mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-between items-center w-[90%] mx-auto mt-[80px]"
        >
          {/* Left Content */}
          <div>
            <h2 className="text-[40px] font-semibold text-black leading-[48px] font-[unbounded]">
              OUR POPULAR COURSES
            </h2>
            <p className="text-[#555555] text-[16px] font-[poppins] leading-[28.8px]">
              Discover a variety of engaging tech courses designed to help <br />
              you master new skills, stay ahead in your career, and turn <br />
              your ideas into reality.
            </p>
          </div>

          {/* Right CTA Button */}
          <Button className="w-[150px] h-[150px] rounded-full bg-[#00D96A] text-black text-[16px] font-[poppins] flex flex-col justify-center items-center hover:bg-[#00c060] transition">
            Explore All <br /> Courses
            <FontAwesomeIcon icon={faArrowRight} className="text-white mt-2" />
          </Button>
        </motion.div>

        {/* Course Cards */}
        <div className="flex justify-between gap-6 w-[90%] mx-auto">
          {[
            {
              title: 'UI/UX Designing',
              number: '01',
              color: '#0B944D',
              desc: 'Learn the Beauty of UI/UX',
              instructor: 'Steven James',
              img: '/user1.jpg.png',
            },
            {
              title: 'MERN Stack',
              number: '02',
              color: '#0B944D',
              desc: 'Learn the Beauty of MERN Stack',
              instructor: 'Michael Eller',
              img: '/user2.jpg.png',
            },
            {
              title: 'Full Stack',
              number: '03',
              color: '#0B944D',
              desc: 'Learn the Beauty of Full Stack',
              instructor: 'Charles Ferrell',
              img: '/user3.jpg.png',
            },
          ].map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-[30%] bg-[#F6FFEB] px-[12px] rounded-lg shadow-lg"
            >
              <h3 className={`text-[24px] font-semibold flex justify-between items-center text-[${course.color}]`}>
                <span className="w-[70%]">{course.title}</span>
                <span className="w-[25%] text-[48px] font-[unbounded]">{course.number}</span>
              </h3>
              <p className="text-[#555555] text-[16px] leading-[28.8px] mt-4">{course.desc}</p>
              <div className="flex items-center mt-4">
                <Image src={course.img} alt="Instructor" width={50} height={50} />
                <div className="ml-2">
                  <p className="text-black text-[20px] font-semibold">{course.instructor}</p>
                  <p className="text-gray-600 text-[16px]">Instructor</p>
                </div>
              </div>
              <Link href="/student/courses" className="mt-4 inline-flex items-center text-[#0B944D] text-[14px] hover:underline">
                <span>Explore All Courses</span>
                <svg className="ml-2" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M4.6 8L8 4.6 6.6 3 3 6.6l3.6 3.6z" fill="#0B944D" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

