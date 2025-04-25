"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AssignmentTextEditor } from '../assignmentTextEditor';
import { getUserIdFromToken } from '@/utils/authUtils';


export default function AssignmentSubmissionTab() {
  const [task, setTask] = useState(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const courseId = localStorage.getItem('courseId');
    const taskId = localStorage.getItem('taskId');

    if (!courseId || !taskId) {
      return;
    }

    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/assignment/teacher/assignments/course/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        const task = response.data.assignments.find(assignment => assignment._id === taskId);

        if (task) {
          setTask(task);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSubmitAssignment = async () => {
    if (!task) {
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = getUserIdFromToken();

      if (!userId) {
        return;
      }

      const formData = new FormData();
      formData.append('document', file);
      formData.append('content', submissionContent);
      formData.append('userId', userId);

      const response = await axios.post(
        `http://localhost:4000/api/assignment/submit/${task._id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      clearEditor();
    } catch (error) {
      console.error('Failed to submit assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearEditor = () => {
    setSubmissionContent('');
    setFile(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Error: Task data not found</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{task.taskNumber} - {task.title}</h2>
        
        <div className="mt-6">
          <AssignmentTextEditor 
            defaultValue={task.descriptions || 'Start writing here...'}
            onChange={setSubmissionContent}
            onFileUpload={handleFileUpload}
          />
        </div>

        <div className="mt-6">
          <input
            type="file"
            accept=".pdf, .docx, .pptx, .txt"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:border file:rounded file:bg-gray-100"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmitAssignment}
            disabled={isSubmitting || !file}
            className={`px-6 py-2 rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-green-600 text-white'} `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
