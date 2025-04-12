'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function TaskTab() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:4000/api/assignment/courseassignments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const assignments = res.data.assignments.map((assignment, index) => ({
          taskNumber: `Task ${index + 1}`,
          issueDate: new Date(assignment.createdAt).toISOString().split('T')[0],
          dueDate: assignment.dueDate || '2024/06/24', 
          title: assignment.title || 'No Title Provided',
          action: 'Status',
          isActive: index === 0, 
        }));

        setTasks(assignments);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Task</h2>

      <div className="flex flex-wrap gap-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`w-full sm:w-[300px] p-5 rounded-xl border ${
              task.isActive ? 'border-blue-500' : 'border-transparent shadow'
            } bg-white`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-green-700 text-white text-xs px-3 py-1 rounded-md">
                {task.taskNumber}
              </span>
              <span className="text-sm text-gray-500">{task.issueDate}</span>
            </div>

            <div className="bg-green-50 rounded-lg p-4 flex justify-center mb-4">
              <Image src="/famicons_book.png" alt="book icon" width={40} height={40} />
            </div>

            <h3 className="text-center text-sm font-medium mb-4">{task.title}</h3>

            <div className="flex flex-col gap-2 mb-4">
              <Button variant="outline" className="rounded-md">
                View Brief
              </Button>
              <Button
                variant={task.isActive ? 'outline' : 'default'}
                className={`rounded-md ${
                  task.isActive ? 'text-black border border-gray-300' : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {task.action}
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600">
              <strong>Due:</strong> {task.dueDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}