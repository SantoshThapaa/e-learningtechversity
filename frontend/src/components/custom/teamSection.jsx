"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function TeamSection() {
  const team = [
    {
      name: 'Suresh Thapa',
      role: 'Instructor',
      image: '/team5.png',
    },
    {
      name: 'Puna Rai',
      role: 'Instructor',
      image: '/team6.jpg.png',
    },
    {
      name: 'Sabina Gautam',
      role: 'Instructor',
      image: '/team7.jpg.png',
    },
  ];

  return (
    <section className="mt-60 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center justify-between"
        >
          <h2 className="text-[40px] font-semibold text-black leading-[48px] font-[unbounded]">
            MEET THE PASSIONATE TEAM
            <br /> DRIVING EXCELLENCE
          </h2>
          <div className="flex items-center justify-center bg-[#00D96A] w-[150px] h-[150px] rounded-full">
            <Link href="#" className="text-[#000] text-[16px] font-[poppins] text-center">
              <span className="text-[20px] leading-[24px]">View All<br />Members</span>
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-white mt-2" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap gap-6 justify-center">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="rounded-lg bg-white p-[10px] text-center shadow-md w-[320px]"
            >
              <div className="relative mx-auto mb-4 h-[400px] w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="100vw"
                  className="object-cover object-center rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {[FaFacebookF, FaLinkedinIn, FaTwitter].map((Icon, iconIdx) => (
                    <a
                      key={iconIdx}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C853] text-white hover:bg-green-600"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
