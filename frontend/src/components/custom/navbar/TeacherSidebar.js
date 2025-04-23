'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, LayoutGrid, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  {
    href: '/teacher/home',
    label: 'Courses',
    icon: LayoutGrid,
  },
  {
    href: '/teacher/coursemanagement',
    label: 'Course Management',
    icon: GraduationCap,
  },
  {
    href: '/teacher/students',
    label: 'Students',
    icon: Users,
  },
];

export default function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-13 left-0 h-full w-60 bg-white border-r border-gray-200 p-4 shadow-sm z-50">
      <div className="space-y-4">
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
}
