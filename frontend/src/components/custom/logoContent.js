"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function LogoContent() {
  const logos = [
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ];

  return (
    <div className="mt-[30px] flex items-center justify-center bg-[#f1fffb]">
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
        {logos.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <Image
              src={src}
              alt={`Logo ${index + 1}`}
              width={200}
              height={140}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
