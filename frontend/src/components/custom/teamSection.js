'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); 

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get('https://back.bishalpantha.com.np/api/team/all');
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const membersToDisplay = showAll ? team : team.slice(0, 3); 

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1240px] px-4">
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
            <div className="text-[#000] text-[16px] font-[poppins] text-center">
              <span className="text-[20px] leading-[24px]" onClick={() => setShowAll(!showAll)}>
                {showAll ? "View Less" : "View All Members"}
              </span>
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="text-white mt-2 ml-2" />
          </motion.div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10">
          {membersToDisplay.map((member, idx) => (
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
                  src={`https://back.bishalpantha.com.np/${member.image}`} 
                  alt={member.name}
                  width={360}
                  height={460}
                  className="object-cover object-center"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {member.facebook && member.facebook !== "" && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C853] text-white hover:bg-green-600 transition"
                    >
                      <FaFacebookF size={14} />
                    </a>
                  )}
                  {member.linkedin && member.linkedin !== "" && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C853] text-white hover:bg-green-600 transition"
                    >
                      <FaLinkedinIn size={14} />
                    </a>
                  )}
                  {member.twitter && member.twitter !== "" && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C853] text-white hover:bg-green-600 transition"
                    >
                      <FaTwitter size={14} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
