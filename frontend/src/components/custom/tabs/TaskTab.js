"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { TextEditor } from '../TextEditor';

export default function TaskTab() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewMode, setViewMode] = useState(null); // 'brief', 'submit', or 'status'

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('token');
      const courseId = localStorage.getItem('courseId');
      if (!token || !courseId) return;

      try {
        const res = await axios.get(
          `http://localhost:4000/api/assignment/teacher/assignments/course/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const assignments = res.data.assignments.map((assignment, index) => ({
          taskId: assignment._id,
          taskNumber: `Task ${index + 1}`,
          issueDate: new Date(assignment.createdAt).toISOString().split('T')[0],
          dueDate: assignment.dueDate || '2024/06/24',
          title: assignment.title || 'No Title Provided',
          description: assignment.description || 'No Description Provided',
          isActive: index === 0,
          createdAt: new Date(assignment.createdAt),
        })).sort((a, b) => b.createdAt - a.createdAt);

        setTasks(assignments);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleActionClick = (task) => {
    setSelectedTask(task);
    setViewMode(task.isActive ? 'submit' : 'status');
  };

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
              <Button variant="outline" className="rounded-md" onClick={() => {
                setSelectedTask(task);
                setViewMode('brief');
              }}>
                View Brief
              </Button>
              <Button
                onClick={() => handleActionClick(task)}
                className={`rounded-md ${
                  task.isActive
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'text-white border border-gray-300'
                }`}
              >
                {task.isActive ? 'Submit' : 'Status'}
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600">
              <strong>Due:</strong> {task.dueDate}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedTask && viewMode && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">{selectedTask.taskNumber} - {selectedTask.title}</h2>

            {viewMode === 'brief' && (
              <div>
                <p className="text-gray-600 mb-4">Posted on: {selectedTask.issueDate}</p>
                <div className="text-gray-800 mb-6 whitespace-pre-line">
                  {selectedTask.description}
                </div>
              </div>
            )}

            {viewMode === 'submit' && (
              <div className="mt-6">
                <TextEditor assignmentId={selectedTask.taskId} />
              </div>
            )}

            {viewMode === 'status' && (
              <div className="mt-6 text-sm">
                <div className="border p-4 rounded-lg bg-green-50">
                  <h3 className="text-md font-semibold mb-2">Submission Status</h3>
                  <p className="mb-1"><strong>Status:</strong> <span className="text-green-600">Submitted</span></p>
                  <p className="mb-1"><strong>Due:</strong> {selectedTask.dueDate}</p>
                  <p className="mb-1"><strong>Last Change:</strong> 17/06/2024</p>
                  <p><strong>Feedback:</strong> <span className="text-green-600">Nice</span></p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Button onClick={() => setViewMode(null)} className="bg-[#1A2D62] text-white">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
