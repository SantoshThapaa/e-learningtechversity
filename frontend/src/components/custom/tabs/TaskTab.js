"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function TaskTab() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true); 
  }, []);

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
          submitted: false, // Initially, set submission status to false
        })).sort((a, b) => b.createdAt - a.createdAt);

        // Fetch submission status for each task
        for (let task of assignments) {
          try {
            const submissionRes = await axios.get(
              `http://localhost:4000/api/assignment/status/${task.taskId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            task.submitted = submissionRes.data.submitted; // Set the submission status
          } catch (error) {
            console.error('Failed to fetch submission status:', error);
          }
        }

        setTasks(assignments);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleActionClick = (task, action) => {
    setSelectedTask(task);
    localStorage.setItem('taskId', task.taskId);
    if (action === 'submit') {
      window.location.href = `/student/assignmentsubmission/${task.taskId}`;
    } else if (action === 'brief') {
      window.location.href = `/student/assignmentbrief/${task.taskId}`;
    } else if (action === 'status') {
      window.location.href = `/student/assignmentstatus/${task.taskId}`;
    }
  };

  if (!isClient) {
    return null; 
  }

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
              <Button variant="outline" className="rounded-md" onClick={() => handleActionClick(task, 'brief')}>
                View Brief
              </Button>
              {task.submitted ? (
                <Button
                  onClick={() => handleActionClick(task, 'status')}
                  className={`rounded-md text-white border border-gray-300`}
                >
                  View Status
                </Button>
              ) : (
                task.isActive && (
                  <Button
                    onClick={() => handleActionClick(task, 'submit')}
                    className={`rounded-md bg-green-600 text-white hover:bg-green-700`}
                  >
                    Submit
                  </Button>
                )
              )}
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
