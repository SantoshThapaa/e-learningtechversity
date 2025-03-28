"use client"
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function TeamSection() {
  const team = [
    {
      name: 'Santosh Thapa',
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
    
  ]

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1240px] px-4">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <h2 className="text-[36px] md:text-[42px] font-semibold text-black leading-tight font-[unbounded] text-center md:text-left">
            MEET THE PASSIONATE TEAM
            <br /> DRIVING EXCELLENCE
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center bg-[#00D96A] w-[150px] h-[150px] rounded-full shadow-md transition"
          >
            <Link href="#" className="text-[#000] text-[16px] font-[poppins] text-center">
              <span className="text-[20px] leading-[24px]">View All<br />Members</span>
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-white mt-2 ml-2" />
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl bg-white p-4 shadow-lg w-[360px] transition-all"
            >
              <div className="relative mx-auto mb-4 h-[460px] w-full rounded-lg overflow-hidden shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {[FaFacebookF, FaLinkedinIn, FaTwitter].map((Icon, iconIdx) => (
                    <a
                      key={iconIdx}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C853] text-white hover:bg-green-600 transition"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
