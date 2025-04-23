'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f1fffb] text-[#0a1d2c] py-10"
    >
      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Techversity Logo"
                width={140}
                height={80}
                className="h-auto w-auto"
              />
            </div>
            <p className="mb-4 text-sm">
              Techversity is the best platform to learn and grow your skills.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a1d2c] text-white hover:bg-green-500 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-3 text-lg font-bold">About Us</h3>
            <ul className="space-y-2 text-sm">
              {["Contact", "Support", "Resources", "Help Center", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-3 text-lg font-bold">Courses</h3>
            <ul className="space-y-2 text-sm">
              {["Learning", "Testimonials", "Partners", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 text-lg font-bold">Newsletter</h3>
            <p className="mb-3 text-sm">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter email address"
                className="w-2/3"
              />
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white text-sm">
                Subscribe
              </Button>
            </form>
            <p className="mt-2 text-xs text-gray-600">
              By subscribing, you agree to our{" "}
              <a href="#" className="underline hover:text-green-600">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
          <p>© 2025 Techversity. All rights reserved.</p>
          <div className="flex space-x-4">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a key={item} href="#" className="hover:text-green-600">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
