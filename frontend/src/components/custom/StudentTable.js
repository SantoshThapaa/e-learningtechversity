'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { FaEye, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/students');
        console.log("Fetched students:", res.data.users);
        setStudents(res.data.users || []);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };
    fetchStudents();
  }, []);

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
      await axios.delete(`http://localhost:4000/api/user/${selectedStudent._id}`);
      toast.success('Student deleted successfully!');
      setStudents((prev) => prev.filter((student) => student._id !== selectedStudent._id));
      setShowDeleteModal(false);
    } catch (err) {
      toast.error('Error deleting student.');
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7ff] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="text-gray-500">Home</span> {'>'} <span className="text-blue-500">Student</span>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f9fafb] border-b">
              <tr>
                <th className="p-4"><Checkbox /></th>
                <th className="p-4 font-medium">Students</th>
                <th className="p-4 font-medium">Email ID</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Bio</th>
                <th className="p-4 font-medium">Courses</th>
                <th className="p-4 font-medium">Join Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
                <th className="p-4 font-medium">Mentor</th>
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
                    <Image
                      src={`http://localhost:4000${student.profile?.profilePicture || '/uploads/default-avatar.png'}`}
                      alt={student.name}
                      className="w-8 h-8 rounded-full border-4 border-white shadow-lg"
                      width={96}
                      height={96}
                      layout="intrinsic"
                    />
                    {student.name}
                  </td>

                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.phone || 'Not provided'}</td>
                  <td className="p-4">{student.profile?.bio || 'No bio'}</td>
                  <td className="p-4 text-blue-600 hover:underline cursor-pointer">{student.course}</td>
                  <td className="p-4">{new Date(student.createdAt).toLocaleDateString()}</td>
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

                  <td className="p-4 flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={student.mentorAvatar || "/avatar-default.jpg"} />
                    </Avatar>
                    {student.mentor || 'No mentor assigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center p-4 text-xs text-gray-500">
            <div className="flex gap-1">
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

      {/* View More Modal */}
      {showViewModal && selectedStudent && selectedStudent.name && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
            <div className="flex items-center gap-4 mt-4">
              <Image
                src={selectedStudent.profile?.profilePicture || '/avatar-default.jpg'}
                alt={selectedStudent.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                width={96}
                height={96}
                layout="intrinsic"
              />
              <div>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                <p><strong>Bio:</strong> {selectedStudent.profile?.bio || 'No bio available'}</p>
                <p><strong>Courses:</strong> {selectedStudent.course || 'No courses assigned'}</p>
                <p><strong>Mentor:</strong> {selectedStudent.mentor || 'No mentor assigned'}</p>
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
      {showDeleteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-center">Are you sure you want to delete {selectedStudent.name}?</h3>
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

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
