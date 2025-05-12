"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";

const AdminTopNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://back.bishalpantha.com.np/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://back.bishalpantha.com.np/api/user/logout");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logout successful!");
      window.location.href = "/student/home";
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-80 bg-white shadow-md h-[60px]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left Side: Logo */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            className="w-15 h-15"
            width={60}
            height={60}
          />
        </Link>
        {/* Right Side: Profile */}
        <div className="flex items-center space-x-6">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Profile */}
          <div className="relative pb-[2px]">
            <ul className="hidden lg:flex gap-6 items-center">
              {user && (
                <>
                  <li className="relative pb-[-2px]">
                    <Image
                      src={user?.profile?.profilePicture
                        ? `https://back.bishalpantha.com.np${user.profile.profilePicture}`
                        : '/default-profile.jpg'}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                      onClick={() => setShowDropdown(prev => !prev)}
                      unoptimized
                    />
                    {showDropdown && (
                      <ul className="absolute right-0 mt-2 w-50 bg-white shadow-md rounded-md z-50">
                        <li>
                          <Link
                            href="/admin/profile"
                            className="block px-4 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={async () => {
                              await handleLogout();
                              setShowDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="lg:hidden bg-white px-6 py-4 shadow-md"
        >
          <ul className="space-y-4">
            {user && (
              <>
                <li>
                  <Link
                    href="/admin/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </motion.div>
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </motion.div>
  );
};

export default AdminTopNavbar;
