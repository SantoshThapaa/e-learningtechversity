'use client';

import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="flex flex-col items-center justify-center text-center min-h-[50vh] bg-white px-6"
    >
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-black uppercase">
        Your Gateway to a Future in Tech
      </h2>

      {/* Phone Contact */}
      <div className="mt-8 w-fit flex items-center gap-4 px-6 py-4 border border-[#00C853] rounded-full">
        <span className="text-lg font-semibold text-black">
          +61 456 78912
        </span>
        <Button className="rounded-full bg-[#00C853] p-3 hover:bg-[#00b44a] transition-all" size="icon">
          <Phone className="text-black w-5 h-5" />
        </Button>
      </div>

      {/* Description */}
      <p className="mt-6 text-sm text-[#6c6c6c] max-w-md">
        Have questions? We’re here to help! Reach out to us and take the first step
        towards mastering in-demand tech skills.
      </p>
    </motion.div>
  );
};

export default Contact;
