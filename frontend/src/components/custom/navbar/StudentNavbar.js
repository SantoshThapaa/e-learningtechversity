'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://back.bishalpantha.com.np/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch profile');
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      await axios.post('https://back.bishalpantha.com.np/api/user/logout');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logout successful!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error(error);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://back.bishalpantha.com.np/api/notifications/user/all');
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching notifications.');
      setLoading(false);
      console.error('Error fetching notifications:', error);
    }
  };

  const handleBellClick = () => {
    if (!showDropdown) {
      fetchNotifications();
    }
    setShowDropdown(!showDropdown);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="h-12"
          />
        </Link>

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
              <li onClick={handleBellClick} className="relative cursor-pointer">
                <Link href="/student/notifications">
                  <Bell className="w-5 h-5" />
                </Link>
                {notifications.length > 0 && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                )}
              </li>
              <li className="relative profile-dropdown">
                <Image
                  src={`https://back.bishalpantha.com.np${user?.profile?.profilePicture || '/default-profile.jpg'}`}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  onClick={() => setShowDropdown(prev => !prev)}
                  unoptimized
                />
                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-30 shadow-md rounded-md bg-white z-50">
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
                <li onClick={handleBellClick} className="relative cursor-pointer">
                  <Link href="/student/notifications">
                    <Bell className="w-5 h-5" />
                  </Link>
                  {notifications.length > 0 && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  )}
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

      {showDropdown && (
        <div className="absolute top-16 right-0 w-72 bg-white shadow-lg z-50">
          <div className="">
            {loading ? (
              <div>Loading notifications...</div>
            ) : (
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} className="p-2 hover:bg-gray-100">
                    <p className="font-semibold">{notification.message}</p>
                    <span className="text-sm text-gray-500">{new Date(notification.sendAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
