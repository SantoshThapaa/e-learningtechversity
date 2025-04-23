'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/students');
        console.log("Fetched users:", res.data.users);  
        setStudents(res.data.users || []);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };
    fetchStudents();
  }, []);

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
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.profile?.profilePicture || "/avatar-default.jpg"} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
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
                    <Button variant="ghost" className="text-blue-600 hover:underline text-xs">
                      View More
                    </Button>
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
    </div>
  );
}
