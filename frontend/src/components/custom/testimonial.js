"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const Testimonial = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios
      .get("https://back.bishalpantha.com.np/api/mentors")
      .then((response) => {
        setMentors(response.data.mentors);
      })
      .catch((error) => {
        console.error("Error fetching mentors:", error);
      });
  }, []);

  return (
    <section className="w-full bg-white px-4 py-8 mt-[30px]">
      <div className="container mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center w-[90%] mx-auto mt-[80px]"
        >
          {/* Left Content */}
          <div className="mb-6 sm:mb-0">
            <h2 className="text-[32px] sm:text-[40px] font-semibold text-black leading-[48px] font-[unbounded] text-center sm:text-left">
              OUR POPULAR MENTORS
            </h2>
            <p className="text-[#555555] text-[14px] sm:text-[16px] font-[poppins] leading-[28.8px] text-center sm:text-left">
              Learn from the best mentors and enhance your skills for a brighter future.
            </p>
          </div>

          {/* Right CTA Button */}
          <Link href="/student/courses">
            <Button className="w-[150px] h-[150px] rounded-full bg-[#00D96A] text-black text-[16px] font-[poppins] flex flex-col justify-center items-center hover:bg-[#00c060] transition">
              Explore All <br /> Courses
              <FontAwesomeIcon icon={faArrowRight} className="text-white mt-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Mentor Cards */}
        <div className="flex flex-wrap justify-between gap-6 w-[90%] mx-auto sm:flex-row flex-col">
          {mentors.slice(0, 4).map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full sm:w-[48%] md:w-[30%] bg-[#F6FFEB] px-[12px] py-[16px] rounded-lg shadow-lg flex flex-col mb-6"
            >
              <h3 className="text-[20px] sm:text-[24px] font-semibold flex justify-between items-center text-[#0B944D]">
                <span className="w-[70%]">{mentor.title}</span>
                <span className="w-[25%] text-[36px] sm:text-[48px] font-[unbounded]">
                  {mentor.number}
                </span>
              </h3>
              <p className="text-[#555555] text-[14px] sm:text-[16px] leading-[28.8px] mt-4">
                {mentor.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                {/* Mentor Info: Image, Name, Role */}
                <div className="flex items-center">
                  <Image
                    src={`https://back.bishalpantha.com.np/${mentor.image}`}
                    alt="Instructor"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-2">
                    <p className="text-black text-[16px] sm:text-[20px] font-semibold">
                      {mentor.instructor}
                    </p>
                    <p className="text-gray-600 text-[14px] sm:text-[16px]">Instructor</p>
                  </div>
                </div>
                
                {/* Motion for Arrow Button */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="ml-4 flex items-center text-[#0B944D] text-[16px] sm:text-[20px] hover:underline"
                >
                  <Link href="/student/courses">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[#0B944D] font-bold"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
