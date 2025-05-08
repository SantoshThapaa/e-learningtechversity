'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlocksIcon, Book, CopySlash, FeatherIcon, GraduationCap, Group, LayoutGrid, LogsIcon, Phone, UploadCloud, UserCheck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const links = [
  {
    href: '/admin/home',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    href: '/admin/teacher',
    label: 'Teacher',
    icon: GraduationCap,
  },
  {
    href: '/admin/students',
    label: 'Students',
    icon: Users,
  },
  {
    href: '/admin/courses',
    label: 'Courses',
    icon: Users,
  },
  {
    href: '/admin/team',
    label: 'Teams',
    icon: Group,
  },
  {
    href: '/admin/feature',
    label: 'Sliding Image',
    icon: FeatherIcon,
  },
  {
    href: '/admin/mentor',
    label: 'Mentors',
    icon: Book,
  },
  
  {
    href: '/admin/logo',
    label: 'Logos',
    icon: LogsIcon,
  },
  {
    href: '/admin/communication',
    label: 'Communication',
    icon: Phone,
  },
  {
    href: '/admin/fees',
    label: 'Fees',
    icon: CopySlash,
  },
  {
    href: '/admin/updates',
    label: 'Updates',
    icon: UploadCloud,
  },
  {
    href: '/admin/blogs',
    label: 'Blogs',
    icon: BlocksIcon,
  },
  {
    href: '/admin/admin',
    label: 'Admin',
    icon: UserCheck,
  }
];

export default function AdminSidebar () { 
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <aside
          className={cn(
            'fixed top-14 left-0 h-full bg-white border-r border-gray-200 p-4 shadow-sm z-50 rounded-sm',
            isSidebarOpen ? 'w-50' : 'w-0', 
            'transition-all ease-in-out duration-300'
          )}
        >
          {/* Mobile toggle button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800 absolute top-5 right-5"
          >
            {isSidebarOpen ? 'Close' : 'Open'} Sidebar
          </button>

          <div className={`space-y-4 ${isSidebarOpen ? '' : 'hidden'}`}>
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
    
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </aside>
    );
};
