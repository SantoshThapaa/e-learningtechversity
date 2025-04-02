import Link from 'next/link';
import React from 'react'

const AdminSidebar = () => (
    <div className="w-64 h-screen text-black p-4 fixed">
        <div className="text-3xl font-bold mb-10">
            <img src="/logo.png" alt="Techversity" className="h-10" />
            <p className="text-xs text-center">Where Careers Get An Upgrade</p>
        </div>
        <ul>
            <li>
                <Link href="/" className="text-lg py-2 block hover:bg-blue-500 rounded-xl p-2">Dashboard</Link>
            </li>
            <li>
                <Link href="/teacher" className="text-lg py-2 block hover:bg-blue-500 rounded-xl p-2">Teacher</Link>
            </li>
            <li>
                <Link href="/students" className="text-lg py-2 block hover:bg-blue-500 rounded-xl p-2">Students</Link>
            </li>
            <li>
                <Link href="/courses" className="text-lg py-2 block hover:bg-blue-500 rounded-xl p-2">Courses</Link>
            </li>
            <li>
                <Link href="/communication" className="text-lg py-2 block hover:bg-blue-500 rounded-xl p-2">Communication</Link>
            </li>
            <li>
                <Link href="/fees" className="text-lg py-2 block hover:bg-blue-500 rounded-xl p-2">Fees</Link>
            </li>
        </ul>
    </div>
);

export default AdminSidebar;  