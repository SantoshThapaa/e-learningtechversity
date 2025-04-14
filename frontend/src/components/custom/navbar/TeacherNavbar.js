'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';
import Image from 'next/image';

export default function TeacherNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    };

    updateUserFromStorage();

    window.addEventListener('storage', updateUserFromStorage);
    window.addEventListener('focus', updateUserFromStorage);

    return () => {
      window.removeEventListener('storage', updateUserFromStorage);
      window.removeEventListener('focus', updateUserFromStorage);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/user/logout');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logout successful!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 items-center">
          {user && (
            <>
              <li>
                <Bell className="w-5 h-5" />
              </li>
              <li className="relative profile-dropdown">
                <img
                  src={user.photo || '/default-profile.jpg'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  onClick={() => setShowDropdown(prev => !prev)}
                />
                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                    <li>
                      <Link
                        href="/teacher/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
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

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
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
                <li className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <img
                    src={
                      user.profile?.profilePicture
                        ? `http://localhost:4000${user.profile.profilePicture}`
                        : '/default-profile.jpg'
                    }
                    onError={(e) => (e.target.src = '/default-profile.jpg')}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                </li>
                <li>
                  <Link
                    href="/teacher/profile"
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
    </motion.div>
  );
}