'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function TaskTab() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) {
        console.log("Missing token or courseId");
        return;
      }

      try {
        console.log("Fetching tasks for courseId:", courseId);
        const res = await axios.get(`http://localhost:4000/api/assignment/teacher/assignments/course/${courseId}`, {
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
          description: assignment.description || 'No Description Provided',
          isActive: index === 0,
          createdAt: new Date(assignment.createdAt),  
        }));
        assignments.sort((a, b) => b.createdAt - a.createdAt);

        setTasks(assignments);
      } catch (error) {
        console.error('Failed to fetch assignments:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchAssignments();
  }, []);

  const closeModal = () => setSelectedTask(null);

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4 mb-20">
      <h2 className="text-2xl font-bold mb-6">Task</h2>

      <div className="flex flex-wrap gap-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`w-full sm:w-[300px] p-5 rounded-xl border ${
              task.isActive ? 'border-black-50' : 'border-transparent shadow'
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
              <Button
                variant="outline"
                className="rounded-md"
                onClick={() => setSelectedTask(task)}  
              >
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

      {selectedTask && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {selectedTask.title}
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Posted on: {new Date(selectedTask.createdAt).toLocaleDateString()}
            </p>
            <div className="text-gray-800 mb-6 whitespace-pre-line">
              {selectedTask.description}
            </div>
            <div className="text-center text-sm text-gray-500 mb-4">
              Due: {new Date(selectedTask.dueDate).toLocaleDateString()}
            </div>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-[#1A2D62] text-white px-6 py-2 rounded hover:bg-blue-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
