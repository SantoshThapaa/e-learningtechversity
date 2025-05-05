'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';
import Image from 'next/image';

export default function TeacherNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://back.bishalpantha.com.np/api/user/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        toast.error('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://back.bishalpantha.com.np/api/user/logout');
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
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[55px]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
        <ul className="hidden lg:flex gap-6 items-center">
          {user && (
            <>
              <li>
                <Link href="/teacher/notifications" className="relative cursor-pointer">
                  <Bell className="w-5 h-5" />
                  {user && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  )}
                </Link>
              </li>
              <li className="relative profile-dropdown">
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

        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

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
                  <Link href="/teacher/notifications" className="relative cursor-pointer">
                    <Bell className="w-5 h-5" />
                    {user && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    )}
                  </Link>
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
