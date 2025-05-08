"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";

export default function LogoContent() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    axios
      .get("https://back.bishalpantha.com.np/api/logos")
      .then((response) => {
        setLogos(response.data.logos); 
      })
      .catch((error) => {
        console.error("Error fetching logos:", error);
      });
  }, []);

  const scrollingLogos = [...logos, ...logos];

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
        {scrollingLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center min-w-[200px]">
            <Image
              src={`https://back.bishalpantha.com.np/${logo.image}`}  
              alt={`Logo ${index + 1}`}
              width={200}
              height={140}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
