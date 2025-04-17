'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTeacherForm from './AddTeacherForm';

export default function TeacherPage() {
    const [teachers, setTeachers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/teachers');
            setTeachers(res.data.teachers || []);
        } catch (err) {
            console.error('Error fetching teachers:', err);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleView = async (teacherId) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/${teacherId}`);
            toast.info(`Viewing details for Teacher: ${res.data.user.name}`);
            console.log(res.data.user); // Display user data for review
        } catch (err) {
            toast.error('Error fetching teacher details.');
            console.error('Error viewing teacher:', err);
        }
    };

    const handleEdit = async (teacherId) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/${teacherId}`);
            const { name, email, bio, profilePicture } = res.data.user;

            toast.success(`Editing Teacher: ${name}`);
            const updatedUser = {
                name: "Updated Name",
                email: "updated@example.com",
                bio: "Updated bio",
                profilePicture: "http://example.com/updated-picture.jpg",
            };

            await axios.put(`http://localhost:4000/api/user/${teacherId}`, updatedUser);
            toast.success("Teacher profile updated successfully!");
            fetchTeachers();
        } catch (err) {
            toast.error('Error editing teacher.');
            console.error('Error editing teacher:', err);
        }
    };

    const handleDelete = async (teacherId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:4000/api/user/${teacherId}`);
                toast.success(`Teacher with ID ${teachername} deleted!`);
                fetchTeachers();
            } catch (err) {
                toast.error('Error deleting teacher.');
                console.error('Error deleting teacher:', err);
            }
        }
    };

    return (
        <div className="p-6 ml-60">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground mb-4">
                    <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Teachers</span>
                </div>

                <h2 className="text-2xl font-bold">Recent Teachers</h2>
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
                >
                    Add Teacher
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                {teachers.slice(0, 5).map((teacher, index) => (
                    <Card key={index} className="overflow-hidden rounded-xl shadow-lg bg-white">
                        <Image
                            src={`http://localhost:4000/${teacher?.profile?.backgroundImage || 'uploads/default-bg.jpg'}`}
                            alt="background"
                            className="w-full h-32 object-cover"
                            width={1280}
                            height={128}
                            layout="intrinsic"
                        />
                        <div className="flex flex-col items-center p-4 -mt-12">
                            <Image
                                src={`http://localhost:4000/${teacher?.profile?.profilePicture || 'uploads/default-avatar.png'}`}
                                alt={teacher.name}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                width={96}
                                height={96}
                                layout="intrinsic"
                            />
                            <h3 className="font-semibold mt-2 text-lg">{teacher.name}</h3>
                            <p className="text-sm text-gray-500">{teacher.role}</p>
                            <p className="text-xs text-center mt-2 text-gray-600 line-clamp-2">
                                {teacher.profile?.bio || 'Hi, I am Alex Stanton, a doctoral student at Oxford University...'}
                            </p>
                            <div className="flex justify-between items-center w-full px-4 mt-4 text-xs">
                                <div className="flex items-center gap-1 text-blue-600">
                                    📘 <span>45 Tasks</span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-600">
                                    ⭐ <span>4.8 (750 Reviews)</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

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
                                        src={`http://localhost:4000/${teacher?.profile?.profilePicture || 'uploads/default-avatar.png'}`}
                                        alt="pic"
                                        className="w-8 h-8 rounded-full"
                                        width={32}
                                        height={32}
                                        layout="intrinsic"
                                    />
                                    {teacher.name}
                                </td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phone || '-'}</td>
                                <td>{teacher.role}</td>
                                <td>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                        {teacher.currentCourse || 'MERN stack'}
                                    </span>
                                </td>
                                <td>{new Date(teacher.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex gap-2 text-gray-500 cursor-pointer">
                                        <FaEye onClick={() => handleView(teacher._id)} className="text-blue-500 cursor-pointer" />
                                        <FaEdit onClick={() => handleEdit(teacher._id)} className="text-yellow-500 cursor-pointer" />
                                        <FaTrash onClick={() => handleDelete(teacher._id)} className="text-red-500 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 text-center text-sm text-gray-500">
                    Showing {teachers.length > 0 ? 1 : 0} to {teachers.length} of {teachers.length} entries
                </div>
            </Card>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
                        <AddTeacherForm onClose={() => setShowAddModal(false)} />
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
