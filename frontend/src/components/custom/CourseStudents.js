'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { FaEye, FaTrash } from 'react-icons/fa';

export default function CourseStudents() {
    const [students, setStudents] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('https://back.bishalpantha.com.np/api/students');
                console.log("Fetched users:", res.data.users);
                setStudents(res.data.users || []);
            } catch (err) {
                console.error('Failed to fetch students:', err);
            }
        };
        fetchStudents();
    }, []);

    const formatJoinDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const handleView = (student) => {
        setSelectedStudent(student);
        setShowViewModal(true);
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://back.bishalpantha.com.np/api/user/${selectedStudent._id}`);
            toast.success('Student deleted successfully!');
            setStudents((prev) => prev.filter((student) => student._id !== selectedStudent._id));
            setShowDeleteModal(false);
        } catch (err) {
            toast.error('Error deleting student.');
            console.error('Error deleting student:', err);
        }
    };

    return (
        <div className="min-h-screen p-6 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#f9fafb] border-b">
                            <tr>
                                <th className="p-4"><Checkbox /></th>
                                <th className="p-4 font-medium">Students</th>
                                <th className="p-4 font-medium">Email ID</th>
                                <th className="p-4 font-medium">Courses</th>
                                <th className="p-4 font-medium">Join date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.slice(0, 10).map((student, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-[#f9fbff] transition-colors"
                                >
                                    <td className="p-4"><Checkbox /></td>
                                    <td className="p-4 flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={`https://back.bishalpantha.com.np${student.profile?.profilePicture || "/avatar-default.jpg"}`}
                                                alt="Profile"
                                            />
                                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                                        </Avatar>
                                        {student.name}
                                    </td>
                                    <td className="p-4">{student.email}</td>
                                    <td className="p-4 text-blue-600 hover:underline cursor-pointer">{student.course}</td>
                                    <td className="p-4">{formatJoinDate(student.createdAt)}</td>
                                    <td className="p-4">
                                        <span
                                            className={cn(
                                                'text-xs px-3 py-1 rounded-full font-medium',
                                                student.status === 'Completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-600'
                                            )}
                                        >
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 text-gray-500 cursor-pointer">
                                            <FaEye
                                                onClick={() => handleView(student)}
                                                className="text-blue-500 cursor-pointer"
                                            />
                                            <FaTrash
                                                onClick={() => handleDelete(student)}
                                                className="text-red-500 cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center p-4 text-xs text-gray-500">
                        <div className="flex gap-1 justify-end items-right">
                            {[1, 2, 3, '...', 10].map((p, idx) => (
                                <button
                                    key={idx}
                                    className={cn(
                                        'px-3 py-1 rounded text-sm',
                                        p === 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
