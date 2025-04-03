'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTeacherForm from '@/components/custom/AddTeacherForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

  const handleAddClose = () => {
    setShowAddModal(false);
    fetchTeachers();
  };

  return (
    <div className="p-6 mt-20 ml-60">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Teacher</h2>
        <Button onClick={() => setShowAddModal(true)}>Add Teacher</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {teachers.slice(0, 5).map((teacher, index) => (
          <Card key={index} className="p-0 overflow-hidden border rounded-xl">
            <img
              src={`http://localhost:4000/${teacher?.profile?.backgroundImage || 'uploads/default-bg.jpg'}`}
              alt="background"
              className="w-full h-32 object-cover"
            />

            <div className="flex flex-col items-center p-4 -mt-10">
              <img
                src={`http://localhost:4000/${teacher?.profile?.profilePicture || 'uploads/default-avatar.png'}`}
                className="w-16 h-16 rounded-full border-4 border-white shadow"
                alt={teacher.name}
              />

              <h3 className="font-semibold mt-2 text-sm">{teacher.name}</h3>
              <p className="text-xs text-gray-500">{teacher.role}</p>
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

      <Card className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Teachers</th>
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
                  <img
                    src={`http://localhost:4000/${teacher?.profile?.profilePicture || 'uploads/default-avatar.png'}`}
                    alt="pic"
                    className="w-8 h-8 rounded-full"
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
                    👁️ ✏️ 🗑️
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
          <div className="bg-white p-6 rounded shadow">
            <AddTeacherForm onClose={handleAddClose} />
          </div>
        </div>
      )}
    </div>
  );
}
