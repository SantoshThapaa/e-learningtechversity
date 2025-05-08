'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlinePlus } from 'react-icons/hi';

export default function TeacherPage() {
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const router = useRouter();

    const fetchTeachers = async () => {
        try {
            const res = await axios.get('https://back.bishalpantha.com.np/api/teachers');
            setTeachers(res.data.teachers || []);
        } catch (err) {
            console.error('Error fetching teachers:', err);
            toast.error('Failed to fetch teachers');
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await axios.get('https://back.bishalpantha.com.np/api/allcourses');
            setCourses(res.data.courses || []);
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    useEffect(() => {
        fetchTeachers();
        fetchCourses();
    }, []);

    const handleView = (teacher) => {
        setSelectedTeacher(teacher);
        setShowViewModal(true);
    };

    const handleDelete = (teacher) => {
        setSelectedTeacher(teacher);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://back.bishalpantha.com.np/api/user/${selectedTeacher._id}`);
            toast.success('Teacher deleted successfully!');
            fetchTeachers();
            setShowDeleteModal(false);
        } catch (err) {
            toast.error('Error deleting teacher.');
            console.error('Error deleting teacher:', err);
        }
    };
    const getAssignedCourses = (teacherId) => {
        return courses.filter(course =>
            course.assignedTo.some(assignedTeacher => assignedTeacher._id === teacherId)
        );
    };

    return (
        <div className="p-6 ml-60 sm:ml-16 md:ml-10">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground mb-4">
                    <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Teachers</span>
                </div>
                <button
                    className="bg-[#1A2D62] text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors"
                    onClick={() => {
                        console.log("Redirecting to /admin/courseform...");
                        router.push("/admin/teacherform");
                      }}
                >
                    <HiOutlinePlus className="text-xl" />
                    Add Teacher
                </button>
            </div>

            {/* Grid Layout for Teacher Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
                {teachers.slice(0, 5).map((teacher, index) => (
                    <Card key={index} className="overflow-hidden rounded-xl shadow-lg bg-white">
                        <Image
                            src={`https://back.bishalpantha.com.np/${teacher?.profile?.backgroundImage || 'uploads/default-bg.jpg'}`}
                            alt="background"
                            className="w-full h-32 object-cover"
                            width={1280}
                            height={128}
                            layout="intrinsic"
                        />
                        <div className="flex flex-col items-center p-4 -mt-12">
                            <Image
                                src={`https://back.bishalpantha.com.np${teacher?.profile?.profilePicture || '/uploads/default-avatar.png'}`}
                                alt={teacher.name}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                width={96}
                                height={96}
                                layout="intrinsic"
                            />

                            <h3 className="font-semibold mt-2 text-lg">{teacher.name}</h3>
                            <p className="text-sm text-gray-500">{teacher.role}</p>
                            <p className="text-xs text-center mt-2 text-gray-600 line-clamp-2">
                                {teacher.profile?.bio || 'Hi I am teacher.'}
                            </p>
                            {/* <div className="flex justify-between items-center w-full px-4 mt-4 text-xs">
                                <div className="flex items-center gap-1 text-blue-600">
                                    📘 <span>{teacher.profile?.subscription?.length || 0} Tasks</span>
                                </div>
                            </div> */}
                        </div>
                    </Card>
                ))}
            </div>

            {/* View Teacher Modal */}
            {showViewModal && selectedTeacher && selectedTeacher.name && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold">{selectedTeacher.name}</h3>
                        <div className="flex items-center gap-4 mt-4">
                            <Image
                                src={`https://back.bishalpantha.com.np${selectedTeacher?.profile?.profilePicture || '/uploads/default-avatar.png'}`}
                                alt={selectedTeacher.name}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                width={96}
                                height={96}
                                layout="intrinsic"
                            />
                            <div>
                                <p><strong>Email:</strong> {selectedTeacher.email}</p>
                                <p><strong>Phone:</strong> {selectedTeacher.phone}</p>
                                <p><strong>Role:</strong> {selectedTeacher.role}</p>
                                <p><strong>Bio:</strong> {selectedTeacher.profile?.bio || 'No bio available'}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={() => setShowViewModal(false)} className="bg-red-500 text-white rounded-full px-4 py-2">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}



            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedTeacher && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-semibold text-center">Are you sure you want to delete {selectedTeacher.name}?</h3>
                        <div className="mt-4 flex justify-around">
                            <Button onClick={confirmDelete} className="bg-red-500 text-white rounded-full px-4 py-2">
                                Yes, Delete
                            </Button>
                            <Button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white rounded-full px-4 py-2">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Layout */}
            <Card className="overflow-x-auto shadow-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Teachers</th>
                            <th>Email ID</th>
                            <th>Ph number</th>
                            <th>Role</th>
                            <th>Current Course</th>
                            <th>Join Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-3 flex items-center gap-2">
                                    <Image
                                        src={`https://back.bishalpantha.com.np${teacher?.profile?.profilePicture || '/uploads/default-avatar.png'}`}
                                        alt={teacher.name}
                                        className="w-15 h-15 rounded-full border-4 border-white shadow-lg"
                                        width={25}
                                        height={25}
                                        layout="intrinsic"
                                    />

                                    {teacher.name}
                                </td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phone || '-'}</td>
                                <td>{teacher.role}</td>
                                <td>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs w-auto inline-block">
                                        {getAssignedCourses(teacher._id)?.length > 0 ? (
                                            getAssignedCourses(teacher._id).map((course, index) => (
                                                <div key={index} className="block">{course.title}</div>
                                            ))
                                        ) : (
                                            <span className="bg-green-100 px-2 py-1 rounded text-xs w-auto inline-block">
                                                No courses assigned
                                            </span>
                                        )}
                                    </span>
                                </td>

                                <td>{new Date(teacher.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex gap-2 text-gray-500 cursor-pointer">
                                        <FaEye onClick={() => handleView(teacher)} className="text-blue-500 cursor-pointer" />
                                        <FaTrash onClick={() => handleDelete(teacher)} className="text-red-500 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}
