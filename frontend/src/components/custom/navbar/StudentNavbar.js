'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';

export default function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
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
      const res = await fetch('http://localhost:4000/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.removeItem('user');
        window.location.href = '/student/enrollnow';
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
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
          <img src="/logo.png" alt="logo" className="h-12" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 items-center">
          <li><Link href="/student/home">Home</Link></li>
          <li><Link href="/student/about">About</Link></li>
          <li><Link href="/student/courses">Courses</Link></li>
          <li><Link href="/student/updates">Updates</Link></li>
          <li><Link href="/student/contact">Contact</Link></li>

          {!user && (
            <li>
              <Button asChild>
                <Link className="bg-[#00C853]" href="/student/enrollnow">Enroll Now</Link>
              </Button>
            </li>
          )}

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
                        href="/student/profile"
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
            <li><Link href="/student/home">Home</Link></li>
            <li><Link href="/student/about">About</Link></li>
            <li><Link href="/student/courses">Courses</Link></li>
            <li><Link href="/student/updates">Updates</Link></li>
            <li><Link href="/student/contact">Contact</Link></li>

            {!user && (
              <li>
                <Button asChild className="w-full">
                  <Link className="bg-[#00C853]" href="/student/enrollnow">Enroll Now</Link>
                </Button>
              </li>
            )}

            {user && (
              <>
                <li className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <img
                    src={user.photo || '/default-profile.jpg'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </li>
                <li>
                  <Link
                    href="/student/profile"
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
