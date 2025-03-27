"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function StudentNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-white"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container mx-auto flex items-center justify-between py-[-3] px-6">
                <Link href="/">
                    <img src="/logo.png" alt="logo" className="h-22" />
                </Link>

                <div className="lg:hidden">
                    <button onClick={toggleMenu}>{isOpen ? <X /> : <Menu />}</button>
                </div>

                <ul className="hidden lg:flex gap-6 items-center">
                    <li className="relative group">
                        <Link href="#" className="text-blue-600 font-medium">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link href="/about">About</Link>
                    </li>

                    <li className="relative group">
                        <Link href="/courses">Courses</Link>
                    </li>

                    <li className="relative group">
                        <Link href="/updates">Updates</Link>
                        
                    </li>

                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>

                    <li>
                        <Button asChild>
                            <Link className='bg-[#00C853]' href="/courses">Enroll Now</Link>
                        </Button>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="lg:hidden bg-white px-6 py-4 shadow-md"
                >
                    <ul className="space-y-4">
                        <li><Link href="#">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/courses">Courses</Link></li>
                        <li><Link href="/not-found">Updates</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li>
                            <Button asChild className="w-full">
                                <Link className='bg-[#00C853]' href="/courses">Enroll Now</Link>
                            </Button>
                        </li>
                    </ul>
                </motion.div>
            )}
        </motion.div>
    );
}
